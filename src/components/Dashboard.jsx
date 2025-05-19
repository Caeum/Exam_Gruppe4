import React, { useState } from 'react';
import ArtistCard from './Home';


// Dashboard-komponenten håndterer en enkel innloggingsform
const Dashboard = () => {
    
    // Tilstander for brukernavn og passord
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Når brukeren sender inn skjemaet
    const handleSubmit = (e) => {
        e.preventDefault(); // Forhindrer sideoppdatering
        console.log('Brukernavn:', username); 
        console.log('Passord:', password);
        // Her kan du legge til autentisering eller navigasjon
    };

    return (
        <div className="wrapper">
            {/* Viser navigasjon/ArtistCard */}
            <ArtistCard />
             {/* Logg ut-knapp (lenke tilbake til samme side – kan forbedres) */}
            <a href="/logginn" id="vanlige-button"><button>Logg ut</button></a>
            
            {/* Innloggingsskjema */}
            <form onSubmit={handleSubmit}>
                <h2 id="dash">Dashboard</h2>

                {/* Brukernavn-felt */}
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

                    {/* Passord-felt */}
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

