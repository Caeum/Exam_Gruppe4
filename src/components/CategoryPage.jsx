import { useState, useEffect } from "react";
import Navbar from './Home';

// Komponent som viser en liste med eventer hentet fra Ticketmaster API
const EventList = ({ apiUrl, categoryName }) => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Henter data fra API
    const getData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log(`Data ${categoryName}:`, data);

            if (data._embedded && data._embedded.events) {
                setEvents(data._embedded.events);
            } else {
                console.error(`Fant ikke ${categoryName}-eventer:`, data);
                setEvents([]);
            }
        } catch (error) {
            setError(error);
            console.error(`Feil ${categoryName}`, error);
        } finally {
            setLoading(false);
        }
    };

    // useEffect kjører når apiUrl endres
    useEffect(() => {
        getData();
    }, [apiUrl]);

    // Tilstandshåndtering
    if (loading) {
        return <p>Laster inn eventer.. {categoryName}</p>;
    }

    if (error) {
        return <p>Feil {categoryName} med eventer {error.message}</p>;
    }

    return (
        <div>
            <h2>{categoryName}</h2>
            {events.length > 0 ? (
                <ul>
                    {events.map((event) => (
                        <li key={event.id}>
                            {event.name} - {event.classifications && event.classifications.length > 0 ? event.classifications[0].segment.name : 'Ingen kategori'}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>{categoryName}</p>
            )}
        </div>
    );
};

// Kategori-side som viser flere EventList-komponenter
const CategoryPage = () => {
    return (
        <div>
            {/* Viser navbaren på toppen */}
            <Navbar />
            {/* Viser event-lister for forskjellige søkeord/kategorier */}
            <EventList
                apiUrl="https://app.ticketmaster.com/discovery/v2/events?apikey=7cwivEUE2C0rfZQ8HMwlwAzPyXnOZY1K&keyword=neon&locale=*"
                categoryName="NEON"
            />
                       <EventList
                apiUrl="https://app.ticketmaster.com/discovery/v2/events?apikey=7cwivEUE2C0rfZQ8HMwlwAzPyXnOZY1K&keyword=skeikampenfestivalen&locale=*"
                categoryName="Skeikampenfestivalen"
            />
            <EventList
                apiUrl="https://app.ticketmaster.com/discovery/v2/events?apikey=7cwivEUE2C0rfZQ8HMwlwAzPyXnOZY1K&keyword=findings&locale=*&startDateTime=2025-08-14T10:26:00Z&endDateTime=2025-08-16T20:07:00Z"
                categoryName="Findings"
            />
                        <EventList
                apiUrl="https://app.ticketmaster.com/discovery/v2/events?apikey=7cwivEUE2C0rfZQ8HMwlwAzPyXnOZY1K&keyword=tons%20of%20rock&locale=*"
                categoryName="Tons of Rock"
            />
        </div>
    );
};

export default CategoryPage;