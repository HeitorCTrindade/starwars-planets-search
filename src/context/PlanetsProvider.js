import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

const IS_SAME_STR = 0;

function PlanetsProvider(props) {
  const { children } = props;
  const [planets, setPlanets] = useState([]);
  const [filterByName, setName] = useState({ name: '' });
  const [filterByNumericValues, setNumericFilter] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const endpoint = 'https://swapi.dev/api/planets';

  useEffect(() => {
    const getDataFromAPI = async () => {
      setIsLoading(true);
      const { results } = await fetch(endpoint).then((response) => response.json());
      // based on the lesson from https://masteringjs.io/tutorials/fundamentals/filter-object
      const filteredResults = results.map((planet) => {
        const planetArray = Object.entries(planet);
        const filteredPlanetArray = planetArray.filter(([key]) => key !== 'residents');
        return Object.fromEntries(filteredPlanetArray);
      });
      setPlanets(filteredResults);
      setIsLoading(false);
    };
    getDataFromAPI();
  }, []);

  const setFilterByName = (name) => {
    setName(name);
  };

  const setNumericFilters = (numericFilterj) => {
    setNumericFilter([...filterByNumericValues, numericFilterj]);
  };

  const removeOneNumericFilters = (filterToRemove) => {
    if (filterToRemove.localeCompare('deleteAll') === IS_SAME_STR) {
      setNumericFilter([]);
    } else {
      console.log(filterToRemove);
      const newFilterByNumericValues = filterByNumericValues
        .filter((filter) => (filterToRemove
          .localeCompare(filter.column) !== IS_SAME_STR));
      console.log(newFilterByNumericValues);
      setNumericFilter(newFilterByNumericValues);
    }
  };

  return (
    <PlanetsContext.Provider
      value={ {
        planets,
        isLoading,
        setFilterByName,
        filterByName,
        setNumericFilters,
        filterByNumericValues,
        removeOneNumericFilters,
      } }
    >
      { children }
    </PlanetsContext.Provider>
  );
}

export default PlanetsProvider;

PlanetsProvider.propTypes = {
  children: PropTypes.shape({
    type: PropTypes.string.isRequired,
  }).isRequired,
};
