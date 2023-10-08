import { useState, ChangeEvent } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { observer } from "mobx-react-lite";

import { useStore } from "../../../app/stores";

export default observer(function EventForm() {
  const { eventStore } = useStore();

  const defaultEvent = eventStore.selectedEvent
    ? { ...eventStore.selectedEvent }
    : {
        id: "",
        title: "",
        date: "",
        description: "",
        category: "",
        city: "",
        venue: "",
      };

  const [event, setEvent] = useState(defaultEvent);

  const handleInputChange = (
    evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = evt.currentTarget;
    setEvent({ ...event, [name]: value });
  };

  const handleSubmit = () => {
    event.id ? eventStore.updateEvent(event) : eventStore.createEvent(event);
  };

  return (
    <Segment clearing>
      <Form autoComplete="off" onSubmit={handleSubmit}>
        <Form.Input
          placeholder="Title"
          value={event.title}
          name="title"
          onChange={handleInputChange}
        />
        <Form.TextArea
          placeholder="Description"
          value={event.description}
          name="description"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Category"
          value={event.category}
          name="category"
          onChange={handleInputChange}
        />
        <Form.Input
          type="date"
          placeholder="Date"
          value={event.date}
          name="date"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="City"
          value={event.city}
          name="city"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Venue"
          value={event.venue}
          name="venue"
          onChange={handleInputChange}
        />
        <Button
          loading={eventStore.saving}
          floated="right"
          positive
          type="submit"
          content="Save"
        />
        <Button
          floated="right"
          type="button"
          content="Cancel"
          onClick={eventStore.closeForm}
        />
      </Form>
    </Segment>
  );
});
