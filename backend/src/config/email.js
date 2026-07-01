const SibApiV3Sdk = require('sib-api-v3-sdk');

// Initialize Brevo API
const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_API_KEY;

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

async function sendBookingConfirmation(bookingData) {
    const { 
        guestEmail, 
        guestName, 
        bookingId, 
        roomNumber, 
        checkIn, 
        checkOut, 
        guests, 
        totalAmount, 
        paymentMethod 
    } = bookingData;

    const htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f5f1ea;">
            <div style="background: #0a4d4c; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
                <h1 style="margin: 0;">🏖️ Swami Holiday Home</h1>
                <p>Sasawane Beach, Alibag</p>
            </div>
            
            <div style="background: white; padding: 25px; border-radius: 0 0 10px 10px;">
                <h2 style="color: #0a4d4c;">Booking Confirmation</h2>
                <p>Dear ${guestName},</p>
                <p>Thank you for choosing Swami Holiday Home! Your booking has been confirmed.</p>
                
                <div style="background: #f5f1ea; padding: 15px; border-radius: 8px; margin: 20px 0;">
                    <h3 style="color: #0a4d4c; margin: 0 0 10px 0;">Booking Details</h3>
                    <p><strong>Booking ID:</strong> ${bookingId}</p>
                    <p><strong>Room:</strong> ${roomNumber}</p>
                    <p><strong>Guests:</strong> ${guests}</p>
                    <p><strong>Check-in:</strong> ${checkIn} (12:00 PM)</p>
                    <p><strong>Check-out:</strong> ${checkOut} (11:00 AM)</p>
                    <p><strong>Total Amount:</strong> ₹${totalAmount}</p>
                    <p><strong>Payment Method:</strong> ${paymentMethod}</p>
                </div>
                
                <div style="background: #e8f5e9; padding: 15px; border-radius: 8px; border-left: 4px solid #4caf50; margin: 20px 0;">
                    <h3 style="color: #0a4d4c; margin: 0 0 10px 0;">📍 Location</h3>
                    <p>Puro Aali, Sasawane Beach Road, Alibag - 402201</p>
                    <p><strong>📞 Contact:</strong> +91 91460 54013</p>
                </div>
                
                <p>For any queries, please contact us at <strong>+91 91460 54013</strong></p>
                <p>We look forward to hosting you! 🌊</p>
                
                <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;">
                <p style="color: #888; font-size: 12px; text-align: center;">
                    Swami Holiday Home | Puro Aali, Sasawane Beach Road, Alibag - 402201
                </p>
            </div>
        </div>
    `;

    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    sendSmtpEmail.sender = { 
        name: 'Swami Holiday Home', 
        email: 'reenamaniyar99@gmail.com'
    };
    sendSmtpEmail.to = [{ email: guestEmail, name: guestName }];
    sendSmtpEmail.subject = `Booking Confirmed - ${bookingId}`;
    sendSmtpEmail.htmlContent = htmlContent;

    try {
        const response = await apiInstance.sendTransacEmail(sendSmtpEmail);
        console.log(`✅ Email sent to ${guestEmail}`);
        return { success: true, messageId: response.messageId };
    } catch (error) {
        console.error('❌ Email failed:', error.message);
        return { success: false, error: error.message };
    }
}

module.exports = { sendBookingConfirmation };