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
                }
            })
            .catch(error => console.log(error));
    })

    // Generate Table of Contents
    function generateTOC() {
        const experienceContent = document.getElementById('experience-md');
        const tocNav = document.getElementById('toc-nav');
        
        if (!experienceContent || !tocNav) return;
        
        // Find all h3 and h4 headings
        const headings = experienceContent.querySelectorAll('h3, h4');
        
        if (headings.length === 0) {
            tocNav.innerHTML = '<p class="text-muted">暂无目录</p>';
            return;
        }
        
        let tocHTML = '<ul>';
        let currentLevel = 3;
        
        headings.forEach((heading, index) => {
            const level = parseInt(heading.tagName.charAt(1));
            const text = heading.textContent.trim();
            const id = 'heading-' + index;
            
            // Add id to heading
            heading.id = id;
            
            // Adjust nesting level
            if (level > currentLevel) {
                tocHTML += '<ul>';
            } else if (level < currentLevel) {
                tocHTML += '</ul>';
            }
            
            currentLevel = level;
            
            // Add link to TOC
            tocHTML += `<li><a href="#${id}" data-target="${id}">${text}</a></li>`;
        });
        
        // Close any open lists
        while (currentLevel > 3) {
            tocHTML += '</ul>';
            currentLevel--;
        }
        
        tocHTML += '</ul>';
        tocNav.innerHTML = tocHTML;
        
        // Add smooth scroll behavior
        tocNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function(e) {
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
