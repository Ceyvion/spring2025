document.addEventListener('DOMContentLoaded', function() {
    // Wait for Reveal.js to initialize before setting up interactions
    if (typeof Reveal !== 'undefined') {
        // If Reveal is already loaded
        initializeInteractions();
    } else {
        // Otherwise wait for Reveal to be loaded
        window.addEventListener('reveal-ready', initializeInteractions);
    }
});

/**
 * Initializes all interactive elements after Reveal.js is ready
 */
function initializeInteractions() {
    // Initialize interactive elements
    setupExpandableContent();
    initializeAnimations();
    addTouchSupport();
}

/**
 * Sets up any expandable/collapsible content sections
 */
function setupExpandableContent() {
    // Get all expandable containers
    const expandableContainers = document.querySelectorAll('.expandable-container');
    
    expandableContainers.forEach(container => {
        const header = container.querySelector('.expandable-header');
        const content = container.querySelector('.expandable-content');
        
        if (header && content) {
            // Set initial state
            content.style.display = 'none';
            
            // Add toggle functionality
            header.addEventListener('click', () => {
                const isExpanded = content.style.display !== 'none';
                
                // Toggle content visibility
                if (isExpanded) {
                    content.style.display = 'none';
                    container.classList.remove('expanded');
                    header.classList.remove('expanded');
                } else {
                    content.style.display = 'block';
                    container.classList.add('expanded');
                    header.classList.add('expanded');
                }
            });
            
            // Add expand/collapse indicator
            const indicator = document.createElement('span');
            indicator.className = 'expand-indicator';
            indicator.innerHTML = '+';
            header.appendChild(indicator);
            
            // Update indicator based on state
            header.addEventListener('click', () => {
                const isExpanded = content.style.display !== 'none';
                indicator.innerHTML = isExpanded ? '−' : '+';
            });
        }
    });
}

/**
 * Initializes animations that need JavaScript support
 */
function initializeAnimations() {
    // Animate the rhythm visualization
    animateRhythmVisualization();
    
    // Set up scroll-triggered animations
    setupScrollAnimations();
}

/**
 * Sets up animations triggered by scrolling/slide changes
 */
function setupScrollAnimations() {
    // Check if IntersectionObserver is available
    if ('IntersectionObserver' in window) {
        // Create observer for animated elements
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    // Unobserve after animating once
                    animationObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        // Observe elements with .animate-on-visible class
        document.querySelectorAll('.animate-on-visible').forEach(item => {
            animationObserver.observe(item);
        });
    }
}

/**
 * Makes the presentation more touch-friendly
 */
function addTouchSupport() {
    // Add touch events to strategy wheel nodes
    const strategyNodes = document.querySelectorAll('.strategy-node');
    
    strategyNodes.forEach(node => {
        // Add touch events for mobile devices
        node.addEventListener('touchstart', function(e) {
            // Prevent default to avoid scrolling
            e.preventDefault();
            
            // Show tooltip
            const tooltip = this.querySelector('.strategy-tooltip');
            if (tooltip) {
                tooltip.style.opacity = '1';
            }
        });
        
        node.addEventListener('touchend', function() {
            // Trigger click event
            this.click();
            
            // Hide tooltip
            const tooltip = this.querySelector('.strategy-tooltip');
            if (tooltip) {
                tooltip.style.opacity = '0';
            }
        });
    });
    
    // Support swipe navigation for slides
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    document.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const threshold = 50; // Minimum pixel distance for swipe
        
        if (touchEndX < touchStartX - threshold) {
            // Swipe left - next slide
            window.presentationDeck.next();
        }
        
        if (touchEndX > touchStartX + threshold) {
            // Swipe right - previous slide
            window.presentationDeck.prev();
        }
    }
}

/**
 * Handles keyboard shortcuts for presentation navigation
 */
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Custom keyboard shortcuts here
        if (e.key === 'o' || e.key === 'O') {
            // Example: Overview mode (built into Reveal.js)
            window.presentationDeck.toggleOverview();
        }
    });
}

/**
 * Creates an animated audio visualization when enabled
 */
function createAudioVisualization() {
    // Check if Web Audio API is available
    if (window.AudioContext || window.webkitAudioContext) {
        // Implementation would go here for audio visualization
        // This is a placeholder for a more complex implementation
        console.log('Audio visualization available');
    }
}

/**
 * Handles dynamic content loading for a more interactive experience
 */
function loadDynamicContent(contentId, targetElement) {
    // Simulating content loading
    const contentMap = {
        'story-1': {
            title: 'The Origins of Afrobeat',
            body: 'Exploring how Fela Kuti pioneered the revolutionary sound in the 1970s, blending jazz, funk, and traditional African rhythms.'
        },
        'story-2': {
            title: 'Cultural Preservation Through Sound',
            body: 'How Afropop Worldwide has documented and preserved endangered music traditions across the continent.'
        }
    };
    
    if (contentMap[contentId] && targetElement) {
        // Create content elements
        const contentDiv = document.createElement('div');
        contentDiv.className = 'dynamic-content';
        
        const title = document.createElement('h3');
        title.textContent = contentMap[contentId].title;
        
        const body = document.createElement('p');
        body.textContent = contentMap[contentId].body;
        
        // Append to container
        contentDiv.appendChild(title);
        contentDiv.appendChild(body);
        
        // Clear previous content and add new content
        targetElement.innerHTML = '';
        targetElement.appendChild(contentDiv);
        
        // Add fade-in animation
        contentDiv.style.opacity = '0';
        setTimeout(() => {
            contentDiv.style.opacity = '1';
        }, 10);
    }
}