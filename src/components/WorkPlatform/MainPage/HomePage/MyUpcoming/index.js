import React, { useState, useEffect } from 'react';
import { message } from 'antd';
import { FetchUpcomingList } from '@/services/home/home';
import { paginationState } from '@/utils/pagination';
import CardList from './CardList';

function MyUpcoming(props) {
  const { parentUrl } = props;
  const [tableData, setTableData] = useState([]);
  const [count, setCount] = useState(0);
  const [payload, setPayload] = useState({ ...paginationState, pageSize: 5 });

  useEffect(() => {
    fetchTable();
  }, []);

  // 调用端口获取客户列表
  const fetchTable = () => {
    FetchUpcomingList({
      ...payload,
      type: '1', // 1|查询全部;2|运营任务;2|流程提; 4|风控
    }).then((response) => {
      const { records = [], total } = response || {};
      setTableData(records);
      setCount(total);
    }).catch((error) => {
      message.error(!error.success ? error.message : error.note);
    });
  };

  const listDataSource = [
    {
      id: '2775',
      isRead: '0',
      msgDesc: '63473uhdjsjhdbshjj',
      notificationId: '2775',
      occurTime: '2022/08/09 23:21:23',
      type: 'Workflow',
      typeDesc: '流程提醒',
      url: '/dhjsfj',
    },
    {
      id: '2775',
      isRead: '0',
      msgDesc: '63473uhdjsjhdbshjj',
      notificationId: '2775',
      occurTime: '2022/08/09 23:21:23',
      type: 'Workflow',
      typeDesc: '流程提醒',
      url: '/dhjsfj',
    },
  ];

  return (
    <CardList
      title="我的待办"
      showExtra
      total={count}
      parentUrl={parentUrl}
      listDataSource={tableData}
      fetchTable={fetchTable}
    />
    // <CardList
    //   title="我的待办"
    //   showExtra
    //   total={50}
    //   parentUrl={parentUrl}
    //   listDataSource={listDataSource}
    //   fetchTable={fetchTable}
    // />
  );
}

export default MyUpcoming;

