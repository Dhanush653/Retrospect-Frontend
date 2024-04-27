import './App.css';
import Registration from './Component/Registration';
import Login from './Component/Login';
import Dashboard from './Component/Dashboard';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
    <div>
      <Routes>
      <Route path='/' element = {<Login/>}/>
      <Route path='/registration' element = {<Registration/>}/>
      <Route path='/dashboard/:userId/:userRole' element={<Dashboard />} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
