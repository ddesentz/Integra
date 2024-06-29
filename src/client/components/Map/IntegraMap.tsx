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
  const OBJECT_BOUNDING_OFFSET = 0.005;
  const CLUSTER_BOUNDING_OFFSET = 0.1;
  const DATASET_BOUNDING_OFFSET = 5;

  React.useEffect(() => {
    handleFitToObject();
  }, [rootSignals.activeObject.value]);

  React.useEffect(() => {
    handleFitToDataset();
  }, [rootSignals.datasetPath.value]);

  const handleFitBounds = (lat: number, lon: number, offset: number) => {
    if (mapRef.current) {
      mapRef.current.fitBounds(
        [
          [lon - offset, lat - offset],
          [lon + offset, lat + offset],
        ],
        { padding: 40, duration: 1500 }
      );
    }
  };

  const handleFitToObject = () => {
    if (rootSignals.activeObject.value && mapRef.current) {
      const lon =
        (rootSignals.activeObject.value.estimatedKinematics.position.longitude *
          180) /
        Math.PI;
      const lat =
        (rootSignals.activeObject.value.estimatedKinematics.position.latitude *
          180) /
        Math.PI;

      handleFitBounds(lat, lon, OBJECT_BOUNDING_OFFSET);
    }
  };

  const handleFitToDataset = () => {
    if (rootSignals.datasetPath.value.length === 1 && mapRef.current) {
      rootSignals.activeObject.value = null;
      const lon = -104.991531;
      const lat = 39.742043;
      handleFitBounds(lat, lon, DATASET_BOUNDING_OFFSET);
    }
  };

  const handleNodeSelect = (event: any) => {
    if (event.features.length > 0) {
      const feature = event.features[0];
      if (feature.layer.id === "unclustered-point") {
        const position = feature.geometry.coordinates;
        rootSignals.datasetPath.value = rootSignals.datasetPath.value = [
          ...rootSignals.datasetPath.value.slice(0, 1),
          feature.properties.id,
        ];
        handleFitBounds(position[1], position[0], OBJECT_BOUNDING_OFFSET);
      } else if (feature.layer.id === "clusters") {
        const position = feature.geometry.coordinates;
        handleFitBounds(position[1], position[0], CLUSTER_BOUNDING_OFFSET);
      }
    }
  };

  const handleMouseEnter = (event: any) => {
    document.body.style.cursor = "pointer";
  };

  const handleMouseLeave = (event: any) => {
    document.body.style.cursor = "unset";
  };

  return (
    <div className={classes.integraMapContainer}>
      <Map
        ref={mapRef}
        onLoad={() => {
          handleFitToDataset();
          handleFitToObject();
        }}
        initialViewState={{
          latitude: 39.742043,
          longitude: -104.991531,
          zoom: 4.5,
        }}
        mapLib={import("mapbox-gl")}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        accessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN as string}
        interactiveLayerIds={["clusters", "unclustered-point", "active-point"]}
        onClick={handleNodeSelect}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Source
          id="datasetsMap"
          type="geojson"
          data={rootSignals.mapData.value}
          cluster={true}
          clusterMaxZoom={20}
          clusterRadius={10}
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
