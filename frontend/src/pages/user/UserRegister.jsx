import React from 'react';
import '../../styles/styles.css';
import FormField from '../../components/FormField';
import DatePickerField from '../../components/DatePickerField';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserRegister = () => {

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()

    const firstName = e.target.firstName.value
    const lastName = e.target.lastName.value
    const dob = e.target.dob.value
    console.log('dob value from form:', dob)

    if (!dob) {
      console.error('DOB is required')
      // show a quick alert or set a UI error state instead in production
      alert('Please select your date of birth')
      return
    }
    const password = e.target.password.value
    const email = e.target.email.value

    const response = await axios.post('http://localhost:3000/api/auth/user/register', {
      fullName: firstName + " " + lastName,
      DOB : dob,
      password : password,
      email : email
    }, {
      withCredentials: true
    })

    console.log(response.data)

    navigate('/');
  }

  return (
    <div className="page login-page">
      <div className="brand">Spills</div>
      
      <div className="login-container">
        <form className="login-form" noValidate onSubmit={handleSubmit}>
          <h2 className="form-title">Welcome! Let's make your profile</h2>
          <p className="form-sub">Fill these out so we can get to know you.</p>

          <FormField label={null} id="firstName" placeholder="First Name" />
          <FormField label={null} id="lastName" placeholder="Last Name" />
          <div className="two-col-row">
            <DatePickerField label={null} id="dob" placeholder="DOB" />
            <FormField label={null} id="password" type="password" placeholder="Password" />
          </div>
          <FormField label={null} id="email" type="email" placeholder="Email" />

          <button className="btn-primary" type="submit">Finish up</button>

          <p className="muted-link">Already a user? <Link to="/user/login">Sign in</Link></p>
        </form>
      </div>
    </div>
  );
};

export default UserRegister;
