// 平滑滚动效果
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // 动画效果
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // 为所有卡片添加动画
        document.querySelectorAll('.feature-card, .platform-card, .screenshot-item').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });

        // 图像预览功能
        function createImageModal() {
            const modal = document.createElement('div');
            modal.className = 'image-modal';
            modal.innerHTML = `
                <div class="modal-backdrop"></div>
                <div class="modal-content">
                    <img class="modal-image" src="" alt="">
                    <button class="modal-close">&times;</button>
                    <div class="modal-caption"></div>
                </div>
            `;
            document.body.appendChild(modal);
            return modal;
        }

        // 为截图添加点击事件
        document.addEventListener('DOMContentLoaded', function() {
            const modal = createImageModal();
            const modalImage = modal.querySelector('.modal-image');
            const modalCaption = modal.querySelector('.modal-caption');
            const modalClose = modal.querySelector('.modal-close');
            
            document.querySelectorAll('.screenshot-item img').forEach(img => {
                img.style.cursor = 'pointer';
                img.addEventListener('click', function() {
                    modalImage.src = this.src;
                    modalImage.alt = this.alt;
                    modalCaption.textContent = this.nextElementSibling.textContent;
                    modal.style.display = 'flex';
                    document.body.style.overflow = 'hidden';
                });
            });

            // 关闭模态框
            modalClose.addEventListener('click', () => {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            });

            modal.querySelector('.modal-backdrop').addEventListener('click', () => {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            });

            // ESC键关闭
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && modal.style.display === 'flex') {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            });

            // 移动端语言切换按钮优化
            const languageSwitcher = document.querySelector('.language-switcher');
            if (languageSwitcher) {
                // 为移动端添加触摸事件
                const links = languageSwitcher.querySelectorAll('a');
                links.forEach(link => {
                    // 添加触摸开始事件
                    link.addEventListener('touchstart', function(e) {
                        this.style.background = 'rgba(255, 255, 255, 0.2)';
                    }, { passive: true });

                    // 添加触摸结束事件
                    link.addEventListener('touchend', function(e) {
                        this.style.background = '';
                        // 确保链接能够正常跳转
                        setTimeout(() => {
                            if (this.href) {
                                window.location.href = this.href;
                            }
                        }, 100);
                    }, { passive: true });

                    // 防止触摸取消时样式残留
                    link.addEventListener('touchcancel', function(e) {
                        this.style.background = '';
                    }, { passive: true });

                    // 为点击事件添加额外保障
                    link.addEventListener('click', function(e) {
                        e.preventDefault();
                        const href = this.getAttribute('href');
                        if (href) {
                            setTimeout(() => {
                                window.location.href = href;
                            }, 50);
                        }
                    });
                });
            }
        });
