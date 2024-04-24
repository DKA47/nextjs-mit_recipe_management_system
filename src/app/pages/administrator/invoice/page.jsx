"use client"

// pages/index.js
import React, { useState, useEffect } from 'react';
import { Button, Space, Card, Form, Input, Skeleton } from 'antd';
import { PrinterOutlined, CloseOutlined, DollarOutlined } from '@ant-design/icons';
import DataTable from '../../../components/data-table';
import { useRouter } from 'next/router'; // Import useRouter from Next.js

const IndexPage = () => {
    const [invoiceData, setInvoiceData] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const router = useRouter(); // Initialize useRouter from Next.js

    useEffect(() => {
        fetchInvoices();
    }, []);

    const fetchInvoices = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:3000/api/subscription');
            if (response.ok) {
                const jsonData = await response.json();
                setInvoiceData(jsonData);
            } else {
                console.error('Failed to fetch data:', response.status);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handlePay = (invoiceId, amount, itemName) => {
        // Navigate to payment page with required variables
        router.push({
            pathname: '/pages/payment',
            query: {
                price: amount,
                invoiceId: invoiceId,
                itemName: itemName
            }
        });
    };

    const columns = [
        { title: 'Invoice ID', dataIndex: 'invoiceId', key: 'invoiceId' },
        { title: 'Invoice Number', dataIndex: 'invoiceNumber', key: 'invoiceNumber' },
        { title: 'Item', dataIndex: 'customerName', key: 'customerName' },
        {
            title: 'Description',
            dataIndex: 'invoiceDescription',
            key: 'invoiceDescription',
            render: text => <div dangerouslySetInnerHTML={{ __html: text }} /> // Render as HTML
        },
        {
            title: 'Price',
            dataIndex: 'invoicePrice',
            key: 'invoicePrice',
            render: text => <div dangerouslySetInnerHTML={{ __html: text }} /> // Render as HTML
        },
        { title: 'Status', dataIndex: 'status', key: 'status' },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <Space size="middle">
                    <Button icon={<PrinterOutlined />} onClick={() => handlePrint(record.invoiceId)} />
                    <Button icon={<CloseOutlined />} onClick={() => handleCancel(record.invoiceId)} />
                    <Button icon={<DollarOutlined />} onClick={() => handlePay(record.invoiceId, record.invoicePrice, record.customerName)} />
                </Space>
            ),
        },
    ];

    const data = invoiceData.map((item) => ({
        key: item.id,
        invoiceId: item.id,
        invoiceNumber: item.id,
        customerName: item.subname,
        invoiceDescription: item.description,
        invoicePrice: item.price,
        status: item.PayStatus
    }));

    return (
        <div>
            <Card>
                <Skeleton active={isLoading} loading={isLoading}>
                    <DataTable dataSource={data} columns={columns} />
                </Skeleton>
                {/* Modals and forms for adding and editing invoices */}
            </Card>
        </div>
    );
};

export default IndexPage;
