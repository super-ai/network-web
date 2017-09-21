import React from 'react';
import './index.less';

/**
 * 展示欢迎界面
 */
class Question extends React.PureComponent {

  render() {
    return (
      <div>
        <h1 className="welcome-text">
          非常完美，没有问题。
          <br />
          <br />

        </h1>
      </div>
    );
  }
}

export default Question;
