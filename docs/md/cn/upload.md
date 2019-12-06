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
          action="https://www-dev.shiguangkey.com/api/v1/public/upload/getUploadToken"
          token="9522016974407452539"
          dirPrefix="homework"
          type={['image/jpeg']}
          beforeUpload={flie => {
            return true;
          }}
        />
      </div>
    );
  }
}
```

<!--End-->

## API

### Upload

| 参数         | 说明                                                                             | 类型            | 默认值                      |
| ------------ | -------------------------------------------------------------------------------- | --------------- | --------------------------- |
| onChange     | 选择文件上传触发。操作的文件有三个状态：uploading(进行中) done(成功) error(失败) | function(value) | -                           |
| action       | 获取客户端上传 oss 令牌 url                                                      | string          | -                           |
| token        | 用户 token                                                                       | string          | -                           |
| fileList     | 初始有的列表数组                                                                 | array           | []                          |
| max          | 允许上传的最大大小 单位兆 M                                                      | int             | 非必传                      |
| resCdn       | 下载地址的前缀域名                                                               | string          | https://res.shiguangkey.com |
| dirPrefix    | 业务名、前缀                                                                     | string          | homework                    |
| type         | 允许上传的文件格式（以 file 文件对象的 type 属性值来判断的)                      | array           | 非必传                      |
| beforeUpload | 上传文件之前的钩子，参数为上传的文件对象，若返回 false 则停止上传。              | function        | 非必传                      |
