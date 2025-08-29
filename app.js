// NICE-Branded Resume Application JavaScript - Enhanced Version

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive features
    initSmoothScrolling();
    initSkillInteractions();
    initSectionAnimations();
    initProjectCardAnimations();
    initContactInteractions();
    initNiceThemeEnhancements();
    initAccessibilityFeatures();
    initPerformanceOptimizations();
    initExperienceTimeline();
});

/**
 * Smooth scrolling for internal navigation
 */
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
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
}

/**
 * Enhanced skill tag and category interactions
 */
function initSkillInteractions() {
    const skillTags = document.querySelectorAll('.skill-tag');
    const skillCategories = document.querySelectorAll('.skill-category');
    
    // Skill tag hover and click effects
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.boxShadow = '0 2px 8px rgba(0, 115, 207, 0.3)';
            this.style.transition = 'all 0.2s ease';
        });
        
        tag.addEventListener('mouseleave', function() {
            if (!this.classList.contains('skill-selected')) {
                this.style.transform = 'scale(1)';
                this.style.boxShadow = 'none';
            }
        });
        
        // Add click interaction for mobile and desktop
        tag.addEventListener('click', function() {
            this.classList.add('skill-selected');
            showNotification(`${this.textContent} skill highlighted`);
            setTimeout(() => {
                this.classList.remove('skill-selected');
                this.style.transform = 'scale(1)';
                this.style.boxShadow = 'none';
            }, 1000);
        });
    });
    
    // Skill category hover effects
    skillCategories.forEach(category => {
        category.addEventListener('mouseenter', function() {
            const title = this.querySelector('.skill-category-title');
            if (title) {
                title.style.color = 'var(--nice-blue-dark)';
                title.style.transition = 'color 0.3s ease';
            }
        });
        
        category.addEventListener('mouseleave', function() {
            const title = this.querySelector('.skill-category-title');
            if (title) {
                title.style.color = 'var(--nice-blue)';
            }
        });
    });
}

/**
 * Section reveal animations on scroll
 */
function initSectionAnimations() {
    const sections = document.querySelectorAll('.section');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                
                // Animate section title
                const sectionTitle = entry.target.querySelector('.section-title');
                if (sectionTitle) {
                    setTimeout(() => {
                        sectionTitle.style.transform = 'translateX(0)';
                        sectionTitle.style.opacity = '1';
                    }, 200);
                }
                
                // Stagger child elements
                const childElements = entry.target.querySelectorAll('.skill-category, .experience-item, .project-card, .alignment-item, .certification-card');
                childElements.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                        child.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    }, 100 + (index * 100));
                });
                
                sectionObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        sectionObserver.observe(section);
        
        // Initialize section title
        const sectionTitle = section.querySelector('.section-title');
        if (sectionTitle) {
            sectionTitle.style.transform = 'translateX(-20px)';
            sectionTitle.style.opacity = '0';
            sectionTitle.style.transition = 'all 0.5s ease';
        }
        
        // Initialize child elements
        const childElements = section.querySelectorAll('.skill-category, .experience-item, .project-card, .alignment-item, .certification-card');
        childElements.forEach(child => {
            child.style.opacity = '0';
            child.style.transform = 'translateY(20px)';
        });
    });
}

/**
 * Project card interactions and KPI animations
 */
function initProjectCardAnimations() {
    const projectCards = document.querySelectorAll('.project-card');
    const metrics = document.querySelectorAll('.metric-number');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const techTags = this.querySelectorAll('.tech-tag');
            techTags.forEach((tag, index) => {
                setTimeout(() => {
                    tag.style.transform = 'translateY(-2px)';
                    tag.style.transition = 'transform 0.2s ease';
                }, index * 50);
            });
            
            // Add subtle glow effect
            this.style.boxShadow = '0 8px 25px rgba(0, 115, 207, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            const techTags = this.querySelectorAll('.tech-tag');
            techTags.forEach(tag => {
                tag.style.transform = 'translateY(0)';
            });
            this.style.boxShadow = 'var(--card-shadow)';
        });
    });
    
    // Animate metrics when they come into view
    const metricObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateMetric(entry.target);
                metricObserver.unobserve(entry.target);
            }
        });
    });
    
    metrics.forEach(metric => {
        metricObserver.observe(metric);
    });
}

