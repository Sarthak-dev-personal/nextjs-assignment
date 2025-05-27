import { NextResponse } from 'next/server';
import clientPromise from '../../../../config/mongodb';
import * as bcrypt from 'bcrypt';

export async function POST(req: Request) {
  const { username, password } = await req.json();

  const client = await clientPromise;
  const db = client.db('next-js-assignment');
  const usersCollection = db.collection('users');

  const user = await usersCollection.findOne({ username });
  if (!user) {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }

  return NextResponse.json({ message: 'Login successful', user: { id: user._id, username: user.username } }, { status: 200 });
}
