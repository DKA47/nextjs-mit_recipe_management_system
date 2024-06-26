"use client"

import React, { useState, useEffect } from 'react';
import { Button, Space, Card, Input, Skeleton, Table } from 'antd';
import { PrinterOutlined, CloseOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const IndexPage = () => {
    const [invoiceData, setInvoiceData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const router = useRouter();
    const params = useSearchParams();

    useEffect(() => {
        fetchInvoices();
    }, []);

    const fetchInvoices = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:3000/api/get_payments');
            if (response.ok) {
                const jsonData = await response.json();
                setInvoiceData(jsonData);
                setFilteredData(jsonData); // Set filtered data initially
            } else {
                console.error('Failed to fetch data:', response.status);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = value => {
        const filtered = invoiceData.filter(item =>
            Object.values(item).some(val =>
                typeof val === 'string' && val.toLowerCase().includes(value.toLowerCase())
            )
        );
        setFilteredData(filtered);
    };

    const handlePay = (invoiceId, amount, itemName) => {
        const newPath = `/pages/client/payment?price=${amount}&itemName=${itemName}&invoiceId=${invoiceId}`;
        router.push(newPath);
    };

    const handleCancel = async (invoiceId) => {
        const PaymentStatus = "Cancelled";

        setLoading(true);
        try {
            const response = await fetch(`http://localhost:3000/api/admin_subscriptions`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    InvoiceId: invoiceId,
                    PaymentStatus: PaymentStatus
                }),
            });

            if (response.ok) {
                fetchInvoices();
            } else {
                console.error('Failed request:', response.status);
            }
        } catch (error) {
            console.error('Error during request:', error);
        } finally {
            setLoading(false);
        }
    };

    const handlePrint = async (record) => {
        const invoiceNo = record.invoiceId;
        try {
            const response = await fetch('http://localhost:3000/api/get_payments');
            if (response.ok) {
                const jsonData = await response.json();
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

        // Title
        doc.setFontSize(14);
        doc.setTextColor(33, 33, 33); // Dark gray color
        doc.text('Invoice', 105, 20, { align: 'center' });

        // Invoice Details
        doc.setFontSize(10);
        doc.setTextColor(33, 33, 33); // Dark gray color
        doc.text(`Invoice ID: ${invoiceData.id}`, 10, 30);
        doc.text(`Invoice Number: ${invoiceData.id}`, 10, 40);
        doc.text(`Date: ${formatDate(invoiceData.sub_date)}`, 10, 50);
        doc.text(`Customer Name: ${invoiceData.customerName}`, 10, 60);

        // Table Header
        const tableColumnWidths = [50, 80, 80, 80]; // Adjust column widths as needed
        const tableHeaders = ['Item', 'Description', 'Price', 'Total'];
        let tableRows = [
            [`${invoiceData.subname}`, `${invoiceData.description}`, `${invoiceData.price}`, `${invoiceData.price}`], // Sample row, replace with actual data
            // Add more rows as needed
        ];

        // Preprocess table rows to include line breaks in descriptions
        tableRows = tableRows.map(row => {
            const newRow = [...row]; // Create a copy of the original row
            newRow[1] = newRow[1].split('<br>').map(line => line.trim()); // Split description by <br> tags and trim whitespace
            return newRow;
        });

        // Table
        doc.autoTable({
            startY: 80,
            head: [tableHeaders],
            body: tableRows,
            theme: 'striped', // Apply striped theme
            columnStyles: {
                1: { cellWidth: 'auto' }, // Auto width for description column
            },
            didParseCell: function (data) {
                if (data.row.index > 0 && data.column.index === 1) {
                    const cell = data.cell;
                    const text = cell.raw;
                    const textLines = Array.isArray(text) ? text : [text]; // Ensure text is an array of lines
                    const lineHeight = cell.styles.fontSize / doc.internal.scaleFactor;
                    const maxLineCount = 5; // Maximum number of lines per cell
                    if (textLines.length > maxLineCount) {
                        const overflowText = textLines.slice(maxLineCount).join('\n'); // Join overflow lines with newline
                        cell.text = textLines.slice(0, maxLineCount);
                        doc.autoTableText(overflowText, cell.textPos.x, cell.textPos.y + lineHeight, {
                            halign: cell.styles.halign,
                            valign: cell.styles.valign,
                        });
                    }
                }
            },
        });

        // Total
        const totalPrice = tableRows.reduce((acc, row) => acc + parseFloat(row[3].replace('$', '')), 0);
        doc.text(`Total: K${totalPrice.toFixed(2)}`, 160, doc.lastAutoTable.finalY + 10);

        // Save PDF
        doc.save('invoice.pdf');
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    };

    const columns = [
        { title: 'Transaction ID', dataIndex: 'PaymentId', key: 'PaymentId' },
        // { title: 'Invoice Number', dataIndex: 'invoiceNumber', key: 'invoiceNumber' },
        // { title: 'Item', dataIndex: 'customerName', key: 'customerName' },
        {
            title: 'Price',
            dataIndex: 'invoicePrice',
            key: 'invoicePrice',
        },
        { title: 'Paymode', dataIndex: 'payment_method', key: 'payment_method' },
        { title: 'Status', dataIndex: 'status', key: 'status' },

        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <Space size="middle">
                    <Button icon={<PrinterOutlined />} onClick={() => handlePrint(record)} />
                    {/* <Button icon={<CloseOutlined />} onClick={() => handleCancel(record.invoiceId)} /> */}
                </Space>
            ),
        },
    ];

    const data = filteredData.map((item) => ({
        key: item.id,
        PaymentId: item.id,
        // invoiceNumber: item.id,
        customerName: item.subname,
        // invoiceDescription: item.description,
        invoicePrice: item.price,
        payment_method: item.payment_method,
        invoicePrice:item.amount,
        status: item.status
    }));

    return (
        <div>

            <Skeleton active={isLoading} loading={isLoading}>
                <Input.Search
                    placeholder="Search..."
                    style={{ width: 200, marginBottom: 16 }} // Adjust the width as needed
                    onSearch={handleSearch}
                />
                <Table
                    dataSource={data}
                    columns={columns}
                    pagination={{ pageSize: 10 }}
                    scroll={{ x: 'max-content' }}
                    bordered
                />
            </Skeleton>
        </div>
    );
};

export default IndexPage;
