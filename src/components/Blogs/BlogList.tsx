import { Blog } from '@/payload-types'
import BlogCard from './BlogCard'
import NoItemsFound from '../common/NoItemsFound'
import { SearchBar } from '../common/SearchBar'
import { Pagination } from '../common/Pagination'
type Props = {
  blogs: Blog[]
  title?: string
  description?: string
  query?: string
  currentPage?: number
  totalPages?: number
}
const BlogList = ({
  blogs,
  title = 'Blogs',
  description = 'A collection of blogs where I talk about technologies and problem-solving experience in software development. I share my thoughts, insights, and experiences on various topics related to programming, web development, and the tech industry.',
  query = '',
  currentPage = 1,
  totalPages = 1,
}: Props) => {
  return (
    <section className="container">
      <div>
        <div className="mb-12 flex flex-col items-center text-center">
          <h1 className="list-title">{title}</h1>

          <p className="mt-2 max-w-4xl text-gray-200">{description}</p>
        </div>

        {blogs?.length === 0 ? (
          <NoItemsFound itemName="Blogs" />
        ) : (
          <div className="space-y-6">
            <SearchBar initialQuery={query} />
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3">
              {blogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
            {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} />}
          </div>
        )}
      </div>
    </section>
  )
}

export default BlogList
