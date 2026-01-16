const content_dir = 'contents/'
const config_file = 'config.yml'
const section_names = ['home', 'awards', 'experience', 'publications'];


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


    // Yaml
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


    // Marked
    marked.use({ mangle: false, headerIds: false })
    section_names.forEach((name, idx) => {
        fetch(content_dir + name + '.md')
            .then(response => response.text())
            .then(markdown => {
                const html = marked.parse(markdown);
                document.getElementById(name + '-md').innerHTML = html;
            }).then(() => {
                // MathJax
                MathJax.typeset();

                // Generate TOC for experience section
                if (name === 'experience') {
                    generateTOC();
                    // Initialize language switcher after content is loaded
                    initLanguageSwitcher();
                }
            })
            .catch(error => console.log(error));
    })

    // Generate Table of Contents
    function generateTOC() {
        const experienceContent = document.getElementById('experience-md');
        const tocNav = document.getElementById('toc-nav');

        if (!experienceContent || !tocNav) return;

        // Find all visible h3 headings directly (compatible with pure markdown)
        const allH3 = experienceContent.querySelectorAll('h3');
        const headings = Array.from(allH3).filter(heading => {
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

    // Language switcher functionality
    function initLanguageSwitcher() {
        const langButtons = document.querySelectorAll('.lang-btn');
        langButtons.forEach(button => {
            button.addEventListener('click', function () {
                const lang = this.getAttribute('data-lang');
                switchLanguage(lang);
            });
        });

        // Initialize language (default to Chinese)
        switchLanguage('zh');
    }

    function switchLanguage(lang) {
        const experienceContent = document.getElementById('experience-md');
        if (!experienceContent) return;

        // Get all h3 headings
        const headings = experienceContent.querySelectorAll('h3');

        headings.forEach(heading => {
            const headingText = heading.textContent.trim();
            const isChinese = /[\u4e00-\u9fa5]/.test(headingText);

            if (lang === 'zh') {
                if (isChinese) {
                    showContentBlock(heading);
                } else {
                    hideContentBlock(heading);
                }
            } else {
                if (isChinese) {
                    hideContentBlock(heading);
                } else {
                    showContentBlock(heading);
                }
            }
        });

        // Update button states
        const langButtons = document.querySelectorAll('.lang-btn');
        langButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            }
        });

        // Update TOC title
        const tocTitle = document.querySelector('.toc-title');
        if (tocTitle) {
            tocTitle.textContent = lang === 'zh' ? '目录' : 'Contents';
        }

        // Regenerate TOC with current language
        generateTOC();
    }

    function showContentBlock(heading) {
        heading.style.display = 'block';
        let nextElement = heading.nextElementSibling;
        // 遍历到下一个 h3 为止，包括中间的 hr
        while (nextElement && nextElement.tagName !== 'H3') {
            nextElement.style.display = 'block';
            nextElement = nextElement.nextElementSibling;
        }
    }

    function hideContentBlock(heading) {
        heading.style.display = 'none';
        let nextElement = heading.nextElementSibling;
        // 遍历到下一个 h3 为止，包括中间的 hr 也一并隐藏
        while (nextElement && nextElement.tagName !== 'H3') {
            nextElement.style.display = 'none';
            nextElement = nextElement.nextElementSibling;
        }
    }

}); 
