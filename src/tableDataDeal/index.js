/* eslint-disable */
import React from 'react';

export default ReactChildren => {
  class TqDeal extends React.Component {
    constructor() {
      super();
      this.state = {};
      this.data = {};
      this.pageSize = 10;
      this.formatValue = this.formatValue.bind(this);
    }
    formatValue({ filterData = {}, pageSize = null, pageIndex = null }) {
      if (typeof filterData !== 'object') throw 'filterData是个对象！';
      if (pageSize) pageSize = parseInt(pageSize);
      if (pageIndex) pageIndex = parseInt(pageIndex);
      // 当filterData传入，说明点击了查询，则保存给this.data，且页码归1
      Object.keys(filterData).length > 0
        ? ((this.data = filterData), (pageIndex = 1))
        : null;
      // 当pageSize有传入，且与以前保存的不同时，页码归1
      if (pageSize) {
        if (this.pageSize !== pageSize) {
          pageIndex = 1;
          this.pageSize = pageSize;
        }
      }
      return {
        ...this.data,
        pageSize: this.pageSize,
        pageIndex: pageIndex || 1,
      };
    }
    render() {
      return (
        <div>
          <ReactChildren formatValue={this.formatValue} />
        </div>
      );
    }
  }
  return TqDeal;
};
