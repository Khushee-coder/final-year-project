// ================ SWAMI HOLIDAY HOME - COMPLETE SCRIPT ================
// ================ (LocalStorage for Admin + Backend API for Bookings) ================

// ==================== BACKEND API CONFIGURATION ====================
const API_BASE_URL = 'http://localhost:5000/api';

// ==================== INITIALIZE DATABASE (LOCALSTORAGE) ====================
function initializeDatabase() {
    if (!localStorage.getItem('prices')) {
        localStorage.setItem('prices', JSON.stringify({ ac: 2500 }));
        localStorage.setItem('acPrice', '2500');
    }
    
    if (!localStorage.getItem('rooms')) {
        const defaultRooms = [
            { number: '101', type: 'ac', status: 'available', guest: null, checkIn: null, checkOut: null },
            { number: '102', type: 'ac', status: 'available', guest: null, checkIn: null, checkOut: null },
            { number: '103', type: 'ac', status: 'available', guest: null, checkIn: null, checkOut: null },
            { number: '104', type: 'ac', status: 'available', guest: null, checkIn: null, checkOut: null }
        ];
        localStorage.setItem('rooms', JSON.stringify(defaultRooms));
    }
    
    if (!localStorage.getItem('bookings')) {
        localStorage.setItem('bookings', JSON.stringify([]));
    }
    
    if (!localStorage.getItem('enquiries')) {
        localStorage.setItem('enquiries', JSON.stringify([]));
    }
    
    if (!localStorage.getItem('vegFoodItems')) {
        const defaultVeg = [
            { name: 'Veg Thali', price: 0, image: 'vegthali.jpg' },
            { name: 'Dal Rice', price: 0, image: 'dal rice.jpg' },
            { name: 'Matar Paneer', price: 0, image: 'Matar-Paneer-1.jpg' },
            { name: 'Dry Sabzi', price: 0, image: 'dry sabzi.jpg' },
            { name: 'Sweet Salad', price: 0, image: 'Dahi-Salad-Recipe.jpg' }
        ];
        localStorage.setItem('vegFoodItems', JSON.stringify(defaultVeg));
    }
    
    if (!localStorage.getItem('nonVegFoodItems')) {
        const defaultNonVeg = [
            { name: 'Fish Curry Rice', price: 0, image: 'fish curry.jpg' },
            { name: 'Chicken Thali', price: 0, image: 'chicken_thali_featured.jpg' },
            { name: 'Prawns Masala', price: 0, image: 'Prawn-Masala-450x450.jpeg' },
            { name: 'Sol Kadhi', price: 0, image: 'sol kadhi.jpg' },
            { name: 'Kokani Special', price: 0, image: 'kokani.jpg' }
        ];
        localStorage.setItem('nonVegFoodItems', JSON.stringify(defaultNonVeg));
    }
    
    if (!localStorage.getItem('facilities')) {
        const defaultFacilities = [
            { name: 'Swimming Pool', icon: 'swimming-pool' },
            { name: 'In-house Restaurant', icon: 'utensils' },
            { name: 'Car Parking', icon: 'parking' },
            { name: 'Free WiFi', icon: 'wifi' },
            { name: 'Air Conditioning', icon: 'snowflake' },
            { name: '24/7 Hot Water', icon: 'hot-tub' }
        ];
        localStorage.setItem('facilities', JSON.stringify(defaultFacilities));
    }
    
    if (!localStorage.getItem('nearbyPlaces')) {
        const defaultNearby = [
            { name: 'Sasawane Beach', distance: '2 min walk', icon: 'umbrella-beach', desc: 'Beautiful beach just 150 meters away' },
            { name: 'Karmarkar Museum', distance: '2 min walk', icon: 'university', desc: 'Famous art and sculpture museum' },
            { name: 'Mandwa Beach', distance: '10 min cab', icon: 'water', desc: 'Ferry terminal to Mumbai' },
            { name: 'Kihim Beach', distance: '15 min cab', icon: 'water', desc: 'Scenic beach with forest backdrop' },
            { name: 'Varsoli Beach', distance: '25 min cab', icon: 'water', desc: 'Peaceful and less crowded' },
            { name: 'Alibaug Fort', distance: '25 min cab', icon: 'fort-awesome', desc: 'Historic sea fort' },
            { name: 'Kankeshwar Temple', distance: '15 min climb', icon: 'hindu', desc: 'Hilltop temple with scenic views' }
        ];
        localStorage.setItem('nearbyPlaces', JSON.stringify(defaultNearby));
    }
    
    if (!localStorage.getItem('games')) {
        const defaultGames = [
            { name: 'Carrom', icon: 'chess-board', players: '2-4 Players' },
            { name: 'Chess', icon: 'chess', players: '2 Players' },
            { name: 'Bat & Ball', icon: 'baseball-ball', players: 'Outdoor' }
        ];
        localStorage.setItem('games', JSON.stringify(defaultGames));
    }
    
    console.log("✅ Database initialized");
}

// ==================== UPDATE ROOM PRICES ====================
function updateAllRoomPrices() {
    let acPrice = localStorage.getItem('acPrice');
    
    if (!acPrice) {
        const prices = JSON.parse(localStorage.getItem('prices')) || { ac: 2500 };
        acPrice = prices.ac;
        localStorage.setItem('acPrice', acPrice);
    }
    
    const homePrice = document.getElementById('homeAcPrice');
    if (homePrice) homePrice.innerHTML = `₹${acPrice} <span>/person</span>`;
    
    const heroPrice = document.getElementById('heroPrice');
    if (heroPrice) heroPrice.textContent = `₹${acPrice}`;
    
    const statPrice = document.getElementById('statPrice');
    if (statPrice) statPrice.textContent = `₹${(acPrice/1000).toFixed(1)}k`;
    
    const roomPrices = document.querySelectorAll('.room-price');
    roomPrices.forEach(priceElement => {
        priceElement.innerHTML = `₹${acPrice} <span>/person</span>`;
    });
    
    const modalRoomType = document.getElementById('modalRoomType');
    if (modalRoomType) {
        modalRoomType.innerHTML = `
            <option value="ac">AC Room - ₹${acPrice}/person</option>
            <option value="pet">Pet Friendly Room - ₹${acPrice}/person</option>
        `;
    }
    
    console.log("Prices updated to: ₹" + acPrice);
}

