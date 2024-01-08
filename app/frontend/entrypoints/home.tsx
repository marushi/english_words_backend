import React from 'react'
import ReactDOM from 'react-dom/client'
import { AppLayout } from '../src/components/AppLayout'
import App from '../src/App'
import '../src/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppLayout>
      <App />
    </AppLayout>
  </React.StrictMode>
)
