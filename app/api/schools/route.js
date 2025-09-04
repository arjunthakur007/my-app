import pool from '@/lib/db';
import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';


// Configure Cloudinary using environment variables
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
    try {
        const formData = await request.formData();
        const imageFile = formData.get('image');

        if (!imageFile) {
            return NextResponse.json({ message: 'Image is required' }, { status: 400 });
        }

        const arrayBuffer = await imageFile.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const uploadResult = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({ folder: 'schoolImages' }, (error, result) => {
                if (error) reject(error);
                resolve(result);
            }).end(buffer);
        });

        const name = formData.get('name');
        const address = formData.get('address');
        const city = formData.get('city');
        const state = formData.get('state');
        const contact = formData.get('contact');
        const email_id = formData.get('email_id');
        const imageUrl = uploadResult.secure_url;

        const query = 'INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const values = [name, address, city, state, contact, imageUrl, email_id];

        await pool.query(query, values);

        return NextResponse.json({ message: 'School added successfully' }, { status: 201 });
    } catch (error) {
        console.error('Error adding school:', error);
        return NextResponse.json({ message: 'Failed to add school', error: error.message }, { status: 500 });
    }
}