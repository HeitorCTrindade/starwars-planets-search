import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider(props) {
  const { children } = props;
  const [testState, setTestState] = useState([{ name: 'teste' }]);
  return (
    <PlanetsContext.Provider value={ { testState } }>
      { children }
    </PlanetsContext.Provider>
  );
}

export default PlanetsProvider;

PlanetsProvider.propTypes = {
  children: PropTypes.func.isRequired,
};
