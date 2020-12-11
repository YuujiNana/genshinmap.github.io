import React from 'react';
import clsx from 'clsx';
import { connect } from 'react-redux';

import { MapRoutes } from '../../MapFeatures';
import { getFilterIconURL } from '../../MapFeaturesData';
import { Image } from '../../Image';
import { setRouteDisplayed } from '../../../redux/ducks/displayed';

import './MapControlsRouteButton.css';

/**
 * A button in the Filters, with the icon of a Map route on it.
 * Pressing this toggles display of that Map route.
 * @param {*} routeKey The key of the route.
 */
// Note: The dispatchers generated by mapDispatchToProps
// shadow their associated action generators.
/* eslint-disable no-shadow */
const _MapControlsRouteButton = ({ routeKey, active, setRouteDisplayed }) => {
  const mapRoute = MapRoutes[routeKey];

  const toggleRoute = () => {
    setRouteDisplayed(!active);
  };

  return (
    <div
      onClick={toggleRoute}
      onKeyDown={() => {}}
      role="button"
      aria-label={active ? `Hide ${mapRoute.name}` : `Show ${mapRoute.name}`}
      tabIndex={0}
      className={clsx('map-controls-route', active ? 'map-controls-route-active' : '', 'noselect')}
    >
      <div className={clsx('map-controls-route-border')}>
        <Image
          className={clsx('map-controls-route-icon')}
          srcPNG={getFilterIconURL(mapRoute.icons.filter, 'png')}
          srcWebP={getFilterIconURL(mapRoute.icons.filter, 'webp')}
        />
      </div>
      <div className={clsx('map-controls-route-label')}>{mapRoute.name}</div>
    </div>
  );
};

const mapStateToProps = (state, { routeKey }) => ({
  active: state?.displayed?.routes[routeKey] ?? false,
});
const mapDispatchToProps = (dispatch, { routeKey }) => ({
  setRouteDisplayed: (newState) => dispatch(setRouteDisplayed(routeKey, newState)),
});
const MapControlsRouteButton = connect(
  mapStateToProps,
  mapDispatchToProps
)(_MapControlsRouteButton);

export default MapControlsRouteButton;
