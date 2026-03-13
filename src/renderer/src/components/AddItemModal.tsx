import { useEffect, useState } from "react";
import { useShoppingList } from "@renderer/context/ShoppingListProvider";
import { ShoppingItem, Priority, Status } from "src/shared/types";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (item: ShoppingItem) => void;
    onDelete?: (id: string) => void;
    initialData? : ShoppingItem | null
}

export const AddItemModal = ({ isOpen, onClose, onSave, onDelete, initialData }: ModalProps) => {
    const { items, addItem, settings } = useShoppingList()

    //const existingCategories = Array.from(new Set(items.map(i => i.category)))

    const [formData, setFormData] = useState({
        name: '',
        category: '',
        price: 0,
        currency: 'HKD',
        priority: 'Low' as Priority,
        urls: ['']
    })


    useEffect(() => {
        if (initialData) {
            setFormData({
                ...initialData,
                urls: initialData.urls.length > 0 ? initialData.urls : ['']
            })
        } else {
            setFormData({name: '', category: '', price: '' as any, currency: 'HKD', priority: 'Low', urls: [''] })
        }
    }, [initialData, isOpen])

    if (!isOpen) return null

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        onSave({
            ...formData,
            id: initialData?.id || crypto.randomUUID(),
            status: initialData?.status || 'Considering' as Status,
            createdAt: initialData?.createdAt || Date.now()
        })
        onClose()
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="bg-[#ECF39E] p-8 rounded-lg w-112.5 border border-[#31572c]/20 shadow-xl">
                <h2 className="text-[#31572c] text-xl font-bold mb-6">
                    {initialData ? 'Edit Item' : 'Add New Item'}
                </h2>
                <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 text-[#31572c]"
                >
                    <div>
                        <label className="text-xs font-bold uppercase opacity-50">Item Name</label>
                        <input 
                            required
                            className="
                            w-full my-1 bg-white/90 rounded-lg border border-[#d9d9d9] p-2
                            focus:outline-none focus:border-[#31572c]
                            "
                            value={formData.name}
                            onChange={e => setFormData({...formData, name: e.target.value})}
                        />
                    </div>

                    <div>
                        <label className="text-xs font-bold uppercase opacity-50">Category</label>

                        <select
                            className="w-full my-1 bg-transparent border-b border-[#31572c]/30 py-2 focus:outline-none"
                            value={formData.category}
                            onChange={e => setFormData({...formData, category: e.target.value})}
                        >
                            <option value="" disabled>
                                Select a category
                            </option>
                            {settings.categories.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>

                    </div>

                    <div className="my-4 grid grid-cols-3 gap-4">
                        <div>
                            <label className="text-xs font-bold uppercase opacity-50">Price</label>
                            <input 
                                type="number"
                                placeholder="0"
                                onFocus={(e) => e.target.select()}
                                className="w-full my-1 bg-white/90 rounded-lg border border-[#d9d9d9] p-2 focus:outline-none focus:border-[#31572c]"
                                value={formData.price}
                                onChange={e => setFormData({...formData, price: Number(e.target.value)})}
                            />
                        </div>
                        <div>
                            <label className="text-xs font-bold uppercase opacity-50">Currency</label>
                            <select 
                                className="w-full my-1 bg-transparent border-b border-[#31572c]/30 py-2 focus:outline-none"
                                value={formData.currency}
                                onChange={e => setFormData({...formData, currency: e.target.value})}
                            >
                                {settings.currencies.map(cur => (
                                    <option key={cur} value={cur}>{cur}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="text-xs font-bold uppercase opacity-50">Priority</label>
                            <select
                                className="w-full my-1 bg-transparent border-b border-[#31572c]/30 py-2 focus:outline-none"
                                value={formData.priority}
                                onChange={e => setFormData({...formData, priority: e.target.value as Priority})}
                            >
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                        </div>
                    </div>
                    
                    <div className="">
                        <label className="text-xs font-bold opacity-50 uppercase">
                            Reference URL
                        </label>
                        {formData.urls.map((url, index) => (
                            <div key={index} className="flex flex-col">
                                <div className="grid grid-cols-[1fr_24px] gap-4 items-center mb-2">
                                    <input 
                                        type="url"
                                        placeholder="https://..."
                                        className="w-full my-1 bg-white/90 rounded-lg border border-[#d9d9d9] p-2 focus:outline-none"
                                        value={url}
                                        onChange={(e) => {
                                            const newUrls = [...formData.urls];
                                            newUrls[index] = e.target.value;
                                            setFormData({ ...formData, urls: newUrls});
                                        }}
                                    />
                                    {formData.urls.length > 1 ? (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const newUrls = formData.urls.filter((_, i) => i !== index);
                                                setFormData({ ...formData, urls:newUrls });
                                            }}
                                            className="w-8 h-8 flex items-center justify-center tracking-wide"
                                        >
                                            x
                                        </button>
                                    ) : (
                                        <div className="w-8" />
                                    )}                                
                                </div>

                                {index === formData.urls.length - 1 && (
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, urls: [...formData.urls, ''] })}
                                        className="flex items-center justify-center gap-1 text-sm rounded-full bg-transparent border border-[#31572c]/60 hover:bg-[#31572c]/10"
                                    >
                                        <span className="w-4 h-4 flex items-center justify-center">+</span>
                                        Add another URL
                                    </button>
                                )}
                            </div>                          
                        ))}                            
                    </div>
                                                                
                    <div className="flex items-center justify-between pt-8 gap-4">
                        {/* optinal delete button */}
                        <div>
                            {initialData && onDelete ? (
                                <button
                                    type="button"
                                    onClick={() => {
                                        if(confirm('Delete this item')) onDelete(initialData.id)
                                    }}
                                    className="text-red-500 text-xs font-bold hover:underline"
                                >
                                    Delete Item
                                </button>
                            ) : (
                                <div />
                            )}                            
                        </div>
                        <button 
                            type="button" 
                            onClick={onClose}
                            className="flex-1 py-3 text-[#31572c]/50 font-medium hover:text-[#31572c]"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit"
                            className="flex-1 py-3 bg-[#31572c] text-[#ecf39e] rounded-md font-bold shadow-md hover:opacity-90 transition-all"
                        >
                            Save Item
                        </button>
    
                    </div>                    
                </form>
            </div>
        </div>
    )

}