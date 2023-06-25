import React, { ChangeEvent, useState } from "react";
import { Button, Typography } from "@mui/material";

interface CSVUploaderProps {
  onUpload: (file: File) => void;
}

const CSVUploader: React.FC<CSVUploaderProps> = ({ onUpload }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = () => {
    if (selectedFile) {
      onUpload(selectedFile);
    }
  };

  return (
    <div>
      <Typography fontSize={15} fontWeight={500} gutterBottom>
        Upload Projects with CSV
      </Typography>
      <input
        accept=".csv"
        type="file"
        onChange={handleFileChange}
        style={{ display: "none" }}
        id="csv-file-input"
      />
      <label htmlFor="csv-file-input">
        <Button
          variant="outlined"
          component="span"
          sx={{
            color: "#48C4D3",
            borderColor: "#48C4D3",
          }}
        >
          Choose File
        </Button>
      </label>
      {selectedFile && (
        <Typography variant="subtitle1" gutterBottom>
          {selectedFile.name}
        </Typography>
      )}
      <Button
        variant="contained"
        onClick={handleUpload}
        sx={{
          backgroundColor: "#48C4D3",
          ml: 1,
          "&:hover": {
            backgroundColor: "#48C4D3",
            opacity: 0.9,
          },
        }}
      >
        Upload
      </Button>
    </div>
  );
};

export default CSVUploader;
