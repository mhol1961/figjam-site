'use client'

interface CategoryFilterProps {
  categories: { key: string; label: string }[]
  activeKey: string
  onSelect: (key: string) => void
  variant?: 'light' | 'dark'
}

export default function CategoryFilter({
  categories,
  activeKey,
  onSelect,
  variant = 'light',
}: CategoryFilterProps) {
  const isDark = variant === 'dark'

  return (
    <div className="flex gap-3 flex-wrap">
      {categories.map((c) => {
        const isActive = activeKey === c.key
        return (
          <button
            key={c.key}
            onClick={() => onSelect(c.key)}
            className={`px-5 py-2 rounded-sm font-sans text-[11px] tracking-[2px] uppercase cursor-pointer transition-all duration-300 border ${
              isActive
                ? 'bg-gold border-gold text-white'
                : isDark
                  ? 'bg-transparent border-white/20 text-white/60 hover:border-white/40'
                  : 'bg-transparent border-light-gray text-warm-gray hover:border-gold hover:text-gold'
            }`}
          >
            {c.label}
          </button>
        )
      })}
    </div>
  )
}
