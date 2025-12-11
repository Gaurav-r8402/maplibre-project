"use client";

import { useEffect, useRef } from "react";
import maplibregl, { Popup } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { features } from "process";
import { FeatureCollection, Feature, Point, GeoJsonProperties } from "geojson";
// import polylabel from "@mapbox/polylabel";
import * as turf from "@turf/turf";
// import { text } from "stream/consumers";
import polylabel from "@mapbox/polylabel";

async function loadBlueStyle() {
    const res = await fetch("https://tiles.latlong.in/blue_essence.json");
    const style = await res.json();

    style.sprite = "";

    if (style.sources?.openmaptiles) {
        delete style.sources.openmaptiles;
    }

    style.layers = style.layers.filter(
        (layer: any) => layer.source !== "openmaptiles"
    );

    return style;
}

export default function IndiaMap({
    onStateClick,
    searchState,
    triggerSearch,
    clearTrigger,
    serverData
}: {
    onStateClick?: (data: any) => void;
    searchState?: string;
    triggerSearch?: boolean;
    clearTrigger?: () => void;
    serverData: {
        style: any,
        states: any,
        capital: any
    };
}) {
    const { style, states, capital } = serverData;
    const containerRef = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<maplibregl.Map | null>(null);
    const stateRef = useRef<any>(null);
    const capitalMarker = useRef<maplibregl.Marker | null>(null);

    const LIGHT_COLORS = {
        fill: "#456882",
        fillOpacity: 0.35,
        border: "#EEEEEE",
        highlight: "#132440",
        text: "#FF6500"
    };

    const DARK_COLORS = {
        fill: "#243642",
        fillOpacity: 0.35,
        border: "#FFFBE6",
        highlight: "#AAC4F5",
        text: "#F7F4EA"
    };

    function applyLayerColors(map: maplibregl.Map, isDark: boolean) {
        const C = isDark ? DARK_COLORS : LIGHT_COLORS;

        // console.log("Dark Mode", isDark);

        // if (map.getLayer("states")) {
        //     map.setPaintProperty("states", "line-color", C.fill);
        //     map.setPaintProperty("states", "fill-opacity", C.fillOpacity);
        // }

        const stateslayer = map.getLayer("states");

        if (stateslayer && stateslayer.type === "fill") {
            try {
                map.setPaintProperty("states", "line-color", C.fill);
                map.setPaintProperty("states", "fill-opacity", C.fillOpacity);
            } catch (err) {
                console.warn("could update paint property for states", err);
            }
        }

        if (map.getLayer("state-borders")) {
            map.setPaintProperty("state-borders", "line-color", C.border);
        }

        if (map.getLayer("highlight")) {
            map.setPaintProperty("highlight", "line-color", C.highlight);
        }
        const labellayer = map.getStyle().layers.find(
            (layer: any) =>
                layer.type === "symbol" &&
                layer.layout && layer.layout["text-field"]
        );

        // console.log("Found lable layer", labellayer?.id);

        if (labellayer && map.getLayer(labellayer.id)) {
            map.setPaintProperty(labellayer.id, "text-color", C.text);
            // console.log("Applied text color:", C.text);
        }
    }

    function zoomToState(name: string) {
        const map = mapRef.current;
        const states = stateRef.current;

        if (!map || !states || !name) return;

        const nameLower = name.trim().toLowerCase();

        const feature = states.features.find(
            (f: any) => f.properties.NAME_1.toLowerCase().includes(nameLower)
        );

        if (!feature) {
            console.warn("state not found", name);
            return;
        }

        const stateName = feature.properties.NAME_1;

        const rawBBox = turf.bbox(feature);
        const bounds: [number, number, number, number] = [
            rawBBox[0]!,
            rawBBox[1]!,
            rawBBox[2]!,
            rawBBox[3]!,
        ];

        map.fitBounds(bounds, {
            padding: 60,
            duration: 1200,
        });

        // Highlight state
        map.setFilter("highlight", ["==", "NAME_1", stateName]);

        const capFeature = capital.features.find(
            (f: any) => f.properties.NAME_1 === stateName
        );
        const cap = capFeature?.properties || {};

        const { capital_lat, capital_lon, capital: capitalName } = cap;

        if (capitalMarker.current) {
            capitalMarker.current.remove();
        }

        // Add new marker
        if (capital_lat && capital_lon) {
            const marker = new maplibregl.Marker({ color: "red" })
                .setLngLat([capital_lon, capital_lat])
                .setPopup(
                    new Popup().setHTML(
                        `<strong>${capitalName}</strong><br/>${stateName}`
                    )
                )
                .addTo(map);

            capitalMarker.current = marker;
        }

        // Callback to UI
        if (onStateClick) {
            onStateClick({
                stateName,
                spopulation: cap.spopulation,
                cpopulation: cap.cpopulation,
                percentage: cap.percentage,
                capital: capitalName,
                capital_lat,
                capital_lon,
                famousThings: cap.famousThings,
                famousImage: cap.famousImage,
            });
        }
    }


    const addIndiaLayers = async (map: maplibregl.Map, onStateClick?: any) => {
        const statesRes = states;
        const capitalsRes = capital;

        const statesGeo = statesRes;
        stateRef.current = statesGeo;
        const capitalsGeo = capitalsRes;

        const capitalMap: Record<string, any> = {};
        capitalsGeo.features.forEach((f: any) => {
            const p = f.properties;
            capitalMap[p.NAME_1] = p;
        });

        if (!map.getLayer("state-labels"))

            if (!map.getSource("indiaStates")) {
                map.addSource("indiaStates", {
                    type: "geojson",
                    data: statesGeo,
                });
            }

        const centroids: FeatureCollection<Point, GeoJsonProperties> = {
            type: "FeatureCollection",
            features: statesGeo.features.map((state: any) => {
                const center = turf.centroid(state);

                return {
                    type: "Feature",
                    geometry: center.geometry as Point,
                    properties: {
                        NAME_1: state.properties.NAME_1
                    }
                };
            })
        };

        // function getAnglefromBox(state: any) {
        //     const [minX, minY, maxX, maxY]=turf.bbox(state);

        //     const dx=maxX-minX;
        //     const dy=maxY-minY;

        //     let angle=Math.atan2(dy,dx)*(180/Math.PI);

        //     if(angle>90) angle-=180;
        //     if(angle<-90) angle+=180;

        //     return angle;
        // }
        function getSizeFromState(state: any) {
            const area = turf.area(state);

            if (area < 5_000_000) return 8;
            if (area > 20_000_000) return 10;
            return 12;
        }


        const labelPoints: FeatureCollection<Point, GeoJsonProperties> = {
            type: "FeatureCollection",
            features: statesGeo.features.map((state: any) => {

                const geom = state.geometry;

                const polygons = geom.type === "MultiPolygon"
                    ? geom.coordinates
                    : [geom.coordinates];

                let bestPoint = polygons[0];

                let maxArea = turf.area({
                    type: "Polygon",
                    coordinates: polygons[0]
                })


                for (let poly of polygons) {
                    const area = turf.area({
                        type: "Polygon",
                        coordinates: poly
                    })

                    if (area > maxArea) {
                        maxArea = area;
                        bestPoint = poly
                    }
                }



                const [lng, lat] = polylabel(bestPoint, 5.0);

                // const center=turf.centroid(state);
                // const angle=getAnglefromBox(state);
                const fontSize = getSizeFromState(state);

                return {
                    type: "Feature",
                    geometry: {
                        type: "Point",
                        coordinates: [lng, lat],
                    },
                    properties: {
                        NAME_1: state.properties.NAME_1,
                        // angle,
                        fontSize,
                    },
                }
            })
        }

        if (!map.getSource("state-label-points")) {
            map.addSource("state-label-points", {
                type: "geojson",
                data: labelPoints
            });
        }


        if (!map.getSource("state-centroids")) {
            map.addSource("state-centroids", {
                type: "geojson",
                data: centroids,
            });
        }

        if (!map.getLayer("states")) {
            map.addLayer({
                id: "states",
                type: "fill",
                source: "indiaStates",
                paint: {
                    "fill-color": LIGHT_COLORS.fill,
                    "fill-opacity": LIGHT_COLORS.fillOpacity
                },
            });
        }

        if (!map.getLayer("state-borders")) {
            map.addLayer({
                id: "state-borders",
                type: "line",
                source: "indiaStates",
                paint: {},
            });
        }

        if (!map.getLayer("highlight")) {
            map.addLayer({
                id: "highlight",
                type: "line",
                source: "indiaStates",
                paint: {},
                filter: ["==", "NAME_1", ""],
            });
        }

        if (!map.getLayer("state-labels")) {
            map.addLayer({
                id: "state-labels",
                type: "symbol",
                source: "state-label-points",
                minzoom: 3.8,
                layout: {
                    "text-field": ["get", "NAME_1"],
                    "text-size": ["get", "fontSize"],
                    "text-anchor": "center",
                    "text-justify": "center",
                    "text-padding": 2,
                    "text-max-width": 8,
                    "text-writing-mode": ["horizontal", "vertical"],
                    "text-allow-overlap": false,
                    "text-font": ["Open Sans Bold"],
                },
                paint: {
                    "text-color": ["case", ["boolean", ["get", "darkMode"], false],
                        DARK_COLORS.text,
                        LIGHT_COLORS.text
                    ]
                },
            });
        }

        applyLayerColors(map, document.documentElement.classList.contains("dark"));



        map.on("click", "states", (e) => {
            if (!e.features || !e.features.length) return;

            const feature = e.features[0];
            const stateName = feature.properties?.NAME_1;

            map.setFilter("highlight", ["==", "NAME_1", stateName]);

            const rawBBox = turf.bbox(feature);

            const bounds: [number, number, number, number] = [
                rawBBox[0],
                rawBBox[1],
                rawBBox[2],
                rawBBox[3],
            ];

            map.fitBounds(bounds, {
                padding: 50,
                duration: 1200
            });


            const cap = capitalMap[stateName];
            if (!cap) return;

            const { capital_lat, capital_lon, capital } = cap;

            if (capitalMarker.current) {
                capitalMarker.current.remove();
            }

            const marker = new maplibregl.Marker({ color: "red" })
                .setLngLat([capital_lon, capital_lat])
                .setPopup(
                    new Popup().setHTML(
                        `<strong>${capital}</strong><br/>${stateName}`
                    )
                )
                .addTo(map);

            capitalMarker.current = marker;

            if (onStateClick) {
                onStateClick({
                    stateName,
                    spopulation: cap.spopulation,
                    cpopulation: cap.cpopulation,
                    capital: cap.capital,
                    famousThings: cap.famousThings,
                    famousImage: cap.famousImage,
                    capital_lat,
                    capital_lon
                });
            }
        });

        map.on("mouseenter", "states", () => {
            map.getCanvas().style.cursor = "pointer";
        });

        map.on("mouseleave", "states", () => {
            map.getCanvas().style.cursor = "";
        });
    };

    // const addCountries = (map : maplibregl.Map) => {

    //     if(!map.getSource("openmaptiles")) {
    //         map.addSource("openmaptiles", {
    //             type: "vector",
    //             url: "https://tiles.latlong.in/data/openmaptiles.json"

    //         });
    //     }

    //     if(!map.getLayer("world-fill")){
    //         map.addLayer({
    //             id: "world-fill",
    //             type: "fill",
    //             source: "openmaptiles",
    //             "source-layer": "admin",
    //             paint:{
    //                 "fill-color": "#9ec5fe",
    //                 "fill-opacity": 0.3
    //             }
    //         });
    //     }

    //     if(!map.getLayer("world-borders")){
    //         map.addLayer({
    //             id:"world-borders",
    //             type: "line",
    //             source: "openmaptiles",
    //             "source-layer":"admin",
    //             paint: {
    //                 "line-color":"#003566",
    //                 "line-width": 1
    //             }
    //         });
    //     }
    // }

    useEffect(() => {
        if (!containerRef.current) return;

        const isDark = document.documentElement.classList.contains("dark");

        // const map = new maplibregl.Map({
        //     container: containerRef.current,

        //     style: isDark
        //         ? "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
        //         : "https://tiles.latlong.in/blue_essence.json",

        //     center: [78.9629, 22.5937],
        //     zoom: 3.8,
        // });

        let map: maplibregl.Map;

        (async () => {
            const lightStyle = style;

            map = new maplibregl.Map({
                container: containerRef.current!,
                style: isDark
                    ? "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
                    : lightStyle,
                center: [78.9629, 22.5937],
                zoom: 3.8
            });

            mapRef.current = map;

            map.on("load", () => {
                // addCountries(map);
                addIndiaLayers(map, onStateClick);
                applyLayerColors(map, isDark);
            });
        })();

        const observer = new MutationObserver(async () => {
            const dark = document.documentElement.classList.contains("dark");

            const newStyle = dark
                ? "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
                : await loadBlueStyle();

            map.setStyle(newStyle);

            map.once("styledata", () => {
                addIndiaLayers(map, onStateClick);
                applyLayerColors(map, dark);
            });
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class"],
        });

        return () => map?.remove();
    }, []);

    useEffect(() => {
        const map = mapRef.current;
        if (!map) return;

        const safeMap = map as maplibregl.Map;

        console.log("Search effect:", { searchState, triggerSearch });

        function runSearch() {
            if (triggerSearch && searchState) {
                zoomToState(searchState);
                clearTrigger?.();
            }

            if (!searchState) {
                safeMap.flyTo({
                    center: [78.9629, 22.5937],
                    zoom: 3.8,
                    duration: 1200,
                });

                if (safeMap.getLayer("highlight")) {
                    safeMap.setFilter("highlight", ["==", "NAME_1", ""]);
                }
            }
        }

        if (safeMap.isStyleLoaded()) {
            runSearch();
        } else {
            // ⭐ Wait for style + layers to fully load
            safeMap.once("idle", runSearch);
        }

    }, [triggerSearch, searchState]);





    return <div ref={containerRef} className="w-full h-full rounded-lg" />;
}
