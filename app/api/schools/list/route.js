import pool from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const [rows] = await pool.query('SELECT name, address, city, image FROM schools');
        return NextResponse.json(rows);
    } catch (error) {
        console.error('Error fetching schools:', error);
        return NextResponse.json({ message: 'Failed to fetch schools' }, { status: 500 });
    }
}