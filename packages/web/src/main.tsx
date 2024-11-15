import { createRoot } from 'react-dom/client'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { BrowserRouter } from 'react-router-dom'

import App from '@/layouts/App'
import HttpWrapper from '@/layouts/HttpWrapper'
import Auth from './routers/middlewares/Auth'

import '@/styles/index.css'

const render = (
  <DndProvider backend={HTML5Backend}>
    <BrowserRouter>
      <HttpWrapper>
        <Auth>
          <App />
        </Auth>
      </HttpWrapper>
    </BrowserRouter>
  </DndProvider>
)

createRoot(document.getElementById('root')!).render(render)
