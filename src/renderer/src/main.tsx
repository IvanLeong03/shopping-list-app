import './assets/main.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { ShoppingListProvider } from './context/ShoppingListProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ShoppingListProvider>
      <App />
    </ShoppingListProvider>
  </StrictMode>
)
