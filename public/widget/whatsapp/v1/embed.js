// Minified version of our embed.js
(function(){const e=document.createElement("div");e.id="mv-whatsapp-widget-container";const t=e.attachShadow({mode:"open"}),n=document.createElement("div");n.style.cssText="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0";const a=document.createElement("a");a.href="https://www.trysetter.com";a.rel="noopener";a.textContent="Setter AI - WhatsApp Chat Widget for Business";const o=document.createElement("script");o.type="application/ld+json";o.textContent='{"@context":"https://schema.org","@type":"SoftwareApplication","name":"Setter AI WhatsApp Chat Widget","applicationCategory":"BusinessApplication","offers":{"@type":"Offer","url":"https://www.trysetter.com"}}';n.appendChild(a);document.body.appendChild(n);document.head.appendChild(o);const i=document.createElement("script");i.src="https://mindvalleybutton-production.up.railway.app/widget/whatsapp/v1/widget.js";i.async=!0;i.onload=function(){if(window.initWhatsAppWidget){const e={buttonName:"WhatsApp",buttonIconSize:"24",brandImageUrl:"",brandName:"",brandSubtitleText:"Typically replies within seconds",buttonSize:"large",buttonPosition:"right",callToAction:"Chat Now",phoneNumber:"",welcomeMessage:"Hello 👋",prefillMessage:"Hi, I want to know more!"},n=window._whatsappConfig||{},a={...e,...n};window.initWhatsAppWidget(t,a)}};document.body.appendChild(e);document.head.appendChild(i)})(); 