import { useState, useEffect } from "react";
import Navbar from './Home';

const EventsList = ({ events }) => {
  if (!events.length) return <p>Fant ingen eventer.</p>;

  return (
    <ul>
      {events.map(event => (
        <li key={event.id}>
            {/* Viser eventnavn og sjanger (segment) hvis tilgjengelig */}
          {event.name} - {event.classifications && event.classifications.length > 0 ? event.classifications[0].segment.name : 'Ingen kategori'}
        </li>
      ))}
    </ul>
  );
};

// Komponent for statisk informasjon om festivalen
const EventInfo = () => (
  <div id="sport-color">
    <Navbar />
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
    <p>Her kommer det bilder</p>
  </div>
);


// Hovedkomponenten som henter data og viser både info og events
const Eventer = () => {
// State for å holde events, loading-status og eventuell error
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true); // Start loading
  const [error, setError] = useState(null);  // Nullstill eventuell tidligere feil

  const getData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://app.ticketmaster.com/discovery/v2/events?apikey=7cwivEUE2C0rfZQ8HMwlwAzPyXnOZY1K&keyword=Findings&locale=*&startDateTime=2025-08-15T10:26:00Z&endDateTime=2025-08-16T10:26:00Z`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // Sjekk at data inneholder events, sett events i state
      const data = await response.json();
      if (data._embedded && data._embedded.events) {
        setEvents(data._embedded.events);
      } else {
        setEvents([]);
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) return <p>Laster inn eventer...</p>;
  if (error) return <p>Det oppstod en feil ved henting av eventer: {error.message}</p>;

  return (
    <div>
      <EventInfo />
      <EventsList events={events} />

       {/* Knappene for handling */}
      <div>
        <button>Kjøp</button>
        <button>Legg til i ønskeliste</button>
      </div>

      <p>Her kommer det bilder</p>
    </div>
  );
};

export default Eventer;
