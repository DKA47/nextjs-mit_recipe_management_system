"use client"

import React, { useState, useEffect } from 'react';
import { Button, Space, Card, Modal, Form, Input, Skeleton } from 'antd';
import { EyeOutlined, DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import DataTable from '../../../components/data-table';

const IndexPage = () => {
  const [Categorydata, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isDeleting, setDeleting] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/categories');
      if (response.ok) {
        const jsonData = await response.json();
        setData(jsonData);
      } else {
        console.error('Failed to fetch data:', response.status);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
    form.resetFields();
  };

  const showEditModal = (record) => {
    setIsEditModalVisible(true);
    form.setFieldsValue({
      categoryId: record.categoryId,
      categoryName: record.categoryName,
      description: record.description,
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsEditModalVisible(false);
  };

  const handleInsert = async (values) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          categoryName: values.categoryName,
          description: values.description,
        }),
      });

      if (response.ok) {
        console.log("insert success");
        fetchData();
      } else {
        console.error('Failed request:', response.status);
      }
    } catch (error) {
      console.error('Error during request:', error);
    } finally {
      setLoading(false);
      setIsModalVisible(false);
    }
  };

  const handleUpdate = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/api/categories`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          categoryId: values.categoryId,
          categoryName: values.categoryName,
          description: values.description,
        }),
      });

      if (response.ok) {
        console.log("update success");
        fetchData();
      } else {
        console.error('Failed request:', response.status);
      }
    } catch (error) {
      console.error('Error during request:', error);
    } finally {
      setLoading(false);
      setIsEditModalVisible(false);
    }
  };

  const handleFinish = async (values) => {
    event.preventDefault();
    if (values.categoryId) {
      handleUpdate(values);
    } else {
      handleInsert(values);
    }
  };

  const handleDelete = async (categoryId) => {
    setDeleting(true);
    try {
      const response = await fetch('http://localhost:3000/api/categories', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ categoryId }),
      });

      if (response.ok) {
        console.log('delete success');
        fetchData();
      } else {
        console.error('Failed request:', response.status);
      }
    } catch (error) {
      console.error('Error during request:', error);
    } finally {
      setDeleting(false);
    }
  };

  const columns = [
    { title: 'Category ID', dataIndex: 'categoryId', key: 'categoryId' },
    { title: 'Category Name', dataIndex: 'categoryName', key: 'categoryName' },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Space size="middle">
          <Button icon={<EyeOutlined />} />
          {/* <Button icon={<EditOutlined />} onClick={() => showEditModal(record)} />
          <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record.categoryId)} /> */}
        </Space>
      ),
    },
  ];

  const data = Categorydata.map((item) => ({
    key: item.id,
    categoryId: item.id,
    categoryName: item.catname,
    description: item.catdesc,
  }));

  return (
    <div>
      <Card>
        {/* <Button type="primary" icon={<PlusOutlined />} onClick={showModal} style={{ marginBottom: 16 }}>
          Add New Category
        </Button> */}
        <Skeleton active={isLoading || isDeleting} loading={isLoading || isDeleting}>
          <DataTable dataSource={data} columns={columns} />
        </Skeleton>
        <Modal
          title="Add New Category"
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <Form form={form} layout="vertical" onFinish={handleFinish}>
            <Form.Item name="categoryId" hidden>
              <Input />
            </Form.Item>
            <Form.Item label="Category Name" name="categoryName" rules={[{ required: true, message: 'Please input the category name!' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Description" name="description">
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Add
              </Button>
            </Form.Item>
          </Form>
        </Modal>
        <Modal
          title="Edit Category"
          visible={isEditModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <Form form={form} layout="vertical" onFinish={handleFinish}>
            <Form.Item name="categoryId" hidden>
              <Input />
            </Form.Item>
            <Form.Item label="Category Name" name="categoryName" rules={[{ required: true, message: 'Please input the category name!' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Description" name="description">
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Update
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    </div>
  );
};

export default IndexPage;
