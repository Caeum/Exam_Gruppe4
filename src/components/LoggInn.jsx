import React, { useState } from 'react';
import ArtistCard from './Home';

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
            <ArtistCard />
            <a href="/" id="vanlige-button"><button>Logg ut</button></a>
            <form onSubmit={handleSubmit}>
                <h2 id="dash">Dashboard</h2>
                <div>
                    <label htmlFor="username" id="bruker">Brukernavn</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} //Oppdaterer username med hva brukeren skriver
                    />
                </div>
                <div>
                    <label htmlFor="password" id="pass">Passord</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button id="vanlig-button" type="submit">Logg inn</button>
                </div>
            </form>
        </div>
    );
};

export default Dashboard;

