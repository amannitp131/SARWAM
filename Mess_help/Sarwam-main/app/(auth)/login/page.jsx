'use client';
import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import { useContext } from "react";
// import { UserContext } from "@/app/(root)/context/user.context";
import { UserContext } from "../../(root)/context/user.context";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [authenticated,setAuthenticated]=useContext(UserContext);
  const [formData, setFormData] = useState({});
  const [rememberMe, setRememberMe] = useState(false);
  const router=useRouter();
  const loginFields = [
    { label: "Username", type: "text", name: "username" },
    { label: "Password", type: "password", name: "loginPassword" },
  ];
  useEffect(
    ()=>{
      if(authenticated.user.username){
        console.log(authenticated.user.username)
        router.push("/dashboard");
      }else{
        console.log(authenticated.user.username)
      }
    },[]
  )

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
    width: "400px",
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
    padding: "30px",
    textAlign: "center",
  };

  const inputStyle = {
    width: "100%",
    margin: "10px 0",
    padding: "10px",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    borderRadius: "5px",
    backgroundColor: "white",
    color: "#000",
  };

  const buttonStyle = {
    width: "100%",
    padding: "10px",
    margin: "5px 0",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#4D4DFF",
    color: "#fff",
    cursor: "pointer",
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/api/v1/login`, {
        username: formData.username,
        password: formData.loginPassword,
        rememberMe: rememberMe
      }); 
      if (response.status === 200) {
        const { token, user } = response.data;
        Cookies.set('tokenx', token);
        await setAuthenticated({
          user,
          token,
        });
        toast.success("Login successful!");
        setShouldRedirect(true);
        router.push("/dashboard")
        window.location.reload();
        // router.push('/dashboard')
      } else {
        toast.error("Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.response) {
        toast.error("Login failed: " + (error.response.data.message || "Unknown error"));
      } else {
        toast.error("Login failed: " + error.message);
      }
    }
  };

  // useEffect(() => {
  //   if (shouldRedirect) {
  //     router.push("/dashboard");
  //   }
  // }, [shouldRedirect]);
  
  // useEffect(()=>{
  //   if(authenticated?.user){
  //     router.push('/dashboard');
  //   }
  //   return
  // },[authenticated?.user])

  return (
    <>
    <Toaster />
      <Navbar />
      <div style={bodyStyle}>
        <div style={containerStyle}>
          <h1 style={{ color: "white" }}>Login</h1>
          <form onSubmit={handleLogin}>
            {loginFields.map((field, index) => {
              const value = formData[field.name] || "";
              return (
                <input
                  key={index}
                  type={field.type}
                  name={field.name}
                  placeholder={field.label}
                  style={inputStyle}
                  autoComplete="off"
                  required
                  value={value}
                  onChange={handleInputChange}
                />
              );
            })}
            {/* Remember Me and Forgot Password Section */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "10px 0" }}>
              <label style={{ color: "white" }}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={handleRememberMeChange}
                />
                Remember Me
              </label>
              <button
                type="button"
                style={{ background: "none", border: "none", color: "white", cursor: "pointer", padding: "0" }}
                onClick={() => router.push('/login/otp')}
                className="hover:underline underline-offset-2 transitial-all ease-in-out hover:text-rose-700"
              >
                Forgot Password?
              </button>
            </div>

            <button type="submit" style={buttonStyle}>
              Login
            </button>
          </form>
          <button className="w-full bg-rose-500 px-4 py-2 rounded-md hover:bg-rose-600" onClick={()=>router.push('/signUp')}>
            Create a new Account
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
