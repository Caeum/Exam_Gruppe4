import { useState, useEffect } from "react";
import Navbar from './Home';


const EventInfo = ({ eventenes }) => {
  return (
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
      <h2>Følg oss på sosiale medier</h2>
      <h2>Festivalplass:</h2>
      <img id="categoryerimg" src="/src/assets/website_images/findings.png" alt="findings festivalen"/>
      <img id="categoryerimg" src="/src/assets/website_images/findings.png" alt="findings festivalen"/>

      {eventenes && eventenes.length > 0 ? (
        <>
          <ul>
            {eventenes.map(event => (
              <li key={event.id}>
                {event.name} - {event.classifications && event.classifications.length > 0 ? event.classifications[0].segment.name : 'Ingen kategorier funnet'}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>Fant ingen eventer.</p>
      )}
    </div>
  );
};

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
        `https://app.ticketmaster.com/discovery/v2/events?apikey=7cwivEUE2C0rfZQ8HMwlwAzPyXnOZY1K&keyword=Findings&locale=*&startDateTime=2025-08-14T11:07:00Z&endDateTime=2025-08-15T20:07:00Z`
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

       {/* Knappene for handling */}
<div>
  <ul>
    <li>
      <EventInfo eventenes={events} />
      <button id="kjop-button">Kjøp</button>
      <button id="onskeliste-button">Legg til i ønskeliste</button>
    </li>
  </ul>
</div>
<ul>
  <li>
    <img id="categoryimg" src="/src/assets/website_images/findings.png" alt="" />
    <img id="categoryimg" src="/src/assets/website_images/findings.png" alt="" />
  </li>
  <EventsList events={events} />
  <button id="kjope-button">Kjøp</button>
  <button id="onske-button">Legg til i ønskeliste</button>
</ul>
<div>
</div>
</div>
  );
};

export default Eventer;
