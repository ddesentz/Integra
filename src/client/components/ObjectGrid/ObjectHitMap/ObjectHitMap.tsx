import * as React from "react";
import { objectHitMapStyles } from "./ObjectHitMapStyles";
import Map, {
  GeoJSONSource,
  Layer,
  MapRef,
  Marker,
  Source,
} from "react-map-gl";
import { useAppSignals } from "../../../common/AppContext";
import {
  activeExploreObject,
  activeExploreObjectText,
  exploreClusterCountLayer,
  exploreClusterLayer,
  exploreUnclusteredPointLayer,
} from "./ObjectHitMapLayers";
import * as turf from "@turf/turf";

interface IObjectHitMap {}

const ObjectHitMapComponent: React.FunctionComponent<IObjectHitMap> = () => {
  const { classes } = objectHitMapStyles();
  const { rootSignals } = useAppSignals();
  const mapRef = React.useRef<MapRef>();
  const FIT_PADDING = 100;
  const FIT_DELAY = 1000;

  React.useEffect(() => {
    if (rootSignals.exploreMapData.value) {
      handleFitBounds(
        rootSignals.exploreMapData.value.features.map((feature) => {
          return feature;
        })
      );
    }
  }, [rootSignals.exploreMapData.value]);

  React.useEffect(() => {
    if (rootSignals.exploreFocusObject.value) {
      const focusObject = JSON.parse(
        JSON.stringify(rootSignals.exploreFocusObject.value)
      ).data;
      if (focusObject) {
        const position = [
          (focusObject.estimatedKinematics.position.longitude * 180) / Math.PI,
          (focusObject.estimatedKinematics.position.latitude * 180) / Math.PI,
        ];
        handleFocusObject(position[0], position[1]);
      }
    }
  }, [rootSignals.exploreFocusObject.value]);

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

  const handleFocusObject = (
    lon: number,
    lat: number,
    maxZoom: number = 12
  ) => {
    if (!mapRef.current) return;
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

  const handleNodeSelect = (event: any) => {
    if (event.features.length > 0) {
      const feature = event.features[0];
      if (feature.layer.id === "explore-unclustered-point") {
        rootSignals.exploreFocusObject.value = feature.properties;
        rootSignals.exploreScrollObject.value = feature.properties;
        const position = feature.geometry.coordinates;
        handleFocusObject(position[0], position[1]);
      } else if (feature.layer.id === "explore-clusters") {
        const clusterSource = mapRef.current?.getSource(
          "exploreMap"
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
    } else {
      rootSignals.exploreFocusObject.value = null;
    }
  };

  const handleMouseEnter = (event: any) => {
    document.body.style.cursor = "pointer";
  };

  const handleMouseLeave = (event: any) => {
    document.body.style.cursor = "unset";
  };

  return (
    <Map
      ref={mapRef}
      initialViewState={{
        latitude: 39.742043,
        longitude: -104.991531,
        zoom: 2.5,
      }}
      mapLib={import("mapbox-gl")}
      mapStyle="mapbox://styles/mapbox/dark-v9"
      accessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN as string}
      interactiveLayerIds={[
        "explore-clusters",
        "explore-unclustered-point",
        "explore-active-point",
      ]}
      onClick={handleNodeSelect}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Source
        id="exploreMap"
        type="geojson"
        data={rootSignals.exploreMapData.value}
        cluster={true}
        clusterMaxZoom={15}
        clusterRadius={10}
      >
        <Layer {...exploreClusterLayer} />
        <Layer {...exploreClusterCountLayer} />
        <Layer {...exploreUnclusteredPointLayer} />
      </Source>
      <Source
        id="exploreFocusPoint"
        type="geojson"
        data={rootSignals.exploreMapData.value}
      >
        <Layer
          {...activeExploreObject(
            rootSignals.exploreFocusObject.value
              ? rootSignals.exploreFocusObject.value.id
              : ""
          )}
        />
        <Layer
          {...activeExploreObjectText(
            rootSignals.exploreFocusObject.value
              ? rootSignals.exploreFocusObject.value.id
              : ""
          )}
        />
      </Source>
    </Map>
  );
};

export const ObjectHitMap = ObjectHitMapComponent;
