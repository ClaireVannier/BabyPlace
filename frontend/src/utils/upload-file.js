import axios from "axios";


const uploadFile = async (typeOfFile, file, endpoint, insertId) => {
  const formData = new FormData();
  formData.append(typeOfFile, file);

  await axios.post(
    `${import.meta.env.VITE_BACKEND_URL}/${endpoint}/${insertId}`,
    formData
  );
};

export default uploadFile;