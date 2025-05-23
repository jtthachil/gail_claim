// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on navigation links
        const navLinkItems = navLinks.querySelectorAll('a');
        navLinkItems.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuToggle.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        });
    }
    
    // Handle anchor links on page load (for navigation from other pages)
    function handlePageLoadAnchor() {
        const hash = window.location.hash;
        if (hash) {
            // Wait a bit for the page to fully load
            setTimeout(() => {
                const targetSection = document.querySelector(hash);
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }, 100);
        }
    }
    
    // Call on page load
    handlePageLoadAnchor();
    
    // Also handle when hash changes (back/forward navigation)
    window.addEventListener('hashchange', handlePageLoadAnchor);
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Calendar Modal Functionality
    const calendarModal = document.getElementById('calendar-modal');
    const calendarClose = document.getElementById('calendar-close');
    const bookCallBtns = document.querySelectorAll('.book-call-btn');
    const thankYouPage = document.getElementById('thank-you-page');
    const backToSiteBtn = document.getElementById('back-to-site');
    
    // Open calendar modal
    bookCallBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            openCalendarModal();
        });
    });
    
    // Close calendar modal
    if (calendarClose) {
        calendarClose.addEventListener('click', function() {
            closeCalendarModal();
        });
    }
    
    // Close modal when clicking outside
    if (calendarModal) {
        calendarModal.addEventListener('click', function(e) {
            if (e.target === calendarModal) {
                closeCalendarModal();
            }
        });
    }
    
    // Back to site functionality
    if (backToSiteBtn) {
        backToSiteBtn.addEventListener('click', function(e) {
            e.preventDefault();
            hideThankYouPage();
        });
    }
    
    function openCalendarModal() {
        if (calendarModal) {
            calendarModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Initialize Calendly widget if not already done
            if (window.Calendly) {
                window.Calendly.initInlineWidget({
                    url: 'https://calendly.com/claimclarity/30min-intake-call',
                    parentElement: document.querySelector('.calendly-inline-widget'),
                    prefill: {},
                    utm: {
                        utmCampaign: 'ClaimClarity Landing Page',
                        utmSource: 'Website',
                        utmMedium: 'Intake Call'
                    }
                });
            }
        }
    }
    
    function closeCalendarModal() {
        if (calendarModal) {
            calendarModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    function showThankYouPage() {
        if (thankYouPage) {
            // Hide main content
            document.querySelector('nav').style.display = 'none';
            document.querySelector('.hero').style.display = 'none';
            document.querySelector('.quiz-section').style.display = 'none';
            document.querySelector('.why-matters').style.display = 'none';
            document.querySelector('.different').style.display = 'none';
            document.querySelector('.testimonials').style.display = 'none';
            document.querySelector('.final-cta').style.display = 'none';
            document.querySelector('.footer').style.display = 'none';
            
            // Show thank you page
            thankYouPage.classList.add('active');
            
            // Close calendar modal
            closeCalendarModal();
            
            // Scroll to top
            window.scrollTo(0, 0);
        }
    }
    
    function hideThankYouPage() {
        if (thankYouPage) {
            // Show main content
            document.querySelector('nav').style.display = 'block';
            document.querySelector('.hero').style.display = 'block';
            document.querySelector('.quiz-section').style.display = 'block';
            document.querySelector('.why-matters').style.display = 'block';
            document.querySelector('.different').style.display = 'block';
            document.querySelector('.testimonials').style.display = 'block';
            document.querySelector('.final-cta').style.display = 'block';
            document.querySelector('.footer').style.display = 'block';
            
            // Hide thank you page
            thankYouPage.classList.remove('active');
            
            // Scroll to top
            window.scrollTo(0, 0);
        }
    }
    
    // Listen for Calendly events
    window.addEventListener('message', function(e) {
        if (e.data.event && e.data.event.indexOf('calendly') === 0) {
            if (e.data.event === 'calendly.event_scheduled') {
                // Event was scheduled, show thank you page
                setTimeout(() => {
                    showThankYouPage();
                    
                    // Send confirmation email (you would integrate with your email service)
                    sendConfirmationEmail(e.data.event_details);
                    
                    // Track conversion (integrate with your analytics)
                    trackConversion('intake_call_booked', e.data.event_details);
                }, 1000);
            }
        }
    });
    
    // Quiz functionality
    const quizQuestions = [
        {
            id: 1,
            title: "Do you feel emotionally drained or mentally exhausted after work?",
            description: "This includes feeling overwhelmed, burnt out, or unable to 'switch off' from work stress."
        },
        {
            id: 2,
            title: "Have you raised issues at work and felt ignored or dismissed?",
            description: "This could be concerns about workload, treatment, safety, or workplace culture that weren't properly addressed."
        },
        {
            id: 3,
            title: "Has your work environment negatively affected your sleep or mental wellbeing?",
            description: "Including difficulty sleeping, anxiety, depression, or other mental health changes since starting or during your current role."
        },
        {
            id: 4,
            title: "Do you feel unsupported or confused about your role expectations?",
            description: "This includes unclear job requirements, lack of training, conflicting instructions, or inadequate support from management."
        },
        {
            id: 5,
            title: "Are you seeing a doctor or psychologist for work-related stress?",
            description: "This includes any medical or psychological treatment you're receiving that's related to workplace stress or mental health."
        },
        {
            id: 6,
            title: "Did your employer fail to act when you first raised concerns?",
            description: "This includes situations where you reported problems but no meaningful action was taken to address them."
        }
    ];

    let currentQuestionIndex = 0;
    let quizAnswers = [];
    let quizScore = 0;

    const quizContainer = document.getElementById('quiz-container');
    const questionTitle = document.getElementById('question-title');
    const questionDescription = document.getElementById('question-description');
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const quizContent = document.getElementById('quiz-content');
    const quizResults = document.getElementById('quiz-results');
    const answerBtns = document.querySelectorAll('.answer-btn');
    const retakeBtn = document.getElementById('retake-btn');

    // Initialize quiz
    function initQuiz() {
        currentQuestionIndex = 0;
        quizAnswers = [];
        quizScore = 0;
        showQuestion(0);
        updateProgress();
        quizContent.style.display = 'block';
        quizResults.style.display = 'none';
    }

    // Show specific question
    function showQuestion(index) {
        const question = quizQuestions[index];
        questionTitle.textContent = question.title;
        questionDescription.textContent = question.description;
        
        // Clear previous selections
        answerBtns.forEach(btn => btn.classList.remove('selected'));
        
        // Show previous answer if exists
        if (quizAnswers[index] !== undefined) {
            const selectedBtn = document.querySelector(`[data-value="${quizAnswers[index]}"]`);
            if (selectedBtn) {
                selectedBtn.classList.add('selected');
                nextBtn.disabled = false;
            }
        } else {
            nextBtn.disabled = true;
        }
        
        // Update navigation buttons
        prevBtn.disabled = index === 0;
        nextBtn.textContent = index === quizQuestions.length - 1 ? 'See Results' : 'Next';
    }

    // Update progress bar
    function updateProgress() {
        const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
        progressFill.style.width = `${progress}%`;
        progressText.textContent = `Question ${currentQuestionIndex + 1} of ${quizQuestions.length}`;
    }

    // Handle answer selection
    answerBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove selection from other buttons
            answerBtns.forEach(b => b.classList.remove('selected'));
            
            // Add selection to clicked button
            this.classList.add('selected');
            
            // Store answer
            const value = parseInt(this.dataset.value);
            quizAnswers[currentQuestionIndex] = value;
            
            // Enable next button
            nextBtn.disabled = false;
            
            // Track answer selection
            trackEvent('quiz_answer_selected', {
                question: currentQuestionIndex + 1,
                answer: this.querySelector('.answer-text').textContent,
                value: value
            });
        });
    });

    // Previous button
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            if (currentQuestionIndex > 0) {
                currentQuestionIndex--;
                showQuestion(currentQuestionIndex);
                updateProgress();
            }
        });
    }

    // Next button
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            if (currentQuestionIndex < quizQuestions.length - 1) {
                currentQuestionIndex++;
                showQuestion(currentQuestionIndex);
                updateProgress();
            } else {
                // Show results
                calculateAndShowResults();
            }
        });
    }

    // Calculate and show results
    function calculateAndShowResults() {
        quizScore = quizAnswers.reduce((total, answer) => total + answer, 0);
        
        const resultIcon = document.getElementById('result-icon');
        const resultTitle = document.getElementById('result-title');
        const resultMessage = document.getElementById('result-message');
        const scoreValue = document.getElementById('score-value');
        
        scoreValue.textContent = quizScore;
        
        let resultData;
        
        if (quizScore >= 6) {
            resultData = {
                icon: '✅',
                title: 'You may have a claim',
                message: 'Based on your responses, there are strong indicators that you may have a viable psychological injury claim. We recommend booking a free consultation to discuss your specific situation and next steps.',
                class: 'high-score'
            };
        } else if (quizScore >= 3) {
            resultData = {
                icon: '⚠️',
                title: 'You might have a claim',
                message: 'Your responses suggest there may be some grounds for a psychological injury claim. A consultation would help clarify your situation and explore your options.',
                class: 'medium-score'
            };
        } else {
            resultData = {
                icon: 'ℹ️',
                title: 'A claim may not be viable',
                message: 'Based on your current responses, a psychological injury claim may be challenging. However, every situation is unique, and a brief consultation can provide personalized guidance.',
                class: 'low-score'
            };
        }
        
        resultIcon.textContent = resultData.icon;
        resultTitle.textContent = resultData.title;
        resultMessage.textContent = resultData.message;
        
        // Add result class for styling
        quizResults.className = `quiz-results ${resultData.class}`;
        
        // Hide quiz content and show results
        quizContent.style.display = 'none';
        quizResults.style.display = 'block';
        
        // Track quiz completion
        trackEvent('quiz_completed', {
            score: quizScore,
            total_possible: 12,
            result_category: resultData.title,
            answers: quizAnswers
        });
        
        // Scroll to results
        quizResults.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // Retake quiz
    if (retakeBtn) {
        retakeBtn.addEventListener('click', function() {
            initQuiz();
            trackEvent('quiz_retaken');
        });
    }

    // Initialize quiz on page load
    if (quizContainer) {
        initQuiz();
    }
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.testimonial-card, .different-item, .stat-card, .snapshot');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // CTA button tracking (placeholder for analytics)
    const ctaButtons = document.querySelectorAll('.hero-cta, .nav-cta, .btn-primary, .btn-secondary');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Analytics tracking would go here
            console.log('CTA clicked:', this.textContent.trim());
            
            // If it's a booking button, track the intent
            if (this.classList.contains('book-call-btn')) {
                trackEvent('booking_intent', {
                    button_text: this.textContent.trim(),
                    button_location: this.closest('section')?.className || 'unknown'
                });
            }
        });
    });
});

