import { useState, ChangeEvent } from "react";
import { Button, Form, Segment } from "semantic-ui-react";

import { Event as IEvent } from "../../../app/types/Event";

type Props = {
  selectedEvent: IEvent | null;
  onCloseForm: () => void;
  onSaveEvent: (event: IEvent) => void;
};

export default function EventForm({
  selectedEvent,
  onCloseForm,
  onSaveEvent,
}: Props) {
  const defaultEvent = selectedEvent
    ? { ...selectedEvent }
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

  return (
    <Segment clearing>
      <Form autoComplete="off" onSubmit={() => onSaveEvent(event)}>
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
          floated="right"
          type="button"
          content="Cancel"
          onClick={onCloseForm}
        />
        <Button floated="right" positive type="submit" content="Save" />
      </Form>
    </Segment>
  );
}
