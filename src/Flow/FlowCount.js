import React, { Component } from "react";
import CornerBox from "../CornerBox";
import styles from "./FlowCount.less";

class FlowCount extends Component {
  state = {

  };
  leftData = [
    {
      title: "员工总数",
      content: ["qwe123"]
    },
    {
      title: "男女性别占比展示",
      content: ["qwe123"]
    },
    {
      title: "年龄分段展示",
      content: ["qwe123"]
    },
  ]
  rightData = [
    {
      title: "工龄展示",
      content: ["qwe123"]
    },
    {
      title: "职级分布和和占比",
      content: ["qwe123"]
    },
    {
      title: "职类分布和占比",
      content: ["qwe123"]
    },
  ]
  componentDidMount() {

  }


  render() {
    // const { data = [] } = this.props;
    const {
    } = this.state;
    console.log(this.leftData)
    return (
      <div className={styles.areaPeopleCount}>
        <div className={styles.title}>浩鲸科技员工大数据</div>

        <div className={styles.content} style={{ height: window.innerHeight - 77 - 16 }}>
          <div className={styles.leftBox}>
            {this.leftData.map(item => {
              const { content}=item
              return (
                <div>
                  <div className={styles.box}>
                    <CornerBox>
                      {content}
                  </CornerBox>
                  </div>
                  <div style={{ height: 30 }} />
                </div>
              )
            })}
          </div>
          <div className={styles.rightBox}>
            {this.rightData.map(item => {
              const { content } = item
              return (
                <div>
                  <div className={styles.box}>
                    <CornerBox>
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
