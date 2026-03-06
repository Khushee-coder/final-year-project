// ================ COMPLETE WORKING SCRIPT.JS - WITH FACEBOOK LINK ================

// ================ ADMIN LOGIN FUNCTIONS ================

let isAdminLoggedIn = false;


// ================ INITIALIZE DATABASE WITH DEFAULT VALUES ================

function initializeDatabase() {
    console.log("Initializing database with default values...");
    
    // Initialize Food Items if not exists
    if (!localStorage.getItem('vegFoodItems')) {
        const defaultVegFood = [
            { id: 1, name: 'Veg Thali', description: 'Rice, dal, sabzi, roti, salad, sweet', price: 0, category: 'veg' },
            { id: 2, name: 'Dal Rice', description: 'Comfort food with ghee and papad', price: 0, category: 'veg' },
            { id: 3, name: 'Matar Paneer', description: 'Cottage cheese in rich tomato gravy', price: 0, category: 'veg' },
            { id: 4, name: 'Dry Sabzi', description: 'Seasonal vegetable stir-fry', price: 0, category: 'veg' },
            { id: 5, name: 'Sweet Salad', description: 'Fresh fruits with honey and nuts', price: 0, category: 'veg' }
        ];
        localStorage.setItem('vegFoodItems', JSON.stringify(defaultVegFood));
        console.log("✅ Veg food items initialized");
    }
    
    // Initialize Non-Veg Food Items if not exists
    if (!localStorage.getItem('nonVegFoodItems')) {
        const defaultNonVegFood = [
            { id: 1, name: 'Fish Curry Rice', description: 'Fresh catch with coastal spices', price: 0, category: 'nonveg' },
            { id: 2, name: 'Chicken Thali', description: 'Chicken curry, rice, roti, salad', price: 0, category: 'nonveg' },
            { id: 3, name: 'Prawns Masala', description: 'Spicy prawn gravy with rice', price: 0, category: 'nonveg' },
            { id: 4, name: 'Sol Kadhi', description: 'Kokam and coconut drink', price: 0, category: 'nonveg' },
            { id: 5, name: 'Kokani Special', description: 'Chef\'s special seafood delicacy', price: 0, category: 'nonveg' }
        ];
        localStorage.setItem('nonVegFoodItems', JSON.stringify(defaultNonVegFood));
        console.log("✅ Non-veg food items initialized");
    }
    
    // Initialize Facilities if not exists
    if (!localStorage.getItem('facilities')) {
        const defaultFacilities = [
            { id: 1, name: 'Swimming Pool', icon: 'swimming-pool', description: 'Clean and maintained pool' },
            { id: 2, name: 'In-house Restaurant', icon: 'utensils', description: 'Authentic local cuisine' },
            { id: 3, name: 'Car Parking', icon: 'parking', description: 'Secure parking space' },
            { id: 4, name: 'Free WiFi', icon: 'wifi', description: 'High-speed internet' },
            { id: 5, name: 'Power Backup', icon: 'bolt', description: 'Uninterrupted power' },
            { id: 6, name: 'Air Conditioning', icon: 'snowflake', description: 'All rooms AC' },
            { id: 7, name: 'Flat Screen TV', icon: 'tv', description: 'In every room' },
            { id: 8, name: '24/7 Hot Water', icon: 'hot-tub', description: 'Always available' }
        ];
        localStorage.setItem('facilities', JSON.stringify(defaultFacilities));
        console.log("✅ Facilities initialized");
    }
    
    // Initialize Nearby Places if not exists
    if (!localStorage.getItem('nearbyPlaces')) {
        const defaultNearby = [
            { 
                id: 1, 
                name: 'Sasawane Beach', 
                distance: '2 min walk', 
                image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&auto=format', 
                icon: 'umbrella-beach', 
                description: 'Beautiful beach just 150 meters from the villa',
                tags: ['Beach', 'Walking Distance']
            },
            { 
                id: 2, 
                name: 'Karmarkar Museum', 
                distance: '2 min walk', 
                image: 'https://images.unsplash.com/photo-1566127992631-137a642a4f2e?w=500&auto=format', 
                icon: 'university', 
                description: 'Famous art and sculpture museum',
                tags: ['Museum', 'Art']
            },
            { 
                id: 3, 
                name: 'Mandwa Beach', 
                distance: '10 min cab', 
                image: 'https://images.unsplash.com/photo-1519046904884-53103b34b689?w=500&auto=format', 
                icon: 'water', 
                description: 'Ferry terminal to Mumbai',
                tags: ['Beach', 'Ferry']
            },
            { 
                id: 4, 
                name: 'Kihim Beach', 
                distance: '15 min cab', 
                image: 'https://images.unsplash.com/photo-1520942702018-0862200e6873?w=500&auto=format', 
                icon: 'water', 
                description: 'Scenic beach with forest backdrop',
                tags: ['Beach', 'Scenic']
            },
            { 
                id: 5, 
                name: 'Varsoli Beach', 
                distance: '25 min cab', 
                image: 'https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?w=500&auto=format', 
                icon: 'water', 
                description: 'Peaceful and less crowded',
                tags: ['Beach', 'Peaceful']
            },
            { 
                id: 6, 
                name: 'Alibaug Fort', 
                distance: '25 min cab', 
                image: 'https://images.unsplash.com/photo-1591274402297-3e1c4b6a8a5b?w=500&auto=format', 
                icon: 'fort-awesome', 
                description: 'Historic sea fort',
                tags: ['Fort', 'History']
            },
            { 
                id: 7, 
                name: 'Kankeshwar Temple', 
                distance: '15 min climb', 
                image: 'https://images.unsplash.com/photo-1622115831926-0c1de1a04402?w=500&auto=format', 
                icon: 'hindu', 
                description: 'Hilltop temple with scenic views',
                tags: ['Temple', 'Scenic']
            }
        ];
        localStorage.setItem('nearbyPlaces', JSON.stringify(defaultNearby));
        console.log("✅ Nearby places initialized");
    }
    
    // Initialize Games if not exists
    if (!localStorage.getItem('games')) {
        const defaultGames = [
            { id: 1, name: 'Carrom', icon: 'chess-board', players: '2-4 Players' },
            { id: 2, name: 'Chess', icon: 'chess', players: '2 Players' },
            { id: 3, name: 'Bat & Ball', icon: 'baseball-ball', players: 'Outdoor' }
        ];
        localStorage.setItem('games', JSON.stringify(defaultGames));
        console.log("✅ Games initialized");
    }
}

function checkAdminLogin() {
    const password = document.getElementById('adminPassword')?.value;
    const loginModal = document.getElementById('adminLoginModal');
    const dashboard = document.getElementById('adminDashboard');
    
    if (password === 'admin123') {
        isAdminLoggedIn = true;
        
        if (loginModal) loginModal.style.display = 'none';
        if (dashboard) {
            dashboard.style.display = 'block';
            loadAllAdminData();
        }
        sessionStorage.setItem('adminLoggedIn', 'true');
    } else {
        alert('Invalid password! Use: admin123');
    }
}

function logoutAdmin() {
    isAdminLoggedIn = false;
    const loginModal = document.getElementById('adminLoginModal');
    const dashboard = document.getElementById('adminDashboard');
    
    if (loginModal) loginModal.style.display = 'flex';
    if (dashboard) dashboard.style.display = 'none';
    sessionStorage.removeItem('adminLoggedIn');
}

function goBackToSite() {
    window.location.href = 'index.html';
}

function switchAdminTab(tab) {
    document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
    event.target.classList.add('active');
    
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    
    const tabElement = document.getElementById(tab + 'Tab');
    if (tabElement) {
        tabElement.classList.add('active');
        
        if (tab === 'enquiries') loadEnquiriesData();
        else if (tab === 'bookings') loadBookingsData();
        else if (tab === 'rooms') loadRoomsData();
        else if (tab === 'prices') loadPricesData();
        else if (tab === 'vegfood') loadVegFoodItems();
        else if (tab === 'nonvegfood') loadNonVegFoodItems();
        else if (tab === 'facilities') loadFacilities();
        else if (tab === 'nearby') loadNearbyPlaces();
        else if (tab === 'games') loadGames();
        else if (tab === 'offline') loadOfflineBookingData();
    }
}

// ================ LOAD ALL ADMIN DATA ================

// ================ LOAD ALL ADMIN DATA ================

// ================ LOAD ALL ADMIN DATA ================

function loadAllAdminData() {
    console.log("📊 Loading all admin data...");
    
    // Load all data
    loadBookingsData();
    loadEnquiriesData();
    loadRoomsData();
    loadPricesData();
    loadVegFoodItems();      // ← This now loads 100+ items
    loadNonVegFoodItems();
    loadFacilities();
    loadNearbyPlaces();
    loadGames();
    loadOfflineBookingData();
}

// ================ BOOKING FORM VALIDATION FUNCTIONS ================

// Validate name (letters only)
function validateName(name) {
    if (!name || name.trim() === '') {
        return { isValid: false, message: 'Name is required' };
    }
    if (name.trim().length < 3) {
        return { isValid: false, message: 'Name must be at least 3 characters' };
    }
    if (!/^[A-Za-z\s]+$/.test(name.trim())) {
        return { isValid: false, message: 'Name can only contain letters and spaces' };
    }
    return { isValid: true, message: '' };
}

// Validate phone (10 digits, starts with 6-9)
function validatePhone(phone) {
    const cleaned = phone.replace(/\D/g, '');
    if (!phone || phone.trim() === '') {
        return { isValid: false, message: 'Phone number is required' };
    }
    if (cleaned.length !== 10) {
        return { isValid: false, message: 'Phone must be 10 digits' };
    }
    if (!/^[6-9]/.test(cleaned)) {
        return { isValid: false, message: 'Phone must start with 6,7,8 or 9' };
    }
    return { isValid: true, message: '', cleaned: cleaned };
}

// Validate email (format)
function validateEmail(email) {
    if (!email || email.trim() === '') {
        return { isValid: false, message: 'Email is required' };
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        return { isValid: false, message: 'Enter a valid email address' };
    }
    return { isValid: true, message: '' };
}

// Validate dates
function validateDates(checkIn, checkOut) {
    if (!checkIn || !checkOut) {
        return { isValid: false, message: 'Please select both check-in and check-out dates' };
    }
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const checkInDate = new Date(checkIn);
    checkInDate.setHours(0, 0, 0, 0);
    
    const checkOutDate = new Date(checkOut);
    checkOutDate.setHours(0, 0, 0, 0);
    
    if (checkInDate < today) {
        return { isValid: false, message: 'Check-in date cannot be in the past' };
    }
    
    if (checkOutDate <= checkInDate) {
        return { isValid: false, message: 'Check-out date must be after check-in date' };
    }
    
    const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
    if (nights > 30) {
        return { isValid: false, message: 'Booking cannot exceed 30 nights' };
    }
    
    return { isValid: true, message: '', nights: nights };
}

// Show error
function showError(inputId, message) {
    const input = document.getElementById(inputId);
    if (!input) return;
    
    const existingError = input.parentNode.querySelector('.error-message');
    if (existingError) existingError.remove();
    
    input.style.borderColor = '#f44336';
    input.style.borderWidth = '2px';
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.color = '#f44336';
    errorDiv.style.fontSize = '0.8rem';
    errorDiv.style.marginTop = '5px';
    errorDiv.innerHTML = '<i class="fas fa-exclamation-circle"></i> ' + message;
    
    input.parentNode.appendChild(errorDiv);
}

// Remove error
function removeError(inputId) {
    const input = document.getElementById(inputId);
    if (!input) return;
    
    input.style.borderColor = '';
    input.style.borderWidth = '';
    
    const error = input.parentNode.querySelector('.error-message');
    if (error) error.remove();
}

