// app/page.js
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 text-center">
        Welcome to the School Project
      </h1>
      <p className="text-lg md:text-xl mb-8 text-center">
        Choose an action to get started:
      </p>
      <div className="flex flex-col sm:flex-row gap-y-8 sm:space-x-4">
        <Link href="/addSchool">
          <span className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition-colors cursor-pointer text-center">
            Add a New School
          </span>
        </Link>
        <Link href="/showSchools">
          <span className="px-6 py-3 bg-green-600 text-white font-semibold rounded-md shadow-md hover:bg-green-700 transition-colors cursor-pointer text-center">
            View All Schools
          </span>
        </Link>
      </div>
    </div>
  );
}
