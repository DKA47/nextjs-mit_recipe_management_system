// components/DataTable.js

import { Table } from 'antd';

const DataTable = ({ dataSource, columns }) => {
    return (
        <Table dataSource={dataSource} columns={columns} />
    );
};

export default DataTable;
