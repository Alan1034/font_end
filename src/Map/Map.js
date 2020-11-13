import React, { Component } from "react";
import DeckGL from "@deck.gl/react";
import { StaticMap } from "react-map-gl";
// import { PolygonLayer, TextLayer } from "@deck.gl/layers";
import { HexagonLayer } from '@deck.gl/aggregation-layers';
import mapStyle from "./mapStyle";
import homeJson from "./homeJson.json";

import styles from "./Map.less";
// import cn from 'classnames';
// import sjz from "static/sjz.png";

class Map extends Component {
  state = {
    polygonLayer: [],
    textLayer: [],
    hexagonLayer: [],
    hoveredObject: null,
    pointerX: null,
    pointerY: null,
  };

  componentDidMount() {
    this.getData()
    //;
  }

  getData = async () => {
    console.log(window.hostProxy)
    const res = await fetch(`${window.hostProxy}/personnel/data/site`)
    const data = await res.json()
    console.log(data)
    if (`${data.errCode}` === "0") {
      this.setState({
        data: data.data
      }, () => { this.renderMap()})
    }

  }
  // componentDidUpdate(preprops) {
  //   const { data = [] } = this.props;
  //   if (preprops.data.length !== data.length) {
  //     const characterSet = this.characterSet();
  //     this.renderMap(characterSet);
  //   }
  // }


//   renderTooltip = (hoveredObject, pointerX, pointerY) => {
//     const { data = [] } = this.props;
//     if (!hoveredObject) {
//       return;
//     }
//     const { name } = hoveredObject;
//     const objes = data.find(ele => ele.name.slice(0, 1) === name.slice(0, 1));
//     if (!objes) {
//       return;
//     }
//     const { value = 0 } = objes;
//     return (
//       hoveredObject && (
//         <div
//           style={{
//             position: "absolute",
//             zIndex: 10,
//             pointerEvents: "none",
//             left: pointerX,
//             top: pointerY,
//             color: "#fff",
//             backgroundColor: "RGBA(0,0,0,0.6)",
//             padding: 10,
//             fontSize: 14,
//           }}
//         >
//           {name.replace(/compound/, "")}
// :
//           {value}
//         </div>
//       )
//     );
//   };

//   getColor = (name, data) => {
//     let color = [243, 103, 41];
//     const objes = data.find(ele => ele.name.slice(0, 1) === name.slice(0, 1));
//     if (!objes) {
//       return [236, 236, 238];
//     }
//     const { value = 0 } = objes;
//     const numValue = Number(value);
//     switch (true) {
//       case numValue > 600000:
//         color = [243, 103, 41];
//         break;
//       case numValue >= 400000 && numValue < 600000:
//         color = [255, 131, 45];
//         break;
//       case numValue >= 200000 && numValue < 400000:
//         color = [255, 246, 205];
//         break;
//       case numValue < 200000:
//         color = [236, 236, 238];
//         break;
//       default:
//         color = [236, 236, 238];
//         break;
//     }
//     return color;
//   };

  renderMap = () => {
    const { data = [] } = this.state;
    console.log(data)
    // if (data.length === 0) {
    //   setTimeout(() => {
    //     this.renderMap(characterSet);
    //   }, 1000);
    //   return;
    // }
    // const polygonLayer = new PolygonLayer({
    //   id: `station-border-layer`,
    //   data: homeJson,
    //   getPolygon: d => {
    //     const { coordinates } = d;
    //     return coordinates;
    //   },
    //   filled: true,
    //   getFillColor: d => this.getColor(d.name, data),
    //   // getFillColor: [255, 0, 0],
    //   // stroked: true,
    //   opacity: 1,
    //   // lineWidthMinPixels: 2,
    //   getLineColor: [176, 176, 176],
    //   getLineWidth: 1,
    //   lineWidthMinPixels: 1,
    //   getLineDashArray: [2, 5],
    //   pickable: true, // 是否可选
    //   // stroked: true, //填充，效果未知
    //   onHover: info => {
    //     this.setState({
    //       hoveredObject: info.object,
    //       pointerX: info.x,
    //       pointerY: info.y,
    //     });
    //   },
    //   // onHover: ({ object, x, y }) => {
    //   //   const tooltip = `${object.name}\nPopulation: ${123}`;
    //   //   return tooltip
    //   //   /* Update tooltip
    //   //      http://deck.gl/#/documentation/developer-guide/adding-interactivity?section=example-display-a-tooltip-for-hovered-object
    //   //   */
    //   // }
    // });

    const hexagonLayer = new HexagonLayer({
      id: 'hexagon-layer',
      data,
      "coverage": 1,
      "pickable": true,
      "autoHighlight": true,
      "elevationRange": [
        0,
        3000
      ],
      "elevationScale": 500,
      "extruded": true,
      "radius": 10000,
      "upperPercentile": 10000,
      getPosition: d => [Number(d.siteLng), Number(d.siteLat)],
      "colorRange": [
        [
          1,
          152,
          189
        ],
        [
          73,
          227,
          206
        ],
        [
          216,
          254,
          181
        ],
        [
          254,
          237,
          177
        ],
        [
          254,
          173,
          84
        ],
        [
          209,
          55,
          78
        ]
      ]
    });

    // const textLayer = new TextLayer({
    //   id: `text-layer`,
    //   data: homeJson.map(item => {
    //     const { name, coordinatesCenter } = item;
    //     return {
    //       id: name,
    //       name,
    //       coordinates: coordinatesCenter,
    //     };
    //   }),
    //   // pickable: true,
    //   getPosition: d => d.coordinates,
    //   getText: d => (/compound/.test(d.name) ? "" : d.name),
    //   getColor: [0, 0, 0],
    //   getSize: 19,
    //   characterSet,
    //   fontFamily: "MicrosoftYaHei, Helvetica",
    //   // getAngle: 0,
    //   // getTextAnchor: 'middle',
    //   // getAlignmentBaseline: 'center',
    //   // onHover: info => {
    //   //   // console.log('chufale')
    //   //   this.setState({
    //   //   hoveredObject: info.name,
    //   //   pointerX: info.x,
    //   //   pointerY: info.y,
    //   // })},
    //   // onHover: info => this.renderTooltip(info.object, info.x, info.y),
    // });
    this.setState({
      // polygonLayer,
      // textLayer,
      hexagonLayer,
    });
  };

  render() {
    // const { data = [] } = this.props;
    const {
      hexagonLayer,
      polygonLayer,
      textLayer,
      hoveredObject,
      pointerX,
      pointerY,
    } = this.state;
    console.log(hexagonLayer)
    return (
      <div className={styles.areaInfo}>
        <div className={styles.mapContainer} style={{width:window.innerWidth,height:window.innerHeight}}>
          <DeckGL
            width="100%"
            height="100%"
            // useDevicePixels={false}
            controller
            viewState={{
              longitude: 103.480,
              latitude: 40.660,
              zoom: 3.70,
              pitch: 40.5,
              // minZoom,
              // maxZoom,
              // pitch,
              // bearing,
            }}
            // onHover={(info, event) => console.log('Hovered:', info, event)}
            // onClick={(info, event) => console.log('Clicked:', info, event)}
            layers={[hexagonLayer]}
            getTooltip={({ object }) => object && `${object.centroid.join(', ')}\nCount: ${object.points.length}`}
          >
            <StaticMap mapStyle={mapStyle} />
            {/* {this.renderTooltip(hoveredObject, pointerX, pointerY)} */}
          </DeckGL>
          {/* <img src={sjz} alt="石家庄行政区划图" /> */}
        </div>
      </div>
    );
  }
}

export default Map;
