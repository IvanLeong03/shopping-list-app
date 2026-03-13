import { ElectronAPI } from '@electron-toolkit/preload'
import { StringifyOptions } from 'node:querystring'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      getItems: () => Promise<ShoppingItem[]>
      addItem: (item: ShoppingItem) => Promise<{ success: boolean }>
      updateItem: (item: ShoppingItem) => Promise<{ success: boolean }>
      deleteItem: (id: string) => Promise<{ success: boolean }>
      getSettings: () => Promise
      updateSettings: (settings: AppSettings) => Promise<{ success: boolean }>
    }    
  }
}
