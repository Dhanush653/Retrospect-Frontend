import './App.css';
import Registration from './Component/Registration';
import Login from './Component/Login';
import Dashboard from './Component/Dashboard';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Createroom from './Component/Createroom';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route exact path='/' element={<Login />} />
          <Route path='/registration' element={<Registration />} />
          <Route  path='/dashboard/:userId/:userRole' element={<Dashboard />} />
          <Route path='/createroom' element={<Createroom/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