// ==================== LOAD FUNCTIONS ====================

// ==================== LOAD FOOD ITEMS FROM DATABASE ====================

async function loadFoodItems() {
    console.log("Loading food items from database...");
    
    try {
        const response = await fetch('http://localhost:5000/api/food-items');
        const data = await response.json();
        
        if (data.success) {
            const allVeg = data.veg || [];
            const allNonVeg = data.nonVeg || [];
            
            // Remove duplicates by name
            const uniqueVeg = [];
            const seenVeg = new Set();
            for (const item of allVeg) {
                if (!seenVeg.has(item.name)) {
                    seenVeg.add(item.name);
                    uniqueVeg.push(item);
                }
            }
            
            const uniqueNonVeg = [];
            const seenNonVeg = new Set();
            for (const item of allNonVeg) {
                if (!seenNonVeg.has(item.name)) {
                    seenNonVeg.add(item.name);
                    uniqueNonVeg.push(item);
                }
            }
            
            // Display veg items (price = 0 are free)
            const vegContainer = document.getElementById('vegFoodGrid');
            if (vegContainer) {
                const freeVeg = uniqueVeg.filter(item => item.price === 0);
                if (freeVeg.length === 0) {
                    vegContainer.innerHTML = '<p style="text-align:center; padding:20px;">No vegetarian items added yet.</p>';
                } else {
                    vegContainer.innerHTML = freeVeg.map(item => {
                        let imageUrl = item.image_url || '';
                        if (imageUrl && !imageUrl.startsWith('http') && !imageUrl.startsWith('/images/')) {
                            imageUrl = '/images/' + imageUrl;
                        }
                        if (!imageUrl) {
                            imageUrl = 'https://placehold.co/300x200?text=' + encodeURIComponent(item.name);
                        }
                        return `
                            <div class="food-card">
                                <div class="food-image" style="background-image: url('${imageUrl}'); background-size: cover; background-position: center; width: 80px; height: 80px; border-radius: 12px;"></div>
                                <div class="food-info">
                                    <div class="food-name">${escapeHtml(item.name)}</div>
                                    <div class="food-desc">${escapeHtml(item.description || 'Delicious meal included in your package')}</div>
                                    <div class="food-price">Included in Package</div>
                                </div>
                            </div>
                        `;
                    }).join('');
                }
            }
            
            // Display non-veg items (price = 0 are free)
            const nonVegContainer = document.getElementById('nonVegFoodGrid');
            if (nonVegContainer) {
                const freeNonVeg = uniqueNonVeg.filter(item => item.price === 0);
                if (freeNonVeg.length === 0) {
                    nonVegContainer.innerHTML = '<p style="text-align:center; padding:20px;">No non-vegetarian items added yet.</p>';
                } else {
                    nonVegContainer.innerHTML = freeNonVeg.map(item => {
                        let imageUrl = item.image_url || '';
                        if (imageUrl && !imageUrl.startsWith('http') && !imageUrl.startsWith('/images/')) {
                            imageUrl = '/images/' + imageUrl;
                        }
                        if (!imageUrl) {
                            imageUrl = 'https://placehold.co/300x200?text=' + encodeURIComponent(item.name);
                        }
                        return `
                            <div class="food-card">
                                <div class="food-image" style="background-image: url('${imageUrl}'); background-size: cover; background-position: center; width: 80px; height: 80px; border-radius: 12px;"></div>
                                <div class="food-info">
                                    <div class="food-name">${escapeHtml(item.name)}</div>
                                    <div class="food-desc">${escapeHtml(item.description || 'Delicious meal included in your package')}</div>
                                    <div class="food-price">Included in Package</div>
                                </div>
                            </div>
                        `;
                    }).join('');
                }
            }
        }
    } catch (error) {
        console.error('Error loading food items:', error);
        loadFoodItemsFromLocal();
    }
}

// ==================== FALLBACK TO LOCALSTORAGE ====================

function loadFoodItemsFromLocal() {
    console.log("Loading food items from localStorage (fallback)...");
    
    // Load Veg Items
    const vegItems = JSON.parse(localStorage.getItem('vegFoodItems')) || [];
    const vegContainer = document.getElementById('vegFoodGrid');
    
    if (vegContainer) {
        if (vegItems.length === 0) {
            vegContainer.innerHTML = '<p style="text-align:center; padding:20px;">No vegetarian items added yet.</p>';
        } else {
            vegContainer.innerHTML = vegItems.map(item => {
                let imageUrl = item.image;
                if (imageUrl && !imageUrl.startsWith('http') && !imageUrl.startsWith('https') && !imageUrl.startsWith('data:')) {
                    imageUrl = 'images/' + imageUrl;
                }
                if (!imageUrl || imageUrl === '') {
                    imageUrl = 'https://placehold.co/300x200?text=' + encodeURIComponent(item.name);
                }
                return `
                    <div class="food-card">
                        <div class="food-image" style="background-image: url('${imageUrl}'); background-size: cover; background-position: center; width: 80px; height: 80px; border-radius: 12px;"></div>
                        <div class="food-info">
                            <div class="food-name">${escapeHtml(item.name)}</div>
                            <div class="food-desc">Delicious meal included in your package</div>
                            <div class="food-price">Included in Package</div>
                        </div>
                    </div>
                `;
            }).join('');
        }
    }
    
    // Load Non-Veg Items
    const nonVegItems = JSON.parse(localStorage.getItem('nonVegFoodItems')) || [];
    const nonVegContainer = document.getElementById('nonVegFoodGrid');
    
    if (nonVegContainer) {
        if (nonVegItems.length === 0) {
            nonVegContainer.innerHTML = '<p style="text-align:center; padding:20px;">No non-vegetarian items added yet.</p>';
        } else {
            nonVegContainer.innerHTML = nonVegItems.map(item => {
                let imageUrl = item.image;
                if (imageUrl && !imageUrl.startsWith('http') && !imageUrl.startsWith('https') && !imageUrl.startsWith('data:')) {
                    imageUrl = 'images/' + imageUrl;
                }
                if (!imageUrl || imageUrl === '') {
                    imageUrl = 'https://placehold.co/300x200?text=' + encodeURIComponent(item.name);
                }
                return `
                    <div class="food-card">
                        <div class="food-image" style="background-image: url('${imageUrl}'); background-size: cover; background-position: center; width: 80px; height: 80px; border-radius: 12px;"></div>
                        <div class="food-info">
                            <div class="food-name">${escapeHtml(item.name)}</div>
                            <div class="food-desc">Delicious meal included in your package</div>
                            <div class="food-price">Included in Package</div>
                        </div>
                    </div>
                `;
            }).join('');
        }
    }
}

