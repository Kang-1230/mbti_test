import axios from "axios";

const API_URL = "http://localhost:5000/testResults";

export const getTestResults = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createTestResult = async (resultData) => {
  console.log(resultData);
  const getTestResult = await axios.post(API_URL, resultData);
  return getTestResult.data;
};

export const deleteTestResult = async (id) => {
  const deleteTest = await axios.delete(API_URL, id);
  return deleteTest.data;
};

export const updateTestResultVisibility = async (id, visibility) => {
  const updateTest = await axios.patch(`API_URL${id}`, visibility);
  return updateTest.data;
};
