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

// Make API_BASE_URL a global variable
window.API_BASE_URL = 'http://localhost:5000/api';

let selectedRoomId = null;
let selectedRoomNumber = null;
let currentPrice = 2500;

// Load rooms into dropdown
async function loadRoomsForDropdown() {
    try {
        console.log("Loading rooms...");
        const response = await fetch(`${API_BASE_URL}/rooms`);
        console.log("Response status:", response.status);
        
        if (!response.ok) {
            console.error("Failed to load rooms:", response.status);
            return;
        }
        
        const data = await response.json();
        console.log("Rooms data:", data);
        const rooms = data.rooms || [];
        
        const roomSelect = document.getElementById('roomSelect');
        if (!roomSelect) {
            console.error("roomSelect element not found!");
            return;
        }
        
        roomSelect.innerHTML = '<option value="">-- Select Room --</option>';
        rooms.forEach(room => {
            roomSelect.innerHTML += `<option value="${room.id}" data-number="${room.room_number}">Room ${room.room_number}</option>`;
        });
        
        console.log(`Loaded ${rooms.length} rooms`);
        
        // Get current price
        const settingsRes = await fetch(`${API_BASE_URL}/settings`);
        const settingsData = await settingsRes.json();
        currentPrice = settingsData.settings?.ac_price || 2500;
        
    } catch (error) {
        console.error('Error loading rooms:', error);
        alert('Could not load rooms. Please make sure backend is running on port 5000');
    }
}

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
    
    if (guestName) guestName.value = '';
    if (guestPhone) guestPhone.value = '';
    if (guestEmail) guestEmail.value = '';
    
    document.querySelectorAll('.error-message').forEach(el => {
        if (el) el.innerHTML = '';
    });
    
    // Reset selected room
    const roomSelect = document.getElementById('roomSelect');
    if (roomSelect) roomSelect.value = '';
    selectedRoomId = null;
    selectedRoomNumber = null;
    
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
    
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(el => {
        if (el) el.innerHTML = '';
    });
}

function updateSummary() {
    const guests = parseInt(document.getElementById('modalGuests')?.value || '2');
    const checkIn = document.getElementById('modalCheckIn')?.value;
    const checkOut = document.getElementById('modalCheckOut')?.value;
    
    let nights = 1;
    if (checkIn && checkOut) {
        nights = Math.max(1, Math.ceil((new Date(checkOut) - new Date(checkIn)) / (86400000)));
    }
    const total = currentPrice * guests * nights;
    
    const selectedRoomSpan = document.getElementById('selectedRoomSpan');
    const summaryGuests = document.getElementById('summaryGuests');
    const summaryDates = document.getElementById('summaryDates');
    const summaryNights = document.getElementById('summaryNights');
    const summaryTotal = document.getElementById('summaryTotal');
    
    if (selectedRoomSpan) selectedRoomSpan.innerHTML = selectedRoomNumber ? `Room ${selectedRoomNumber}` : 'Not selected';
    if (summaryGuests) summaryGuests.innerHTML = guests;
    if (summaryDates) summaryDates.innerHTML = (checkIn && checkOut) ? `${checkIn} to ${checkOut}` : 'Not selected';
    if (summaryNights) summaryNights.innerHTML = nights;
    if (summaryTotal) summaryTotal.innerHTML = total;
}

// ==================== VALIDATION & NAVIGATION FUNCTIONS ====================

