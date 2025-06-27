import Link from 'next/link'
import { getAllPosts } from '.src/lib/mdx'
import { format } from 'date-fns'

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>

      {posts.length === 0 ? (
        <p className="text-gray-600">No posts available. Check back soon!</p>
      ) : (
        <div className="space-y-8">
          {posts.map(post => (
            <article key={post.slug} className="border-b border-gray-200 pb-8">
              <Link href={`/blog/${post.slug}`} className="group">
                <h2 className="text-2xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h2>
              </Link>

              <div className="text-sm text-gray-500 mb-3">
                <time dateTime={post.date}>
                  {format(new Date(post.date), 'MMMM dd, yyyy')}
                </time>
              </div>

              <p className="text-gray-700 mb-4">{post.description}</p>

              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <Link
                href={`/blog/${post.slug}`}
                className="inline-block mt-4 text-blue-600 hover:text-blue-800 font-medium"
              >
                Read more →
              </Link>
            </article>
          ))}
        </div>
      )}

      <div className="mt-12">
        <Link href="/" className="text-blue-600 hover:text-blue-800">
          ← Back to Home
        </Link>
      </div>
    </div>
  )
}
