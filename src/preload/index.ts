import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { ShoppingItem, AppSettings } from '../shared/types'

const api = {
  // We'll define the bridge functions here
  getItems: () => ipcRenderer.invoke('get-items'),
  addItem: (item: ShoppingItem): Promise<{ success: boolean }> => 
    ipcRenderer.invoke('add-item', item),
  updateItem: (item: ShoppingItem) => ipcRenderer.invoke('update-item', item),
  deleteItem: (id: string) => ipcRenderer.invoke('delete-item', id),
  getSettings: () => ipcRenderer.invoke('get-settings'),
  updateSettings: (settings: AppSettings) => ipcRenderer.invoke('update-settings', settings),
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
}