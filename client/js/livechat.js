// Live Chat Widget for TechStore
class LiveChat {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        this.init();
    }

    init() {
        this.createChatWidget();
        this.setupEventListeners();
        this.loadChatHistory();
    }

    createChatWidget() {
        // Create chat widget HTML
        const chatWidget = document.createElement('div');
        chatWidget.innerHTML = `
            <!-- Chat Button -->
            <div id="chat-button" class="chat-button">
                <div class="chat-icon">💬</div>
                <div class="chat-text">Chat with us</div>
                <div class="chat-notification" id="chat-notification" style="display: none;">1</div>
            </div>

            <!-- Chat Window -->
            <div id="chat-window" class="chat-window" style="display: none;">
                <div class="chat-header">
                    <div class="chat-header-info">
                        <div class="agent-avatar">👨‍💼</div>
                        <div class="agent-details">
                            <div class="agent-name">TechStore Support</div>
                            <div class="agent-status">
                                <span class="status-dot online"></span>
                                Online
                            </div>
                        </div>
                    </div>
                    <button id="chat-close" class="chat-close">×</button>
                </div>

                <div class="chat-messages" id="chat-messages">
                    <div class="message bot-message">
                        <div class="message-avatar">🤖</div>
                        <div class="message-content">
                            <div class="message-text">Hi! Welcome to TechStore. How can I help you today?</div>
                            <div class="message-time">${this.getCurrentTime()}</div>
                        </div>
                    </div>
                </div>

                <div class="chat-input-container">
                    <div class="quick-replies" id="quick-replies">
                        <button class="quick-reply" data-message="I need help with my order">Order Help</button>
                        <button class="quick-reply" data-message="Product information">Product Info</button>
                        <button class="quick-reply" data-message="Technical support">Tech Support</button>
                        <button class="quick-reply" data-message="Return/Refund">Returns</button>
                    </div>
                    <div class="chat-input-area">
                        <input type="text" id="chat-input" placeholder="Type your message..." maxlength="500">
                        <button id="chat-send" class="chat-send-btn">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                            </svg>
                        </button>
                    </div>
                    <div class="chat-typing" id="chat-typing" style="display: none;">
                        <div class="typing-indicator">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        Support is typing...
                    </div>
                </div>
            </div>
        `;

        // Add CSS styles
        const chatStyles = document.createElement('style');
        chatStyles.textContent = `
            /* Live Chat Styles */
            .chat-button {
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: #3498db;
                color: white;
                border-radius: 50px;
                padding: 15px 20px;
                cursor: pointer;
                box-shadow: 0 4px 20px rgba(52, 152, 219, 0.3);
                display: flex;
                align-items: center;
                gap: 10px;
                font-weight: 500;
                transition: all 0.3s ease;
                z-index: 1000;
                max-width: 200px;
            }

            .chat-button:hover {
                background: #2980b9;
                transform: translateY(-2px);
                box-shadow: 0 6px 25px rgba(52, 152, 219, 0.4);
            }

            .chat-icon {
                font-size: 20px;
                animation: bounce 2s infinite;
            }

            .chat-text {
                font-size: 14px;
                white-space: nowrap;
            }

            .chat-notification {
                background: #e74c3c;
                color: white;
                border-radius: 50%;
                width: 20px;
                height: 20px;
                font-size: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                position: absolute;
                top: -5px;
                right: -5px;
                animation: pulse 1.5s infinite;
            }

            .chat-window {
                position: fixed;
                bottom: 20px;
                right: 20px;
                width: 350px;
                height: 500px;
                background: white;
                border-radius: 15px;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
                display: flex;
                flex-direction: column;
                z-index: 1001;
                overflow: hidden;
            }

            .chat-header {
                background: #3498db;
                color: white;
                padding: 15px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .chat-header-info {
                display: flex;
                align-items: center;
                gap: 10px;
            }

            .agent-avatar {
                font-size: 24px;
            }

            .agent-name {
                font-weight: bold;
                font-size: 14px;
            }

            .agent-status {
                font-size: 12px;
                display: flex;
                align-items: center;
                gap: 5px;
                opacity: 0.9;
            }

            .status-dot {
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background: #27ae60;
                animation: pulse 2s infinite;
            }

            .chat-close {
                background: none;
                border: none;
                color: white;
                font-size: 24px;
                cursor: pointer;
                padding: 0;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: background 0.2s;
            }

            .chat-close:hover {
                background: rgba(255, 255, 255, 0.2);
            }

            .chat-messages {
                flex: 1;
                padding: 15px;
                overflow-y: auto;
                background: #f8f9fa;
            }

            .message {
                display: flex;
                margin-bottom: 15px;
                animation: slideIn 0.3s ease;
            }

            .bot-message {
                justify-content: flex-start;
            }

            .user-message {
                justify-content: flex-end;
            }

            .message-avatar {
                width: 30px;
                height: 30px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 16px;
                margin-right: 10px;
                flex-shrink: 0;
            }

            .user-message .message-avatar {
                order: 2;
                margin-right: 0;
                margin-left: 10px;
                background: #3498db;
                color: white;
            }

            .message-content {
                max-width: 70%;
                background: white;
                padding: 10px 15px;
                border-radius: 15px;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            }

            .user-message .message-content {
                background: #3498db;
                color: white;
            }

            .message-text {
                font-size: 14px;
                line-height: 1.4;
                margin-bottom: 5px;
            }

            .message-time {
                font-size: 11px;
                opacity: 0.7;
            }

            .chat-input-container {
                border-top: 1px solid #eee;
                background: white;
            }

            .quick-replies {
                padding: 10px 15px;
                display: flex;
                gap: 5px;
                flex-wrap: wrap;
                border-bottom: 1px solid #eee;
            }

            .quick-reply {
                background: #f8f9fa;
                border: 1px solid #dee2e6;
                border-radius: 15px;
                padding: 5px 10px;
                font-size: 12px;
                cursor: pointer;
                transition: all 0.2s;
            }

            .quick-reply:hover {
                background: #3498db;
                color: white;
                border-color: #3498db;
            }

            .chat-input-area {
                display: flex;
                padding: 15px;
                gap: 10px;
                align-items: center;
            }

            .chat-input-area input {
                flex: 1;
                border: 1px solid #ddd;
                border-radius: 20px;
                padding: 10px 15px;
                font-size: 14px;
                outline: none;
            }

            .chat-input-area input:focus {
                border-color: #3498db;
            }

            .chat-send-btn {
                background: #3498db;
                color: white;
                border: none;
                border-radius: 50%;
                width: 40px;
                height: 40px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: background 0.2s;
            }

            .chat-send-btn:hover {
                background: #2980b9;
            }

            .chat-send-btn:disabled {
                background: #bdc3c7;
                cursor: not-allowed;
            }

            .chat-typing {
                padding: 10px 15px;
                display: flex;
                align-items: center;
                gap: 10px;
                font-size: 12px;
                color: #666;
                background: #f8f9fa;
            }

            .typing-indicator {
                display: flex;
                gap: 3px;
            }

            .typing-indicator span {
                width: 6px;
                height: 6px;
                border-radius: 50%;
                background: #3498db;
                animation: typing 1.4s infinite ease-in-out;
            }

            .typing-indicator span:nth-child(1) { animation-delay: -0.32s; }
            .typing-indicator span:nth-child(2) { animation-delay: -0.16s; }

            @keyframes bounce {
                0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
                40% { transform: translateY(-5px); }
                60% { transform: translateY(-3px); }
            }

            @keyframes pulse {
                0% { transform: scale(1); opacity: 1; }
                50% { transform: scale(1.1); opacity: 0.7; }
                100% { transform: scale(1); opacity: 1; }
            }

            @keyframes slideIn {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
            }

            @keyframes typing {
                0%, 80%, 100% { transform: scale(0); }
                40% { transform: scale(1); }
            }

            /* Mobile Responsive */
            @media (max-width: 768px) {
                .chat-window {
                    width: calc(100vw - 40px);
                    height: calc(100vh - 40px);
                    bottom: 20px;
                    right: 20px;
                }

                .chat-button {
                    bottom: 20px;
                    right: 20px;
                }

                .chat-text {
                    display: none;
                }
            }
        `;

        document.head.appendChild(chatStyles);
        document.body.appendChild(chatWidget);
    }

    setupEventListeners() {
        const chatButton = document.getElementById('chat-button');
        const chatWindow = document.getElementById('chat-window');
        const chatClose = document.getElementById('chat-close');
        const chatInput = document.getElementById('chat-input');
        const chatSend = document.getElementById('chat-send');
        const quickReplies = document.querySelectorAll('.quick-reply');

        // Toggle chat window
        chatButton.addEventListener('click', () => this.toggleChat());
        chatClose.addEventListener('click', () => this.closeChat());

        // Send message
        chatSend.addEventListener('click', () => this.sendMessage());
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });

        // Quick replies
        quickReplies.forEach(button => {
            button.addEventListener('click', () => {
                const message = button.dataset.message;
                this.sendMessage(message);
            });
        });

        // Auto-focus input when chat opens
        chatInput.addEventListener('focus', () => {
            document.getElementById('quick-replies').style.display = 'none';
        });
    }

    toggleChat() {
        const chatButton = document.getElementById('chat-button');
        const chatWindow = document.getElementById('chat-window');
        const notification = document.getElementById('chat-notification');

        if (this.isOpen) {
            this.closeChat();
        } else {
            chatWindow.style.display = 'flex';
            chatButton.style.display = 'none';
            notification.style.display = 'none';
            this.isOpen = true;
            
            // Focus input
            setTimeout(() => {
                document.getElementById('chat-input').focus();
            }, 100);

            // Scroll to bottom
            this.scrollToBottom();
        }
    }

    closeChat() {
        const chatButton = document.getElementById('chat-button');
        const chatWindow = document.getElementById('chat-window');

        chatWindow.style.display = 'none';
        chatButton.style.display = 'flex';
        this.isOpen = false;
    }

    sendMessage(text = null) {
        const chatInput = document.getElementById('chat-input');
        const message = text || chatInput.value.trim();

        if (!message) return;

        // Add user message
        this.addMessage(message, 'user');
        
        // Clear input
        if (!text) chatInput.value = '';

        // Hide quick replies after first message
        document.getElementById('quick-replies').style.display = 'none';

        // Show typing indicator
        this.showTyping();

        // Simulate bot response
        setTimeout(() => {
            this.hideTyping();
            this.generateBotResponse(message);
        }, 1000 + Math.random() * 2000);
    }

    addMessage(text, sender) {
        const messagesContainer = document.getElementById('chat-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;

        const avatar = sender === 'user' ? '👤' : '🤖';
        const time = this.getCurrentTime();

        messageDiv.innerHTML = `
            <div class="message-avatar">${avatar}</div>
            <div class="message-content">
                <div class="message-text">${text}</div>
                <div class="message-time">${time}</div>
            </div>
        `;

        messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();

        // Save to messages array
        this.messages.push({ text, sender, time });
        this.saveChatHistory();
    }

    generateBotResponse(userMessage) {
        const responses = this.getBotResponse(userMessage.toLowerCase());
        const response = responses[Math.floor(Math.random() * responses.length)];
        this.addMessage(response, 'bot');
    }

    getBotResponse(message) {
        // Simple keyword-based responses
        if (message.includes('order') || message.includes('track')) {
            return [
                "I can help you with your order! Please provide your order ID, and I'll check the status for you.",
                "To track your order, you can use our order tracking page or provide me with your order number.",
                "For order-related queries, I'll need your order ID. You can find it in your confirmation email."
            ];
        }

        if (message.includes('product') || message.includes('item')) {
            return [
                "I'd be happy to help you with product information! What specific product are you interested in?",
                "We have a wide range of laptop accessories, computer peripherals, and printer accessories. What are you looking for?",
                "You can browse our products on the main page, or tell me what you need and I'll help you find it!"
            ];
        }

        if (message.includes('return') || message.includes('refund')) {
            return [
                "Our return policy allows returns within 30 days of delivery. The item must be in original condition.",
                "For returns and refunds, please check our return policy page or contact our support team with your order details.",
                "I can help you initiate a return. Please provide your order number and reason for return."
            ];
        }

        if (message.includes('support') || message.includes('help')) {
            return [
                "I'm here to help! You can ask me about orders, products, returns, or any other questions.",
                "Our support team is available 24/7. What specific help do you need today?",
                "Feel free to ask me anything about TechStore - orders, products, shipping, or technical support!"
            ];
        }

        if (message.includes('payment') || message.includes('pay')) {
            return [
                "We accept all major credit cards, debit cards, UPI, and digital wallets for secure payments.",
                "Having payment issues? Please check your card details or try a different payment method.",
                "All payments are processed securely. If you're facing issues, please contact our support team."
            ];
        }

        if (message.includes('shipping') || message.includes('delivery')) {
            return [
                "We offer free shipping on orders above ₹1,000. Standard delivery takes 3-5 business days.",
                "Shipping costs depend on your location and order value. You can see exact costs at checkout.",
                "We deliver across India. Express delivery is available in major cities for faster shipping."
            ];
        }

        // Default responses
        return [
            "Thank you for contacting TechStore! How can I assist you today?",
            "I'm here to help! Could you please provide more details about your query?",
            "That's a great question! Let me connect you with the right information.",
            "I'd be happy to help you with that. Could you tell me more about what you need?",
            "For detailed assistance, you can also email us at support@techstore.com or call +91 98765 43210."
        ];
    }

    showTyping() {
        document.getElementById('chat-typing').style.display = 'flex';
        this.scrollToBottom();
    }

    hideTyping() {
        document.getElementById('chat-typing').style.display = 'none';
    }

    scrollToBottom() {
        const messagesContainer = document.getElementById('chat-messages');
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    getCurrentTime() {
        return new Date().toLocaleTimeString('en-IN', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
    }

    loadChatHistory() {
        const saved = localStorage.getItem('techstore_chat_history');
        if (saved) {
            this.messages = JSON.parse(saved);
            // Restore messages (optional - you might want to start fresh each session)
        }
    }

    saveChatHistory() {
        localStorage.setItem('techstore_chat_history', JSON.stringify(this.messages));
    }

    // Show notification (can be called from other parts of the app)
    showNotification() {
        const notification = document.getElementById('chat-notification');
        if (notification && !this.isOpen) {
            notification.style.display = 'flex';
        }
    }
}

// Initialize live chat when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Small delay to ensure all other scripts are loaded
    setTimeout(() => {
        window.liveChat = new LiveChat();
    }, 1000);
});

// Export for use in other scripts
window.LiveChat = LiveChat;