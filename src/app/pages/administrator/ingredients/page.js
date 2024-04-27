"use client"

import React, { useState, useEffect } from 'react';
import { Button, Space, Card, Modal, Form, Input, Skeleton, Select } from 'antd';
import { EyeOutlined, DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import DataTable from '../../../components/data-table';

const IndexPage = () => {
    const [recipeData, setrecipeData] = useState([]);
    const [recipeselect, setrecipeselectData] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [isDeleting, setDeleting] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        fetchIngredients();
        fetchRecipe();
    }, []);

    const fetchIngredients = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:3000/api/ingredients');
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


    const fetchRecipe = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:3000/api/get_recipe');
            if (response.ok) {
                const jsonData = await response.json();
                setrecipeselectData(jsonData);
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
            ingredientId: record.ingredient_id,
            name: record.name,
            uom: record.uom,
            categoryId: record.categoryId,
            quantity: record.quantity
        });
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setIsEditModalVisible(false);
    };

    const handleInsert = async (values) => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:3000/api/ingredients', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    recipe_id: values.recipe_id,
                    name: values.name,
                    uom: values.uom,
                    quantity: values.quantity,
                }),
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData); // Log the response from the backend
                if (responseData.message === "success") {
                    console.log("insert success");
                    fetchIngredients()
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
            const response = await fetch(`http://localhost:3000/api/ingredients`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ingredient_id: values.ingredientId,
                    recipe_id: values.recipe_id,
                    name: values.name,
                    uom: values.uom,
                    quantity: values.quantity,
                }),
            });

            if (response.ok) {
                console.log("update success");
                fetchIngredients();
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

    const handleDelete = async (ingredient_id) => {
        console.log(ingredient_id);
        setDeleting(true);
        try {
            const response = await fetch('http://localhost:3000/api/ingredients', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ingredient_id }),
            });

            if (response.ok) {
                console.log('delete success');
                fetchIngredients()
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
        { title: 'ingredient id', dataIndex: 'ingredient_id', key: 'ingredient_id' },
        { title: 'recipe id', dataIndex: 'recipe_id', key: 'recipe_id' },
        { title: 'name', dataIndex: 'name', key: 'name' },
        { title: 'uom', dataIndex: 'uom', key: 'uom' },
        { title: 'quantity', dataIndex: 'quantity', key: 'quantity' },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <Space size="middle">
                    <Button icon={<EyeOutlined />} />
                    <Button icon={<EditOutlined />} onClick={() => showEditModal(record)} />
                    <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record.ingredient_id)} />
                </Space>
            ),
        },
    ];

    const data = recipeData.map((item) => ({
        key: item.ingredient_id,
        ingredient_id: item.ingredient_id,
        recipe_id: item.recipe_id,
        name: item.name,
        uom: item.uom,
        quantity: item.quantity
    }));

    return (
        <div>
            <Card>
                <Button type="primary" icon={<PlusOutlined />} onClick={showModal} style={{ marginBottom: 16 }}>
                    Add ingredient for recipe
                </Button>
                <Skeleton active={isLoading || isDeleting} loading={isLoading || isDeleting}>
                    <DataTable dataSource={data} columns={columns} />
                </Skeleton>
                <Modal
                    title="Add New Ingredient"
                    visible={isModalVisible}
                    onCancel={handleCancel}
                    footer={null}
                >
                    <Form form={form} layout="vertical" onFinish={handleFinish}>
                        <Form.Item label="name" name="name">
                            <Input />
                        </Form.Item>
                        <Form.Item label="uom" name="uom">
                            <Input />
                        </Form.Item>
                        <Form.Item label="quantity" name="quantity">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Category" name="recipe_id" rules={[{ required: true, message: 'Please select the category!' }]}>
                            <Select>
                                {recipeselect.map(recipe => (
                                    <Select.Option key={recipe.id} value={recipe.id}>{recipe.recipename}</Select.Option>
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
                    title="Edit Ingredient"
                    visible={isEditModalVisible}
                    onCancel={handleCancel}
                    footer={null}
                >
                    <Form form={form} layout="vertical" onFinish={handleFinish}>
                        <Form.Item name="ingredientId">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Ingredient Name" name="name" rules={[{ required: true, message: 'Please input the category name!' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="uom" name="uom">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Recipe Name" name="recipeId" rules={[{ required: true, message: 'Please select the category!' }]}>
                            <Select>
                                {recipeselect.map(recipe => (
                                    <Select.Option key={recipe.id} value={recipe.id}>{recipe.recipename}</Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item label="quantity" name="quantity">
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
