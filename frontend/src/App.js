import { Route, Routes } from 'react-router-dom';
import CenterContent from './UI/CenterContent';
import Home from './pages/Home';
import Watch from './pages/Watch';

function App() {
  return (
    <Routes>
      <Route path='/' element={<CenterContent/>}>
        <Route index element={<Home/>}/>
        <Route path='/watch/:id' element={<Watch/>}/>
      </Route>
    </Routes>
  );
}

export default App;