// Clear all errors
function clearAllErrors() {
    const errorInputs = ['guestName', 'guestPhone', 'guestEmail', 'modalCheckIn', 'modalCheckOut'];
    errorInputs.forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.style.borderColor = '';
            input.style.borderWidth = '';
            const error = input.parentNode.querySelector('.error-message');
            if (error) error.remove();
        }
    });
}

// Setup real-time validation for booking form
function setupBookingValidation() {
    const nameInput = document.getElementById('guestName');
    const phoneInput = document.getElementById('guestPhone');
    const emailInput = document.getElementById('guestEmail');
    
    if (nameInput) {
        nameInput.addEventListener('input', function() {
            this.value = this.value.replace(/[^A-Za-z\s]/g, '');
            const validation = validateName(this.value);
            if (!validation.isValid && this.value.trim() !== '') {
                showError('guestName', validation.message);
            } else {
                removeError('guestName');
            }
        });
    }
    
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            this.value = this.value.replace(/[^0-9]/g, '').slice(0, 10);
            const validation = validatePhone(this.value);
            if (!validation.isValid && this.value.trim() !== '') {
                showError('guestPhone', validation.message);
            } else {
                removeError('guestPhone');
            }
        });
    }
    
    if (emailInput) {
        emailInput.addEventListener('input', function() {
            if (this.value.trim() !== '') {
                const validation = validateEmail(this.value);
                if (!validation.isValid) {
                    showError('guestEmail', validation.message);
                } else {
                    removeError('guestEmail');
                }
            } else {
                removeError('guestEmail');
            }
        });
    }
}

// ================ CONTACT FORM VALIDATION FUNCTIONS ================

function validateContactName(name) {
    if (!name || name.trim() === '') {
        return { isValid: false, message: 'Name is required' };
    }
    if (name.trim().length < 3) {
        return { isValid: false, message: 'Name must be at least 3 characters' };
    }
    if (!/^[A-Za-z\s]+$/.test(name.trim())) {
        return { isValid: false, message: 'Name can only contain letters and spaces' };
    }
    return { isValid: true, message: '' };
}

function validateContactEmail(email) {
    if (!email || email.trim() === '') {
        return { isValid: false, message: 'Email is required' };
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        return { isValid: false, message: 'Enter a valid email address' };
    }
    return { isValid: true, message: '' };
}

function validateContactPhone(phone) {
    if (!phone || phone.trim() === '') {
        return { isValid: true, message: '' };
    }
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length !== 10) {
        return { isValid: false, message: 'Phone must be 10 digits' };
    }
    if (!/^[6-9]/.test(cleaned)) {
        return { isValid: false, message: 'Phone must start with 6,7,8 or 9' };
    }
    return { isValid: true, message: '', cleaned: cleaned };
}

function validateContactSubject(subject) {
    if (!subject || subject.trim() === '') {
        return { isValid: false, message: 'Subject is required' };
    }
    if (subject.trim().length < 5) {
        return { isValid: false, message: 'Subject must be at least 5 characters' };
    }
    return { isValid: true, message: '' };
}

function validateContactMessage(message) {
    if (!message || message.trim() === '') {
        return { isValid: false, message: 'Message is required' };
    }
    if (message.trim().length < 10) {
        return { isValid: false, message: 'Message must be at least 10 characters' };
    }
    return { isValid: true, message: '' };
}

function showContactError(inputId, message) {
    const input = document.getElementById(inputId);
    const errorDiv = document.getElementById(inputId + 'Error');
    
    if (!input || !errorDiv) return;
    
    input.style.borderColor = '#f44336';
    input.style.borderWidth = '2px';
    errorDiv.innerHTML = '<i class="fas fa-exclamation-circle"></i> ' + message;
    errorDiv.style.display = 'block';
}

function removeContactError(inputId) {
    const input = document.getElementById(inputId);
    const errorDiv = document.getElementById(inputId + 'Error');
    
    if (!input || !errorDiv) return;
    
    input.style.borderColor = '';
    input.style.borderWidth = '';
    errorDiv.style.display = 'none';
}

function setupContactFormValidation() {
    const nameInput = document.getElementById('contactName');
    const emailInput = document.getElementById('contactEmail');
    const phoneInput = document.getElementById('contactPhone');
    const subjectInput = document.getElementById('contactSubject');
    const messageInput = document.getElementById('contactMessage');
    
    if (nameInput) {
        nameInput.addEventListener('input', function() {
            this.value = this.value.replace(/[^A-Za-z\s]/g, '');
            const validation = validateContactName(this.value);
            if (!validation.isValid && this.value.trim() !== '') {
                showContactError('contactName', validation.message);
            } else {
                removeContactError('contactName');
            }
        });
    }
    
    if (emailInput) {
        emailInput.addEventListener('input', function() {
            const validation = validateContactEmail(this.value);
            if (!validation.isValid && this.value.trim() !== '') {
                showContactError('contactEmail', validation.message);
            } else {
                removeContactError('contactEmail');
            }
        });
    }
    
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            this.value = this.value.replace(/[^0-9]/g, '').slice(0, 10);
            if (this.value.length > 0) {
                const validation = validateContactPhone(this.value);
                if (!validation.isValid) {
                    showContactError('contactPhone', validation.message);
                } else {
                    removeContactError('contactPhone');
                }
            } else {
                removeContactError('contactPhone');
            }
        });
    }
    
    if (subjectInput) {
        subjectInput.addEventListener('input', function() {
            const validation = validateContactSubject(this.value);
            if (!validation.isValid && this.value.trim() !== '') {
                showContactError('contactSubject', validation.message);
            } else {
                removeContactError('contactSubject');
            }
        });
    }
    
    if (messageInput) {
        messageInput.addEventListener('input', function() {
            const validation = validateContactMessage(this.value);
            if (!validation.isValid && this.value.trim() !== '') {
                showContactError('contactMessage', validation.message);
            } else {
                removeContactError('contactMessage');
            }
        });
    }
}

// ================ ENQUIRY STORAGE & SUBMISSION ================
// ================ CHECK ENQUIRY STORAGE ================

function checkEnquiryStorage() {
    const enquiries = JSON.parse(localStorage.getItem('enquiries')) || [];
    console.log("📋 Enquiries in storage:", enquiries);
    alert(`Found ${enquiries.length} enquiries in storage. Check console for details.`);
}

// ================ FIXED CONTACT FORM SUBMISSION ================

function submitContactForm(event) {
    event.preventDefault();
    
    console.log("📝 Contact form submitted - Saving to database...");
    
    // Get form values
    const name = document.getElementById('contactName')?.value;
    const email = document.getElementById('contactEmail')?.value;
    const phone = document.getElementById('contactPhone')?.value;
    const subject = document.getElementById('contactSubject')?.value;
    const message = document.getElementById('contactMessage')?.value;
    
    // Simple validation
    if (!name || !email || !subject || !message) {
        alert('Please fill all required fields');
        return false;
    }
    
    // Create enquiry object with unique ID
    const enquiry = {
        id: 'ENQ' + Date.now().toString().slice(-8),
        name: name.trim(),
        email: email.trim(),
        phone: phone ? phone.trim() : 'Not provided',
        subject: subject.trim(),
        message: message.trim(),
        date: new Date().toISOString(),
        status: 'pending'
    };
    
    console.log("💾 Saving enquiry:", enquiry);
    
    // Get existing enquiries from localStorage
    let enquiries = JSON.parse(localStorage.getItem('enquiries')) || [];
    console.log("📋 Existing enquiries:", enquiries.length);
    
    // Add new enquiry
    enquiries.push(enquiry);
    
    // Save back to localStorage
    localStorage.setItem('enquiries', JSON.stringify(enquiries));
    console.log("✅ Total enquiries now:", enquiries.length);
    
    // Show success message
    alert('Thank you! Your message has been sent successfully.');
    
    // Reset form
    document.getElementById('contactForm').reset();
    
    // Show success message
    const form = document.getElementById('contactForm');
    const successMsg = document.getElementById('contactSuccessMessage');
    
    if (form) form.style.display = 'none';
    if (successMsg) successMsg.style.display = 'block';
    
    setTimeout(() => {
        if (form) form.style.display = 'block';
        if (successMsg) successMsg.style.display = 'none';
    }, 3000);
    
    return false;
}

// ================ MULTI-ROOM BOOKING FUNCTIONS ================

// ================ UPDATED CHECK OUT ROOM ================

function checkOutRoom(roomNumber) {
    if (!confirm(`Are you sure you want to check out Room ${roomNumber}?`)) return;
    
    const rooms = JSON.parse(localStorage.getItem('rooms')) || [];
    const room = rooms.find(r => r.number === roomNumber);
    
    if (room) {
        room.status = 'available';
        room.guest = null;
        room.checkIn = null;
        room.checkOut = null;
        
        localStorage.setItem('rooms', JSON.stringify(rooms));
        loadAllAdminData(); // Refresh all admin data
        alert(`Room ${roomNumber} is now available`);
    }
}

function updateMultiRoomSummary() {
    const checkIn = document.getElementById('modalCheckIn')?.value;
    const checkOut = document.getElementById('modalCheckOut')?.value;
    const guests = parseInt(document.getElementById('modalGuests')?.value || 2);
    const roomType = document.getElementById('modalRoomType')?.value || 'ac';
    const numRooms = parseInt(document.getElementById('modalNumRooms')?.value || 1);
    
    const prices = JSON.parse(localStorage.getItem('prices')) || { ac: 2500, pet: 2500 };
    const roomPrice = roomType === 'ac' ? prices.ac : prices.pet;
    
    if (checkIn && checkOut) {
        const start = new Date(checkIn);
        const end = new Date(checkOut);
        const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        
        if (nights > 0) {
            const total = guests * roomPrice * nights * numRooms;
            
            const summaryRoom = document.getElementById('summaryRoom');
            const summaryDates = document.getElementById('summaryDates');
            const summaryGuests = document.getElementById('summaryGuests');
            const summaryNights = document.getElementById('summaryNights');
            const summaryRooms = document.getElementById('summaryRooms');
            const summaryTotal = document.getElementById('summaryTotal');
            
            if (summaryRoom) summaryRoom.textContent = roomType === 'ac' ? 'AC Room' : 'Pet Friendly Room';
            if (summaryDates) summaryDates.innerHTML = `${new Date(checkIn).toLocaleDateString()} - ${new Date(checkOut).toLocaleDateString()}`;
            if (summaryGuests) summaryGuests.textContent = guests;
            if (summaryNights) summaryNights.textContent = nights;
            if (summaryRooms) summaryRooms.textContent = numRooms;
            if (summaryTotal) summaryTotal.textContent = total;
        }
    }
}

