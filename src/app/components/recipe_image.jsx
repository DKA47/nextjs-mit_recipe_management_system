import React from 'react';
import Image from 'next/image';


export default function Recipe() {
    return (
        <div className="text-white">
            <Image
                src="/background.jpg"
                alt="MIT Logo"
                width={1000} // Adjust the width to make the image bigger
                height={800} // Adjust the height to maintain aspect ratio
                className="mr-4 rounded-full"
            />
            {/* <p className="text-4xl">MALAWI INSTITUTE OF TOURISM</p> */}
        </div>
    );
}
