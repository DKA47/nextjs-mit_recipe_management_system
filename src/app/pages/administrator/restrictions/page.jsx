"use client"

import React, { useState, useEffect } from 'react';
import { Button, Space, Card, Modal, Form, Input, Skeleton } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined, VideoCameraOutlined } from '@ant-design/icons';
import DataTable from '../../../components/data-table';

const IndexPage = () => {
    const [restrictionData, setRestrictionData] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [isDeleting, setDeleting] = useState(false);
    const [form] = Form.useForm();
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        fetchRestrictions(); // Fetch restrictions data
    }, []);

    const fetchRestrictions = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:3000/api/restriction');
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
            restrictionId: record.restrictionId,
            restriction: record.restriction,
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
            const response = await fetch('http://localhost:3000/api/restriction_insert', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    restriction: values.restriction,
                    description: values.description,
                }),
            });

            if (response.ok) {
                const responseData = await response.json();
                if (responseData.message === 'success') {
                    fetchRestrictions(); // Refresh restrictions data
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
            const response = await fetch(`http://localhost:3000/api/restriction`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    restrictionId: values.restrictionId,
                    restriction: values.restriction,
                    description: values.description
                }),
            });

            if (response.ok) {
                fetchRestrictions(); // Refresh restrictions data
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
        if (values.restrictionId) {
            handleUpdate(values);
        } else {
            handleInsert(values);
        }
    };

    const handleDelete = async (restrictionId) => {
        setDeleting(true);
        try {
            const response = await fetch('http://localhost:3000/api/restriction', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ restrictionId }),
            });

            if (response.ok) {
                fetchRestrictions(); // Refresh restrictions data
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

    const filteredData = restrictionData.filter((item) =>
        Object.values(item).some(
            (val) => typeof val === 'string' && val.toLowerCase().includes(searchValue.toLowerCase())
        )
    );

    const columns = [
        { title: 'Restriction ID', dataIndex: 'restrictionId', key: 'restrictionId' },
        { title: 'Restriction', dataIndex: 'restriction', key: 'restriction' },
        { title: 'Description', dataIndex: 'description', key: 'description' },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <Space size="middle">
                    <Button icon={<EditOutlined />} onClick={() => showEditModal(record)} />
                    <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record.restrictionId)} />
                </Space>
            ),
        },
    ];

    const data = filteredData.map((item) => ({
        key: item.id,
        restrictionId: item.restriction_id,
        restriction: item.restriction,
        description: item.description,
    }));

    return (
        <div>
            <Card>
                <Button type="primary" icon={<PlusOutlined />} onClick={showModal} style={{ marginBottom: 16 }}>
                    Add restriction
                </Button>
                <Input.Search
                    placeholder="Search..."
                    style={{ width: 200, marginBottom: 16, float: 'right' }}
                    onSearch={handleSearch}
                />
                <Skeleton active={isLoading || isDeleting} loading={isLoading || isDeleting}>
                    <DataTable dataSource={data} columns={columns} />
                </Skeleton>
                <Modal
                    title="Add New restriction"
                    visible={isModalVisible}
                    onCancel={handleCancel}
                    footer={null}
                >
                    <Form form={form} layout="vertical" onFinish={handleFinish}>
                        <Form.Item label="Restriction" name="restriction" rules={[{ required: true, message: 'Please input the category name!' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Please input the category name!' }]}>
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
                    title="Edit Restriction"
                    visible={isEditModalVisible}
                    onCancel={handleCancel}
                    footer={null}
                >
                    <Form form={form} layout="vertical" onFinish={handleFinish}>
                        <Form.Item name="restrictionId" hidden>
                            <Input />
                        </Form.Item>
                        <Form.Item label="Restriction" name="restriction" rules={[{ required: true, message: 'Please input the category name!' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Please input the category name!' }]}>
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
