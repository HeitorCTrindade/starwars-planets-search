import React, { useContext } from 'react';
import Table from '../components/Table';
import PlanetsContext from '../context/PlanetsContext';

function MainPage() {
  const { planets } = useContext(PlanetsContext);
  return (
    <div>
      MainPage
      {planets.length > 0 && <Table planets={ planets } /> }
    </div>
  );
}

export default MainPage;
