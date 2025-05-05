import { useEffect, useState } from "react";

// Komponent som tar imot en kategori som prop og viser arrangementer for denne
const CategoryPage = ({ category }) => {
  // Oppretter en state-variabel for å lagre hentede arrangementer
  const [events, setEvents] = useState([]);

  // useEffect kjører hver gang `category` endrer seg
  useEffect(() => {
    // Async funksjon for å hente arrangementer fra Ticketmaster API
    const fetchEvents = async () => {
      const res = await fetch(
        // Her må du erstatte DIN_API_KEY med din faktiske API-nøkkel
        `https://app.ticketmaster.com/discovery/v2/events.json?apikey=DIN_API_KEY&classificationName=${category}`
      );

      // Konverterer svaret til JSON
      const data = await res.json();

      // Lagrer arrangementene i state (håndterer også tilfeller der ingen eventer finnes)
      setEvents(data._embedded?.events || []);
    };

    // Kaller funksjonen for å hente data
    fetchEvents();
  }, [category]); // Avhengighet: kjør useEffect på nytt når `category` endres

  return (
    <div>
      {/* Overskrift med kategorinavn i store bokstaver */}
      <h2>{category.toUpperCase()}</h2>

      {/* Hvis det ikke finnes arrangementer, vis melding */}
      {events.length === 0 ? (
        <p>Ingen arrangementer funnet.</p>
      ) : (
        // Mapper gjennom alle arrangementer og viser navnet
        events.map((event) => <div key={event.id}>{event.name}</div>)
      )}
    </div>
  );
};

export default CategoryPage;
