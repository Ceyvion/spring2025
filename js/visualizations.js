document.addEventListener('DOMContentLoaded', function() {
    // Wait for Reveal.js to be fully initialized
    if (typeof Reveal !== 'undefined' && Reveal.isReady()) {
        initVisualizations();
    } else {
        window.addEventListener('reveal-ready', initVisualizations);
    }
});

/**
 * Initialize all visualizations after Reveal.js is ready
 */
function initVisualizations() {
    // Create the strategy wheel
    createStrategyWheel();
    
    // Initialize result bar animations
    initResultBars();
}

/**
 * Creates the interactive strategy wheel
 */
function createStrategyWheel() {
    const wheel = document.getElementById('strategy-wheel');
    if (!wheel) return;
    
    // Strategy data - colors match our CSS variables
    const strategies = [
        { id: 1, name: "Immersive Storytelling", color: "#5D2E8C" },
        { id: 2, name: "Challenge Architecture", color: "#FF7F00" },
        { id: 3, name: "Micro-Donation Value", color: "#00A9A5" },
        { id: 4, name: "Influencer Matrix", color: "#B71234" },
        { id: 5, name: "Gamified Engagement", color: "#FFCC00" },
        { id: 6, name: "Tech Innovation", color: "#5D2E8C" },
        { id: 7, name: "Strategic Scarcity", color: "#FF7F00" },
        { id: 8, name: "Content Ecosystem", color: "#00A9A5" },
        { id: 9, name: "Virtual Events", color: "#B71234" },
        { id: 10, name: "Measurement Framework", color: "#FFCC00" }
    ];
    // Calculate positions around the circle - adjusted for smaller wheel
    const radius = 180; // Radius of the wheel (reduced from 220)
    const centerX = 200; // Center X position (reduced from 250)
    const centerY = 200; // Center Y position (reduced from 250)
    
    
    // Create nodes for each strategy
    strategies.forEach((strategy, index) => {
        // Calculate position on the circle
        const angle = (index / strategies.length) * Math.PI * 2 - Math.PI / 2; // Start from top
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        
        // Create the strategy node
        const node = document.createElement('div');
        node.className = 'strategy-node';
        node.id = `strategy-${strategy.id}`;
        node.setAttribute('data-strategy-id', strategy.id);
        node.style.position = 'absolute';
        node.style.left = `${x}px`;
        node.style.top = `${y}px`;
        node.style.width = '50px';
        node.style.height = '50px';
        node.style.borderRadius = '50%';
        node.style.backgroundColor = strategy.color;
        node.style.display = 'flex';
        node.style.justifyContent = 'center';
        node.style.alignItems = 'center';
        node.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.3)';
        node.style.transform = 'translate(-50%, -50%)';
        node.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        node.style.cursor = 'pointer';
        node.style.zIndex = '1';
        
        // Add the strategy number
        const number = document.createElement('span');
        number.textContent = strategy.id;
        number.style.color = '#FFFFFF';
        number.style.fontFamily = 'var(--heading-font)';
        number.style.fontWeight = 'bold';
        number.style.fontSize = '1.5em';
        node.appendChild(number);
        
        // Add hover tooltip with strategy name
        const tooltip = document.createElement('div');
        tooltip.className = 'strategy-tooltip';
        tooltip.textContent = strategy.name;
        tooltip.style.position = 'absolute';
        tooltip.style.bottom = '70px';
        tooltip.style.left = '50%';
        tooltip.style.transform = 'translateX(-50%)';
        tooltip.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        tooltip.style.color = '#FFFFFF';
        tooltip.style.padding = '5px 10px';
        tooltip.style.borderRadius = '5px';
        tooltip.style.whiteSpace = 'nowrap';
        tooltip.style.opacity = '0';
        tooltip.style.transition = 'opacity 0.3s ease';
        tooltip.style.pointerEvents = 'none';
        node.appendChild(tooltip);
        
        // Add hover effect for tooltip
        node.addEventListener('mouseenter', () => {
            tooltip.style.opacity = '1';
        });
        node.addEventListener('mouseleave', () => {
            tooltip.style.opacity = '0';
        });
        // Add click event to navigate to the strategy slide
        node.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Calculate target slide index (strategy.id + 2 to account for intro slides)
            const targetIndex = strategy.id + 2;
            
            console.log(`Clicking on strategy #${strategy.id}, navigating to slide ${targetIndex}`);
            
            // Use different navigation methods for compatibility
            if (window.Reveal) {
                // Direct Reveal access
                window.Reveal.slide(targetIndex);
            } else if (window.presentationDeck) {
                if (typeof window.presentationDeck.slide === 'function') {
                    window.presentationDeck.slide(targetIndex);
                } else if (typeof window.presentationDeck.navigateTo === 'function') {
                    window.presentationDeck.navigateTo(targetIndex);
                }
            }
            
            // Add a small delay and try navigation methods again
            setTimeout(() => {
                try {
                    window.Reveal.slide(targetIndex);
                } catch (e) {
                    console.log("Delayed navigation fallback");
                }
            }, 100);
        });
        
        
        // Add node to wheel
        wheel.appendChild(node);
    });
    
    // Create center node
    const centerNode = document.createElement('div');
    centerNode.className = 'center-node';
    centerNode.style.position = 'absolute';
    centerNode.style.left = `${centerX}px`;
    centerNode.style.top = `${centerY}px`;
    centerNode.style.width = '80px';
    centerNode.style.height = '80px';
    centerNode.style.borderRadius = '50%';
    centerNode.style.backgroundColor = '#333333';
    centerNode.style.border = '3px solid #F5F1E8';
    centerNode.style.display = 'flex';
    centerNode.style.justifyContent = 'center';
    centerNode.style.alignItems = 'center';
    centerNode.style.boxShadow = '0 0 20px rgba(0, 0, 0, 0.5)';
    centerNode.style.transform = 'translate(-50%, -50%)';
    centerNode.style.zIndex = '2';
    centerNode.textContent = '10X';
    centerNode.style.color = '#FFFFFF';
    centerNode.style.fontFamily = 'var(--heading-font)';
    centerNode.style.fontWeight = 'bold';
    centerNode.style.fontSize = '1.8em';
    
    // Add the center node
    wheel.appendChild(centerNode);
    
    // Add connecting lines from center to each node
    strategies.forEach((strategy, index) => {
        const angle = (index / strategies.length) * Math.PI * 2 - Math.PI / 2;
        const innerX = centerX + 50 * Math.cos(angle);
        const innerY = centerY + 50 * Math.sin(angle);
        const outerX = centerX + radius * Math.cos(angle);
        const outerY = centerY + radius * Math.sin(angle);
        
        const line = document.createElement('div');
        line.className = 'connector-line';
        
        // Calculate the length of the line
        const length = Math.sqrt(Math.pow(outerX - innerX, 2) + Math.pow(outerY - innerY, 2));
        
        // Calculate the angle of the line
        const angleDeg = Math.atan2(outerY - innerY, outerX - innerX) * 180 / Math.PI;
        
        // Set line styles
        line.style.position = 'absolute';
        line.style.left = `${innerX}px`;
        line.style.top = `${innerY}px`;
        line.style.width = `${length}px`;
        line.style.height = '2px';
        line.style.backgroundColor = strategy.color;
        line.style.transformOrigin = '0 0';
        line.style.transform = `rotate(${angleDeg}deg)`;
        line.style.opacity = '0.6';
        line.style.zIndex = '0';
        
        // Add the line
        wheel.appendChild(line);
    });
}

/**
 * Initializes the result bars with animation
 */
function initResultBars() {
    // We'll use IntersectionObserver to trigger animations when in view
    if ('IntersectionObserver' in window) {
        const resultObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const resultItem = entry.target;
                    const bar = resultItem.querySelector('.result-bar');
                    const value = resultItem.getAttribute('data-value');
                    
                    if (bar && value) {
                        setTimeout(() => {
                            // Set width based on the data-value (multiplied for visual effect)
                            bar.style.width = (value * 10) + '%';
                        }, 200);
                    }
                    
                    // Unobserve after animating
                    resultObserver.unobserve(resultItem);
                }
            });
        }, { threshold: 0.2 });
        
        // Observe all result items
        document.querySelectorAll('.result-item').forEach(item => {
            resultObserver.observe(item);
        });
    }
}

/**
 * Creates a visual animation for the rhythm circle
 */
function animateRhythmVisualization() {
    const rhythmCircle = document.querySelector('.rhythm-circle');
    if (!rhythmCircle) return;
    
    // Use GSAP for more complex animation if available
    if (window.gsap) {
        gsap.to(rhythmCircle, {
            scale: 1.2,
            duration: 0.3,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
            repeatDelay: 0.5
        });
    }
}