function processMultiRoomBooking(event) {
    event.preventDefault();
    
    clearAllErrors();
    
    let isValid = true;
    
    const name = document.getElementById('guestName')?.value || '';
    const phone = document.getElementById('guestPhone')?.value || '';
    const email = document.getElementById('guestEmail')?.value || '';
    const guests = document.getElementById('modalGuests')?.value;
    const checkIn = document.getElementById('modalCheckIn')?.value;
    const checkOut = document.getElementById('modalCheckOut')?.value;
    const roomType = document.getElementById('modalRoomType')?.value;
    const numRooms = parseInt(document.getElementById('modalNumRooms')?.value || 1);
    
    const nameValidation = validateName(name);
    if (!nameValidation.isValid) {
        showError('guestName', nameValidation.message);
        isValid = false;
    }
    
    const phoneValidation = validatePhone(phone);
    if (!phoneValidation.isValid) {
        showError('guestPhone', phoneValidation.message);
        isValid = false;
    }
    
    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
        showError('guestEmail', emailValidation.message);
        isValid = false;
    }
    
    const datesValidation = validateDates(checkIn, checkOut);
    if (!datesValidation.isValid) {
        showError('modalCheckIn', datesValidation.message);
        isValid = false;
    }
    
    if (!isValid) {
        const firstError = document.querySelector('[style*="border-color: #f44336"]');
        if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
    }
    
    const prices = JSON.parse(localStorage.getItem('prices')) || { ac: 2500, pet: 2500 };
    const roomPrice = roomType === 'ac' ? prices.ac : prices.pet;
    const nights = datesValidation.nights || 1;
    const total = parseInt(guests) * roomPrice * nights * numRooms;
    
    const rooms = JSON.parse(localStorage.getItem('rooms')) || [
        { number: '101', type: 'ac', status: 'available', guest: null },
        { number: '102', type: 'ac', status: 'available', guest: null },
        { number: '103', type: 'ac', status: 'available', guest: null },
        { number: '104', type: 'pet', status: 'available', guest: null }
    ];
    
    const availableRooms = rooms.filter(r => r.type === roomType && r.status === 'available');
    
    if (availableRooms.length < numRooms) {
        alert(`Only ${availableRooms.length} rooms of this type are available. Please reduce the number of rooms.`);
        return;
    }
    
    for (let i = 0; i < numRooms; i++) {
        availableRooms[i].status = 'occupied';
        availableRooms[i].guest = name.trim();
        availableRooms[i].checkIn = checkIn;
        availableRooms[i].checkOut = checkOut;
    }
    localStorage.setItem('rooms', JSON.stringify(rooms));
    
    const booking = {
        id: 'BKG' + Date.now().toString().slice(-8),
        guestName: name.trim(),
        guestPhone: phone.replace(/\D/g, ''),
        guestEmail: email,
        roomType: roomType,
        numRooms: numRooms,
        guests: parseInt(guests),
        checkIn: checkIn,
        checkOut: checkOut,
        nights: nights,
        total: total,
        date: new Date().toISOString()
    };
    
    const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    bookings.push(booking);
    localStorage.setItem('bookings', JSON.stringify(bookings));
    
    closeBookingModal();
    
    document.getElementById('confirmGuestName').textContent = name.trim();
    document.getElementById('confirmDetails').innerHTML = `
        <p><strong>Booking ID:</strong> ${booking.id}</p>
        <p><strong>Name:</strong> ${name.trim()}</p>
        <p><strong>Phone:</strong> ${phone.replace(/\D/g, '')}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Room Type:</strong> ${roomType === 'ac' ? 'AC Room' : 'Pet Friendly'}</p>
        <p><strong>Rooms:</strong> ${numRooms}</p>
        <p><strong>Guests:</strong> ${guests}</p>
        <p><strong>Check-in:</strong> ${new Date(checkIn).toLocaleDateString()}</p>
        <p><strong>Check-out:</strong> ${new Date(checkOut).toLocaleDateString()}</p>
        <p><strong>Nights:</strong> ${nights}</p>
        <p><strong>Total:</strong> ₹${total}</p>
    `;
    document.getElementById('confirmModal').classList.add('active');
}

// ================ ENQUIRIES MANAGEMENT ================

// ================ FIXED LOAD ENQUIRIES DATA ================

function loadEnquiriesData() {
    console.log("📊 Loading enquiries from database...");
    
    const enquiries = JSON.parse(localStorage.getItem('enquiries')) || [];
    console.log("📋 Enquiries found:", enquiries.length);
    
    // Update stats
    const totalEnquiries = document.getElementById('totalEnquiries');
    if (totalEnquiries) {
        totalEnquiries.textContent = enquiries.length;
    }
    
    const container = document.getElementById('enquiriesList');
    if (!container) {
        console.log("❌ Enquiries container not found");
        return;
    }
    
    if (enquiries.length === 0) {
        container.innerHTML = `<div class="empty-state" style="text-align: center; padding: 40px; background: white; border-radius: 8px;">
            <i class="fas fa-envelope-open" style="font-size: 3rem; color: #f5e6d3; margin-bottom: 15px;"></i>
            <p style="color: #8b8a88;">No enquiries yet. Submit a message from the contact page to see it here.</p>
        </div>`;
        return;
    }
    
    // Sort by date (newest first)
    enquiries.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    let html = '';
    enquiries.forEach((enquiry, index) => {
        html += `<div class="enquiry-card" style="background: white; border-radius: 8px; padding: 20px; margin-bottom: 20px; border-left: 4px solid #ff9800; box-shadow: 0 2px 5px rgba(0,0,0,0.05);">
            <div style="display: grid; grid-template-columns: 2fr 3fr 1fr; gap: 20px;">
                <div>
                    <h4 style="margin: 0 0 10px; color: #0a4d4c;">${enquiry.name}</h4>
                    <p style="margin: 5px 0;"><i class="fas fa-envelope" style="color: #ff8a7a; width: 20px;"></i> ${enquiry.email}</p>
                    <p style="margin: 5px 0;"><i class="fas fa-phone" style="color: #ff8a7a; width: 20px;"></i> ${enquiry.phone}</p>
                    <p style="margin: 5px 0; font-size: 0.85rem; color: #8b8a88;">
                        <i class="fas fa-clock" style="color: #ff8a7a; width: 20px;"></i> ${new Date(enquiry.date).toLocaleString()}
                    </p>
                </div>
                <div>
                    <h4 style="margin: 0 0 10px; color: #0a4d4c;">${enquiry.subject}</h4>
                    <p style="margin: 0 0 10px; background: #f5f1ea; padding: 15px; border-radius: 8px;">${enquiry.message}</p>
                </div>
                <div style="text-align: right;">
                    <button onclick="deleteEnquiry('${enquiry.id}')" style="padding: 8px 16px; background:#f44336; color:white; border:none; border-radius:4px; cursor:pointer;">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        </div>`;
    });
    
    container.innerHTML = html;
}

