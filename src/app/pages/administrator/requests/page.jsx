"use client"

import React, { useState, useEffect } from 'react';
import { Button, Space, Card, Modal, Form, Input, Skeleton } from 'antd';
import { EyeOutlined, CheckOutlined, CloseOutlined, PlusOutlined } from '@ant-design/icons';
import DataTable from '../../../components/data-table';

const IndexPage = () => {
    const [Requestdata, setData] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [isDeleting, setDeleting] = useState(false);
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

    const handleAccept = async (record) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:3000/api/approve_request`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    requestId: record.requestId,
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
        }
    };


    const handleReject = async (record) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:3000/api/reject_request`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    requestId: record.requestId,
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
                    <Button icon={<CheckOutlined />} onClick={() => handleAccept(record)} />
                    <Button icon={<CloseOutlined />} onClick={() => handleReject(record)} />
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
                <div style={{ marginBottom: 16 }}>
                    <Input.Search
                        placeholder="Search..."
                        style={{ width: 200 }}
                        onSearch={handleSearch}
                    />
                </div>
                <Skeleton active={isLoading || isDeleting} loading={isLoading || isDeleting}>
                    <DataTable dataSource={data} columns={columns} />
                </Skeleton>
            </Card>
        </div>
    );
};

export default IndexPage;

