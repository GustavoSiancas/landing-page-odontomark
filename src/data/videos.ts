import desktop1 from '../assets/videos/desktop/video-1.mp4'
import desktop2 from '../assets/videos/desktop/video-2.mp4'
import desktop3 from '../assets/videos/desktop/video-3.mp4'
import desktop4 from '../assets/videos/desktop/video-4.mp4'
import desktop5 from '../assets/videos/desktop/video-5.mp4'
import desktop6 from '../assets/videos/desktop/video-6.mp4'
import desktop7 from '../assets/videos/desktop/video-7.mp4'
import desktop8 from '../assets/videos/desktop/video-8.mp4'
import mobile1 from '../assets/videos/mobile/video-1.mp4'
import mobile2 from '../assets/videos/mobile/video-2.mp4'
import mobile3 from '../assets/videos/mobile/video-3.mp4'
import mobile4 from '../assets/videos/mobile/video-4.mp4'
import mobile5 from '../assets/videos/mobile/video-5.mp4'
import mobile6 from '../assets/videos/mobile/video-6.mp4'
import mobile7 from '../assets/videos/mobile/video-7.mp4'
import mobile8 from '../assets/videos/mobile/video-8.mp4'
import poster1 from '../assets/videos/posters/video-1.webp'
import poster2 from '../assets/videos/posters/video-2.webp'
import poster3 from '../assets/videos/posters/video-3.webp'
import poster4 from '../assets/videos/posters/video-4.webp'
import poster5 from '../assets/videos/posters/video-5.webp'
import poster6 from '../assets/videos/posters/video-6.webp'
import poster7 from '../assets/videos/posters/video-7.webp'
import poster8 from '../assets/videos/posters/video-8.webp'

export interface ClinicVideo {
  desktop: string
  mobile: string
  poster: string
}

export const clinicVideos: ClinicVideo[] = [
  { desktop: desktop1, mobile: mobile1, poster: poster1 },
  { desktop: desktop2, mobile: mobile2, poster: poster2 },
  { desktop: desktop3, mobile: mobile3, poster: poster3 },
  { desktop: desktop4, mobile: mobile4, poster: poster4 },
  { desktop: desktop5, mobile: mobile5, poster: poster5 },
  { desktop: desktop6, mobile: mobile6, poster: poster6 },
  { desktop: desktop7, mobile: mobile7, poster: poster7 },
  { desktop: desktop8, mobile: mobile8, poster: poster8 },
]
