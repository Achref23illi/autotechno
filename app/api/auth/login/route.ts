// app/api/auth/login/route.ts
import { NextResponse } from 'next/server';

// Admin credentials
const adminUser = {
  id: '1',
  name: 'Admin User',
  email: 'admin@autotechno.com',
  password: 'admin123', // In a real app, this would be hashed
  role: 'admin' as const,
};

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      );
    }

    console.log(`Login attempt for: ${email}`); // Debug log

    // Check if credentials match admin user
    if (email !== adminUser.email || password !== adminUser.password) {
      console.log('Invalid credentials'); // Debug log
      return NextResponse.json(
        { message: 'Invalid admin credentials' },
        { status: 401 }
      );
    }

    // Create a sanitized user object (without the password)
    const sanitizedUser = {
      id: adminUser.id,
      name: adminUser.name,
      email: adminUser.email,
      role: adminUser.role,
    };

    console.log('Login successful for admin'); // Debug log

    // Return user data
    return NextResponse.json({
      message: 'Login successful',
      user: sanitizedUser,
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}