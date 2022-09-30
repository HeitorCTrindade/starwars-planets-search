import React, { useContext, useState, useEffect } from 'react';
import Table from '../components/Table';
import PlanetsContext from '../context/PlanetsContext';

const DEFULT_STATE_FORM = {
  column: 'population',
  comparison: 'maior que',
  valueFilter: 0,
};
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
  const [formFilterSort, setFormFilterSort] = useState({
    column: 'population',
    columnSort: '',
  });
  const [formFilterValue, setFormFilterValue] = useState(DEFULT_STATE_FORM);
  const creatFilterExibitionComponent = () => (
    <div>
      {
        filterByNumericValues.map(({ column, comparison, value }) => (
          <h5 data-testid="filter" key={ column }>
            Filtro aplicado:
            {column}
            {comparison}
            {value}
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
  const handleChangesFormValue = (e) => {
    const { name, value } = e.target;
    setFormFilterValue({ ...formFilterValue, [name]: value });
  };
  const handleInputFilterbyValues = (e) => {
    e.preventDefault();
    const newFilter = {
      column: formFilterValue.column,
      comparison: formFilterValue.comparison,
      value: formFilterValue.valueFilter,
    };
    setNumericFilters(newFilter);
  };
  const handleChangesForm = (e) => {
    const { name, value } = e.target;
    setFormFilterSort({ ...formFilterSort, [name]: value });
  };
  const handleInputSortbyValues = (e) => {
    e.preventDefault();
    const sortFilter = { column: formFilterSort.column, sort: formFilterSort.columnSort };
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
    setFormFilterValue(DEFULT_STATE_FORM);
  }, [filterByNumericValues, filterByName, planets]);
  const sortByOrder = (array) => {
    const { column, sort } = order;
    if (column !== undefined && sort !== undefined) {
      switch (sort) {
      case 'DESC':
        return array.sort((a, b) => (+b[column] - +a[column]));
      case 'ASC':
        return array.sort((a, b) => (+b[column] - +a[column]))
          .sort((a, b) => (+a[column] - +b[column]));
      default:
        return array;
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
              onChange={ handleChangesFormValue }
            >
              { createOptionsElements() }
            </select>
            <select
              data-testid="comparison-filter"
              name="comparison"
              onChange={ handleChangesFormValue }
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
              onChange={ handleChangesFormValue }
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
              onChange={ handleChangesForm }
            >
              <option value="population">population</option>
              <option value="orbital_period">orbital_period</option>
              <option value="diameter">diameter</option>
              <option value="rotation_period">rotation_period</option>
              <option value="surface_water">surface_water</option>
            </select>
            <label htmlFor="column-sort-input-asc">
              <input
                type="radio"
                id="column-sort-input-asc"
                name="columnSort"
                data-testid="column-sort-input-asc"
                defaultValue="ASC"
                onChange={ handleChangesForm }
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
                onChange={ handleChangesForm }
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
