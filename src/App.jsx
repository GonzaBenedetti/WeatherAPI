import WeatherContainer from './components/WeatherSearch/WeatherContainer'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'


const App = () => {
  return (
    <main className='main'>
      <WeatherContainer/>
    </main>
  )
}

export default App