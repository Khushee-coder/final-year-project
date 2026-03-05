// ========== COMPLETE SCRIPT.JS - NO CURSOR ON BANNER ==========

// ========== BOOKING MODAL FUNCTIONS ==========

// Open booking modal
function openBookingModal(roomType = 'ac') {
    const modal = document.getElementById('bookingModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        const roomSelect = document.getElementById('modalRoomType');
        if (roomSelect && roomType) {
            roomSelect.value = roomType;
        }
        
        setupDates();
        updateBookingSummary();
        clearAllErrors();
    }
}

// Close booking modal
function closeBookingModal() {
    const modal = document.getElementById('bookingModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        clearAllErrors();
    }
}

// Close confirmation modal
function closeConfirmModal() {
    const modal = document.getElementById('confirmModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Clear all error messages
function clearAllErrors() {
    document.querySelectorAll('.error-message').forEach(el => el.remove());
    document.querySelectorAll('.error-border').forEach(el => el.classList.remove('error-border'));
}

// Show error message
function showError(inputId, message) {
    const input = document.getElementById(inputId);
    if (!input) return;
    
    const existingError = input.parentNode.querySelector('.error-message');
    if (existingError) existingError.remove();
    
    input.classList.add('error-border');
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.color = '#f44336';
    errorDiv.style.fontSize = '0.8rem';
    errorDiv.style.marginTop = '5px';
    errorDiv.style.display = 'flex';
    errorDiv.style.alignItems = 'center';
    errorDiv.style.gap = '5px';
    errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
    
    input.parentNode.appendChild(errorDiv);
}

// Remove error for specific input
function removeError(inputId) {
    const input = document.getElementById(inputId);
    if (!input) return;
    
    input.classList.remove('error-border');
    const error = input.parentNode.querySelector('.error-message');
    if (error) error.remove();
}

// ================ VALIDATION FUNCTIONS ================

// Validate Name (only letters and spaces)
function validateName(name) {
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!name || name.trim() === '') {
        return { isValid: false, message: 'Name is required' };
    }
    if (name.trim().length < 3) {
        return { isValid: false, message: 'Name must be at least 3 characters' };
    }
    if (!nameRegex.test(name.trim())) {
        return { isValid: false, message: 'Name can only contain letters and spaces' };
    }
    return { isValid: true, message: '' };
}

// Validate Phone (10 digits, starts with 6-9)
function validatePhone(phone) {
    const cleaned = phone.replace(/\D/g, '');
    const phoneRegex = /^[6-9]\d{9}$/;
    
    if (!phone || phone.trim() === '') {
        return { isValid: false, message: 'Phone number is required' };
    }
    if (cleaned.length !== 10) {
        return { isValid: false, message: 'Phone number must be 10 digits' };
    }
    if (!phoneRegex.test(cleaned)) {
        return { isValid: false, message: 'Phone number must start with 6,7,8 or 9' };
    }
    return { isValid: true, message: '', cleaned: cleaned };
}

// Validate Email (proper format)
function validateEmail(email) {
    if (!email || email.trim() === '') {
        return { isValid: true, message: '' };
    }
    
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if (!emailRegex.test(email.trim())) {
        return { isValid: false, message: 'Enter a valid email address (e.g., name@domain.com)' };
    }
    
    return { isValid: true, message: '' };
}

// Validate Dates
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

// Setup date restrictions
function setupDates() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
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
            const checkInDate = new Date(this.value);
            const nextDay = new Date(checkInDate);
            nextDay.setDate(nextDay.getDate() + 1);
            
            if (checkOut) {
                checkOut.min = nextDay.toISOString().split('T')[0];
                if (new Date(checkOut.value) <= checkInDate) {
                    checkOut.value = nextDay.toISOString().split('T')[0];
                }
            }
            
            const datesValid = validateDates(checkIn.value, checkOut?.value);
            if (!datesValid.isValid) {
                showError('modalCheckIn', datesValid.message);
            } else {
                removeError('modalCheckIn');
                removeError('modalCheckOut');
            }
            
            updateBookingSummary();
        };
    }
    
    if (checkOut) {
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        checkOut.min = tomorrow.toISOString().split('T')[0];
        checkOut.max = maxDateStr;
        checkOut.value = tomorrow.toISOString().split('T')[0];
        
        checkOut.onchange = function() {
            const datesValid = validateDates(checkIn?.value, checkOut.value);
            if (!datesValid.isValid) {
                showError('modalCheckOut', datesValid.message);
            } else {
                removeError('modalCheckOut');
            }
            updateBookingSummary();
        };
    }
    
    const guests = document.getElementById('modalGuests');
    if (guests) guests.onchange = updateBookingSummary;
    
    const roomType = document.getElementById('modalRoomType');
    if (roomType) roomType.onchange = updateBookingSummary;
}

