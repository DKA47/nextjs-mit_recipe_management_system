"use client"

import { Table, Button } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Import useRouter from Next.js
import { useSearchParams } from 'next/navigation'; // Import useSearchParams from Next.js

// List of video thumbnails
const videos = [
    { id: 1, title: 'Video 1', src: '/chocolate_cake.mp4' },
    { id: 2, title: 'Video 2', src: '/vanilla_cake.mp4' },
    { id: 3, title: 'Video 3', src: '/lemon_cake.mp4' },
];

const PreviewPage = () => {
    const router = useRouter(); // Initialize useRouter from Next.js
    const params = useSearchParams(); // Get query parameters

    const handleViewVideo = (src) => {
        // Construct the new path with query parameters
        const newPath = `/pages/client/watch?src=${src}`;
        router.push(newPath);
    };

    const columns = [
        {
            title: 'Thumbnail',
            key: 'thumbnail',
            render: (text, record) => (
                <video width="100" height="auto" controls>
                    <source src={record.src} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            ),
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Button type="primary" className="striped-button" onClick={() => handleViewVideo(record.src)}>
                    Watch
                </Button>
            ),
        },
    ];

    return (
        <div>
            <h1>Videos Preview</h1>
            <Table columns={columns} dataSource={videos} />
        </div>
    );
}

export default PreviewPage;
