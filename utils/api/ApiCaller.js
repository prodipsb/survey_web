import axios from 'axios';
import { useSelector } from "react-redux";

const appUrl = process.env.NEXT_PUBLIC_API;

export const get = async (endpoint, params, token) => {
  const url = `${appUrl}/${endpoint}`;
  // const token = useSelector((state) => state?.loginInfo?.access_token);

  const options = {
    method: 'GET',
    url: `${url}`,
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    params,
  };

  return await axios(options)?.then(res => res?.data);
};

export const post = async (endpoint, body) => {
  const url = `${appUrl}/${endpoint}`;

  const token = useSelector((state) => state?.loginInfo?.access_token);

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    url: url,
    data: body,
  };

  try {
    return await axios(options)?.then(res => res);
  } catch (error) {
    console.error("Error:", error);
   // throw error; 
  }

  
};


export const login = async (endpoint, body) => {
  const url = `${appUrl}/${endpoint}`;

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    url: url,
    data: body,
  };

  try {
    const response = await axios(options);
    return response;
  } catch (error) {
    if (error.response && error.response.data) {
      const errorMessage = error.response.data.message; 
       throw new Error(errorMessage);
    } else {
       throw error;
    }
  }
};

export const postForm = async (endpoint, body) => {
  const url = `${appUrl}/api/v1/${endpoint}`;
  const authData = await getData();

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${authData?.access_token}`,
    },
    url: url,
    data: body,
  };

  return await axios(options)?.then(res => res);
};
