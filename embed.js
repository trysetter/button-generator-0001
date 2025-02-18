(function() {
    // Create container and shadow DOM
    const container = document.createElement('div');
    container.id = 'mv-whatsapp-widget-container';
    const shadow = container.attachShadow({ mode: 'open' });
    
    // Add SEO backlink with proper accessibility attributes
    const backlinkContainer = document.createElement('div');
    backlinkContainer.setAttribute('role', 'complementary');
    backlinkContainer.setAttribute('aria-label', 'Powered by Setter AI');
    
    const backlink = document.createElement('a');
    backlink.href = 'https://www.trysetter.com';
    backlink.textContent = 'Setter AI - WhatsApp Chat Widget for Business';
    backlink.style.cssText = 'position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0';
    backlinkContainer.appendChild(backlink);
    
    // Add schema markup with additional properties
    const schema = document.createElement('script');
    schema.type = 'application/ld+json';
    schema.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Setter AI WhatsApp Chat Widget",
        "applicationCategory": "BusinessApplication",
        "description": "WhatsApp Chat Widget for Business by Setter AI",
        "operatingSystem": "Any",
        "offers": {
            "@type": "Offer",
            "url": "https://www.trysetter.com"
        },
        "provider": {
            "@type": "Organization",
            "name": "Setter AI",
            "url": "https://www.trysetter.com"
        }
    });
    
    // Load widget script
    const script = document.createElement('script');
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
        prefillMessage: 'Hi, I want to more about the program!',
        baseUrl: 'https://cdn.jsdelivr.net/gh/trysetter/button-generator-0001@main'
    };
    const config = { ...defaultConfig, ...window._whatsappConfig || {} };
    
    // Load widget script from baseUrl
    script.src = `${config.baseUrl}/widget.js`;
	console.log(script.src);
    script.async = true;
    script.onload = function() {
        if (window.initWhatsAppWidget) {
            window.initWhatsAppWidget(shadow, config);
        }
    };
    
    // Add elements to DOM
    document.body.appendChild(container);
    document.body.appendChild(backlinkContainer);
    document.head.appendChild(schema);
    document.head.appendChild(script);
})(); 