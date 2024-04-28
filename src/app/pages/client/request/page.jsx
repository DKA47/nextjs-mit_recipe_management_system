"use client"

import React, { useState, useEffect } from 'react';
import { Button, Space, Card, Modal, Form, Input, Skeleton } from 'antd';
import { EyeOutlined, DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import DataTable from '../../../components/data-table';

const IndexPage = () => {
    const [Requestdata, setData] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [isDeleting, setDeleting] = useState(false);
    const [form] = Form.useForm();
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:3000/api/request');
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
            requestId: record.requestId,
            request: record.requestName,
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
            const response = await fetch('http://localhost:3000/api/request', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    recipe: values.recipe,
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

        console.log(values);
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:3000/api/request`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    requestId: values.requestId,
                    req: values.request,
                    description: values.description
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
        if (values.requestId) {
            handleUpdate(values);
        } else {
            handleInsert(values);
        }
    };

    const handleDelete = async (requestId) => {
        setDeleting(true);
        try {
            const response = await fetch('http://localhost:3000/api/request', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ requestId }),
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

    const handleSearch = (value) => {
        setSearchValue(value);
    };

    const filteredData = Requestdata.filter((item) =>
        Object.values(item).some(
            (val) => typeof val === 'string' && val.toLowerCase().includes(searchValue.toLowerCase())
        )
    );

    const columns = [
        { title: 'No', dataIndex: 'requestId', key: 'requestId' },
        { title: 'Recipe', dataIndex: 'requestName', key: 'requestName' },
        { title: 'Description', dataIndex: 'description', key: 'description' },
        { title: 'Status', dataIndex: 'status', key: 'status' },
        { title: 'Date', dataIndex: 'date', key: 'date' },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <Space size="middle">
                    {record.status === 'pending' && (
                        <>
                            <Button icon={<EditOutlined />} onClick={() => showEditModal(record)} />
                            <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record.requestId)} />
                        </>
                    )}
                </Space>
            ),
        },
    ];

    const data = filteredData.map((item) => ({
        key: item.id,
        requestId: item.id,
        requestName: item.RecipeTypeName,
        description: item.description,
        status: item.state,
        date: item.reqDate,
    }));

    return (
        <div>
            <Card>
                <Button type="primary" icon={<PlusOutlined />} onClick={showModal} style={{ marginBottom: 16 }}>
                    Add New Request
                </Button>
                <Input.Search
                    placeholder="Search..."
                    style={{ width: 200, marginBottom: 16, marginLeft: 40 }}
                    onSearch={handleSearch}
                />
                <Skeleton active={isLoading || isDeleting} loading={isLoading || isDeleting}>
                    <DataTable dataSource={data} columns={columns} />
                </Skeleton>
                <Modal
                    title="Add New Request"
                    visible={isModalVisible}
                    onCancel={handleCancel}
                    footer={null}
                >
                    <Form form={form} layout="vertical" onFinish={handleFinish}>
                        <Form.Item name="requestId" hidden>
                            <Input />
                        </Form.Item>
                        <Form.Item label="Recipe" name="recipe" rules={[{ required: true, message: 'Please input the category name!' }]}>
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
                        <Form.Item name="requestId" hidden>
                            <Input />
                        </Form.Item>
                        <Form.Item label="Recipe" name="request" rules={[{ required: true, message: 'Please input the category name!' }]}>
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
