"use client"
// pages/index.js
import { Button, Space, Card } from 'antd';
import { EyeOutlined, DeleteOutlined, EditOutlined, PlusOutlined, BulbOutlined, SolutionOutlined } from '@ant-design/icons';
import DataTable from '../../../components/data-table';

const IndexPage = () => {

  const dataSource = [
    { key: '1', column1: 'Data 1', column2: 'Data 2', column3: 'Data 3', recipeImage: '../../../../../public/background.jpg' },
    // Add more data objects as needed
  ];

  const columns = [
    { title: 'Recipe ID', dataIndex: 'RecipeID', key: 'RecipeID' },

    {
      title: 'Recipe Image',
      dataIndex: 'recipeImage',
      key: 'recipeImage',
      render: (text, record) => (
        <img src={text} alt="Recipe" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
      ),
    },
    { title: 'Description', dataIndex: 'column1', key: 'column1' },
    { title: 'Column 2', dataIndex: 'column2', key: 'column2' },
    { title: 'Column 3', dataIndex: 'column3', key: 'column3' },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Space size="middle" style={{ display: 'flex', justifyContent: 'center' }}>
          <Button icon={<EyeOutlined />} />
          <Button icon={<EditOutlined />} />
          <Button icon={<DeleteOutlined />} />
        </Space>
      ),
    },
    // Add more columns as needed
  ];

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Button type="primary" icon={<PlusOutlined />} style={{ marginRight: '10px' }}>
            Request
          </Button>
          <Button type="primary" icon={<BulbOutlined />} style={{ marginRight: '10px' }}>
            Requests
          </Button>
          <Button type="primary" icon={<SolutionOutlined />} style={{ marginRight: '10px' }}>
            Manage Diets
          </Button>
        </div>
      </div>

      <Card style={{ borderRadius: '8px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
        <DataTable dataSource={dataSource} columns={columns} />
      </Card>
    </div>
  );
};

export default IndexPage;
