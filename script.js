// ================ DATA STORAGE (LocalStorage Database) ================
class StorageManager {
    constructor() {
        this.initStorage();
    }

    initStorage() {
        // Bookings
        if (!localStorage.getItem('bookings')) {
            localStorage.setItem('bookings', JSON.stringify([]));
        }

        // Rooms
        if (!localStorage.getItem('rooms')) {
            const defaultRooms = [
                { id: 1, number: '101', type: 'ac', price: 2500, status: 'available', currentGuest: null, checkIn: null, checkOut: null },
                { id: 2, number: '102', type: 'ac', price: 2500, status: 'available', currentGuest: null, checkIn: null, checkOut: null },
                { id: 3, number: '103', type: 'ac', price: 2500, status: 'available', currentGuest: null, checkIn: null, checkOut: null },
                { id: 4, number: '104', type: 'pet', price: 2500, status: 'available', currentGuest: null, checkIn: null, checkOut: null }
            ];
            localStorage.setItem('rooms', JSON.stringify(defaultRooms));
        }

        // Prices
        if (!localStorage.getItem('prices')) {
            localStorage.setItem('prices', JSON.stringify({ ac: 2500, pet: 2500 }));
        }

        // Food Items
        if (!localStorage.getItem('foodItems')) {
            const defaultFood = [
                { name: 'Fish Curry Rice', price: 250 },
                { name: 'Chicken Thali', price: 200 },
                { name: 'Kokani Special', price: 180 },
                { name: 'Prawns Masala', price: 350 },
                { name: 'Sol Kadhi', price: 50 }
            ];
            localStorage.setItem('foodItems', JSON.stringify(defaultFood));
        }
    }

    getBookings() {
        return JSON.parse(localStorage.getItem('bookings')) || [];
    }

    getRooms() {
        return JSON.parse(localStorage.getItem('rooms')) || [];
    }

    getPrices() {
        return JSON.parse(localStorage.getItem('prices')) || { ac: 2500, pet: 2500 };
    }

    getFoodItems() {
        return JSON.parse(localStorage.getItem('foodItems')) || [];
    }

    saveBooking(booking) {
        const bookings = this.getBookings();
        bookings.push(booking);
        localStorage.setItem('bookings', JSON.stringify(bookings));
    }

    updateRoomStatus(roomId, status, guestInfo = null) {
        const rooms = this.getRooms();
        const room = rooms.find(r => r.id === roomId);
        if (room) {
            room.status = status;
            if (guestInfo) {
                room.currentGuest = guestInfo.name;
                room.checkIn = guestInfo.checkIn;
                room.checkOut = guestInfo.checkOut;
            } else {
                room.currentGuest = null;
                room.checkIn = null;
                room.checkOut = null;
            }
            localStorage.setItem('rooms', JSON.stringify(rooms));
        }
    }

    savePrices(prices) {
        localStorage.setItem('prices', JSON.stringify(prices));
    }

    saveFoodItems(foodItems) {
        localStorage.setItem('foodItems', JSON.stringify(foodItems));
    }
}

const storage = new StorageManager();

// ================ SECTION NAVIGATION ================
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('onclick')?.includes(sectionId)) {
            link.classList.add('active');
        }
    });
    
    document.querySelector('.nav-menu')?.classList.remove('active');
    
    if (sectionId === 'rooms') {
        loadRooms();
    }
    if (sectionId === 'facilities') {
        updateFoodDisplay();
    }
    if (sectionId === 'nearby') {
        loadNearbyPlaces();
    }
}

// ================ LOAD NEARBY PLACES ================
function loadNearbyPlaces() {
    const nearbyGrid = document.getElementById('nearbyGrid');
    if (!nearbyGrid) return;
    
    const places = [
        { name: 'Sasawane Beach', distance: '2 min walk', icon: 'umbrella-beach' },
        { name: 'Karmarkar Museum', distance: '2 min walk', icon: 'university' },
        { name: 'Mandwa Beach', distance: '10 min cab', icon: 'water' },
        { name: 'Kihim Beach', distance: '15 min cab', icon: 'water' },
        { name: 'Varsoli Beach', distance: '25 min cab', icon: 'water' },
        { name: 'Alibaug Fort', distance: '25 min cab', icon: 'fort-awesome' },
        { name: 'Kankeshwar Temple', distance: '15 min climb', icon: 'hindu' }
    ];
    
    nearbyGrid.innerHTML = places.map(place => `
        <div class="nearby-card">
            <div class="nearby-icon">
                <i class="fas fa-${place.icon}"></i>
            </div>
            <div class="nearby-content">
                <h4>${place.name}</h4>
                <p><i class="fas fa-clock"></i> ${place.distance}</p>
            </div>
        </div>
    `).join('');
}

