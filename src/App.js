import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Home from './Pages/Home';
import Edit from './Pages/Edit';
import Create from './Pages/Create';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/create/" element={<Create />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
