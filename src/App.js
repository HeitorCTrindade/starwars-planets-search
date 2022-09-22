import React from 'react';
import './App.css';
import PlanetsProvider from './context/PlanetsProvider';
import MainPage from './pages/MainPage';

function App() {
  return (
    <PlanetsProvider>
      <div>
        <MainPage />
      </div>
    </PlanetsProvider>
  );
}

export default App;
