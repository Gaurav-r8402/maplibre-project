"use client";

import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import bbox from "@turf/bbox";
import type { Feature, LineString, FeatureCollection } from "geojson";
import { useTheme } from "next-themes";
import centroid from "@turf/centroid";

function createCurvedLine(
    start: [number, number],
    end: [number, number]
): Feature<LineString> {
    const [sx, sy] = start;
    const [ex, ey] = end;

    const upOffset = 0.6;

    const rightOffset = 1.4;

    const elbow1: [number, number] = [
        sx + rightOffset / 2,
        sy + upOffset,
    ];

    const elbow2: [number, number] = [
        ex,
        sy + upOffset,
    ];

    return {
        type: "Feature",
        geometry: {
            type: "LineString",
            coordinates: [
                [sx, sy],
                elbow1,
                elbow2,
            ],
        },
        properties: {},
    };
}


export default function StateOnlyMap({
    stateName,
}: {
    stateName: string;
}) {
    const mapRef = useRef<maplibregl.Map | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const { theme } = useTheme();

    const styleUrl =
        theme === "dark"
            ? "/map/blank_dark.json"
            : "/map/blank_style.json";

    useEffect(() => {
        if (!containerRef.current) return;

        const map = new maplibregl.Map({
            container: containerRef.current,
            style: styleUrl,
            center: [78, 22],
            zoom: 4,
        });

        mapRef.current = map;

        map.on("load", () => {
            if (map.getLayer("background")) {
                map.setPaintProperty(
                    "background",
                    "background-color",
                    theme === "dark" ? "#0F0F0F" : "#D3DAD9"
                );
            }
        });

        map.on("load", async () => {

            [
                "state-fill",
                "state-border",
                "state-connector-line",
                "state-label-text",
                "state-centroid-dot",
            ].forEach(id => {
                if (map.getLayer(id)) map.removeLayer(id);
            });

            [
                "state",
                "state-connector",
                "state-label",
            ].forEach(id => {
                if (map.getSource(id)) map.removeSource(id);
            });

            const geo = await fetch("/data/india_states.json").then(r => r.json());

            const stateGeo: FeatureCollection = {
                type: "FeatureCollection",
                features: geo.features.filter(
                    (f: any) => f.properties.NAME_1 === stateName
                ),
            };


            if (!stateGeo.features.length) return;

            const stateFeature = stateGeo.features[0];

            const centerPoint = centroid(stateFeature);
            const [cx, cy] = centerPoint.geometry.coordinates;

            const labelOffset: [number, number] = [
                cx + 1.5,
                cy + 0.5,
            ];

            const connector = createCurvedLine(
                [cx, cy],
                labelOffset
            );

            const labelPoints: Feature = {
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: labelOffset,
                },
                properties: {
                    name: stateName,
                }
            };

            map.addSource("state", {
                type: "geojson",
                data: stateGeo,
            });

            map.addSource("state-label", {
                type: "geojson",
                data: {
                    type: "FeatureCollection",
                    features: [labelPoints],
                },
            });

            map.addSource("state-connector", {
                type: "geojson",
                lineMetrics: true,
                data: {
                    type: "FeatureCollection",
                    features: [connector],
                },
            });

            map.addLayer({
                id: "state-fill",
                type: "fill",
                source: "state",
                paint: {
                    "fill-color": "#134686",
                },
            });

            map.addLayer({
                id: "state-border",
                type: "line",
                source: "state",
                paint: {
                    "line-color": "#000000",
                    "line-width": 1.5,
                },
            });

            map.addLayer({
                id: "state-connector-line",
                type: "line",
                source: "state-connector",
                layout: {
                    "line-cap": "round",
                    "line-join": "round",
                },
                paint: {
                    "line-width": 2.5,
                    "line-color": "#ffffff",
                    // "line-gradient": [
                    //     "interpolate",
                    //     ["linear"],
                    //     ["line-progress"],
                    // ],
                },
            });


            // let progress = 0;

            // function animateConnector() {
            //     progress = Math.min(progress + 0.04, 1);

            //     if (!map.getLayer("state-connector-line")) return;

            //     const visibleEnd = Math.min(progress, 0.999);
            //     const fadeStart = Math.min(visibleEnd + 0.0001, 0.9999);

            //     map.setPaintProperty(
            //         "state-connector-line",
            //         "line-gradient",
            //         [
            //             "interpolate",
            //             ["linear"],
            //             ["line-progress"],
            //             0, "rgba(27,33,26,1)",
            //             visibleEnd, "rgba(27,33,26,1)",
            //             fadeStart, "rgba(27,33,26,0)",
            //             1, "rgba(27,33,26,0)",
            //         ]
            //     );


            //     if (progress < 1) {
            //         requestAnimationFrame(animateConnector);
            //     }
            // }

            // animateConnector();


            map.addLayer({
                id: "state-label-text",
                type: "symbol",
                source: "state-label",
                layout: {
                    "text-field": ["get", "name"],
                    "text-size": 16,
                    "text-anchor": "left",
                    "text-offset": [0.6, -0.2],
                },
                paint: {
                    "text-color": theme === "dark" ? "#ffffff" : "#1B211A",
                    "text-halo-color": theme === "dark" ? "#000000" : "#ffffff",
                    "text-halo-width": 2,
                },
            });


            map.addLayer({
                id: "state-centroid-dot",
                type: "circle",
                source: {
                    type: "geojson",
                    data: {
                        type: "FeatureCollection",
                        features: [centerPoint],
                    },
                },
                paint: {
                    'circle-radius': 5,
                    "circle-color": theme === "dark" ? "#ffffff" : "#000000" ,
                    "circle-radius-transition": { duration: 0},
                    "circle-opacity-transition": { duration: 0}
                },
            });

            const animatePulse = () => {
                const map=mapRef.current;
                if(!map) return;
                
                const t = (performance.now() % 1000) / 1000;

                const radius = 5 + t*10;
                const opacity =  1 - t;

                if(map.getLayer("state-centroid-dot")) {
                    map.setPaintProperty("state-centroid-dot", "circle-radius", radius);
                    map.setPaintProperty("state-centroid-dot", "circle-opacity", opacity);
                    
                }
                if(map.getLayer("state-centroid-dot")) {
                    map.setPaintProperty("state-centroid-dot", "circle-radius", radius*2);
                    map.setPaintProperty("state-centroid-dot", "circle-opacity", opacity);
                    
                }
                requestAnimationFrame(animatePulse);
            }
            requestAnimationFrame(animatePulse);
            
            map.on("load", () => {
                animatePulse();
            })


            const bounds = bbox(stateGeo);

            map.fitBounds(
                [
                    [bounds[0], bounds[1]],
                    [bounds[2], bounds[3]],
                ],
                { padding: 40, duration: 800 }
            );
        });

        return () => {
            mapRef.current?.remove();
            mapRef.current = null;
        };
    }, [stateName]);

    useEffect(() => {
        const map = mapRef.current;
        if (!map) return;

        const updateBackground = () => {
            if (!map.getLayer("background")) return;

            map.setPaintProperty(
                "background",
                "background-color",
                theme === "dark" ? "#121212" : "#D3DAD9"
            );
        };

        if (map.isStyleLoaded()) {
            updateBackground();
        } else {
            map.once("load", updateBackground);
        }
    }, [theme]);

    return (
        <div className="">
            <div
                ref={containerRef}
                className="h-[500px] "
            />
        </div>

    );
}