// ================ BOOKINGS MANAGEMENT ================

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
            <td>${b.roomType}</td>
            <td>${b.numRooms}</td>
            <td>${b.checkIn}</td>
            <td>${b.checkOut}</td>
            <td>₹${b.total}</td>
            <td><button onclick="deleteBooking('${b.id}')">Delete</button></td>
        </tr>`;
    });
    
    document.getElementById('bookingsTable').innerHTML = html;
    document.getElementById('totalRevenue').textContent = `₹${totalRevenue}`;
}

function deleteBooking(id) {
    let bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    bookings = bookings.filter(b => b.id != id);
    localStorage.setItem('bookings', JSON.stringify(bookings));
    loadAllAdminData();
}
// ================ REFRESH ENQUIRIES ================

function refreshEnquiries() {
    console.log("🔄 Refreshing enquiries...");
    loadEnquiriesData();
}

// ================ ROOMS MANAGEMENT ================

// ================ LOAD ROOMS FOR FRONT END ================

function loadRooms() {
    const roomsGrid = document.getElementById('roomsGrid');
    const availabilityGrid = document.getElementById('availabilityGrid');
    
    if (!roomsGrid && !availabilityGrid) return;
    
    const rooms = JSON.parse(localStorage.getItem('rooms')) || [
        { number: '101', type: 'ac', status: 'available', guest: null, checkIn: null, checkOut: null },
        { number: '102', type: 'ac', status: 'available', guest: null, checkIn: null, checkOut: null },
        { number: '103', type: 'ac', status: 'available', guest: null, checkIn: null, checkOut: null },
        { number: '104', type: 'pet', status: 'available', guest: null, checkIn: null, checkOut: null }
    ];
    
    const prices = JSON.parse(localStorage.getItem('prices')) || { ac: 2500, pet: 2500 };
    
    if (roomsGrid) {
        roomsGrid.innerHTML = rooms.map(room => `
            <div class="room-card" data-type="${room.type}">
                <div class="room-image" style="background: linear-gradient(135deg, #0a4d4c, #1e7a76); display: flex; align-items: center; justify-content: center;">
                    <i class="fas fa-${room.type === 'pet' ? 'paw' : 'snowflake'}"></i>
                </div>
                <div class="room-content">
                    <h3 class="room-title">${room.type === 'ac' ? 'AC Room' : 'Pet Friendly Room'} - ${room.number}</h3>
                    <div class="room-price">₹${room.type === 'ac' ? prices.ac : prices.pet}<span>/person</span></div>
                    <ul class="room-features">
                        <li><i class="fas fa-check"></i> Air Conditioned</li>
                        <li><i class="fas fa-check"></i> Flat Screen TV</li>
                        <li><i class="fas fa-check"></i> 24/7 Hot Water</li>
                        <li><i class="fas fa-check"></i> Free WiFi</li>
                        ${room.type === 'pet' ? '<li><i class="fas fa-paw"></i> Pets Allowed</li>' : ''}
                        <li><i class="fas fa-utensils"></i> Meals Included</li>
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
                <span style="color: ${room.status === 'available' ? '#4caf50' : '#f44336'}; font-weight: 600;">
                    <i class="fas fa-circle"></i> ${room.status}
                </span>
            </div>
        `).join('');
    }
}

// Call loadRooms when the rooms page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM loaded - initializing...");
    
    // Initialize database with default values
    initializeDatabase();
    
    // Setup booking form
    setupDates();
    setupRealTimeValidation();
    
    // Make sure steps are initially hidden except step 1
    document.querySelectorAll('.step').forEach((step, index) => {
        if (index === 0) {
            step.style.display = 'block';
        } else {
            step.style.display = 'none';
        }
    });
    
    // Initialize progress steps
    document.querySelectorAll('.progress-step').forEach((step, index) => {
        step.classList.remove('active', 'completed');
        if (index === 0) {
            step.classList.add('active');
        }
    });
    
    // Set initial button states
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    
    if (prevBtn) prevBtn.style.display = 'none';
    if (nextBtn) nextBtn.style.display = 'block';
    if (submitBtn) submitBtn.style.display = 'none';
    
    // Load rooms if on rooms page
    if (document.getElementById('roomsGrid')) {
        loadRooms();
    }
    
    // Check login state
    const wasLoggedIn = sessionStorage.getItem('adminLoggedIn') === 'true';
    const loginModal = document.getElementById('adminLoginModal');
    const dashboard = document.getElementById('adminDashboard');
    
    if (wasLoggedIn && loginModal && dashboard) {
        loginModal.style.display = 'none';
        dashboard.style.display = 'block';
        loadAllAdminData();
    }
    
    // Set Facebook link
    const facebookLink = document.getElementById('facebookLink');
    if (facebookLink) {
        facebookLink.href = 'https://www.facebook.com/search/top?q=Swami%20Holiday%20Home%20Alibag';
    }
});
// ================ PRICES MANAGEMENT ================

function loadPricesData() {
    const prices = JSON.parse(localStorage.getItem('prices')) || { ac: 2500, pet: 2500 };
    document.getElementById('acPrice').value = prices.ac;
    document.getElementById('petPrice').value = prices.pet;
}

function savePrices() {
    const prices = {
        ac: parseInt(document.getElementById('acPrice').value),
        pet: parseInt(document.getElementById('petPrice').value)
    };
    localStorage.setItem('prices', JSON.stringify(prices));
    alert('Prices saved!');
}

// ================ VEG FOOD MANAGEMENT ================

// ================ VEG FOOD MANAGEMENT - COMPLETE MENU ================

function loadVegFoodItems() {
    console.log("Loading veg food items...");
    
    // Get items from localStorage
    let items = JSON.parse(localStorage.getItem('vegFoodItems'));
    
    // If no items exist, initialize with COMPLETE menu
    if (!items || items.length === 0) {
        const defaultVegFood = [
            // Main Course - Thalis
            { id: 1, name: 'Special Veg Thali', description: 'Rice, dal, 2 sabzi, roti, salad, sweet, papad', price: 0, category: 'veg' },
            { id: 2, name: 'Regular Veg Thali', description: 'Rice, dal, sabzi, roti, salad', price: 0, category: 'veg' },
            
            // Breads
            { id: 3, name: 'Tawa Chapati', description: 'Soft whole wheat chapati', price: 0, category: 'veg' },
            { id: 4, name: 'Butter Chapati', description: 'Chapati with butter', price: 0, category: 'veg' },
            { id: 5, name: 'Plain Naan', description: 'Tandoori bread', price: 0, category: 'veg' },
            { id: 6, name: 'Butter Naan', description: 'Naan with butter', price: 0, category: 'veg' },
            { id: 7, name: 'Garlic Naan', description: 'Naan with garlic butter', price: 0, category: 'veg' },
            { id: 8, name: 'Tandoori Roti', description: 'Whole wheat tandoori bread', price: 0, category: 'veg' },
            { id: 9, name: 'Paratha', description: 'Layered flatbread', price: 0, category: 'veg' },
            { id: 10, name: 'Laccha Paratha', description: 'Crispy layered paratha', price: 0, category: 'veg' },
            { id: 11, name: 'Pudina Paratha', description: 'Mint flavored paratha', price: 0, category: 'veg' },
            { id: 12, name: 'Aloo Paratha', description: 'Potato stuffed paratha', price: 0, category: 'veg' },
            { id: 13, name: 'Gobi Paratha', description: 'Cauliflower stuffed paratha', price: 0, category: 'veg' },
            { id: 14, name: 'Paneer Paratha', description: 'Paneer stuffed paratha', price: 0, category: 'veg' },
            { id: 15, name: 'Kulcha', description: 'Soft leavened bread', price: 0, category: 'veg' },
            { id: 16, name: 'Amritsari Kulcha', description: 'Stuffed kulcha', price: 0, category: 'veg' },
            { id: 17, name: 'Puri', description: 'Deep-fried bread', price: 0, category: 'veg' },
            { id: 18, name: 'Bhatura', description: 'Deep-fried leavened bread', price: 0, category: 'veg' },
            
            // Rice Dishes
            { id: 19, name: 'Steamed Rice', description: 'Plain basmati rice', price: 0, category: 'veg' },
            { id: 20, name: 'Jeera Rice', description: 'Rice tempered with cumin', price: 0, category: 'veg' },
            { id: 21, name: 'Peas Pulao', description: 'Rice with peas and spices', price: 0, category: 'veg' },
            { id: 22, name: 'Veg Pulao', description: 'Rice with mixed vegetables', price: 0, category: 'veg' },
            { id: 23, name: 'Veg Biryani', description: 'Spiced rice with vegetables', price: 0, category: 'veg' },
            { id: 24, name: 'Curd Rice', description: 'Rice with yogurt', price: 0, category: 'veg' },
            { id: 25, name: 'Lemon Rice', description: 'Rice with lemon and peanuts', price: 0, category: 'veg' },
            { id: 26, name: 'Tomato Rice', description: 'Rice with tomato flavor', price: 0, category: 'veg' },
            { id: 27, name: 'Coconut Rice', description: 'Rice with coconut', price: 0, category: 'veg' },
            { id: 28, name: 'Khichdi', description: 'Rice and lentil porridge', price: 0, category: 'veg' },
            
            // Dal (Lentils)
            { id: 29, name: 'Plain Dal', description: 'Simple cooked lentils', price: 0, category: 'veg' },
            { id: 30, name: 'Dal Fry', description: 'Tempered lentils', price: 0, category: 'veg' },
            { id: 31, name: 'Dal Tadka', description: 'Lentils with garlic tempering', price: 0, category: 'veg' },
            { id: 32, name: 'Dal Makhani', description: 'Creamy black lentils', price: 0, category: 'veg' },
            { id: 33, name: 'Dal Bukhara', description: 'Slow-cooked black lentils', price: 0, category: 'veg' },
            { id: 34, name: 'Panchmel Dal', description: 'Five lentil mix', price: 0, category: 'veg' },
            { id: 35, name: 'Gujarati Dal', description: 'Sweet and sour lentils', price: 0, category: 'veg' },
            { id: 36, name: 'Rajasthani Dal', description: 'Spiced lentils', price: 0, category: 'veg' },
            { id: 37, name: 'Sambar', description: 'Lentil and vegetable stew', price: 0, category: 'veg' },
            { id: 38, name: 'Rasam', description: 'Tangy pepper soup', price: 0, category: 'veg' },
            
            // Paneer Dishes
            { id: 39, name: 'Paneer Bhaji', description: 'Cottage cheese in spiced gravy', price: 0, category: 'veg' },
            { id: 40, name: 'Paneer Butter Masala', description: 'Paneer in rich tomato gravy', price: 0, category: 'veg' },
            { id: 41, name: 'Shahi Paneer', description: 'Royal paneer in creamy gravy', price: 0, category: 'veg' },
            { id: 42, name: 'Kadai Paneer', description: 'Paneer with bell peppers', price: 0, category: 'veg' },
            { id: 43, name: 'Palak Paneer', description: 'Paneer in spinach gravy', price: 0, category: 'veg' },
            { id: 44, name: 'Matar Paneer', description: 'Paneer with peas', price: 0, category: 'veg' },
            { id: 45, name: 'Paneer Tikka Masala', description: 'Grilled paneer in gravy', price: 0, category: 'veg' },
            { id: 46, name: 'Paneer Lababdar', description: 'Rich paneer gravy', price: 0, category: 'veg' },
            { id: 47, name: 'Paneer Pasanda', description: 'Stuffed paneer in gravy', price: 0, category: 'veg' },
            { id: 48, name: 'Paneer Kolhapuri', description: 'Spicy paneer curry', price: 0, category: 'veg' },
            { id: 49, name: 'Paneer Handi', description: 'Paneer cooked in handi', price: 0, category: 'veg' },
            { id: 50, name: 'Paneer Do Pyaza', description: 'Paneer with double onions', price: 0, category: 'veg' },
            { id: 51, name: 'Paneer Jalfrezi', description: 'Paneer with mixed vegetables', price: 0, category: 'veg' },
            { id: 52, name: 'Paneer Bhurji', description: 'Scrambled paneer', price: 0, category: 'veg' },
            { id: 53, name: 'Paneer Chilli', description: 'Indo-Chinese style paneer', price: 0, category: 'veg' },
            
            // Vegetable Dishes
            { id: 54, name: 'Aloo Gobi', description: 'Potato and cauliflower', price: 0, category: 'veg' },
            { id: 55, name: 'Aloo Matar', description: 'Potato and peas', price: 0, category: 'veg' },
            { id: 56, name: 'Aloo Jeera', description: 'Potato with cumin', price: 0, category: 'veg' },
            { id: 57, name: 'Aloo Palak', description: 'Potato in spinach', price: 0, category: 'veg' },
            { id: 58, name: 'Dum Aloo', description: 'Spiced baby potatoes', price: 0, category: 'veg' },
            { id: 59, name: 'Aloo Methi', description: 'Potato with fenugreek', price: 0, category: 'veg' },
            { id: 60, name: 'Baingan Bharta', description: 'Roasted eggplant mash', price: 0, category: 'veg' },
            { id: 61, name: 'Baingan Masala', description: 'Eggplant curry', price: 0, category: 'veg' },
            { id: 62, name: 'Bhindi Masala', description: 'Okra with spices', price: 0, category: 'veg' },
            { id: 63, name: 'Bhindi Do Pyaza', description: 'Okra with onions', price: 0, category: 'veg' },
            { id: 64, name: 'Gobi Masala', description: 'Cauliflower curry', price: 0, category: 'veg' },
            { id: 65, name: 'Gobi Manchurian', description: 'Indo-Chinese cauliflower', price: 0, category: 'veg' },
            { id: 66, name: 'Mix Veg Curry', description: 'Mixed vegetables in gravy', price: 0, category: 'veg' },
            { id: 67, name: 'Veg Kolhapuri', description: 'Spicy vegetable curry', price: 0, category: 'veg' },
            { id: 68, name: 'Veg Jaipuri', description: 'Vegetable curry Jaipur style', price: 0, category: 'veg' },
            { id: 69, name: 'Veg Handi', description: 'Mixed vegetables handi', price: 0, category: 'veg' },
            { id: 70, name: 'Veg Kadai', description: 'Vegetables in kadai masala', price: 0, category: 'veg' },
            { id: 71, name: 'Malai Kofta', description: 'Vegetable dumplings in creamy gravy', price: 0, category: 'veg' },
            { id: 72, name: 'Navratan Korma', description: 'Nine-gem vegetable curry', price: 0, category: 'veg' },
            { id: 73, name: 'Kashmiri Dum Aloo', description: 'Kashmiri style potatoes', price: 0, category: 'veg' },
            
            // Raita & Sides
            { id: 74, name: 'Plain Raita', description: 'Yogurt with spices', price: 0, category: 'veg' },
            { id: 75, name: 'Boondi Raita', description: 'Yogurt with fried chickpea pearls', price: 0, category: 'veg' },
            { id: 76, name: 'Pineapple Raita', description: 'Yogurt with pineapple', price: 0, category: 'veg' },
            { id: 77, name: 'Mix Veg Raita', description: 'Yogurt with mixed vegetables', price: 0, category: 'veg' },
            { id: 78, name: 'Tadka Raita', description: 'Tempered yogurt', price: 0, category: 'veg' },
            { id: 79, name: 'Pudina Raita', description: 'Mint yogurt', price: 0, category: 'veg' },
            { id: 80, name: 'Salad', description: 'Fresh onion, cucumber, tomato salad', price: 0, category: 'veg' },
            { id: 81, name: 'Green Salad', description: 'Fresh green salad', price: 0, category: 'veg' },
            { id: 82, name: 'Kachumber', description: 'Finely chopped salad', price: 0, category: 'veg' },
            { id: 83, name: 'Papad', description: 'Crispy roasted papad', price: 0, category: 'veg' },
            { id: 84, name: 'Masala Papad', description: 'Papad with toppings', price: 0, category: 'veg' },
            { id: 85, name: 'Fry Papad', description: 'Fried papad', price: 0, category: 'veg' },
            
            // Appetizers & Snacks
            { id: 86, name: 'Veg Pakora', description: 'Mixed vegetable fritters', price: 0, category: 'veg' },
            { id: 87, name: 'Paneer Pakora', description: 'Paneer fritters', price: 0, category: 'veg' },
            { id: 88, name: 'Onion Pakora', description: 'Onion fritters', price: 0, category: 'veg' },
            { id: 89, name: 'Aloo Bonda', description: 'Potato balls in batter', price: 0, category: 'veg' },
            { id: 90, name: 'Samosa', description: 'Stuffed pastry', price: 0, category: 'veg' },
            { id: 91, name: 'Punjabi Samosa', description: 'Large stuffed samosa', price: 0, category: 'veg' },
            { id: 92, name: 'Veg Cutlet', description: 'Vegetable cutlet', price: 0, category: 'veg' },
            { id: 93, name: 'Hara Bhara Kebab', description: 'Spinach and vegetable kebab', price: 0, category: 'veg' },
            { id: 94, name: 'Paneer Tikka', description: 'Grilled paneer cubes', price: 0, category: 'veg' },
            { id: 95, name: 'Veg Seekh Kebab', description: 'Vegetable seekh kebab', price: 0, category: 'veg' },
            { id: 96, name: 'Dahi Bhalla', description: 'Lentil dumplings in yogurt', price: 0, category: 'veg' },
            { id: 97, name: 'Papdi Chaat', description: 'Crispy chaat', price: 0, category: 'veg' },
            { id: 98, name: 'Aloo Tikki', description: 'Potato patties', price: 0, category: 'veg' },
            
            // Desserts
            { id: 99, name: 'Gulab Jamun', description: 'Milk dumplings in syrup', price: 0, category: 'veg' },
            { id: 100, name: 'Rasgulla', description: 'Bengali sweet', price: 0, category: 'veg' },
            { id: 101, name: 'Jalebi', description: 'Crispy spiral sweet', price: 0, category: 'veg' },
            { id: 102, name: 'Kheer', description: 'Rice pudding', price: 0, category: 'veg' },
            { id: 103, name: 'Gajar Halwa', description: 'Carrot pudding', price: 0, category: 'veg' },
            { id: 104, name: 'Moong Dal Halwa', description: 'Lentil pudding', price: 0, category: 'veg' },
            { id: 105, name: 'Rasmalai', description: 'Paneer in sweet milk', price: 0, category: 'veg' },
            { id: 106, name: 'Shrikhand', description: 'Sweetened yogurt', price: 0, category: 'veg' },
            { id: 107, name: 'Basundi', description: 'Sweetened condensed milk', price: 0, category: 'veg' },
            { id: 108, name: 'Ice Cream', description: 'Vanilla ice cream', price: 0, category: 'veg' },
            { id: 109, name: 'Fruit Salad', description: 'Fresh fruit mix', price: 0, category: 'veg' }
        ];
        
        localStorage.setItem('vegFoodItems', JSON.stringify(defaultVegFood));
        items = defaultVegFood;
        console.log("✅ Complete veg food menu created with 100+ items");
    }
    
    const container = document.getElementById('vegFoodItemsList');
    if (!container) {
        console.log("❌ Veg food container not found");
        return;
    }
    
    // Build HTML for admin panel with scrollable container
    let html = '<div style="max-height: 500px; overflow-y: auto; padding-right: 10px;">';
    
    items.forEach((item, index) => {
        html += `<div class="admin-item-group" style="display: grid; grid-template-columns: 2fr 3fr 1fr auto; gap: 10px; margin-bottom: 10px; padding: 15px; background: #f5f1ea; border-radius: 8px; align-items: center;">
            <input type="text" value="${item.name}" id="vegName${index}" placeholder="Food name" style="padding:8px; border:2px solid #f5e6d3; border-radius:4px; width:100%;">
            <input type="text" value="${item.description || ''}" id="vegDesc${index}" placeholder="Description" style="padding:8px; border:2px solid #f5e6d3; border-radius:4px; width:100%;">
            <input type="number" value="${item.price || 0}" id="vegPrice${index}" placeholder="Price" style="padding:8px; border:2px solid #f5e6d3; border-radius:4px; width:100px;">
            <button onclick="removeVegFoodItem(${index})" style="padding:8px 12px; background:#f44336; color:white; border:none; border-radius:4px; cursor:pointer;">
                <i class="fas fa-trash"></i>
            </button>
        </div>`;
    });
    
    html += '</div>';
    container.innerHTML = html;
    console.log(`✅ Loaded ${items.length} veg food items in admin panel`);
}
// ================ NON-VEG FOOD MANAGEMENT ================

function loadNonVegFoodItems() {
    const items = JSON.parse(localStorage.getItem('nonVegFoodItems')) || [];
    
    const container = document.getElementById('nonVegFoodItemsList');
    if (!container) return;
    
    if (items.length === 0) {
        container.innerHTML = '<p>No non-veg food items. Click "Add Non-Veg Item" to create one.</p>';
        return;
    }
    
    let html = '';
    items.forEach((item, index) => {
        html += `<div class="admin-item-group" style="display: grid; grid-template-columns: 2fr 2fr 1fr auto; gap: 10px; margin-bottom: 10px; padding: 10px; background: #f5f1ea; border-radius: 8px; align-items: center;">
            <input type="text" value="${item.name}" id="nonvegName${index}" placeholder="Food name" style="padding:8px;">
            <input type="text" value="${item.description || ''}" id="nonvegDesc${index}" placeholder="Description" style="padding:8px;">
            <input type="number" value="${item.price || 0}" id="nonvegPrice${index}" placeholder="Price" style="padding:8px;">
            <button onclick="removeNonVegFoodItem(${index})" style="padding:8px 12px; background:#f44336; color:white; border:none; border-radius:4px; cursor:pointer;">
                <i class="fas fa-trash"></i>
            </button>
        </div>`;
    });
    
    container.innerHTML = html;
}

function addNonVegFoodItem() {
    const items = JSON.parse(localStorage.getItem('nonVegFoodItems')) || [];
    const newId = items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1;
    
    items.push({
        id: newId,
        name: 'New Non-Veg Item',
        description: 'Description',
        price: 0,
        category: 'nonveg'
    });
    
    localStorage.setItem('nonVegFoodItems', JSON.stringify(items));
    loadNonVegFoodItems();
}

function removeNonVegFoodItem(index) {
    if (!confirm('Are you sure you want to delete this item?')) return;
    
    let items = JSON.parse(localStorage.getItem('nonVegFoodItems')) || [];
    items.splice(index, 1);
    localStorage.setItem('nonVegFoodItems', JSON.stringify(items));
    loadNonVegFoodItems();
}

function saveNonVegFoodItems() {
    const items = [];
    const itemElements = document.querySelectorAll('#nonVegFoodItemsList .admin-item-group');
    
    itemElements.forEach((el, i) => {
        const nameInput = document.getElementById(`nonvegName${i}`);
        const descInput = document.getElementById(`nonvegDesc${i}`);
        const priceInput = document.getElementById(`nonvegPrice${i}`);
        
        if (nameInput && priceInput) {
            items.push({
                id: i + 1,
                name: nameInput.value,
                description: descInput ? descInput.value : '',
                price: parseInt(priceInput.value) || 0,
                category: 'nonveg'
            });
        }
    });
    
    localStorage.setItem('nonVegFoodItems', JSON.stringify(items));
    alert('Non-veg food items saved successfully!');
}
// ================ FACILITIES MANAGEMENT ================

// ================ FACILITIES MANAGEMENT ================

function loadFacilities() {
    const facilities = JSON.parse(localStorage.getItem('facilities')) || [];
    
    const container = document.getElementById('facilitiesList');
    if (!container) return;
    
    if (facilities.length === 0) {
        container.innerHTML = '<p>No facilities. Click "Add Facility" to create one.</p>';
        return;
    }
    
    let html = '';
    facilities.forEach((facility, index) => {
        html += `<div class="admin-item-group" style="display: grid; grid-template-columns: 2fr 1fr 2fr auto; gap: 10px; margin-bottom: 10px; padding: 10px; background: #f5f1ea; border-radius: 8px; align-items: center;">
            <input type="text" value="${facility.name}" id="facName${index}" placeholder="Facility name" style="padding:8px;">
            <input type="text" value="${facility.icon || 'plus-circle'}" id="facIcon${index}" placeholder="Icon name" style="padding:8px;">
            <input type="text" value="${facility.description || ''}" id="facDesc${index}" placeholder="Description" style="padding:8px;">
            <button onclick="removeFacility(${index})" style="padding:8px 12px; background:#f44336; color:white; border:none; border-radius:4px; cursor:pointer;">
                <i class="fas fa-trash"></i>
            </button>
        </div>`;
    });
    
    container.innerHTML = html;
}

function addFacility() {
    const facilities = JSON.parse(localStorage.getItem('facilities')) || [];
    const newId = facilities.length > 0 ? Math.max(...facilities.map(f => f.id)) + 1 : 1;
    
    facilities.push({
        id: newId,
        name: 'New Facility',
        icon: 'plus-circle',
        description: 'Description'
    });
    
    localStorage.setItem('facilities', JSON.stringify(facilities));
    loadFacilities();
}

function removeFacility(index) {
    if (!confirm('Are you sure you want to delete this facility?')) return;
    
    let facilities = JSON.parse(localStorage.getItem('facilities')) || [];
    facilities.splice(index, 1);
    localStorage.setItem('facilities', JSON.stringify(facilities));
    loadFacilities();
}

function saveFacilities() {
    const facilities = [];
    const itemElements = document.querySelectorAll('#facilitiesList .admin-item-group');
    
    itemElements.forEach((el, i) => {
        const nameInput = document.getElementById(`facName${i}`);
        const iconInput = document.getElementById(`facIcon${i}`);
        const descInput = document.getElementById(`facDesc${i}`);
        
        if (nameInput && iconInput) {
            facilities.push({
                id: i + 1,
                name: nameInput.value,
                icon: iconInput.value,
                description: descInput ? descInput.value : ''
            });
        }
    });
    
    localStorage.setItem('facilities', JSON.stringify(facilities));
    alert('Facilities saved successfully!');
}
// ================ NEARBY PLACES MANAGEMENT ================

// ================ NEARBY PLACES MANAGEMENT ================

function loadNearbyPlaces() {
    const places = JSON.parse(localStorage.getItem('nearbyPlaces')) || [];
    
    const container = document.getElementById('nearbyList');
    if (!container) return;
    
    if (places.length === 0) {
        container.innerHTML = '<p>No nearby places. Click "Add Place" to create one.</p>';
        return;
    }
    
    let html = '';
    places.forEach((place, index) => {
        html += `<div class="admin-item-group" style="display: grid; grid-template-columns: 2fr 1fr 2fr 1fr 2fr auto; gap: 10px; margin-bottom: 10px; padding: 10px; background: #f5f1ea; border-radius: 8px; align-items: center;">
            <input type="text" value="${place.name}" id="placeName${index}" placeholder="Name" style="padding:8px;">
            <input type="text" value="${place.distance}" id="placeDist${index}" placeholder="Distance" style="padding:8px;">
            <input type="text" value="${place.image}" id="placeImg${index}" placeholder="Image URL" style="padding:8px;">
            <input type="text" value="${place.icon}" id="placeIcon${index}" placeholder="Icon" style="padding:8px;">
            <input type="text" value="${place.description || ''}" id="placeDesc${index}" placeholder="Description" style="padding:8px;">
            <button onclick="removeNearbyPlace(${index})" style="padding:8px 12px; background:#f44336; color:white; border:none; border-radius:4px; cursor:pointer;">
                <i class="fas fa-trash"></i>
            </button>
        </div>`;
    });
    
    container.innerHTML = html;
}

function addNearbyPlace() {
    const places = JSON.parse(localStorage.getItem('nearbyPlaces')) || [];
    const newId = places.length > 0 ? Math.max(...places.map(p => p.id)) + 1 : 1;
    
    places.push({
        id: newId,
        name: 'New Place',
        distance: '10 min',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&auto=format',
        icon: 'map-marker-alt',
        description: 'Description here',
        tags: ['Place']
    });
    
    localStorage.setItem('nearbyPlaces', JSON.stringify(places));
    loadNearbyPlaces();
}

function removeNearbyPlace(index) {
    if (!confirm('Are you sure you want to delete this place?')) return;
    
    let places = JSON.parse(localStorage.getItem('nearbyPlaces')) || [];
    places.splice(index, 1);
    localStorage.setItem('nearbyPlaces', JSON.stringify(places));
    loadNearbyPlaces();
}

function saveNearbyPlaces() {
    const places = [];
    const itemElements = document.querySelectorAll('#nearbyList .admin-item-group');
    
    itemElements.forEach((el, i) => {
        const nameInput = document.getElementById(`placeName${i}`);
        const distInput = document.getElementById(`placeDist${i}`);
        const imgInput = document.getElementById(`placeImg${i}`);
        const iconInput = document.getElementById(`placeIcon${i}`);
        const descInput = document.getElementById(`placeDesc${i}`);
        
        if (nameInput && distInput && imgInput && iconInput) {
            places.push({
                id: i + 1,
                name: nameInput.value,
                distance: distInput.value,
                image: imgInput.value,
                icon: iconInput.value,
                description: descInput ? descInput.value : '',
                tags: ['Place']
            });
        }
    });
    
    localStorage.setItem('nearbyPlaces', JSON.stringify(places));
    alert('Nearby places saved successfully!');
}

// ================ GAMES MANAGEMENT ================
// ================ GAMES MANAGEMENT ================

function loadGames() {
    const games = JSON.parse(localStorage.getItem('games')) || [];
    
    const container = document.getElementById('gamesList');
    if (!container) return;
    
    if (games.length === 0) {
        container.innerHTML = '<p>No games. Click "Add Game" to create one.</p>';
        return;
    }
    
    let html = '';
    games.forEach((game, index) => {
        html += `<div class="admin-item-group" style="display: grid; grid-template-columns: 2fr 1fr 1fr auto; gap: 10px; margin-bottom: 10px; padding: 10px; background: #f5f1ea; border-radius: 8px; align-items: center;">
            <input type="text" value="${game.name}" id="gameName${index}" placeholder="Game name" style="padding:8px;">
            <input type="text" value="${game.icon}" id="gameIcon${index}" placeholder="Icon name" style="padding:8px;">
            <input type="text" value="${game.players || '2 Players'}" id="gamePlayers${index}" placeholder="Players" style="padding:8px;">
            <button onclick="removeGame(${index})" style="padding:8px 12px; background:#f44336; color:white; border:none; border-radius:4px; cursor:pointer;">
                <i class="fas fa-trash"></i>
            </button>
        </div>`;
    });
    
    container.innerHTML = html;
}

function addGame() {
    const games = JSON.parse(localStorage.getItem('games')) || [];
    const newId = games.length > 0 ? Math.max(...games.map(g => g.id)) + 1 : 1;
    
    games.push({
        id: newId,
        name: 'New Game',
        icon: 'gamepad',
        players: '2 Players'
    });
    
    localStorage.setItem('games', JSON.stringify(games));
    loadGames();
}

function removeGame(index) {
    if (!confirm('Are you sure you want to delete this game?')) return;
    
    let games = JSON.parse(localStorage.getItem('games')) || [];
    games.splice(index, 1);
    localStorage.setItem('games', JSON.stringify(games));
    loadGames();
}

function saveGames() {
    const games = [];
    const itemElements = document.querySelectorAll('#gamesList .admin-item-group');
    
    itemElements.forEach((el, i) => {
        const nameInput = document.getElementById(`gameName${i}`);
        const iconInput = document.getElementById(`gameIcon${i}`);
        const playersInput = document.getElementById(`gamePlayers${i}`);
        
        if (nameInput && iconInput && playersInput) {
            games.push({
                id: i + 1,
                name: nameInput.value,
                icon: iconInput.value,
                players: playersInput.value
            });
        }
    });
    
    localStorage.setItem('games', JSON.stringify(games));
    alert('Games saved successfully!');
}

// ================ OFFLINE BOOKING MANAGEMENT ================

// ================ UPDATED LOAD ROOMS DATA ================

function loadRoomsData() {
    const rooms = JSON.parse(localStorage.getItem('rooms')) || [
        { number: '101', type: 'ac', status: 'available', guest: null, checkIn: null, checkOut: null },
        { number: '102', type: 'ac', status: 'available', guest: null, checkIn: null, checkOut: null },
        { number: '103', type: 'ac', status: 'available', guest: null, checkIn: null, checkOut: null },
        { number: '104', type: 'pet', status: 'available', guest: null, checkIn: null, checkOut: null }
    ];
    
    let available = 0, occupied = 0;
    let roomsHtml = '';
    
    rooms.forEach(r => {
        if (r.status === 'available') available++; else occupied++;
        roomsHtml += `<tr>
            <td>${r.number}</td>
            <td>${r.type === 'ac' ? 'AC Room' : 'Pet Friendly'}</td>
            <td><span style="color:${r.status==='available'?'#4caf50':'#f44336'}; font-weight:600;">${r.status}</span></td>
            <td>${r.guest || '-'}</td>
            <td>${r.checkIn || '-'}</td>
            <td>${r.checkOut || '-'}</td>
            <td>${r.status==='occupied' ? 
                `<button onclick="checkOutRoom('${r.number}')" style="padding:5px 10px; background:#4caf50; color:white; border:none; border-radius:4px; cursor:pointer;">Check Out</button>` : '-'}</td>
        </tr>`;
    });
    
    const roomsTable = document.getElementById('roomsTable');
    if (roomsTable) roomsTable.innerHTML = roomsHtml;
    
    const availableRooms = document.getElementById('availableRooms');
    if (availableRooms) availableRooms.textContent = available;
    
    // Also update the offline booking tab if it exists
    loadOfflineBookingData();
}

function loadOfflineBookingData() {
    const rooms = JSON.parse(localStorage.getItem('rooms')) || [];
    let html = '';
    rooms.forEach((room, i) => {
        html += `<div>
            Room ${room.number} - ${room.type} - 
            <select id="offlineStatus${i}">
                <option value="available" ${room.status==='available'?'selected':''}>Available</option>
                <option value="occupied" ${room.status==='occupied'?'selected':''}>Occupied</option>
            </select>
            <button onclick="updateOfflineRoomStatus(${i})">Update</button>
        </div>`;
    });
    document.getElementById('offlineRoomsList').innerHTML = html;
}

function updateOfflineRoomStatus(i) {
    let rooms = JSON.parse(localStorage.getItem('rooms')) || [];
    rooms[i].status = document.getElementById(`offlineStatus${i}`).value;
    localStorage.setItem('rooms', JSON.stringify(rooms));
    loadOfflineBookingData();
}

// ================ BOOKING MODAL FUNCTIONS ================

function openBookingModal(roomType = 'ac') {
    const modal = document.getElementById('bookingModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        const roomSelect = document.getElementById('modalRoomType');
        if (roomSelect && roomType) roomSelect.value = roomType;
        setupDates();
        updateMultiRoomSummary();
        clearAllErrors();
    }
}

function closeBookingModal() {
    const modal = document.getElementById('bookingModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        clearAllErrors();
    }
}

function closeConfirmModal() {
    document.getElementById('confirmModal')?.classList.remove('active');
}

function setupDates() {
    const today = new Date();
    const maxDate = new Date(); maxDate.setMonth(maxDate.getMonth() + 4);
    const todayStr = today.toISOString().split('T')[0];
    const maxDateStr = maxDate.toISOString().split('T')[0];
    
    const checkIn = document.getElementById('modalCheckIn');
    const checkOut = document.getElementById('modalCheckOut');
    
    if (checkIn) {
        checkIn.min = todayStr;
        checkIn.max = maxDateStr;
        checkIn.value = todayStr;
        checkIn.onchange = function() {
            const nextDay = new Date(this.value);
            nextDay.setDate(nextDay.getDate() + 1);
            if (checkOut) {
                checkOut.min = nextDay.toISOString().split('T')[0];
                if (new Date(checkOut.value) <= new Date(this.value)) {
                    checkOut.value = nextDay.toISOString().split('T')[0];
                }
            }
            updateMultiRoomSummary();
        };
    }
    
    if (checkOut) {
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        checkOut.min = tomorrow.toISOString().split('T')[0];
        checkOut.max = maxDateStr;
        checkOut.value = tomorrow.toISOString().split('T')[0];
        checkOut.onchange = updateMultiRoomSummary;
    }
}

// ================ INTERACTIVE BOOKING FORM WITH WORKING NEXT BUTTON ================

// ================ 2-STEP BOOKING FORM - NO PAYMENT ================

let currentStep = 1;

// Open booking modal
function openBookingModal(roomType = 'ac') {
    const modal = document.getElementById('bookingModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        const roomSelect = document.getElementById('modalRoomType');
        if (roomSelect && roomType) roomSelect.value = roomType;
        setupDates();
        updateBookingSummary();
        resetForm();
        currentStep = 1;
        showStep(1);
    }
}

// Close booking modal
function closeBookingModal() {
    const modal = document.getElementById('bookingModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        resetForm();
    }
}

// Close confirmation modal
function closeConfirmModal() {
    document.getElementById('confirmModal')?.classList.remove('active');
}

// Reset form
function resetForm() {
    const nameInput = document.getElementById('guestName');
    const phoneInput = document.getElementById('guestPhone');
    const emailInput = document.getElementById('guestEmail');
    const requestsInput = document.getElementById('specialRequests');
    const petSelect = document.getElementById('guestPet');
    
    if (nameInput) nameInput.value = '';
    if (phoneInput) phoneInput.value = '';
    if (emailInput) emailInput.value = '';
    if (requestsInput) requestsInput.value = '';
    if (petSelect) petSelect.value = 'no';
    
    clearAllErrors();
}

// Clear all errors
function clearAllErrors() {
    const errorFields = ['guestName', 'guestPhone', 'guestEmail', 'modalCheckIn', 'modalCheckOut'];
    errorFields.forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.classList.remove('error-border', 'valid');
            const error = document.getElementById(id + 'Error');
            if (error) error.innerHTML = '';
        }
    });
}

// Step navigation
function showStep(step) {
    document.querySelectorAll('.step').forEach(s => s.style.display = 'none');
    
    const currentStepElement = document.querySelector(`.step${step}`);
    if (currentStepElement) {
        currentStepElement.style.display = 'block';
    }
    
    document.querySelectorAll('.progress-step').forEach((s, i) => {
        s.classList.remove('active', 'completed');
        if (i + 1 === step) {
            s.classList.add('active');
        } else if (i + 1 < step) {
            s.classList.add('completed');
        }
    });
    
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    
    if (prevBtn) {
        prevBtn.style.display = step === 1 ? 'none' : 'block';
    }
    
    if (nextBtn && submitBtn) {
        if (step === 2) {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'block';
            updateBookingSummary();
        } else {
            nextBtn.style.display = 'block';
            submitBtn.style.display = 'none';
        }
    }
}

function nextStep() {
    if (currentStep === 1) {
        if (validateStep1()) {
            currentStep++;
            showStep(currentStep);
        }
    }
}

function prevStep() {
    if (currentStep > 1) {
        currentStep--;
        showStep(currentStep);
    }
}

// Step 1 validation - Dates
function validateStep1() {
    const checkIn = document.getElementById('modalCheckIn').value;
    const checkOut = document.getElementById('modalCheckOut').value;
    
    const datesValidation = validateDates(checkIn, checkOut);
    
    const checkInError = document.getElementById('checkInError');
    const checkOutError = document.getElementById('checkOutError');
    const checkInInput = document.getElementById('modalCheckIn');
    const checkOutInput = document.getElementById('modalCheckOut');
    
    if (!datesValidation.isValid) {
        if (checkInError) checkInError.innerHTML = '<i class="fas fa-exclamation-circle"></i> ' + datesValidation.message;
        if (checkOutError) checkOutError.innerHTML = '<i class="fas fa-exclamation-circle"></i> ' + datesValidation.message;
        if (checkInInput) checkInInput.classList.add('error-border');
        if (checkOutInput) checkOutInput.classList.add('error-border');
        return false;
    } else {
        if (checkInError) checkInError.innerHTML = '';
        if (checkOutError) checkOutError.innerHTML = '';
        if (checkInInput) checkInInput.classList.remove('error-border');
        if (checkOutInput) checkOutInput.classList.remove('error-border');
        return true;
    }
}

// Step 2 validation - Guest Details (also processes booking)
function validateStep2() {
    let isValid = true;
    
    const name = document.getElementById('guestName').value;
    const phone = document.getElementById('guestPhone').value;
    const email = document.getElementById('guestEmail').value;
    
    const nameValidation = validateName(name);
    const nameError = document.getElementById('guestNameError');
    const nameInput = document.getElementById('guestName');
    
    if (!nameValidation.isValid) {
        if (nameError) nameError.innerHTML = '<i class="fas fa-exclamation-circle"></i> ' + nameValidation.message;
        if (nameInput) {
            nameInput.classList.add('error-border');
            nameInput.classList.remove('valid');
        }
        isValid = false;
    } else {
        if (nameError) nameError.innerHTML = '';
        if (nameInput) {
            nameInput.classList.remove('error-border');
            nameInput.classList.add('valid');
        }
    }
    
    const phoneValidation = validatePhone(phone);
    const phoneError = document.getElementById('guestPhoneError');
    const phoneInput = document.getElementById('guestPhone');
    
    if (!phoneValidation.isValid) {
        if (phoneError) phoneError.innerHTML = '<i class="fas fa-exclamation-circle"></i> ' + phoneValidation.message;
        if (phoneInput) {
            phoneInput.classList.add('error-border');
            phoneInput.classList.remove('valid');
        }
        isValid = false;
    } else {
        if (phoneError) phoneError.innerHTML = '';
        if (phoneInput) {
            phoneInput.classList.remove('error-border');
            phoneInput.classList.add('valid');
        }
    }
    
    const emailValidation = validateEmail(email);
    const emailError = document.getElementById('guestEmailError');
    const emailInput = document.getElementById('guestEmail');
    
    if (!emailValidation.isValid) {
        if (emailError) emailError.innerHTML = '<i class="fas fa-exclamation-circle"></i> ' + emailValidation.message;
        if (emailInput) {
            emailInput.classList.add('error-border');
            emailInput.classList.remove('valid');
        }
        isValid = false;
    } else {
        if (emailError) emailError.innerHTML = '';
        if (emailInput) {
            emailInput.classList.remove('error-border');
            emailInput.classList.add('valid');
        }
    }
    
    return isValid;
}

// Validation helper functions
function validateName(name) {
    if (!name || name.trim() === '') {
        return { isValid: false, message: 'Name is required' };
    }
    if (name.trim().length < 3) {
        return { isValid: false, message: 'Name must be at least 3 characters' };
    }
    if (!/^[A-Za-z\s]+$/.test(name.trim())) {
        return { isValid: false, message: 'Name can only contain letters and spaces' };
    }
    return { isValid: true, message: '' };
}

function validatePhone(phone) {
    const cleaned = phone.replace(/\D/g, '');
    if (!phone || phone.trim() === '') {
        return { isValid: false, message: 'Phone number is required' };
    }
    if (cleaned.length !== 10) {
        return { isValid: false, message: 'Phone must be 10 digits' };
    }
    if (!/^[6-9]/.test(cleaned)) {
        return { isValid: false, message: 'Phone must start with 6,7,8 or 9' };
    }
    return { isValid: true, message: '', cleaned: cleaned };
}

function validateEmail(email) {
    if (!email || email.trim() === '') {
        return { isValid: false, message: 'Email is required' };
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        return { isValid: false, message: 'Enter a valid email address' };
    }
    return { isValid: true, message: '' };
}

function validateDates(checkIn, checkOut) {
    if (!checkIn || !checkOut) {
        return { isValid: false, message: 'Please select both check-in and check-out dates' };
    }
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const checkInDate = new Date(checkIn);
    checkInDate.setHours(0, 0, 0, 0);
    
    const checkOutDate = new Date(checkOut);
    checkOutDate.setHours(0, 0, 0, 0);
    
    if (checkInDate < today) {
        return { isValid: false, message: 'Check-in date cannot be in the past' };
    }
    
    if (checkOutDate <= checkInDate) {
        return { isValid: false, message: 'Check-out date must be after check-in date' };
    }
    
    const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
    if (nights > 30) {
        return { isValid: false, message: 'Booking cannot exceed 30 nights' };
    }
    
    return { isValid: true, message: '', nights: nights };
}

// Update booking summary
function updateBookingSummary() {
    const checkIn = document.getElementById('modalCheckIn')?.value;
    const checkOut = document.getElementById('modalCheckOut')?.value;
    const guests = parseInt(document.getElementById('modalGuests')?.value || 2);
    const roomType = document.getElementById('modalRoomType')?.value || 'ac';
    const numRooms = parseInt(document.getElementById('modalNumRooms')?.value || 1);
    
    const prices = JSON.parse(localStorage.getItem('prices')) || { ac: 2500, pet: 2500 };
    const roomPrice = roomType === 'ac' ? prices.ac : prices.pet;
    
    if (checkIn && checkOut) {
        const start = new Date(checkIn);
        const end = new Date(checkOut);
        const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        
        if (nights > 0) {
            const total = guests * roomPrice * nights * numRooms;
            
            const summaryRoom = document.getElementById('summaryRoom');
            const summaryDates = document.getElementById('summaryDates');
            const summaryGuests = document.getElementById('summaryGuests');
            const summaryNights = document.getElementById('summaryNights');
            const summaryRooms = document.getElementById('summaryRooms');
            const summaryTotal = document.getElementById('summaryTotal');
            
            if (summaryRoom) summaryRoom.textContent = roomType === 'ac' ? 'AC Room' : 'Pet Friendly Room';
            if (summaryDates) summaryDates.textContent = `${new Date(checkIn).toLocaleDateString()} - ${new Date(checkOut).toLocaleDateString()}`;
            if (summaryGuests) summaryGuests.textContent = guests;
            if (summaryNights) summaryNights.textContent = nights;
            if (summaryRooms) summaryRooms.textContent = numRooms;
            if (summaryTotal) summaryTotal.textContent = total;
        }
    }
}

// Process booking (called from form submit)
// ================ UPDATED PROCESS BOOKING WITH FRONT END UPDATE ================

function processBooking(event) {
    event.preventDefault();
    
    if (!validateStep1() || !validateStep2()) {
        alert('Please fill all required fields correctly');
        return;
    }
    
    const name = document.getElementById('guestName').value;
    const phone = document.getElementById('guestPhone').value;
    const email = document.getElementById('guestEmail').value;
    const guests = document.getElementById('modalGuests').value;
    const checkIn = document.getElementById('modalCheckIn').value;
    const checkOut = document.getElementById('modalCheckOut').value;
    const roomType = document.getElementById('modalRoomType').value;
    const numRooms = parseInt(document.getElementById('modalNumRooms').value);
    const specialRequests = document.getElementById('specialRequests').value;
    const pet = document.getElementById('guestPet').value;
    
    const prices = JSON.parse(localStorage.getItem('prices')) || { ac: 2500, pet: 2500 };
    const roomPrice = roomType === 'ac' ? prices.ac : prices.pet;
    const nights = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
    const total = parseInt(guests) * roomPrice * nights * numRooms;
    
    // Get current rooms from localStorage
    let rooms = JSON.parse(localStorage.getItem('rooms')) || [
        { number: '101', type: 'ac', status: 'available', guest: null, checkIn: null, checkOut: null },
        { number: '102', type: 'ac', status: 'available', guest: null, checkIn: null, checkOut: null },
        { number: '103', type: 'ac', status: 'available', guest: null, checkIn: null, checkOut: null },
        { number: '104', type: 'pet', status: 'available', guest: null, checkIn: null, checkOut: null }
    ];
    
    // Find available rooms of the requested type
    const availableRooms = rooms.filter(r => r.type === roomType && r.status === 'available');
    
    // Check if enough rooms are available
    if (availableRooms.length < numRooms) {
        alert(`Only ${availableRooms.length} rooms of this type are available. Please reduce the number of rooms.`);
        return;
    }
    
    // Book the required number of rooms
    let bookedCount = 0;
    let bookedRoomNumbers = [];
    
    for (let i = 0; i < rooms.length; i++) {
        if (rooms[i].type === roomType && rooms[i].status === 'available' && bookedCount < numRooms) {
            rooms[i].status = 'occupied';
            rooms[i].guest = name.trim();
            rooms[i].checkIn = checkIn;
            rooms[i].checkOut = checkOut;
            bookedRoomNumbers.push(rooms[i].number);
            bookedCount++;
        }
    }
    
    // Save updated rooms back to localStorage
    localStorage.setItem('rooms', JSON.stringify(rooms));
    console.log("✅ Rooms updated:", rooms);
    console.log("✅ Booked rooms:", bookedRoomNumbers);
    
    // Create booking record
    const booking = {
        id: 'BKG' + Date.now().toString().slice(-8),
        guestName: name.trim(),
        guestPhone: phone.replace(/\D/g, ''),
        guestEmail: email,
        roomType: roomType,
        roomNumbers: bookedRoomNumbers,
        numRooms: numRooms,
        guests: parseInt(guests),
        checkIn: checkIn,
        checkOut: checkOut,
        nights: nights,
        total: total,
        specialRequests: specialRequests,
        pet: pet,
        date: new Date().toISOString()
    };
    
    // Save booking
    let bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    bookings.push(booking);
    localStorage.setItem('bookings', JSON.stringify(bookings));
    
    closeBookingModal();
    
    // Show confirmation with room numbers
    document.getElementById('confirmGuestName').textContent = name.trim();
    document.getElementById('confirmDetails').innerHTML = `
        <p><strong>Booking ID:</strong> ${booking.id}</p>
        <p><strong>Name:</strong> ${name.trim()}</p>
        <p><strong>Phone:</strong> ${phone.replace(/\D/g, '')}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Room Type:</strong> ${roomType === 'ac' ? 'AC Room' : 'Pet Friendly'}</p>
        <p><strong>Rooms Booked:</strong> ${bookedRoomNumbers.join(', ')}</p>
        <p><strong>Number of Rooms:</strong> ${numRooms}</p>
        <p><strong>Guests:</strong> ${guests}</p>
        <p><strong>Check-in:</strong> ${new Date(checkIn).toLocaleDateString()}</p>
        <p><strong>Check-out:</strong> ${new Date(checkOut).toLocaleDateString()}</p>
        <p><strong>Nights:</strong> ${nights}</p>
        <p><strong>Total:</strong> ₹${total}</p>
    `;
    document.getElementById('confirmModal').classList.add('active');
    
    // Update front end room display if we're on the rooms page
    updateFrontendRoomDisplay();
    
    // If admin is logged in, refresh admin data
    if (document.getElementById('adminDashboard')?.style.display === 'block') {
        loadAllAdminData();
    }
}
// ================ UPDATE FRONT END ROOM DISPLAY ================

function updateFrontendRoomDisplay() {
    // Check if we're on the rooms page
    const roomsGrid = document.getElementById('roomsGrid');
    const availabilityGrid = document.getElementById('availabilityGrid');
    
    if (!roomsGrid && !availabilityGrid) return; // Not on rooms page
    
    const rooms = JSON.parse(localStorage.getItem('rooms')) || [
        { number: '101', type: 'ac', status: 'available', guest: null, checkIn: null, checkOut: null },
        { number: '102', type: 'ac', status: 'available', guest: null, checkIn: null, checkOut: null },
        { number: '103', type: 'ac', status: 'available', guest: null, checkIn: null, checkOut: null },
        { number: '104', type: 'pet', status: 'available', guest: null, checkIn: null, checkOut: null }
    ];
    
    const prices = JSON.parse(localStorage.getItem('prices')) || { ac: 2500, pet: 2500 };
    
    // Update rooms grid if it exists
    if (roomsGrid) {
        roomsGrid.innerHTML = rooms.map(room => `
            <div class="room-card" data-type="${room.type}">
                <div class="room-image" style="background: linear-gradient(135deg, #0a4d4c, #1e7a76); display: flex; align-items: center; justify-content: center;">
                    <i class="fas fa-${room.type === 'pet' ? 'paw' : 'snowflake'}"></i>
                </div>
                <div class="room-content">
                    <h3 class="room-title">${room.type === 'ac' ? 'AC Room' : 'Pet Friendly Room'} - ${room.number}</h3>
                    <div class="room-price">₹${room.type === 'ac' ? prices.ac : prices.pet}<span>/person</span></div>
                    <ul class="room-features">
                        <li><i class="fas fa-check"></i> Air Conditioned</li>
                        <li><i class="fas fa-check"></i> Flat Screen TV</li>
                        <li><i class="fas fa-check"></i> 24/7 Hot Water</li>
                        <li><i class="fas fa-check"></i> Free WiFi</li>
                        ${room.type === 'pet' ? '<li><i class="fas fa-paw"></i> Pets Allowed</li>' : ''}
                        <li><i class="fas fa-utensils"></i> Meals Included</li>
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
    
    // Update availability grid if it exists
    if (availabilityGrid) {
        availabilityGrid.innerHTML = rooms.map(room => `
            <div class="room-availability-card">
                <strong>Room ${room.number}</strong><br>
                <small>${room.type === 'ac' ? 'AC' : 'Pet Friendly'}</small><br>
                <span style="color: ${room.status === 'available' ? '#4caf50' : '#f44336'}; font-weight: 600;">
                    <i class="fas fa-circle"></i> ${room.status}
                </span>
                ${room.status === 'occupied' ? `<br><small style="color: #8b8a88;">Guest: ${room.guest || 'N/A'}</small>` : ''}
            </div>
        `).join('');
    }
}
// ================ UPDATED PROCESS MULTI-ROOM BOOKING - WITH ROOM STATUS FIX ================

