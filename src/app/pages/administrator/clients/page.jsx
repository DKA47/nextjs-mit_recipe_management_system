"use client"

import React, { useState, useEffect } from 'react';
import { Button, Space, Card, Modal, Form, Input, Skeleton } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import DataTable from '../../../components/data-table';

const IndexPage = () => {
    const [clientsData, setClientsData] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [isDeleting, setDeleting] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:3000/api/clients');
            if (response.ok) {
                const jsonData = await response.json();
                setClientsData(jsonData);
            } else {
                console.error('Failed to fetch data:', response.status);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (clientId) => {
        setDeleting(true);
        try {
            const response = await fetch('http://localhost:3000/api/clients', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ clientId }),
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

    const filteredData = clientsData.filter((item) =>
        Object.values(item).some(
            (val) => typeof val === 'string' && val.toLowerCase().includes(searchValue.toLowerCase())
        )
    );

    const columns = [
        { title: 'Client ID', dataIndex: 'clientId', key: 'clientId' },
        { title: 'Full Name', dataIndex: 'fullName', key: 'fullName' },
        { title: 'Email Address', dataIndex: 'email', key: 'email' },
        { title: 'Gender', dataIndex: 'gender', key: 'gender' },
        { title: 'City', dataIndex: 'city', key: 'city' },
        { title: 'Postal Code', dataIndex: 'postalCode', key: 'postalCode' },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <Space size="middle">
                    <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record.clientId)} />
                </Space>
            ),
        },
    ];

    const data = filteredData.map((item) => ({
        key: item.id,
        clientId: item.id,
        fullName: `${item.first_name} ${item.last_name}`,
        email: item.email,
        city: item.city,
        gender: item.gender,
        postalCode: item.postalcode,
    }));

    return (
        <div>
            <Card>
                <Input.Search
                    placeholder="Search..."
                    style={{ width: 200, marginBottom: 16 }}
                    onSearch={handleSearch}
                />
                <Skeleton active={isLoading || isDeleting} loading={isLoading || isDeleting}>
                    <DataTable dataSource={data} columns={columns} />
                </Skeleton>
            </Card>
        </div>
    );
};

export default IndexPage;
