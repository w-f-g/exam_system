import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import routers from './routers/index.tsx'

import './index.css'

const render = <RouterProvider router={routers} />

createRoot(document.getElementById('root')!).render(render)
