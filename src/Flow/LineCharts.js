import React, { Component } from "react";
import echarts from "echarts";

class LineCharts extends Component {
  state = {

  };
  ref = null
  myChart = null
  option = {
    tooltip: {
      trigger: 'axis',
      formatter: '{a}<br/>{b} 年 {c} 人'
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisLine: {
        lineStyle: { color: "#fff" }
      }
    },
    yAxis: {
      type: 'value',
      axisLine: {
        lineStyle: { color: "#fff" }
      }
    },
    series: [{
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar',
      showBackground: false,
      position: [10, 10],
      backgroundStyle: {
        color: 'rgba(220, 220, 220, 0.8)'
      },
      itemStyle: {
        normal: {
          color: '#bd93ec',
          barBorderRadius: [7.5, 7.5, 0, 0],
        },
      },
    }]
  }

  componentDidMount() {
    this.myChart= echarts.init(this.ref);
    this.myChart.setOption(this.option);
  }

componentDidUpdate(){
  const { data, name,formatter } = this.props
  // console.log(this.props)
  if (data) {
    this.option.xAxis.data = data.map(item=>item.name)
    this.option.tooltip.formatter = formatter
    this.option.series[0].data = data.map(item => item.value)
    this.option.series[0].name = name
    this.myChart.setOption(this.option);
}
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
