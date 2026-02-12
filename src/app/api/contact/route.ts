import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, whatsapp, projectType, message } = body;

        // Validate required fields
        if (!name || !whatsapp || !message) {
            return NextResponse.json(
                { error: 'Faltan campos requeridos' },
                { status: 400 }
            );
        }

        // Configure transporter
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: true, // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        // Email content
        const mailOptions = {
            from: `"Web Naluz" <${process.env.SMTP_USER}>`,
            to: process.env.EMAIL_TO,
            subject: `Nueva Consulta Web: ${projectType} - ${name}`,
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #D4AF37;">Nueva Consulta Recibida</h2>
          <p>Has recibido un nuevo mensaje desde el formulario de contacto de la web.</p>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Nombre:</strong> ${name}</p>
            <p><strong>WhatsApp:</strong> ${whatsapp}</p>
            <p><strong>Tipo de Proyecto:</strong> ${projectType}</p>
            <p><strong>Mensaje:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          
          <p style="font-size: 12px; color: #666;">Este correo fue enviado automáticamente desde naluzloja.com</p>
        </div>
      `,
        };

        // Send email
        await transporter.sendMail(mailOptions);

        return NextResponse.json({ success: true, message: 'Correo enviado correctamente' });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json(
            { error: 'Error al enviar el correo' },
            { status: 500 }
        );
    }
}
