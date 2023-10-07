import { useState, useEffect } from "react";
import { Container } from "semantic-ui-react";
import { v4 as uuid } from "uuid";
import "semantic-ui-css/semantic.min.css";

import { api } from "../api";
import { Event as IEvent } from "../types/Event";
import Navigation from "./Navigation";
import EventDashboard from "../../features/events/dashboard/EventDashboard";
import Loading from "./Loading";

function App() {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.Events.list()
      .then((res) => {
        setEvents(
          res.data.map((event) => ({
            ...event,
            date: event.date.split("T")[0],
          })),
        );
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleSelectEvent = (id: string) => {
    setSelectedEvent(events.find((event) => event.id === id) || null);
    handleCloseForm();
  };

  const handleCancelSelectEvent = () => {
    setSelectedEvent(null);
  };

  const handleOpenForm = (id?: string) => {
    if (id) {
      handleSelectEvent(id);
    } else {
      handleCancelSelectEvent();
    }
    setFormOpen(true);
  };

  const handleCloseForm = () => {
    setFormOpen(false);
  };

  const handleSaveEvent = (event: IEvent) => {
    if (event.id) {
      setEvents([...events.filter(({ id }) => id !== event.id), event]);
    } else {
      event.id = uuid();
      setEvents([...events, event]);
    }
    setFormOpen(false);
    setSelectedEvent(event);
  };

  const handleDeleteEvent = (id: string) => {
    setEvents([...events.filter((event) => event.id !== id)]);
    if (selectedEvent && selectedEvent.id === id) {
      setSelectedEvent(null);
    }
  };

  if (loading) return <Loading />;

  return (
    <>
      <Navigation onOpenForm={handleOpenForm} />
      <Container style={{ marginTop: "7rem" }}>
        <EventDashboard
          events={events}
          selectedEvent={selectedEvent}
          onSelectEvent={handleSelectEvent}
          onCancelSelectEvent={handleCancelSelectEvent}
          formOpen={formOpen}
          onOpenForm={handleOpenForm}
          onCloseForm={handleCloseForm}
          onSaveEvent={handleSaveEvent}
          onDeleteEvent={handleDeleteEvent}
        />
      </Container>
    </>
  );
}

export default App;
