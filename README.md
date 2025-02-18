# Setter AI WhatsApp Widget

A lightweight, customizable WhatsApp chat widget that can be embedded on any website.

## Deployment

1. Create a new project on Railway.app
2. Connect this repository to your Railway project
3. Deploy the project
4. Your widget will be available at: `https://your-railway-url/widget/whatsapp/v1/embed.js`

## Usage

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
<script src="https://setter-whatsapp-widget-production.up.railway.app/widget/whatsapp/v1/embed.js" async></script>
```

## Configuration Options

- `buttonName`: Text shown on the WhatsApp button
- `buttonIconSize`: Size of the WhatsApp icon in pixels
- `brandImageUrl`: URL to your company logo
- `brandName`: Your company name
- `brandSubtitleText`: Subtitle shown under your company name
- `buttonSize`: 'small', 'medium', or 'large'
- `buttonPosition`: 'left' or 'right'
- `callToAction`: Text shown on the chat button
- `phoneNumber`: Your WhatsApp number (numbers only, no spaces or special characters)
- `welcomeMessage`: First message shown in the chat
- `prefillMessage`: Message that will be pre-filled in WhatsApp

## Development

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm start`
4. Visit `http://localhost:3000` to test the widget

## Files

- `public/widget/whatsapp/v1/embed.js`: The main embed script
- `public/widget/whatsapp/v1/widget.js`: The widget implementation
- `server.js`: Express server for serving the widget files

## Features

- Lightweight and fast
- SEO-friendly with proper backlinks
- Shadow DOM for style isolation
- Mobile responsive
- Customizable appearance
- Proper caching headers
- CORS enabled
- Gzip compression 