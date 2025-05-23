// Initialize Stripe
const stripe = Stripe('pk_test_YOUR_PUBLISHABLE_KEY_HERE'); // Replace with your actual Stripe publishable key

// DOM Elements
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');
const calendarModal = document.getElementById('calendar-modal');
const quoteModal = document.getElementById('quote-modal');
const quoteForm = document.getElementById('quote-form');

// Mobile Menu Toggle
if (mobileMenuToggle && navLinks) {
    mobileMenuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenuToggle.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('active');
        }
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Calendar Modal Functions
function openCalendar() {
    if (calendarModal) {
        calendarModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Initialize Calendly widget if not already done
        if (!document.querySelector('.calendly-inline-widget iframe')) {
            Calendly.initInlineWidget({
                url: 'https://calendly.com/your-username/30min', // Replace with your Calendly URL
                parentElement: document.querySelector('.calendly-inline-widget'),
                prefill: {},
                utm: {}
            });
        }
        
        // Track calendar open event
        trackEvent('calendar_opened', {
            source: 'product_page'
        });
    }
}

function closeCalendar() {
    if (calendarModal) {
        calendarModal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Quote Modal Functions
function openQuote() {
    if (quoteModal) {
        quoteModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Track quote modal open event
        trackEvent('quote_modal_opened', {
            source: 'product_page'
        });
    }
}

function closeQuote() {
    if (quoteModal) {
        quoteModal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Quote Form Submission
if (quoteForm) {
    quoteForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(quoteForm);
        const quoteData = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            company: formData.get('company'),
            industry: formData.get('industry'),
            employees: formData.get('employees'),
            timeline: formData.get('timeline'),
            details: formData.get('details')
        };
        
        // Track quote submission
        trackEvent('quote_submitted', quoteData);
        
        try {
            // Here you would typically send the data to your backend
            // For now, we'll simulate a successful submission
            await simulateQuoteSubmission(quoteData);
            
            // Show success message
            showQuoteSuccess();
            
        } catch (error) {
            console.error('Quote submission error:', error);
            showQuoteError();
        }
    });
}

// Simulate quote submission (replace with actual API call)
async function simulateQuoteSubmission(data) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Quote submitted:', data);
            resolve();
        }, 1000);
    });
}

// Show quote success message
function showQuoteSuccess() {
    closeQuote();
    
    const successMessage = document.createElement('div');
    successMessage.className = 'checkout-message';
    successMessage.innerHTML = `
        <div class="message-content">
            <div class="success-icon">✅</div>
            <h3>Quote Request Submitted!</h3>
            <p>Thank you for your interest in our App Navigator service. We'll review your requirements and get back to you within 24 hours with a customized quote.</p>
            <button class="btn-primary" onclick="this.parentElement.parentElement.remove()">Close</button>
        </div>
    `;
    
    document.body.appendChild(successMessage);
    
    // Auto-remove after 10 seconds
    setTimeout(() => {
        if (successMessage.parentElement) {
            successMessage.remove();
        }
    }, 10000);
}

// Show quote error message
function showQuoteError() {
    const errorMessage = document.createElement('div');
    errorMessage.className = 'checkout-message';
    errorMessage.innerHTML = `
        <div class="message-content">
            <div class="cancel-icon">❌</div>
            <h3>Submission Failed</h3>
            <p>We're sorry, but there was an error submitting your quote request. Please try again or contact us directly.</p>
            <button class="btn-primary" onclick="this.parentElement.parentElement.remove()">Try Again</button>
        </div>
    `;
    
    document.body.appendChild(errorMessage);
}

// Stripe Checkout Functions
async function createCheckoutSession(priceId, productName) {
    try {
        // Track purchase attempt
        trackEvent('purchase_attempted', {
            product: productName,
            price_id: priceId
        });
        
        // Here you would typically call your backend to create a Stripe checkout session
        // For demo purposes, we'll simulate the process
        const response = await fetch('/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                price_id: priceId,
                product_name: productName,
                success_url: window.location.origin + '/products/success.html',
                cancel_url: window.location.origin + '/products/index.html'
            })
        });
        
        const session = await response.json();
        
        // Redirect to Stripe Checkout
        const result = await stripe.redirectToCheckout({
            sessionId: session.id
        });
        
        if (result.error) {
            console.error('Stripe error:', result.error);
            showCheckoutError(result.error.message);
        }
        
    } catch (error) {
        console.error('Checkout error:', error);
        showCheckoutError('Unable to process payment. Please try again.');
    }
}

