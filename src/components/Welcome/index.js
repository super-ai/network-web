import React from 'react';
import './index.less';

/**
 * 展示欢迎界面
 */
class Welcome extends React.PureComponent {

  render() {
    return (
      <div>
        <h1 className="welcome-text">
          Hi, 这是一个基于Reactjs+ReactRouter+Redux+AntD,适用于后台管理的统一前台.
          <br />
          <br />
          正在开发中...
        </h1>
      </div>
    );
  }
}

export default Welcome;
