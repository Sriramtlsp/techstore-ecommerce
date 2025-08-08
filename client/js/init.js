// Initialize all TechStore features
(function() {
    'use strict';
    
    // Load live chat
    function loadLiveChat() {
        const script = document.createElement('script');
        script.src = '/js/livechat.js';
        script.async = true;
        script.onload = function() {
            console.log('Live chat loaded successfully');
        };
        script.onerror = function() {
            console.error('Failed to load live chat');
        };
        document.head.appendChild(script);
    }
    
    // Load enhanced footer
    function loadEnhancedFooter() {
        const script = document.createElement('script');
        script.src = '/js/footer.js';
        script.async = true;
        script.onload = function() {
            console.log('Enhanced footer loaded successfully');
        };
        script.onerror = function() {
            console.error('Failed to load enhanced footer');
        };
        document.head.appendChild(script);
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(function() {
                loadLiveChat();
                loadEnhancedFooter();
            }, 1000);
        });
    } else {
        // DOM is already ready
        setTimeout(function() {
            loadLiveChat();
            loadEnhancedFooter();
        }, 1000);
    }
})();