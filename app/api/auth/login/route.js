// app/api/auth/login/route.js

import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';
import db from '@/lib/aws-config';
import { QueryCommand } from '@aws-sdk/lib-dynamodb';

/**
 * Handles POST requests to /api/auth/login.
 * This function authenticates a user and returns a JWT.
 * @param {Request} request - The incoming request object.
 * @returns {NextResponse} A response object.
 */
export async function POST(request) {
  try {
    // 1. Parse the request body
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required.' }, { status: 400 });
    }

    // 2. Find the user in DynamoDB using the email index
    const command = new QueryCommand({
      TableName: process.env.DYNAMODB_TABLE_NAME,
      IndexName: 'email-index', // The GSI we created
      KeyConditionExpression: 'email = :email',
      ExpressionAttributeValues: {
        ':email': email.toLowerCase(),
      },
    });

    const { Items } = await db.send(command);
    const user = Items[0];

    // 3. If user doesn't exist or password doesn't match, return error
    if (!user) {
      return NextResponse.json({ message: 'Invalid credentials.' }, { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Invalid credentials.' }, { status: 401 });
    }

    // 4. If credentials are valid, create a JWT
    const tokenPayload = {
      userId: user.userId,
      email: user.email,
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: '7d', // Token will expire in 7 days
    });

    // 5. Set the JWT in a secure, HTTP-only cookie
    const cookie = serialize('authToken', token, {
      httpOnly: true, // The cookie is not accessible via client-side JavaScript
      secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
      maxAge: 60 * 60 * 24 * 7, // 1 week in seconds
      path: '/', // The cookie is available for all paths
    });

    // 6. Return a success response
    const response = NextResponse.json({ message: 'Logged in successfully.' }, { status: 200 });
    response.headers.set('Set-Cookie', cookie);

    return response;

  } catch (error) {
    console.error('Login Error:', error);
    return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
  }
}
