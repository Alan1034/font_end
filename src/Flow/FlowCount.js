import React, { Component } from "react";
import CountUp from 'react-countup';
import CornerBox from "../CornerBox";
import PieCharts from "./PieCharts";
import LineCharts from "./LineCharts";
import styles from "./FlowCount.less";

class FlowCount extends Component {
  state = {
    data:{}
  };
 
  componentDidMount() {
    this.getData()
  }

  getData=async()=>{
    console.log(window.hostProxy)
    const res =await fetch(`${window.hostProxy}/personnel/data/population`)
    const data = await res.json()
    if (`${data.errCode}`=== "0") {
      this.setState({
        data:data.data
      })
    }
    
  }

  render() {
    // const { data = [] } = this.props;
    const {data} = this.state;
    console.log(data)
    const leftData = [
      {
        title: "员工总数",
        content: (<div className={styles.cuntup}><CountUp delay={2} end={data.population||0} /></div>)
      },
      {
        title: "男女性别占比展示",
        content: <PieCharts 
        data={[
          { value: data.male, name: '男性' },
          { value: data.female, name: '女性' },
        ]}
        name={"男女性别占比展示"}
        />
      },
      {
        title: "年龄分段展示",
        content: <LineCharts
          data={Object.entries(data.age || {}).map((item) => {
            const [name, value] = item
            return {
              value, name,
            }
          })}
          name={"工龄展示"}
          formatter={'{a}<br/>{b} 岁 {c} 人'}
        />
      },
    ]
    const rightData = [
      {
        title: "工龄展示",
        content: <LineCharts 
          data={Object.entries(data.divisionAge || {}).map((item) => {
            const [name, value] = item
            return {
              value, name,
            }
          })}
          name={"工龄展示"}
          formatter={'{a}<br/>{b} 年 {c} 人'}
        />
      },
      {
        title: "职级分布和和占比",
        content: <PieCharts 
          data={Object.entries(data.payRank||{}).map((item)=>{
            const [name,value]=item
            return{
              value, name,
          }})}
          
          name={"职级分布和和占比"}
        />
      },
      {
        title: "职类分布和占比",
        content: <PieCharts 
          name={"职类分布和占比"}
          data={Object.entries(data.employ || {}).map((item) => {
            const [name, value] = item
            return {
              value, name,
            }
          })}
        />
      },
    ]
    return (
      <div className={styles.areaPeopleCount}>
        <div className={styles.title}>浩鲸科技员工大数据</div>

        <div className={styles.content} style={{ height: window.innerHeight - 77 - 16 }}>
          <div className={styles.leftBox}>
            {leftData.map(item => {
              const { content, title}=item
              return (
                <div key={title}>
                  <div className={styles.box}>
                    <CornerBox>
                      <div className={styles.title}>{title}</div>
                      {content}
                    </CornerBox>
                  </div>
                  <div style={{ height: 30 }} />
                </div>
              )
            })}
          </div>
          <div className={styles.rightBox}>
            {rightData.map(item => {
              const { content, title } = item
              return (
                <div key={title}>
                  <div className={styles.box}>
                    <CornerBox>
                      <div className={styles.title}>{title}</div>
                      {content}
                    </CornerBox>
                  </div>
                  <div style={{ height: 30 }} />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default FlowCount;
