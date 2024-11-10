import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from '@/layouts/App'
import HttpWrapper from '@/layouts/HttpWrapper'
import Auth from './routers/middlewares/Auth'

import '@/styles/index.css'

const render = (
  <BrowserRouter>
    <HttpWrapper>
      <Auth>
        <App />
      </Auth>
    </HttpWrapper>
  </BrowserRouter>
)

createRoot(document.getElementById('root')!).render(render)
