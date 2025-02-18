# Mindvalley WhatsApp Widget

A customizable WhatsApp chat widget that can be easily embedded into any website. The widget provides a professional and seamless way for visitors to start WhatsApp conversations with your business.

## Features

- 🎨 Fully customizable appearance
- 📱 Mobile responsive
- 🔒 Secure implementation with Shadow DOM
- 🔍 SEO-friendly
- ⚡ Fast loading with async script
- 🌐 Easy to embed

## Installation

Add this code to your website before the closing `</body>` tag:

```html
<!-- WhatsApp Widget Configuration -->
<script>
    window._whatsappConfig = {
        buttonName: 'Message Us',
        buttonIconSize: 22,
        brandImageUrl: 'https://cdn.prod.website-files.com/65c0a21468a11124c832dc8b/67b40795a14ebddfa715cbe0_unnamed.webp',
        brandName: 'Your Company Name',
        brandSubtitleText: 'Typically replies within seconds',
        buttonSize: 'large',
        buttonPosition: 'right',
        callToAction: 'Start Chat',
        phoneNumber: '12184273128',  // Your WhatsApp number
        welcomeMessage: 'Hi there 👋',
        prefillMessage: 'Hi, I want to know more!'
    };
</script>
<script src="https://cdn.jsdelivr.net/gh/timonikolai/mindvalley@main/public/widget/whatsapp/v1/embed.js" async></script>
```

### CDN Usage
The widget files are served through jsDelivr CDN for better reliability and performance. The CDN URLs are:
- Widget: `https://cdn.jsdelivr.net/gh/timonikolai/mindvalley@main/public/widget/whatsapp/v1/embed.js`
- Assets: Served through the same CDN path

This ensures the widget continues to work even during server maintenance or restarts.

## Configuration Options

| Option | Type | Description | Default |
|--------|------|-------------|---------|
| `buttonName` | string | Text shown on the WhatsApp button | 'WhatsApp' |
| `buttonIconSize` | number | Size of the WhatsApp icon in pixels | 24 |
| `brandImageUrl` | string | URL to your company logo | '' |
| `brandName` | string | Your company name | '' |
| `brandSubtitleText` | string | Subtitle shown under company name | 'Typically replies within seconds' |
| `buttonSize` | string | Size of the button ('small', 'medium', 'large') | 'large' |
| `buttonPosition` | string | Position of the button ('left', 'right') | 'right' |
| `callToAction` | string | Text shown on the chat button | 'Start Chat' |
| `phoneNumber` | string | Your WhatsApp number (numbers only) | '' |
| `welcomeMessage` | string | First message shown in chat | 'Hello 👋' |
| `prefillMessage` | string | Pre-filled message for users | 'Hi, I want to know more!' |

## Development

The widget consists of two main files:
- `embed.js` - Entry point that loads the widget and handles SEO
- `widget.js` - Main widget implementation with styles and functionality

### Local Development
To run locally:
```bash
node server.js
```
Then visit `http://localhost:8080`

### Production Usage
The widget is deployed and available at:
```
https://mindvalleybutton-production.up.railway.app
```

To embed on any website, use the installation code provided above. The widget can be embedded on any domain as it includes proper CORS headers.

## License

MIT License

## Credits

Powered by [Setter AI](https://www.trysetter.com) 