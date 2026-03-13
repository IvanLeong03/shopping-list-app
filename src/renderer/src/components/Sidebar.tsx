import { useShoppingList } from '../context/ShoppingListProvider'

interface SidebarProps {
    selectedCategory: string;
    onSelect: (category:string) => void;
}

export const Sidebar = ({ selectedCategory, onSelect }: SidebarProps) => {
    const { items, settings } = useShoppingList()

    const mainLinks = [
        { id: 'all', label: 'All Items'},
        { id: 'high-priority', label: 'High Priority'}
    ];

    const categories = Array.from(new Set(items.map(item => item.category)))

    return (
        <aside className="w-64 h-screen bg-[#31572c] text-white/80 p-6 flex flex-col gap-4">
            <h1 className="text-xl font-bold mb-8 text-[#ecf39e] tracking-tight">Shopping List</h1>
            
            <nav className='flex-1 px-4'>
                <div className="space-y-1 mb-4">
                    {mainLinks.map((link) => (
                        <button
                            key={link.id}
                            onClick={() => onSelect(link.id)}
                            className={`w-full text-left px-4 py-2 rounded-md transition-colours ${
                                selectedCategory === link.id ? 'text-[#ecf39e] font-medium' : 'hover:bg-white/5'
                            }`}
                        >
                            {link.label}
                        </button>
                    ))}       
                </div>

                <hr className="my-4 border-white/10" />
                <h2 className="px-4 text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">
                    Categories
                </h2>
                            
                <div className="space-y-1">
                    {settings.categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => onSelect(cat)}
                            className={`w-full text-white/80 text-left px-4 py-2 rounded-lg transition-colors ${
                                selectedCategory === cat ? 'text-[#ecf39e] bg-white/10 font-medium' : 'hover:bg-white/5'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </nav>

            <div className="p-4">
                <button 
                onClick={() => onSelect('settings')}
                className={`w-full text-left px-4 py-3 rounded-xl transition-colors flex items-center gap-3 ${
                    selectedCategory === 'settings' ? 'bg-[#ecf39e]/20 font-semibold' : 'hover:bg-[#4f772d]/50'
                }`}
                >
                    Settings
                </button>
            </div>
        </aside>
    )
}