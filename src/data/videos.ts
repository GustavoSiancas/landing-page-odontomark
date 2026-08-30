import desktop1 from '../assets/videos/desktop/video-1.mp4'
import desktop2 from '../assets/videos/desktop/video-2.mp4'
import desktop3 from '../assets/videos/desktop/video-3.mp4'
import desktop4 from '../assets/videos/desktop/video-4.mp4'
import desktop5 from '../assets/videos/desktop/video-5.mp4'
import desktop6 from '../assets/videos/desktop/video-6.mp4'
import desktop7 from '../assets/videos/desktop/video-7.mp4'
import desktop8 from '../assets/videos/desktop/video-8.mp4'
import desktopWebm1 from '../assets/videos/desktop/video-1.webm'
import desktopWebm2 from '../assets/videos/desktop/video-2.webm'
import desktopWebm3 from '../assets/videos/desktop/video-3.webm'
import desktopWebm4 from '../assets/videos/desktop/video-4.webm'
import desktopWebm5 from '../assets/videos/desktop/video-5.webm'
import desktopWebm6 from '../assets/videos/desktop/video-6.webm'
import desktopWebm7 from '../assets/videos/desktop/video-7.webm'
import desktopWebm8 from '../assets/videos/desktop/video-8.webm'
import mobile1 from '../assets/videos/mobile/video-1.mp4'
import mobile2 from '../assets/videos/mobile/video-2.mp4'
import mobile3 from '../assets/videos/mobile/video-3.mp4'
import mobile4 from '../assets/videos/mobile/video-4.mp4'
import mobile5 from '../assets/videos/mobile/video-5.mp4'
import mobile6 from '../assets/videos/mobile/video-6.mp4'
import mobile7 from '../assets/videos/mobile/video-7.mp4'
import mobile8 from '../assets/videos/mobile/video-8.mp4'
import mobileWebm1 from '../assets/videos/mobile/video-1.webm'
import mobileWebm2 from '../assets/videos/mobile/video-2.webm'
import mobileWebm3 from '../assets/videos/mobile/video-3.webm'
import mobileWebm4 from '../assets/videos/mobile/video-4.webm'
import mobileWebm5 from '../assets/videos/mobile/video-5.webm'
import mobileWebm6 from '../assets/videos/mobile/video-6.webm'
import mobileWebm7 from '../assets/videos/mobile/video-7.webm'
import mobileWebm8 from '../assets/videos/mobile/video-8.webm'
import poster1 from '../assets/videos/posters/video-1.webp'
import poster2 from '../assets/videos/posters/video-2.webp'
import poster3 from '../assets/videos/posters/video-3.webp'
import poster4 from '../assets/videos/posters/video-4.webp'
import poster5 from '../assets/videos/posters/video-5.webp'
import poster6 from '../assets/videos/posters/video-6.webp'
import poster7 from '../assets/videos/posters/video-7.webp'
import poster8 from '../assets/videos/posters/video-8.webp'

export interface ClinicVideo {
  desktop: VideoSources
  mobile: VideoSources
  poster: string
}

interface VideoSources {
  webm: string
  mp4: string
}

export const clinicVideos: ClinicVideo[] = [
  {
    desktop: { webm: desktopWebm1, mp4: desktop1 },
    mobile: { webm: mobileWebm1, mp4: mobile1 },
    poster: poster1,
  },
  {
    desktop: { webm: desktopWebm2, mp4: desktop2 },
    mobile: { webm: mobileWebm2, mp4: mobile2 },
    poster: poster2,
  },
  {
    desktop: { webm: desktopWebm3, mp4: desktop3 },
    mobile: { webm: mobileWebm3, mp4: mobile3 },
    poster: poster3,
  },
  {
    desktop: { webm: desktopWebm4, mp4: desktop4 },
    mobile: { webm: mobileWebm4, mp4: mobile4 },
    poster: poster4,
  },
  {
    desktop: { webm: desktopWebm5, mp4: desktop5 },
    mobile: { webm: mobileWebm5, mp4: mobile5 },
    poster: poster5,
  },
  {
    desktop: { webm: desktopWebm6, mp4: desktop6 },
    mobile: { webm: mobileWebm6, mp4: mobile6 },
    poster: poster6,
  },
  {
    desktop: { webm: desktopWebm7, mp4: desktop7 },
    mobile: { webm: mobileWebm7, mp4: mobile7 },
    poster: poster7,
  },
  {
    desktop: { webm: desktopWebm8, mp4: desktop8 },
    mobile: { webm: mobileWebm8, mp4: mobile8 },
    poster: poster8,
  },
]
