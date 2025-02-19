import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import {Route, Routes} from 'react-router-dom';

import './App.scss'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Login/>} />
      <Route path='/dashboard' element={<Dashboard/>} >
          <Route path=':article' element={<Dashboard/>}>
            <Route path=':id' element={<Dashboard/>}>

            </Route>
          </Route>
      </Route>
      
    </Routes>
  )
}

export default App
