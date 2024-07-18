import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import {
  FiUploadCloud,
  FiFile,
  FiX,
  FiLoader,
  FiCheckCircle,
} from "react-icons/fi";

const Upload = () => {
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    setIsLoading(true);
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
    // Simulate file processing
    setTimeout(() => {
      setIsLoading(false);
      setUploadProgress(0);
    }, 2000);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
      "application/vnd.ms-excel": [".xls"],
    },
  });

  const removeFile = (file) => {
    const newFiles = [...files];
    newFiles.splice(newFiles.indexOf(file), 1);
    setFiles(newFiles);
  };

  const uploadFiles = async () => {
    setIsLoading(true);
    setUploadSuccess(false);
    console.log("Uploading files:", files);

    try {
      const formData = new FormData();
      files.forEach((file, index) => {
        formData.append(`excel`, file, file.name);
      });

      const response = await fetch("https://telegram.onrender.com/upload", {
        method: "POST",
        body: formData,
      });

      if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Upload result:", result);

      setIsLoading(false);
      setUploadSuccess(true);
      setFiles([]);
      setTimeout(() => setUploadSuccess(false), 5000);
    } catch (error) {
      console.error("Upload error:", error);
      setIsLoading(false);
      toast.error("Error uploading files. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-sky-950">
      <h1 className="text-3xl font-bold text-center mb-8">Excel File Upload</h1>
      <div
        {...getRootProps()}
        className={`border-dashed border-2 rounded-lg p-12 text-center cursor-pointer transition-colors duration-200 ease-in-out ${
          isDragActive
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 hover:border-blue-400"
        }`}
      >
        <input {...getInputProps()} />
        <FiUploadCloud className="mx-auto text-5xl text-gray-400 mb-4" />
        <p className="text-xl text-gray-600">
          {isDragActive
            ? "Drop the Excel files here"
            : "Drag 'n' drop Excel files here, or click to select"}
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Supported formats: .xlsx, .xls
        </p>
      </div>
      {isLoading && (
        <div className="mt-8 text-center">
          <FiLoader className="animate-spin text-4xl text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600">
            {uploadProgress > 0
              ? `Uploading... ${uploadProgress}%`
              : "Processing files..."}
          </p>
          {uploadProgress > 0 && (
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          )}
        </div>
      )}
      {uploadSuccess && (
        <div className="mt-8 text-center text-green-600">
          <FiCheckCircle className="text-4xl mx-auto mb-2" />
          <p className="text-xl font-semibold">Upload Successful!</p>
          <p>Your files have been uploaded to the database.</p>
        </div>
      )}
      {!isLoading && files.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Selected Files:</h2>
          <ul className="space-y-2">
            {files.map((file) => (
              <li
                key={file.name}
                className="flex items-center justify-between bg-gray-100 p-3 rounded"
              >
                <div className="flex items-center">
                  <FiFile className="text-blue-500 mr-2" />
                  <span>{file.name}</span>
                </div>
                <button
                  onClick={() => removeFile(file)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FiX />
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={uploadFiles}
            className="mt-6 w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200 ease-in-out"
          >
            Upload Files
          </button>
        </div>
      )}
    </div>
  );
};

export default Upload;
