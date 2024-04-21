import logo from './logo.svg';
import './App.css';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
    const handleNavigation = () => {
        navigate('/fill'); 
      };
      const handleViewNavigation = () => {
        navigate('/view'); 
      };
  return (
    <div className="App">
      <header className="App-header">
      <Button variant="contained" style={{width: 400, margin: 15}} onClick={
         handleNavigation
      }>Fill Survey</Button>
      <Button variant="contained" style={{width: 400}} onClick={
         handleViewNavigation
      }>View Survey Results</Button>
      </header>
    </div>
  );
}

export default Home;