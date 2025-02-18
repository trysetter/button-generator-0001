(function() {
    const styles = `
        :host {
            --whatsapp-green: #25D366;
            --popup-width: 360px;
        }
        
        .mv-whatsapp-widget {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 9999;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        }

        .mv-whatsapp-button {
            display: flex;
            align-items: center;
            gap: 8px;
            background-color: var(--whatsapp-green);
            color: white;
            border: none;
            border-radius: 24px;
            padding: 12px 24px;
            cursor: pointer;
            font-size: 16px;
            font-weight: 500;
            box-shadow: 0 4px 12px rgba(37, 211, 102, 0.3);
            transition: all 0.3s ease;
        }

        .mv-whatsapp-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 16px rgba(37, 211, 102, 0.4);
        }

        .mv-whatsapp-icon {
            width: 24px;
            height: 24px;
            flex-shrink: 0;
        }

        .mv-whatsapp-popup {
            position: absolute;
            bottom: calc(100% + 20px);
            right: 0;
            width: var(--popup-width);
            background: white;
            border-radius: 12px;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
            display: none;
            overflow: hidden;
        }

        .mv-popup-header {
            background-color: #075E54;
            padding: 16px;
            color: white;
        }

        .mv-header-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .mv-business-info {
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .mv-business-avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            overflow: hidden;
            background: white;
            flex-shrink: 0;
        }

        .mv-avatar-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .mv-business-details {
            display: flex;
            flex-direction: column;
            min-width: 0;
        }

        .mv-business-name {
            font-weight: 600;
            font-size: 16px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .mv-business-type {
            font-size: 14px;
            opacity: 0.8;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .mv-close-btn {
            background: none;
            border: none;
            color: white;
            font-size: 24px;
            cursor: pointer;
            padding: 4px;
            flex-shrink: 0;
            line-height: 1;
        }

        .mv-popup-content {
            padding: 16px;
            background: #E5DDD5;
            min-height: 200px;
            max-height: 400px;
            overflow-y: auto;
        }

        .mv-message {
            margin-bottom: 12px;
        }

        .mv-message-content {
            max-width: 80%;
            padding: 8px 12px;
            border-radius: 8px;
            position: relative;
        }

        .mv-business .mv-message-content {
            background: white;
            margin-right: auto;
        }

        .mv-user .mv-message-content {
            background: #DCF8C6;
            margin-left: auto;
        }

        .mv-sender {
            color: #075E54;
            font-weight: 600;
            font-size: 13px;
            margin-bottom: 4px;
        }

        .mv-text {
            font-size: 14px;
            line-height: 1.4;
            word-break: break-word;
        }

        .mv-popup-footer {
            padding: 16px;
            background: white;
        }

        .mv-chat-now-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            width: 100%;
            box-sizing: border-box;
            background-color: var(--whatsapp-green);
            color: white;
            text-decoration: none;
            padding: 12px;
            border-radius: 24px;
            font-weight: 500;
            margin-bottom: 12px;
            transition: background-color 0.3s ease;
        }

        .mv-chat-now-btn:hover {
            background-color: #1ea952;
        }

        .mv-chat-now-btn .mv-whatsapp-icon {
            flex-shrink: 0;
        }

        .mv-powered-by {
            text-align: center;
            font-size: 13px;
            color: #666;
        }

        .mv-setter-link {
            color: #075E54;
            text-decoration: none;
            font-weight: 500;
        }

        .mv-setter-link:hover {
            text-decoration: underline;
        }

        .mv-whatsapp-popup.active {
            display: block;
            animation: mvSlideIn 0.3s ease;
        }

        @keyframes mvSlideIn {
            from {
                opacity: 0;
                transform: translateY(10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        /* Button sizes */
        .mv-button-large {
            padding: 12px 24px;
            font-size: 16px;
        }

        .mv-button-medium {
            padding: 10px 20px;
            font-size: 14px;
        }

        .mv-button-small {
            padding: 8px 16px;
            font-size: 13px;
        }
    `;

    // WhatsApp icon SVG as base64
    const whatsappIconBase64 = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMjAuNDAzOSAzLjU5MjA0QzE4LjE1OTIgMS4yNzUyOCAxNS4xNDE1IDAgMTEuOTk0OCAwQzUuNDM3MjQgMCAwIDUuNDM3MjQgMCAxMS45OTQ4QzAgMTQuMTA1MyAwLjU0NjY5MyAxNi4xNjM4IDEuNTgzNDYgMTcuOTc2NEwwIDI0TDYuMTYxNDIgMjIuNDQ4OUM3LjkxNzMyIDIzLjM5NzYgOS45NTQzMyAyMy45ODk2IDExLjk5NDggMjMuOTg5NkgxMkMxOC41NTc2IDIzLjk4OTYgMjQgMTguNTUyNCAyNCAxMS45OTQ4QzI0IDguODQ4MDcgMjIuNjQ4NyA1LjkwODggMjAuNDAzOSAzLjU5MjA0Wk0xMS45OTQ4IDIxLjk4ODVDMTAuMjE3NCAyMS45ODg1IDguNDgxNSAyMS40MzE0IDYuOTgyNjggMjAuMzg0Mkw2LjYyMjA1IDIwLjE2NTRMMi44NjYxNCAyMS4wOTgxTDMuODE5NjkgMTcuNDM0NUwzLjU3OTUzIDE3LjA1ODFDMi40MjEyNiAxNS41MDY5IDEuODIzNjIgMTMuNjg5NSAxLjgyMzYyIDExLjc5NjhDMS44MjM2MiA2LjQ0MDk0IDYuMjk2NjkgMi4wMDExIDExLjk5NDggMi4wMDExQzE0LjYyOTkgMi4wMDExIDE3LjE0OTYgMy4wNzg3NCAxOS4wMjUyIDQuOTY5NkMyMC45MDA4IDYuODYwNDcgMjIuMTc2NCw5LjM1OTY5IDIyLjE3NjQgMTEuOTk0OEMyMi4xNzY0IDE3LjY5MjkgMTcuNjkyOSAyMS45ODg1IDExLjk5NDggMjEuOTg4NVpNMTcuNDEzOCAxNC41MDY5QzE3LjExNTQgMTQuMzU3NyAxNS42NjE0IDEzLjY0ODggMTUuMzgzNSAxMy41NDk2QzE1LjEwNTcgMTMuNDUwNCAxNC45MDU1IDEzLjQwMDggMTQuNzA1MyAxMy42OTkyQzE0LjUwNTEgMTMuOTk3NiAxMy45NDggMTQuNjU2MSAxMy43Njg2IDE0Ljg1NjNDMTMuNTg5MSAxNS4wNTY1IDEzLjQwOTcgMTUuMDgxMyAxMy4xMTEzIDE0LjkzMjFDMTIuODEyOSAxNC43ODI5IDExLjg0ODYgMTQuNDYzIDEwLjcxMTEgMTMuNDUwNEM5LjgyNzE3IDEyLjY2MjYgOS4yMjk1MyAxMS42OTgzIDkuMDUwMTIgMTEuMzk5OUM4Ljg3MDcxIDExLjEwMTUgOS4wMjk3NCAxMC45MzIxIDkuMTgzNTQgMTAuNzc4M0M5LjMyMjM2IDEwLjYzOTUgOS40ODYxNiAxMC40MjA3IDkuNjM1MzUgMTAuMjQxM0M5Ljc4NDU1IDEwLjA2MTkgOS44MzQxNyA5LjkzMjMyIDkuOTMzMzUgOS43MzIxMkM5Ljk4Mjk3IDkuNTMxOTMgOS45ODI5NyA5LjMzMTczIDkuOTMzMzUgOS4xODI1M0M5Ljg4MzczIDkuMDMzMzQgOS4yMjk1MyA3LjU3OTMzIDguOTgwMTYgNi45ODIwOEM4LjczMDc5IDYuNDA0MjUgOC40ODY0IDYuNDUzODcgOC4zMDY5OSA2LjQ1Mzg3QzguMTI3NTggNi40NTM4NyA3LjkyNzM4IDYuNDUzODcgNy43MjcxOCA2LjQ1Mzg3QzcuNTI2OTkgNi40NTM4NyA3LjE5OTQxIDYuNTAzNDkgNi45MjE2MSA2LjgwMTkzQzYuNjQzODEgNy4xMDAzNyA1Ljg4NTgzIDcuODA5MjUgNS44ODU4MyA5LjI2MzI2QzUuODg1ODMgMTAuNzE3MyA2Ljk0MTQyIDEyLjEyMTcgNy4wOTA2MiAxMi4zMjE5QzcuMjM5ODIgMTIuNTIyMSA5LjIyOTUzIDE1LjU2NDIgMTIuMjM1MyAxNi44MTk2QzEzLjAxMzEgMTcuMTU3IDE3LjQxMzggMTguNjExIDEzLjYxMzkgMTYuODE5NkMxMy45OTE1IDE2LjgxOTYgMTQuMzE5MSAxNi43NyAxNC41OTY5IDE2LjcyMDRDMTQuODc0NyAxNi42NzA4IDE2LjA4MjUgMTYuMDM2NCAxNi4zMzE5IDE1LjMzNzlDMTYuNTgxMiAxNC42Mzk0IDE2LjU4MTIgMTQuMDQyMiAxNi41MzE2IDEzLjk0M0MxNi40ODIgMTMuODQzOCAxNi4yODE4IDEzLjc5NDIgMTUuOTgzNCAxMy42NDVDMTUuNjg1IDE0LjUwNjkgMTcuNDEzOCAxNC41MDY5IDE3LjQxMzggMTQuNTA2OVoiIGZpbGw9IndoaXRlIi8+PC9zdmc+';

    // Mindvalley logo URL
    const mindvalleyLogoUrl = 'https://cdn.prod.website-files.com/65c0a21468a11124c832dc8b/67b40795a14ebddfa715cbe0_unnamed.webp';

    function createWidget(config) {
        const template = document.createElement('template');
        template.innerHTML = `
            <style>${styles}</style>
            <div class="mv-whatsapp-widget">
                <div class="mv-whatsapp-popup" id="mvWhatsappPopup">
                    <div class="mv-popup-header">
                        <div class="mv-header-content">
                            <div class="mv-business-info">
                                <div class="mv-business-avatar">
                                    <img src="${config.brandImageUrl || mindvalleyLogoUrl}" alt="${config.brandName}" class="mv-avatar-img">
                                </div>
                                <div class="mv-business-details">
                                    <div class="mv-business-name">${config.brandName}</div>
                                    <div class="mv-business-type">${config.brandSubtitleText}</div>
                                </div>
                            </div>
                            <button class="mv-close-btn" id="mvClosePopup">×</button>
                        </div>
                    </div>
                    <div class="mv-popup-content">
                        <div class="mv-message mv-business">
                            <div class="mv-message-content">
                                <div class="mv-sender">${config.brandName}</div>
                                <div class="mv-text">${config.welcomeMessage}</div>
                            </div>
                        </div>
                        <div class="mv-message mv-user">
                            <div class="mv-message-content">
                                <div class="mv-text">${config.prefillMessage}</div>
                            </div>
                        </div>
                    </div>
                    <div class="mv-popup-footer">
                        <a href="https://wa.me/${config.phoneNumber}?text=${encodeURIComponent(config.prefillMessage)}" 
                           target="_blank" 
                           class="mv-chat-now-btn mv-button-${config.buttonSize}">
                            <img src="${whatsappIconBase64}" 
                                 alt="WhatsApp" 
                                 class="mv-whatsapp-icon"
                                 style="width: ${config.buttonIconSize}px; height: ${config.buttonIconSize}px;">
                            ${config.callToAction}
                        </a>
                        <div class="mv-powered-by">
                            ⚡ Powered by <a href="https://www.trysetter.com" target="_blank" class="mv-setter-link">Setter AI</a>
                        </div>
                    </div>
                </div>

                <button class="mv-whatsapp-button mv-button-${config.buttonSize}" id="mvWhatsappButton">
                    <img src="${whatsappIconBase64}" 
                         alt="WhatsApp" 
                         class="mv-whatsapp-icon"
                         style="width: ${config.buttonIconSize}px; height: ${config.buttonIconSize}px;">
                    ${config.buttonName}
                </button>
            </div>
        `;
        return template;
    }

    function initWhatsAppWidget(shadowRoot, config = {}) {
        console.log('Initializing WhatsApp Widget with config:', config);

        // Create and append widget
        const widgetTemplate = createWidget(config);
        shadowRoot.appendChild(widgetTemplate.content.cloneNode(true));

        // Get elements
        const widget = shadowRoot.querySelector('.mv-whatsapp-widget');
        const whatsappButton = shadowRoot.querySelector('#mvWhatsappButton');
        const whatsappPopup = shadowRoot.querySelector('#mvWhatsappPopup');
        const closePopup = shadowRoot.querySelector('#mvClosePopup');

        console.log('Elements found:', {
            widget: !!widget,
            whatsappButton: !!whatsappButton,
            whatsappPopup: !!whatsappPopup,
            closePopup: !!closePopup
        });

        // Position the widget
        if (config.buttonPosition === 'left') {
            widget.style.left = '20px';
            widget.style.right = 'auto';
        }

        // Add click event to button
        if (whatsappButton) {
            whatsappButton.addEventListener('click', (e) => {
                console.log('Button clicked');
                e.stopPropagation();
                whatsappPopup.classList.toggle('active');
            });
        }

        // Add click event to close button
        if (closePopup) {
            closePopup.addEventListener('click', (e) => {
                console.log('Close button clicked');
                e.stopPropagation();
                whatsappPopup.classList.remove('active');
            });
        }

        // Add click outside handler
        document.addEventListener('click', (event) => {
            const isClickInsideWidget = event.composedPath().includes(widget);
            if (!isClickInsideWidget && whatsappPopup.classList.contains('active')) {
                console.log('Clicked outside widget');
                whatsappPopup.classList.remove('active');
            }
        });

        console.log('WhatsApp Widget initialized');
    }

    // Add to window object
    window.initWhatsAppWidget = initWhatsAppWidget;
})(); 