// Update booking summary
function updateBookingSummary() {
    const checkIn = document.getElementById('modalCheckIn')?.value;
    const checkOut = document.getElementById('modalCheckOut')?.value;
    const guests = parseInt(document.getElementById('modalGuests')?.value || 2);
    const roomType = document.getElementById('modalRoomType')?.value || 'ac';
    
    const prices = JSON.parse(localStorage.getItem('prices')) || { ac: 2500, pet: 2500 };
    const roomPrice = roomType === 'ac' ? prices.ac : prices.pet;
    
    if (checkIn && checkOut) {
        const start = new Date(checkIn);
        const end = new Date(checkOut);
        const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        
        if (nights > 0) {
            const total = guests * roomPrice * nights;
            
            const summaryRoom = document.getElementById('summaryRoom');
            const summaryDates = document.getElementById('summaryDates');
            const summaryGuests = document.getElementById('summaryGuests');
            const summaryNights = document.getElementById('summaryNights');
            const summaryTotal = document.getElementById('summaryTotal');
            
            if (summaryRoom) summaryRoom.textContent = roomType === 'ac' ? 'AC Room' : 'Pet Friendly Room';
            if (summaryDates) summaryDates.innerHTML = `${new Date(checkIn).toLocaleDateString()} - ${new Date(checkOut).toLocaleDateString()}`;
            if (summaryGuests) summaryGuests.textContent = guests;
            if (summaryNights) summaryNights.textContent = nights;
            if (summaryTotal) summaryTotal.textContent = total;
        }
    }
}

// Process booking
function processBooking(event) {
    event.preventDefault();
    
    let isValid = true;
    
    const name = document.getElementById('guestName')?.value;
    const phone = document.getElementById('guestPhone')?.value;
    const email = document.getElementById('guestEmail')?.value;
    const guests = document.getElementById('modalGuests')?.value;
    const checkIn = document.getElementById('modalCheckIn')?.value;
    const checkOut = document.getElementById('modalCheckOut')?.value;
    const roomType = document.getElementById('modalRoomType')?.value;
    
    clearAllErrors();
    
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
    
    if (email && email.trim() !== '') {
        const emailValidation = validateEmail(email);
        if (!emailValidation.isValid) {
            showError('guestEmail', emailValidation.message);
            isValid = false;
        }
    }
    
    const datesValidation = validateDates(checkIn, checkOut);
    if (!datesValidation.isValid) {
        showError('modalCheckIn', datesValidation.message);
        isValid = false;
    }
    
    if (!isValid) {
        const firstError = document.querySelector('.error-border');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
    }
    
    const prices = JSON.parse(localStorage.getItem('prices')) || { ac: 2500, pet: 2500 };
    const roomPrice = roomType === 'ac' ? prices.ac : prices.pet;
    const nights = datesValidation.nights || 1;
    const total = parseInt(guests) * roomPrice * nights;
    
    const booking = {
        id: 'BKG' + Date.now().toString().slice(-8),
        guestName: name.trim(),
        guestPhone: phone.replace(/\D/g, ''),
        guestEmail: email || '',
        roomType: roomType,
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
    
    const rooms = JSON.parse(localStorage.getItem('rooms')) || [
        { number: '101', type: 'ac', status: 'available', guest: null },
        { number: '102', type: 'ac', status: 'available', guest: null },
        { number: '103', type: 'ac', status: 'available', guest: null },
        { number: '104', type: 'pet', status: 'available', guest: null }
    ];
    
    const availableRoom = rooms.find(r => r.type === roomType && r.status === 'available');
    if (availableRoom) {
        availableRoom.status = 'occupied';
        availableRoom.guest = name.trim();
        availableRoom.checkIn = checkIn;
        availableRoom.checkOut = checkOut;
        localStorage.setItem('rooms', JSON.stringify(rooms));
    }
    
    closeBookingModal();
    
    const confirmGuestName = document.getElementById('confirmGuestName');
    const confirmDetails = document.getElementById('confirmDetails');
    const confirmModal = document.getElementById('confirmModal');
    
    if (confirmGuestName) confirmGuestName.textContent = name.trim();
    if (confirmDetails) {
        confirmDetails.innerHTML = `
            <p><strong>Booking ID:</strong> ${booking.id}</p>
            <p><strong>Name:</strong> ${name.trim()}</p>
            <p><strong>Phone:</strong> ${phone.replace(/\D/g, '')}</p>
            <p><strong>Email:</strong> ${email || 'Not provided'}</p>
            <p><strong>Room:</strong> ${roomType === 'ac' ? 'AC Room' : 'Pet Friendly'}</p>
            <p><strong>Check-in:</strong> ${new Date(checkIn).toLocaleDateString()}</p>
            <p><strong>Check-out:</strong> ${new Date(checkOut).toLocaleDateString()}</p>
            <p><strong>Guests:</strong> ${guests}</p>
            <p><strong>Nights:</strong> ${nights}</p>
            <p><strong>Total:</strong> ₹${total}</p>
        `;
    }
    if (confirmModal) confirmModal.classList.add('active');
}

// ================ REAL-TIME VALIDATION ================

function setupRealTimeValidation() {
    const nameInput = document.getElementById('guestName');
    if (nameInput) {
        nameInput.addEventListener('input', function() {
            const validation = validateName(this.value);
            if (!validation.isValid && this.value.trim() !== '') {
                showError('guestName', validation.message);
            } else {
                removeError('guestName');
            }
        });
        
        nameInput.addEventListener('blur', function() {
            if (this.value.trim() === '') {
                showError('guestName', 'Name is required');
            }
        });
    }
    
    const phoneInput = document.getElementById('guestPhone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            this.value = this.value.replace(/[^0-9]/g, '');
            
            const validation = validatePhone(this.value);
            if (!validation.isValid && this.value.trim() !== '') {
                showError('guestPhone', validation.message);
            } else {
                removeError('guestPhone');
            }
        });
        
        phoneInput.addEventListener('blur', function() {
            if (this.value.trim() === '') {
                showError('guestPhone', 'Phone number is required');
            }
        });
    }
    
    const emailInput = document.getElementById('guestEmail');
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

