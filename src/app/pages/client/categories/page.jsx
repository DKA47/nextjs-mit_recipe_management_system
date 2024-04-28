"use client"

import React, { useState, useEffect } from 'react';
import { Button, Space, Card, Modal, Form, Input, Skeleton } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import DataTable from '../../../components/data-table';
import { useRouter } from 'next/navigation'; // Import useRouter from Next.js

const IndexPage = () => {
  const router = useRouter(); // Initialize useRouter from Next.js
  const [categoryData, setCategoryData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    fetchData(); // Initial fetch

    // Setup interval for fetching data every 4 seconds
    const interval = setInterval(() => {
      fetchData();
    }, 8000);

    // Clean up the interval to avoid memory leaks
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/categories');
      if (response.ok) {
        const jsonData = await response.json();
        setCategoryData(jsonData);
      } else {
        console.error('Failed to fetch data:', response.status);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleView = async (categoryId) => {
    // Construct the new path with query parameters
    const newPath = `/pages/client/recipe?CategoryId=${categoryId}`;
    router.push(newPath);
  };

  const handleSearch = (value) => {
    setSearchValue(value);
  };

  const filteredData = categoryData.filter((item) =>
    Object.values(item).some(
      (val) => typeof val === 'string' && val.toLowerCase().includes(searchValue.toLowerCase())
    )
  );

  const columns = [
    { title: 'Category ID', dataIndex: 'categoryId', key: 'categoryId' },
    { title: 'Category Name', dataIndex: 'categoryName', key: 'categoryName' },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Space size="middle">
          <Button icon={<EyeOutlined />} onClick={() => handleView(record.categoryId)} />
        </Space>
      ),
    },
  ];

  const data = filteredData.map((item) => ({
    key: item.id,
    categoryId: item.id,
    categoryName: item.catname,
    description: item.catdesc,
  }));

  return (
    <div>
      <Card>
        <Input.Search
          placeholder="Search..."
          style={{ width: 200, marginBottom: 16 }}
          onSearch={handleSearch}
        />
        <Skeleton active={isLoading} loading={isLoading}>
          <DataTable dataSource={data} columns={columns} />
        </Skeleton>
      </Card>
    </div>
  );
};

export default IndexPage;
