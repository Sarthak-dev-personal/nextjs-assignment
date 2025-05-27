import { NextResponse } from 'next/server';
import clientPromise from '../../../../config/mongodb';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/auth-options';
import { ObjectId } from 'mongodb';

export async function PUT(req: Request, context: { params: Promise<{ id: string }>, }) {
  const session = await getServerSession(authOptions);

  const { id } = await context.params;

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { title, description, status } = await req.json();
  const client = await clientPromise;
  const db = client.db('next-js-assignment');
  const todosCollection = db.collection('todos');

  if (!id || !ObjectId.isValid(id)) {
    return NextResponse.json({ message: 'Invalid ID' }, { status: 400 });
  }


  await todosCollection.updateOne({ _id: new ObjectId(id) }, {
    $set: { 
        title,
        description,
        status,
     }
  })

  return NextResponse.json({ message: 'Task updated successfully' }, { status: 200 });
}

export async function DELETE(req: Request, context: { params: Promise<{ id: string }>, }) {
  const session = await getServerSession(authOptions);

  const { id } = await context.params;

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const client = await clientPromise;
  const db = client.db('next-js-assignment');
  const todosCollection = db.collection('todos');

  if (!id || !ObjectId.isValid(id)) {
    return NextResponse.json({ message: 'Invalid ID' }, { status: 400 });
  }


  await todosCollection.findOneAndDelete({ _id: new ObjectId(id) });

  return NextResponse.json({ message: 'Task updated successfully' }, { status: 200 });
}
