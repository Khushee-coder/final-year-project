// ================ SWAMI HOLIDAY HOME - CLEAN WORKING SCRIPT ================

// ================ INITIALIZE DATABASE ================
function initializeDatabase() {
    // Initialize Prices
    if (!localStorage.getItem('prices')) {
        localStorage.setItem('prices', JSON.stringify({ ac: 2500 }));
    }
    
    // Initialize Rooms
    if (!localStorage.getItem('rooms')) {
        const defaultRooms = [
            { number: '101', type: 'ac', status: 'available', guest: null, checkIn: null, checkOut: null },
            { number: '102', type: 'ac', status: 'available', guest: null, checkIn: null, checkOut: null },
            { number: '103', type: 'ac', status: 'available', guest: null, checkIn: null, checkOut: null },
            { number: '104', type: 'ac', status: 'available', guest: null, checkIn: null, checkOut: null }
        ];
        localStorage.setItem('rooms', JSON.stringify(defaultRooms));
    }
    
    // Initialize Bookings
    if (!localStorage.getItem('bookings')) {
        localStorage.setItem('bookings', JSON.stringify([]));
    }
    
    // Initialize Enquiries
    if (!localStorage.getItem('enquiries')) {
        localStorage.setItem('enquiries', JSON.stringify([]));
    }
    
    // Initialize Veg Food - SIMPLE LIST (not 100+ items)
    if (!localStorage.getItem('vegFoodItems')) {
        const defaultVeg = [
            { name: 'Veg Thali', price: 0 },
            { name: 'Dal Rice', price: 0 },
            { name: 'Matar Paneer', price: 0 },
            { name: 'Dry Sabzi', price: 0 },
            { name: 'Sweet Salad', price: 0 }
        ];
        localStorage.setItem('vegFoodItems', JSON.stringify(defaultVeg));
    }
    
    // Initialize Non-Veg Food - SIMPLE LIST
    if (!localStorage.getItem('nonVegFoodItems')) {
        const defaultNonVeg = [
            { name: 'Fish Curry Rice', price: 0 },
            { name: 'Chicken Thali', price: 0 },
            { name: 'Prawns Masala', price: 0 },
            { name: 'Sol Kadhi', price: 0 },
            { name: 'Kokani Special', price: 0 }
        ];
        localStorage.setItem('nonVegFoodItems', JSON.stringify(defaultNonVeg));
    }
    
    // Initialize Facilities
    if (!localStorage.getItem('facilities')) {
        const defaultFacilities = [
            { name: 'Swimming Pool', icon: 'swimming-pool' },
            { name: 'In-house Restaurant', icon: 'utensils' },
            { name: 'Car Parking', icon: 'parking' },
            { name: 'Free WiFi', icon: 'wifi' },
            { name: 'Power Backup', icon: 'bolt' },
            { name: 'Air Conditioning', icon: 'snowflake' },
            { name: 'Flat Screen TV', icon: 'tv' },
            { name: '24/7 Hot Water', icon: 'hot-tub' }
        ];
        localStorage.setItem('facilities', JSON.stringify(defaultFacilities));
    }
    
    // Initialize Nearby Places
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
    
    // Initialize Games
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

// ================ UPDATE ROOM PRICES ================
function updateAllRoomPrices() {
    const prices = JSON.parse(localStorage.getItem('prices')) || { ac: 2500 };
    const acPrice = prices.ac;
    
    const homePrice = document.getElementById('homeAcPrice');
    if (homePrice) homePrice.innerHTML = `₹${acPrice} <span>/person</span>`;
    
    const heroPrice = document.getElementById('heroPrice');
    if (heroPrice) heroPrice.textContent = `₹${acPrice}`;
    
    const statPrice = document.getElementById('statPrice');
    statPrice.textContent = `₹${(acPrice/1000).toFixed(1)}k`;
    
    for (let i = 101; i <= 104; i++) {
        const roomPrice = document.getElementById(`roomPrice${i}`);
        if (roomPrice) roomPrice.innerHTML = `₹${acPrice} <span>/person</span>`;
    }
    
    const footerPrice = document.getElementById('footerPrice');
    if (footerPrice) footerPrice.textContent = `₹${acPrice}`;
    
    console.log("Prices updated to: ₹" + acPrice);
}

// ================ LOAD ROOM AVAILABILITY ================
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

// ================ LOAD FACILITIES ================
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

// ================ LOAD FOOD ITEMS FROM ADMIN PANEL ================

function loadFoodItems() {
    // Load Veg Items from localStorage
    const vegItems = JSON.parse(localStorage.getItem('vegFoodItems')) || [];
    const vegContainer = document.getElementById('vegFoodGrid');
    
    if (vegContainer) {
        if (vegItems.length === 0) {
            vegContainer.innerHTML = '<p style="text-align:center; padding:20px;">No vegetarian items added yet.</p>';
        } else {
            vegContainer.innerHTML = vegItems.map(item => {
                // Fix image path - if it doesn't start with http or https, add images/ folder
                let imageUrl = item.image;
                if (imageUrl && !imageUrl.startsWith('http') && !imageUrl.startsWith('https') && !imageUrl.startsWith('data:')) {
                    imageUrl = 'images/' + imageUrl;
                }
                if (!imageUrl || imageUrl === '') {
                    imageUrl = 'images/placeholder.jpg';
                }
                
                return `
                    <div class="food-card">
                        <div class="food-image" style="background-image: url('${imageUrl}'); background-size: cover; background-position: center;"></div>
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
    
    // Load Non-Veg Items from localStorage
    const nonVegItems = JSON.parse(localStorage.getItem('nonVegFoodItems')) || [];
    const nonVegContainer = document.getElementById('nonVegFoodGrid');
    
    if (nonVegContainer) {
        if (nonVegItems.length === 0) {
            nonVegContainer.innerHTML = '<p style="text-align:center; padding:20px;">No non-vegetarian items added yet.</p>';
        } else {
            nonVegContainer.innerHTML = nonVegItems.map(item => {
                // Fix image path - if it doesn't start with http or https, add images/ folder
                let imageUrl = item.image;
                if (imageUrl && !imageUrl.startsWith('http') && !imageUrl.startsWith('https') && !imageUrl.startsWith('data:')) {
                    imageUrl = 'images/' + imageUrl;
                }
                if (!imageUrl || imageUrl === '') {
                    imageUrl = 'images/placeholder.jpg';
                }
                
                return `
                    <div class="food-card">
                        <div class="food-image" style="background-image: url('${imageUrl}'); background-size: cover; background-position: center;"></div>
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

// Helper function to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ================ LOAD GAMES ================
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

// ================ LOAD NEARBY PLACES ================
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

// ================ LOAD ROOMS FOR FRONT END ================
function loadRooms() {
    const roomsGrid = document.getElementById('roomsGrid');
    if (!roomsGrid) return;
    
    const rooms = JSON.parse(localStorage.getItem('rooms')) || [];
    const prices = JSON.parse(localStorage.getItem('prices')) || { ac: 2500 };
    
    roomsGrid.innerHTML = rooms.map(room => `
        <div class="room-card">
            <div class="room-image" style="background: linear-gradient(135deg, #0a4d4c, #1e7a76); display: flex; align-items: center; justify-content: center;">
                <i class="fas fa-snowflake"></i>
            </div>
            <div class="room-content">
                <div class="room-header">
                    <h3 class="room-title">AC Room - ${room.number}</h3>
                    <div class="room-price" id="roomPrice${room.number}">₹${prices.ac} <span>/person</span></div>
                </div>
                <ul class="room-features">
                    <li><i class="fas fa-check"></i> Air Conditioned</li>
                    <li><i class="fas fa-check"></i> Flat Screen TV</li>
                    <li><i class="fas fa-check"></i> 24/7 Hot Water</li>
                    <li><i class="fas fa-check"></i> Free WiFi</li>
                    <li><i class="fas fa-paw"></i> Pet Friendly</li>
                    <li><i class="fas fa-utensils"></i> Meals Included</li>
                </ul>
                <div class="room-footer">
                    <span class="room-status ${room.status}">
                        <i class="fas fa-circle"></i> ${room.status === 'available' ? 'Available' : 'Occupied'}
                    </span>
                    <button class="btn btn-accent" onclick="openBookingModal()" ${room.status !== 'available' ? 'disabled' : ''}>
                        <i class="fas fa-calendar-check"></i> Book Now
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// ================ BOOKING MODAL FUNCTIONS ================
function openBookingModal() {
    const modal = document.getElementById('bookingModal');
    if (modal) modal.classList.add('active');
}

function closeBookingModal() {
    const modal = document.getElementById('bookingModal');
    if (modal) modal.classList.remove('active');
}

function closeConfirmModal() {
    const modal = document.getElementById('confirmModal');
    if (modal) modal.classList.remove('active');
}

// ================ PROCESS BOOKING ================
function processBooking(event) {
    event.preventDefault();
    
    const name = document.getElementById('guestName')?.value;
    const phone = document.getElementById('guestPhone')?.value;
    const email = document.getElementById('guestEmail')?.value;
    const guests = document.getElementById('modalGuests')?.value;
    const checkIn = document.getElementById('modalCheckIn')?.value;
    const checkOut = document.getElementById('modalCheckOut')?.value;
    const numRooms = parseInt(document.getElementById('modalNumRooms')?.value || 1);
    
    if (!name || !phone || !email || !checkIn || !checkOut) {
        alert('Please fill all required fields');
        return;
    }
    
    const prices = JSON.parse(localStorage.getItem('prices')) || { ac: 2500 };
    const roomPrice = prices.ac;
    const nights = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
    const total = parseInt(guests) * roomPrice * nights * numRooms;
    
    let rooms = JSON.parse(localStorage.getItem('rooms')) || [];
    const availableRooms = rooms.filter(r => r.status === 'available');
    
    if (availableRooms.length < numRooms) {
        alert(`Only ${availableRooms.length} rooms available. Please reduce number of rooms.`);
        return;
    }
    
    let bookedCount = 0;
    let bookedRoomNumbers = [];
    for (let i = 0; i < rooms.length && bookedCount < numRooms; i++) {
        if (rooms[i].status === 'available') {
            rooms[i].status = 'occupied';
            rooms[i].guest = name;
            rooms[i].checkIn = checkIn;
            rooms[i].checkOut = checkOut;
            bookedRoomNumbers.push(rooms[i].number);
            bookedCount++;
        }
    }
    localStorage.setItem('rooms', JSON.stringify(rooms));
    
    const booking = {
        id: 'BKG' + Date.now().toString().slice(-8),
        guestName: name,
        guestPhone: phone.replace(/\D/g, ''),
        guestEmail: email,
        roomNumbers: bookedRoomNumbers,
        numRooms: numRooms,
        guests: parseInt(guests),
        checkIn: checkIn,
        checkOut: checkOut,
        nights: nights,
        total: total,
        date: new Date().toISOString()
    };
    
    let bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    bookings.push(booking);
    localStorage.setItem('bookings', JSON.stringify(bookings));
    
    closeBookingModal();
    
    document.getElementById('confirmGuestName').textContent = name;
    document.getElementById('confirmDetails').innerHTML = `
        <p><strong>Booking ID:</strong> ${booking.id}</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone.replace(/\D/g, '')}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Rooms:</strong> ${bookedRoomNumbers.join(', ')}</p>
        <p><strong>Check-in:</strong> ${new Date(checkIn).toLocaleDateString()}</p>
        <p><strong>Check-out:</strong> ${new Date(checkOut).toLocaleDateString()}</p>
        <p><strong>Total:</strong> ₹${total}</p>
    `;
    document.getElementById('confirmModal').classList.add('active');
    
    loadRoomAvailability();
    loadRooms();
}

// ================ WHATSAPP FUNCTION ================
function openWhatsApp() {
    const number = "918237141702";
    const message = "Hello! I have a question about Swami Holiday Home.";
    window.open(`https://wa.me/${number}?text=${encodeURIComponent(message)}`, '_blank');
}

// ================ CONTACT FORM SUBMISSION ================
function submitContactForm(event) {
    event.preventDefault();
    
    const name = document.getElementById('contactName')?.value;
    const email = document.getElementById('contactEmail')?.value;
    const phone = document.getElementById('contactPhone')?.value;
    const subject = document.getElementById('contactSubject')?.value;
    const message = document.getElementById('contactMessage')?.value;
    
    if (!name || !email || !subject || !message) {
        alert('Please fill all required fields');
        return false;
    }
    
    const enquiry = {
        id: 'ENQ' + Date.now().toString().slice(-8),
        name: name.trim(),
        email: email.trim(),
        phone: phone || 'Not provided',
        subject: subject.trim(),
        message: message.trim(),
        date: new Date().toISOString(),
        status: 'pending'
    };
    
    let enquiries = JSON.parse(localStorage.getItem('enquiries')) || [];
    enquiries.push(enquiry);
    localStorage.setItem('enquiries', JSON.stringify(enquiries));
    
    alert('Thank you! Your message has been sent successfully.');
    document.getElementById('contactForm').reset();
    return false;
}

// ================ ADMIN FUNCTIONS ================
function checkAdminLogin() {
    const password = document.getElementById('adminPassword')?.value;
    if (password === 'admin123') {
        sessionStorage.setItem('adminLoggedIn', 'true');
        document.getElementById('adminLoginModal').style.display = 'none';
        document.getElementById('adminDashboard').style.display = 'block';
        loadAllAdminData();
    } else {
        alert('Invalid password! Use: admin123');
    }
}

function logoutAdmin() {
    sessionStorage.removeItem('adminLoggedIn');
    document.getElementById('adminLoginModal').style.display = 'flex';
    document.getElementById('adminDashboard').style.display = 'none';
}

function loadAllAdminData() {
    loadBookingsData();
    loadEnquiriesData();
    loadRoomsData();
    loadPricesData();
    loadVegFoodItems();
    loadNonVegFoodItems();
    loadFacilitiesAdmin();
    loadNearbyPlacesAdmin();
    loadGamesAdmin();
}

function loadBookingsData() {
    const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    document.getElementById('totalBookings').textContent = bookings.length;
    
    let totalRevenue = 0;
    let html = '';
    bookings.forEach(b => {
        totalRevenue += b.total || 0;
        html += `<tr>
            <td>${b.id}</td>
            <td>${b.guestName}</td>
            <td>${b.guestPhone}</td>
            <td>${b.roomNumbers ? b.roomNumbers.join(', ') : b.numRooms}</td>
            <td>${b.checkIn}</td>
            <td>${b.checkOut}</td>
            <td>₹${b.total}</td>
            <td><button onclick="deleteBooking('${b.id}')" style="background:#f44336;color:white;border:none;padding:5px 10px;border-radius:4px;cursor:pointer;">Delete</button></td>
        </tr>`;
    });
    document.getElementById('bookingsTable').innerHTML = html || '<td><td colspan="8">No bookings yet</td></tr>';
    document.getElementById('totalRevenue').textContent = `₹${totalRevenue}`;
}

function deleteBooking(id) {
    let bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    bookings = bookings.filter(b => b.id !== id);
    localStorage.setItem('bookings', JSON.stringify(bookings));
    loadBookingsData();
}

function loadEnquiriesData() {
    const enquiries = JSON.parse(localStorage.getItem('enquiries')) || [];
    document.getElementById('totalEnquiries').textContent = enquiries.length;
    
    const container = document.getElementById('enquiriesList');
    if (!container) return;
    
    if (enquiries.length === 0) {
        container.innerHTML = '<div style="text-align:center;padding:40px;">No enquiries yet</div>';
        return;
    }
    
    let html = '';
    enquiries.forEach(e => {
        html += `<div style="background:white;padding:15px;margin-bottom:10px;border-radius:8px;border-left:4px solid #ff9800;">
            <strong>${e.name}</strong> (${e.email})<br>
            <strong>Subject:</strong> ${e.subject}<br>
            <strong>Message:</strong> ${e.message}<br>
            <small>${new Date(e.date).toLocaleString()}</small><br>
            <button onclick="deleteEnquiry('${e.id}')" style="background:#f44336;color:white;border:none;padding:5px 10px;border-radius:4px;margin-top:10px;cursor:pointer;">Delete</button>
        </div>`;
    });
    container.innerHTML = html;
}

function deleteEnquiry(id) {
    let enquiries = JSON.parse(localStorage.getItem('enquiries')) || [];
    enquiries = enquiries.filter(e => e.id !== id);
    localStorage.setItem('enquiries', JSON.stringify(enquiries));
    loadEnquiriesData();
}

function loadRoomsData() {
    const rooms = JSON.parse(localStorage.getItem('rooms')) || [];
    let available = rooms.filter(r => r.status === 'available').length;
    document.getElementById('availableRooms').textContent = available;
    
    let html = '';
    rooms.forEach(r => {
        html += `<tr>
            <td>${r.number}</td>
            <td>AC Room</td>
            <td style="color:${r.status === 'available' ? '#4caf50' : '#f44336'}">${r.status}</td>
            <td>${r.guest || '-'}</td>
            <td><button onclick="checkOutRoom('${r.number}')" style="background:#4caf50;color:white;border:none;padding:5px 10px;border-radius:4px;cursor:pointer;">Check Out</button></td>
        </tr>`;
    });
    document.getElementById('roomsTable').innerHTML = html;
}

function checkOutRoom(roomNumber) {
    let rooms = JSON.parse(localStorage.getItem('rooms')) || [];
    const room = rooms.find(r => r.number === roomNumber);
    if (room) {
        room.status = 'available';
        room.guest = null;
        localStorage.setItem('rooms', JSON.stringify(rooms));
        loadRoomsData();
        loadRoomAvailability();
        loadRooms();
    }
}

function loadPricesData() {
    const prices = JSON.parse(localStorage.getItem('prices')) || { ac: 2500 };
    document.getElementById('acPrice').value = prices.ac;
}

function savePrices() {
    const acPrice = document.getElementById('acPrice')?.value;
    localStorage.setItem('prices', JSON.stringify({ ac: parseInt(acPrice) }));
    updateAllRoomPrices();
    alert('Prices saved successfully!');
}

// ================ VEG FOOD ADMIN ================
function loadVegFood() {
    let items = JSON.parse(localStorage.getItem('vegFoodItems')) || [];
    
    let html = '<button class="btn-add" onclick="addVegItem()">+ Add New Veg Item</button>';
    html += '<div style="margin-bottom:20px; padding:10px; background:#e3f2fd; border-radius:8px;"><small>💡 Tip: For images, use a working image URL from Google Images (right-click → Copy image address)</small></div>';
    
    items.forEach((item, i) => {
        html += `<div class="admin-item-group" style="display:grid; grid-template-columns:2fr 2fr 1fr 60px auto; gap:10px; margin-bottom:10px; align-items:center; background:#f5f1ea; padding:10px; border-radius:8px;">
            <input type="text" id="vegName${i}" value="${item.name}" placeholder="Food name">
            <input type="text" id="vegImage${i}" value="${item.image || ''}" placeholder="Image URL (paste from Google)">
            <input type="number" id="vegPrice${i}" value="${item.price || 0}" placeholder="Price">
            <div style="width:50px;height:50px;background:#ddd;border-radius:8px;overflow:hidden;">
                <img src="${item.image || 'https://placehold.co/50'}" style="width:100%;height:100%;object-fit:cover;" onerror="this.src='https://via.placeholder.com/50'">
            </div>
            <button class="btn-danger" onclick="removeVegItem(${i})">Delete</button>
        </div>`;
    });
    html += '<button class="btn-save" onclick="saveVegFood()">Save Changes</button>';
    document.getElementById('vegFoodItemsList').innerHTML = html;
}

// ================ VEG FOOD - ADD NEW ITEM WITH IMAGE URL ================

function addVegItem() {
    const items = JSON.parse(localStorage.getItem('vegFoodItems')) || [];
    items.push({ 
        name: 'New Veg Item', 
        price: 0, 
        image: 'https://via.placeholder.com/200?text=Add+Image+URL'  // Placeholder image
    });
    localStorage.setItem('vegFoodItems', JSON.stringify(items));
    loadVegFood(); // Refresh the list
}

function saveVegFood() {
    const items = [];
    const inputs = document.querySelectorAll('#vegFoodItemsList .admin-item-group');
    inputs.forEach((el, i) => {
        const name = el.querySelectorAll('input[type="text"]')[0]?.value;
        const image = el.querySelectorAll('input[type="text"]')[1]?.value;
        const price = el.querySelector('input[type="number"]')?.value;
        if (name) {
            items.push({ 
                name: name, 
                image: image || 'https://via.placeholder.com/200?text=No+Image', 
                price: parseInt(price) || 0 
            });
        }
    });
    localStorage.setItem('vegFoodItems', JSON.stringify(items));
    alert('New veg item added successfully!');
    if (typeof loadFoodItems === 'function') loadFoodItems();
}

// ================ NON-VEG FOOD ADMIN ================
// ================ NON-VEG FOOD WITH IMAGE UPLOAD ================
function loadNonVegFood() {
    let items = JSON.parse(localStorage.getItem('nonVegFoodItems')) || [];
    
    let html = '<button class="btn-add" onclick="addNonVegItem()">+ Add New Non-Veg Item</button>';
    html += '<div style="margin-bottom:20px; padding:10px; background:#e3f2fd; border-radius:8px;"><small>💡 Tip: For images, use a working image URL from Google Images (right-click → Copy image address)</small></div>';
    
    items.forEach((item, i) => {
        html += `<div class="admin-item-group" style="display:grid; grid-template-columns:2fr 2fr 1fr 60px auto; gap:10px; margin-bottom:10px; align-items:center; background:#f5f1ea; padding:10px; border-radius:8px;">
            <input type="text" id="nonvegName${i}" value="${item.name}" placeholder="Food name">
            <input type="text" id="nonvegImage${i}" value="${item.image || ''}" placeholder="Image URL (paste from Google)">
            <input type="number" id="nonvegPrice${i}" value="${item.price || 0}" placeholder="Price">
            <div style="width:50px;height:50px;background:#ddd;border-radius:8px;overflow:hidden;">
                <img src="${item.image || 'https://via.placeholder.com/50'}" style="width:100%;height:100%;object-fit:cover;" onerror="this.src='https://via.placeholder.com/50'">
            </div>
            <button class="btn-danger" onclick="removeNonVegItem(${i})">Delete</button>
        </div>`;
    });
    html += '<button class="btn-save" onclick="saveNonVegFood()">Save Changes</button>';
    document.getElementById('nonVegFoodItemsList').innerHTML = html;
}

// ================ NON-VEG FOOD - ADD NEW ITEM WITH IMAGE URL ================

function addNonVegItem() {
    const items = JSON.parse(localStorage.getItem('nonVegFoodItems')) || [];
    items.push({ 
        name: 'New Non-Veg Item', 
        price: 0, 
        image: 'https://via.placeholder.com/200?text=Add+Image+URL'
    });
    localStorage.setItem('nonVegFoodItems', JSON.stringify(items));
    loadNonVegFood();
}

function saveNonVegFood() {
    const items = [];
    const inputs = document.querySelectorAll('#nonVegFoodItemsList .admin-item-group');
    inputs.forEach((el, i) => {
        const name = el.querySelectorAll('input[type="text"]')[0]?.value;
        const image = el.querySelectorAll('input[type="text"]')[1]?.value;
        const price = el.querySelector('input[type="number"]')?.value;
        if (name) {
            items.push({ 
                name: name, 
                image: image || 'https://via.placeholder.com/200?text=No+Image', 
                price: parseInt(price) || 0 
            });
        }
    });
    localStorage.setItem('nonVegFoodItems', JSON.stringify(items));
    alert('New non-veg item added successfully!');
    if (typeof loadFoodItems === 'function') loadFoodItems();
}

// ================ FACILITIES ADMIN ================
function loadFacilitiesAdmin() {
    const facilities = JSON.parse(localStorage.getItem('facilities')) || [];
    const container = document.getElementById('facilitiesList');
    if (!container) return;
    
    let html = '';
    html += '<div style="margin-bottom:20px;"><button class="btn-add" onclick="addFacility()">+ Add Facility</button></div>';
    
    facilities.forEach((fac, i) => {
        html += `<div class="admin-item-group" style="display:grid;grid-template-columns:2fr 1fr auto;gap:10px;margin-bottom:10px;align-items:center;">
            <input type="text" value="${fac.name}" id="facName${i}" style="padding:8px;border:2px solid #f5e6d3;border-radius:8px;">
            <input type="text" value="${fac.icon}" id="facIcon${i}" style="padding:8px;border:2px solid #f5e6d3;border-radius:8px;">
            <button onclick="removeFacility(${i})" style="background:#f44336;color:white;border:none;padding:8px 12px;border-radius:4px;cursor:pointer;">Delete</button>
        </div>`;
    });
    html += '<button class="btn-save" onclick="saveFacilities()">Save Changes</button>';
    container.innerHTML = html;
}

function addFacility() {
    const facilities = JSON.parse(localStorage.getItem('facilities')) || [];
    facilities.push({ name: 'New Facility', icon: 'plus-circle' });
    localStorage.setItem('facilities', JSON.stringify(facilities));
    loadFacilitiesAdmin();
}

function removeFacility(index) {
    let facilities = JSON.parse(localStorage.getItem('facilities')) || [];
    facilities.splice(index, 1);
    localStorage.setItem('facilities', JSON.stringify(facilities));
    loadFacilitiesAdmin();
}

function saveFacilities() {
    const facilities = [];
    const inputs = document.querySelectorAll('#facilitiesList .admin-item-group');
    inputs.forEach((el, i) => {
        const name = document.getElementById(`facName${i}`)?.value;
        const icon = document.getElementById(`facIcon${i}`)?.value;
        if (name) facilities.push({ name, icon });
    });
    localStorage.setItem('facilities', JSON.stringify(facilities));
    alert('Facilities saved!');
}

// ================ NEARBY PLACES ADMIN ================
function loadNearbyPlacesAdmin() {
    const places = JSON.parse(localStorage.getItem('nearbyPlaces')) || [];
    const container = document.getElementById('nearbyList');
    if (!container) return;
    
    let html = '';
    html += '<div style="margin-bottom:20px;"><button class="btn-add" onclick="addNearbyPlace()">+ Add Place</button></div>';
    
    places.forEach((place, i) => {
        html += `<div class="admin-item-group" style="display:grid;grid-template-columns:2fr 1fr 2fr 1fr auto;gap:10px;margin-bottom:10px;align-items:center;">
            <input type="text" value="${place.name}" id="placeName${i}" style="padding:8px;border:2px solid #f5e6d3;border-radius:8px;">
            <input type="text" value="${place.distance}" id="placeDist${i}" style="padding:8px;border:2px solid #f5e6d3;border-radius:8px;">
            <input type="text" value="${place.icon}" id="placeIcon${i}" style="padding:8px;border:2px solid #f5e6d3;border-radius:8px;">
            <input type="text" value="${place.desc}" id="placeDesc${i}" style="padding:8px;border:2px solid #f5e6d3;border-radius:8px;">
            <button onclick="removeNearbyPlace(${i})" style="background:#f44336;color:white;border:none;padding:8px 12px;border-radius:4px;cursor:pointer;">Delete</button>
        </div>`;
    });
    html += '<button class="btn-save" onclick="saveNearbyPlaces()">Save Changes</button>';
    container.innerHTML = html;
}

function addNearbyPlace() {
    const places = JSON.parse(localStorage.getItem('nearbyPlaces')) || [];
    places.push({ name: 'New Place', distance: '10 min', icon: 'map-marker-alt', desc: 'Description here' });
    localStorage.setItem('nearbyPlaces', JSON.stringify(places));
    loadNearbyPlacesAdmin();
}

function removeNearbyPlace(index) {
    let places = JSON.parse(localStorage.getItem('nearbyPlaces')) || [];
    places.splice(index, 1);
    localStorage.setItem('nearbyPlaces', JSON.stringify(places));
    loadNearbyPlacesAdmin();
}

function saveNearbyPlaces() {
    const places = [];
    const inputs = document.querySelectorAll('#nearbyList .admin-item-group');
    inputs.forEach((el, i) => {
        const name = document.getElementById(`placeName${i}`)?.value;
        const dist = document.getElementById(`placeDist${i}`)?.value;
        const icon = document.getElementById(`placeIcon${i}`)?.value;
        const desc = document.getElementById(`placeDesc${i}`)?.value;
        if (name) places.push({ name, distance: dist, icon, desc });
    });
    localStorage.setItem('nearbyPlaces', JSON.stringify(places));
    alert('Nearby places saved!');
}

// ================ GAMES ADMIN ================
function loadGamesAdmin() {
    const games = JSON.parse(localStorage.getItem('games')) || [];
    const container = document.getElementById('gamesList');
    if (!container) return;
    
    let html = '';
    html += '<div style="margin-bottom:20px;"><button class="btn-add" onclick="addGame()">+ Add Game</button></div>';
    
    games.forEach((game, i) => {
        html += `<div class="admin-item-group" style="display:grid;grid-template-columns:2fr 1fr 1fr auto;gap:10px;margin-bottom:10px;align-items:center;">
            <input type="text" value="${game.name}" id="gameName${i}" style="padding:8px;border:2px solid #f5e6d3;border-radius:8px;">
            <input type="text" value="${game.icon}" id="gameIcon${i}" style="padding:8px;border:2px solid #f5e6d3;border-radius:8px;">
            <input type="text" value="${game.players}" id="gamePlayers${i}" style="padding:8px;border:2px solid #f5e6d3;border-radius:8px;">
            <button onclick="removeGame(${i})" style="background:#f44336;color:white;border:none;padding:8px 12px;border-radius:4px;cursor:pointer;">Delete</button>
        </div>`;
    });
    html += '<button class="btn-save" onclick="saveGames()">Save Changes</button>';
    container.innerHTML = html;
}

function addGame() {
    const games = JSON.parse(localStorage.getItem('games')) || [];
    games.push({ name: 'New Game', icon: 'gamepad', players: '2 Players' });
    localStorage.setItem('games', JSON.stringify(games));
    loadGamesAdmin();
}

function removeGame(index) {
    let games = JSON.parse(localStorage.getItem('games')) || [];
    games.splice(index, 1);
    localStorage.setItem('games', JSON.stringify(games));
    loadGamesAdmin();
}

function saveGames() {
    const games = [];
    const inputs = document.querySelectorAll('#gamesList .admin-item-group');
    inputs.forEach((el, i) => {
        const name = document.getElementById(`gameName${i}`)?.value;
        const icon = document.getElementById(`gameIcon${i}`)?.value;
        const players = document.getElementById(`gamePlayers${i}`)?.value;
        if (name) games.push({ name, icon, players });
    });
    localStorage.setItem('games', JSON.stringify(games));
    alert('Games saved!');
}

// ================ SETUP FUNCTIONS ================
function setupDates() {
    const today = new Date().toISOString().split('T')[0];
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 4);
    const maxDateStr = maxDate.toISOString().split('T')[0];
    
    const checkIn = document.getElementById('modalCheckIn');
    const checkOut = document.getElementById('modalCheckOut');
    
    if (checkIn) {
        checkIn.min = today;
        checkIn.max = maxDateStr;
        checkIn.value = today;
    }
    if (checkOut) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        checkOut.min = tomorrow.toISOString().split('T')[0];
        checkOut.max = maxDateStr;
        checkOut.value = tomorrow.toISOString().split('T')[0];
    }
}

function setupRealTimeValidation() {
    const nameInput = document.getElementById('guestName');
    if (nameInput) {
        nameInput.addEventListener('input', function() {
            this.value = this.value.replace(/[^A-Za-z\s]/g, '');
        });
    }
    const phoneInput = document.getElementById('guestPhone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            this.value = this.value.replace(/[^0-9]/g, '').slice(0, 10);
        });
    }
}

function setupContactFormValidation() {
    const nameInput = document.getElementById('contactName');
    if (nameInput) {
        nameInput.addEventListener('input', function() {
            this.value = this.value.replace(/[^A-Za-z\s]/g, '');
        });
    }
    const phoneInput = document.getElementById('contactPhone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            this.value = this.value.replace(/[^0-9]/g, '').slice(0, 10);
        });
    }
}

