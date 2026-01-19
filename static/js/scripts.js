const content_dir = 'contents/'
const config_file = 'config.yml'
const section_names = ['home', 'awards', 'experience', 'publications'];

// 全局语言状态
let currentLang = 'zh';

window.addEventListener('DOMContentLoaded', event => {

    // ==========================================
    // 滚动增强功能
    // ==========================================

    // 导航栏滚动变色
    const header = document.querySelector('.header');
    const scrollThreshold = 50;

    function updateHeaderOnScroll() {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', updateHeaderOnScroll);
    updateHeaderOnScroll(); // 初始化状态

    // ==========================================
    // 回到顶部按钮
    // ==========================================

    const backToTopBtn = document.getElementById('back-to-top');

    if (backToTopBtn) {
        // 显示/隐藏按钮
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        // 点击回到顶部
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ==========================================
    // 暗色模式切换
    // ==========================================

    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;

    // 检查本地存储的主题偏好
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        html.setAttribute('data-theme', savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // 如果系统偏好暗色模式
        html.setAttribute('data-theme', 'dark');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    // ==========================================
    // 打字机效果
    // ==========================================

    function typeWriter(element, text, speed = 80) {
        let i = 0;
        element.textContent = '';

        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                // 打字完成后移除光标动画
                setTimeout(() => {
                    element.classList.add('typing-done');
                }, 1000);
            }
        }

        type();
    }

    // ==========================================
    // 粒子背景
    // ==========================================

    function createParticles() {
        const container = document.getElementById('particles-bg');
        if (!container) return;

        const particleCount = 30;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';

            // 随机初始位置
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';

            // 随机大小
            const size = Math.random() * 4 + 2;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';

            // 随机动画持续时间和延迟
            particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
            particle.style.animationDelay = (Math.random() * 10) + 's';

            // 随机透明度
            particle.style.opacity = Math.random() * 0.5 + 0.3;

            container.appendChild(particle);
        }
    }

    createParticles();

    // 滚动触发动画 (Intersection Observer)
    const scrollAnimateElements = document.querySelectorAll('.scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-scale');

    // 将观察器声明在外部以便后续使用
    let animateObserver = null;

    if ('IntersectionObserver' in window) {
        animateObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                } else {
                    // 离开视口时移除类，以便再次进入时重新触发动画
                    entry.target.classList.remove('is-visible');
                }
            });
        }, {
            root: null,
            rootMargin: '0px 0px -5% 0px',
            threshold: 0.1
        });

        scrollAnimateElements.forEach(el => {
            animateObserver.observe(el);
        });
    } else {
        // 降级处理：不支持 IntersectionObserver 时直接显示
        scrollAnimateElements.forEach(el => {
            el.classList.add('is-visible');
        });
    }

    // 为 Section 内容添加入场动画类（延迟执行以确保内容加载完成）
    setTimeout(() => {
        const sections = document.querySelectorAll('section .main-body');
        sections.forEach((section, index) => {
            section.classList.add('scroll-animate');
            section.style.transitionDelay = `${index * 0.1}s`;

            // 将新增的元素加入观察器
            if (animateObserver) {
                animateObserver.observe(section);
            } else {
                // 降级处理
                section.classList.add('is-visible');
            }
        });

        // 首屏内容立即显示（#home section）
        const homeSection = document.querySelector('#home .main-body');
        if (homeSection) {
            homeSection.classList.add('is-visible');
        }
    }, 100);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });


    // Yaml config
    fetch(content_dir + config_file)
        .then(response => response.text())
        .then(text => {
            const yml = jsyaml.load(text);
            Object.keys(yml).forEach(key => {
                try {
                    const element = document.getElementById(key);
                    if (key === 'top-section-bg-text') {
                        // 应用打字机效果
                        typeWriter(element, yml[key]);
                    } else {
                        element.innerHTML = yml[key];
                    }
                } catch {
                    console.log("Unknown id and value: " + key + "," + yml[key].toString())
                }

            })
        })
        .catch(error => console.log(error));


    // Marked - 加载 Markdown 内容
    // 配置 marked 保留原始 HTML 标签（用于语言切换的 div class）
    marked.setOptions({
        mangle: false,
        headerIds: false
    });

    let loadedSections = 0;
    const totalSections = section_names.length;

    section_names.forEach((name, idx) => {
        // 添加时间戳防止缓存
        fetch(content_dir + name + '.md?t=' + new Date().getTime())
            .then(response => response.text())
            .then(markdown => {
                let html = '';
                // 检测是否存在语言标记 <!-- lang:zh --> 或 <!-- lang:en -->
                const hasLangMarkers = /<!--\s*lang:(zh|en)\s*-->/i.test(markdown);

                if (hasLangMarkers) {
                    const languages = ['zh', 'en'];
                    languages.forEach(lang => {
                        // 匹配标记之后，下一个标记或文件末尾之前的内容
                        const regex = new RegExp(`<!--\\s*lang:${lang}\\s*-->([\\s\\S]*?)(?=<!--\\s*lang:|$)`, 'i');
                        const match = markdown.match(regex);
                        if (match && match[1]) {
                            // 解析 Markdown 并包裹在对应的语言 div 中
                            html += `<div class="lang-${lang}">${marked.parse(match[1])}</div>`;
                        }
                    });
                } else {
                    // 没有标记，按普通 Markdown 解析
                    html = marked.parse(markdown);
                }
                document.getElementById(name + '-md').innerHTML = html;
            }).then(() => {
                // MathJax
                MathJax.typeset();

                loadedSections++;

                // 当所有内容加载完成后，初始化语言切换
                if (loadedSections === totalSections) {
                    initGlobalLanguageSwitcher();
                    // 应用默认语言
                    switchLanguage(currentLang);
                }

                // Generate TOC for experience section
                if (name === 'experience') {
                    generateTOC();
                }
            })
            .catch(error => console.log(error));
    })

    // 全局语言切换器初始化
    function initGlobalLanguageSwitcher() {
        const langButtons = document.querySelectorAll('.lang-btn');
        langButtons.forEach(button => {
            button.addEventListener('click', function () {
                const lang = this.getAttribute('data-lang');
                switchLanguage(lang);
            });
        });
    }

    // 切换语言
    function switchLanguage(lang) {
        currentLang = lang;

        // 切换所有 .lang-zh 和 .lang-en 元素
        const zhElements = document.querySelectorAll('.lang-zh');
        const enElements = document.querySelectorAll('.lang-en');

        if (lang === 'zh') {
            zhElements.forEach(el => el.style.display = 'block');
            enElements.forEach(el => el.style.display = 'none');
        } else {
            zhElements.forEach(el => el.style.display = 'none');
            enElements.forEach(el => el.style.display = 'block');
        }

        // 更新按钮状态
        const langButtons = document.querySelectorAll('.lang-btn');
        langButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            }
        });

        // 更新 TOC 标题
        const tocTitle = document.querySelector('.toc-title');
        if (tocTitle) {
            tocTitle.textContent = lang === 'zh' ? '目录' : 'Contents';
        }

        // 重新生成 TOC
        generateTOC();
    }

    // Generate Table of Contents
    function generateTOC() {
        const experienceContent = document.getElementById('experience-md');
        const tocNav = document.getElementById('toc-nav');

        if (!experienceContent || !tocNav) return;

        // 找到当前语言下可见的 h3 标题
        const allH3 = experienceContent.querySelectorAll('h3');
        const headings = Array.from(allH3).filter(heading => {
            // 检查标题是否在可见的语言块中
            const parentLangBlock = heading.closest('.lang-zh, .lang-en');
            if (parentLangBlock) {
                return window.getComputedStyle(parentLangBlock).display !== 'none';
            }
            // 如果不在语言块中，检查自身是否可见
            return window.getComputedStyle(heading).display !== 'none';
        });

        if (headings.length === 0) {
            tocNav.innerHTML = '<p class="text-muted">暂无目录</p>';
            return;
        }

        let tocHTML = '<ul>';

        headings.forEach((heading, index) => {
            const text = heading.textContent.trim();
            const id = 'heading-' + index;

            // Add id to heading
            heading.id = id;

            // Add link to TOC
            tocHTML += `<li><a href="#${id}" data-target="${id}">${text}</a></li>`;
        });

        tocHTML += '</ul>';

        tocNav.innerHTML = tocHTML;

        // Add smooth scroll behavior
        tocNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('data-target');
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    const offset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - offset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Add scroll spy for TOC
        window.addEventListener('scroll', updateActiveTOC);
        updateActiveTOC();
    }

    // Update active TOC item on scroll
    function updateActiveTOC() {
        const tocNav = document.getElementById('toc-nav');
        if (!tocNav) return;

        // 只选择有 ID 的标题（跳过没有 ID 的中文版本标题）
        const headings = Array.from(document.querySelectorAll('#experience-md h3')).filter(h => h.id);
        const tocLinks = tocNav.querySelectorAll('a');

        if (headings.length === 0) return;

        let currentHeading = null;
        const windowHeight = window.innerHeight;

        // 找到当前可见的标题（使用视口40%作为阈值）
        headings.forEach(heading => {
            const rect = heading.getBoundingClientRect();
            if (rect.top <= windowHeight * 0.4) {
                currentHeading = heading.id;
            }
        });

        // 如果没有找到，默认高亮第一个（如果在视口内）
        if (!currentHeading && headings.length > 0) {
            const firstHeading = headings[0];
            const rect = firstHeading.getBoundingClientRect();
            if (rect.top <= windowHeight) {
                currentHeading = firstHeading.id;
            }
        }

        tocLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-target') === currentHeading) {
                link.classList.add('active');
            }
        });
    }

}); 
