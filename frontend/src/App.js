import { Route, Routes } from 'react-router-dom';
import CenterContent from './components/CenterContent';
import Home from './components/Home';
import Watch from './components/Watch';

function App() {
  return (
    <Routes>
      <Route path='/' element={<CenterContent/>}>
        <Route index element={<Home/>}/>
        <Route path='/watch' element={<Watch/>}/>
      </Route>
    </Routes>
  );
}

export default App;