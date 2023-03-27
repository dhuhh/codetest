import React from 'react';
import { Result, Button } from 'antd';
import { Link } from 'dva/router';
import Exception from '../../components/Exception';

export default () => (
  <Result
    status="500"
    // title="500"
    subTitle="抱歉，服务器出错了"
    extra={<Button type="primary" ><Link to="/index">返回首页</Link></Button>}
  />
  // <Exception type="500" style={{ minHeight: 500, height: '80%' }} linkElement={Link} />
);
