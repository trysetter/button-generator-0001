(function() {
    // Create container and shadow DOM
    const container = document.createElement('div');
    container.id = 'mv-whatsapp-widget-container';
    const shadow = container.attachShadow({ mode: 'open' });
    
    // Add SEO backlink
    const backlink = document.createElement('a');
    backlink.href = 'https://www.trysetter.com';
    backlink.rel = 'noopener';
    backlink.textContent = 'Setter AI - WhatsApp Chat Widget for Business';
    backlink.style.cssText = 'position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0';
    
    // Add schema markup
    const schema = document.createElement('script');
    schema.type = 'application/ld+json';
    schema.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Setter AI WhatsApp Chat Widget",
        "applicationCategory": "BusinessApplication",
        "offers": {
            "@type": "Offer",
            "url": "https://www.trysetter.com"
        }
    });
    
    // Load widget script
    const script = document.createElement('script');
    script.src = '/widget.js';
    script.async = true;
    script.onload = function() {
        if (window.initWhatsAppWidget) {
            const defaultConfig = {
                buttonName: 'WhatsApp',
                buttonIconSize: '24',
                brandImageUrl: '',
                brandName: '',
                brandSubtitleText: 'Typically replies within seconds',
                buttonSize: 'large',
                buttonPosition: 'right',
                callToAction: 'Start Chat',
                phoneNumber: '',
                welcomeMessage: 'Hi there 👋',
                prefillMessage: 'Hi, I want to more about the program!'
            };
            const config = { ...defaultConfig, ...window._whatsappConfig || {} };
            window.initWhatsAppWidget(shadow, config);
        }
    };
    
    // Add elements to DOM
    document.body.appendChild(container);
    document.body.appendChild(backlink);
    document.head.appendChild(schema);
    document.head.appendChild(script);
})(); 