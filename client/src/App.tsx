import { useState, useEffect } from "react";
import axios from "axios";
import { Header, List } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

import { Event as IEvent } from "./types/Event";

function App() {
  const [events, setEvents] = useState<IEvent[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/events")
      .then((res) => setEvents(res.data))
      .catch(() => {});
  }, []);

  return (
    <div>
      <Header as="h1" icon="users" content="Evently" />
      <List>
        {events.map((event) => (
          <List.Item key={event.id}>{event.title}</List.Item>
        ))}
      </List>
    </div>
  );
}

export default App;
