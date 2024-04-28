"use client"

import React, { useState, useEffect } from 'react';
import { Button, Space, Card, Modal, Form, Input, Skeleton } from 'antd';
import { EyeOutlined, DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import DataTable from '../../../components/data-table';

const IndexPage = () => {
    const [Ratingsdata, setRatingsdata] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [isDeleting, setDeleting] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:3000/api/ratings');
            if (response.ok) {
                const jsonData = await response.json();
                setRatingsdata(jsonData);
            } else {
                console.error('Failed to fetch data:', response.status);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (RatingNo) => {
        setDeleting(true);
        try {
            const response = await fetch('http://localhost:3000/api/ratings', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ RatingNo }),
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

    const filteredData = Ratingsdata.filter((item) =>
        Object.values(item).some(
            (val) => typeof val === 'string' && val.toLowerCase().includes(searchValue.toLowerCase())
        )
    );

    const columns = [
        { title: 'Rating no', dataIndex: 'RatingNo', key: 'RatingNo' },
        { title: 'Recipe name', dataIndex: 'RecipeName', key: 'RecipeName' },
        { title: 'Rating', dataIndex: 'rate', key: 'rate' },
        { title: 'Review', dataIndex: 'review', key: 'review' },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <Space size="middle">
                    <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record.RatingNo)} />
                </Space>
            ),
        },
    ];

    const data = filteredData.map((item) => ({
        key: item.id,
        RatingNo: item.id,
        RecipeName: item.recipename,
        rate: item.rate,
        review: item.review,
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
