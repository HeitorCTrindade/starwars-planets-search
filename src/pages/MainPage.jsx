import React, { useContext, useState, useEffect } from 'react';
import Table from '../components/Table';
import PlanetsContext from '../context/PlanetsContext';

const selectComparisonFilterArray = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

function MainPage() {
  const {
    planets,
    isLoading,
    setFilterByName,
    filterByName,
    setNumericFilters,
    filterByNumericValues,
  } = useContext(PlanetsContext);

  const [filterPlanets, setFilterPlanets] = useState([]);

  const handleInputTextFilter = (e) => {
    const newName = {
      name: e.target.value,
    };
    setFilterByName(newName);
  };

  const creatFilterExibitionComponent = () => (
    <div>
      {
        filterByNumericValues.map(({ column, comparison, value }) => (
          <>
            <h5>
              Filtro aplicado:
              {column}
              {' '}
              {comparison}
              {' '}
              {value}
              {' '}
            </h5>
            <button
              type="button"
              onClick={ () => console.log('fecha') }
            >
              remove
            </button>
          </>
        ))
      }
    </div>
  );

  const handleInputFilterbyValues = (e) => {
    e.preventDefault();
    const newFilter = {
      column: e.target.column.value,
      comparison: e.target.comparison.value,
      value: e.target.valueFilter.value,
    };
    setNumericFilters(newFilter);
    e.target.valueFilter.value = '';
  };

  useEffect(() => {
    let arrayToFilter = [];

    if (filterPlanets.length > 0) {
      arrayToFilter = filterPlanets;
    } else {
      arrayToFilter = planets;
    }
    const filterByValues = (column, comparison, value) => {
      const newfilterPlanets = arrayToFilter.filter((planet) => {
        switch (comparison) {
        case 'maior que':
          return +planet[column] > +value;

        case 'menor que':
          return +planet[column] < +value;

        default:
          return planet[column] === value;
        }
      });
      setFilterPlanets(newfilterPlanets);
    };
    const filterPlanetsByAllFilters = () => {
      if (filterByName.name !== '') {
        const newfilterPlanets = planets
          .filter((planet) => planet.name.toLowerCase().includes(filterByName.name));
        setFilterPlanets(newfilterPlanets);
      } else {
        setFilterPlanets(planets);
      }
      if (filterByNumericValues.length > 0) {
        filterByNumericValues.forEach(({ column, comparison, value }) => {
          filterByValues(column, comparison, value);
        });
      }
    };
    filterPlanetsByAllFilters();
  }, [filterByNumericValues, filterByName]);

  const createOptionsElements = () => {
    let filteredSelectComparisonFilterArray = [];
    if (filterByNumericValues.length > 0) {
      console.log('entrou');
      filteredSelectComparisonFilterArray = selectComparisonFilterArray
        .filter((option) => filterByNumericValues
          .find((filter) => option !== filter.column));
    } else {
      filteredSelectComparisonFilterArray = selectComparisonFilterArray;
    }
    return (
      filteredSelectComparisonFilterArray.map((option) => (
        <option value={ option } key={ option }>{option}</option>
      ))
    );
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
          <form onSubmit={ handleInputFilterbyValues }>
            <select
              data-testid="column-filter"
              name="column"
              // value={ formState.column }
              onChange={ () => {} }
            >
              { createOptionsElements() }
            </select>

            <select
              data-testid="comparison-filter"
              name="comparison"
              // value={ formState.comparison }
              onChange={ () => {} }
            >
              <option value="maior que">maior que</option>
              <option value="menor que">menor que</option>
              <option value="igual a">igual a</option>
            </select>

            <input
              type="number"
              name="valueFilter"
              data-testid="value-filter"
              // value={ formState.value }
              defaultValue={ 0 }
              onChange={ () => {} }
            />
            <button
              type="submit"
              data-testid="button-filter"
            >
              Filtrar
            </button>
          </form>

          {filterByNumericValues.length > 0 && creatFilterExibitionComponent()}
          {filterPlanets.length
          === 0 ? <Table planets={ planets } /> : <Table planets={ filterPlanets } /> }
        </div>)}
    </div>
  );
}

export default MainPage;
