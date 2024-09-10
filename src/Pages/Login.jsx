import axios from "axios";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [passShow, setPassShow] = useState(false);

  let navigate = useNavigate();
  console.log("emilys");
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://dummyjson.com/auth/login", {
        username,
        password,
      });
      const { token } = response.data; // Assuming your API returns a token

      console.log("Login successful. Token:", token);
      navigate("/product");
    } catch (error) {
      setError("Invalid username or password."); // Or handle other types of errors
    }
  };

  const handlePassIcon = () => {
    setPassShow(!passShow);
  };

  return (
    <div className="container h-screen flex items-center justify-center">
      <div className="p-8 rounded-md bg-white text-secondary w-full md:w-1/2 lg:w-4/12 xl:w-3/12">
        <h1 className="text-4xl font-semibold text-center mb-8 tracking-wider">
          Login
        </h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="username" className="mb-1 inline-block font-medium">
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="px-4 py-2 w-full border border-primary rounded-md block focus-visible:outline-none focus-within:shadow-md shadow-primary"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="mb-1 inline-block font-medium">
              Password
            </label>
            <div className="relative">
              <input
                type={!passShow ? "password" : "text"}
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="px-4 py-2 w-full border border-primary rounded-md block focus-visible:outline-none focus-within:shadow-md shadow-primary"
              />
              <button
                type="button"
                className="absolute bottom-0 right-0 p-3"
                onClick={handlePassIcon}>
                {!passShow ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
            {error && <p className="text-danger">{error}</p>}
          </div>
          <button type="submit" className="btn primary w-full">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
