import { useState } from "react"
import { useShoppingList } from "@renderer/context/ShoppingListProvider"

export const Settings = () => {
    const { settings, updateSettings } = useShoppingList()
    const [newCat, setNewCat] = useState('')
    const [newCurr, setNewCurr] = useState('')

    const removeItem = ( type: 'categories' | 'currencies', value: string) => {
        const updated = settings[type].filter((item) => item !== value)
        updateSettings({...settings, [type]: updated})
    }

    const addItem = ( type: 'categories' | 'currencies', value: string) => {
        if (!value.trim() || settings[type].includes(value)) return
        updateSettings({...settings, [type]: [...settings[type], value.trim()] })
        type === 'categories' ? setNewCat('') : setNewCurr('')
    }

    return (
        <div className="flex-1 p-12 bg-[#fdfcf0] text-[#31572c]">
            <h1 className="text-2xl font-bold mb-8">
                Settings
            </h1>

            <section className="mb-8">
                <h3 className="font-bold uppercase text-xs opacity-50 mb-4 tracking-wider">
                    My Categories
                </h3>
                <div className="flex flex-wrap gap-2 mb-4">
                    {settings.categories.map((cat) => (
                        <span 
                        key={cat} 
                        className="flex items-center gap-2 rounded-full border border-[#31572c]/20 bg-[#ECF39E]/30 px-4 py-2 text-sm font-medium"
                        >   
                            {cat}
                            <button
                                onClick={() => removeItem('categories', cat)} 
                                className="hover:text-red-600"
                            >
                                x
                            </button>
                        </span>
                    ))}
                </div>
                <input 
                    type="text"
                    placeholder="Add category and press Enter ..."
                    value={newCat}
                    onChange={(e) => setNewCat(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addItem('categories', newCat)}
                    className="w-full rounded-lg border border-[#d9d9d9] bg-white/80 p-3 focus:border-[#31572c]"
                />            
            </section>

            <section className="mb-8">
                <h3 className="font-bold uppercase text-xs opacity-50 mb-4 tracking-wider">
                    My Currencies
                </h3>
                <div className="flex flex-wrap gap-2 mb-4">
                    {settings.currencies.map((cur) => (
                        <span
                            key={cur}
                            className="flex items-center gap-4 rounded-full border border-[#31572c]/20 bg-[#ECF39E]/30 px-4 py-2 text-sm font-medium"
                        >
                            {cur}
                            <button
                                onClick={() => removeItem('currencies', cur)}
                                className="hover:text-red-600"                            
                            >
                               x 
                            </button>
                        </span>
                    ))}
                </div>

                <input 
                    type="text"
                    className="w-full rounded-lg border border-[#d9d9d9] bg-white/80 p-3 focus:border-[#31572c]"
                    placeholder="Add currency and press Enter ..."
                    value={newCurr}
                    onChange={(e) => setNewCurr(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addItem('currencies', newCurr)}
                />
            </section>
        </div>
    )
}