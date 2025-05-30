// app/api/auth/route.ts
import { NextResponse } from 'next/server';

// Since we're not connecting to a real database yet, we'll use this mock admin
const adminUser = {
  id: '1',
  name: 'Admin User',
  email: 'admin@autotechno.com',
  password: 'admin123', // In a real app, this would be hashed
  role: 'admin' as const,
};

// Login endpoint
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

    // Check if credentials match admin user
    if (email !== adminUser.email || password !== adminUser.password) {
      return NextResponse.json(
        { message: 'Invalid admin credentials' },
        { status: 401 }
      );
    }

    // Only proceed if this is the admin user
    const user = adminUser;

    // Create a sanitized user object (without the password)
    const sanitizedUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    // In a real app, you would create a JWT token here

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

// This would be used to check authentication status
export async function GET() {
  // In a real app, you would validate a JWT token from cookies or headers
  return NextResponse.json({
    message: 'Authentication check endpoint',
    authenticated: false,
  });
}