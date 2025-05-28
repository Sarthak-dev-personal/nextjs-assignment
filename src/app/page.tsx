import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Welcome to My TODO App</h1>
      <p className="mb-4">Manage your tasks efficiently and effectively.</p>
      <div className="space-x-4">
        <Link href="/auth/register">
          <span className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer">Register</span>
        </Link>
        <Link href="/auth/login">
          <span className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer">Login</span>
        </Link>
      </div>
    </div>
  );
}
