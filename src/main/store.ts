import Store from 'electron-store'
import { ShoppingItem, AppSettings } from '../shared/types'

// This is the crucial part!
interface StoreSchema {
  items: ShoppingItem[]
  settings: AppSettings
}

const store = new Store<StoreSchema>({
  defaults: {
    items: [],
    settings: {
      categories: ['Electronics', 'Sports Gear', 'Clothing'],
      currencies: ['HKD', 'GBP', 'JPY']
    }
  }
})

export default store