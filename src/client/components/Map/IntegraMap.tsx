import * as React from "react";
import { integraMapStyles } from "./IntegraMapStyles";
import Map, { Layer, MapRef, Source, ViewStateChangeEvent } from "react-map-gl";
import { useAppSignals } from "../../common/AppContext";
import {
  activeLayer,
  clusterCountLayer,
  clusterLayer,
  unclusteredPointLayer,
  unclusteredPointTextLayer,
} from "./MapLayers";

interface IIntegraMap {}

const IntegraMapComponent: React.FunctionComponent<IIntegraMap> = () => {
  const { classes } = integraMapStyles();
  const { rootSignals } = useAppSignals();
  const mapRef = React.useRef<MapRef>();
  const BOUNDING_OFFSET = 0.05;
  console.log(rootSignals.mapData.value, rootSignals.activeObject.value);

  React.useEffect(() => {
    if (rootSignals.activeObject.value && mapRef.current) {
      const lon =
        (rootSignals.activeObject.value.estimatedKinematics.position.longitude *
          180) /
        Math.PI;
      const lat =
        (rootSignals.activeObject.value.estimatedKinematics.position.latitude *
          180) /
        Math.PI;

      mapRef.current.fitBounds(
        [
          [lon - BOUNDING_OFFSET, lat - BOUNDING_OFFSET],
          [lon + BOUNDING_OFFSET, lat + BOUNDING_OFFSET],
        ],
        { padding: 40, duration: 1000 }
      );
    }
  }, [rootSignals.activeObject.value]);

  return (
    <div className={classes.integraMapContainer}>
      <Map
        ref={mapRef}
        initialViewState={{
          latitude: 39.742043,
          longitude: -104.991531,
          zoom: 4.5,
        }}
        mapLib={import("mapbox-gl")}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        accessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN as string}
      >
        <Source
          id="datasetsMap"
          type="geojson"
          data={rootSignals.mapData.value}
          cluster={true}
          clusterMaxZoom={8}
          clusterRadius={50}
        >
          <Layer {...clusterLayer} />
          <Layer {...clusterCountLayer} />
          <Layer {...unclusteredPointLayer} />
          <Layer
            {...unclusteredPointTextLayer(
              rootSignals.activeObject.value
                ? rootSignals.activeObject.value.id
                : ""
            )}
          />
          <Layer
            {...activeLayer(
              rootSignals.activeObject.value
                ? rootSignals.activeObject.value.id
                : ""
            )}
          />
        </Source>
      </Map>
    </div>
  );
};

export const IntegraMap = IntegraMapComponent;
