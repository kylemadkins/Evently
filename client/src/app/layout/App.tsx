import { useState, useEffect } from "react";
import axios from "axios";
import { Container } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

import { Event as IEvent } from "../types/Event";
import Navigation from "./Navigation";
import EventDashboard from "../../features/events/dashboard/EventDashboard";

function App() {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null);
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    axios
      .get<IEvent[]>("http://localhost:5000/api/events")
      .then((res) => {
        setEvents(res.data);
      })
      .catch(() => {});
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
        />
      </Container>
    </>
  );
}

export default App;
