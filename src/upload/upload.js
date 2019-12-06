import React from 'react';
import PropTypes from 'prop-types';
import Upload from 'rc-upload';
import { Line } from 'rc-progress';
import axios from 'axios';
import { rejects } from 'assert';
import './upload.less';
import Message from '../message';
import upload from '../../static/assetsUpload.png';

// 从上传列表中找出当前上传的文件
function getFileItem(file, fileList) {
  const matchKey = file.uid !== undefined ? 'uid' : 'name';
  return fileList.filter(item => item[matchKey] === file[matchKey])[0];
}

function fileToObject(file) {
  return {
    ...file,
    lastModified: file.lastModified,
    lastModifiedDate: file.lastModifiedDate,
    name: file.name,
    size: file.size,
    type: file.type,
    uid: file.uid,
    percent: 0,
    originFileObj: file,
  };
}

function removeFileItem(file, fileList = []) {
  const matchKey = file.uid !== undefined ? 'uid' : 'name';
  const removed = fileList.filter(item => item[matchKey] !== file[matchKey]);
  if (removed.length === fileList.length) {
    return null;
  }
  return removed;
}

export default class UploadFile extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    fileList: PropTypes.array,
    max: PropTypes.number,
    action: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
    type: PropTypes.array,
    beforeUpload: PropTypes.func,
  };

  static defaultProps = {
    fileList: [],
  };
  constructor(props) {
    super(props);
    this.state = {
      fileList: props.fileList || [],
      progressPercent: 0,
      getaliyunInfoUrl: props.action,
      token: props.token,
      UploadUrl: props.resCdn || 'https://res.shiguangkey.com',
      ossToken: {
        OSSAccessKeyId: undefined,
        signature: undefined,
        policy: undefined,
      },
      action: 'https://tzyf.oss-cn-shanghai.aliyuncs.com',
      dirPrefix: this.props.dirPrefix || 'homework',
    };
    this.onSuccess = this.onSuccess.bind(this);
    this.onProgress = this.onProgress.bind(this);
    this.onStart = this.onStart.bind(this);
  }

  //   componentWillReceiveProps(nextProps) {
  //     this.setState({
  //       fileList: nextProps.fileList,
  //     });
  //   }

  onChange = info => {
    if ('fileList' in this.props) {
      this.setState({ fileList: info.fileList });
    }

    const { onChange } = this.props;
    if (onChange) {
      onChange(info);
    }
  };
  onSuccess(response, file) {
    try {
      if (typeof response === 'string') {
        // eslint-disable-next-line
        response = JSON.parse(response);
      }
    } catch (e) {
      /* do nothing */
    }
    const fileList = this.state.fileList;
    const targetItem = getFileItem(file, fileList);
    // removed
    if (!targetItem) {
      return;
    }
    targetItem.status = 'done';
    targetItem.url = `${this.state.UploadUrl}/${file.keyName}`;

    this.onChange({
      file: { ...targetItem },
      fileList,
    });
  }

  onDelete(file) {
    const removedFileList = removeFileItem(file, this.state.fileList);
    this.onChange({
      file: {},
      fileList: removedFileList,
    });
  }

  onStart(file) {
    const fileList = this.state.fileList.concat();
    const targetItem = fileToObject(file);
    targetItem.status = 'uploading';
    fileList.push(targetItem);
    this.onChange({
      file: targetItem,
      fileList,
    });
  }

  onProgress(e, file) {
    const fileList = this.state.fileList.concat();
    const targetItem = getFileItem(file, fileList);
    if (!targetItem) {
      return;
    }
    targetItem.percent = e.percent;
    this.onChange({
      e,
      file: targetItem,
      fileList,
    });
  }

  onError = (e, response, file) => {
    const fileList = this.state.fileList;
    const targetItem = getFileItem(file, fileList);
    // removed
    if (!targetItem) {
      return;
    }
    targetItem.response = response;
    targetItem.status = 'error';
    this.onChange({ file: { ...targetItem }, fileList });
  };
  beforeUpload = file => {
    /*eslint-disable */
    debugger;
    if (this.props.beforeUpload && !this.props.beforeUpload(file)) {
      return false;
    }
    if (this.props.max && file.size / 1024 / 1024 > this.props.max) {
      Message.msg(`文件大小超出限制，大小不能超过${this.props.max}M`);
      return false;
    }
    if (this.props.type && this.props.type.indexOf(file.type) === -1) {
      Message.msg('文件类型错误');
      return false;
    }
    return axios
      .get(this.state.getaliyunInfoUrl, {
        params: {
          dirPrefix: this.props.dirPrefix,
          token: this.props.token,
          terminalType: 4,
        },
      })
      .then(data => {
        const res = data.data.data.ossToken;
        if (Date.now() > res.expire * 1000) {
          Message.msg('接口超时');
          return rejects('超时');
        }
        return this.setState({
          ossToken: {
            OSSAccessKeyId: res.accessid,
            policy: res.policy,
            signature: res.signature,
          },
          action: res.host,
        });
      });
  };
  /*eslint-disable */
  onRequestData = file => {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var adate = date.getDate();
    const fileName = file.name.split('.');
    const name = `${this.props.dirPrefix}/${year}/${
      month < 10 ? '0' + month : month
    }/${adate}/${Date.now()}.${fileName[fileName.length - 1]}`;
    file.keyName = name;
    return {
      ...this.state.ossToken,
      success_action_status: 200,
      key: name,
    };
  };
  render() {
    const uploaderProps = {
      multiple: true,
      onStart: this.onStart,
      onSuccess: this.onSuccess,
      onProgress: this.onProgress,
      onError: this.onError,
      ...this.props,
      beforeUpload: this.beforeUpload.bind(this),
      data: this.onRequestData.bind(this),
      action: this.state.action,
    };

    const fileList = this.state.fileList;
    return (
      <div className="uploadContainer">
        <Upload {...uploaderProps}>
          {this.props.children ? (
            this.props.children
          ) : (
            <div className="uploadButton">
              <img src={upload} alt="upload" />
              上传
            </div>
          )}
        </Upload>
        <div className="fileList">
          {fileList.length
            ? fileList.map((file, index) => (
                <div key={index} className="flieBox">
                  <a
                    className="fileName"
                    href={file.url ? file.url : null}
                    download={file.url ? file.url : null}
                    target="_black"
                  >
                    {file.name}
                  </a>
                  <span
                    className="deleButton"
                    onClick={this.onDelete.bind(this, file, index)}
                  >
                    删除
                  </span>
                  {file.percent < 100 ? (
                    <Line
                      percent={file.percent}
                      strokeWidth=".5"
                      strokeColor={
                        file.status === 'error' ? '#ED4A4B' : '#52c41a'
                      }
                    />
                  ) : null}
                </div>
              ))
            : null}
        </div>
      </div>
    );
  }
}
