import React, { Component } from "react";
import DeckGL from "@deck.gl/react";
import { StaticMap } from "react-map-gl";
import { ArcLayer } from "@deck.gl/layers";
import { HexagonLayer } from '@deck.gl/aggregation-layers';
import mapStyle from "./mapStyle";
import { citys } from "./city.json";

import styles from "./Map.less";

class Map extends Component {
  state = {
    hexagonLayer: [],
    arclayer: [],
    switchType: "员工籍贯"
  };
  switchButton = ["员工籍贯", "员工出差情况"]

  componentDidMount() {
    this.getData()
    //;
  }

  getData = async () => {
    const res = await fetch(`${window.hostProxy}/personnel/data/site`)
    const data = await res.json()
    if (`${data.errCode}` === "0") {
      this.setState({
        data: data.data
      }, () => { this.renderMap() })
    }

  }

  renderMap = () => {
    const { data = [] } = this.state;
    const arcData = []
    citys.forEach((item) => {
      for (let i = 0; i < 3; i++) {
        const target = data[Math.floor(Math.random() * data.length)]
        arcData.push({
          inbound: Math.floor(Math.random() * 10000) / citys.length,
          outbound: Math.floor(Math.random() * 10000) / citys.length,
          from: {
            name: item.name,
            coordinates: item.center
          },
          to: {
            name: target.accountSite,
            coordinates: [Number(target.siteLng), Number(target.siteLat)]
          },
        })
      }
    })
    console.log(arcData)
    const arclayer = new ArcLayer({
      id: 'arc-layer',
      data: arcData,
      pickable: true,
      getWidth: 7,
      getSourcePosition: d => d.from.coordinates,
      getTargetPosition: d => d.to.coordinates,
      getSourceColor: d => [d.inbound / d.outbound * 255, 255, 0, 200],
      getTargetColor: d => [d.outbound / d.inbound * 255, 255, 0, 200],
    });
    console.log(arclayer)
    const hexagonLayer = new HexagonLayer({
      id: 'hexagon-layer',
      data,
      coverage: 1,
      pickable: true,
      autoHighlight: true,
      elevationRange: [
        0,
        3000
      ],
      elevationScale: 700,
      extruded: true,
      radius: 20000,
      upperPercentile: 100,
      getPosition: d => [Number(d.siteLng), Number(d.siteLat)],
      colorRange: [
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
      arclayer,
      hexagonLayer,
    });
  };

  render() {
    const {
      hexagonLayer,
      arclayer,
      switchType
    } = this.state;
    // console.log(arclayer)
    let arr = []
    switch (switchType) {
      case "员工出差情况":
        arr = [arclayer]
        break;
      case "员工籍贯":
        arr = [hexagonLayer]
        break;

      default:
        break;
    }
    return (
      <div className={styles.areaInfo}>
        <div className={styles.mapContainer} style={{ width: window.innerWidth, height: window.innerHeight }}>
          <DeckGL
            width="100%"
            height="100%"
            // useDevicePixels={false}
            // controller
            viewState={{
              longitude: 103.480,
              latitude: 40.660,
              zoom: 3.30,
              pitch: 40.5,
            }}
            layers={[...arr]}
            getTooltip={({ object }) => {
              if (!object) {
                return
              }
              let str = ""
              switch (switchType) {
                case "员工出差情况":
                  str = `${object.from.name} 出差到 ${object.to.name} ${Math.ceil(object.outbound)}人`
                  break;
                case "员工籍贯":
                  str = `${object.points[0].accountSite}\n数量: ${object.points.length}人`
                  break;

                default:
                  break;
              }
              return str
            }}
          >
            <StaticMap mapStyle={mapStyle} />
          </DeckGL>
        </div>
        <div className={styles.switchButton}>
          {this.switchButton.map(item => (
            <div className={styles.button}
              key={item}
              style={{ backgroundColor: switchType === item ? "aqua" : "darkblue", color: switchType === item ? "black" : "antiquewhite" }}
              onClick={() => {
                this.setState({
                  switchType: item
                })
              }}
            >{item}</div>
          ))}
        </div>
      </div>
    );
  }
}

export default Map;