// ==================== HELPER FUNCTION ====================

function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function loadGames() {
    const games = JSON.parse(localStorage.getItem('games')) || [];
    const container = document.getElementById('gamesGrid');
    if (!container) return;
    
    container.innerHTML = games.map(g => `
        <div class="game-card">
            <i class="fas fa-${g.icon}"></i>
            <h3>${g.name}</h3>
            <p>${g.players}</p>
        </div>
    `).join('');
}

function loadNearbyPlaces() {
    const places = JSON.parse(localStorage.getItem('nearbyPlaces')) || [];
    const container = document.getElementById('nearbyGrid');
    if (!container) return;
    
    container.innerHTML = places.map(p => `
        <div class="nearby-card">
            <div class="nearby-content">
                <div class="nearby-header">
                    <h3>${p.name}</h3>
                    <span class="distance-badge"><i class="fas fa-clock"></i> ${p.distance}</span>
                </div>
                <p>${p.desc}</p>
                <div class="nearby-tags">
                    <span class="tag">${p.name.includes('Beach') ? 'Beach' : p.name.includes('Museum') ? 'Museum' : 'Attraction'}</span>
                </div>
            </div>
        </div>
    `).join('');
}

function loadRoomAvailability() {
    const rooms = JSON.parse(localStorage.getItem('rooms')) || [];
    const container = document.getElementById('availabilityGrid');
    if (!container) return;
    
    let html = '';
    rooms.forEach(room => {
        const isAvailable = room.status === 'available';
        const statusColor = isAvailable ? '#4caf50' : '#f44336';
        const statusText = isAvailable ? '✓ Available' : '✗ Occupied';
        html += `
            <div class="availability-card">
                <div class="room-num">Room ${room.number}</div>
                <div class="room-type">AC Room</div>
                <div class="status" style="color: ${statusColor}; font-weight: 600;">
                    ${statusText}
                </div>
                ${room.guest ? `<div style="font-size: 0.8rem; margin-top: 5px;">Guest: ${room.guest}</div>` : ''}
            </div>
        `;
    });
    container.innerHTML = html;
}

function loadFacilities() {
    const facilities = JSON.parse(localStorage.getItem('facilities')) || [];
    const container = document.getElementById('propertyAmenities');
    if (!container) return;
    
    container.innerHTML = facilities.map(f => `
        <div class="facility-card">
            <i class="fas fa-${f.icon}"></i>
            <h3>${f.name}</h3>
        </div>
    `).join('');
}

// ==================== BOOKING MODAL FUNCTIONS ====================

let currentStep = 1;
let currentUPIAmount = 0;
let selectedDates = { checkIn: null, checkOut: null };

function openBookingModal(roomType = 'ac') {
    console.log("Opening booking modal");
    const modal = document.getElementById('bookingModal');
    if (modal) {
        modal.style.display = 'flex';
    } else {
        console.error("Booking modal not found");
        return;
    }
    
    const step2 = document.getElementById('step2');
    const step1 = document.getElementById('step1');
    const step2Progress = document.getElementById('step2Progress');
    const step1Progress = document.getElementById('step1Progress');
    
    if (step2) step2.style.display = 'none';
    if (step1) step1.style.display = 'block';
    if (step2Progress) step2Progress.classList.remove('active');
    if (step1Progress) step1Progress.classList.add('active');
    
    const today = new Date().toISOString().split('T')[0];
    const checkInInput = document.getElementById('modalCheckIn');
    const checkOutInput = document.getElementById('modalCheckOut');
    
    if (checkInInput) {
        checkInInput.min = today;
        checkInInput.value = '';
    }
    if (checkOutInput) {
        checkOutInput.min = today;
        checkOutInput.value = '';
    }
    
    const guestName = document.getElementById('guestName');
    const guestPhone = document.getElementById('guestPhone');
    const guestEmail = document.getElementById('guestEmail');
    const specialRequests = document.getElementById('specialRequests');
    
    if (guestName) guestName.value = '';
    if (guestPhone) guestPhone.value = '';
    if (guestEmail) guestEmail.value = '';
    if (specialRequests) specialRequests.value = '';
    
    document.querySelectorAll('.error-message').forEach(el => {
        if (el) el.innerHTML = '';
    });
    
    updateSummary();
}

function closeBookingModal() {
    const modal = document.getElementById('bookingModal');
    if (modal) {
        modal.style.display = 'none';
    }
    
    const step2 = document.getElementById('step2');
    const step1 = document.getElementById('step1');
    const step2Progress = document.getElementById('step2Progress');
    const step1Progress = document.getElementById('step1Progress');
    
    if (step2) step2.style.display = 'none';
    if (step1) step1.style.display = 'block';
    if (step2Progress) step2Progress.classList.remove('active');
    if (step1Progress) step1Progress.classList.add('active');
    
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) bookingForm.reset();
    
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(el => {
        if (el) el.innerHTML = '';
    });
    
    const upiSection = document.getElementById('upiSection');
    if (upiSection) upiSection.style.display = 'none';
}

