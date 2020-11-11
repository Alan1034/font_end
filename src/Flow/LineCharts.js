import React, { Component } from "react";
import echarts from "echarts";

class LineCharts extends Component {
  state = {

  };
  ref = null


  componentDidMount() {
    var myChart = echarts.init(this.ref);
    myChart.setOption({
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(220, 220, 220, 0.8)'
        }
      }]
    });
  }


  render() {

    return (
      <div>
        <div ref={(ref) => this.ref = ref} style={{ width: 350, height: 230 }} />
      </div>
    );
  }
}

export default LineCharts;
