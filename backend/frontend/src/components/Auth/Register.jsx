import React, { useContext, useState } from "react";
import { FaRegUser, FaPencilAlt } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { FaPhone } from "react-icons/fa"; // Fix the import for FaPhoneFlip
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const { isAuthorized, setIsAuthorized } = useContext(Context);
  const handleRegister = async (e) => {
    e.preventDefault();
    if (!role) {
      toast.error("Please select a role");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/user/register",
        { name, phone, email, role, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response && response.data) {
        toast.success(response.data.message);
        setName("");
        setEmail("");
        setPassword("");
        setPhone("");
        setRole("");
        setIsAuthorized(true);
      } else {
        toast.error("Failed to register. Please try again later.");
      }
    } catch (error) {
      toast.error("Failed to register. Please try again later.");
    }
  };
  

  if (isAuthorized) {
    return <Navigate to={'/'}/>;
  }

  return (
    <>
      <section className="authPage">
        <div className="container">
          <div className="header">
            {/* <img src="/JobZeelogo.png" alt="logo" /> */}
            <img src="https://freelogocreator.com/user_design/logos/2024/03/14/223023-medium.png" alt="logo" />
            <h3>Create a new account</h3>
          </div>
          <form onSubmit={handleRegister}>
            <div className="inputTag">
              <label>Register As</label>
              <div>
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Select Role</option>
                  <option value="Employer">Employer</option>
                  <option value="Job Seeker">Job Seeker</option>
                </select>
                <FaRegUser />
              </div>
            </div>
            <div className="inputTag">
              <label>Name</label>
              <div>
                <input
                  type="text"
                  placeholder="Zeeshan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <FaPencilAlt />
              </div>
            </div>
            <div className="inputTag">
              <label>Email Address</label>
              <div>
                <input
                  type="email"
                  placeholder="zk@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <MdOutlineMailOutline />
              </div>
            </div>
            <div className="inputTag">
              <label>Phone Number</label>
              <div>
                <input
                  type="number"
                  placeholder="12345678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <FaPhone />
              </div>
            </div>
            <div className="inputTag">
              <label>Password</label>
              <div>
                <input
                  type="password"
                  placeholder="Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <RiLock2Fill />
              </div>
            </div>
            <button type="submit">Register</button>
            <Link to={"/login"}>Login Now</Link>
          </form>
        </div>
        {/* <div className="banner">
          <img src="/register.png" alt="login" />
        </div> */}
      </section>
    </>
  );
};

export default Register;
