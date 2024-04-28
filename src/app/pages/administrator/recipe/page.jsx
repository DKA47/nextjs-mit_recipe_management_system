"use client"

import React, { useState, useEffect } from 'react';
import { Button, Space, Card, Modal, Form, Input, Skeleton, Select } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined, VideoCameraOutlined } from '@ant-design/icons';
import DataTable from '../../../components/data-table';

const IndexPage = () => {
  const [recipeData, setRecipeData] = useState([]);
  const [categories, setCategoriesData] = useState([]);
  const [restrictionData, setRestrictionData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isDeleting, setDeleting] = useState(false);
  const [form] = Form.useForm();
  const [selectedRestriction, setSelectedRestriction] = useState(null); // State to store selected restriction
  const [searchValue, setSearchValue] = useState(''); // State to store search input value

  useEffect(() => {
    fetchRecipes(selectedRestriction); // Fetch recipes with selected restriction
    fetchCategories();
    fetchRestrictions();
  }, [selectedRestriction]); // Fetch recipes whenever selectedRestriction changes

  const fetchRecipes = async (restrictionId) => {
    setLoading(true);
    try {
      let url = 'http://localhost:3000/api/recipe';
      if (restrictionId) {
        url += `?restrictionId=${restrictionId}`; // Append restrictionId to the URL if it exists
      }
      const response = await fetch(url);
      if (response.ok) {
        const jsonData = await response.json();
        setRecipeData(jsonData);
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
        setCategoriesData(jsonData);
      } else {
        console.error('Failed to fetch data:', response.status);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRestrictions = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/get_restrictions');
      if (response.ok) {
        const jsonData = await response.json();
        setRestrictionData(jsonData);
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
      categoryId: record.categoryId,
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
          restrictionId: values.restrictionId,
          categoryId: values.categoryId,
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        if (responseData.message === 'success') {
          fetchRecipes(selectedRestriction); // Fetch recipes after successful insert
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
          categoryId: values.categoryId,
          restrictionId: values.restrictionId,
        }),
      });

      if (response.ok) {
        fetchRecipes(selectedRestriction);
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
        fetchRecipes(selectedRestriction);
      } else {
        console.error('Failed request:', response.status);
      }
    } catch (error) {
      console.error('Error during request:', error);
    } finally {
      setDeleting(false);
    }
  };

  const handleSearch = (value) => {
    setSearchValue(value);
  };

  const filteredData = recipeData.filter((item) =>
    Object.values(item).some(
      (val) => typeof val === 'string' && val.toLowerCase().includes(searchValue.toLowerCase())
    )
  );

  const columns = [
    { title: 'Recipe ID', dataIndex: 'recipeId', key: 'recipeId' },
    { title: 'Category ID', dataIndex: 'categoryId', key: 'categoryId' },
    { title: 'Recipe Name', dataIndex: 'RecipeName', key: 'RecipeName' },
    { title: 'Restriction', dataIndex: 'restriction_id', key: 'restriction_id' },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => showEditModal(record)} />
          <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record.recipeId)} />
        </Space>
      ),
    },
  ];

  const data = filteredData.map((item) => ({
    key: item.id,
    recipeId: item.id,
    categoryId: item.catid,
    RecipeName: item.recipename,
    restriction_id: item.description
  }));

  return (
    <div>
      <Card>
        <div style={{ marginBottom: 16 }}>
          <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
            Add recipe
          </Button>
          <Input.Search
            placeholder="Search..."
            style={{ width: 200, marginLeft: 10 }}
            onSearch={handleSearch}
          />
        </div>

        <Skeleton active={isLoading || isDeleting} loading={isLoading || isDeleting}>
          <DataTable dataSource={data} columns={columns} />
        </Skeleton>
        <Modal
          title="Add New recipe"
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <Form form={form} layout="vertical" onFinish={handleFinish}>
            <Form.Item label="Recipe Name" name="recipeName" rules={[{ required: true, message: 'Please input the category name!' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Category" name="categoryId" rules={[{ required: true, message: 'Please select the category!' }]}>
              <Select>
                {categories.map(category => (
                  <Select.Option key={category.id} value={category.id}>{category.catname}</Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Restriction" name="restrictionId" rules={[{ required: true, message: 'Please select the restriction!' }]}>
              <Select>
                {restrictionData.map(restriction => (
                  <Select.Option key={restriction.restriction_id} value={restriction.restriction_id}>{restriction.description}</Select.Option>
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
          visible={isEditModalVisible}
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
                {categories.map(category => (
                  <Select.Option key={category.id} value={category.id}>{category.catname}</Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Restriction" name="restrictionId" rules={[{ required: true, message: 'Please select the restriction!' }]}>
              <Select>
                {restrictionData.map(restriction => (
                  <Select.Option key={restriction.restriction_id} value={restriction.restriction_id}>{restriction.description}</Select.Option>
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

