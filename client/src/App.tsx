import { Container } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { Home } from './components/home';
import { FormCard } from './components/form';


function App() {
  return (
    <Container className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="form" element={<FormCard />} />
        <Route path="form/:id" element={<FormCard />} />
      </Routes>
    </Container>
  );
}

export default App;
