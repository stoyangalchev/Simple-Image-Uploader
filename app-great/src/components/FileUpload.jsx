import React, { useState, useEffect } from "react";
import { uploadFile, getFiles, deleteFile, searchFiles } from "./service";
import styles from "./FileUpload.module.css";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const data = await getFiles();
      setFiles(data);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
  };

  const handleFileUpload = async () => {
    try {
      await uploadFile(file);
      fetchFiles();
      alert("File uploaded successfully!");
      setPreviewUrl(""); 
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("File upload failed.");
    }
  };

  const handleFileDelete = async (filename) => {
    try {
      await deleteFile(filename);
      fetchFiles();
      alert("File deleted successfully!");
    } catch (error) {
      console.error("Error deleting file:", error);
      alert("File deletion failed.");
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const data = await searchFiles(searchQuery);
      setFiles(data);
    } catch (error) {
      console.error("Error searching files:", error);
    }
  };

  return (
    <div className={styles.container}>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload</button>

      {previewUrl && (
        <div className={styles.preview}>
          <img src={previewUrl} alt="Preview" />
        </div>
      )}

      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search files"
      />
      <button onClick={handleSearch}>Search</button>

      <ul>
        {files.map((file) => (
          <li key={file.filename}>
            <img
              src={`http://localhost:5000/files/${file.filename}`}
              alt={file.filename}
              className={styles.thumbnail}
            />
            <button onClick={() => handleFileDelete(file.filename)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileUpload;
