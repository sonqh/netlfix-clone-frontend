import { create } from 'zustand'

interface ContentStore {
  contentType: string
  setContentType: (type: string) => void
}

export const useContentStore = create<ContentStore>((set) => ({
  contentType: 'movie',
  setContentType: (type) => set({ contentType: type })
}))
