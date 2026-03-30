        // 2. Next Service Countdown Logic
        // Function to get the next Sunday 10:00 AM
        function getNextSunday() {
            const d = new Date();
            d.setDate(d.getDate() + (7 - d.getDay()) % 7);
            d.setHours(10, 0, 0, 0); // Set to 10 AM
            return d;
        }

        function updateCountdown() {
            const now = new Date();
            const target = getNextSunday();

            // If it's past 10 AM Sunday, add 7 days
            if (now > target) {
                target.setDate(target.getDate() + 7);
            }

            const diff = target - now;

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            document.getElementById('days').innerText = days < 10 ? '0' + days : days;
            document.getElementById('hours').innerText = hours < 10 ? '0' + hours : hours;
            document.getElementById('minutes').innerText = minutes < 10 ? '0' + minutes : minutes;
            document.getElementById('seconds').innerText = seconds < 10 ? '0' + seconds : seconds;
        }

        setInterval(updateCountdown, 1000);
        updateCountdown(); // Initial 
        
           // 1. Navbar Scroll Effect
        window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
                navbar.classList.remove('navbar-dark');
                navbar.classList.add('navbar-light');
            } else {
                navbar.classList.remove('scrolled');
                navbar.classList.remove('navbar-light');
                navbar.classList.add('navbar-dark');
            }
        });

        // 2. Copy to Clipboard Functionality
        function copyText(elementId, btnElement) {
            // Get the text content
            const textToCopy = document.getElementById(elementId).innerText;
            
            // Copy to clipboard
            navigator.clipboard.writeText(textToCopy).then(() => {
                // Visual Feedback: Change button text temporarily
                const originalHTML = btnElement.innerHTML;
                
                btnElement.innerHTML = `<i class="bi bi-check"></i> Copied!`;
                btnElement.classList.remove('btn-outline-primary');
                btnElement.classList.add('btn-success');
                btnElement.classList.add('text-white');

                // Revert back to original after 2 seconds
                setTimeout(() => {
                    btnElement.innerHTML = originalHTML;
                    btnElement.classList.remove('btn-success');
                    btnElement.classList.remove('text-white');
                    btnElement.classList.add('btn-outline-primary');
                }, 2000);
            }).catch(err => {
                alert('Failed to copy: ' + err);
            });
        }



//Notification
          // --- CONFIGURATION ---
        const notification = document.getElementById('eventNotification');
        let hasShown = false; // Prevents it from dropping multiple times

        // 1. SCROLL EVENT LISTENER
        window.addEventListener('scroll', function () {
            // Trigger when scrolled down 300 pixels
            if (window.scrollY > 300 && !hasShown) {
                showNotification();
            }
        });

        // 2. FUNCTION: SHOW NOTIFICATION
        function showNotification() {
            notification.classList.add('active');
            hasShown = true; // Mark as shown
        }

        // 3. FUNCTION: HIDE NOTIFICATION
        function hideNotification() {
            notification.classList.remove('active');
            // Optional: Mark as false again so user can scroll back up and see it if they want?
            // For now, we keep it hidden once closed.
        }

        // 4. CLOSE WHEN CLICKING OUTSIDE (User Experience)
        document.addEventListener('click', function (event) {
            const isClickInside = notification.contains(event.target);

            // If click is outside notification AND notification is visible
            if (!isClickInside && hasShown && notification.classList.contains('active')) {
                hideNotification();
            }
        });



          document.addEventListener('DOMContentLoaded', function () {

            // 1. Intersection Observer for Scroll Animations
            // This makes the cards fade up as you scroll down to them
            const observerOptions = {
                root: null,
                rootMargin: '0px',
                threshold: 0.1 // Trigger when 10% of the element is visible
            };

            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        // Add a small delay based on the element's index for a staggered effect
                        setTimeout(() => {
                            entry.target.classList.add('active');
                        }, index * 150);

                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            const revealElements = document.querySelectorAll('.reveal-up');
            revealElements.forEach(el => observer.observe(el));

            // 2. Interactive Ripple Click Effect (Optional Polish)
            // Adds a subtle flash when clicking a card
            const cards = document.querySelectorAll('.ministry-card');

            cards.forEach(card => {
                card.addEventListener('click', function (e) {
                    // Simple visual feedback
                    this.style.borderColor = '#dc3545';
                    setTimeout(() => {
                        this.style.borderColor = '#222';
                    }, 300);
                });
            });
        });