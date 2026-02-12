import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

// GET: Fetch announcements (all for admin, active for public)
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const adminMode = searchParams.get('admin') === 'true';

        let sql = 'SELECT * FROM announcements';
        if (!adminMode) {
            sql += ' WHERE active = true';
        }
        sql += ' ORDER BY created_at DESC';

        const announcements = await query(sql);
        return NextResponse.json({ success: true, data: announcements });
    } catch (error: any) {
        console.error('Error fetching announcements:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

// POST: Create new announcement
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { title, offer, description, image_filename, pdf_filename, active } = body;

        const sql = 'INSERT INTO announcements (title, offer, description, image_filename, pdf_filename, active) VALUES (?, ?, ?, ?, ?, ?)';
        const result: any = await query(sql, [title, offer || '', description || '', image_filename || '', pdf_filename || '', active || false]);

        return NextResponse.json({ success: true, id: result.insertId });
    } catch (error: any) {
        console.error('Error creating announcement:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

// PUT: Update announcement
export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        const { id, title, offer, description, image_filename, pdf_filename, active } = body;

        const sql = 'UPDATE announcements SET title = ?, offer = ?, description = ?, image_filename = ?, pdf_filename = ?, active = ? WHERE id = ?';
        await query(sql, [title, offer || '', description || '', image_filename || '', pdf_filename || '', active || false, id]);

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('Error updating announcement:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

// DELETE: Remove announcement
export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 });
        }

        const sql = 'DELETE FROM announcements WHERE id = ?';
        await query(sql, [id]);

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('Error deleting announcement:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
