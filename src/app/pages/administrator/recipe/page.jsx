"use client"

import React, { useState, useEffect } from 'react';
import { Button, Space, Card, Modal, Form, Input, Skeleton, Select } from 'antd';
import { EyeOutlined, DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import DataTable from '../../../components/data-table';

const IndexPage = () => {
  const [recipeData, setrecipeData] = useState([]);
  const [categories, setcategoriesData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isDeleting, setDeleting] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchRecipes();
    fetchCategories();
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

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/get_recipe_cat');
      if (response.ok) {
        const jsonData = await response.json();
        setcategoriesData(jsonData);
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
          {/* <Button icon={<EyeOutlined />} /> */}
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
          title="Add New recipe"
          open={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <Form form={form} layout="vertical" onFinish={handleFinish}>
            <Form.Item label="Recipe Name" name="recipeName" rules={[{ required: true, message: 'Please input the category name!' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Category" name="categoryId" rules={[{ required: true, message: 'Please select the category!' }]}>
              <Select>
                {/* Add more static options as needed */}
                 {categories.map(category => (
                   <Select.Option key={category.id} value={category.id}>{category.catname}</Select.Option>
                ))}

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
          title="Edit Recipe"
          open={isEditModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <Form form={form} layout="vertical" onFinish={handleFinish}>
            <Form.Item name="recipeId" hidden>
              <Input />
            </Form.Item>
            <Form.Item label="Recipe Name" name="recipeName" rules={[{ required: true, message: 'Please input the category name!' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Category" name="categoryId" rules={[{ required: true, message: 'Please select the category!' }]}>
              <Select>
                {/* Add more static options as needed */}
                {categories.map(category => (
                  <Select.Option key={category.id} value={category.id}>{category.catname}</Select.Option>
                ))}
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
