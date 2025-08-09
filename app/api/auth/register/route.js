
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';
import db from '@/lib/aws-config'; // Import our configured DynamoDB client
import { PutCommand } from '@aws-sdk/lib-dynamodb';


export async function POST(request) {
  try {
    // 1. Parse the request body to get email and password
    const { email, password } = await request.json();

    // Basic validation
    if (!email || !password || password.length < 6) {
      return NextResponse.json(
        { message: 'Invalid input. Password should be at least 6 characters long.' },
        { status: 400 }
      );
    }

    // NOTE: In a real app, you'd also check if the user already exists.
    // We will add that logic later.

    // 2. Hash the password for security
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    // 3. Create a new user object
    const newUser = {
      userId: randomUUID(), // Generate a unique user ID
      email: email.toLowerCase(),
      passwordHash: hashedPassword,
      createdAt: new Date().toISOString(),
    };

    // 4. Prepare and send the command to DynamoDB
    const command = new PutCommand({
      TableName: process.env.DYNAMODB_TABLE_NAME,
      Item: newUser,
      // ConditionExpression ensures we don't overwrite an existing user with the same email
      // We will need to set up a Global Secondary Index on 'email' for this to be efficient.
      // For now, we'll rely on this basic check.
      ConditionExpression: 'attribute_not_exists(email)',
    });

    await db.send(command);

    // 5. Return a success response
    return NextResponse.json(
      { message: 'User created successfully.' },
      { status: 201 }
    );

  } catch (error) {
    // Handle potential errors, such as a user with the same email already existing
    if (error.name === 'ConditionalCheckFailedException') {
        return NextResponse.json(
            { message: 'A user with this email already exists.' },
            { status: 409 } // 409 Conflict
        );
    }

    console.error('Registration Error:', error);
    return NextResponse.json(
      { message: 'An internal server error occurred.' },
      { status: 500 }
    );
  }
}
