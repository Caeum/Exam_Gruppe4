import { useState, useEffect } from "react";

const CategoryPage = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events?apikey=7cwivEUE2C0rfZQ8HMwlwAzPyXnOZY1K&keyword=Findings&locale=*&startDateTime=2025-08-15T10:26:00Z&endDateTime=2025-08-16T10:26:00Z`);
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
        </div>
    );
};

export default CategoryPage;