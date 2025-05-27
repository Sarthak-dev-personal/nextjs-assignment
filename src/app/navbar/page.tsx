"use client";

import {
    signOut,useSession,
} from 'next-auth/react';

import Link from 'next/link';

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="bg-gray-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-lg font-bold">My TODO App</Link>
        <div>
          {session ? (
            <>
              <span className="text-white mr-4">Welcome, {session.user.name}!</span>
              <button onClick={() => signOut()} className="text-white px-4 py-2 cursor-pointer">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login" className="text-white mr-4">Login</Link>
              <Link href="/auth/register" className="text-white px-4 py-2">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
