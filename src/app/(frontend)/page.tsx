import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'
import config from '@/payload.config'
import './styles.css'
import TestimonialList from '@/components/Testimonials/TestimonialList'
import SkillList from '@/components/Skills/SkillList'
import ExperienceList from '@/components/Experiences/ExperienceList'
import FeaturedBlogList from '@/components/Blogs/FeaturedBlogList'
import HeroSection from '@/components/Hero/Hero'
import FeaturedProjectList from '@/components/Projects/FeaturedProjectList'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  return (
    <div>
      <HeroSection />
      <ExperienceList />
      <SkillList />
      <FeaturedProjectList />
      <FeaturedBlogList />
      <TestimonialList />
    </div>
  )
}