function setFacebookLink() {
    const facebookLink = document.getElementById('facebookLink');
    if (facebookLink) {
        facebookLink.href = 'https://www.facebook.com/search/top?q=Swami%20Holiday%20Home%20Alibag';
    }
}

// ================ BOOKING MODAL HTML ================
const bookingModalHTML = `
<div class="booking-modal" id="bookingModal">
    <div class="booking-modal-content">
        <div class="booking-modal-header">
            <h3><i class="fas fa-calendar-check"></i> Book Your Stay</h3>
            <button class="modal-close" onclick="closeBookingModal()">&times;</button>
        </div>
        <div class="booking-modal-body">
            <form onsubmit="processBooking(event)">
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px; margin-bottom:15px;">
                    <div>
                        <label>Room Type</label>
                        <select id="modalRoomType">
                            <option value="ac">AC Room - ₹2,500/person</option>
                        </select>
                    </div>
                    <div>
                        <label>Number of Rooms</label>
                        <select id="modalNumRooms">
                            <option value="1">1 Room</option>
                            <option value="2">2 Rooms</option>
                            <option value="3">3 Rooms</option>
                            <option value="4">4 Rooms</option>
                        </select>
                    </div>
                </div>
                
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px; margin-bottom:15px;">
                    <div>
                        <label>Guests</label>
                        <select id="modalGuests">
                            <option value="1">1 Guest</option>
                            <option value="2" selected>2 Guests</option>
                            <option value="3">3 Guests</option>
                            <option value="4">4 Guests</option>
                        </select>
                    </div>
                    <div>
                        <label>Check-in</label>
                        <input type="date" id="modalCheckIn">
                    </div>
                </div>
                
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px; margin-bottom:15px;">
                    <div>
                        <label>Check-out</label>
                        <input type="date" id="modalCheckOut">
                    </div>
                    <div></div>
                </div>
                
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px; margin-bottom:15px;">
                    <div>
                        <label>Full Name</label>
                        <input type="text" id="guestName" required>
                    </div>
                    <div>
                        <label>Phone</label>
                        <input type="tel" id="guestPhone" required>
                    </div>
                </div>
                
                <div>
                    <label>Email</label>
                    <input type="email" id="guestEmail" required>
                </div>
                
                <div style="background:#f5f1ea; padding:15px; border-radius:8px; margin:20px 0;">
                    <div>Room: AC Room</div>
                    <div id="summaryDetails">Select dates to see total</div>
                    <div style="font-weight:700; margin-top:10px;">Total: ₹<span id="summaryTotal">0</span></div>
                </div>
                
                <button type="submit" style="width:100%; background:#ff8a7a; color:white; border:none; padding:15px; border-radius:50px; font-weight:700; cursor:pointer;">
                    Confirm Booking
                </button>
            </form>
        </div>
    </div>
</div>

<div class="booking-modal" id="confirmModal">
    <div class="booking-modal-content" style="max-width:400px;">
        <div class="booking-modal-header" style="background:#4caf50;">
            <h3>Booking Confirmed!</h3>
            <button class="modal-close" onclick="closeConfirmModal()">&times;</button>
        </div>
        <div class="booking-modal-body">
            <h4>Thank You, <span id="confirmGuestName">Guest</span>!</h4>
            <div id="confirmDetails" style="background:#f5f1ea; padding:15px; border-radius:8px; margin:20px 0;"></div>
            <button onclick="closeConfirmModal()" style="background:#0a4d4c; color:white; border:none; padding:10px 30px; border-radius:50px; cursor:pointer;">Close</button>
        </div>
    </div>
</div>
`;

