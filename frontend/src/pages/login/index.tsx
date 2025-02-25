import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Label from '@radix-ui/react-label';
import { LOGIN} from "@/apis/endpoint.api";

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:8081/v1/auth/login', { //axios.post edit
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // อนุญาตให้ browser จัดการ cookie
        body: JSON.stringify({ username, password }), // ไม่ต้องส่ง role
      });

      if (response.ok) {
        // Redirect to /admin on successful login
        navigate('/admin');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Invalid login credentials');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form className="bg-white p-8 rounded shadow-md w-96" onSubmit={handleLogin}>
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <div className="mb-4">
          <Label.Root htmlFor="username" className="block text-sm font-medium text-gray-700">
            Username
          </Label.Root>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div className="mb-4">
          <Label.Root htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </Label.Root>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;