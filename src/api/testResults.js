import axios from "axios";

const API_URL = "http://localhost:5000/testResults";

export const getTestResults = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

console.log(getTestResults);

// export const createTestResult = async (resultData) => {
//   const getTestResult = await axios.get(API_URL);
//   return getTestResult.resultData;
// };

// export const deleteTestResult = async (id) => {};

// export const updateTestResultVisibility = async (id, visibility) => {};
