<!--DemoStart-->

```js
// import { Table } from 'antd';
const filterInfo = [
  {
    label: 'Name',
    key: 'userSelvaluea',
    placeholder: '请输入名称',
  },
  {
    label: 'age',
    key: 'age',
    placeholder: '请输入年龄',
  },
];

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
];
const dataSource = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
];
class Demo extends Component {
  onSubmit(val) {
    console.log(val);
  }
  render() {
    const adata = {
      filterInfo,
      tableInfo: {
        columns,
        dataSource,
      },
      onChange: this.onSubmit.bind(this),
    };
    return (
      <div>
        <TableHoc {...adata} />
      </div>
    );
  }
}
```

<!--End-->

## API

### TableHoc

| 参数       | 说明                                                                               | 类型            | 默认值   |
| ---------- | ---------------------------------------------------------------------------------- | --------------- | -------- |
| onChage    | 点击查询，重置，分页操作的回调。 参数为处理好的数据对象                            | function(value) | -        |
| filterInfo | filter 条件筛选 Form 的配置项，详细 API 如下                                       | array           | (非必传) |
| tableInfo  | Table 的配置项，用法与 antd 基本一致（onChange 与本 API 的 onChange 一致，可不写） | array           | -        |

### filterInfo

| 参数         | 说明                                                                                      | 类型   | 默认值   |
| ------------ | ----------------------------------------------------------------------------------------- | ------ | -------- |
| lable        | 描述                                                                                      | string | (非必传) |
| key          | 双向绑定的名                                                                              | string | -        |
| type         | 与 antd 的 Input 组件 type 属性一致                                                       | string | (非必传) |
| placeholder  | 描述信息                                                                                  | string | (非必传) |
| rules        | 校验规则，与 antd 一致                                                                    | array  | (非必传) |
| defaultValue | 默认绑定值，同 initialValue                                                               | string | (非必传) |
| render       | 用户自定义的 antd 的 form 组件                                                            | jsx    | (非必传) |
| width        | FormItem 的宽度                                                                           | string | (非必传) |
| style        | 绑定在 FormItem 上的 style                                                                | obj    | (非必传) |
| addonBefore  | 绑定在 Inputer 上的 addonBefore,基础配置与此配置一致,render 要自定义（线上 demo 里有例子) | obj    | (非必传) |