// Stripe checkout for specific products
function buyClaimPackA() {
    createCheckoutSession('price_claim_pack_a', 'Claim Pack A');
}

function buyClaimPackB() {
    createCheckoutSession('price_claim_pack_b', 'Claim Pack B');
}

function buyClaimPackC() {
    createCheckoutSession('price_claim_pack_c', 'Claim Pack C');
}

// Show checkout error
function showCheckoutError(message) {
    const errorMessage = document.createElement('div');
    errorMessage.className = 'checkout-message';
    errorMessage.innerHTML = `
        <div class="message-content">
            <div class="cancel-icon">❌</div>
            <h3>Payment Error</h3>
            <p>${message}</p>
            <button class="btn-primary" onclick="this.parentElement.parentElement.remove()">Try Again</button>
        </div>
    `;
    
    document.body.appendChild(errorMessage);
}

// Event tracking function
function trackEvent(eventName, properties = {}) {
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, properties);
    }
    
    // Facebook Pixel
    if (typeof fbq !== 'undefined') {
        fbq('track', eventName, properties);
    }
    
    // Console log for debugging
    console.log('Event tracked:', eventName, properties);
}

// FAQ Toggle Functionality
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        const isActive = question.classList.contains('active');
        
        // Close all other FAQ items
        document.querySelectorAll('.faq-question').forEach(q => {
            q.classList.remove('active');
            q.nextElementSibling.classList.remove('active');
        });
        
        // Toggle current item
        if (!isActive) {
            question.classList.add('active');
            answer.classList.add('active');
        }
        
        // Track FAQ interaction
        trackEvent('faq_clicked', {
            question: question.textContent.trim(),
            action: isActive ? 'closed' : 'opened'
        });
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.product-card, .benefit-card, .faq-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Close modals when clicking outside
document.addEventListener('click', (e) => {
    const calendarModal = document.getElementById('calendar-modal');
    const sessionModal = document.getElementById('session-modal');
    const quoteModal = document.getElementById('quote-modal');
    
    if (e.target === calendarModal) {
        closeCalendar();
    }
    if (e.target === sessionModal) {
        closeSessionBooking();
    }
    if (e.target === quoteModal) {
        closeQuote();
    }
});

// Close modals with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeCalendar();
        closeSessionBooking();
        closeQuote();
    }
});

// Calendly event listeners
window.addEventListener('message', function(e) {
    if (e.data.event && e.data.event.indexOf('calendly') === 0) {
        if (e.data.event === 'calendly.event_scheduled') {
            // Track successful booking
            trackEvent('appointment_booked', {
                source: 'product_page',
                event_type: e.data.event_details?.event_type?.name || 'App Session'
            });
            
            // Close calendar modal
            closeCalendar();
            
            // Show thank you message
            showBookingSuccess();
        }
    }
});

// Show booking success message
function showBookingSuccess() {
    const successMessage = document.createElement('div');
    successMessage.className = 'checkout-message';
    successMessage.innerHTML = `
        <div class="message-content">
            <div class="success-icon">🎉</div>
            <h3>Appointment Booked!</h3>
            <p>Thank you for booking your App Session. You'll receive a confirmation email shortly with all the details. We're looking forward to helping you with your claim!</p>
            <button class="btn-primary" onclick="this.parentElement.parentElement.remove()">Close</button>
        </div>
    `;
    
    document.body.appendChild(successMessage);
    
    // Auto-remove after 10 seconds
    setTimeout(() => {
        if (successMessage.parentElement) {
            successMessage.remove();
        }
    }, 10000);
}

// Price display with currency formatting
function formatPrice(amount) {
    return new Intl.NumberFormat('en-AU', {
        style: 'currency',
        currency: 'AUD'
    }).format(amount);
}

