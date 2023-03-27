import React from 'react';
import { Result, Button } from 'antd';
import { Link } from 'dva/router';
// import Exception from '../../components/Exception';

export default () => (
  <Result
    status="404"
    // title="404"
    subTitle="抱歉，你访问的页面不存在"
    // extra={<Button type="primary" ><Link to="/index">返回首页</Link></Button>}
  />
  // <Exception type="404" style={{ minHeight: 500, height: '80%' }} linkElement={Link} />
);