function updateSummary() {
    const roomType = document.getElementById('modalRoomType')?.value;
    const numRooms = parseInt(document.getElementById('modalNumRooms')?.value || '1');
    const guests = parseInt(document.getElementById('modalGuests')?.value || '2');
    const checkIn = document.getElementById('modalCheckIn')?.value;
    const checkOut = document.getElementById('modalCheckOut')?.value;
    
    let pricePerPerson = parseInt(localStorage.getItem('acPrice')) || 2500;
    
    let nights = 1;
    if (checkIn && checkOut) {
        const start = new Date(checkIn);
        const end = new Date(checkOut);
        nights = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));
    }
    
    const total = pricePerPerson * guests * nights * numRooms;
    
    const summaryRoom = document.getElementById('summaryRoom');
    const summaryRooms = document.getElementById('summaryRooms');
    const summaryGuests = document.getElementById('summaryGuests');
    const summaryDates = document.getElementById('summaryDates');
    const summaryNights = document.getElementById('summaryNights');
    const summaryTotal = document.getElementById('summaryTotal');
    
    if (summaryRoom) summaryRoom.textContent = roomType === 'ac' ? 'AC Room' : 'Pet Friendly Room';
    if (summaryRooms) summaryRooms.textContent = numRooms;
    if (summaryGuests) summaryGuests.textContent = guests;
    if (summaryDates) summaryDates.textContent = checkIn && checkOut ? `${checkIn} to ${checkOut}` : 'Not selected';
    if (summaryNights) summaryNights.textContent = nights;
    if (summaryTotal) summaryTotal.textContent = total;
}

// ==================== VALIDATION & NAVIGATION FUNCTIONS ====================

function validateAndGoToPayment() {
    console.log("Validating form...");
    
    const checkInError = document.getElementById('checkInError');
    const checkOutError = document.getElementById('checkOutError');
    const guestNameError = document.getElementById('guestNameError');
    const guestPhoneError = document.getElementById('guestPhoneError');
    const guestEmailError = document.getElementById('guestEmailError');
    
    if (checkInError) checkInError.innerHTML = '';
    if (checkOutError) checkOutError.innerHTML = '';
    if (guestNameError) guestNameError.innerHTML = '';
    if (guestPhoneError) guestPhoneError.innerHTML = '';
    if (guestEmailError) guestEmailError.innerHTML = '';
    
    const checkIn = document.getElementById('modalCheckIn')?.value || '';
    const checkOut = document.getElementById('modalCheckOut')?.value || '';
    const guestName = document.getElementById('guestName')?.value?.trim() || '';
    const guestPhone = document.getElementById('guestPhone')?.value?.trim() || '';
    const guestEmail = document.getElementById('guestEmail')?.value?.trim() || '';
    
    let isValid = true;
    
    if (!checkIn) {
        if (checkInError) checkInError.innerHTML = 'Please select check-in date';
        isValid = false;
    } else {
        const checkInDate = new Date(checkIn);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (checkInDate < today) {
            if (checkInError) checkInError.innerHTML = 'Check-in date cannot be in the past';
            isValid = false;
        }
    }
    
    if (!checkOut) {
        if (checkOutError) checkOutError.innerHTML = 'Please select check-out date';
        isValid = false;
    } else if (checkIn && checkOut) {
        const checkInDateObj = new Date(checkIn);
        const checkOutDateObj = new Date(checkOut);
        checkInDateObj.setHours(0, 0, 0, 0);
        checkOutDateObj.setHours(0, 0, 0, 0);
        
        if (checkOutDateObj <= checkInDateObj) {
            if (checkOutError) checkOutError.innerHTML = 'Check-out date must be AFTER check-in date';
            isValid = false;
        }
    }
    
    if (!guestName) {
        if (guestNameError) guestNameError.innerHTML = 'Please enter your full name';
        isValid = false;
    } else if (guestName.length < 3) {
        if (guestNameError) guestNameError.innerHTML = 'Name must be at least 3 characters';
        isValid = false;
    } else if (!/^[A-Za-z\s]+$/.test(guestName)) {
        if (guestNameError) guestNameError.innerHTML = 'Name should only contain letters and spaces';
        isValid = false;
    }
    
    if (!guestPhone) {
        if (guestPhoneError) guestPhoneError.innerHTML = 'Please enter phone number';
        isValid = false;
    } else if (!/^[6-9]\d{9}$/.test(guestPhone)) {
        if (guestPhoneError) guestPhoneError.innerHTML = 'Mobile number must start with 6,7,8 or 9 and be 10 digits';
        isValid = false;
    }
    
    if (!guestEmail) {
        if (guestEmailError) guestEmailError.innerHTML = 'Please enter email address';
        isValid = false;
    } else {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(guestEmail)) {
            if (guestEmailError) guestEmailError.innerHTML = 'Enter a valid email (e.g., name@gmail.com)';
            isValid = false;
        }
    }
    
    console.log("Validation result:", isValid);
    
    if (isValid) {
        console.log("Form valid, proceeding to payment...");
        goToPayment();
    } else {
        const firstError = document.querySelector('.error-message:not(:empty)');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
}

function goToPayment() {
    const summaryRoom = document.getElementById('summaryRoom');
    const summaryRooms = document.getElementById('summaryRooms');
    const summaryGuests = document.getElementById('summaryGuests');
    const summaryDates = document.getElementById('summaryDates');
    const summaryNights = document.getElementById('summaryNights');
    const summaryTotal = document.getElementById('summaryTotal');
    
    const summaryRoom2 = document.getElementById('summaryRoom2');
    const summaryRooms2 = document.getElementById('summaryRooms2');
    const summaryGuests2 = document.getElementById('summaryGuests2');
    const summaryDates2 = document.getElementById('summaryDates2');
    const summaryNights2 = document.getElementById('summaryNights2');
    const summaryTotal2 = document.getElementById('summaryTotal2');
    
    if (summaryRoom2 && summaryRoom) summaryRoom2.innerText = summaryRoom.innerText;
    if (summaryRooms2 && summaryRooms) summaryRooms2.innerText = summaryRooms.innerText;
    if (summaryGuests2 && summaryGuests) summaryGuests2.innerText = summaryGuests.innerText;
    if (summaryDates2 && summaryDates) summaryDates2.innerText = summaryDates.innerText;
    if (summaryNights2 && summaryNights) summaryNights2.innerText = summaryNights.innerText;
    if (summaryTotal2 && summaryTotal) summaryTotal2.innerText = summaryTotal.innerText;
    
    const step1 = document.getElementById('step1');
    const step2 = document.getElementById('step2');
    const step1Progress = document.getElementById('step1Progress');
    const step2Progress = document.getElementById('step2Progress');
    
    if (step1) step1.style.display = 'none';
    if (step2) step2.style.display = 'block';
    if (step1Progress) step1Progress.classList.remove('active');
    if (step2Progress) step2Progress.classList.add('active');
}