// ================ LOAD ROOMS ================
function loadRooms() {
    const roomsGrid = document.getElementById('roomsGrid');
    const availabilityGrid = document.getElementById('availabilityGrid');
    const prices = storage.getPrices();
    const rooms = storage.getRooms();
    
    if (roomsGrid) {
        roomsGrid.innerHTML = rooms.map(room => `
            <div class="room-card">
                <div class="room-image">
                    <i class="fas fa-${room.type === 'pet' ? 'paw' : 'snowflake'}"></i>
                    <div class="room-badge"><i class="fas fa-tag"></i> ₹${room.type === 'ac' ? prices.ac : prices.pet}</div>
                </div>
                <div class="room-content">
                    <h3 class="room-title">${room.type === 'ac' ? 'AC Room' : 'AC Room (Pet Friendly)'}</h3>
                    <div class="room-price">₹${room.type === 'ac' ? prices.ac : prices.pet}<span>/person</span></div>
                    <ul class="room-features">
                        <li><i class="fas fa-check"></i> Air Conditioned</li>
                        <li><i class="fas fa-check"></i> Flat Screen TV</li>
                        <li><i class="fas fa-check"></i> 24/7 Hot Water</li>
                        <li><i class="fas fa-check"></i> Free WiFi</li>
                        ${room.type === 'pet' ? '<li><i class="fas fa-paw"></i> Pets Allowed</li>' : ''}
                    </ul>
                    <div class="room-footer">
                        <span class="room-status ${room.status}">
                            <i class="fas fa-circle"></i> ${room.status === 'available' ? 'Available' : 'Occupied'}
                        </span>
                        <button class="btn btn-accent" onclick="openBookingModal('${room.type}')" ${room.status !== 'available' ? 'disabled' : ''}>
                            <i class="fas fa-calendar-check"></i> Book Now
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    if (availabilityGrid) {
        availabilityGrid.innerHTML = rooms.map(room => `
            <div class="room-availability-card">
                <strong>Room ${room.number}</strong><br>
                <small>${room.type === 'ac' ? 'AC' : 'Pet Friendly'}</small><br>
                <span class="available-badge">
                    <i class="fas fa-circle"></i> ${room.status}
                </span>
            </div>
        `).join('');
    }
}

// ================ UPDATE FOOD DISPLAY ================
function updateFoodDisplay() {
    const foodItems = storage.getFoodItems();
    const foodDisplay = document.getElementById('foodItemsDisplay');
    
    if (foodDisplay) {
        foodDisplay.innerHTML = foodItems.map(item => `
            <div class="food-item">
                <span>${item.name}</span>
                <span style="font-weight: 700; color: var(--coral);">₹${item.price}</span>
            </div>
        `).join('');
    }
    
    // Update admin panel food items
    loadFoodItemsAdmin();
}

// ================ LOAD FOOD ITEMS IN ADMIN PANEL ================
function loadFoodItemsAdmin() {
    const foodItems = storage.getFoodItems();
    const foodAdmin = document.getElementById('foodItemsAdmin');
    
    if (foodAdmin) {
        foodAdmin.innerHTML = foodItems.map((item, index) => `
            <div class="food-item-group" id="food-item-${index}">
                <input type="text" id="foodName${index}" value="${item.name}" placeholder="Food name">
                <input type="number" id="foodPrice${index}" value="${item.price}" min="10" max="1000" placeholder="Price">
                <button class="btn-remove-food" onclick="removeFoodItem(${index})">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `).join('');
    }
}

// ================ ADD NEW FOOD ITEM ================
function addNewFoodItem() {
    const foodItems = storage.getFoodItems();
    foodItems.push({ name: 'New Food Item', price: 100 });
    storage.saveFoodItems(foodItems);
    loadFoodItemsAdmin();
    updateFoodDisplay();
}

// ================ REMOVE FOOD ITEM ================
function removeFoodItem(index) {
    const foodItems = storage.getFoodItems();
    foodItems.splice(index, 1);
    storage.saveFoodItems(foodItems);
    loadFoodItemsAdmin();
    updateFoodDisplay();
}

// ================ UPDATE ALL PRICES ================
function updateAllPrices() {
    const prices = storage.getPrices();
    
    document.getElementById('heroPrice').textContent = `₹${prices.ac}`;
    document.getElementById('statPrice').textContent = `₹${Math.round(prices.ac/1000)}k`;
    document.getElementById('footerPrice').textContent = `₹${prices.ac}`;
    document.getElementById('acPriceDisplay').textContent = `₹${prices.ac}`;
    document.getElementById('petPriceDisplay').textContent = `₹${prices.pet}`;
    
    document.getElementById('acPrice').value = prices.ac;
    document.getElementById('petPrice').value = prices.pet;
}

// ================ DATE SETUP ================
function setupDates() {
    const today = new Date();
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 4);
    
    const todayStr = today.toISOString().split('T')[0];
    const maxDateStr = maxDate.toISOString().split('T')[0];
    
    const dateInputs = ['quickCheckIn', 'quickCheckOut', 'modalCheckIn', 'modalCheckOut'];
    dateInputs.forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.min = todayStr;
            input.max = maxDateStr;
        }
    });
    
    const checkIn = document.getElementById('quickCheckIn');
    const checkOut = document.getElementById('quickCheckOut');
    
    if (checkIn) checkIn.value = todayStr;
    if (checkOut) {
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        checkOut.value = tomorrow.toISOString().split('T')[0];
    }
}

// ================ BOOKING FUNCTIONS ================
function openBookingModal(roomType = 'ac') {
    document.getElementById('bookingModal').classList.add('active');
    document.getElementById('modalRoomType').value = roomType;
    setupDates();
    updateBookingSummary();
}

function closeModal() {
    document.getElementById('bookingModal').classList.remove('active');
}

function closeConfirmationModal() {
    document.getElementById('confirmationModal').classList.remove('active');
}

function updateBookingSummary() {
    const checkIn = document.getElementById('modalCheckIn').value;
    const checkOut = document.getElementById('modalCheckOut').value;
    const guests = parseInt(document.getElementById('modalGuests').value);
    const roomType = document.getElementById('modalRoomType').value;
    const prices = storage.getPrices();
    
    const roomPrice = roomType === 'ac' ? prices.ac : prices.pet;
    
    if (checkIn && checkOut) {
        const start = new Date(checkIn);
        const end = new Date(checkOut);
        const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        
        if (nights > 0) {
            const total = guests * roomPrice * nights;
            
            document.getElementById('bookingSummary').innerHTML = `
                <div class="summary-row">
                    <span>Room Type:</span>
                    <span>${roomType === 'ac' ? 'AC Room' : 'Pet Friendly'}</span>
                </div>
                <div class="summary-row">
                    <span>Price per person:</span>
                    <span>₹${roomPrice}</span>
                </div>
                <div class="summary-row">
                    <span>Nights:</span>
                    <span>${nights}</span>
                </div>
                <div class="summary-row">
                    <span>Guests:</span>
                    <span>${guests}</span>
                </div>
                <div class="summary-row total">
                    <span>Total:</span>
                    <span>₹${total}</span>
                </div>
            `;
        }
    }
}

function quickBook() {
    const checkIn = document.getElementById('quickCheckIn').value;
    const checkOut = document.getElementById('quickCheckOut').value;
    const guests = document.getElementById('quickGuests').value;
    const room = document.getElementById('quickRoom').value;
    
    if (!checkIn || !checkOut) {
        alert('Please select dates');
        return;
    }
    
    openBookingModal(room);
    
    document.getElementById('modalCheckIn').value = checkIn;
    document.getElementById('modalCheckOut').value = checkOut;
    document.getElementById('modalGuests').value = guests;
    updateBookingSummary();
}

function processBooking(e) {
    e.preventDefault();
    
    const bookingData = {
        id: 'BKG' + Date.now().toString().slice(-8),
        roomType: document.getElementById('modalRoomType').value,
        guests: parseInt(document.getElementById('modalGuests').value),
        checkIn: document.getElementById('modalCheckIn').value,
        checkOut: document.getElementById('modalCheckOut').value,
        guestName: document.getElementById('guestName').value,
        guestPhone: document.getElementById('guestPhone').value,
        guestEmail: document.getElementById('guestEmail').value,
        pet: document.getElementById('guestPet').value,
        specialRequests: document.getElementById('specialRequests').value,
        createdAt: new Date().toISOString()
    };
    
    if (!bookingData.guestName || !bookingData.guestPhone) {
        alert('Please fill required fields');
        return;
    }
    
    // Calculate total
    const prices = storage.getPrices();
    const roomPrice = bookingData.roomType === 'ac' ? prices.ac : prices.pet;
    const start = new Date(bookingData.checkIn);
    const end = new Date(bookingData.checkOut);
    const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    bookingData.nights = nights;
    bookingData.total = bookingData.guests * roomPrice * nights;
    
    // Save booking
    storage.saveBooking(bookingData);
    
    // Update room status
    const rooms = storage.getRooms();
    const availableRoom = rooms.find(r => r.type === bookingData.roomType && r.status === 'available');
    if (availableRoom) {
        storage.updateRoomStatus(availableRoom.id, 'occupied', {
            name: bookingData.guestName,
            checkIn: bookingData.checkIn,
            checkOut: bookingData.checkOut
        });
    }
    
    // Show confirmation
    document.getElementById('confirmGuestName').textContent = bookingData.guestName;
    document.getElementById('confirmationDetails').innerHTML = `
        <p><strong>Booking ID:</strong> ${bookingData.id}</p>
        <p><strong>Check-in:</strong> ${new Date(bookingData.checkIn).toLocaleDateString()}</p>
        <p><strong>Check-out:</strong> ${new Date(bookingData.checkOut).toLocaleDateString()}</p>
        <p><strong>Total:</strong> ₹${bookingData.total}</p>
    `;
    
    closeModal();
    document.getElementById('confirmationModal').classList.add('active');
    
    // Refresh displays
    loadRooms();
    if (document.getElementById('adminPanel').classList.contains('active')) {
        loadAdminData();
    }
}

// ================ ADMIN FUNCTIONS ================
let isAdminLoggedIn = false;

function showAdminLogin() {
    document.getElementById('adminLoginModal').classList.add('active');
}

function closeAdminLogin() {
    document.getElementById('adminLoginModal').classList.remove('active');
}

function checkAdminLogin() {
    const password = document.getElementById('adminPassword').value;
    if (password === 'admin123') {
        isAdminLoggedIn = true;
        closeAdminLogin();
        document.getElementById('adminPanel').classList.add('active');
        loadAdminData();
    } else {
        alert('Invalid password!');
    }
}

function logoutAdmin() {
    isAdminLoggedIn = false;
    document.getElementById('adminPanel').classList.remove('active');
}

function loadAdminData() {
    loadBookingsTable();
    loadRoomsTable();
    updateAllPrices();
    loadFoodItemsAdmin();
    
    const bookings = storage.getBookings();
    const rooms = storage.getRooms();
    
    document.getElementById('totalBookings').textContent = bookings.length;
    const totalRevenue = bookings.reduce((sum, b) => sum + (b.total || 0), 0);
    document.getElementById('totalRevenue').textContent = `₹${totalRevenue}`;
    document.getElementById('availableRooms').textContent = rooms.filter(r => r.status === 'available').length;
    document.getElementById('occupiedRooms').textContent = rooms.filter(r => r.status === 'occupied').length;
}

function loadBookingsTable() {
    const bookings = storage.getBookings();
    const tbody = document.getElementById('bookingsTableBody');
    
    if (bookings.length === 0) {
        tbody.innerHTML = '<tr><td colspan="10" style="text-align: center;">No bookings yet</td></tr>';
        return;
    }

    tbody.innerHTML = bookings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map(booking => `
        <tr>
            <td>${booking.id}</td>
            <td>${booking.guestName}</td>
            <td>${booking.guestPhone}</td>
            <td>${booking.roomType === 'ac' ? 'AC Room' : 'Pet Friendly'}</td>
            <td>${new Date(booking.checkIn).toLocaleDateString()}</td>
            <td>${new Date(booking.checkOut).toLocaleDateString()}</td>
            <td>${booking.guests}</td>
            <td>₹${booking.total}</td>
            <td><span class="status-badge confirmed">Confirmed</span></td>
            <td>
                <button class="btn btn-primary btn-sm" onclick="viewBookingDetails('${booking.id}')">
                    <i class="fas fa-eye"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

function loadRoomsTable() {
    const rooms = storage.getRooms();
    const prices = storage.getPrices();
    const tbody = document.getElementById('roomsTableBody');
    
    tbody.innerHTML = rooms.map(room => `
        <tr>
            <td>${room.number}</td>
            <td>${room.type === 'ac' ? 'AC Room' : 'Pet Friendly'}</td>
            <td>₹${room.type === 'ac' ? prices.ac : prices.pet}</td>
            <td><span class="status-badge ${room.status}">${room.status}</span></td>
            <td>${room.currentGuest || '-'}</td>
            <td>${room.checkIn ? new Date(room.checkIn).toLocaleDateString() : '-'}</td>
            <td>${room.checkOut ? new Date(room.checkOut).toLocaleDateString() : '-'}</td>
            <td>
                ${room.status === 'occupied' ? 
                    `<button class="btn btn-success btn-sm" onclick="checkOutRoom(${room.id})">
                        <i class="fas fa-sign-out-alt"></i> Check Out
                    </button>` : '-'}
            </td>
        </tr>
    `).join('');
}

function checkOutRoom(roomId) {
    storage.updateRoomStatus(roomId, 'available');
    loadRoomsTable();
    loadAdminData();
    loadRooms();
}

function viewBookingDetails(bookingId) {
    const bookings = storage.getBookings();
    const booking = bookings.find(b => b.id === bookingId);
    if (booking) {
        alert(`
Booking Details:
----------------
ID: ${booking.id}
Guest: ${booking.guestName}
Phone: ${booking.guestPhone}
Email: ${booking.guestEmail || 'Not provided'}
Room: ${booking.roomType === 'ac' ? 'AC Room' : 'Pet Friendly'}
Check-in: ${new Date(booking.checkIn).toLocaleDateString()}
Check-out: ${new Date(booking.checkOut).toLocaleDateString()}
Guests: ${booking.guests}
Nights: ${booking.nights}
Total: ₹${booking.total}
        `);
    }
}

function saveAdminChanges() {
    // Save prices
    const prices = {
        ac: parseInt(document.getElementById('acPrice').value),
        pet: parseInt(document.getElementById('petPrice').value)
    };
    storage.savePrices(prices);

    // Save food items
    const foodItems = [];
    const foodItemGroups = document.querySelectorAll('.food-item-group');
    foodItemGroups.forEach((group, index) => {
        const nameInput = group.querySelector('input[type="text"]');
        const priceInput = group.querySelector('input[type="number"]');
        if (nameInput && priceInput && nameInput.value.trim() !== '') {
            foodItems.push({ 
                name: nameInput.value, 
                price: parseInt(priceInput.value) 
            });
        }
    });
    storage.saveFoodItems(foodItems);

    updateAllPrices();
    updateFoodDisplay();
    loadRooms();
    alert('Changes saved successfully!');
}

function resetToDefault() {
    document.getElementById('acPrice').value = 2500;
    document.getElementById('petPrice').value = 2500;
    
    const defaultFood = [
        { name: 'Fish Curry Rice', price: 250 },
        { name: 'Chicken Thali', price: 200 },
        { name: 'Kokani Special', price: 180 },
        { name: 'Prawns Masala', price: 350 },
        { name: 'Sol Kadhi', price: 50 }
    ];
    
    storage.saveFoodItems(defaultFood);
    loadFoodItemsAdmin();
    updateFoodDisplay();
}

function switchAdminTab(tab) {
    document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    
    event.target.classList.add('active');
    document.getElementById(tab + 'Tab').classList.add('active');
}

// ================ UTILITIES ================
function toggleMenu() {
    document.querySelector('.nav-menu').classList.toggle('active');
}

// ================ EVENT LISTENERS ================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all data
    updateAllPrices();
    updateFoodDisplay();
    loadRooms();
    loadNearbyPlaces();
    setupDates();
    
    // Add event listeners for booking summary updates
    document.getElementById('modalCheckIn')?.addEventListener('change', updateBookingSummary);
    document.getElementById('modalCheckOut')?.addEventListener('change', updateBookingSummary);
    document.getElementById('modalGuests')?.addEventListener('change', updateBookingSummary);
    document.getElementById('modalRoomType')?.addEventListener('change', updateBookingSummary);
    
    // Show home section by default
    showSection('home');
});