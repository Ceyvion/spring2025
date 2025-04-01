document.addEventListener('DOMContentLoaded', function() {
    // Initialize Reveal.js
    const deck = new Reveal({
        // Configuration options
        width: 960,
        height: 600,
        margin: 0.05,
        minScale: 0.2,
        maxScale: 1.0,
        disableLayout: false,
        controlsTutorial: false,
        controls: true,
        progress: true,
        center: false,
        hash: true,
        transition: 'slide', // Options: none/fade/slide/convex/concave/zoom
        backgroundTransition: 'fade',
        // More options at https://revealjs.com/config/
        
        // Presentation timing
        autoSlide: 0, // Disable auto-sliding
        
        // Customize keyboard controls
        keyboard: {
            // Custom key bindings
            // Key: {function that returns or calls zero when handled}
            32: null, // Space - disable space to avoid accidental advances
            13: null, // Enter - disable enter to avoid accidental advances
            
            // Add number keys for direct navigation to strategies
            49: function() { this.slide(3); return false; },  // 1 - Strategy 1
            50: function() { this.slide(4); return false; },  // 2 - Strategy 2
            51: function() { this.slide(5); return false; },  // 3 - Strategy 3
            52: function() { this.slide(6); return false; },  // 4 - Strategy 4
            53: function() { this.slide(7); return false; },  // 5 - Strategy 5
            54: function() { this.slide(8); return false; },  // 6 - Strategy 6
            55: function() { this.slide(9); return false; },  // 7 - Strategy 7
            56: function() { this.slide(10); return false; }, // 8 - Strategy 8
            57: function() { this.slide(11); return false; }, // 9 - Strategy 9
            48: function() { this.slide(12); return false; }, // 0 - Strategy 10
        },
        
        // Plugins
        plugins: []
    });

    // Initialize the presentation
    deck.initialize().then(() => {
        // Dispatch a custom event when Reveal is ready
        window.dispatchEvent(new Event('reveal-ready'));
        
        // Start animations for the first slide
        triggerSlideAnimations(deck.getCurrentSlide());
    });
    
    // Listen for slide changes to trigger animations
    deck.addEventListener('slidechanged', function(event) {
        // Get the current slide
        const currentSlide = event.currentSlide;
        
        // Get index of current slide
        const currentIndex = event.indexh;
        console.log(`Current slide index: ${currentIndex}`);
        
        // Trigger animations for the current slide
        triggerSlideAnimations(currentSlide);
    });
    
    // Trigger animations for the first slide immediately
    triggerSlideAnimations(deck.getCurrentSlide());
    
    // Function to trigger animations for a slide
    function triggerSlideAnimations(slide) {
        if (!slide) return; // Exit if slide is undefined
        
        // Make strategy numbers animated
        if (slide.querySelector('.strategy-number')) {
            slide.classList.add('visible');
        }
        
        // Animate donation tiers
        const donationTiers = slide.querySelectorAll('.donation-tier');
        if (donationTiers.length) {
            donationTiers.forEach((tier, index) => {
                setTimeout(() => {
                    tier.classList.add('visible');
                }, 200 * index);
            });
        }
        
        // Animate influencer tiers
        const influencerTiers = slide.querySelectorAll('.influencer-tier');
        if (influencerTiers.length) {
            influencerTiers.forEach((tier, index) => {
                setTimeout(() => {
                    tier.classList.add('visible');
                }, 150 * index);
            });
        }
        
        // Animate timeline phases
        const timelinePhases = slide.querySelectorAll('.timeline-phase');
        if (timelinePhases.length) {
            timelinePhases.forEach((phase, index) => {
                setTimeout(() => {
                    phase.classList.add('visible');
                }, 200 * index);
            });
        }
        
        // Animate result bars
        const resultItems = slide.querySelectorAll('.result-item');
        if (resultItems.length) {
            resultItems.forEach((item, index) => {
                setTimeout(() => {
                    const bar = item.querySelector('.result-bar');
                    const value = item.getAttribute('data-value');
                    
                    if (bar && value) {
                        // Set width based on the data-value attribute (multiplied for visual effect)
                        bar.style.width = (value * 10) + '%';
                    }
                }, 300 * index);
            });
        }
        
        // Animate metrics
        const metricItems = slide.querySelectorAll('.metric-item');
        if (metricItems.length) {
            metricItems.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('visible');
                }, 100 * index);
            });
        }
        
        // Animate quote
        const blockquote = slide.querySelector('blockquote');
        const cite = slide.querySelector('cite');
        if (blockquote) {
            setTimeout(() => {
                blockquote.classList.add('visible');
                if (cite) {
                    setTimeout(() => {
                        cite.classList.add('visible');
                    }, 500);
                }
            }, 300);
        }
        
        // Animate final CTA
        const finalCta = slide.querySelector('.final-cta');
        if (finalCta) {
            setTimeout(() => {
                finalCta.classList.add('visible');
            }, 1000);
        }
    }
    
    // Handle keyboard navigation
    document.addEventListener('keydown', function(event) {
        // Custom keyboard handling if needed
        // For example, implementing custom navigation for the strategy wheel
    });
    
    // Export deck to global scope for other scripts to access
    window.presentationDeck = deck;
});

// Helper functions
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Global navigation function to go to a specific strategy
window.goToStrategy = function(strategyNumber) {
    if (!strategyNumber || strategyNumber < 1 || strategyNumber > 10) return;
    
    const targetSlide = strategyNumber + 2; // +2 for intro slides
    console.log(`Going to strategy ${strategyNumber} (slide ${targetSlide})`);
    
    // Try all possible navigation methods
    try {
        if (window.Reveal) {
            // Reveal.js methods (correct API method)
            window.Reveal.slide(targetSlide, 0);
        } else if (window.presentationDeck) {
            // Our exported deck instance
            if (typeof window.presentationDeck.slide === 'function') {
                window.presentationDeck.slide(targetSlide, 0);
            }
        }
    } catch (e) {
        console.error("Navigation error:", e);
        // Fallback to keyboard shortcut simulation
        if (targetSlide >= 0 && targetSlide <= 9) {
            document.dispatchEvent(new KeyboardEvent('keydown', {'key': String(targetSlide)}));
        }
    }
};