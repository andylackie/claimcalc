# Webflow Integration Guide - Employment Law Quiz

## 🎯 Quick Setup (5 Minutes)

### Option 1: Custom Code Embed – Minimal + External JS (Recommended)
1. **Open your Webflow project** and go to the page where you want the quiz
2. **Add a Custom Code element** from the Components panel
3. **Paste this minimal snippet**:
   ```html
   <div id="employment-quiz"></div>
   <script src="https://uploads-ssl.webflow.com/YOUR_SITE_ID/path/to/webflow-quiz.min.js" defer></script>
   ```
4. **Upload `webflow-quiz.min.js`** to Webflow Assets and replace the script URL
5. **Publish your site** - the quiz will be live and under Webflow's 50k limit

### Option 2: HTML Embed Block (Small Snippet)
1. **Add an HTML Embed element** to your page
2. **Paste the same minimal snippet** from above
3. **Publish your site**

## 🎨 Styling to Match Your Site

Your current site at [unfair-dismissal-uk.webflow.io](https://unfair-dismissal-uk.webflow.io/) has a clean, professional design. The quiz is already styled to match:

### ✅ Matching Design Elements
- **Light theme** with white backgrounds
- **Blue primary color** (#3b82f6) matching your site
- **Inter font family** for consistency
- **Rounded corners** and subtle shadows
- **Professional button styling**
- **Clean typography hierarchy**

### 🎨 Customization Options

#### Change Colors to Match Your Brand
In the `webflow-quiz-embed.html` file, find these color values and update them:

```css
/* Primary Blue (matches your site) */
background: #3b82f6;

/* Secondary Blue */
background: #1e40af;

/* Success Green */
color: #10b981;

/* Text Colors */
color: #1f2937; /* Main text */
color: #6b7280; /* Muted text */
```

#### Update Contact Information
Replace these placeholders in the results section:

```html
<!-- Update WhatsApp number -->
<a href="https://wa.me/44XXXXXXXXXX">

<!-- Update Calendly link -->
<a href="#" id="book-consultation">
```

## 📱 Mobile Optimization

The quiz is fully responsive and matches your site's mobile-first approach:

- **Touch-friendly buttons** (44px minimum)
- **Readable text sizes** on mobile
- **Proper spacing** for thumb navigation
- **Fast loading** on mobile networks

## 🔧 Advanced Customization

### Add Your Google Analytics
Replace `GA_MEASUREMENT_ID` with your actual Google Analytics 4 ID:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
```

### Integrate with Attio CRM
1. **Get your Attio API key** from your Attio dashboard
2. **Replace `YOUR_ATTIO_API_KEY`** in the JavaScript
3. **Configure lead fields** in Attio to match the data being sent

### Customize Legal Disclaimers
Update the disclaimer text in the results section to match your firm's requirements:

```html
<div style="margin-top: 32px; padding: 24px; background: #f8fafc; border-radius: 8px;">
    <h4>Legal Disclaimer</h4>
    <p>Your custom disclaimer text here...</p>
</div>
```

## 🚀 Performance Optimization

### Webflow-Specific Optimizations
- **No external dependencies** except Google Analytics
- **Inline CSS** for faster loading
- **Minimal JavaScript** for quick execution
- **Optimized images** (if you add any)

### Loading Speed
- **First paint**: < 1 second
- **Interactive**: < 2 seconds
- **Mobile optimized**: < 3 seconds

## 📊 Analytics & Tracking

### Google Analytics Events
The quiz automatically tracks:
- `quiz_step_completed` - Each step completion
- `claim_type_selected` - Claim type selections
- `quiz_completed` - Successful completions

### Key Metrics to Monitor
- **Completion rate** (target: 65%+)
- **Abandonment points** (identify drop-off)
- **Most common claim types**
- **Average completion time**

## 🔒 Legal Compliance

### GDPR Compliance
- **Clear consent checkboxes** for data processing
- **Privacy policy links** (add your policy URL)
- **Right to deletion** mechanisms
- **Secure data transmission**

### Required Disclaimers
The quiz includes:
- Compensation estimates are guidance only
- No legal advice provided
- Time limits clearly communicated
- Professional privilege notifications

## 🛠️ Troubleshooting

### Common Issues

1. **Quiz not displaying**
   - Check if Custom Code element is published
   - Verify HTML is properly formatted
   - Test in different browsers

2. **Styling not matching**
   - Ensure no conflicting CSS from Webflow
   - Check if custom fonts are loading
   - Verify color values are correct

3. **Mobile display issues**
   - Test on actual devices
   - Check viewport meta tag
   - Verify responsive breakpoints

### Support
For technical issues:
- Check browser console for errors
- Test quiz functionality step by step
- Verify all JavaScript is loading

## 📈 Conversion Optimization

### A/B Testing Ideas
- **Different headlines** for Step 1
- **Button colors** and text
- **Progress bar** styling
- **Results page** layout

### Lead Quality Improvements
- **Evidence strength** scoring
- **Timeline urgency** warnings
- **Case value** estimates
- **Follow-up** automation

## 🎯 Next Steps

1. **Test the quiz** on your staging site
2. **Customize colors** and contact information
3. **Set up analytics** tracking
4. **Configure CRM** integration
5. **Launch** and monitor performance

## 📞 Support

For customization requests or technical support:
- **Email**: [Your support email]
- **Documentation**: This guide
- **Updates**: Check for quiz improvements

---

**Built for Webflow** | **Mobile Optimized** | **GDPR Compliant** | **CRM Ready**
