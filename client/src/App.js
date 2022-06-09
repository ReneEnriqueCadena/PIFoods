import './App.css';
import Cards from './components/cardPlural/cardPlural';
import Details from "./components/detail/detail";
import Post from "./components/cardPost/cardPost";
import Init from './components/Init/init';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes> 
        <Route path="/" element={<Init/>}/>
        <Route path='/home' element={<Cards/>} />
        <Route path="/detail/:id" element={<Details/>} />
        <Route path="/recipe" element={<Post/>} />
      </Routes>
    </div>
  );
}

export default App;