// Dynamic pricing updates (if needed)
function updatePricing() {
    const priceElements = document.querySelectorAll('.price-amount');
    priceElements.forEach(el => {
        const amount = parseFloat(el.dataset.amount);
        if (amount) {
            el.textContent = formatPrice(amount);
        }
    });
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Update pricing display
    updatePricing();
    
    // Track page view
    trackEvent('product_page_viewed', {
        page: 'products',
        timestamp: new Date().toISOString()
    });
    
    // Add click tracking to all CTA buttons
    document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
        button.addEventListener('click', (e) => {
            const buttonText = button.textContent.trim();
            const productCard = button.closest('.product-card');
            const productName = productCard ? productCard.querySelector('.product-title')?.textContent : 'Unknown';
            
            trackEvent('cta_clicked', {
                button_text: buttonText,
                product: productName,
                location: 'product_page'
            });
        });
    });
    
    // Book call button event listeners
    document.querySelectorAll('.book-call-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openCalendar();
        });
    });
    
    // Book session button event listeners
    document.querySelectorAll('.book-session-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openSessionBooking();
        });
    });
    
    // Get quote button event listeners
    document.querySelectorAll('.get-quote-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openQuote();
        });
    });
    
    // Add to cart button event listeners
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const pack = btn.dataset.pack;
            const price = btn.dataset.price;
            const name = btn.dataset.name;
            
            if (pack && price && name) {
                createCheckoutSession(price, name);
            }
        });
    });
    
    // Modal close button event listeners
    document.getElementById('calendar-close')?.addEventListener('click', closeCalendar);
    document.getElementById('session-close')?.addEventListener('click', closeSessionBooking);
    document.getElementById('quote-close')?.addEventListener('click', closeQuote);
});

// Utility function to get URL parameters
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// Handle success/cancel redirects from Stripe
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    
    if (urlParams.get('success') === 'true') {
        const sessionId = urlParams.get('session_id');
        showPurchaseSuccess(sessionId);
    }
    
    if (urlParams.get('canceled') === 'true') {
        showPurchaseCanceled();
    }
});

// Show purchase success message
function showPurchaseSuccess(sessionId) {
    const successMessage = document.createElement('div');
    successMessage.className = 'checkout-message';
    successMessage.innerHTML = `
        <div class="message-content">
            <div class="success-icon">🎉</div>
            <h3>Purchase Successful!</h3>
            <p>Thank you for your purchase! You'll receive an email with your Claim Pack materials shortly. Your journey to claim clarity starts now!</p>
            <button class="btn-primary" onclick="this.parentElement.parentElement.remove()">Continue</button>
        </div>
    `;
    
    document.body.appendChild(successMessage);
    
    // Track successful purchase
    trackEvent('purchase_completed', {
        session_id: sessionId,
        timestamp: new Date().toISOString()
    });
}

// Show purchase canceled message
function showPurchaseCanceled() {
    const cancelMessage = document.createElement('div');
    cancelMessage.className = 'checkout-message';
    cancelMessage.innerHTML = `
        <div class="message-content">
            <div class="cancel-icon">⚠️</div>
            <h3>Purchase Canceled</h3>
            <p>Your purchase was canceled. No charges were made. Feel free to try again when you're ready, or contact us if you need assistance.</p>
            <button class="btn-primary" onclick="this.parentElement.parentElement.remove()">Continue Shopping</button>
        </div>
    `;
    
    document.body.appendChild(cancelMessage);
    
    // Track canceled purchase
    trackEvent('purchase_canceled', {
        timestamp: new Date().toISOString()
    });
}

// Session Booking Modal Functions
function openSessionBooking() {
    const sessionModal = document.getElementById('session-modal');
    if (sessionModal) {
        sessionModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Initialize Calendly widget if not already done
        if (!sessionModal.querySelector('.calendly-inline-widget iframe')) {
            Calendly.initInlineWidget({
                url: 'https://calendly.com/your-username/app-session', // Replace with your Calendly URL
                parentElement: sessionModal.querySelector('.calendly-inline-widget'),
                prefill: {},
                utm: {}
            });
        }
        
        // Track session booking modal open event
        trackEvent('session_booking_opened', {
            source: 'product_page'
        });
    }
}

function closeSessionBooking() {
    const sessionModal = document.getElementById('session-modal');
    if (sessionModal) {
        sessionModal.classList.remove('active');
        document.body.style.overflow = '';
    }
} 