// ================ SIMPLE CAROUSEL - NO CURSOR ISSUES ================
document.addEventListener('DOMContentLoaded', function() {
    // Only run if carousel exists
    const carouselSlide = document.getElementById('carouselSlide');
    if (!carouselSlide) return;
    
    const slides = document.querySelectorAll('.carousel-item');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dots = document.querySelectorAll('.dot');
    
    if (slides.length === 0) return;
    
    let currentIndex = 0;
    
    function showSlide(index) {
        if (index >= slides.length) currentIndex = 0;
        else if (index < 0) currentIndex = slides.length - 1;
        else currentIndex = index;
        
        carouselSlide.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        dots.forEach((dot, i) => {
            if (i === currentIndex) {
                dot.classList.add('active-dot');
            } else {
                dot.classList.remove('active-dot');
            }
        });
    }
    
    if (prevBtn) {
        prevBtn.onclick = function() {
            showSlide(currentIndex - 1);
        };
    }
    
    if (nextBtn) {
        nextBtn.onclick = function() {
            showSlide(currentIndex + 1);
        };
    }
    
    dots.forEach((dot, i) => {
        dot.onclick = function() {
            showSlide(i);
        };
    });
    
    // Auto play
    setInterval(function() {
        showSlide(currentIndex + 1);
    }, 5000);
    
    // Initialize
    showSlide(0);
});

// ================ BOOKING MODAL HTML ================