function processMultiRoomBooking(event) {
    event.preventDefault();
    
    if (!validateStep1() || !validateStep2()) {
        alert('Please fill all required fields correctly');
        return;
    }
    
    const name = document.getElementById('guestName').value;
    const phone = document.getElementById('guestPhone').value;
    const email = document.getElementById('guestEmail').value;
    const guests = document.getElementById('modalGuests').value;
    const checkIn = document.getElementById('modalCheckIn').value;
    const checkOut = document.getElementById('modalCheckOut').value;
    const roomType = document.getElementById('modalRoomType').value;
    const numRooms = parseInt(document.getElementById('modalNumRooms').value);
    const specialRequests = document.getElementById('specialRequests').value;
    const pet = document.getElementById('guestPet').value;
    const paymentMethod = document.getElementById('paymentMethod').value;
    
    const prices = JSON.parse(localStorage.getItem('prices')) || { ac: 2500, pet: 2500 };
    const roomPrice = roomType === 'ac' ? prices.ac : prices.pet;
    const nights = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
    const total = parseInt(guests) * roomPrice * nights * numRooms;
    
    // ===== FIX: Update room status in rooms array =====
    // Get current rooms from localStorage
    let rooms = JSON.parse(localStorage.getItem('rooms')) || [
        { number: '101', type: 'ac', status: 'available', guest: null, checkIn: null, checkOut: null },
        { number: '102', type: 'ac', status: 'available', guest: null, checkIn: null, checkOut: null },
        { number: '103', type: 'ac', status: 'available', guest: null, checkIn: null, checkOut: null },
        { number: '104', type: 'pet', status: 'available', guest: null, checkIn: null, checkOut: null }
    ];
    
    // Find available rooms of the requested type
    const availableRooms = rooms.filter(r => r.type === roomType && r.status === 'available');
    
    // Check if enough rooms are available
    if (availableRooms.length < numRooms) {
        alert(`Only ${availableRooms.length} rooms of this type are available. Please reduce the number of rooms.`);
        return;
    }
    
    // Book the required number of rooms
    let bookedCount = 0;
    for (let i = 0; i < rooms.length; i++) {
        if (rooms[i].type === roomType && rooms[i].status === 'available' && bookedCount < numRooms) {
            rooms[i].status = 'occupied';
            rooms[i].guest = name.trim();
            rooms[i].checkIn = checkIn;
            rooms[i].checkOut = checkOut;
            bookedCount++;
        }
    }
    
    // Save updated rooms back to localStorage
    localStorage.setItem('rooms', JSON.stringify(rooms));
    console.log("✅ Rooms updated:", rooms); // Debug log
    
    // Create booking record
    const booking = {
        id: 'BKG' + Date.now().toString().slice(-8),
        guestName: name.trim(),
        guestPhone: phone.replace(/\D/g, ''),
        guestEmail: email,
        roomType: roomType,
        numRooms: numRooms,
        guests: parseInt(guests),
        checkIn: checkIn,
        checkOut: checkOut,
        nights: nights,
        total: total,
        specialRequests: specialRequests,
        pet: pet,
        paymentMethod: paymentMethod,
        date: new Date().toISOString()
    };
    
    // Save booking
    let bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    bookings.push(booking);
    localStorage.setItem('bookings', JSON.stringify(bookings));
    
    closeBookingModal();
    
    // Show confirmation
    document.getElementById('confirmGuestName').textContent = name.trim();
    document.getElementById('confirmDetails').innerHTML = `
        <p><strong>Booking ID:</strong> ${booking.id}</p>
        <p><strong>Name:</strong> ${name.trim()}</p>
        <p><strong>Phone:</strong> ${phone.replace(/\D/g, '')}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Room Type:</strong> ${roomType === 'ac' ? 'AC Room' : 'Pet Friendly'}</p>
        <p><strong>Rooms Booked:</strong> ${numRooms}</p>
        <p><strong>Room Numbers:</strong> ${getBookedRoomNumbers(rooms, name.trim())}</p>
        <p><strong>Guests:</strong> ${guests}</p>
        <p><strong>Check-in:</strong> ${new Date(checkIn).toLocaleDateString()}</p>
        <p><strong>Check-out:</strong> ${new Date(checkOut).toLocaleDateString()}</p>
        <p><strong>Nights:</strong> ${nights}</p>
        <p><strong>Total:</strong> ₹${total}</p>
    `;
    document.getElementById('confirmModal').classList.add('active');
}

