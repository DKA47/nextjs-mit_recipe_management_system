import React from 'react';
import Image from 'next/image';

export default function IMG() {
  return (
    <div className="flex flex-row items-center leading-none text-white">
      <Image
        src="/logo.png"
        alt="MIT Logo"
        width={350} // Adjust the width to make the image bigger
        height={350} // Adjust the height to maintain aspect ratio
        className="mr-4 rounded-full"
      />
      {/* <p className="text-4xl">MALAWI INSTITUTE OF TOURISM</p> */}
    </div>
  );
}
