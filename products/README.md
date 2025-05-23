# ClaimClarity Product Page

A comprehensive product/service page showcasing three tiers of psychological injury claim support services with integrated payment processing and booking functionality.

## 🎯 Features

### Product Tiers
1. **Claim Packs (A, B, C)** - Digital resources with Stripe payment integration
2. **App Session** - 90-minute guided sessions with Calendly booking
3. **App Navigator** - Premium service with custom quote system

### Core Functionality
- ✅ Responsive design for all devices
- ✅ Stripe payment integration for Claim Packs
- ✅ Calendly integration for App Sessions
- ✅ Quote request system for App Navigator
- ✅ Professional UI with smooth animations
- ✅ Event tracking and analytics ready
- ✅ Mobile-optimized navigation
- ✅ FAQ section with interactive toggles

## 📁 File Structure

```
products/
├── index.html          # Main product page
├── styles.css          # Complete styling
├── script.js           # JavaScript functionality
└── README.md           # This documentation
```

## 🚀 Quick Start

1. **Open the page**: Open `index.html` in your browser
2. **Configure Stripe**: Update the publishable key in `script.js`
3. **Set up Calendly**: Replace the Calendly URL in `script.js`
4. **Customize content**: Edit product descriptions and pricing in `index.html`

## 🛠️ Setup Instructions

### 1. Stripe Integration

#### Step 1: Get Stripe Keys
1. Create a [Stripe account](https://stripe.com)
2. Get your publishable key from the dashboard
3. Replace in `script.js`:
```javascript
const stripe = Stripe('pk_test_YOUR_PUBLISHABLE_KEY_HERE');
```

#### Step 2: Create Products in Stripe
Create these products in your Stripe dashboard:
- **Claim Pack A**: $10 AUD
- **Claim Pack B**: $20 AUD  
- **Claim Pack C**: $40-60 AUD

#### Step 3: Backend Integration
You'll need a backend endpoint to create checkout sessions:
```javascript
// Example endpoint: /create-checkout-session
{
  "price_id": "price_claim_pack_a",
  "product_name": "Claim Pack A",
  "success_url": "https://yoursite.com/products/success.html",
  "cancel_url": "https://yoursite.com/products/index.html"
}
```

### 2. Calendly Integration

#### Step 1: Set up Calendly
1. Create a [Calendly account](https://calendly.com)
2. Create a 30-minute event type for "App Session"
3. Customize the intro text: "This is your time. Tell us everything. We'll listen."

#### Step 2: Update JavaScript
Replace the Calendly URL in `script.js`:
```javascript
url: 'https://calendly.com/your-username/30min'
```

### 3. Quote System Integration

The quote form collects:
- Name, Email, Phone
- Company details
- Industry and employee count
- Timeline and requirements

Currently simulated - integrate with your CRM/email system.

## 💰 Product Details

### Claim Pack A - $10
**"Essential Starter"**
- Psychological injury overview
- Basic claim eligibility checker
- Initial documentation templates
- FAQ resource guide
- Email support access

### Claim Pack B - $20
**"Comprehensive Guide"**
- Everything in Pack A
- Detailed claim process walkthrough
- Medical evidence requirements
- Workplace documentation guide
- Sample claim forms
- Video tutorials (3 hours)

### Claim Pack C - $40-60
**"Complete Support Package"**
- Everything in Pack A & B
- Advanced claim strategies
- Legal considerations guide
- Negotiation tactics
- Settlement guidance
- Priority email support
- 1x 30-minute consultation call

### App Session - $90
**"Guided Support Session"**
- 90-minute one-on-one session
- Personalized claim assessment
- Document review and guidance
- Action plan development
- Follow-up email summary

### App Navigator - $350+
**"Full Service Support"**
- Complete claim management
- Dedicated navigator assignment
- Unlimited consultations
- Document preparation assistance
- Ongoing support throughout process
- Custom pricing based on complexity

## 🎨 Design Features

### Visual Elements
- **Color Scheme**: Professional gradient (blue to purple)
- **Typography**: Inter font family
- **Animations**: Smooth hover effects and scroll animations
- **Cards**: Distinct styling for each product tier
- **Mobile**: Fully responsive design

### Interactive Elements
- **Product Cards**: Hover animations and clear CTAs
- **Modals**: Calendar booking and quote request
- **Navigation**: Mobile-friendly hamburger menu
- **FAQ**: Expandable question/answer sections

## 📊 Analytics & Tracking

### Events Tracked
- Page views
- Product card interactions
- Purchase attempts/completions
- Calendar bookings
- Quote submissions
- CTA button clicks

### Integration Ready
- Google Analytics 4
- Facebook Pixel
- Custom event tracking

## 🔧 Customization

### Pricing Updates
Update prices in the HTML and corresponding Stripe product IDs:
```html
<div class="price-amount" data-amount="10">$10</div>
```

### Content Modifications
- Product descriptions in `.product-description`
- Feature lists in `.product-features`
- FAQ content in `.faq-section`

### Styling Changes
- Colors: Update CSS custom properties
- Fonts: Change font imports and family declarations
- Layout: Modify grid and flexbox properties

## 🚨 Important Notes

### Security
- Never expose Stripe secret keys in frontend code
- Validate all form inputs on the backend
- Use HTTPS in production

### Performance
- Images are optimized for web
- CSS and JS are minified for production
- Lazy loading implemented for animations

### Accessibility
- Semantic HTML structure
- Keyboard navigation support
- Screen reader friendly
- High contrast ratios

## 🔗 Integration Points

### Email Services
Integrate quote submissions with:
- Mailchimp
- SendGrid
- ConvertKit
- Custom SMTP

### CRM Systems
Connect form data to:
- HubSpot
- Salesforce
- Pipedrive
- Custom database

### Payment Processing
Backend requirements:
- Stripe webhook handling
- Order fulfillment system
- Customer management
- Receipt generation

## 📱 Mobile Optimization

- Touch-friendly buttons (44px minimum)
- Optimized modal sizes
- Readable typography
- Fast loading times
- Gesture-friendly navigation

## 🧪 Testing

### Browser Compatibility
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Device Testing
- iPhone (iOS 14+)
- Android (Chrome 90+)
- iPad (Safari 14+)
- Desktop (1920x1080+)

## 📞 Support

For technical support or customization requests:
- Email: support@claimclarity.com.au
- Documentation: [Link to full docs]
- Issues: [GitHub issues link]

## 🔄 Updates

### Version 1.0
- Initial release with all core features
- Stripe integration
- Calendly booking
- Quote system
- Mobile responsive design

### Planned Features
- A/B testing capabilities
- Advanced analytics dashboard
- Multi-language support
- Progressive Web App features

---

**Ready to help workers navigate their psychological injury claims with clarity and confidence.** 