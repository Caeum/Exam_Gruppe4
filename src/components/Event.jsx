import { useState, useEffect } from "react";

const Event = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const urls = [
        "https://app.ticketmaster.com/discovery/v2/events?apikey=7cwivEUE2C0rfZQ8HMwlwAzPyXnOZY1K&keyword=Findings&locale=*&startDateTime=2025-08-14T11:07:00Z&endDateTime=2025-08-15T20:07:00Z",
        "https://app.ticketmaster.com/discovery/v2/events?apikey=7cwivEUE2C0rfZQ8HMwlwAzPyXnOZY1K&keyword=Findings&locale=*&startDateTime=2025-08-14T10:26:00Z&endDateTime=2025-08-17T10:26:00Z&onsaleStartDateTime=2025-08-15T10:28:00Z&onsaleEndDateTime=2025-08-16T10:28:00Z",
    ];

    const fetchData = async (url) => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! ${response.status} ${url}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`Feil ${url}`, error);
            setError(error);
            return null;
        }
    };

    useEffect(() => {
        const getAllData = async () => {
            setLoading(true);
            setError(null);
            const allEvents = [];
            for (const url of urls) {
                const data = await fetchData(url);
                if (data && data._embedded && data._embedded.events) {
                    allEvents.push(...data._embedded.events);
                } else if (data) {

                    console.log(`Feil data i Home:  ${url} `, data);
                }
            }
            setEvents(allEvents);
            setLoading(false);
        };

        getAllData();
    }, []);

    if (loading) {
        return <p>Laster inn data...</p>;
    }

    if (error) {
        return <p>Det oppstod en feil ved henting av data: {error.message}</p>;
    }

    return (
        <div>
            {events.length > 0 ? (
                <ul>
                    {events.map((event) => (
                        <li key={event.id || Math.random()}>
                            {event.name || event.title || ' '} - {event.category || ' '}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Fant ingen data.</p>
            )}
        </div>
    );
};

export default Event;