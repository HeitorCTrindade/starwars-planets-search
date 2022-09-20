import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider(props) {
  const { children } = props;
  const [planets, setPlanets] = useState([]);
  const endpoint = 'https://swapi.dev/api/planets';

  useEffect(() => {
    const getDataFromAPI = async () => {
      const { results } = await fetch(endpoint).then((response) => response.json());
      // based on the lesson from https://masteringjs.io/tutorials/fundamentals/filter-object
      const filteredResults = results.map((planet) => {
        const planetArray = Object.entries(planet);
        const filteredPlanetArray = planetArray.filter(([key]) => key !== 'residents');
        return Object.fromEntries(filteredPlanetArray);
      });
      setPlanets(filteredResults);
    };
    getDataFromAPI();
  }, []);

  return (
    <PlanetsContext.Provider value={ { planets } }>
      { children }
    </PlanetsContext.Provider>
  );
}

export default PlanetsProvider;

PlanetsProvider.propTypes = {
  children: PropTypes.func.isRequired,
};
