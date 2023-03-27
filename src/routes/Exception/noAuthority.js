import React from 'react';
import { Result, Button } from 'antd';
import { Link } from 'dva/router';
import Exception from '../../components/Exception';

export default () => (
  <Result
    status="403"
    // title="403"
    subTitle="抱歉，你无权访问该页面"
    // extra={<Button type="primary" ><Link to="/index">返回首页</Link></Button>}
  />
  // <Exception type="403" style={{ minHeight: 500, height: '80%' }} linkElement={Link} />
);