const bookingModalHTML = `
<!-- Booking Modal -->
<div class="booking-modal" id="bookingModal">
    <div class="booking-modal-content">
        <div class="booking-modal-header">
            <h3><i class="fas fa-calendar-check"></i> Book Your Stay</h3>
            <button class="modal-close" onclick="closeBookingModal()">&times;</button>
        </div>
        <div class="booking-modal-body">
            <div class="booking-progress" style="display:flex; justify-content:space-between; margin-bottom:20px; padding:10px; background:#f5f1ea; border-radius:50px;">
                <span style="color:#0a4d4c; font-weight:600;"><i class="fas fa-check-circle" style="color:#ff8a7a;"></i> Dates</span>
                <span><i class="fas fa-user"></i> Details</span>
                <span><i class="fas fa-credit-card"></i> Payment</span>
            </div>
            
            <form onsubmit="processBooking(event)">
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px; margin-bottom:15px;">
                    <div>
                        <label style="display:block; margin-bottom:5px; font-weight:600; color:#0a4d4c;"><i class="fas fa-bed" style="color:#ff8a7a;"></i> Room Type</label>
                        <select id="modalRoomType" style="width:100%; padding:10px; border:2px solid #f5e6d3; border-radius:8px;">
                            <option value="ac">AC Room - ₹2,500/person</option>
                            <option value="pet">Pet Friendly Room - ₹2,500/person</option>
                        </select>
                    </div>
                    <div>
                        <label style="display:block; margin-bottom:5px; font-weight:600; color:#0a4d4c;"><i class="fas fa-user-friends" style="color:#ff8a7a;"></i> Guests</label>
                        <select id="modalGuests" style="width:100%; padding:10px; border:2px solid #f5e6d3; border-radius:8px;">
                            <option value="1">1 Guest</option>
                            <option value="2" selected>2 Guests</option>
                            <option value="3">3 Guests</option>
                            <option value="4">4 Guests</option>
                        </select>
                    </div>
                </div>
                
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px; margin-bottom:15px;">
                    <div>
                        <label style="display:block; margin-bottom:5px; font-weight:600; color:#0a4d4c;"><i class="fas fa-calendar-plus" style="color:#ff8a7a;"></i> Check-in</label>
                        <input type="date" id="modalCheckIn" style="width:100%; padding:10px; border:2px solid #f5e6d3; border-radius:8px;">
                    </div>
                    <div>
                        <label style="display:block; margin-bottom:5px; font-weight:600; color:#0a4d4c;"><i class="fas fa-calendar-minus" style="color:#ff8a7a;"></i> Check-out</label>
                        <input type="date" id="modalCheckOut" style="width:100%; padding:10px; border:2px solid #f5e6d3; border-radius:8px;">
                    </div>
                </div>
                
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px; margin-bottom:15px;">
                    <div>
                        <label style="display:block; margin-bottom:5px; font-weight:600; color:#0a4d4c;"><i class="fas fa-user" style="color:#ff8a7a;"></i> Full Name</label>
                        <input type="text" id="guestName" placeholder="Enter your full name" style="width:100%; padding:10px; border:2px solid #f5e6d3; border-radius:8px;" required>
                        <small style="color:#8b8a88; display:block; margin-top:3px;">Only letters allowed</small>
                    </div>
                    <div>
                        <label style="display:block; margin-bottom:5px; font-weight:600; color:#0a4d4c;"><i class="fas fa-phone" style="color:#ff8a7a;"></i> Phone</label>
                        <input type="tel" id="guestPhone" placeholder="10 digit mobile number" maxlength="10" style="width:100%; padding:10px; border:2px solid #f5e6d3; border-radius:8px;" required>
                    </div>
                </div>
                
                <div style="margin-bottom:20px;">
                    <label style="display:block; margin-bottom:5px; font-weight:600; color:#0a4d4c;"><i class="fas fa-envelope" style="color:#ff8a7a;"></i> Email</label>
                    <input type="email" id="guestEmail" placeholder="your@email.com" style="width:100%; padding:10px; border:2px solid #f5e6d3; border-radius:8px;">
                </div>
                
                <div style="background:#f5f1ea; padding:15px; border-radius:8px; margin:20px 0; border-left:4px solid #ff8a7a;">
                    <div style="display:flex; justify-content:space-between; padding:5px 0;"><span>Room:</span> <span id="summaryRoom">AC Room</span></div>
                    <div style="display:flex; justify-content:space-between; padding:5px 0;"><span>Dates:</span> <span id="summaryDates"></span></div>
                    <div style="display:flex; justify-content:space-between; padding:5px 0;"><span>Guests:</span> <span id="summaryGuests">2</span></div>
                    <div style="display:flex; justify-content:space-between; padding:5px 0;"><span>Nights:</span> <span id="summaryNights">1</span></div>
                    <div style="display:flex; justify-content:space-between; padding:8px 0; font-weight:700; color:#0a4d4c; border-top:2px solid #ff8a7a; margin-top:5px;">
                        <span>Total:</span> ₹<span id="summaryTotal">5000</span>
                    </div>
                </div>
                
                <button type="submit" style="width:100%; background:#ff8a7a; color:white; border:none; padding:15px; border-radius:50px; font-weight:700; font-size:1.1rem; cursor:pointer;">
                    <i class="fas fa-lock"></i> Confirm Booking
                </button>
            </form>
        </div>
    </div>
</div>

<!-- Confirmation Modal -->
<div class="booking-modal" id="confirmModal">
    <div class="booking-modal-content" style="max-width:400px;">
        <div class="booking-modal-header" style="background:#4caf50;">
            <h3><i class="fas fa-check-circle"></i> Booking Confirmed!</h3>
            <button class="modal-close" onclick="closeConfirmModal()">&times;</button>
        </div>
        <div class="booking-modal-body" style="text-align:center;">
            <i class="fas fa-check-circle" style="font-size:4rem; color:#4caf50; margin:20px 0;"></i>
            <h4>Thank You, <span id="confirmGuestName">Guest</span>!</h4>
            <div id="confirmDetails" style="background:#f5f1ea; padding:15px; border-radius:8px; margin:20px 0; text-align:left;"></div>
            <button class="btn btn-primary" onclick="closeConfirmModal()" style="background:#0a4d4c; color:white; border:none; padding:10px 30px; border-radius:50px; cursor:pointer;">Close</button>
        </div>
    </div>
</div>
`;

// Add booking modal to page if it doesn't exist
document.addEventListener('DOMContentLoaded', function() {
    if (!document.getElementById('bookingModal')) {
        document.body.insertAdjacentHTML('beforeend', bookingModalHTML);
    }
    
    setupDates();
    setupRealTimeValidation();
});