// Helper function to get booked room numbers for confirmation
function getBookedRoomNumbers(rooms, guestName) {
    const bookedRooms = rooms.filter(r => r.guest === guestName);
    return bookedRooms.map(r => r.number).join(', ');
}

// Setup date restrictions
function setupDates() {
    const today = new Date();
    const maxDate = new Date(); 
    maxDate.setMonth(maxDate.getMonth() + 4);
    
    const todayStr = today.toISOString().split('T')[0];
    const maxDateStr = maxDate.toISOString().split('T')[0];
    
    const checkIn = document.getElementById('modalCheckIn');
    const checkOut = document.getElementById('modalCheckOut');
    
    if (checkIn) {
        checkIn.min = todayStr;
        checkIn.max = maxDateStr;
        checkIn.value = todayStr;
        checkIn.onchange = function() {
            const nextDay = new Date(this.value);
            nextDay.setDate(nextDay.getDate() + 1);
            if (checkOut) {
                checkOut.min = nextDay.toISOString().split('T')[0];
                if (new Date(checkOut.value) <= new Date(this.value)) {
                    checkOut.value = nextDay.toISOString().split('T')[0];
                }
            }
            updateMultiRoomSummary();
            validateStep1();
        };
    }
    
    if (checkOut) {
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        checkOut.min = tomorrow.toISOString().split('T')[0];
        checkOut.max = maxDateStr;
        checkOut.value = tomorrow.toISOString().split('T')[0];
        checkOut.onchange = function() {
            updateMultiRoomSummary();
            validateStep1();
        };
    }
}

