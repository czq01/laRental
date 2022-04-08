import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'

import { GlobalStyles } from './GlobalSyled';

import Home from './pages/Home';
import Auth from './pages/Auth';
import Main from './pages/Main';

import './App.css'

function App() {
  return (
    <>
      <GlobalStyles />
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/auth/*' element={<Auth />} />
          <Route path='/main/*' element={<Main />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
