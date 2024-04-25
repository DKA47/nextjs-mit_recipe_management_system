"use client"

import React, { useState, useEffect } from 'react';
import { Button, Space, Card, Skeleton } from 'antd';
import { PrinterOutlined, EyeOutlined } from '@ant-design/icons';
import DataTable from '../../../components/data-table';
import { useRouter } from 'next/navigation';
import { useSearchParams } from "next/navigation";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const IndexPage = () => {
  const [recipeData, setrecipeData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  const params = useSearchParams();

  const [urlParams, setUrlParams] = useState(null);

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
    console.log("URL Parameters:", params);
    setUrlParams(params);
  }, []);

  useEffect(() => {
    fetchRecipes(urlParams); // Pass urlParams to fetchRecipes
  }, [urlParams]); // Make urlParams a dependency

  const fetchRecipes = async (params) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/recipe', {
        method: 'POST', // Change method to POST
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ CategoryId: params.CategoryId }), // Send CategoryId as JSON
      });
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

  const handleView = async (recipeId) => {
    // Construct the new path with query parameters
    const newPath = `/pages/client/recipe_preview?recipeId=${recipeId}`;
    router.push(newPath);
  };

  const handlePrint = async (record) => {
    const invoiceNo = record.invoiceId; // Assuming invoiceId is the correct property
    try {
      const response = await fetch('http://localhost:3000/api/invoices');
      if (response.ok) {
        const jsonData = await response.json();
        console.log(jsonData);

        // Generate PDF report for each invoice
        jsonData.forEach(invoice => generatePDFReport(invoice));

      } else {
        console.error('Failed to fetch data:', response.status);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const generatePDFReport = (invoiceData) => {
    const doc = new jsPDF();
    // Rest of the generatePDFReport function remains unchanged
  };

  // Helper function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  const columns = [
    { title: 'Recipe No', dataIndex: 'recipeId', key: 'recipeId' },
    { title: 'Recipe Name', dataIndex: 'RecipeName', key: 'RecipeName' },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Space size="middle">
          {/* <Button icon={<PrinterOutlined />} onClick={() => handlePrint(record.invoiceId)} /> */}
          <Button icon={<EyeOutlined />} onClick={() => handleView(record.recipeId)} />
        </Space>
      ),
    },
  ];

  const data = recipeData.map((item) => ({
    key: item.id,
    recipeId: item.id,
    RecipeName: item.recipename,
  }));

  return (
    <div>
      <Card>
        <Skeleton active={isLoading} loading={isLoading}>
          <DataTable dataSource={data} columns={columns} />
        </Skeleton>
      </Card>
    </div>
  );
};

export default IndexPage;
