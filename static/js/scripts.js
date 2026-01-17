const content_dir = 'contents/'
const config_file = 'config.yml'
const section_names = ['home', 'awards', 'experience', 'publications'];

// 全局语言状态
let currentLang = 'zh';

window.addEventListener('DOMContentLoaded', event => {

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
                    document.getElementById(key).innerHTML = yml[key];
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

        const headings = document.querySelectorAll('#experience-md h3, #experience-md h4');
        const tocLinks = tocNav.querySelectorAll('a');

        let currentHeading = null;

        headings.forEach(heading => {
            const rect = heading.getBoundingClientRect();
            if (rect.top <= 100) {
                currentHeading = heading.id;
            }
        });

        tocLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-target') === currentHeading) {
                link.classList.add('active');
            }
        });
    }

}); 
