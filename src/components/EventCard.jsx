import React, { useState, useEffect } from "react";
import ArtistCard from "./ArtistCard";

const DiscoveriApi = () => {
    const [firstEvents, setFirstEvents] = useState([]);
    const [secondEvents, setSecondEvents] = useState([]);
    const [thridEvents, setThirdEvents] = useState([]);
    const [viewedEvents, setViewedEvents] = useState([]);
    const [loadingFirst, setLoadingFirst] = useState(false);
    const [errorFirst, setErrorFirst] = useState(null);
    const [loadingSecond, setLoadingSecond] = useState(false);
    const [errorSecond, setErrorSecond] = useState(null);

  const firstUrl = `https://app.ticketmaster.com/discovery/v2/events?apikey=7cwivEUE2C0rfZQ8HMwlwAzPyXnOZY1K&keyword=Findings&locale=*&startDateTime=2025-08-15T10:26:00Z&endDateTime=2025-08-16T10:26:00Z`;
    const lastUrl = `https://app.ticketmaster.com/discovery/v2/events?apikey=RXo9ymsCtNpvTZE9eUJn8fnqTFcUGJ8T&id=Z698xZb_Z16v7eGkFy,Z698xZb_Z17q339,Z698xZb_Z17qfaA,%20Z698xZb_Z16vfkqIjU&locale=*`;
    const moreUrl = `https://app.ticketmaster.com/discovery/v2/events?apikey=7cwivEUE2C0rfZQ8HMwlwAzPyXnOZY1K&keyword=Findings&locale=*&startDateTime=2025-08-14T11:07:00Z&endDateTime=2025-08-15T20:07:00Z`;
    const theUrl = `https://app.ticketmaster.com/discovery/v2/events?apikey=7cwivEUE2C0rfZQ8HMwlwAzPyXnOZY1K&keyword=Findings&locale=*&startDateTime=2025-08-15T10:26:00Z&endDateTime=2025-08-16T10:26:00Z`;
    const aUrl = `https://app.ticketmaster.com/discovery/v2/events?apikey=7cwivEUE2C0rfZQ8HMwlwAzPyXnOZY1K&keyword=Findings&locale=*&startDateTime=2025-08-14T11:07:00Z&endDateTime=2025-08-15T20:07:00Z`;
    const myUrl = `https://app.ticketmaster.com/discovery/v2/events?apikey=7cwivEUE2C0rfZQ8HMwlwAzPyXnOZY1K&keyword=Findings&locale=*&startDateTime=2025-08-15T10:26:00Z&endDateTime=2025-08-16T10:26:00Z`;

    const getData = async (url, setState, setLoadingState, setErrorState) => {
        setLoadingState(true);
        setErrorState(null);
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log("Data:", url, data);
            if (data._embedded && data._embedded.events) {
                setState(data._embedded.events);
                return data._embedded.events;
            } else {
                console.error("Fant ingen eventer.", url, data);
                setState([]);
                return [];
            }
        } catch (error) {
            setErrorState(error);
            console.error("Feil", url, error);
            return [];
        } finally {
            setLoadingState(false);
        }
    };

    useEffect(() => {
        const fetchInitialEvents = async () => {
            const initialData = await getData(firstUrl, setFirstEvents, setLoadingFirst, setErrorFirst);
            setViewedEvents(initialData);
        };
        fetchInitialEvents();
    }, []);

    const fetchLastEvents = async () => {
        const lastEventsData = await getData(lastUrl, setFirstEvents, setLoadingFirst, setErrorFirst);
        setViewedEvents(lastEventsData);
    };

    const fetchMoreEvents = async () => {
        const moreEventsData = await getData(moreUrl, setSecondEvents, setLoadingSecond, setErrorSecond);
        setViewedEvents(moreEventsData);
    };

        const fetchTheEvents = async () => {
        const moreEventsData = await getData(theUrl, setSecondEvents, setLoadingSecond, setErrorSecond);
        setViewedEvents(moreEventsData);
    };

        const fetchLeEvents = async () => {
        const moreEventsData = await getData(aUrl, setThirdEvents, setLoadingSecond, setErrorSecond);
        setViewedEvents(moreEventsData);
    };

        const fetchThisEvents = async () => {
        const moreEventsData = await getData(myUrl, setThirdEvents, setLoadingSecond, setErrorSecond);
        setViewedEvents(moreEventsData);
    };

    if (loadingFirst && viewedEvents.length === 0) {
        return <p>Laster inn eventer...</p>;
    }

    if (errorFirst && viewedEvents.length === 0) {
        return <p>Det oppstod en feil ved henting av eventer: {errorFirst.message}</p>;
    }

    return (
        <div>
            <div>
                <h2>Sommerens festivaler!</h2>
                {viewedEvents.length > 0 ? (
                    <ul>
                        {viewedEvents.map((event) => (
                            <li key={event.id}>
                                {event.name} - {event.classifications && event.classifications.length > 0 ? event.classifications[0].segment.name : 'Finner ikke kategorien'}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Fant ingen eventer.</p>
                )}

                <button id="this" onClick={fetchLastEvents} disabled={loadingFirst}>
                    {loadingFirst ? 'Laster inn eventer..' : 'Oslo'}
                </button>
                <button id="this" onClick={fetchMoreEvents} disabled={loadingSecond}>
                    {loadingSecond ? 'Laster..' : 'Stockholm'}
                </button>
                                <button id="this" onClick={fetchTheEvents} disabled={loadingSecond}>
                    {loadingSecond ? 'Laster..' : 'Berlin'}
                </button>
                                            <button id="this" onClick={fetchLeEvents} disabled={loadingSecond}>
                    {loadingSecond ? 'Laster..' : 'London'}
                </button>
                                                            <button id="this" onClick={fetchThisEvents} disabled={loadingSecond}>
                    {loadingSecond ? 'Laster..' : 'Paris'}
                </button>

                {loadingFirst && viewedEvents.length > 0 && <p>Henter flere eventer..</p>}
                {errorFirst && viewedEvents.length > 0 && <p>Det oppstod en feil ved henting av flere eventer: {errorFirst.message}</p>}

                {loadingSecond && <p>Henter enda flere eventer..</p>}
                {errorSecond && <p>Det oppstod en feil ved henting av enda flere eventer: {errorSecond.message}</p>}
            </div>
            <ArtistCard />
        </div>
    );
};

export default DiscoveriApi;