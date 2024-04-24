"use client"

// Import necessary dependencies
import React, { useState } from "react";

// Define the UploadForm component
export default function UploadForm() {
  // State to hold the selected file
  const [file, setFile] = useState<File>();

  // Function to handle form submission
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Check if a file is selected
    if (!file) return;

    try {
      // Create a FormData object and append the file
      const formData = new FormData();
      formData.append("file", file);

      // Send the file to the server using fetch
      const res = await fetch("http://localhost:3000/api/upload-video", {
        method: "POST",
        body: formData,
      });

      // Handle the response
      if (!res.ok) throw new Error(await res.text());
    } catch (error) {
      // Handle errors
      console.error("Error:", error);
    }
  };

  // Render the UploadForm component
  return (
    <form onSubmit={onSubmit}>
      <input
        type="file"
        name="file"
        onChange={(e) => setFile(e.target.files?.[0])}
      />
      <input type="submit" value="Upload" />
    </form>
  );
}
