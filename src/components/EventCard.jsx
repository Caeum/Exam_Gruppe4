import React, { useState, useEffect } from 'react';
import ArtistCard from './ArtistCard';

function EventCard() {
  const [viewedEvents, setViewedEvents] = useState([]);
  const [leUrlData, setLeUrlData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const firstUrl = `https://app.ticketmaster.com/discovery/v2/events?apikey=7cwivEUE2C0rfZQ8HMwlwAzPyXnOZY1K&keyword=Findings&locale=*&startDateTime=2025-08-15T10:26:00Z&endDateTime=2025-08-16T10:26:00Z`;
    const leUrl = `https://app.ticketmaster.com/discovery/v2/events?apikey=RXo9ymsCtNpvTZE9eUJn8fnqTFcUGJ8T&id=Z698xZb_Z16v7eGkFy,Z698xZb_Z17q339,Z698xZb_Z17qfaA,%20Z698xZb_Z16vfkqIjU&locale=*`;
    const moreUrl = `https://app.ticketmaster.com/discovery/v2/events?apikey=7cwivEUE2C0rfZQ8HMwlwAzPyXnOZY1K&keyword=Findings&locale=*&startDateTime=2025-08-14T11:07:00Z&endDateTime=2025-08-15T20:07:00Z`;
    const theUrl = `https://app.ticketmaster.com/discovery/v2/events?apikey=7cwivEUE2C0rfZQ8HMwlwAzPyXnOZY1K&keyword=Findings&locale=*&startDateTime=2025-08-15T10:26:00Z&endDateTime=2025-08-16T10:26:00Z`;
    const aUrl = `https://app.ticketmaster.com/discovery/v2/events?apikey=7cwivEUE2C0rfZQ8HMwlwAzPyXnOZY1K&keyword=Findings&locale=*&startDateTime=2025-08-14T11:07:00Z&endDateTime=2025-08-15T20:07:00Z`;
    const myUrl = `https://app.ticketmaster.com/discovery/v2/events?apikey=7cwivEUE2C0rfZQ8HMwlwAzPyXnOZY1K&keyword=Findings&locale=*&startDateTime=2025-08-15T10:26:00Z&endDateTime=2025-08-16T10:26:00Z`;
  const lastUrl = `https://app.ticketmaster.com/discovery/v2/events?apikey=7cwivEUE2C0rfZQ8HMwlwAzPyXnOZY1K&keyword=Findings&locale=*&startDateTime=2025-08-15T10:26:00Z&endDateTime=2025-08-16T10:26:00Z`;


  const getData = async (url) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data._embedded && data._embedded.events) {
        setViewedEvents(data._embedded.events);
        if (url === leUrl) {
          setLeUrlData(data._embedded.events);
        }
      } else {
        console.error("Fant ingen eventer.", url, data);
        setViewedEvents([]);
        if (url === leUrl) {
          setLeUrlData([]);
        }
      }
    } catch (error) {
      setError(error);
      console.error("Feil", url, error);
      setViewedEvents([]);
      if (url === leUrl) {
        setLeUrlData(null);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData(leUrl);
  }, []);

  const fetchDesEvents = () => {
    getData(leUrl);
  };

  useEffect(() => {
    getData(firstUrl);
    getData(leUrl);
  }, []);

  const fetchLastEvents = () => {
    getData(lastUrl);
  };

  const fetchMoreEvents = () => {
    getData(moreUrl);
  };

  const fetchTheEvents = () => {
    getData(theUrl);
  };

  const fetchLeEvents = () => {
    getData(aUrl);
  };

  const fetchThisEvents = () => {
    getData(myUrl);
  };

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
        {leUrlData && leUrlData.length > 0 ? (
          <ul>
            {leUrlData.map((event) => (
              <li key={event.id}>
                {event.name} - {event.classifications && event.classifications.length > 0 ? event.classifications[0].segment.name : 'Finner ikke kategorien'}
              </li>
            ))}
          </ul>
        ) : (
          leUrlData !== null && <p>Fant ikke eventene</p>
        )}
        <p>Her kommer det bilder</p>
        <ArtistCard />

        <button id="this" onClick={fetchLastEvents} disabled={loading}>
          {loading ? 'Laster inn..' : 'Oslo'}
        </button>
        <button id="this" onClick={fetchMoreEvents} disabled={loading}>
          {loading ? 'Laster inn..' : 'Stockholm'}
        </button>
        <button id="this" onClick={fetchTheEvents} disabled={loading}>
          {loading ? 'Laster inn..' : 'Berlin'}
        </button>
        <button id="this" onClick={fetchLeEvents} disabled={loading}>
          {loading ? 'Laster inn..' : 'London'}
        </button>
        <button id="this" onClick={fetchThisEvents} disabled={loading}>
          {loading ? 'Laster inn..' : 'Paris'}
        </button>
      </div>

      {loading && <p>Laster inn..</p>}
      {error && <p>Feil {error.message}</p>}
      {viewedEvents.length > 0 && viewedEvents !== leUrlData ? (
        <ul>
          {viewedEvents.map((event) => (
            <li key={event.id}>
              {event.name} - {event.classifications && event.classifications.length > 0 ? event.classifications[0].segment.name : 'Finner ikke kategorien'}
            </li>
          ))}
        </ul>
      ) : (
        viewedEvents.length > 0 && viewedEvents === leUrlData ? null : <p>Kan ikke vise eventer</p>
      )}
    </div>
  );
}

export default EventCard;