import React from 'react';
import { Table } from 'antd';
import PropTypes from 'prop-types';

import TzForm from './tzForm.js';
import TqDeal from '../tableDataDeal';

class TableHoc extends React.Component {
  static propTypes = {
    filterInfo: PropTypes.array,
    tableInfo: PropTypes.object,
    onChange: PropTypes.func,
    formatValue: PropTypes.func,
  };
  static defaultProps = {
    onChange: () => {},
    filterInfo: [],
  };
  constructor(props) {
    super(props);
    this.state = {};
    this.onChange = this.onChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  onSearch(value) {
    const adata = this.props.formatValue({ filterData: value });
    this.props.onChange(adata);
  }
  onChange(value) {
    const adata = this.props.formatValue({
      pageIndex: value.current,
      pageSize: value.pageSize,
    });
    this.props.onChange(adata);
  }
  render() {
    const { filterInfo, tableInfo } = this.props;
    const newFilterInfo = { ItemList: filterInfo, onSearch: this.onSearch };
    const newTableInfo = { ...tableInfo, onChange: this.onChange };

    return (
      <div>
        {filterInfo.length > 0 ? <TzForm {...newFilterInfo} /> : null}
        <Table {...newTableInfo} />
      </div>
    );
  }
}

export default TqDeal(TableHoc);
