// Employment Quiz - ORB Bypass Solution
// This file uses fetch() to load the quiz content, bypassing ORB restrictions

(function() {
    'use strict';
    
    const container = document.getElementById('employment-quiz');
    if (!container) {
        console.error('Employment quiz container not found');
        return;
    }
    
    // Load quiz content via fetch (bypasses ORB)
    async function loadQuiz() {
        try {
            const response = await fetch('https://raw.githubusercontent.com/andylackie/claimcalc/main/webflow-quiz.min.js');
            if (!response.ok) throw new Error('Failed to load quiz');
            
            const scriptContent = await response.text();
            
            // Create a script element and execute the content
            const script = document.createElement('script');
            script.textContent = scriptContent;
            document.head.appendChild(script);
            
        } catch (error) {
            console.error('Error loading quiz:', error);
            // Fallback: show error message
            container.innerHTML = `
                <div style="padding: 20px; text-align: center; color: #666;">
                    <p>Quiz loading failed. Please refresh the page.</p>
                </div>
            `;
        }
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadQuiz);
    } else {
        loadQuiz();
    }
})();
