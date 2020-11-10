
export default {
  version: 8,
  sources: {
    rasterTile: {
      type: "raster",
      tiles: [
        // "http://localhost:3001/map/tile/?tile={z}.{x}.{y}",
        "http://localhost:3001/map/tile/tile.{z}.{x}.{y}.png",
        // process.env.APP_ENV === white
        //   ? './whiteTile/tile.{z}.{x}.{y}.png'
        //   : './tile/tile.{z}.{x}.{y}.png',
        // 'http://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
        // 'https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZXhhbXBsZXMiLCJhIjoiY2p0MG01MXRqMW45cjQzb2R6b2ptc3J4MSJ9.zA2W0IkI0c6KaAhJfk9bWg',
      ],
      tileSize: 256,
    },
  },
  layers: [
    {
      id: "raster-layer",
      type: "raster",
      source: "rasterTile",
    },
  ],
};
