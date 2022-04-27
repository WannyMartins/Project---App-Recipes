import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
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