function goBackToDetails() {
    const step2 = document.getElementById('step2');
    const step1 = document.getElementById('step1');
    const step2Progress = document.getElementById('step2Progress');
    const step1Progress = document.getElementById('step1Progress');
    
    if (step2) step2.style.display = 'none';
    if (step1) step1.style.display = 'block';
    if (step2Progress) step2Progress.classList.remove('active');
    if (step1Progress) step1Progress.classList.add('active');
}

// ==================== PAYMENT FUNCTIONS ====================

function getBookingDataFromForm() {
    return {
        id: 'SHH' + Date.now(),
        roomType: document.getElementById('modalRoomType')?.value || 'ac',
        numRooms: document.getElementById('modalNumRooms')?.value || '1',
        guests: document.getElementById('modalGuests')?.value || '2',
        checkIn: document.getElementById('modalCheckIn')?.value || '',
        checkOut: document.getElementById('modalCheckOut')?.value || '',
        guestName: document.getElementById('guestName')?.value || '',
        guestPhone: document.getElementById('guestPhone')?.value || '',
        guestEmail: document.getElementById('guestEmail')?.value || '',
        pet: document.getElementById('guestPet')?.value || 'no',
        specialRequests: document.getElementById('specialRequests')?.value || '',
        total: document.getElementById('summaryTotal')?.innerText || '0'
    };
}

function saveBookingToLocalStorage(bookingData, paymentMethod) {
    const booking = {
        id: bookingData.id,
        roomType: bookingData.roomType,
        numRooms: parseInt(bookingData.numRooms),
        guests: bookingData.guests,
        checkIn: bookingData.checkIn,
        checkOut: bookingData.checkOut,
        guestName: bookingData.guestName,
        guestPhone: bookingData.guestPhone,
        guestEmail: bookingData.guestEmail,
        pet: bookingData.pet,
        specialRequests: bookingData.specialRequests,
        total: bookingData.total,
        paymentMethod: paymentMethod,
        bookingDate: new Date().toISOString()
    };
    
    let bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    bookings.push(booking);
    localStorage.setItem('bookings', JSON.stringify(bookings));
    
    let rooms = JSON.parse(localStorage.getItem('rooms')) || [];
    let bookedCount = 0;
    let numRoomsToBook = parseInt(bookingData.numRooms);
    
    for (let i = 0; i < rooms.length && bookedCount < numRoomsToBook; i++) {
        if (rooms[i].status === 'available') {
            rooms[i].status = 'occupied';
            rooms[i].guest = bookingData.guestName;
            rooms[i].checkIn = bookingData.checkIn;
            rooms[i].checkOut = bookingData.checkOut;
            bookedCount++;
            console.log(`Room ${rooms[i].number} booked`);
        }
    }
    localStorage.setItem('rooms', JSON.stringify(rooms));
    
    if (typeof loadRooms === 'function') {
        loadRooms();
    }
    if (typeof loadRoomAvailability === 'function') {
        loadRoomAvailability();
    }
}

async function sendBookingToBackend(bookingData, paymentMethod) {
    try {
        let rooms = JSON.parse(localStorage.getItem('rooms')) || [];
        let availableRoom = rooms.find(r => r.status === 'available');
        let roomId = availableRoom ? parseInt(availableRoom.number) - 100 : 1;
        
        const response = await fetch(`${API_BASE_URL}/bookings/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                room_id: roomId,
                guest_name: bookingData.guestName,
                guest_phone: bookingData.guestPhone,
                guest_email: bookingData.guestEmail,
                guests: parseInt(bookingData.guests),
                check_in: bookingData.checkIn,
                check_out: bookingData.checkOut,
                total_amount: parseInt(bookingData.total)
            })
        });
        const result = await response.json();
        console.log('Backend booking result:', result);
    } catch (error) {
        console.error('Backend booking failed:', error);
    }
}

async function initiateRazorpayPayment() {
    const totalAmount = document.getElementById('summaryTotal2')?.innerText || document.getElementById('summaryTotal')?.innerText;
    const bookingData = getBookingDataFromForm();
    
    if (!bookingData.checkIn || !bookingData.checkOut) {
        alert('Please select check-in and check-out dates');
        return;
    }
    if (!bookingData.guestName || !bookingData.guestPhone || !bookingData.guestEmail) {
        alert('Please fill all guest details');
        return;
    }
    
    try {
        const bookingResponse = await fetch(`${API_BASE_URL}/bookings/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                room_id: 1,
                guest_name: bookingData.guestName,
                guest_phone: bookingData.guestPhone,
                guest_email: bookingData.guestEmail,
                guests: parseInt(bookingData.guests),
                check_in: bookingData.checkIn,
                check_out: bookingData.checkOut,
                total_amount: parseInt(totalAmount)
            })
        });
        
        const bookingResult = await bookingResponse.json();
        
        if (!bookingResult.success) {
            alert('Failed to create booking: ' + bookingResult.message);
            return;
        }
        
        const bookingId = bookingResult.booking_id;
        
        const orderResponse = await fetch(`${API_BASE_URL}/payments/create-order`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ booking_id: bookingId, amount: totalAmount })
        });
        
        const order = await orderResponse.json();
        
        if (!order.success) {
            alert('Failed to create payment order: ' + order.message);
            return;
        }
        
        const options = {
            key: order.key_id,
            amount: order.amount,
            currency: order.currency,
            order_id: order.order_id,
            name: 'Swami Holiday Home',
            description: `Booking ID: ${bookingId}`,
            prefill: {
                name: bookingData.guestName,
                email: bookingData.guestEmail,
                contact: bookingData.guestPhone
            },
            theme: { color: '#ff8a7a' },
            handler: async (response) => {
                const verifyResponse = await fetch(`${API_BASE_URL}/payments/verify`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                        booking_id: bookingId
                    })
                });
                const result = await verifyResponse.json();
                
                if (result.success) {
                    alert('✅ Payment Successful! Booking Confirmed!');
                    closeBookingModal();
                } else {
                    alert('Payment verification failed');
                }
            }
        };
        
        const razorpay = new Razorpay(options);
        razorpay.open();
        
    } catch (error) {
        console.error('Payment error:', error);
        alert('Payment initiation failed');
    }
}

