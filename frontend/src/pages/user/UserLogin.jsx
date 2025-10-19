import React from 'react';
import '../../styles/styles.css';
import FormField from '../../components/FormField';
import { Link } from 'react-router-dom';

const UserLogin = () => {
  return (
    <div className="page login-page">
      <div className="brand">Spills</div>
      
      <div className="login-container">
        <form className="login-form" onSubmit={(e) => e.preventDefault()}>
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
