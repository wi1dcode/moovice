import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Weekly from './pages/Weekly'
import Popular from './pages/Popular'
import Favorites from './pages/Favorites'
import NotFound from './pages/NotFound'
import Header from './components/Header'

const App = () => {
  return (
    <BrowserRouter>
        <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='*' element={<NotFound />} />
        <Route path='/weekly' element={<Weekly />} />
        <Route path='/popular' element={<Popular />} />
        <Route path='/favorites' element={<Favorites />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App