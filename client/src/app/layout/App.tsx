import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Header, List } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

import { Event as IEvent } from "../types/Event";
import Navigation from "./Navigation";

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
        <List>
          {events.map((event) => (
            <List.Item key={event.id}>{event.title}</List.Item>
          ))}
        </List>
      </Container>
    </>
  );
}

export default App;
