import React from 'react';
import _ from 'lodash';
import { Row, Col, Form, Input, Button, Select, message } from 'antd';
import styles from './index.less';
import { FetchQueryInnerObject } from '../../../../services/commonbase';

const FormItem = Form.Item;
const { Option } = Select;

class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productList: [],
    };
  }

  componentDidMount() {
    this.fetchQueryInnerObject();
  }

  handleSearch = () => {
    const values = this.props.form.getFieldsValue();
    const { handleSearch } = this.props;
    if (handleSearch && typeof handleSearch === 'function') {
      handleSearch.call(this, values);
    }
  };

  handleReset = () => {
    const { setFieldsValue } = this.props.form;
    const { handleReset } = this.props;
    setFieldsValue({
      prodManager: '', // 产品管理人ID
      prodName: '', // 产品代码/名称
    });
    if (handleReset && typeof handleReset === 'function') {
      handleReset.call();
    }
  };

  // enter 事件
  KeyUpHandle = (e) => {
    const values = this.props.form.getFieldsValue();
    const { KeyUpHandle } = this.props;
    KeyUpHandle(e, values);
  };

  // 产品管理人
  fetchQueryInnerObject = async (keyword = '') => {
    await FetchQueryInnerObject({
      id: '',
      keyword,
      objectName: 'PIF.TPIF_JGDM',
    }).then((response) => {
      const { records = [] } = response;
      if (records && records.length > 0) {
        this.setState({ productList: records });
      }
    }).catch((error) => {
      message.error(!error.success ? error.message : error.note);
    });
  }

  // 关键字搜索
  onSearch = (val) => {
    this.fetchQueryInnerObject(val);
  }

  render() {
    const { productList = [] } = this.state;
    const { getFieldDecorator } = this.props.form;

    return (
      <div className=" clearfix">
        <div className="m-yxhd-form-box">
          <Form className="m-form-default ant-advanced-search-form" >
            <Row>
              {/* <Col xs={24} sm={24} md={12} xl={8}>
                <FormItem className={`${styles.label} m-form-item `} label="产品管理人">
                  {getFieldDecorator('prodManager', {
                  })( // eslint-disable-line
                    <Select className="m-select m-select-white" onSearch={_.debounce(this.onSearch, 400)} labelName="" placeholder="请选择产品管理人" allowClear showSearch optionFilterProp="children" style={{ width: '100%' }}>
                      {productList.map(item => <Option value={item.id} key={item.id}>{item.name}</Option>)}
                    </Select>)}
                </FormItem>
              </Col> */}
              <Col xs={24} sm={24} md={12} xl={8}>
                <FormItem className="m-form-item" label="产品代码/名称">
                  {getFieldDecorator('prodName', {
                    initialValue: '',
                  })(<Input allowClear autoComplete="off" onKeyUp={this.KeyUpHandle} placeholder="产品代码/名称" />)}
                </FormItem>
              </Col>

              <Col xs={24} sm={24} md={12} xl={7} >
                <div className="m-form-padding">
                  <Button className="m-btn-radius m-btn-red" type="primary" onClick={this.handleSearch}>查询</Button>
                  <Button className="m-btn-radius m-btn-gray" onClick={this.handleReset}>重置</Button>
                </div>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    );
  }
}

export default Form.create()(Filter);
