// app/api/auth/route.ts
import { NextResponse } from 'next/server';

// Since we're not connecting to a real database yet, we'll use this mock users array
const mockUsers = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@autotechno.com',
    password: 'admin123', // In a real app, this would be hashed
    role: 'admin' as const,
  },
  {
    id: '2',
    name: 'Test User',
    email: 'user@example.com',
    password: 'password123', // In a real app, this would be hashed
    role: 'user' as const,
  },
];

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

    // Find user by email (in a real app, this would query a database)
    const user = mockUsers.find((u) => u.email === email);

    // Check if user exists and password matches
    if (!user || user.password !== password) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      );
    }

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