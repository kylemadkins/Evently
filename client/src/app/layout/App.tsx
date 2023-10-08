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
  const [saving, setSaving] = useState(false);

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
      .finally(() => setLoading(false));
  }, []);

  const handleSelectEvent = (id: string) => {
    setSelectedEvent(events.find((event) => event.id === id) || null);
    setFormOpen(false);
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
    const resetEventForm = () => {
      setFormOpen(false);
      setSelectedEvent(event);
    };

    setSaving(true);
    if (event.id) {
      api.Events.update(event)
        .then(() => {
          setEvents([...events.filter(({ id }) => id !== event.id), event]);
          resetEventForm();
        })
        .catch(() => {})
        .finally(() => setSaving(false));
    } else {
      event.id = uuid();
      api.Events.create(event)
        .then(() => {
          setEvents([...events, event]);
          resetEventForm();
        })
        .catch(() => {})
        .finally(() => setSaving(false));
    }
  };

  const handleDeleteEvent = (id: string) => {
    setSaving(true);
    api.Events.delete(id)
      .then(() => {
        setEvents([...events.filter((event) => event.id !== id)]);
        if (selectedEvent && selectedEvent.id === id) {
          setSelectedEvent(null);
        }
      })
      .catch(() => {})
      .finally(() => setSaving(false));
  };

  if (loading) return <Loading />;

  return (
    <>
      <Navigation onOpenForm={handleOpenForm} />
      <Container style={{ paddingTop: "7rem", paddingBottom: "7rem" }}>
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
          saving={saving}
        />
      </Container>
    </>
  );
}

export default App;
