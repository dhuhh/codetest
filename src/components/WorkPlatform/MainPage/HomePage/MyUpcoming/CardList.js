import React from 'react';
import { Card, List, Spin, Badge, message, ConfigProvider } from 'antd';
import { Link } from 'dva/router';
import { FetchMsgUpdate } from '@/services/home/home';
import NoData from '@/components/Common/NoData';

const customizeRenderEmpty = () => (
  <NoData height="30rem" />
);
function CardList({ total, fetchTable, title, listDataSource = [], parentUrl }) {
  // 消息中心操作
  const fetchMsgUpdate = async (id) => {
    await FetchMsgUpdate({
      id,
      operate: '1',
    }).then((response) => {
      const { note = '' } = response;
      fetchTable();
    }).catch((error) => {
      message.error(!error.success ? error.message : error.note);
    });
  };

  const handleOperation = (id) => {
    // fetchMsgUpdate(id);
  };

  const handleTitle = () => {
    return (
      <React.Fragment>
        <div className="card-title-name">
          <span>{title} <Badge count={total} className="m-badge m-badge-red" /></span>
        </div>
        <div className="btn-list-header">
          <Link to={`${parentUrl}/infoList`}><i className="more fs20 iconfont icon-more1" /></Link>
        </div>
      </React.Fragment>
    );
  };

  return (
    <Card
      className="m-card m-card-shadow"
      style={{ paddingBottom: '1.083rem', height: '480px' }}
      title={handleTitle()}
    >
      <ConfigProvider renderEmpty={customizeRenderEmpty}>
        {
          listDataSource.length >= 0 ?
            (
              <List
                className="m-list m-list-noMargin"
                itemLayout="horizontal"
                dataSource={listDataSource}
                renderItem={item => (
                  <List.Item onClick={() => handleOperation(item.id)}>
                    <List.Item.Meta
                      style={{ width: '100%' }}
                      title={
                        <span className="dis-fx alc-start">
                          <button className="m-btn-tag m-btn-radius-small m-btn-tag-level ant-btn">{item.typeDesc || '--'}
                          </button>&nbsp;&nbsp;
                          <Link to={item.url} className="inoneline" rel="noopener noreferrer">{item.msgDesc || '--'}</Link>
                        </span>}
                      description={<span>{item.occurTime || '--'}</span>}
                    />
                  </List.Item>
                )}
              />
            )
            :
            (
              <div style={{ textAlign: 'center', padding: '5rem' }}><Spin /></div>
            )
        }
      </ConfigProvider>
    </Card>
  );
}

export default CardList;