// ==================== REAL-TIME INPUT VALIDATION ====================

function setupInputValidations() {
    const nameInput = document.getElementById('guestName');
    if (nameInput) {
        nameInput.addEventListener('input', function(e) {
            this.value = this.value.replace(/[^A-Za-z\s]/g, '');
            const errorEl = document.getElementById('guestNameError');
            if (errorEl) errorEl.innerHTML = '';
        });
    }
    
    const phoneInput = document.getElementById('guestPhone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            this.value = this.value.replace(/[^0-9]/g, '').slice(0, 10);
            
            if (this.value.length > 0 && !/^[6-9]/.test(this.value[0])) {
                const errorEl = document.getElementById('guestPhoneError');
                if (errorEl) errorEl.innerHTML = 'Mobile number must start with 6,7,8 or 9';
            } else {
                const errorEl = document.getElementById('guestPhoneError');
                if (errorEl) errorEl.innerHTML = '';
            }
        });
    }
    
    const emailInput = document.getElementById('guestEmail');
    if (emailInput) {
        emailInput.addEventListener('input', function(e) {
            const email = this.value.trim();
            const errorEl = document.getElementById('guestEmailError');
            if (errorEl) {
                if (email && !/^[^\s@]+@([^\s@]+\.)+[^\s@]+$/.test(email)) {
                    errorEl.innerHTML = 'Enter a valid email';
                } else {
                    errorEl.innerHTML = '';
                }
            }
        });
    }
    
    const checkInDate = document.getElementById('modalCheckIn');
    const checkOutDate = document.getElementById('modalCheckOut');
    
    if (checkInDate) {
        checkInDate.addEventListener('change', function() {
            const errorEl = document.getElementById('checkInError');
            if (errorEl) errorEl.innerHTML = '';
            
            if (checkOutDate && this.value) {
                const nextDay = new Date(this.value);
                nextDay.setDate(nextDay.getDate() + 1);
                checkOutDate.min = nextDay.toISOString().split('T')[0];
            }
            updateSummary();
        });
    }
    
    if (checkOutDate) {
        checkOutDate.addEventListener('change', function() {
            const errorEl = document.getElementById('checkOutError');
            if (errorEl) errorEl.innerHTML = '';
            updateSummary();
        });
    }
}

// ==================== ADMIN FUNCTIONS ====================

function loadPrices() {
    const prices = JSON.parse(localStorage.getItem('prices')) || { ac: 2500 };
    const priceInput = document.getElementById('acPrice');
    if (priceInput) priceInput.value = prices.ac;
    localStorage.setItem('acPrice', prices.ac);
}

async function loadPricesFromBackend() {
    try {
        const response = await fetch(`${API_BASE_URL}/settings`);
        const data = await response.json();
        if (data.success && data.settings && data.settings.ac_price) {
            const backendPrice = data.settings.ac_price;
            const localPrice = localStorage.getItem('acPrice');
            
            // If backend has different price, update localStorage
            if (localPrice != backendPrice && backendPrice > 0) {
                localStorage.setItem('prices', JSON.stringify({ ac: backendPrice }));
                localStorage.setItem('acPrice', backendPrice);
                updateAllRoomPrices();
                console.log('Prices synced from backend:', backendPrice);
            }
        }
    } catch (error) {
        console.log('Backend not available, using localStorage only');
    }
}

async function updateRoomStatus(roomId, status, guestName) {
    let rooms = JSON.parse(localStorage.getItem('rooms')) || [];
    const room = rooms.find(r => r.id === roomId || r.number == roomId);
    if (room) {
        room.status = status;
        room.guest = guestName;
        localStorage.setItem('rooms', JSON.stringify(rooms));
    }
    
    try {
        await fetch(`${API_BASE_URL}/rooms/${roomId}/status`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: status, guest: guestName })
        });
    } catch (error) {
        console.error('Failed to sync room status to backend');
    }
    
    loadRooms();
    loadRoomAvailability();
}

// ==================== INITIALIZATION ====================

document.addEventListener('DOMContentLoaded', function() {
    console.log("Initializing Swami Holiday Home...");
    
    initializeDatabase();
    loadRoomAvailability();
    loadFacilities();
    loadFoodItems();
    loadGames();
    loadNearbyPlaces();
    loadRooms();
    loadPrices();
    updateAllRoomPrices();
    loadPricesFromBackend().catch(() => {
        console.log('Backend sync skipped, using localStorage price');
    });
    
    setupInputValidations();
    
    const today = new Date().toISOString().split('T')[0];
    const checkInInput = document.getElementById('modalCheckIn');
    const checkOutInput = document.getElementById('modalCheckOut');
    if (checkInInput) checkInInput.min = today;
    if (checkOutInput) checkOutInput.min = today;
    
    const roomType = document.getElementById('modalRoomType');
    const numRooms = document.getElementById('modalNumRooms');
    const guests = document.getElementById('modalGuests');
    const checkIn = document.getElementById('modalCheckIn');
    const checkOut = document.getElementById('modalCheckOut');
    
    if (roomType) roomType.addEventListener('change', updateSummary);
    if (numRooms) numRooms.addEventListener('change', updateSummary);
    if (guests) guests.addEventListener('change', updateSummary);
    if (checkIn) checkIn.addEventListener('change', updateSummary);
    if (checkOut) checkOut.addEventListener('change', updateSummary);
    
    const facebookLink = document.getElementById('facebookLink');
    if (facebookLink) {
        facebookLink.href = 'https://www.facebook.com/search/top?q=Swami%20Holiday%20Home%20Alibag';
    }
    
    console.log("✅ Initialization complete");
    setupInputRestrictions();
    // ==================== MISSING FUNCTIONS ====================

function setupInputRestrictions() {
    const nameInput = document.getElementById('guestName');
    const phoneInput = document.getElementById('guestPhone');
    
    if (nameInput) {
        nameInput.addEventListener('input', function() {
            this.value = this.value.replace(/[^A-Za-z\s]/g, '');
        });
    }
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            this.value = this.value.replace(/[^0-9]/g, '').slice(0, 10);
        });
    }
}

