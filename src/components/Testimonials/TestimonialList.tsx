import TestimonialCard from './TestimonialCard'
import { getTestimonials } from '@/lib/quires'

export default async function TestimonialList() {
  const { docs: testimonials } = await getTestimonials()
  if (!testimonials.length) {
    return null
  }

  return (
    <section>
      <div className="container">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="w-full mx-auto">
            <h2 className="list-title">Testimonials</h2>

            <p className="mt-3 text-gray-400">
              Hear from the people I've worked with. Their experiences and feedback reflect my
              commitment to delivering high-quality work and fostering positive professional
              relationships.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  )
}
