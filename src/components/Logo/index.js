import React from 'react';
import globalConfig from 'config.js';
import './index.less';

/**
 * 定义Logo组件
 */
class Logo extends React.PureComponent {
  render() {
    return (
      <div className={this.props.collapse ? "ant-layout-logo-collapse" : "ant-layout-logo-normal"}>
        <div className="ant-layout-logo-text">
          <a href="#" style={{ color:'#ffffff' }}>{this.props.collapse ? globalConfig.name[0] : globalConfig.name}</a>
        </div>
      </div>
    );
  }
}

export default Logo;

// 增加公司logo
// <img src={globalConfig.favicon}  style={{ width:'50px' }}/>
// {/*侧边栏折叠的时候只显示一个字*/}
// <br />