function loadRoomAvailability() {
    const rooms = JSON.parse(localStorage.getItem('rooms')) || [];
    const container = document.getElementById('availabilityGrid');
    if (!container) return;
    
    container.innerHTML = rooms.map(room => `
        <div class="availability-card">
            <div class="room-num">Room ${room.number}</div>
            <div class="room-type">AC Room</div>
            <div class="status" style="color: ${room.status === 'available' ? '#4caf50' : '#f44336'}">
                ${room.status === 'available' ? '✓ Available' : '✗ Occupied'}
            </div>
        </div>
    `).join('');
}

function loadFacilities() {
    const facilities = JSON.parse(localStorage.getItem('facilities')) || [];
    const container = document.getElementById('propertyAmenities');
    if (!container) return;
    
    container.innerHTML = facilities.map(f => `
        <div class="facility-card">
            <i class="fas fa-${f.icon}"></i>
            <h3>${f.name}</h3>
        </div>
    `).join('');
}
});

// ==================== WHATSAPP FUNCTION ====================
const WHATSAPP_NUMBER = "918237141702";

function openWhatsApp() {
    const message = "Hello! I have a question about Swami Holiday Home.";
    const encodedMessage = encodeURIComponent(message);
    const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    window.open(waLink, '_blank');
}

// ==================== NEARBY ATTRACTIONS MODAL ====================

const attractionsData = {
    "Sasawane Beach": {
        distance: "150 m from property (2 min walk)",
        description: "A pristine, less-crowded beach perfect for sunset walks.",
        practical: "⏰ Open 24/7 | 💰 Free",
        tip: "Best time is 5:00 PM - 6:30 PM for sunset.",
        tags: ["Beach", "Sunset", "Walking Distance"]
    },
    "Karmarkar Museum": {
        distance: "3 km from property",
        description: "A hidden gem showcasing the works of renowned sculptor Nanasaheb Karmarkar.",
        practical: "⏰ Open: 10:00 AM - 5:30 PM (Closed Mondays) | 💰 Entry: ₹10",
        tip: "Ask the caretaker for the backstory behind each sculpture.",
        tags: ["Museum", "Art", "Culture"]
    },
    "Mandwa Beach": {
        distance: "20 km from property",
        description: "A beautiful and clean beach, easily accessible from Mumbai by ferry.",
        practical: "⏰ Ferry from Mumbai: 6 AM - 7 PM | 💰 Ferry: ~₹150-₹300",
        tip: "Take the early morning ferry from Gateway of India.",
        tags: ["Beach", "Ferry Access", "Water Sports"]
    },
    "Kihim Beach": {
        distance: "12 km from property",
        description: "A serene coastal haven known for its dense coconut trees.",
        practical: "⏰ Open 24/7 | 💰 Free",
        tip: "Visit early morning for birdwatching.",
        tags: ["Beach", "Birdwatching", "Family Friendly"]
    },
    "Varsoli Beach": {
        distance: "2 km from property",
        description: "A lively beach known for water sports and seafood shacks.",
        practical: "⏰ Open 24/7 | 💰 Free | 🚤 Water sports: ₹300-1000",
        tip: "Visit Sanman Restaurant for authentic Malvani seafood.",
        tags: ["Beach", "Water Sports", "Seafood"]
    },
    "Alibaug Fort & Beach": {
        distance: "3.5 km from property",
        description: "A 17th-century sea fort built by Shivaji Maharaj.",
        practical: "⏰ Open: 6:00 AM - 6:00 PM | 💰 Free",
        tip: "Check tide timings before visiting.",
        tags: ["Fort", "Beach", "Historical"]
    },
    "Kankeshwar Temple": {
        distance: "4 km from property",
        description: "A serene hilltop temple dedicated to Lord Shiva.",
        practical: "⏰ Open: 5:00 AM - 9:00 PM | 💰 Free",
        tip: "Visit early morning (before 7 AM) to avoid crowds.",
        tags: ["Temple", "Viewpoint", "Hilltop"]
    }
};

function openAttraction(name) {
    const data = attractionsData[name];
    if (!data) {
        alert("Details for " + name + " will be added soon!");
        return;
    }
    
    const modal = document.getElementById('attractionModal');
    if (!modal) return;
    
    document.getElementById('modalTitle').textContent = name;
    document.getElementById('modalDistance').textContent = data.distance;
    document.getElementById('modalDescription').textContent = data.description;
    document.getElementById('modalPractical').textContent = data.practical;
    document.getElementById('modalTip').textContent = data.tip;
    
    const tagsContainer = document.getElementById('modalTags');
    if (tagsContainer) {
        tagsContainer.innerHTML = '';
        data.tags.forEach(tag => {
            const tagSpan = document.createElement('span');
            tagSpan.className = 'modal-tag';
            tagSpan.style.background = '#f0f0f0';
            tagSpan.style.padding = '4px 12px';
            tagSpan.style.borderRadius = '20px';
            tagSpan.style.marginRight = '8px';
            tagSpan.style.fontSize = '0.8rem';
            tagSpan.textContent = tag;
            tagsContainer.appendChild(tagSpan);
        });
    }
    
    modal.style.display = 'flex';
}

function closeModal() {
    const modal = document.getElementById('attractionModal');
    if (modal) modal.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('attractionModal');
    if (modal) {
        const closeBtn = document.querySelector('#attractionModal .close-modal');
        if (closeBtn) closeBtn.onclick = closeModal;
        window.onclick = function(event) {
            if (event.target === modal) closeModal();
        };
    }
});

// ==================== GALLERY CAROUSEL ====================
document.addEventListener('DOMContentLoaded', function() {
    const carouselSlide = document.getElementById('carouselSlide');
    if (!carouselSlide) return;
    
    const items = document.querySelectorAll('.carousel-item');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.carousel-container .prev-btn');
    const nextBtn = document.querySelector('.carousel-container .next-btn');
    
    let currentIndex = 0;
    const totalItems = items.length;
    
    function updateCarousel() {
        const offset = -currentIndex * 100;
        carouselSlide.style.transform = `translateX(${offset}%)`;
        dots.forEach((dot, index) => {
            dot.classList.toggle('active-dot', index === currentIndex);
        });
    }
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalItems;
        updateCarousel();
    }
    
    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        updateCarousel();
    }
    
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    dots.forEach((dot, index) => dot.addEventListener('click', () => {
        currentIndex = index;
        updateCarousel();
    }));
    
    setInterval(nextSlide, 5000);
});

