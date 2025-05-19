import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Artist = () => {
    // useState for å holde på events, loading-status og eventuelle feil
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

     // Asynkron funksjon for å hente data fra Ticketmaster API
    const getData = async () => {
        setLoading(true);  // Sett loading til true mens vi henter data
        setError(null);  // Nullstill eventuell tidligere feil
        try {
             // Gjør fetch-kall til Ticketmaster med API-nøkkel og spesifiserte event-ID-er
            const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events?apikey=RXo9ymsCtNpvTZE9eUJn8fnqTFcUGJ8T&id=Z698xZb_Z16v7eGkFy,Z698xZb_Z17q339,Z698xZb_Z17qfaA,%20Z698xZb_Z16vfkqIjU&locale=*`);
             // Sjekk om responsen er ok, ellers kast en feil
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log("Test data i Home:", data);

            if (data._embedded && data._embedded.events) {
                setEvents(data._embedded.events);
            } else {
                // Hvis ingen events funnet, logg feilen og sett events til tom liste
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

     // Returner midlertidig UI hvis data er under innlasting
    if (loading) {
        return <p>Laster inn eventer...</p>;
    }

     // Returner feilmelding om noe gikk galt
    if (error) {
        return <p>Det oppstod en feil ved henting av eventer: {error.message}</p>;
    }

    // Hoved-UI: viser statisk festivalinfo og liste over events
    return (
            <div>
            <div id="sport-color">
      <h2>Sommerens festivaler!</h2>  
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
        <a href="#" category="EventPage" id="oslo-color"><button><p>Kjøp</p></button></a>
        <a href="#" category="EventPage" id="stockholm-color"><p>Legg til i ønskeliste</p></a>
                <a href="#" category="EventPage" id="oslo-color"><button><p>Kjøp</p></button></a>
        <a href="#" category="EventPage" id="stockholm-color"><p>Legg til i ønskeliste</p></a>
        </div>
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
    );
};


  export default Artist;