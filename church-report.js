// --- 1. STATE MANAGEMENT ---
        // We try to get data from LocalStorage. If none, we start with an empty array.
        let testimonies = JSON.parse(localStorage.getItem('churchTestimonies')) || [];

        // --- 2. DOM ELEMENTS ---
        const form = document.getElementById('testimonyForm');
        const grid = document.getElementById('testimonyGrid');
        const emptyState = document.getElementById('emptyState');
        const countBadge = document.getElementById('countBadge');
        
        // Modals
        const readModal = new bootstrap.Modal(document.getElementById('readModal'));
        const successModal = new bootstrap.Modal(document.getElementById('successModal'));
        
        // --- 3. FUNCTIONS ---

        // Helper to format date nicely
        function formatDate(dateString) {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(dateString).toLocaleDateString(undefined, options);
        }

        // Save to LocalStorage
        function saveToLocal() {
            localStorage.setItem('churchTestimonies', JSON.stringify(testimonies));
            updateCount();
        }

        // Update the story count badge
        function updateCount() {
            countBadge.innerText = `${testimonies.length} Stories`;
        }

        // Render the list of testimonies
        function renderTestimonies() {
            grid.innerHTML = '';
            
            if (testimonies.length === 0) {
                emptyState.classList.remove('d-none');
            } else {
                emptyState.classList.add('d-none');
                
                // Loop through stories (newest first)
                // We create a reversed copy for rendering without mutating original array order
                [...testimonies].reverse().forEach(t => {
                    
                    // Determine badge color based on category
                    let badgeClass = 'bg-secondary';
                    if(t.category === 'Healing') badgeClass = 'badge-healing';
                    if(t.category === 'Provision') badgeClass = 'badge-provision';
                    if(t.category === 'Family') badgeClass = 'badge-family';
                    if(t.category === 'Salvation') badgeClass = 'badge-salvation';
                    if(t.category === 'Miracle') badgeClass = 'badge-miracle';

                    // Create HTML String
                    const col = document.createElement('div');
                    col.className = 'col-md-6 new-item'; // new-item triggers animation
                    col.innerHTML = `
                        <div class="card testimony-card">
                            <div class="card-body">
                                <div class="d-flex justify-content-between align-items-start mb-3">
                                    <span class="badge rounded-pill ${badgeClass}">${t.category}</span>
                                    <small class="text-muted"><i class="bi bi-calendar-event"></i> ${formatDate(t.date)}</small>
                                </div>
                                <p class="story-preview text-muted">${t.text}</p>
                            </div>
                            <div class="card-footer bg-white border-top-0 pb-3">
                                <div class="d-flex align-items-center justify-content-between">
                                    <div class="d-flex align-items-center">
                                        <div class="bg-light rounded-circle d-flex justify-content-center align-items-center me-2" style="width: 30px; height: 30px; color: #888;">
                                            <i class="bi bi-person-fill"></i>
                                        </div>
                                        <small class="fw-bold text-dark">${t.name}</small>
                                    </div>
                                    <button class="btn btn-sm btn-outline-primary rounded-pill" onclick="openReadModal(${t.id})">
                                        Read Full
                                    </button>
                                </div>
                            </div>
                        </div>
                    `;
                    grid.appendChild(col);
                });
            }
            updateCount();
        }

        // --- 4. EVENT LISTENERS ---

        // Handle Form Submission
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // 1. Gather Data
            const newTestimony = {
                id: Date.now(), // Unique ID based on timestamp
                name: document.getElementById('tName').value,
                category: document.getElementById('tCategory').value,
                text: document.getElementById('tStory').value,
                date: new Date().toISOString()
            };

            // 2. Add to Array
            testimonies.push(newTestimony);

            // 3. Save to Browser Memory
            saveToLocal();

            // 4. Update UI
            renderTestimonies();
            form.reset(); // Clear form
            successModal.show(); // Show thank you popup
        });

        // --- 5. READ MODAL LOGIC ---
        window.openReadModal = (id) => {
            const item = testimonies.find(t => t.id === id);
            if(item) {
                document.getElementById('modalTitle').innerText = item.category + " Testimony";
                document.getElementById('modalCategory').innerText = item.category;
                document.getElementById('modalDate').innerText = "Shared on " + formatDate(item.date);
                document.getElementById('modalBody').innerText = item.text;
                document.getElementById('modalAuthor').innerText = item.name;
                
                // Setup Delete Button
                const deleteBtn = document.getElementById('deleteBtn');
                deleteBtn.onclick = () => {
                    deleteTestimony(id);
                    readModal.hide();
                };

                readModal.show();
            }
        };

        // Delete Function
        function deleteTestimony(id) {
            if(confirm('Are you sure you want to delete this testimony?')) {
                testimonies = testimonies.filter(t => t.id !== id);
                saveToLocal();
                renderTestimonies();
            }
        }

        // --- 6. INITIALIZATION ---
        document.addEventListener('DOMContentLoaded', () => {
            renderTestimonies();
        });