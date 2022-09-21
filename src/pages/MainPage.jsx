import React, { useContext, useState } from 'react';
import Table from '../components/Table';
import PlanetsContext from '../context/PlanetsContext';

function MainPage() {
  const {
    planets,
    isLoading,
    setFilterByName,
    filterByName,
  } = useContext(PlanetsContext);

  const [filterPlanets, setFilterPlanets] = useState([]);
  console.log(isLoading);

  const filterPlanetsByAllFilters = () => {
    const newfilterPlanets = planets
      .filter((planet) => planet.name.toLowerCase().includes(filterByName.name));
    setFilterPlanets(newfilterPlanets);
  };

  const handleInputTextFilter = (e) => {
    const newName = {
      name: e.target.value,
    };
    setFilterByName(newName);
    filterPlanetsByAllFilters();
  };

  return (
    <div>
      { isLoading ? 'Carregando...' : (
        <div>
          MainPage
          <input
            type="text"
            value={ filterByName.name }
            data-testid="name-filter"
            onChange={ handleInputTextFilter }
          />
          {filterPlanets.length
          === 0 ? <Table planets={ planets } /> : <Table planets={ filterPlanets } /> }
        </div>)}
    </div>
  );
}

export default MainPage;
