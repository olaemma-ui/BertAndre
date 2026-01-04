import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export async function sendAppointmentNotification(appointment: any) {
    const mailOptions = {
        from: `"BertAndre Booking" <${process.env.EMAIL_USER}>`,
        to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
        subject: `New Appointment: ${appointment.full_name}`,
        html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                <h2 style="color: #1560bd; border-bottom: 2px solid #1560bd; padding-bottom: 10px;">New Consultation Request</h2>
                <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
                    <p><strong>Name:</strong> ${appointment.full_name}</p>
                    <p><strong>Email:</strong> ${appointment.email}</p>
                    <p><strong>Phone:</strong> ${appointment.phone}</p>
                    <p><strong>Service:</strong> ${appointment.service_type}</p>
                    <p><strong>Date:</strong> ${appointment.appointment_date}</p>
                    <p><strong>Time:</strong> ${appointment.appointment_time}</p>
                </div>
                <p style="color: #666; font-size: 14px;">This is an automated notification from your website.</p>
            </div>
        `,
    };

    return transporter.sendMail(mailOptions);
}

export async function sendContactNotification(message: any) {
    const mailOptions = {
        from: `"BertAndre Contact" <${process.env.EMAIL_USER}>`,
        to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
        subject: `New Message: ${message.name}`,
        html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                <h2 style="color: #fa8128; border-bottom: 2px solid #fa8128; padding-bottom: 10px;">New Contact Message</h2>
                <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
                    <p><strong>Name:</strong> ${message.name}</p>
                    <p><strong>Email:</strong> ${message.email}</p>
                    <p><strong>Service:</strong> ${message.service_type || 'General Inquiry'}</p>
                    <p><strong>Message:</strong></p>
                    <div style="background: white; padding: 10px; border-left: 4px solid #fa8128; margin-top: 10px;">
                        ${message.message}
                    </div>
                </div>
                <p style="color: #666; font-size: 14px;">You can reply directly to this email or view it in your admin dashboard.</p>
            </div>
        `,
    };

    return transporter.sendMail(mailOptions);
}
