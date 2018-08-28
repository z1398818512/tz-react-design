# Upload 标签

### 传入获取阿里云 oss 令牌的 api 和 token。 组件会自动将文件上传至阿里云

<!--DemoStart-->

```js
class Demo extends Component {
  render() {
    return (
      <div>
        <Upload
          max={10}
          onChange={info => {
            console.log(info);
          }}
          action="https://www-test.shiguangkey.com/api/v1/public/upload/getUploadToken"
          token="0948226306592180495"
          dirPrefix="homework"
        />
      </div>
    );
  }
}
```

<!--End-->

## API

### Upload

| 参数      | 说明                                                                             | 类型            | 默认值                      |
| --------- | -------------------------------------------------------------------------------- | --------------- | --------------------------- |
| onChange  | 选择文件上传触发。操作的文件有三个状态：uploading(进行中) done(成功) error(失败) | function(value) | -                           |
| action    | 获取客户端上传 oss 令牌 url                                                      | string          | -                           |
| token     | 用户 token                                                                       | string          | -                           |
| fileList  | 初始有的列表数组                                                                 | array           | []                          |
| max       | 允许上传的最大大小 单位兆 M                                                      | int             | 非必传                      |
| resCdn    | 下载地址的前缀域名                                                               | string          | https://res.shiguangkey.com |
| dirPrefix | 业务名、前缀                                                                     | string          | homework                    |