// ============ VALIDATE AND PROCEED TO PAYMENT ============
async function validateAndGoToPayment() {
    const roomSelect = document.getElementById('roomSelect');
    const checkIn = document.getElementById('modalCheckIn')?.value;
    const checkOut = document.getElementById('modalCheckOut')?.value;
    const guestName = document.getElementById('guestName')?.value?.trim();
    const guestPhone = document.getElementById('guestPhone')?.value?.trim();
    const guestEmail = document.getElementById('guestEmail')?.value?.trim();
    
    let isValid = true;
    document.querySelectorAll('.error-message').forEach(el => el.innerHTML = '');
    
    // Get selected room from dropdown
    if (!roomSelect.value) {
        document.getElementById('roomError').innerHTML = 'Please select a room';
        isValid = false;
    } else {
        selectedRoomId = parseInt(roomSelect.value);
        selectedRoomNumber = roomSelect.options[roomSelect.selectedIndex]?.getAttribute('data-number');
    }
    
    if (!checkIn) {
        document.getElementById('checkInError').innerHTML = 'Please select check-in date';
        isValid = false;
    }
    if (!checkOut) {
        document.getElementById('checkOutError').innerHTML = 'Please select check-out date';
        isValid = false;
    }
    if (checkIn && checkOut && new Date(checkOut) <= new Date(checkIn)) {
        document.getElementById('checkOutError').innerHTML = 'Check-out must be after check-in';
        isValid = false;
    }
    if (!guestName) {
        document.getElementById('guestNameError').innerHTML = 'Please enter your name';
        isValid = false;
    }
    if (!guestPhone || !/^[6-9]\d{9}$/.test(guestPhone)) {
        document.getElementById('guestPhoneError').innerHTML = 'Enter 10-digit number starting with 6,7,8,9';
        isValid = false;
    }
    if (!guestEmail || !guestEmail.includes('@')) {
        document.getElementById('guestEmailError').innerHTML = 'Enter valid email';
        isValid = false;
    }
    
    if (!isValid) return;
    
    // CHECK AVAILABILITY WITH BACKEND
    try {
        const availResponse = await fetch(`${API_BASE_URL}/bookings/check-availability`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                room_id: selectedRoomId, 
                check_in: checkIn, 
                check_out: checkOut 
            })
        });
        const availability = await availResponse.json();
        
        if (!availability.available) {
            alert(`❌ Room ${selectedRoomNumber} is already booked for ${checkIn} to ${checkOut}. Please select different dates.`);
            return;
        }
        
        // Update summary for payment step
        document.getElementById('summaryRoom2').innerHTML = `Room ${selectedRoomNumber}`;
        document.getElementById('summaryGuests2').innerHTML = document.getElementById('summaryGuests').innerHTML;
        document.getElementById('summaryDates2').innerHTML = document.getElementById('summaryDates').innerHTML;
        document.getElementById('summaryNights2').innerHTML = document.getElementById('summaryNights').innerHTML;
        document.getElementById('summaryTotal2').innerHTML = document.getElementById('summaryTotal').innerHTML;
        
        document.getElementById('step1').style.display = 'none';
        document.getElementById('step2').style.display = 'block';
        document.getElementById('step1Progress').classList.remove('active');
        document.getElementById('step2Progress').classList.add('active');
        
    } catch (error) {
        console.error('Availability check failed:', error);
        alert('Error checking availability. Please try again.');
    }
}

async function checkAvailabilityAndProceed(roomId, checkIn, checkOut) {
    try {
        const availResponse = await fetch(`${API_BASE_URL}/bookings/check-availability`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                room_id: roomId, 
                check_in: checkIn, 
                check_out: checkOut 
            })
        });
        const availability = await availResponse.json();
        
        if (!availability.available) {
            alert(`❌ Room ${selectedRoomNumber} is already booked for ${checkIn} to ${checkOut}. Please select different dates.`);
            return;
        }
        
        // Update summary for payment step
        const summaryRoom2 = document.getElementById('summaryRoom2');
        const summaryGuests2 = document.getElementById('summaryGuests2');
        const summaryDates2 = document.getElementById('summaryDates2');
        const summaryNights2 = document.getElementById('summaryNights2');
        const summaryTotal2 = document.getElementById('summaryTotal2');
        
        if (summaryRoom2) summaryRoom2.innerHTML = `Room ${selectedRoomNumber}`;
        if (summaryGuests2) summaryGuests2.innerHTML = document.getElementById('summaryGuests').innerHTML;
        if (summaryDates2) summaryDates2.innerHTML = document.getElementById('summaryDates').innerHTML;
        if (summaryNights2) summaryNights2.innerHTML = document.getElementById('summaryNights').innerHTML;
        if (summaryTotal2) summaryTotal2.innerHTML = document.getElementById('summaryTotal').innerHTML;
        
        goToPayment();
        
    } catch (error) {
        console.error('Availability check failed:', error);
        alert('Error checking availability. Please try again.');
    }
}

function goToPayment() {
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
    const guests = parseInt(document.getElementById('modalGuests')?.value || '2');
    const checkIn = document.getElementById('modalCheckIn')?.value || '';
    const checkOut = document.getElementById('modalCheckOut')?.value || '';
    const nights = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (86400000));
    const total = currentPrice * guests * nights;
    
    return {
        room_id: selectedRoomId,
        room_number: selectedRoomNumber,
        guests: guests,
        checkIn: checkIn,
        checkOut: checkOut,
        guestName: document.getElementById('guestName')?.value?.trim() || '',
        guestPhone: document.getElementById('guestPhone')?.value?.trim() || '',
        guestEmail: document.getElementById('guestEmail')?.value?.trim() || '',
        total_amount: total
    };
}

