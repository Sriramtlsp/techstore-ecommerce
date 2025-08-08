// Enhanced Footer Component for TechStore
function createEnhancedFooter() {
    const footer = document.querySelector('footer');
    if (!footer) return;

    footer.innerHTML = `
        <div class="container">
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; text-align: left; margin-bottom: 2rem;">
                <div>
                    <h4 style="margin-bottom: 1rem; color: #3498db;">TechStore</h4>
                    <p style="margin-bottom: 1rem;">Your trusted partner for laptop accessories, computer peripherals, and printer accessories.</p>
                    <div style="margin-bottom: 0.5rem;">
                        <span style="margin-right: 0.5rem;">📧</span>
                        <a href="mailto:support@techstore.com" style="color: #bdc3c7; text-decoration: none;">support@techstore.com</a>
                    </div>
                    <div style="margin-bottom: 0.5rem;">
                        <span style="margin-right: 0.5rem;">📞</span>
                        <a href="tel:+919876543210" style="color: #bdc3c7; text-decoration: none;">+91 98765 43210</a>
                    </div>
                    <div>
                        <span style="margin-right: 0.5rem;">📍</span>
                        <span style="color: #bdc3c7;">Mumbai, Maharashtra, India</span>
                    </div>
                </div>
                
                <div>
                    <h4 style="margin-bottom: 1rem; color: #3498db;">Quick Links</h4>
                    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                        <a href="/" style="color: #bdc3c7; text-decoration: none; transition: color 0.3s;" onmouseover="this.style.color='#3498db'" onmouseout="this.style.color='#bdc3c7'">🏠 Home</a>
                        <a href="/#products" style="color: #bdc3c7; text-decoration: none; transition: color 0.3s;" onmouseover="this.style.color='#3498db'" onmouseout="this.style.color='#bdc3c7'">🛍️ Products</a>
                        <a href="/track.html" style="color: #bdc3c7; text-decoration: none; transition: color 0.3s;" onmouseover="this.style.color='#3498db'" onmouseout="this.style.color='#bdc3c7'">📦 Track Order</a>
                        <a href="/contact.html" style="color: #bdc3c7; text-decoration: none; transition: color 0.3s;" onmouseover="this.style.color='#3498db'" onmouseout="this.style.color='#bdc3c7'">📞 Contact</a>
                    </div>
                </div>
                
                <div>
                    <h4 style="margin-bottom: 1rem; color: #3498db;">Support</h4>
                    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                        <a href="/about.html" style="color: #bdc3c7; text-decoration: none; transition: color 0.3s;" onmouseover="this.style.color='#3498db'" onmouseout="this.style.color='#bdc3c7'">ℹ️ About Us</a>
                        <a href="/privacy.html" style="color: #bdc3c7; text-decoration: none; transition: color 0.3s;" onmouseover="this.style.color='#3498db'" onmouseout="this.style.color='#bdc3c7'">🔒 Privacy Policy</a>
                        <a href="/terms.html" style="color: #bdc3c7; text-decoration: none; transition: color 0.3s;" onmouseover="this.style.color='#3498db'" onmouseout="this.style.color='#bdc3c7'">📋 Terms of Service</a>
                        <a href="/contact.html" style="color: #bdc3c7; text-decoration: none; transition: color 0.3s;" onmouseover="this.style.color='#3498db'" onmouseout="this.style.color='#bdc3c7'">❓ Help Center</a>
                    </div>
                </div>
                
                <div>
                    <h4 style="margin-bottom: 1rem; color: #3498db;">Connect With Us</h4>
                    <div style="display: flex; gap: 1rem; margin-bottom: 1rem;">
                        <a href="#" style="color: #bdc3c7; font-size: 1.5rem; transition: transform 0.3s;" onmouseover="this.style.transform='scale(1.2)'" onmouseout="this.style.transform='scale(1)'" title="Facebook">📘</a>
                        <a href="#" style="color: #bdc3c7; font-size: 1.5rem; transition: transform 0.3s;" onmouseover="this.style.transform='scale(1.2)'" onmouseout="this.style.transform='scale(1)'" title="Instagram">📷</a>
                        <a href="#" style="color: #bdc3c7; font-size: 1.5rem; transition: transform 0.3s;" onmouseover="this.style.transform='scale(1.2)'" onmouseout="this.style.transform='scale(1)'" title="Twitter">🐦</a>
                        <a href="#" style="color: #bdc3c7; font-size: 1.5rem; transition: transform 0.3s;" onmouseover="this.style.transform='scale(1.2)'" onmouseout="this.style.transform='scale(1)'" title="LinkedIn">💼</a>
                    </div>
                    
                    <div>
                        <p style="font-size: 0.9rem; margin-bottom: 0.5rem; color: #bdc3c7;">📧 Subscribe to our newsletter</p>
                        <div style="display: flex; gap: 0.5rem;">
                            <input type="email" id="newsletter-email" placeholder="Your email" style="flex: 1; padding: 0.5rem; border: none; border-radius: 3px; font-size: 0.9rem;">
                            <button onclick="subscribeNewsletter()" style="background: #3498db; color: white; border: none; padding: 0.5rem 1rem; border-radius: 3px; cursor: pointer; font-size: 0.9rem; transition: background 0.3s;" onmouseover="this.style.background='#2980b9'" onmouseout="this.style.background='#3498db'">Subscribe</button>
                        </div>
                    </div>
                </div>
            </div>
            
            <hr style="border-color: #34495e; margin: 2rem 0;">
            
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
                <p style="margin: 0;">&copy; 2024 TechStore. All rights reserved.</p>
                <div style="display: flex; gap: 1rem; font-size: 0.9rem;">
                    <span style="color: #bdc3c7;">🔒 Secure Payments</span>
                    <span style="color: #bdc3c7;">🚚 Free Shipping</span>
                    <span style="color: #bdc3c7;">↩️ Easy Returns</span>
                </div>
            </div>
        </div>
    `;
}

// Newsletter subscription function
function subscribeNewsletter() {
    const email = document.getElementById('newsletter-email').value;
    if (!email) {
        alert('Please enter your email address');
        return;
    }
    
    if (!isValidEmail(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Simulate newsletter subscription
    alert('Thank you for subscribing to our newsletter!');
    document.getElementById('newsletter-email').value = '';
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Initialize enhanced footer when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Small delay to ensure page is fully loaded
    setTimeout(() => {
        createEnhancedFooter();
    }, 500);
});

// Export for manual initialization
window.createEnhancedFooter = createEnhancedFooter;