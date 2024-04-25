"use client"

import React, { useState, useEffect } from 'react';
import { Button, Space, Card, Modal, Form, Input, Skeleton, Select } from 'antd';
import { EyeOutlined, DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import DataTable from '../../../components/data-table';

const IndexPage = () => {
  const [recipeData, setrecipeData] = useState([]);
  // const [Categorydata, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isDeleting, setDeleting] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/recipe');
      if (response.ok) {
        const jsonData = await response.json();
        setrecipeData(jsonData);
        console.log(jsonData);
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
      recipeId: record.recipeId,
      recipeName: record.RecipeName,
      Ingredient: record.Ingredients,
      categoryId: record.categoryId
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsEditModalVisible(false);
  };

  const handleInsert = async (values) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/adminRecipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipeName: values.recipeName,
          Ingredients: values.Ingredients,
          categoryId: values.categoryId
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData); // Log the response from the backend
        if (responseData.message === "success") {
          console.log("insert success");
          fetchRecipes(); // Fetch recipes after successful insert
        } else {
          console.error('Failed request:', responseData.error); // Log any error message from the backend
        }
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
      const response = await fetch(`http://localhost:3000/api/recipe`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipeId: values.recipeId,
          recipeName: values.recipeName,
          Ingredients: values.Ingredient,
          categoryId: values.categoryId
        }),
      });

      if (response.ok) {
        console.log("update success");
        fetchRecipes();
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
    if (values.recipeId) {
      handleUpdate(values);
    } else {
      handleInsert(values);
    }
  };

  const handleDelete = async (recipeId) => {
    console.log(recipeId);
    setDeleting(true);
    try {
      const response = await fetch('http://localhost:3000/api/recipe', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ recipeId }),
      });

      if (response.ok) {
        console.log('delete success');
        fetchRecipes();
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
    { title: 'Recipe ID', dataIndex: 'recipeId', key: 'recipeId' },
    { title: 'Category ID', dataIndex: 'categoryId', key: 'categoryId' },
    { title: 'Recipe Name', dataIndex: 'RecipeName', key: 'RecipeName' },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Space size="middle">
          <Button icon={<EyeOutlined />} />
          <Button icon={<EditOutlined />} onClick={() => showEditModal(record)} />
          <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record.recipeId)} />
        </Space>
      ),
    },
  ];

  const data = recipeData.map((item) => ({
    key: item.id,
    recipeId: item.id,
    categoryId: item.catid,
    RecipeName: item.recipename,
  }));

  return (
    <div>
      <Card>
        <Button type="primary" icon={<PlusOutlined />} onClick={showModal} style={{ marginBottom: 16 }}>
          Add New Recipe
        </Button>
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
            <Form.Item label="Category Name" name="recipeName" rules={[{ required: true, message: 'Please input the category name!' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Description" name="Ingredient">
              <Input />
            </Form.Item>
            <Form.Item label="Category" name="categoryId" rules={[{ required: true, message: 'Please select the category!' }]}>
              <Select>
                <Select.Option value="13">BREAKFAST</Select.Option>
                <Select.Option value="14">LUNCH</Select.Option>
                <Select.Option value="15">DESERT</Select.Option>
                {/* Add more static options as needed */}
                {/* {categories.map(category => (
                  <Select.Option key={category.id} value={category.id}>{category.name}</Select.Option>
                ))} */}

              </Select>
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
            <Form.Item name="recipeId">
              <Input />
            </Form.Item>
            <Form.Item label="Recipe Name" name="recipeName" rules={[{ required: true, message: 'Please input the category name!' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Ingredient" name="Ingredient">
              <Input />
            </Form.Item>
            <Form.Item label="Category" name="categoryId" rules={[{ required: true, message: 'Please select the category!' }]}>
              <Select>
                <Select.Option value="13">BREAKFAST</Select.Option>
                <Select.Option value="14">LUNCH</Select.Option>
                <Select.Option value="15">DESERT</Select.Option>
                {/* Add more static options as needed */}
                {/* {categories.map(category => (
                  <Select.Option key={category.id} value={category.id}>{category.name}</Select.Option>
                ))} */}

              </Select>
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
