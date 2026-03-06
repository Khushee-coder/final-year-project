// ================ COMPLETE WORKING SCRIPT.JS - WITH FACEBOOK LINK ================

// ================ ADMIN LOGIN FUNCTIONS ================

let isAdminLoggedIn = false;

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

function loadAllAdminData() {
    loadBookingsData();
    loadEnquiriesData();
    loadRoomsData();
    loadPricesData();
    loadVegFoodItems();
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

function submitContactForm(event) {
    event.preventDefault();
    
    console.log("📝 Contact form submitted");
    
    const name = document.getElementById('contactName')?.value || '';
    const email = document.getElementById('contactEmail')?.value || '';
    const phone = document.getElementById('contactPhone')?.value || '';
    const subject = document.getElementById('contactSubject')?.value || '';
    const message = document.getElementById('contactMessage')?.value || '';
    
    let isValid = true;
    
    const nameValidation = validateContactName(name);
    if (!nameValidation.isValid) {
        showContactError('contactName', nameValidation.message);
        isValid = false;
    } else {
        removeContactError('contactName');
    }
    
    const emailValidation = validateContactEmail(email);
    if (!emailValidation.isValid) {
        showContactError('contactEmail', emailValidation.message);
        isValid = false;
    } else {
        removeContactError('contactEmail');
    }
    
    const phoneValidation = validateContactPhone(phone);
    if (!phoneValidation.isValid) {
        showContactError('contactPhone', phoneValidation.message);
        isValid = false;
    } else {
        removeContactError('contactPhone');
    }
    
    const subjectValidation = validateContactSubject(subject);
    if (!subjectValidation.isValid) {
        showContactError('contactSubject', subjectValidation.message);
        isValid = false;
    } else {
        removeContactError('contactSubject');
    }
    
    const messageValidation = validateContactMessage(message);
    if (!messageValidation.isValid) {
        showContactError('contactMessage', messageValidation.message);
        isValid = false;
    } else {
        removeContactError('contactMessage');
    }
    
    if (!isValid) {
        const firstError = document.querySelector('[style*="border-color: #f44336"]');
        if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return false;
    }
    
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
    
    let enquiries = JSON.parse(localStorage.getItem('enquiries')) || [];
    enquiries.push(enquiry);
    localStorage.setItem('enquiries', JSON.stringify(enquiries));
    
    alert('Thank you! Your message has been sent successfully.');
    document.getElementById('contactForm').reset();
    
    removeContactError('contactName');
    removeContactError('contactEmail');
    removeContactError('contactPhone');
    removeContactError('contactSubject');
    removeContactError('contactMessage');
    
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

function loadEnquiriesData() {
    console.log("📊 Loading enquiries...");
    
    const enquiries = JSON.parse(localStorage.getItem('enquiries')) || [];
    console.log("Found:", enquiries.length);
    
    const totalEnquiries = document.getElementById('totalEnquiries');
    if (totalEnquiries) totalEnquiries.textContent = enquiries.length;
    
    const container = document.getElementById('enquiriesList');
    if (!container) return;
    
    if (enquiries.length === 0) {
        container.innerHTML = `<div style="text-align:center; padding:40px;">No enquiries yet</div>`;
        return;
    }
    
    let html = '';
    enquiries.forEach(enquiry => {
        html += `<div style="background:white; padding:15px; margin-bottom:10px; border-radius:8px;">
            <p><strong>${enquiry.name}</strong> - ${enquiry.email}</p>
            <p>${enquiry.message}</p>
            <button onclick="deleteEnquiry('${enquiry.id}')">Delete</button>
        </div>`;
    });
    container.innerHTML = html;
}

function deleteEnquiry(id) {
    let enquiries = JSON.parse(localStorage.getItem('enquiries')) || [];
    enquiries = enquiries.filter(e => e.id != id);
    localStorage.setItem('enquiries', JSON.stringify(enquiries));
    loadEnquiriesData();
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

// ================ ROOMS MANAGEMENT ================

function loadRoomsData() {
    const rooms = JSON.parse(localStorage.getItem('rooms')) || [
        { number: '101', type: 'ac', status: 'available' },
        { number: '102', type: 'ac', status: 'available' },
        { number: '103', type: 'ac', status: 'available' },
        { number: '104', type: 'pet', status: 'available' }
    ];
    
    let available = 0;
    let html = '';
    
    rooms.forEach(r => {
        if (r.status === 'available') available++;
        html += `<tr>
            <td>${r.number}</td>
            <td>${r.type}</td>
            <td>${r.status}</td>
            <td>${r.guest || '-'}</td>
            <td><button onclick="checkOutRoom('${r.number}')">Check Out</button></td>
        </tr>`;
    });
    
    document.getElementById('roomsTable').innerHTML = html;
    document.getElementById('availableRooms').textContent = available;
}

function checkOutRoom(number) {
    let rooms = JSON.parse(localStorage.getItem('rooms')) || [];
    const room = rooms.find(r => r.number === number);
    if (room) {
        room.status = 'available';
        room.guest = null;
        localStorage.setItem('rooms', JSON.stringify(rooms));
        loadAllAdminData();
    }
}

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

function loadVegFoodItems() {
    const items = JSON.parse(localStorage.getItem('vegFoodItems')) || [];
    let html = '';
    items.forEach((item, i) => {
        html += `<div>
            <input value="${item.name}" id="vegName${i}">
            <input value="${item.price}" id="vegPrice${i}">
            <button onclick="removeVegFoodItem(${i})">Delete</button>
        </div>`;
    });
    document.getElementById('vegFoodItemsList').innerHTML = html;
}

function addVegFoodItem() {
    const items = JSON.parse(localStorage.getItem('vegFoodItems')) || [];
    items.push({ name: 'New Item', price: 0 });
    localStorage.setItem('vegFoodItems', JSON.stringify(items));
    loadVegFoodItems();
}

function removeVegFoodItem(i) {
    let items = JSON.parse(localStorage.getItem('vegFoodItems')) || [];
    items.splice(i, 1);
    localStorage.setItem('vegFoodItems', JSON.stringify(items));
    loadVegFoodItems();
}

function saveVegFoodItems() {
    const items = [];
    const inputs = document.querySelectorAll('#vegFoodItemsList input');
    for (let i = 0; i < inputs.length; i += 2) {
        items.push({
            name: inputs[i].value,
            price: parseInt(inputs[i+1].value) || 0
        });
    }
    localStorage.setItem('vegFoodItems', JSON.stringify(items));
    alert('Saved!');
}

// ================ NON-VEG FOOD MANAGEMENT ================

function loadNonVegFoodItems() {
    const items = JSON.parse(localStorage.getItem('nonVegFoodItems')) || [];
    let html = '';
    items.forEach((item, i) => {
        html += `<div>
            <input value="${item.name}" id="nonvegName${i}">
            <input value="${item.price}" id="nonvegPrice${i}">
            <button onclick="removeNonVegFoodItem(${i})">Delete</button>
        </div>`;
    });
    document.getElementById('nonVegFoodItemsList').innerHTML = html;
}

function addNonVegFoodItem() {
    const items = JSON.parse(localStorage.getItem('nonVegFoodItems')) || [];
    items.push({ name: 'New Item', price: 0 });
    localStorage.setItem('nonVegFoodItems', JSON.stringify(items));
    loadNonVegFoodItems();
}

function removeNonVegFoodItem(i) {
    let items = JSON.parse(localStorage.getItem('nonVegFoodItems')) || [];
    items.splice(i, 1);
    localStorage.setItem('nonVegFoodItems', JSON.stringify(items));
    loadNonVegFoodItems();
}

function saveNonVegFoodItems() {
    const items = [];
    const inputs = document.querySelectorAll('#nonVegFoodItemsList input');
    for (let i = 0; i < inputs.length; i += 2) {
        items.push({
            name: inputs[i].value,
            price: parseInt(inputs[i+1].value) || 0
        });
    }
    localStorage.setItem('nonVegFoodItems', JSON.stringify(items));
    alert('Saved!');
}

// ================ FACILITIES MANAGEMENT ================

function loadFacilities() {
    const items = JSON.parse(localStorage.getItem('facilities')) || [];
    let html = '';
    items.forEach((item, i) => {
        html += `<div>
            <input value="${item.name}" id="facName${i}">
            <input value="${item.icon}" id="facIcon${i}">
            <button onclick="removeFacility(${i})">Delete</button>
        </div>`;
    });
    document.getElementById('facilitiesList').innerHTML = html;
}

function addFacility() {
    const items = JSON.parse(localStorage.getItem('facilities')) || [];
    items.push({ name: 'New Facility', icon: 'plus' });
    localStorage.setItem('facilities', JSON.stringify(items));
    loadFacilities();
}

function removeFacility(i) {
    let items = JSON.parse(localStorage.getItem('facilities')) || [];
    items.splice(i, 1);
    localStorage.setItem('facilities', JSON.stringify(items));
    loadFacilities();
}

function saveFacilities() {
    const items = [];
    const inputs = document.querySelectorAll('#facilitiesList input');
    for (let i = 0; i < inputs.length; i += 2) {
        items.push({
            name: inputs[i].value,
            icon: inputs[i+1].value
        });
    }
    localStorage.setItem('facilities', JSON.stringify(items));
    alert('Saved!');
}

// ================ NEARBY PLACES MANAGEMENT ================

function loadNearbyPlaces() {
    const items = JSON.parse(localStorage.getItem('nearbyPlaces')) || [];
    let html = '';
    items.forEach((item, i) => {
        html += `<div>
            <input value="${item.name}" id="placeName${i}">
            <input value="${item.distance}" id="placeDist${i}">
            <input value="${item.image}" id="placeImg${i}">
            <button onclick="removeNearbyPlace(${i})">Delete</button>
        </div>`;
    });
    document.getElementById('nearbyList').innerHTML = html;
}

function addNearbyPlace() {
    const items = JSON.parse(localStorage.getItem('nearbyPlaces')) || [];
    items.push({ name: 'New Place', distance: '', image: '' });
    localStorage.setItem('nearbyPlaces', JSON.stringify(items));
    loadNearbyPlaces();
}

function removeNearbyPlace(i) {
    let items = JSON.parse(localStorage.getItem('nearbyPlaces')) || [];
    items.splice(i, 1);
    localStorage.setItem('nearbyPlaces', JSON.stringify(items));
    loadNearbyPlaces();
}

function saveNearbyPlaces() {
    const items = [];
    const inputs = document.querySelectorAll('#nearbyList input');
    for (let i = 0; i < inputs.length; i += 3) {
        items.push({
            name: inputs[i].value,
            distance: inputs[i+1].value,
            image: inputs[i+2].value
        });
    }
    localStorage.setItem('nearbyPlaces', JSON.stringify(items));
    alert('Saved!');
}

// ================ GAMES MANAGEMENT ================

function loadGames() {
    const items = JSON.parse(localStorage.getItem('games')) || [];
    let html = '';
    items.forEach((item, i) => {
        html += `<div>
            <input value="${item.name}" id="gameName${i}">
            <input value="${item.icon}" id="gameIcon${i}">
            <input value="${item.players}" id="gamePlayers${i}">
            <button onclick="removeGame(${i})">Delete</button>
        </div>`;
    });
    document.getElementById('gamesList').innerHTML = html;
}

function addGame() {
    const items = JSON.parse(localStorage.getItem('games')) || [];
    items.push({ name: 'New Game', icon: '', players: '' });
    localStorage.setItem('games', JSON.stringify(items));
    loadGames();
}

function removeGame(i) {
    let items = JSON.parse(localStorage.getItem('games')) || [];
    items.splice(i, 1);
    localStorage.setItem('games', JSON.stringify(items));
    loadGames();
}

function saveGames() {
    const items = [];
    const inputs = document.querySelectorAll('#gamesList input');
    for (let i = 0; i < inputs.length; i += 3) {
        items.push({
            name: inputs[i].value,
            icon: inputs[i+1].value,
            players: inputs[i+2].value
        });
    }
    localStorage.setItem('games', JSON.stringify(items));
    alert('Saved!');
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
        updateMultiRoomSummary();
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
    // Hide all steps
    document.querySelectorAll('.step').forEach(s => s.style.display = 'none');
    
    // Show current step
    const currentStepElement = document.querySelector(`.step${step}`);
    if (currentStepElement) {
        currentStepElement.style.display = 'block';
    }
    
    // Update progress indicators
    document.querySelectorAll('.progress-step').forEach((s, i) => {
        s.classList.remove('active', 'completed');
        if (i + 1 === step) {
            s.classList.add('active');
        } else if (i + 1 < step) {
            s.classList.add('completed');
        }
    });
    
    // Show/hide navigation buttons
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    
    if (prevBtn) {
        prevBtn.style.display = step === 1 ? 'none' : 'block';
    }
    
    if (nextBtn && submitBtn) {
        if (step === 3) {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'block';
            validateStep3();
        } else {
            nextBtn.style.display = 'block';
            submitBtn.style.display = 'none';
        }
    }
}

// Next step function - THIS IS CALLED BY THE NEXT BUTTON
function nextStep() {
    console.log("Next button clicked, current step:", currentStep);
    
    if (currentStep === 1) {
        if (validateStep1()) {
            currentStep++;
            showStep(currentStep);
        }
    } else if (currentStep === 2) {
        if (validateStep2()) {
            currentStep++;
            showStep(currentStep);
        }
    }
}

// Previous step function
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

// Step 2 validation - Guest Details
function validateStep2() {
    let isValid = true;
    
    const name = document.getElementById('guestName').value;
    const phone = document.getElementById('guestPhone').value;
    const email = document.getElementById('guestEmail').value;
    
    // Validate name
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
    
    // Validate phone
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
    
    // Validate email
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

// Step 3 validation - Just update summary
function validateStep3() {
    updateMultiRoomSummary();
    return true;
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
            if (summaryDates) summaryDates.textContent = `${new Date(checkIn).toLocaleDateString()} - ${new Date(checkOut).toLocaleDateString()}`;
            if (summaryGuests) summaryGuests.textContent = guests;
            if (summaryNights) summaryNights.textContent = nights;
            if (summaryRooms) summaryRooms.textContent = numRooms;
            if (summaryTotal) summaryTotal.textContent = total;
        }
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