import React from 'react';
import '../../styles/styles.css';
import FormField from '../../components/FormField';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserLogin = () => {

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value
    const password = e.target.password.value

    const response = await axios.post("http://localhost:3000/api/auth/user/login", {
      email : email,
      password : password
    }, {
      withCredentials : true
    })

    console.log(response.data)

    navigate("/");
  }

  return (
    <div className="page login-page">
      <div className="brand">Spills</div>
      
      <div className="login-container">
        <form className="login-form" noValidate onSubmit={handleSubmit}>
          <h2 className="form-title">Welcome back</h2>
          <p className="form-sub">Sign in with your email and password.</p>

          <FormField label={null} id="email" type="email" placeholder="Email" />
          <FormField label={null} id="password" type="password" placeholder="Password" />

          <button className="btn-primary" type="submit">Sign in</button>

          
          <p className="muted-link">Don't have an account yet? <Link to="/user/register">Register</Link></p>
        </form>
      </div>
    </div>
  );
};

export default UserLogin;