/**
 * Animate metric numbers with improved easing
 */
function animateMetric(metricElement) {
    const text = metricElement.textContent;
    const number = parseFloat(text.replace(/[^\d.]/g, ''));
    const suffix = text.replace(/[\d.]/g, '').replace(/^\s+/, '');
    
    if (isNaN(number)) return;
    
    let current = 0;
    const duration = 1500; // 1.5 seconds for smoother animation
    const startTime = performance.now();
    
    function updateNumber(timestamp) {
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        current = number * easeOutQuart(progress);
        
        if (suffix.includes('%')) {
            metricElement.textContent = Math.round(current) + '%';
        } else if (suffix.includes('K')) {
            metricElement.textContent = Math.round(current) + 'K+';
        } else if (text.includes('.')) {
            metricElement.textContent = current.toFixed(1) + suffix;
        } else {
            metricElement.textContent = Math.round(current) + suffix;
        }
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        } else {
            // Add completion effect
            metricElement.style.color = 'var(--nice-blue)';
            setTimeout(() => {
                metricElement.style.color = '';
            }, 300);
        }
    }
    
    requestAnimationFrame(updateNumber);
}

/**
 * Easing function for smooth animations
 */
function easeOutQuart(t) {
    return 1 - Math.pow(1 - t, 4);
}

/**
 * Contact information interactions with enhanced feedback
 */
function initContactInteractions() {
    const contactItems = document.querySelectorAll('.contact-item');
    
    contactItems.forEach(item => {
        const text = item.querySelector('span:last-child').textContent;
        
        // Add hover effects
        item.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
            this.style.borderRadius = '4px';
            this.style.transition = 'all 0.2s ease';
            this.style.cursor = 'pointer';
            this.style.transform = 'translateX(5px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'transparent';
            this.style.transform = 'translateX(0)';
        });
        
        // Make contact items clickable with feedback
        if (text.includes('@')) {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                try {
                    window.location.href = `mailto:${text}`;
                    showNotification('Opening email client...');
                } catch (error) {
                    showNotification('Please copy email address: ' + text);
                }
            });
        } else if (text.includes('linkedin.com')) {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                window.open(`https://${text}`, '_blank');
                showNotification('LinkedIn profile opened in new tab');
            });
        } else if (text.includes('+91')) {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                try {
                    window.location.href = `tel:${text}`;
                    showNotification('Opening phone dialer...');
                } catch (error) {
                    showNotification('Phone number: ' + text);
                }
            });
        }
    });
}

/**
 * Enhanced notification system
 */
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.textContent = message;
    
    const colors = {
        info: 'var(--nice-blue)',
        success: 'var(--nice-blue-light)',
        warning: '#FFA500',
        error: '#FF4444'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colors[type]};
        color: white;
        padding: 12px 20px;
        border-radius: 6px;
        font-size: 14px;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0, 115, 207, 0.3);
        opacity: 0;
        transform: translateY(-20px);
        transition: all 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

/**
 * Optimize layout and content for printing
 */
function optimizeForPrint() {
    // Ensure all sections are visible
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.opacity = '1';
        section.style.transform = 'translateY(0)';
        section.style.pageBreakInside = 'avoid';
    });
    
    // Reset all animations for print
    const animatedElements = document.querySelectorAll('.skill-category, .experience-item, .project-card, .alignment-item, .certification-card');
    animatedElements.forEach(element => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
        element.style.animation = 'none';
        element.style.transition = 'none';
    });
    
    // Hide print button during printing
    const printButton = document.querySelector('.print-button');
    if (printButton) {
        printButton.style.display = 'none';
    }
}

/**
 * NICE theme-specific enhancements
 */
