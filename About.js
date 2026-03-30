 // 1. Navbar Scroll Effect
        window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('shadow-lg');
            } else {
                navbar.classList.remove('shadow-lg');
            }
        });

        // 2. 12 Pillars Data (Array of Objects)
        const pillars = [
            {
                title: "Faith",
                desc: "The victory that overcomes the world.",
                verse: "1 John 5:4",
                fullText: "For everyone born of God overcomes the world. This is the victory that has overcome the world, even our faith."
            },
            {
                title: "The Word",
                desc: "Meditating on God's word for direction.",
                verse: "Joshua 1:8",
                fullText: "Keep this Book of the Law always on your lips; meditate on it day and night, so that you may be careful to do everything written in it."
            },
            {
                title: "The Supernatural",
                desc: "Experiencing divine intervention.",
                verse: "Hebrews 2:4",
                fullText: "God also testifying to it by signs, wonders and various miracles, and by gifts of the Holy Spirit distributed according to his will."
            },
            {
                title: "The Holy Spirit",
                desc: "The power for Christian living.",
                verse: "Acts 1:8",
                fullText: "But you will receive power when the Holy Spirit comes on you; and you will be my witnesses..."
            },
            {
                title: "Prosperity",
                desc: "Biblical principles for abundance.",
                verse: "3 John 1:2",
                fullText: "Beloved, I pray that you may enjoy good health and that all may go well with you, even as your soul is getting along well."
            },
            {
                title: "Prayer",
                desc: "Communication with God.",
                verse: "Matthew 7:7",
                fullText: "Ask and it will be given to you; seek and you will find; knock and the door will be opened to you."
            },
            {
                title: "Healing",
                desc: "Divine restoration of health.",
                verse: "Isaiah 53:5",
                fullText: "But he was pierced for our transgressions, he was crushed for our iniquities; the punishment that brought us peace was on him, and by his wounds we are healed."
            },
            {
                title: "Wisdom",
                desc: "Godly insight for life.",
                verse: "James 1:5",
                fullText: "If any of you lacks wisdom, you should ask God, who gives generously to all without finding fault."
            },
            {
                title: "Success",
                desc: "Achieving goals through God's principles.",
                verse: "Psalm 1:3",
                fullText: "That person is like a tree planted by streams of water, which yields its fruit in season and whose leaf does not wither—whatever they do prospers."
            },
            {
                title: "Vision",
                desc: "Having divine purpose.",
                verse: "Proverbs 29:18",
                fullText: "Where there is no revelation, people cast off restraint; but blessed is the one who heeds wisdom's instruction."
            },
            {
                title: "Consecration",
                desc: "Living a holy life.",
                verse: "Romans 12:1",
                fullText: "Therefore, I urge you, brothers and sisters, in view of God's mercy, to offer your bodies as a living sacrifice, holy and pleasing to God."
            },
            {
                title: "Praise",
                desc: "Expressing gratitude and worship.",
                verse: "Psalm 100:4",
                fullText: "Enter his gates with thanksgiving and his courts with praise; give thanks to him and praise his name."
            }
        ];

        // 3. Render Function
        function renderPillars() {
            const grid = document.getElementById('pillarsGrid');
            
            pillars.forEach(item => {
                // Create Column (3 cols)
                const col = document.createElement('div');
                col.className = 'col-lg-4 col-md-6'; // Responsive grid

                // Create Card HTML
                col.innerHTML = `
                    <div class="pillar-card">
                        <div class="pillar-icon"><i class="bi bi-columns-gap"></i></div>
                        <h3 class="pillar-title">${item.title}</h3>
                        <p class="pillar-desc">${item.desc}</p>
                        <div class="pillar-verse">
                            <strong>${item.verse}</strong><br>
                            "${item.fullText}"
                        </div>
                    </div>
                `;
                
                grid.appendChild(col);
            });
        }

        // 4. Initialize
        document.addEventListener('DOMContentLoaded', () => {
            renderPillars();
        });





        // 1. Toggle Function (Show/Hide Text)
        function toggleText() {
            const hiddenText = document.getElementById('hiddenText');
            const btn = document.getElementById('toggleBtn');
            const icon = btn.querySelector('i');

            // Check current state
            if (hiddenText.classList.contains('visible')) {
                // Hide
                hiddenText.classList.remove('visible');
                btn.innerHTML = 'Read More <i class="bi bi-arrow-down-circle ms-1"></i>';
            } else {
                // Show
                hiddenText.classList.add('visible');
                btn.innerHTML = 'Read Less <i class="bi bi-arrow-up-circle ms-1"></i>';
            }
        }

        // 2. Scroll Animation (Intersection Observer)
        // This watches when the section comes into view and animates it in
        const observers = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        });

        // Target elements with .fade-in-up class
        document.querySelectorAll('.fade-in-up').forEach((el) => {
            observer.observe(el);
        });



        

          // 2. Statistics Counter Animation
            // This detects when the stats section is visible and animates the numbers counting up
            const counters = document.querySelectorAll('.counter');
            const speed = 200; // The lower the slower

            const animateCounters = () => {
                counters.forEach(counter => {
                    const updateCount = () => {
                        const target = +counter.getAttribute('data-target');
                        const count = +counter.innerText;

                        // Lower inc to slow and higher to slow
                        const inc = target / speed;

                        if (count < target) {
                            // Add inc to count and output in counter
                            counter.innerText = Math.ceil(count + inc);
                            // Call function every ms
                            setTimeout(updateCount, 20);
                        } else {
                            counter.innerText = target + "+";
                        }
                    };
                    updateCount();
                });
            };

            // Intersection Observer to trigger animation only when scrolled into view
            let observerOptions = {
                root: null,
                rootMargin: '0px',
                threshold: 0.5
            };

            let observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateCounters();
                        observer.unobserve(entry.target); // Run only once
                    }
                });
            }, observerOptions);

            const statsSection = document.getElementById('stats');
            if (statsSection) {
                observer.observe(statsSection);
            };

        