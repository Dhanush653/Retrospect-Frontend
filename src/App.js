import './App.css';
import Registration from './Component/Registration';
import Login from './Component/Login';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
    <div>
      <Routes>
      <Route path='/' element = {<Login/>}/>
      <Route path='/registration' element = {<Registration/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
