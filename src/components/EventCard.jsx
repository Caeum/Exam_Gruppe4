import React, { useState, useEffect } from 'react';
import ArtistCard from './ArtistCard';

function EventCard() {
  const [eventsBy, setEventsBy] = useState({
    oslo: [],
    stockholm: [],
    berlin: [],
    london: [],
    paris: [],
  });
  const [overskriftBy, setOverskriftBy] = useState({
    oslo: '',
    stockholm: '',
    berlin: '',
    london: '',
    paris: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [NewEvents, setNewEvents] = useState([]);
  const [activeBy, setActiveBy] = useState(null);

const leUrl = `https://app.ticketmaster.com/discovery/v2/events?apikey=7cwivEUE2C0rfZQ8HMwlwAzPyXnOZY1K&keyword=Findings&locale=*&startDateTime=2025-08-15T10:26:00Z&endDateTime=2025-08-16T10:26:00Z`;
    const firstUrl = `https://app.ticketmaster.com/discovery/v2/events?apikey=RXo9ymsCtNpvTZE9eUJn8fnqTFcUGJ8T&id=Z698xZb_Z16v7eGkFy,Z698xZb_Z17q339,Z698xZb_Z17qfaA,%20Z698xZb_Z16vfkqIjU&locale=*`;
    const moreUrl = `https://app.ticketmaster.com/discovery/v2/events?apikey=7cwivEUE2C0rfZQ8HMwlwAzPyXnOZY1K&keyword=Findings&locale=*&startDateTime=2025-08-14T11:07:00Z&endDateTime=2025-08-15T20:07:00Z`;
    const theUrl = `https://app.ticketmaster.com/discovery/v2/events?apikey=7cwivEUE2C0rfZQ8HMwlwAzPyXnOZY1K&keyword=Findings&locale=*&startDateTime=2025-08-15T10:26:00Z&endDateTime=2025-08-16T10:26:00Z`;
    const aUrl = `https://app.ticketmaster.com/discovery/v2/events?apikey=7cwivEUE2C0rfZQ8HMwlwAzPyXnOZY1K&keyword=Findings&locale=*&startDateTime=2025-08-14T11:07:00Z&endDateTime=2025-08-15T20:07:00Z`;
  const lastUrl = `https://app.ticketmaster.com/discovery/v2/events?apikey=7cwivEUE2C0rfZQ8HMwlwAzPyXnOZY1K&keyword=Findings&locale=*&startDateTime=2025-08-15T10:26:00Z&endDateTime=2025-08-16T10:26:00Z`;




  const getData = async (url, city) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data._embedded && data._embedded.events) {
        setEventsBy((prevEvents) => ({
          ...prevEvents,
          [city]: data._embedded.events,
        }));
      } else {
        console.error("Fant ingen eventer.", url, data);
        setEventsBy((prevEvents) => ({ ...prevEvents, [city]: [] }));
      }
    } catch (error) {
      setError(error);
      console.error("Feil", city, error);
      setEventsBy((prevEvents) => ({ ...prevEvents, [city]: [] }));
    } finally {
      setLoading(false);
    }
  };

  const getNewData = async (url) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data._embedded && data._embedded.events) {
        setNewEvents(data._embedded.events);
      } else {
        console.error("Kan ikke finne eventene.", url, data);
        setNewEvents([]);
      }
    } catch (error) {
      setError(error);
      console.error("Feil", error);
      setNewEvents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNewData(firstUrl);
  }, []);

  const fetchOslo = () => {
    getData(leUrl, 'oslo');
    setOverskriftBy((prevOverskrift) => ({ ...prevOverskrift, oslo: 'Hva skjer i Oslo' }));
    setActiveBy('oslo');
  }

  const fetchStockholm = () => {
    getData(moreUrl, 'stockholm');
    setOverskriftBy((prevOverskrift) => ({ ...prevOverskrift, stockholm: 'Hva skjer i Stockholm' }));
    setActiveBy('stockholm');
  };

  const fetchBerlin = () => {
    getData(theUrl, 'berlin');
    setOverskriftBy((prevOverskrift) => ({ ...prevOverskrift, berlin: 'Hva skjer i Berlin' }));
    setActiveBy('berlin');
  };

  const fetchLondon = () => {
    getData(aUrl, 'london');
    setOverskriftBy((prevOverskrift) => ({ ...prevOverskrift, london: 'Hva skjer i London' }));
    setActiveBy('london');
  };

  const fetchParis = () => {
    getData(lastUrl, 'paris');
    setOverskriftBy((prevOverskrift) => ({ ...prevOverskrift, paris: 'Hva skjer i Paris' }));
    setActiveBy('paris');
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
        <p>Her kommer det bilder</p>
        {NewEvents.length > 0 ? (
          <ul>
            {NewEvents.map((event) => (
              <li key={event.id}>
                {event.name} -{' '}
                {event.classifications && event.classifications.length > 0
                  ? event.classifications[0].segment.name
                  : 'Finner ikke kategorien'}
              </li>
            ))}
          </ul>
        ) : (
          NewEvents.length !== 0 && <p>Kan ikke finne eventene</p>
        )}
        <ArtistCard />
        <h2>Hva skjer i verdens storbyer</h2>

        <button id="this" onClick={fetchOslo} disabled={loading}>
          {loading ? 'Laster inn..' : 'Oslo'}
        </button>
        {activeBy === 'oslo' && (
          <>
            <img src="src/assets/website_images/findings.png"></img>
            <h3 id="hva-skjer-oslo">{overskriftBy.oslo}</h3>
            {eventsBy.oslo.length > 0 ? (
              <ul>
                {eventsBy.oslo.map((event) => (
                  <li key={event.id}>
                    {event.name} -{' '}
                    {event.classifications && event.classifications.length > 0
                      ? event.classifications[0].segment.name
                      : 'Finner ikke kategorien'}
                  </li>
                ))}
              </ul>
            ) : (
              <p>{eventsBy.oslo.length === 0 && overskriftBy.oslo === 'Hva skjer i Oslo' ? 'Ingen eventer funnet i Oslo.' : null}</p>
            )}
          </>
        )}

        <button id="this" onClick={fetchStockholm} disabled={loading}>
          {loading ? 'Laster inn..' : 'Stockholm'}
        </button>
        {activeBy === 'stockholm' && (
          <>
            <h3 id="hva-skjer-stockholm">{overskriftBy.stockholm}</h3>
            {eventsBy.stockholm.length > 0 ? (
              <ul>
                {eventsBy.stockholm.map((event) => (
                  <li key={event.id}>
                    {event.name} -{' '}
                    {event.classifications && event.classifications.length > 0
                      ? event.classifications[0].segment.name
                      : 'Finner ikke kategorien'}
                  </li>
                ))}
              </ul>
            ) : (
              <p>{eventsBy.stockholm.length === 0 && overskriftBy.stockholm === 'Hva skjer i Stockholm' ? 'Fant ikke eventer.' : null}</p>
            )}
          </>
        )}

        <button id="this" onClick={fetchBerlin} disabled={loading}>
          {loading ? 'Laster inn..' : 'Berlin'}
        </button>
        {activeBy === 'berlin' && (
          <>
            <h3 id="hva-skjer-berlin">{overskriftBy.berlin}</h3>
            {eventsBy.berlin.length > 0 ? (
              <ul>
                {eventsBy.berlin.map((event) => (
                  <li key={event.id}>
                    {event.name} -{' '}
                    {event.classifications && event.classifications.length > 0
                      ? event.classifications[0].segment.name
                      : 'Finner ikke kategorien'}
                  </li>
                ))}
              </ul>
            ) : (
              <p>{eventsBy.berlin.length === 0 && overskriftBy.berlin === 'Hva skjer i Berlin' ? 'Fant ikke noen.' : null}</p>
            )}
          </>
        )}

        <button id="this" onClick={fetchLondon} disabled={loading}>
          {loading ? 'Laster inn..' : 'London'}
        </button>
        {activeBy === 'london' && (
          <>
            <h3 id="hva-skjer-london">{overskriftBy.london}</h3>
            {eventsBy.london.length > 0 ? (
              <ul>
                {eventsBy.london.map((event) => (
                  <li key={event.id}>
                    {event.name} -{' '}
                    {event.classifications && event.classifications.length > 0
                      ? event.classifications[0].segment.name
                      : 'Finner ikke kategorien'}
                  </li>
                ))}
              </ul>
            ) : (
              <p>{eventsBy.london.length === 0 && overskriftBy.london === 'Hva skjer i London' ? 'Fant ikke noen.' : null}</p>
            )}
          </>
        )}

        <button id="this" onClick={fetchParis} disabled={loading}>
          {loading ? 'Laster inn..' : 'Paris'}
        </button>
        {activeBy === 'paris' && (
          <>
            <h3 id="hva-skjer-paris">{overskriftBy.paris}</h3>
            {eventsBy.paris.length > 0 ? (
              <ul>
                {eventsBy.paris.map((event) => (
                  <li key={event.id}>
                    {event.name} -{' '}
                    {event.classifications && event.classifications.length > 0
                      ? event.classifications[0].segment.name
                      : 'Finner ikke kategorien'}
                  </li>
                ))}
              </ul>
            ) : (
              <p>{eventsBy.paris.length === 0 && overskriftBy.paris === 'Hva skjer i Paris' ? 'Fant ikke eventer' : null}</p>
            )}
          </>
        )}

        <p>Her kommer det bilder</p>
      </div>
    </div>
  );
}

export default EventCard;