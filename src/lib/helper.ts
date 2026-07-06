import { Media } from '@/payload-types'

export function isMedia(image: string | Media | null | undefined): image is Media {
  return typeof image === 'object' && image !== null
}
