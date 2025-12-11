declare module "@mapbox/polylabel" {
  function polylabel(
    polygon: any,
    precision?: number
  ): [number, number];

  export default polylabel;
}
