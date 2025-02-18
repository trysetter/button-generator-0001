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
        brandImageUrl: '',  // Your company logo URL
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
<script src="https://www.trysetter.com/widget/whatsapp/v1/embed.js" async></script>
```

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

To run locally:
```bash
node server.js
```
Then visit `http://localhost:3001`

## License

MIT License

## Credits

Powered by [Setter AI](https://www.trysetter.com) 