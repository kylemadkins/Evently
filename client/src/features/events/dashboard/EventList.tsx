import { useState } from "react";
import { Segment, Item, Label, Button } from "semantic-ui-react";

import { useStore } from "../../../app/stores";

export default function EventList() {
  const { eventStore } = useStore();
  const [targetId, setTargetId] = useState("");

  const handleDelete = (id: string) => {
    eventStore.deleteEvent(id);
    setTargetId(id);
  };

  return (
    <Segment>
      <Item.Group divided>
        {eventStore.events.map((event) => (
          <Item key={event.id}>
            <Item.Content>
              <Item.Header as="a">{event.title}</Item.Header>
              <Item.Meta>{event.date}</Item.Meta>
              <Item.Description>
                <div>{event.description}</div>
                <div>
                  {event.city}, {event.venue}
                </div>
              </Item.Description>
              <Item.Extra>
                <Label basic content={event.category} />
                <Button
                  floated="right"
                  content="View"
                  color="blue"
                  onClick={() => eventStore.selectEvent(event.id)}
                />
                <Button
                  loading={eventStore.saving && event.id === targetId}
                  floated="right"
                  content="Delete"
                  color="red"
                  onClick={() => handleDelete(event.id)}
                />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
}
