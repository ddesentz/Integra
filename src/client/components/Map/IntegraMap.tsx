import * as React from "react";
import { integraMapStyles } from "./IntegraMapStyles";
import Map, {
  GeoJSONSource,
  Layer,
  MapRef,
  Marker,
  Source,
} from "react-map-gl";
import { useAppSignals } from "../../common/AppContext";
import {
  activeHistory,
  activeObject,
  clusterCountLayer,
  clusterLayer,
  unclusteredPointLayer,
  unclusteredPointTextLayer,
} from "./MapLayers";
import { TimeController } from "./TimeController/TimeController";
import * as turf from "@turf/turf";

interface IIntegraMap {}

const IntegraMapComponent: React.FunctionComponent<IIntegraMap> = () => {
  const { classes } = integraMapStyles();
  const { rootSignals } = useAppSignals();
  const mapRef = React.useRef<MapRef>();
  const FIT_PADDING = 100;
  const FIT_DELAY = 1000;

  React.useEffect(() => {
    if (rootSignals.datasetsMapData.value) {
      handleFitToObject();
    }
  }, [rootSignals.activeObject.value, rootSignals.datasetsMapData.value]);

  React.useEffect(() => {
    if (rootSignals.datasetsMapData.value) {
      handleFitToDataset();
    }
  }, [rootSignals.datasetPath.value, rootSignals.datasetsMapData.value]);

  const handleFocusObject = (
    lon: number,
    lat: number,
    maxZoom: number = 12
  ) => {
    if (rootSignals.datasetPath.value.length < 3) {
      mapRef.current.fitBounds(
        [
          [lon, lat],
          [lon, lat],
        ],
        {
          padding: FIT_PADDING,
          duration: FIT_DELAY,
          maxZoom: maxZoom,
        }
      );
    } else {
      mapRef.current.panTo([lon, lat]);
    }
  };

  const handleFitBounds = (featureMap: any[]) => {
    if (mapRef.current) {
      const bbox = turf.bbox(
        turf.lineString(
          featureMap.map((feature) => {
            return [
              feature.geometry.coordinates[0],
              feature.geometry.coordinates[1],
            ];
          })
        )
      );

      mapRef.current.fitBounds(
        [
          [bbox[0], bbox[1]],
          [bbox[2], bbox[3]],
        ],
        {
          padding: FIT_PADDING,
          duration: FIT_DELAY,
        }
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

      handleFocusObject(lon, lat);
    }
  };

  const handleFitToDataset = () => {
    if (
      rootSignals.datasetsMapData.value &&
      rootSignals.datasetPath.value.length % 2 === 1 &&
      mapRef.current
    ) {
      rootSignals.activeObject.value = null;
      if (rootSignals.datasetsMapData.value.features.length > 1) {
        handleFitBounds(rootSignals.datasetsMapData.value.features);
      } else {
        const position =
          rootSignals.datasetsMapData.value.features[0].geometry.coordinates;
        handleFocusObject(position[0], position[1]);
      }
    }
  };

  const handleNodeSelect = (event: any) => {
    if (event.features.length > 0) {
      const feature = event.features[0];
      if (feature.layer.id === "unclustered-point") {
        const position = feature.geometry.coordinates;
        if (rootSignals.datasetPath.value.length < 3) {
          rootSignals.datasetPath.value = rootSignals.datasetPath.value = [
            ...rootSignals.datasetPath.value.slice(0, 1),
            feature.properties.id,
          ];
        } else {
          rootSignals.datasetPath.value = rootSignals.datasetPath.value = [
            ...rootSignals.datasetPath.value.slice(0, 3),
            feature.properties.timestamp,
          ];
        }
        handleFocusObject(position[0], position[1]);
      } else if (feature.layer.id === "clusters") {
        const clusterSource = mapRef.current?.getSource(
          "datasetsMap"
        ) as unknown as GeoJSONSource;
        clusterSource.getClusterLeaves(
          feature.properties.cluster_id,
          feature.properties.point_count,
          0,
          (err: any, features: any) => {
            if (!err) {
              handleFitBounds(features);
            }
          }
        );
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
          data={rootSignals.datasetsMapData.value}
          cluster={true}
          clusterMaxZoom={15}
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
        </Source>
        <Source
          id="activePoints"
          type="geojson"
          data={rootSignals.datasetsMapData.value}
        >
          {rootSignals.datasetPath.value.length < 4 ? (
            <Layer
              {...activeObject(
                rootSignals.activeObject.value
                  ? rootSignals.activeObject.value.id
                  : ""
              )}
            />
          ) : (
            <Layer
              {...activeHistory(
                rootSignals.activeObject.value
                  ? rootSignals.activeObject.value.id
                  : ""
              )}
            />
          )}
        </Source>
        {rootSignals.datasetPath.value.length > 2 && <TimeController />}
      </Map>
    </div>
  );
};

export const IntegraMap = IntegraMapComponent;
