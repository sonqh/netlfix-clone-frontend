type Tab = 'movie' | 'tv' | 'person'

interface SearchTabsProps {
  activeTab: Tab
  onTabChange: (tab: Tab) => void
}

export const SearchTabs = ({ activeTab, onTabChange }: SearchTabsProps) => (
  <div className='flex justify-center gap-3 mb-4'>
    {(['movie', 'tv', 'person'] as const).map((tab) => (
      <button
        key={tab}
        className={`py-2 px-4 rounded capitalize ${activeTab === tab ? 'bg-red-600' : 'bg-gray-800'} hover:bg-red-700`}
        onClick={() => onTabChange(tab)}
      >
        {tab === 'tv' ? 'TV Shows' : tab}
      </button>
    ))}
  </div>
)
