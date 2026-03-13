import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { ShoppingItem } from '../../../shared/types'

interface AppSettings {
  categories: string[]
  currencies: string[]
}

interface ShoppingContextType {
  items: ShoppingItem[]
  settings: AppSettings
  addItem: (item: ShoppingItem) => Promise<void>
  updateItem: (item: ShoppingItem) => Promise<void>
  refreshItems: () => Promise<void>
  deleteItem: (id: string) => Promise<void>
  updateSettings: (newSettings: AppSettings) => Promise<void>
  loading: boolean
}

const ShoppingContext = createContext<ShoppingContextType | undefined>(undefined)

export const ShoppingListProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<ShoppingItem[]>([])
  const [loading, setLoading] = useState(true)
  const [ settings, setSettings ] = useState<AppSettings>({
    categories: [],
    currencies: []
  })

  const refreshData = async () => {
    try {
      const [itemsData, settingsData] = await Promise.all([
        window.api.getItems(),
        window.api.getSettings()
      ])
      setItems(itemsData || [])
      setSettings(settingsData || { categories: [], currencies: [] })
    } catch (error) {
      console.error("Failed to fetch data:", error)
    }
  }

  const refreshItems = async () => {
    const data = await window.api.getItems()
    setItems(data)
  }

  const addItem = async (item: ShoppingItem) => {
    await window.api.addItem(item)
    await refreshItems() // Refresh the list after adding
  }

  const updateItem = async (item: ShoppingItem) => {
    await window.api.updateItem(item)
    await refreshItems()
  }

  const deleteItem = async (id: string) => {
    await window.api.deleteItem(id)
    await refreshItems()
  }

  const updateSettings = async (newSettings: AppSettings) => {
    await window.api.updateSettings(newSettings)
    setSettings(newSettings)
  }

  useEffect(() => {
    refreshData().finally(() => setLoading(false))
  }, [])

  return (
    <ShoppingContext.Provider 
      value={{ 
        items, 
        settings,
        addItem, 
        updateItem, 
        deleteItem, 
        updateSettings,
        refreshItems: refreshData, 
        loading 
      }}
    >
      {children}
    </ShoppingContext.Provider>
  )
}

export const useShoppingList = () => {
  const context = useContext(ShoppingContext)
  if (!context) throw new Error('useShoppingList must be used within a Provider')
  return context
}