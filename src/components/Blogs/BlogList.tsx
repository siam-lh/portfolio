import { Blog } from '@/payload-types'
import BlogCard from './BlogCard'
type Props = {
  projects: Blog[]
  title?: string
  description?: string
}
const BlogList = ({ projects, title, description }: Props) => {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default BlogList