// ================ INITIALIZATION ================
document.addEventListener('DOMContentLoaded', function() {
    console.log("Initializing...");
    
    initializeDatabase();
    
    if (!document.getElementById('bookingModal')) {
        document.body.insertAdjacentHTML('beforeend', bookingModalHTML);
    }
    
    setupDates();
    setupRealTimeValidation();
    setupContactFormValidation();
    setFacebookLink();
    
    updateAllRoomPrices();
    loadRoomAvailability();
    loadFacilities();
    loadFoodItems();
    loadGames();
    loadNearbyPlaces();
    loadRooms();
    
    const wasLoggedIn = sessionStorage.getItem('adminLoggedIn') === 'true';
    const loginModal = document.getElementById('adminLoginModal');
    const dashboard = document.getElementById('adminDashboard');
    
    if (wasLoggedIn && loginModal && dashboard) {
        loginModal.style.display = 'none';
        dashboard.style.display = 'block';
        loadAllAdminData();
    }
    
    // Update summary when dates change
    const checkIn = document.getElementById('modalCheckIn');
    const checkOut = document.getElementById('modalCheckOut');
    const guests = document.getElementById('modalGuests');
    const numRooms = document.getElementById('modalNumRooms');
    
    function updateSummary() {
        const ci = checkIn?.value;
        const co = checkOut?.value;
        const g = parseInt(guests?.value || 2);
        const nr = parseInt(numRooms?.value || 1);
        const prices = JSON.parse(localStorage.getItem('prices')) || { ac: 2500 };
        
        if (ci && co) {
            const nights = Math.ceil((new Date(co) - new Date(ci)) / (1000 * 60 * 60 * 24));
            if (nights > 0) {
                const total = g * prices.ac * nights * nr;
                document.getElementById('summaryDetails').innerHTML = `${g} guests, ${nights} nights, ${nr} room${nr > 1 ? 's' : ''}`;
                document.getElementById('summaryTotal').textContent = total;
            }
        }
    }
    
    if (checkIn) checkIn.addEventListener('change', updateSummary);
    if (checkOut) checkOut.addEventListener('change', updateSummary);
    if (guests) guests.addEventListener('change', updateSummary);
    if (numRooms) numRooms.addEventListener('change', updateSummary);
});

