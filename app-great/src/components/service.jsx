const API_URL = "http://localhost:3000";

export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_URL}/upload`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to upload file.");
  }
};

export const getFiles = async () => {
  const response = await fetch(`${API_URL}/files`);
  if (!response.ok) {
    throw new Error("Failed to fetch files.");
  }
  return response.json();
};

export const deleteFile = async (filename) => {
  const response = await fetch(`${API_URL}/files/${filename}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete file.");
  }
};

export const searchFiles = async (query) => {
  const response = await fetch(`${API_URL}/files/search?query=${query}`);
  if (!response.ok) {
    throw new Error("Failed to search files.");
  }
  return response.json();
};
