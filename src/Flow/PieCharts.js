import React, { Component } from "react";
import echarts from "echarts";

class PieCharts extends Component {
  state = {
  };
  ref = null
  myChart = null
  highlightNum = 0//图表高亮数据
  actioning = false //判断图表是否在轮询
  option = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      textStyle: {
        color: "#ffffff"
      },
      orient: 'vertical',
      type: "scroll",
      top: 50,
      right: 20,
      bottom: 20,
      data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
    },
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: ['55%', '70%'],
        center: ['28%', '50%'],
        avoidLabelOverlap: false,
        color: ["#0000FF", "#FF0000", "#3CB2EF", "#FFFF00", "#AEFDCA", "#FFA500", "#FFC0CB", "#800080"],
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '15',
            fontWeight: 'bold',
            formatter: '{b}:{c}({d}%)'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 335, name: '直接访问' },
          { value: 310, name: '邮件营销' },
          { value: 234, name: '联盟广告' },
          { value: 135, name: '视频广告' },
          { value: 1548, name: '搜索引擎' }
        ]
      }
    ]
  }

  componentDidMount() {
    this.myChart = echarts.init(this.ref);
    this.myChart.setOption(this.option);
  }

  componentDidUpdate() {
    const { data, name } = this.props
    // console.log(this.props)
    if (data) {

      this.option.series[0].data = data
      this.option.series[0].name = name
      this.option.legend.data = data.map(item => item.name)
      // console.log(this.option.series[0])
      this.myChart.setOption(this.option);
      let mouseOver = false
      this.myChart.on('mouseover', "series", (params) => {
        mouseOver = true
        this.myChart.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,//第一个series
          dataIndex: this.highlightNum
        });
      });
      this.myChart.on('mouseout', "series", (params) => {
        mouseOver = false
      });
      const action = (num) => {
        this.actioning = true
        const { data } = this.props
        if (!mouseOver) {
          this.myChart.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,//第一个series
            dataIndex: num
          });
          this.highlightNum = num
        }
        setTimeout(() => {
          if (!mouseOver) {
            this.myChart.dispatchAction({
              type: 'downplay',
              seriesIndex: 0,//第一个series
              dataIndex: num
            });
          }
          if (data.length - 1 === num) {
            action(0)
          } else {
            action(num + 1)
          }
        }, 3000);
      }
      if (!this.actioning) {
        action(this.highlightNum)
      }
    }

  }

  render() {

    return (
      <div>
        <div ref={(ref) => this.ref = ref} style={{ width: 300, height: 200 }} />
      </div>
    );
  }
}

export default PieCharts;
