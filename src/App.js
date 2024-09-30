import { Routes, BrowserRouter, Route } from 'react-router-dom';

import Lecturers from './Pages/Lecturers';
import LectureNotes from './Pages/LectureNotes';
import Gallery from './Pages/Gallery';
import Login from './Pages/Login';

import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path='' element={<Lecturers/>}/>
          <Route exact path='/lecture_notes' element={<LectureNotes/>}/>
          <Route exact path='/gallery' element={<Gallery/>}/>
          <Route exact path='/login' element={<Login/>}/>
        </Routes>
      </BrowserRouter>      
    </div>
  );
}

export default App;
