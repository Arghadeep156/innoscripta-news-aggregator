import React from 'react';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import './App.css';
import NewsList from './components/newsDisplay';


function App() {
  return (    
    <Router>
      <Routes>
        <Route path="/" element={<NewsList />} />
      </Routes>
    </Router>  
  );
}

export default App;
