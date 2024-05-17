import React, { useState } from 'react';
import '../Registiration.css'

export const RegistrationForm = (props) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const handleSubmit = (event) => {
        event.preventDefault();
        const userData = { firstname,lastname,email,password,username   };
        props.onRegistration(userData);
    };

    return (
        <form className={'registration-form'} onSubmit={handleSubmit}>
            <h2>Kayıt Ol</h2>
            <label>Ad:</label>
            <input type="text" value={firstname} onChange={(e) => setName(e.target.value)}/>
            <label>Soyad:</label>
            <input type="text" value={lastname} onChange={(e) => setLastname(e.target.value)}/>
            <label>Kullanıcı Adı:</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
            <label>E-posta:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <label>Şifre:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <button type="submit">Kayıt Ol</button>
        </form>
    );
}

export default RegistrationForm;