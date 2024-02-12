import React from 'react';
import RegisterForm from '../components/RegisterForm.jsx';

const RegisterPage = ({ history }) => {
  return (
    <div>
      <RegisterForm history={history} />
    </div>
  );
};

export default RegisterPage;
