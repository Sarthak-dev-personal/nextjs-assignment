import { NextResponse } from 'next/server';
import clientPromise from '../../../config/mongodb';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const client = await clientPromise;
  const db = client.db('next-js-assignment');
  const todosCollection = db.collection('todos');

  const todos = await todosCollection.find({ userId: session.user.id }).toArray();
  return NextResponse.json(todos);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { title, description, status } = await req.json();
  const client = await clientPromise;
  const db = client.db('next-js-assignment');
  const todosCollection = db.collection('todos');

  const newTodo = {
    title,
    description,
    status,
    userId: session.user.id,
  };

  await todosCollection.insertOne(newTodo);
  return NextResponse.json({ message: 'TODO created successfully' }, { status: 201 });
}