function initNiceThemeEnhancements() {
    // Add subtle NICE blue glow to interactive elements
    const interactiveElements = document.querySelectorAll('.skill-tag, .project-card, .alignment-item, .certification-card');
    
    interactiveElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.boxShadow = '0 0 0 2px rgba(0, 115, 207, 0.3)';
        });
        
        element.addEventListener('blur', function() {
            this.style.boxShadow = '';
        });
    });
    
    // Add NICE dot pulse animation
    const niceDots = document.querySelectorAll('.nice-dot');
    
    niceDots.forEach((dot, index) => {
        setInterval(() => {
            dot.style.opacity = '0.6';
            dot.style.transform = 'scale(1.2)';
            dot.style.transition = 'all 0.3s ease';
            setTimeout(() => {
                dot.style.opacity = '1';
                dot.style.transform = 'scale(1)';
            }, 300);
        }, 4000 + (index * 1000));
    });
    
    // Add subtle background animation to Why NICE section
    const whyNiceSection = document.querySelector('.why-nice-section');
    if (whyNiceSection) {
        let angle = 0;
        const animate = () => {
            angle += 0.2;
            whyNiceSection.style.background = `
                linear-gradient(${angle}deg, var(--nice-light-gray) 0%, rgba(0, 115, 207, 0.02) 50%, var(--nice-light-gray) 100%)
            `;
            requestAnimationFrame(animate);
        };
        animate();
    }
}

/**
 * Experience timeline animations
 */
function initExperienceTimeline() {
    const experienceItems = document.querySelectorAll('.experience-item');
    const kpiHighlights = document.querySelectorAll('.kpi-highlight');
    
    experienceItems.forEach((item, index) => {
        item.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 8px 25px rgba(0, 115, 207, 0.2)';
            this.style.borderColor = 'var(--nice-blue-light)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.boxShadow = 'var(--card-shadow)';
            this.style.borderColor = 'var(--nice-gray)';
        });
    });
    
    // Animate KPI highlights on scroll
    const kpiObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.animation = 'kpi-pulse 0.6s ease-in-out';
                }, 500);
                kpiObserver.unobserve(entry.target);
            }
        });
    });
    
    kpiHighlights.forEach(kpi => {
        kpiObserver.observe(kpi);
    });
}

/**
 * Accessibility enhancements
 */
function initAccessibilityFeatures() {
    // Add ARIA labels
    const niceDots = document.querySelectorAll('.nice-dot');
    niceDots.forEach(dot => {
        dot.setAttribute('aria-hidden', 'true');
    });
    
    // Keyboard navigation support
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.setAttribute('tabindex', '0');
        tag.setAttribute('role', 'button');
        tag.setAttribute('aria-label', `${tag.textContent} skill`);
        
        tag.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Focus management
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // Add focus indicators
    const style = document.createElement('style');
    style.textContent = `
        .keyboard-navigation *:focus {
            outline: 2px solid var(--nice-blue) !important;
            outline-offset: 2px;
        }
        
        @keyframes kpi-pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); background: var(--nice-blue-light); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);
}

/**
 * Performance optimizations
 */
function initPerformanceOptimizations() {
    // Debounce scroll events
    let scrollTimeout;
    let isScrolling = false;
    
    function handleScroll() {
        if (!isScrolling) {
            requestAnimationFrame(function() {
                // Handle scroll-based updates here
                isScrolling = false;
            });
            isScrolling = true;
        }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Preload hover states
    const hoverElements = document.querySelectorAll('.project-card, .skill-category, .alignment-item');
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.classList.add('hover-active');
        });
        
        element.addEventListener('mouseleave', function() {
            this.classList.remove('hover-active');
        });
    });
    
    // Initialize intersection observer for header
    const header = document.querySelector('.header');
    const headerObserver = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    });
    
    if (header) {
        headerObserver.observe(header);
    }
}


/**
 * Export functions for potential external use
 */
window.NiceResumeApp = {
    initSmoothScrolling,
    initSkillInteractions,
    initSectionAnimations,
    initProjectCardAnimations,
    showNotification,
    animateMetric,
    optimizeForPrint
};