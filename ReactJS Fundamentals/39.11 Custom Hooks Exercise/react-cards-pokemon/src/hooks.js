import React, {useState} from 'react';
import axios from 'axios';
import {v4 as uuid} from "uuid";

const useFlip = (initiaFliplState = true) => {
  const [isFlipped, setFlipped] = useState(initiaFliplState);
  const flip = () => {
    setFlipped(isUp => !isUp);
  };
  return [isFlipped, flip];
}

const useAxios = (baseUrl) => {
  const [responses, setResponses] = useState([]);

  const addResponseData = async (restOfUrl = "") => {
    try {
      const res = await axios.get(`${baseUrl}${restOfUrl}`);
      setResponses(responses => [...responses, { ...res.data, id: uuid() }]);
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  };
  
  const clearResponses = () => setResponses([]);


  return [responses, addResponseData, clearResponses]
}

export { useFlip, useAxios };