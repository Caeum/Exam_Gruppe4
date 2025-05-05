// src/pages/CategoryPage.jsx
import { useEffect, useState } from "react";

const CategoryPage = ({ category }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await fetch(
        `https://app.ticketmaster.com/discovery/v2/events.json?apikey=DIN_API_KEY&classificationName=${category}`
      );
      const data = await res.json();
      setEvents(data._embedded?.events || []);
    };

    fetchEvents();
  }, [category]);

  return (
    <div>
      <h2>{category.toUpperCase()}</h2>
      {events.length === 0 ? (
        <p>Ingen arrangementer funnet.</p>
      ) : (
        events.map((event) => <div key={event.id}>{event.name}</div>)
      )}
    </div>
  );
};

export default CategoryPage;
