"use client"

import React, { useState, useEffect } from 'react';
import { Button, Space, Card, Skeleton, Input, Select } from 'antd';
import { VideoCameraOutlined, EyeOutlined } from '@ant-design/icons';
import DataTable from '../../../components/data-table';
import { useRouter } from 'next/navigation';
import { useSearchParams } from "next/navigation";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const IndexPage = () => {
  const [recipeData, setRecipeData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  const params = useSearchParams();

  const [urlParams, setUrlParams] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [restrictionData, setRestrictionData] = useState([]);
  const [selectedRestriction, setSelectedRestriction] = useState(null);

  useEffect(() => {
    const getUrlParams = () => {
      const searchParams = new URLSearchParams(window.location.search);
      const params = {};
      for (const [key, value] of searchParams) {
        params[key] = value;
      }
      return params;
    };

    const params = getUrlParams();
    setUrlParams(params);
  }, []);

  useEffect(() => {
    fetchRecipes(urlParams);
    fetchRestrictions();
    const interval = setInterval(() => {
      fetchRecipes(urlParams);
    }, 30000); // Refresh every 10 seconds

    return () => clearInterval(interval);
  }, [urlParams]);

  const fetchRecipes = async (params) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/recipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ CategoryId: params.CategoryId, restrictionId: selectedRestriction }),
      });
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

  const handleView = async (recipeId) => {
    const newPath = `/pages/client/recipe_preview?recipeId=${recipeId}`;
    router.push(newPath);
  };

  const handleSearch = (value) => {
    setSearchValue(value);
  };

  const handleSelectChange = async (value) => {
    setLoading(true);
    try {
      const categoryId = urlParams.CategoryId;
      const response = await fetch('http://localhost:3000/api/get_recipe_by_restriction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          categoryId: categoryId,
          restrictionId: value
        }),
      });
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

  const handleViewVideo = (record) => {
    const newPath = `/pages/client/watch?src=${record.Video}`;
    router.push(newPath);
  };

  const columns = [
    { title: 'Recipe No', dataIndex: 'recipeId', key: 'recipeId' },
    { title: 'Recipe Name', dataIndex: 'RecipeName', key: 'RecipeName' },
    { title: 'Restriction', dataIndex: 'Restriction', key: 'Restriction', hidden: true },
    { title: 'Video', dataIndex: 'Video', key: 'Video', hidden: true },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Space size="middle">
          <Button icon={<EyeOutlined />} onClick={() => handleView(record.recipeId)} />
          <Button icon={<VideoCameraOutlined />} onClick={() => handleViewVideo(record)} />
        </Space>
      ),
    },
  ];

  const filteredData = recipeData.filter((item) =>
    Object.values(item).some(
      (val) => typeof val === 'string' && val.toLowerCase().includes(searchValue.toLowerCase())
    )
  );

  const data = filteredData.map((item) => ({
    key: item.id,
    recipeId: item.id,
    RecipeName: item.recipename,
    Restriction: item.restriction,
    Video: item.uploadedvideo
  }));

  return (
    <div>
      <Card>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
          <Select
            style={{ width: 250, marginRight: 16 }}
            onChange={(value) => handleSelectChange(value, params)}
          >
            {restrictionData.map(restriction => (
              <Select.Option key={restriction.restriction_id} value={restriction.restriction_id}>{restriction.description}</Select.Option>
            ))}
          </Select>
          <Input.Search
            placeholder="Search..."
            style={{ width: 200 }}
            onSearch={handleSearch}
          />
        </div>
        <Skeleton active={isLoading} loading={isLoading}>
          <DataTable dataSource={data} columns={columns} />
        </Skeleton>
      </Card>
    </div>
  );
};

export default IndexPage;
