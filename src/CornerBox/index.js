import React from 'react';
import style from './index.less';

const CornerBox = ({
  children,
  cornerPosition = ['leftTop', 'leftBottom', 'rightTop', 'rightBottom'],
  styles,
}) => {
  const value = [];
  let rightBottom = 'rightBottom';
  let leftBottom = 'leftBottom';
  let block = 'block';
  let defultValue = children;
  if (styles === 'triangle') {
    rightBottom = 'rightBottom_triangle';
    leftBottom = 'leftBottom_triangle';
    block = 'block_triangle';
    defultValue = (
      <div className="grid">
        <figure
          className={`effect-apollo-${
            cornerPosition.length > 0 ? cornerPosition[0] : ''
          }`}
        >
          <figcaption>{children}</figcaption>
        </figure>
      </div>
    );
  } else if (styles === 'clear') {
    block = 'block_clear';
  }

  cornerPosition.map(item => {
    switch (item) {
      case 'leftTop':
        value.push(<div className={style.leftTop} key={item} />);
        break;
      case 'leftBottom':
        value.push(<div className={style[leftBottom]} key={item} />);
        break;
      case 'rightTop':
        value.push(<div className={style.rightTop} key={item} />);
        break;
      case 'rightBottom':
        value.push(<div className={style[rightBottom]} key={item} />);
        break;
      default:
        break;
    }
    return value;
  });
  return (
    <div className={style[block]}>
      {value}
      {defultValue}
    </div>
  );
};

export default CornerBox;