// Email confirmation function (integrate with your email service)
function sendConfirmationEmail(eventDetails) {
    // This would integrate with your email service (SendGrid, Mailgun, etc.)
    console.log('Sending confirmation email for:', eventDetails);
    
    // Example integration with a backend endpoint:
    /*
    fetch('/api/send-confirmation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            event: eventDetails,
            template: 'intake_call_confirmation'
        })
    });
    */
}

// Analytics tracking function
function trackEvent(eventName, eventData) {
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
    }
    
    // Facebook Pixel
    if (typeof fbq !== 'undefined') {
        fbq('track', eventName, eventData);
    }
    
    // Custom analytics
    console.log('Event tracked:', eventName, eventData);
}

// Conversion tracking function
function trackConversion(conversionType, eventDetails) {
    // Track the successful booking
    trackEvent('conversion', {
        conversion_type: conversionType,
        value: 0, // Free consultation
        currency: 'AUD',
        event_details: eventDetails
    });
    
    // You could also send this to your CRM or database
    console.log('Conversion tracked:', conversionType, eventDetails);
}

// Form validation and submission (if you add contact forms later)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Utility function for showing notifications
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    if (type === 'success') {
        notification.style.background = '#22c55e';
    } else if (type === 'error') {
        notification.style.background = '#ef4444';
    } else {
        notification.style.background = '#667eea';
    }
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
} 