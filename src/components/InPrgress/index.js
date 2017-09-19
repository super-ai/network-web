import React from 'react';
import './index.less';

/**
 * 展示开发中
 */
class InPrgress extends React.PureComponent {

  render() {
    return (
      <div>
        <h1 className="inprogress-text">
          正在开发中...
        </h1>
      </div>
    );
  }
}

export default InPrgress;