async function payAtVenue() {
    const bookingData = getBookingDataFromForm();
    
    if (!bookingData.checkIn || !bookingData.checkOut) {
        alert('Please select check-in and check-out dates');
        return;
    }
    if (!bookingData.guestName || !bookingData.guestPhone || !bookingData.guestEmail) {
        alert('Please fill all guest details');
        return;
    }
    
    const btn = event.target;
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    btn.disabled = true;
    
    try {
        const response = await fetch(`${API_BASE_URL}/bookings/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                room_id: bookingData.room_id,
                guest_name: bookingData.guestName,
                guest_phone: bookingData.guestPhone,
                guest_email: bookingData.guestEmail,
                guests: bookingData.guests,
                check_in: bookingData.checkIn,
                check_out: bookingData.checkOut,
                total_amount: bookingData.total_amount,
                payment_method: 'pay_at_venue'
            })
        });
        
        const result = await response.json();
        
        if (result.success) {
            alert(`✅ Booking Confirmed!\n\nBooking ID: ${result.booking_id}\nRoom: ${bookingData.room_number}\nTotal: ₹${bookingData.total_amount}\n\nPay at check-in.`);
            closeBookingModal();
        } else {
            alert('Booking failed: ' + result.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Network error. Please try again.');
    } finally {
        btn.innerHTML = originalText;
        btn.disabled = false;
    }
}

async function initiateRazorpayPayment() {
    const bookingData = getBookingDataFromForm();
    
    if (!bookingData.checkIn || !bookingData.checkOut) {
        alert('Please select check-in and check-out dates');
        return;
    }
    if (!bookingData.guestName || !bookingData.guestPhone || !bookingData.guestEmail) {
        alert('Please fill all guest details');
        return;
    }
    
    const btn = event.target;
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    btn.disabled = true;
    
    try {
        const bookingResponse = await fetch(`${API_BASE_URL}/bookings/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                room_id: bookingData.room_id,
                guest_name: bookingData.guestName,
                guest_phone: bookingData.guestPhone,
                guest_email: bookingData.guestEmail,
                guests: bookingData.guests,
                check_in: bookingData.checkIn,
                check_out: bookingData.checkOut,
                total_amount: bookingData.total_amount,
                payment_method: 'razorpay'
            })
        });
        
        const bookingResult = await bookingResponse.json();
        
        if (!bookingResult.success) {
            alert('Failed to create booking: ' + bookingResult.message);
            btn.innerHTML = originalText;
            btn.disabled = false;
            return;
        }
        
        const bookingId = bookingResult.booking_id;
        
        const orderResponse = await fetch(`${API_BASE_URL}/payments/create-order`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ booking_id: bookingId, amount: bookingData.total_amount })
        });
        
        const order = await orderResponse.json();
        
        if (!order.success) {
            alert('Failed to create payment order');
            btn.innerHTML = originalText;
            btn.disabled = false;
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
                    alert(`✅ Payment Successful!\n\nBooking ID: ${bookingId}\nRoom: ${bookingData.room_number}`);
                    closeBookingModal();
                } else {
                    alert('Payment verification failed');
                }
            }
        };
        
        const razorpay = new Razorpay(options);
        razorpay.open();
        
        btn.innerHTML = originalText;
        btn.disabled = false;
        
    } catch (error) {
        console.error('Payment error:', error);
        alert('Payment failed: ' + error.message);
        btn.innerHTML = originalText;
        btn.disabled = false;
    }
}

function openWhatsApp() {
    window.open('https://wa.me/918237141702?text=Hello%20I%20want%20to%20book%20a%20room', '_blank');
}

// ==================== REAL-TIME INPUT VALIDATION ====================

function setupInputValidations() {
    // Room selection change
    const roomSelect = document.getElementById('roomSelect');
    if (roomSelect) {
        roomSelect.addEventListener('change', function() {
            if (this.value) {
                selectedRoomId = parseInt(this.value);
                selectedRoomNumber = this.options[this.selectedIndex]?.getAttribute('data-number');
                updateSummary();
            }
        });
    }
    
    const nameInput = document.getElementById('guestName');
    if (nameInput) {
        nameInput.addEventListener('input', function(e) {
            this.value = this.value.replace(/[^A-Za-z\s]/g, '');
        });
    }
    
    const phoneInput = document.getElementById('guestPhone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            this.value = this.value.replace(/[^0-9]/g, '').slice(0, 10);
        });
    }
    
    const guestsSelect = document.getElementById('modalGuests');
    if (guestsSelect) {
        guestsSelect.addEventListener('change', updateSummary);
    }
    
    const checkInDate = document.getElementById('modalCheckIn');
    const checkOutDate = document.getElementById('modalCheckOut');
    
    if (checkInDate) {
        checkInDate.addEventListener('change', function() {
            if (checkOutDate && this.value) {
                const nextDay = new Date(this.value);
                nextDay.setDate(nextDay.getDate() + 1);
                checkOutDate.min = nextDay.toISOString().split('T')[0];
            }
            updateSummary();
        });
    }
    
    if (checkOutDate) {
        checkOutDate.addEventListener('change', updateSummary);
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadRoomsForDropdown();
    setupInputValidations();
    
    const today = new Date().toISOString().split('T')[0];
    const checkIn = document.getElementById('modalCheckIn');
    const checkOut = document.getElementById('modalCheckOut');
    if (checkIn) checkIn.min = today;
    if (checkOut) checkOut.min = today;
});

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