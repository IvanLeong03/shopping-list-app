import { useState } from 'react'
import { Sidebar } from './components/Sidebar'
import { useShoppingList } from './context/ShoppingListProvider'
import { ItemTable } from './components/ItemTable';
import { AddItemModal } from './components/AddItemModal';
import { ShoppingItem } from 'src/shared/types';
import { Settings } from './components/Settings';

function App(): React.JSX.Element {
  // eslint-disable-next-line prettier/prettier
  // We'll store our items here eventually
  const { items, addItem, updateItem, deleteItem, loading } = useShoppingList();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<ShoppingItem | null>(null)

  const handleEditClick = (item: ShoppingItem) => {
    setEditingItem(item)
    setIsModalOpen(true)
  }

  const handleAddClick = () => {
    setEditingItem(null) // Ensure it's empty for a new item
    setIsModalOpen(true)
  }

  const handleSave = async (itemData: ShoppingItem) => {
    if (editingItem) {
      // If we were editing, call update
      await updateItem(itemData)
    } else {
      // If not, it's a new item
      await addItem(itemData)
    }
    
    setIsModalOpen(false)
    setEditingItem(null) // Reset this so the next "Add" starts fresh
  }

  const handleDelete = async (id: string) => {
    await deleteItem(id)
    setIsModalOpen(false)
    setEditingItem(null)
  }

  const filteredItems = items.filter(item => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'high-priority') return item.priority === 'High';
    return item.category === selectedCategory;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Sidebar - Our Navigation */}
      <div className="flex h-screen">
        <Sidebar selectedCategory={selectedCategory} onSelect={setSelectedCategory} />

        <main className="flex-1 flex flex-col h-full overflow-hidden">
          {/* Top bar for actions */}
          {selectedCategory === 'settings' ? (
            <Settings />
          ) : (
            <>
              <header className="h-16 border-b border-[#31572c]/10 bg-[#fdfcf0] flex items-center justify-between px-8">
                <h2 className="text-lg font-semibold text-[#31572c]">
                  {selectedCategory === 'all' ? 'All Items' : 
                  selectedCategory === 'high-priority' ? 'High Priority' : selectedCategory}
                </h2>
                <button 
                onClick={handleAddClick}
                className="bg-[#31572c] text-[#ecf39e] px-4 py-2 rounded-md font-medium hover:opacity-90 transition-opacity"
                >
                  + Add Item
                </button>
              </header>
              <ItemTable items={filteredItems} onEdit={handleEditClick} />
            </>

          )}
          
        </main>

        <AddItemModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        onDelete={handleDelete}
        initialData={editingItem ? editingItem : null}        
        />

      </div>
    </div>
  )
}

export default App
