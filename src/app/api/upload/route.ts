import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ success: false, error: 'No file uploaded' }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Create uploads directory if it doesn't exist
        const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
        try {
            await mkdir(uploadsDir, { recursive: true });
        } catch (err) {
            // Directory might already exist
        }

        // Generate unique filename
        const timestamp = Date.now();
        const filename = `${timestamp}-${file.name}`;
        const filepath = path.join(uploadsDir, filename);

        await writeFile(filepath, buffer);

        return NextResponse.json({
            success: true,
            filename: filename,
            url: `/uploads/${filename}`
        });
    } catch (error: any) {
        console.error('Error uploading file:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