// Real-time validation for phone input
function setupRealTimeValidation() {
    const phoneInput = document.getElementById('guestPhone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            this.value = this.value.replace(/[^0-9]/g, '').slice(0, 10);
        });
    }
    
    const nameInput = document.getElementById('guestName');
    if (nameInput) {
        nameInput.addEventListener('input', function() {
            this.value = this.value.replace(/[^A-Za-z\s]/g, '');
        });
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    setupDates();
    setupRealTimeValidation();
    
    // Make sure steps are initially hidden except step 1
    document.querySelectorAll('.step').forEach((step, index) => {
        if (index === 0) {
            step.style.display = 'block';
        } else {
            step.style.display = 'none';
        }
    });
    
    // Initialize progress steps
    document.querySelectorAll('.progress-step').forEach((step, index) => {
        step.classList.remove('active', 'completed');
        if (index === 0) {
            step.classList.add('active');
        }
    });
    
    // Set initial button states
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    
    if (prevBtn) prevBtn.style.display = 'none';
    if (nextBtn) nextBtn.style.display = 'block';
    if (submitBtn) submitBtn.style.display = 'none';
});

// ================ BOOKING MODAL HTML ================

const bookingModalHTML = `
<div class="booking-modal" id="bookingModal">
    <div class="booking-modal-content">
        <div class="booking-modal-header">
            <h3><i class="fas fa-calendar-check"></i> Book Your Stay</h3>
            <button class="modal-close" onclick="closeBookingModal()">&times;</button>
        </div>
        <div class="booking-modal-body">
            <form onsubmit="processMultiRoomBooking(event)">
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px;">
                    <div>
                        <label>Room Type</label>
                        <select id="modalRoomType" onchange="updateMultiRoomSummary()">
                            <option value="ac">AC Room - ₹2,500</option>
                            <option value="pet">Pet Room - ₹2,500</option>
                        </select>
                    </div>
                    <div>
                        <label>Rooms</label>
                        <select id="modalNumRooms" onchange="updateMultiRoomSummary()">
                            <option value="1">1 Room</option>
                            <option value="2">2 Rooms</option>
                            <option value="3">3 Rooms</option>
                            <option value="4">4 Rooms</option>
                        </select>
                    </div>
                </div>
                
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px;">
                    <div>
                        <label>Guests</label>
                        <select id="modalGuests" onchange="updateMultiRoomSummary()">
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
                
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px;">
                    <div>
                        <label>Check-out</label>
                        <input type="date" id="modalCheckOut">
                    </div>
                    <div></div>
                </div>
                
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px;">
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
                    <input type="email" id="guestEmail">
                </div>
                
                <div style="background:#f5f1ea; padding:15px;">
                    <div>Room Type: <span id="summaryRoom">AC Room</span></div>
                    <div>Rooms: <span id="summaryRooms">1</span></div>
                    <div>Guests: <span id="summaryGuests">2</span></div>
                    <div>Dates: <span id="summaryDates"></span></div>
                    <div>Nights: <span id="summaryNights">1</span></div>
                    <div style="font-weight:700;">Total: ₹<span id="summaryTotal">5000</span></div>
                </div>
                
                <button type="submit">Confirm Booking</button>
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
            <div id="confirmDetails"></div>
            <button onclick="closeConfirmModal()">Close</button>
        </div>
    </div>
</div>
`;

