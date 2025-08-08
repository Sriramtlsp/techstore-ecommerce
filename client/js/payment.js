// Payment functionality for checkout

// Setup payment method switching
function setupPaymentMethodSwitching() {
    const paymentMethods = document.querySelectorAll('input[name="paymentMethod"]');
    const paymentDetails = document.querySelectorAll('.payment-details');
    
    paymentMethods.forEach(method => {
        method.addEventListener('change', () => {
            // Hide all payment details
            paymentDetails.forEach(detail => {
                detail.style.display = 'none';
            });
            
            // Show selected payment method details
            const selectedDetails = document.getElementById(method.value + 'Details');
            if (selectedDetails) {
                selectedDetails.style.display = 'block';
            }
            
            // Update button text based on payment method
            const submitBtn = document.querySelector('#checkoutForm button[type="submit"] .btn-text');
            if (submitBtn) {
                switch(method.value) {
                    case 'creditCard':
                        submitBtn.textContent = 'Complete Payment';
                        break;
                    case 'googlePay':
                        submitBtn.textContent = 'Pay with Google Pay';
                        break;
                    case 'upi':
                        submitBtn.textContent = 'Pay with UPI';
                        break;
                }
            }
        });
    });
}

// Setup card input formatting
function setupCardInputFormatting() {
    const cardNumberInput = document.getElementById('cardNumber');
    const expiryDateInput = document.getElementById('expiryDate');
    const cvvInput = document.getElementById('cvv');
    
    if (cardNumberInput) {
        // Format card number
        cardNumberInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\s/g, '').replace(/[^0-9]/gi, '');
            let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
            e.target.value = formattedValue;
        });
    }
    
    if (expiryDateInput) {
        // Format expiry date
        expiryDateInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
            }
            e.target.value = value;
        });
    }
    
    if (cvvInput) {
        // CVV numbers only
        cvvInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, '');
        });
    }
}

// Validate payment method
function validatePaymentMethod() {
    const selectedMethodElement = document.querySelector('input[name="paymentMethod"]:checked');
    if (!selectedMethodElement) {
        showAlert('Please select a payment method', 'error');
        return false;
    }
    
    const selectedMethod = selectedMethodElement.value;
    
    switch(selectedMethod) {
        case 'creditCard':
            return validateCreditCard();
        case 'googlePay':
            return true; // Google Pay doesn't need validation here
        case 'upi':
            return validateUPI();
        default:
            return false;
    }
}

// Validate credit card details
function validateCreditCard() {
    const cardNumber = document.getElementById('cardNumber').value.replace(/\s/g, '');
    const expiryDate = document.getElementById('expiryDate').value;
    const cvv = document.getElementById('cvv').value;
    const cardName = document.getElementById('cardName').value;
    
    if (!cardNumber || cardNumber.length < 13) {
        showAlert('Please enter a valid card number', 'error');
        return false;
    }
    
    if (!expiryDate || !expiryDate.match(/^\d{2}\/\d{2}$/)) {
        showAlert('Please enter a valid expiry date (MM/YY)', 'error');
        return false;
    }
    
    // Check if expiry date is in the future
    const [month, year] = expiryDate.split('/');
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;
    
    if (parseInt(year) < currentYear || (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
        showAlert('Card has expired', 'error');
        return false;
    }
    
    if (!cvv || cvv.length < 3) {
        showAlert('Please enter a valid CVV', 'error');
        return false;
    }
    
    if (!cardName.trim()) {
        showAlert('Please enter the cardholder name', 'error');
        return false;
    }
    
    return true;
}

// Validate UPI details
function validateUPI() {
    const upiId = document.getElementById('upiId').value;
    
    if (!upiId || !upiId.includes('@')) {
        showAlert('Please enter a valid UPI ID', 'error');
        return false;
    }
    
    // Basic UPI ID format validation
    const upiRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+$/;
    if (!upiRegex.test(upiId)) {
        showAlert('Please enter a valid UPI ID format', 'error');
        return false;
    }
    
    return true;
}

// Process payment based on method
function processPayment(paymentMethod, orderData) {
    switch(paymentMethod) {
        case 'creditCard':
            return processCreditCardPayment(orderData);
        case 'googlePay':
            return processGooglePayPayment(orderData);
        case 'upi':
            return processUPIPayment(orderData);
        default:
            throw new Error('Invalid payment method');
    }
}

// Process credit card payment
async function processCreditCardPayment(orderData) {
    // Simulate credit card processing
    showAlert('Processing credit card payment...', 'info');
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Add payment details to order
    orderData.paymentMethod = 'creditCard';
    orderData.paymentDetails = {
        cardLast4: document.getElementById('cardNumber').value.replace(/\s/g, '').slice(-4),
        cardType: 'Credit Card',
        transactionId: 'CC' + Date.now()
    };
    
    return api.createOrder(orderData);
}

// Process Google Pay payment
async function processGooglePayPayment(orderData) {
    // Simulate Google Pay processing
    showAlert('Redirecting to Google Pay...', 'info');
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate Google Pay success
    showAlert('Google Pay payment successful!', 'success');
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Add payment details to order
    orderData.paymentMethod = 'googlePay';
    orderData.paymentDetails = {
        transactionId: 'GP' + Date.now(),
        method: 'Google Pay'
    };
    
    return api.createOrder(orderData);
}

// Process UPI payment
async function processUPIPayment(orderData) {
    // Simulate UPI processing
    showAlert('Processing UPI payment...', 'info');
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Add payment details to order
    orderData.paymentMethod = 'upi';
    orderData.paymentDetails = {
        upiId: document.getElementById('upiId').value,
        transactionId: 'UPI' + Date.now()
    };
    
    return api.createOrder(orderData);
}

// Initialize payment functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Setup payment methods when checkout modal is shown
    const originalShowCheckoutModal = window.showCheckoutModal;
    if (originalShowCheckoutModal) {
        window.showCheckoutModal = function() {
            originalShowCheckoutModal();
            
            // Setup payment functionality after modal is shown
            setTimeout(() => {
                setupPaymentMethodSwitching();
                setupCardInputFormatting();
                
                // Update Google Pay amount
                const total = cartManager.getTotal();
                const gpayAmount = document.getElementById('gpayAmount');
                if (gpayAmount) {
                    gpayAmount.textContent = formatPrice(total);
                }
            }, 100);
        };
    }
});

// Make functions available globally
window.validatePaymentMethod = validatePaymentMethod;
window.processPayment = processPayment;
window.setupPaymentMethodSwitching = setupPaymentMethodSwitching;
window.setupCardInputFormatting = setupCardInputFormatting;