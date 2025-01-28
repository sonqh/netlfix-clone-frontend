import { MediaType } from '@plotwist_app/tmdb/dist/utils/with_media_type'
import { create } from 'zustand'

interface ContentStore {
  contentType: MediaType
  setContentType: (type: MediaType) => void
}

export const useContentStore = create<ContentStore>((set) => ({
  contentType: 'movie',
  setContentType: (type) => set({ contentType: type })
}))
