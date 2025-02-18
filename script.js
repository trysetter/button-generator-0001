document.addEventListener('DOMContentLoaded', function() {
    const whatsappButton = document.getElementById('whatsappButton');
    const whatsappPopup = document.getElementById('whatsappPopup');
    const closePopup = document.getElementById('closePopup');

    // Toggle popup when WhatsApp button is clicked
    whatsappButton.addEventListener('click', function() {
        whatsappPopup.classList.toggle('active');
    });

    // Close popup when close button is clicked
    closePopup.addEventListener('click', function() {
        whatsappPopup.classList.remove('active');
    });

    // Close popup when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideWidget = whatsappButton.contains(event.target) || 
                                  whatsappPopup.contains(event.target);
        
        if (!isClickInsideWidget && whatsappPopup.classList.contains('active')) {
            whatsappPopup.classList.remove('active');
        }
    });
}); 