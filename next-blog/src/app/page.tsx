import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <main className="text-center max-w-2xl">
        <h1 className="text-6xl font-bold mb-4">
          Welcome to My Blog
        </h1>

        <p className="text-xl text-gray-600 mb-8">
          A simple journey through building cool things.
        </p>

        <div className="space-x-4">
          <Link
            href="/blog"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            Read Blog
          </Link>

          <Link
            href="/blog"
            className="border border-gray-300 hover:border-gray-400 text-gray-700 font-bold py-3 px-6 rounded-lg transition-colords"
          >
            Latest Posts 
          </Link>
        </div>
      </main>
    </div>
  )
}