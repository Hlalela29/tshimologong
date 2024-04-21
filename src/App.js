import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Form from './Form';
import Result from './Results';

const App = () => {
 return (
    <>
       <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fill" element={<Form />} />
          <Route path="/view" element={<Result />} />
       </Routes>
    </>
 );
};

export default App;