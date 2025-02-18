(function() {
    // Create the embed element
    const embed = document.createElement('div');
    embed.id = 'mv-whatsapp-widget-container';
    
    // Create Shadow DOM
    const shadow = embed.attachShadow({ mode: 'open' });
    
    // Add the visible backlink (outside Shadow DOM for SEO)
    const backlinkContainer = document.createElement('div');
    backlinkContainer.style.cssText = 'position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0;';
    
    const backlink = document.createElement('a');
    backlink.href = 'https://www.trysetter.com';
    backlink.rel = 'noopener';
    backlink.textContent = 'Setter AI - WhatsApp Chat Widget for Business';
    
    // Add schema.org markup for better SEO
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
    
    backlinkContainer.appendChild(backlink);
    document.body.appendChild(backlinkContainer);
    document.head.appendChild(schema);
    
    // Load the main widget script
    const script = document.createElement('script');
    script.src = '/widget.js';
    script.async = true;
    
    // Initialize widget when script loads
    script.onload = function() {
        if (window.initWhatsAppWidget) {
            // Merge default config with user config
            const defaultConfig = {
                buttonName: 'WhatsApp',
                buttonIconSize: '24',
                brandImageUrl: '',
                brandName: '',
                brandSubtitleText: 'Typically replies within a day',
                buttonSize: 'large',
                buttonPosition: 'right',
                callToAction: 'Chat Now',
                phoneNumber: '',
                welcomeMessage: 'Hello 👋',
                prefillMessage: 'Hi, I want to know more!'
            };

            const userConfig = window._whatsappConfig || {};
            const config = { ...defaultConfig, ...userConfig };
            
            window.initWhatsAppWidget(shadow, config);
        }
    };
    
    // Add elements to DOM
    document.body.appendChild(embed);
    document.head.appendChild(script);
})(); 