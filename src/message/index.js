import Notification from 'rc-notification';
import 'rc-notification/assets/index.css';
import './index.less';

let messageInstance = null;
const prefixCls = 'tzMessage';
const key = 1;

function getMessageInstance(callback) {
  if (messageInstance) {
    callback(messageInstance);
    return;
  }
  Notification.newInstance(
    {
      prefixCls,
      transitionName: 'move-up',
    },
    instance => {
      if (messageInstance) {
        callback(messageInstance);
        return;
      }
      messageInstance = instance;
      callback(instance);
    }
  );
}

function notice(content, duration) {
  const target = key + 1;
  getMessageInstance(instance => {
    instance.notice({
      key: target,
      duration,
      style: {},
      content,
    });
  });
  return () => {
    if (messageInstance) {
      messageInstance.removeNotice(target);
    }
  };
}

export default {
  msg(content, duration = 1.5) {
    return notice(content, duration);
  },

  destroy() {
    if (messageInstance) {
      messageInstance.destroy();
      messageInstance = null;
    }
  },
};
