import React, { Component } from "react";
import echarts from "echarts";

class PieCharts extends Component {
  state = {

  };
  ref=null


  componentDidMount() {
    var myChart = echarts.init(this.ref);
    myChart.setOption({
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
        textStyle:{
          color:"#ffffff"
        },
        orient: 'vertical',
        right: 20,
        bottom:20,
        data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: ['55%', '70%'],
          center: ['28%', '50%'],
          avoidLabelOverlap: false,
          color: ["#0000FF", "#FF0000", "#3CB2EF", "#FFFF00", "#AEFDCA","#FFA500"],
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '20',
              fontWeight: 'bold'
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
    });
  }


  render() {

    return (
      <div>
        <div ref={(ref)=>this.ref=ref} style={{ width: 350, height: 230 }} />
      </div>
    );
  }
}

export default PieCharts;
