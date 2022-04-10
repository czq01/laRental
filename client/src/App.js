import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'
import { Helmet } from 'react-helmet'

import { GlobalStyles } from './GlobalSyled';

import Home from './pages/Home';
import Auth from './pages/Auth';
import Main from './pages/Main';

import './App.css'

function App() {
  return (
    <>
      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@700&display=swap" rel="stylesheet" />
      </Helmet>
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
