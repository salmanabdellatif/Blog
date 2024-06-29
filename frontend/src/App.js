import { Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './pages/home/HomePage'
import ArticlePage from './pages/article/ArticlePage'

function App() {
  return (
    <div className='App font-opensans'>
      <Routes>
        <Route index path='/' element={<HomePage />} />
        <Route path='/blog/:id' element={<ArticlePage />} />
      </Routes>
    </div>
  )
}

export default App
