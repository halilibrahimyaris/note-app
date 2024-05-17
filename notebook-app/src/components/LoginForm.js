import React, { useState } from 'react';
import '../LoginPage.css'
export const LoginForm = (props ) => {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

const handleSubmit = (event) => {
    event.preventDefault();
    const loginData = { email, password }; // Nesne tanımlanırken tırnak işareti eklenir
    props.onLogin(loginData); // Giriş yapma işlemini props aracılığıyla tetikleme
};

return (
    <div className="login-form">
        <h2>Giriş Yap</h2>
        <form onSubmit={handleSubmit}>
            <label>E-posta:</label>
            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)}/>
            <label>Şifre:</label>
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)}/>
            <button type="submit">Giriş Yap</button>
        </form>
    </div>
);
}

export default LoginForm;