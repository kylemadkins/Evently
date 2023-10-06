import { useState, useEffect } from "react";
import axios from "axios";
import { Container } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

import { Event as IEvent } from "../types/Event";
import Navigation from "./Navigation";
import EventDashboard from "../../features/events/dashboard/EventDashboard";

function App() {
  const [events, setEvents] = useState<IEvent[]>([]);

  useEffect(() => {
    axios
      .get<IEvent[]>("http://localhost:5000/api/events")
      .then((res) => setEvents(res.data))
      .catch(() => {});
  }, []);

  return (
    <>
      <Navigation />
      <Container style={{ marginTop: "7rem" }}>
        <EventDashboard events={events} />
      </Container>
    </>
  );
}

export default App;
