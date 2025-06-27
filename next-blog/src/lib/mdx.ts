import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const contentDirectory = path.join(process.cwd(), 'src/content')

export interface BlogPost {
  slug: string
  title: string
  date: string
  description: string
  content: string
  tags: string[]
}

export function getAllPosts(): BlogPost[] {
  const fileNames = fs.readdirSync(contentDirectory)
  const allPostsData = fileNames
    .filter(name => name.endsWith('.mdx'))
    .map(name => {
      const slug = name.replace(/\.mdx$/, '')
      const fullPath = path.join(contentDirectory, name)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      return {
        slug,
        content,
        title: data.title || 'Untitled',
        date: data.date || new Date().toISOString(),
        description: data.description || '',
        tags: data.tags || [],
      } as BlogPost
    })

  return allPostsData.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(contentDirectory, `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      content,
      title: data.title || 'Untitled',
      date: data.date || new Date().toISOString(),
      description: data.description || '',
      tags: data.tags || [],
    } as BlogPost
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error)
    return null
  }
}

export function getAllPostSlugs(): { slug: string }[] {
  const fileNames = fs.readdirSync(contentDirectory)
  return fileNames
    .filter(name => name.endsWith('.mdx'))
    .map(name => ({
      slug: name.replace(/\.mdx$/, ''),
    }))
}
