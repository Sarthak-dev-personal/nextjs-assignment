import NextAuth from 'next-auth';
/* import CredentialsProvider from 'next-auth/providers/credentials';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from '../../../../config/mongodb';
import bcrypt from 'bcrypt'; */

import { authOptions } from './auth-options';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
