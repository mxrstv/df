import './styles.css'

import { StrictMode } from 'react'
import { Routes, Route, HashRouter } from 'react-router'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import CreatePartner from './CreatePartner.jsx'
import UpdatePartner from './UpdatePartner.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <HashRouter>
    <StrictMode>
      <Routes>
        <Route path='/' element={<App/>}/>
        <Route path='/update' element={<UpdatePartner/>}/>
        <Route path='/create' element={<CreatePartner/>}/>
      </Routes>
    </StrictMode>
  </HashRouter>
)