// ==================== NEARBY ATTRACTIONS MODAL ====================

// Attractions Data
const attractionsData = {
    "Sasawane Beach": {
        distance: "150 m from property (2 min walk)",
        description: "A pristine, less-crowded beach perfect for sunset walks. Clean sand, gentle waves, and local snack vendors selling corn and bhajiyas.",
        practical: "⏰ Open 24/7 | 💰 Free | 🅿️ Parking available",
        tip: "Best time is 5:00 PM - 6:30 PM for sunset. Try the local 'bhutta' (roasted corn) from beachside vendors.",
        tags: ["Beach", "Sunset", "Walking Distance"]
    },
    "Karmarkar Museum": {
        distance: "3 km from property",
        description: "A hidden gem showcasing the works of renowned sculptor Nanasaheb Karmarkar. Features beautiful marble and plaster statues.",
        practical: "⏰ Open: 10:00 AM - 5:30 PM (Closed Mondays) | 💰 Entry: ₹10 | 📞 +91 2141 297 113",
        tip: "Ask the caretaker for the backstory behind each sculpture — he's very knowledgeable!",
        tags: ["Museum", "Art", "Culture"]
    },
    "Mandwa Beach": {
        distance: "20 km from property (10 min cab)",
        description: "A beautiful and clean beach, easily accessible from Mumbai by ferry. On a clear day, you can enjoy a breathtaking view of the Gateway of India.",
        practical: "⏰ Ferry from Mumbai: 6 AM - 7 PM | 💰 Ferry: ~₹150-₹300 per person",
        tip: "Take the early morning ferry from Gateway of India to avoid crowds.",
        tags: ["Beach", "Ferry Access", "Water Sports"]
    },
    "Kihim Beach": {
        distance: "12 km from property (15 min cab)",
        description: "A serene coastal haven known for its dense coconut trees. A paradise for birdwatchers — Dr. Salim Ali's favorite retreat.",
        practical: "⏰ Open 24/7 | 💰 Free | 🚗 Taxi: ~₹300-₹400",
        tip: "Visit early morning for birdwatching — spot kingfishers and sunbirds.",
        tags: ["Beach", "Birdwatching", "Family Friendly"]
    },
    "Varsoli Beach": {
        distance: "2 km from property (25 min cab)",
        description: "A lively beach known for water sports and seafood shacks. Popular for its energetic vibe.",
        practical: "⏰ Open 24/7 | 💰 Free | 🚤 Water sports: ₹300-1000",
        tip: "Visit Sanman Restaurant for authentic Malvani seafood — bombil fry and solkadhi are legendary!",
        tags: ["Beach", "Water Sports", "Seafood"]
    },
    "Alibaug Fort & Beach": {
        distance: "3.5 km from property (25 min cab)",
        description: "A 17th-century sea fort built by Shivaji Maharaj. Accessible by foot during low tide or by boat during high tide.",
        practical: "⏰ Open: 6:00 AM - 6:00 PM | 💰 Entry: Free | 🚤 Boat: ₹50-100",
        tip: "Check tide timings before visiting. During low tide, you can walk from Alibaug beach to the fort.",
        tags: ["Fort", "Beach", "Historical"]
    },
    "Kankeshwar Temple": {
        distance: "4 km from property (15 min climb)",
        description: "A serene hilltop temple dedicated to Lord Shiva. The 300+ steps offer breathtaking views.",
        practical: "⏰ Open: 5:00 AM - 9:00 PM | 💰 Entry: Free",
        tip: "Visit early morning (before 7 AM) to avoid crowds and enjoy peaceful sunrise views.",
        tags: ["Temple", "Viewpoint", "Hilltop"]
    }
};

// Function to open modal with attraction details
function openAttraction(name) {
    const data = attractionsData[name];
    
    if (!data) {
        console.error("No data found for:", name);
        alert("Details for " + name + " will be added soon!");
        return;
    }
    
    const modal = document.getElementById('attractionModal');
    if (!modal) {
        console.error("Modal element not found!");
        return;
    }
    
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

// Function to close modal
function closeModal() {
    const modal = document.getElementById('attractionModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Close modal when clicking outside or on X button
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('attractionModal');
    if (modal) {
        // Close on X button click
        const closeBtn = document.querySelector('#attractionModal .close-modal');
        if (closeBtn) {
            closeBtn.onclick = closeModal;
        }
        
        // Close on outside click
        window.onclick = function(event) {
            if (event.target === modal) {
                closeModal();
            }
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
        
        // Update dots
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active-dot');
            } else {
                dot.classList.remove('active-dot');
            }
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
    
    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
    }
    
    // Event listeners
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });
    
    // Auto-slide every 5 seconds
    setInterval(nextSlide, 5000);
});