import React from 'react';
import { Form, Row, Input, Button } from 'antd';
import PropTypes from 'prop-types';

const divStyle = { display: 'inline-block' };
const btnStyles = { marginLeft: 15, marginBottom: 10 };
const FormItem = Form.Item;

class TzForm extends React.Component {
  static propTypes = {
    ItemList: PropTypes.array,
    data: PropTypes.object,
    onSearch: PropTypes.func,
    form: PropTypes.object,
  };
  static defaultProps = {
    ItemList: [],
    data: {},
    onSearch: () => {},
  };
  constructor(props) {
    super(props);
    this.state = {};
    this.search = this.search.bind(this);
    this.reset = this.reset.bind(this);
  }
  /* eslint-disable */
  delItem(obj) {
    Object.keys(obj).map(item => {
      if (obj[item] === undefined) {
        delete obj[item];
      }
    });
    return obj;
  }
  search(e) {
    const _this = this;
    e.preventDefault();
    this.props.form.validateFields((err, value) => {
      if (!err) {
        _this.props.onSearch(_this.delItem(value));
      }
    });
  }
  reset() {
    this.props.form.resetFields();
    this.props.onSearch(this.delItem(this.props.form.getFieldsValue()));
  }
  render() {
    const { ItemList, form } = this.props;
    const { getFieldDecorator, initialValue } = form;
    const buildFormItem = list => {
      return list.map(item => {
        let {
          label,
          key,
          type = 'text',
          rules,
          width,
          defaultValue,
          render,
          style = {},
          placeholder,
          addonBefore,
        } = item;
        const itemLayout = addonBefore
          ? { labelCol: { span: 0 }, wrapperCol: { span: 24 } }
          : {
              labelCol: {
                xs: { span: 7 },
                lg: { span: 8 },
                xl: { span: 7 },
                // span: 10,
              },
              wrapperCol: {
                xs: { span: 16 },
                lg: { span: 16 },
                xl: { span: 17 },
                // span: 14,
              },
            };
        function inputBefore(obj) {
          return getFieldDecorator(obj.key ? String(obj.key) : undefined, {
            initialValue: obj.defaultValue,
          })(obj.render);
        }
        const elem = render || (
          <Input
            type={type}
            placeholder={placeholder}
            addonBefore={addonBefore ? inputBefore(addonBefore) : undefined}
          />
        );
        return (
          <div style={divStyle} key={key}>
            <FormItem
              label={label}
              style={{ ...style, width: width || 300, marginBottom: 10 }}
              {...itemLayout}
            >
              {getFieldDecorator(key, {
                initialValue: defaultValue ? String(defaultValue) : undefined,
                rules: rules || undefined,
              })(elem)}
            </FormItem>
          </div>
        );
      });
    };
    if (ItemList.length === 0) {
      return null;
    }
    return (
      <Form layout="inline" onSubmit={this.search}>
        <Row gutter={6}>
          {buildFormItem(ItemList)}
          <div style={divStyle}>
            <FormItem style={btnStyles}>
              <Button
                type="primary"
                size="large"
                style={{ marginRight: 20 }}
                htmlType="submit"
              >
                查询
              </Button>
              <Button size="large" onClick={this.reset}>
                重置
              </Button>
            </FormItem>
          </div>
        </Row>
      </Form>
    );
  }
}
export default Form.create()(TzForm);
