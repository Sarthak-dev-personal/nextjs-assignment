import { NextResponse } from 'next/server';
import clientPromise from '../../../../config/mongodb';
import bcrypt from 'bcrypt';

export async function POST(req: Request) {
  const { username, password } = await req.json();

  const client = await clientPromise;
  const db = client.db('next-js-assignment');
  const usersCollection = db.collection('users');

  const existingUser = await usersCollection.findOne({ username });
  if (existingUser) {
    return NextResponse.json({ message: 'User already exists' }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await usersCollection.insertOne({ username, password: hashedPassword });

  return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
}
