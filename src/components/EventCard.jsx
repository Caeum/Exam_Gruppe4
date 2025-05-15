import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import CategoryPage from "../pages/CategoryPage";
import ArtistCard from "./ArtistCard";

const DiscoveriApi = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events?apikey=RXo9ymsCtNpvTZE9eUJn8fnqTFcUGJ8T&id=Z698xZb_Z16v7eGkFy,Z698xZb_Z17q339,Z698xZb_Z17qfaA,%20Z698xZb_Z16vfkqIjU&locale=*`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log("Test data i Home:", data);

            if (data._embedded && data._embedded.events) {
                setEvents(data._embedded.events);
            } else {
                console.error("Klarte ikke finne noen eventer:", data);
                setEvents([]);
            }
        } catch (error) {
            setError(error);
            console.error("Feil under fetch i Home", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    if (loading) {
        return <p>Laster inn eventer...</p>;
    }

    if (error) {
        return <p>Det oppstod en feil ved henting av eventer: {error.message}</p>;
    }

    return (
        <div>
            <div>
                <h2>Sommerens festivaler!</h2>    
                {events.length > 0 ? (
                    <ul>
                        {events.map((event) => (
                            <li key={event.id}>
                                {event.name} - {event.classifications && event.classifications.length > 0 ? event.classifications[0].segment.name : 'Ingen kategori'}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Fant ingen eventer.</p>
                )}
            </div>
                <a href="music"><button id="neon">Les mer om NEON | Lørdagspass - Music</button></a>
                <a href="music"><button id="tons">Les mer om Tons of Rock at the Fortress - Music</button></a>
                <a href="music"><button id="skei">Les mer om Skeikampenfestivalen - Dagspass - FREDAG - Music</button></a>
                <a href="music"><button id="find">Les mer om Findings Festival 2025 - Festivalpass - Music</button></a>
                <ArtistCard />
        </div>
    );
};

export default DiscoveriApi;