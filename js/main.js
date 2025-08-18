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

    let slideTimeline = null;

    // Initialize the presentation
    deck.initialize().then(() => {
        // Dispatch a custom event when Reveal is ready
        window.dispatchEvent(new Event('reveal-ready'));

        // Start animations for the first slide
        slideTimeline = triggerSlideAnimations(deck.getCurrentSlide());
    });

    // Listen for slide changes to trigger animations
    deck.addEventListener('slidechanged', function(event) {
        // Kill any existing timeline to avoid overlapping animations
        if (slideTimeline) {
            slideTimeline.kill();
        }

        // Trigger animations for the current slide
        slideTimeline = triggerSlideAnimations(event.currentSlide);
    });

    // Function to trigger animations for a slide
    function triggerSlideAnimations(slide) {
        if (!slide) return gsap.timeline(); // Exit if slide is undefined

        const tl = gsap.timeline();

        // Make strategy numbers animated
        if (slide.querySelector('.strategy-number')) {
            tl.call(() => slide.classList.add('visible'));
        }

        // Animate donation tiers
        const donationTiers = slide.querySelectorAll('.donation-tier');
        if (donationTiers.length) {
            tl.from(donationTiers, { x: -20, opacity: 0, stagger: 0.2 });
        }

        // Animate influencer tiers
        const influencerTiers = slide.querySelectorAll('.influencer-tier');
        if (influencerTiers.length) {
            tl.from(influencerTiers, { y: 20, opacity: 0, stagger: 0.15 }, "<");
        }

        // Animate timeline phases
        const timelinePhases = slide.querySelectorAll('.timeline-phase');
        if (timelinePhases.length) {
            tl.from(timelinePhases, { y: 20, opacity: 0, stagger: 0.2 }, "<");
        }

        // Animate result bars
        const resultItems = slide.querySelectorAll('.result-item');
        if (resultItems.length) {
            resultItems.forEach((item, index) => {
                const bar = item.querySelector('.result-bar');
                const value = item.getAttribute('data-value');

                if (bar && value) {
                    tl.to(bar, { width: (value * 10) + '%' }, index * 0.3);
                }
            });
        }

        // Animate metrics
        const metricItems = slide.querySelectorAll('.metric-item');
        if (metricItems.length) {
            tl.from(metricItems, { scale: 0.9, opacity: 0, stagger: 0.1 }, "<");
        }

        // Animate quote
        const blockquote = slide.querySelector('blockquote');
        const cite = slide.querySelector('cite');
        if (blockquote) {
            tl.from(blockquote, { opacity: 0, scale: 0.95 });
            if (cite) {
                tl.from(cite, { opacity: 0 }, "-=0.5");
            }
        }

        // Animate final CTA
        const finalCta = slide.querySelector('.final-cta');
        if (finalCta) {
            tl.from(finalCta, { y: 20, opacity: 0 });
        }

        return tl;
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