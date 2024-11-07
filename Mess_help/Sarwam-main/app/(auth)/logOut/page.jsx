'use client';
import React, { useContext } from 'react';;
import { UserContext } from '../../(root)/context/user.context';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import ProtectedRoute from '../../components/protectedRoute';
import Navbar from '../../components/header';
const Logout = () => {
  const [authenticated, setAuthenticated] = useContext(UserContext);
  const router = useRouter();

  const handleLogout = () => {
    setAuthenticated({ user: {}, token: null });
    Cookies.remove('tokenx');
    toast.success('Logged out successfully!');
    router.push('/');
  };

  return (
    <ProtectedRoute>
        <Navbar />
      <div style={bodyStyle}>
        <div style={containerStyle} className='backdrop-blur-lg '>
          <h1 style={titleStyle}>Are you sure you want to log out?</h1>
          <button onClick={handleLogout} style={buttonStyle}>
            Log Out
          </button>
        </div>
      </div>
    </ProtectedRoute>
  );
};

const bodyStyle = {
  height: "90.5vh",
  margin: 0,
  padding: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundImage:
    "url('https://t3.ftcdn.net/jpg/06/37/79/62/240_F_637796226_liOHveRjDicrSL7U5Z4ErzMaFf2c1ybe.jpg')",
  backgroundSize: "cover",
  backgroundPosition: "center",
};

const containerStyle = {
  background: "rgba(255, 255, 255, 0.8)",
  borderRadius: "15px",
  padding: "40px",
  textAlign: "center",
  boxShadow: "0 8px 40px rgba(0, 0, 0, 0.2)",
};

const titleStyle = {
  color: "#333",
  marginBottom: "20px",
  fontSize: "24px",
  fontWeight: "600",
};

const buttonStyle = {
  padding: "12px 24px",
  border: "none",
  borderRadius: "5px",
  backgroundColor: "#FF4D4D",
  color: "#fff",
  cursor: "pointer",
  transition: "background-color 0.3s, transform 0.2s",
  fontSize: "16px",
  fontWeight: "bold",
};

const buttonHoverStyle = {
  backgroundColor: "#ff1a1a",
  transform: "scale(1.05)",
};

export default Logout;
