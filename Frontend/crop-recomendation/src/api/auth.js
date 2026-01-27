const API_URL = "http://localhost:5000/api/auth";

export const registerUser = async (data) => {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  const result = await response.json();
  console.log(result);
  if (!response.ok) {
    throw result;
  }

  return result;
};

export const loginUser = async (data) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  const result = await response.json();

  if (!response.ok) {
    throw result;
  }

  return result;
};
