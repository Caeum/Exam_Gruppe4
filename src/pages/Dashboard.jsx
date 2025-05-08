import React, { useState } from 'react';

const Dashboard = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault(); // hindrer at nettsiden oppdaterer seg
        console.log('Brukernavn:', username); //Skriver verdien til konsollen
        console.log('Passord:', password);
    };

    return (
        <div className="wrapper">
            <form onSubmit={handleSubmit}>
                <h1>Logg inn</h1>
                <div>
                    <label htmlFor="username">Brukernavn:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} //Oppdaterer username med hva brukeren skriver
                    />
                </div>
                <div>
                    <label htmlFor="password">Passord:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Logg inn</button>
            </form>
        </div>
    );
};

export default Dashboard;

