import React from 'react';
import PropTypes from 'prop-types';

export default function Table({ planets }) {
  const fillTableContent = () => {
    const tableElement = planets.map((planet) => {
      const {
        name,
        rotation_period: rotationPeriod,
        orbital_period: orbitalPeriod,
        diameter,
        climate,
        gravity,
        terrain,
        surface_water: surfaceWater,
        population,
        films,
        created,
        edited,
        url,
      } = planet;
      return (
        <tr key={ name }>
          <td
            className="tg-0lax"
            data-testid="planet-name"
          >
            { name }
          </td>
          <td className="tg-buh4">{ rotationPeriod }</td>
          <td className="tg-0lax">{ orbitalPeriod }</td>
          <td className="tg-buh4">{ diameter }</td>
          <td className="tg-0lax">{ climate }</td>
          <td className="tg-buh4">{ gravity }</td>
          <td className="tg-0lax">{ terrain }</td>
          <td className="tg-buh4">{ surfaceWater }</td>
          <td className="tg-0lax">{ population }</td>
          <td className="tg-buh4">{ films }</td>
          <td className="tg-0lax">{ created }</td>
          <td className="tg-buh4">{ edited }</td>
          <td className="tg-0lax">{ url }</td>
        </tr>
      );
    });
    return tableElement;
  };

  return (
    <div>
      <br />
      <table className="tg">
        <thead>
          <tr>
            {Object.entries(planets[0]).map(([key]) => (
              <th className="tg-0lax" key={ key }>{ key }</th>
            ))}
          </tr>
        </thead>
        <tbody>
          { fillTableContent() }
        </tbody>
      </table>
    </div>
  );
}

Table.propTypes = {
  planets: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};
