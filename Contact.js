const successModal = new bootstrap.Modal(document.getElementById('successModal'));

        // Handle General Contact Form
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            // In a real app, you would send this data to a server using fetch() or AJAX
            // Here we simulate success
            document.getElementById('modalMessage').innerText = "Your message has been sent. We will reply shortly.";
            successModal.show();
            this.reset();
        });

        // Handle Transportation Form
        document.getElementById('transportForm').addEventListener('submit', function(e) {
            e.preventDefault();
            // In a real app, this goes to a database for the transport coordinator
            
            document.getElementById('modalMessage').innerText = "Your ride has been booked! You will receive a call shortly.";
            successModal.show();
            this.reset();
               });