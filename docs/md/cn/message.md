# message 全局提示

全局展示操作反馈信息。

### 何时使用

顶部居中显示并自动消失，是一种不打断用户操作的轻量级提示方式。

### 普通使用

<!--DemoStart-->

```js
class Demo extends Component {
  openMessage() {
    Message.msg('这是一段提示！');
  }
  render() {
    return (
      <a herf="javascript:;" onClick={this.openMessage}>
        打开Message
      </a>
    );
  }
}
```

<!--End-->

### 自定义消失时间

<!--DemoStart-->

```js
class Demo extends Component {
  // 设置第二个参数即可，默认为1.5秒
  openMessage() {
    Message.msg('这是一段提示！', 3);
  }
  render() {
    return (
      <a herf="javascript:;" onClick={this.openMessage}>
        3秒后消失
      </a>
    );
  }
}
```

<!--End-->
