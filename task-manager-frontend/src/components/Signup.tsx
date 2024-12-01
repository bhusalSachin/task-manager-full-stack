import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Define types for the API response
interface ApiResponse {
  success: boolean;
  message: {
    token: string;
  };
}

const Signup: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const navigate = useNavigate(); // useNavigate is used in React Router v6

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Make the POST request to the backend API (change the URL to match your backend)
      const response = await axios.post<ApiResponse>(
        "http://localhost:8000/auth/signup" || "",
        {
          username,
          password,
        }
      );

      if (response.data) {
        navigate("/login");
      } else {
        setError("Error while signing up");
      }
    } catch (error) {
      console.log(error);
      setError("Error while signing up!");
    }
  };

  const backToHome = (e: React.FormEvent) => {
    e.preventDefault();

    navigate("/");
  };

  return (
    <div className="bg-gray-800 h-screen flex flex-col items-center justify-center">
      <form
        className="bg-white p-6 rounded-lg shadow-md"
        onSubmit={handleSubmit}>
        <h2 className="text-lg font-medium mb-4 text-center text-pink-600">
          Signup
        </h2>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Username
          </label>
          <input
            className="border border-gray-400 p-2 rounded-lg w-full"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Password
          </label>
          <input
            className="border border-gray-400 p-2 rounded-lg w-full"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-500">
          Signup
        </button>
      </form>
      <button
        className="text-sm text-white p-2 rounded-lg hover:text-green-500"
        onClick={(e) => backToHome(e)}>
        Back to home
      </button>
    </div>
  );
};

export default Signup;
