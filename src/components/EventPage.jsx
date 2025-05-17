import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const EventPage = () => {
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
        <nav id="sport-color">
        <h1>Findings Festival</h1>
        <h2>Sjanger</h2>
        <ul>
        <li>Music</li>
        <li>Undefined</li>
        <li>Festival</li>
        <li>Undefined</li>
        </ul>
        <h3>Følg oss på sosiale medier</h3>
        <h3>Festivalplass:</h3>
        <a href="#/oslo" category="EventPage" id="oslo-color"><button><p>Kjøp</p></button></a>
        <a href="#/stockholm" category="EventPage" id="stockholm-color"><p>Legg til i ønskeliste</p></a>
        <a href="#/berlin" category="EventPage" id="berlin-color"><p>Kjøp</p></a>
        <a href="#/london" category="EventPage" id="london-color"><p>Legg til i ønskeliste</p></a>
        <a href="#/paris" category="EventPage" id="paris-color"><p>Kjøp</p></a>
          </nav>  
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
        </div>
    );
};


  export default EventPage;