// ================ FACEBOOK LINK FUNCTION ================

function setFacebookLink() {
    const facebookLink = document.getElementById('facebookLink');
    if (facebookLink) {
        // Try to find the Facebook page - you can replace this with the actual URL if you find it
        facebookLink.href = 'https://www.facebook.com/search/top?q=Swami%20Holiday%20Home%20Alibag';
        facebookLink.target = '_blank';
        console.log('Facebook link set to search page');
    }
}

// ================ INITIALIZATION ================

document.addEventListener('DOMContentLoaded', function() {
    console.log("Initializing...");
    
    if (!document.getElementById('bookingModal')) {
        document.body.insertAdjacentHTML('beforeend', bookingModalHTML);
    }
    
    setupDates();
    setupBookingValidation();
    setupContactFormValidation();
    setFacebookLink(); // This sets the Facebook link
    
    const wasLoggedIn = sessionStorage.getItem('adminLoggedIn') === 'true';
    const loginModal = document.getElementById('adminLoginModal');
    const dashboard = document.getElementById('adminDashboard');
    
    if (wasLoggedIn && loginModal && dashboard) {
        loginModal.style.display = 'none';
        dashboard.style.display = 'block';
        loadAllAdminData();
    }
    setupDates();
setupRealTimeValidation();

// Make sure steps are initially hidden except step 1
document.querySelectorAll('.step').forEach((step, index) => {
    if (index === 0) {
        step.style.display = 'block';
    } else {
        step.style.display = 'none';
    }
});

// Initialize progress steps
document.querySelectorAll('.progress-step').forEach((step, index) => {
    step.classList.remove('active', 'completed');
    if (index === 0) {
        step.classList.add('active');
    }
});

// Set initial button states
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const submitBtn = document.getElementById('submitBtn');

if (prevBtn) prevBtn.style.display = 'none';
if (nextBtn) nextBtn.style.display = 'block';
if (submitBtn) submitBtn.style.display = 'none';
});