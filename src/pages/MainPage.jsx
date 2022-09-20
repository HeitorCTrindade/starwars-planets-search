import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function MainPage() {
  const { testState } = useContext(PlanetsContext);
  return (
    <div>
      MainPage
      {testState[0].name}
    </div>
  );
}

export default MainPage;
