import React, { Component } from "react";
import Map from "./Map";
import FlowCount from "./Flow";
import style from "./Main.less";
class Main extends Component {
    render() {
        return (
            <div className={style.main}>
                <FlowCount />
                <Map/>
            </div>
        );
    }
}

export default Main;