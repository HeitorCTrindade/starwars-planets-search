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
    removeOneNumericFilters,
    order,
    setOrderFilter,
  } = useContext(PlanetsContext);

  const [filterPlanets, setFilterPlanets] = useState([]);

  const handleInputTextFilter = (e) => {
    const newName = {
      name: e.target.value,
    };
    setFilterByName(newName);
  };

  const handleRemoveFilterButton = (e) => {
    const { name: filterToRemove } = e.target;
    removeOneNumericFilters(filterToRemove);
  };

  const creatFilterExibitionComponent = () => (
    <div>
      {
        filterByNumericValues.map(({ column, comparison, value }) => (
          <h5 data-testid="filter" key={ column }>
            Filtro aplicado:
            {column}
            {' '}
            {comparison}
            {' '}
            {value}
            {' '}
            <button
              name={ column }
              type="button"
              onClick={ handleRemoveFilterButton }
            >
              remove
            </button>
          </h5>
        ))
      }
      <button
        name="deleteAll"
        type="button"
        data-testid="button-remove-filters"
        onClick={ handleRemoveFilterButton }
      >
        Remover todos os filtros
      </button>
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

  const handleInputSortbyValues = (e) => {
    e.preventDefault();
    const sortFilter = {
      column: e.target.column.value,
      sort: e.target.columnSort.value,
    };
    setOrderFilter(sortFilter);
  };

  useEffect(() => {
    let newfilterPlanets;

    const filterByValues = (column, comparison, value) => {
      newfilterPlanets = newfilterPlanets.filter((planet) => {
        switch (comparison) {
        case 'maior que':
          return +planet[column] > +value;
        case 'menor que':
          return +planet[column] < +value;
        default:
          return planet[column] === value;
        }
      });
    };

    const filterPlanetsByAllFilters = () => {
      if (filterByName.name !== '') {
        newfilterPlanets = planets
          .filter((planet) => planet.name.toLowerCase().includes(filterByName.name));
      } else {
        newfilterPlanets = planets;
      }

      if (filterByNumericValues.length > 0) {
        filterByNumericValues.forEach(({ column, comparison, value }) => {
          filterByValues(column, comparison, value);
        });
      }
    };
    filterPlanetsByAllFilters();
    setFilterPlanets(newfilterPlanets);
  }, [filterByNumericValues, filterByName, planets]);

  const sortByOrder = (array) => {
    const { column, sort } = order;
    if (column !== undefined && sort !== undefined) {
      switch (sort) {
      case 'ASC':
        return array.sort((a, b) => (a[column] - b[column]));
      default:
        return array.sort((a, b) => (b[column] - a[column]));
      }
    }
    return array;
  };

  const createOptionsElements = () => {
    const filteredSelectComparisonFilterArray = selectComparisonFilterArray.slice();
    filterByNumericValues.forEach(({ column }) => {
      filteredSelectComparisonFilterArray
        // https://www.mundojs.com.br/2018/09/06/removendo-elementos-de-uma-lista-array-javascript/
        .splice(filteredSelectComparisonFilterArray.indexOf(column), 1);
    });

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
          Filtro por texto:
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
              onChange={ () => {} }
            >
              { createOptionsElements() }
            </select>

            <select
              data-testid="comparison-filter"
              name="comparison"
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
          <form onSubmit={ handleInputSortbyValues }>
            <select
              data-testid="column-sort"
              name="column"
              onChange={ () => {} }
            >
              { createOptionsElements() }
            </select>

            <label htmlFor="column-sort-input-asc">
              <input
                type="radio"
                id="column-sort-input-asc"
                name="columnSort"
                data-testid="column-sort-input-asc"
                defaultValue="ASC"
                onChange={ () => {} }
              />
              Crescente
            </label>

            <label htmlFor="column-sort-input-desc">
              <input
                type="radio"
                id="column-sort-input-desc"
                name="columnSort"
                data-testid="column-sort-input-desc"
                defaultValue="DESC"
                onChange={ () => {} }
              />
              Decrescente
            </label>

            <button
              type="submit"
              data-testid="column-sort-button"
            >
              Ordenar
            </button>
          </form>
          {filterByNumericValues.length > 0 && creatFilterExibitionComponent()}
          {filterPlanets.length
          === 0 ? <Table planets={ sortByOrder(planets) } />
            : <Table planets={ sortByOrder(filterPlanets) } /> }
        </div>)}
    </div>
  );
}
export default MainPage;
