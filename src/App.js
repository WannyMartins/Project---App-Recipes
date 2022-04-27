import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import './App.css';
import Routes from './components/Routes';
import Drinks from './pages/drinks/Drinks';
// import Foods from './pages/foods/Foods';

function App() {
  return (
    <>
      <Routes />
      <Drinks />
      {/* <Foods /> */}
    </>
  );
}

export default App;