// ==================== ROOMS PAGE FUNCTIONS ====================

async function fetchRoomsFromBackend() {
    try {
        const checkIn = document.getElementById('modalCheckIn')?.value;
        const checkOut = document.getElementById('modalCheckOut')?.value;
        let url = `${API_BASE_URL}/rooms`;
        if (checkIn && checkOut) {
            url += `?check_in=${checkIn}&check_out=${checkOut}`;
        }
        const response = await fetch(url);
        const data = await response.json();
        if (data.success) {
            return data.rooms;
        } else {
            throw new Error(data.message || 'Failed to fetch rooms');
        }
    } catch (error) {
        console.error('Error fetching rooms:', error);
        return [
            { id: 1, room_number: '101', room_type: 'ac', current_status: 'available', base_price: 2500, capacity: 2 },
            { id: 2, room_number: '102', room_type: 'ac', current_status: 'available', base_price: 2500, capacity: 2 },
            { id: 3, room_number: '103', room_type: 'ac', current_status: 'available', base_price: 2500, capacity: 2 },
            { id: 4, room_number: '104', room_type: 'pet', current_status: 'available', base_price: 2500, capacity: 2 }
        ];
    }
}

async function loadRooms() {
    const container = document.getElementById('roomsGrid');
    if (!container) return;
    
    container.innerHTML = '<div class="loading-spinner"><i class="fas fa-spinner fa-spin"></i> Loading rooms...</div>';
    
    try {
        const rooms = await fetchRoomsFromBackend();
        const pricePerPerson = parseInt(localStorage.getItem('acPrice')) || 2500;
        
        if (rooms.length === 0) {
            container.innerHTML = '<div class="loading-spinner">No rooms available</div>';
            return;
        }
        
        const roomImages = {
            1: 'images/r1.jpeg', 2: 'images/r2.jpeg', 
            3: 'images/r1.jpeg', 4: 'images/r2.jpeg',
            'default': 'images/room-default.jpg'
        };
        
        container.innerHTML = rooms.map(room => `
            <div class="room-card" data-room-id="${room.id}">
                <div class="room-image">
                    <img src="${roomImages[room.id] || roomImages.default}" 
                         alt="Room ${room.room_number}"
                         onerror="this.src='https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=500'">
                </div>
                <div class="room-content">
                    <div class="room-header">
                        <h3 class="room-title">AC Room - ${room.room_number}</h3>
                        <div class="room-price">₹${room.base_price || pricePerPerson} <span>/person</span></div>
                    </div>
                    <ul class="room-features">
                        <li><i class="fas fa-check"></i> Air Conditioned</li>
                        <li><i class="fas fa-check"></i> Flat Screen TV</li>
                        <li><i class="fas fa-check"></i> 24/7 Hot Water</li>
                        <li><i class="fas fa-check"></i> Free WiFi</li>
                        <li><i class="fas ${room.room_type === 'pet' ? 'fa-paw' : 'fa-check'}"></i> ${room.room_type === 'pet' ? 'Pet Friendly' : 'Pet Allowed'}</li>
                        <li><i class="fas fa-utensils"></i> Meals Included</li>
                    </ul>
                    <div class="room-footer">
                        <span class="room-status ${room.current_status === 'available' ? 'available' : (room.current_status === 'maintenance' ? 'maintenance' : 'booked')}">
                            <i class="fas fa-circle"></i> ${room.current_status === 'available' ? 'Available' : (room.current_status === 'maintenance' ? 'Under Maintenance' : 'Booked')}
                        </span>
                        <button class="btn-accent" onclick="openBookingModalForRoom(${room.id}, '${room.room_number}')" 
                            ${room.current_status !== 'available' ? 'disabled' : ''}>
                            Book Now
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading rooms:', error);
        container.innerHTML = '<div class="loading-spinner" style="color:red;">Error loading rooms. Please refresh.</div>';
    }
}

async function loadAvailability() {
    const container = document.getElementById('availabilityGrid');
    if (!container) return;
    
    container.innerHTML = '<div class="loading-spinner"><i class="fas fa-spinner fa-spin"></i> Loading...</div>';
    
    try {
        const rooms = await fetchRoomsFromBackend();
        
        container.innerHTML = rooms.map(room => `
            <div class="availability-card">
                <div class="room-num">Room ${room.room_number}</div>
                <div class="room-type">${room.room_type === 'ac' ? 'AC Room' : 'Pet Friendly'}</div>
                <div class="status" style="color: ${room.current_status === 'available' ? '#4caf50' : (room.current_status === 'maintenance' ? '#ff9800' : '#f44336')}">
                    ${room.current_status === 'available' ? '✓ Available' : (room.current_status === 'maintenance' ? '🔧 Maintenance' : '✗ Booked')}
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading availability:', error);
        container.innerHTML = '<div class="loading-spinner">Error loading availability</div>';
    }
}

function openBookingModalForRoom(roomId, roomNumber) {
    selectedRoomId = roomId;
    selectedRoomNumber = roomNumber;
    openBookingModal();
}

function setupDateRestrictions() {
    const checkIn = document.getElementById('modalCheckIn');
    const checkOut = document.getElementById('modalCheckOut');
    
    if (!checkIn || !checkOut) return;
    
    const today = new Date().toISOString().split('T')[0];
    checkIn.min = today;
    
    checkIn.addEventListener('change', function() {
        if (this.value) {
            const minCheckOut = new Date(this.value);
            minCheckOut.setDate(minCheckOut.getDate() + 1);
            checkOut.min = minCheckOut.toISOString().split('T')[0];
            checkOut.disabled = false;
            if (checkOut.value && new Date(checkOut.value) <= new Date(this.value)) {
                checkOut.value = '';
            }
        } else {
            checkOut.disabled = true;
            checkOut.value = '';
        }
        updateSummary();
    });
    
    checkOut.disabled = true;
}