import { useState, useEffect, ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { Button, Form, Segment } from "semantic-ui-react";
import { observer } from "mobx-react-lite";

import { useStore } from "../../../app/stores";
import { Event as IEvent } from "../../../app/types/Event";
import Loading from "../../../app/layout/Loading";

export default observer(function EventForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { eventStore } = useStore();
  const [event, setEvent] = useState<IEvent>({
    id: "",
    title: "",
    date: "",
    description: "",
    category: "",
    city: "",
    venue: "",
  });

  useEffect(() => {
    if (id) {
      eventStore.loadEvent(id).then((event) => {
        if (event) setEvent(event);
      });
    }
  }, [eventStore, id]);

  const handleInputChange = (
    evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = evt.currentTarget;
    setEvent({ ...event, [name]: value });
  };

  const handleSubmit = () => {
    if (!event.id) {
      event.id = uuid();
      eventStore.createEvent(event).then(() => navigate(`/events/${event.id}`));
    } else {
      eventStore.updateEvent(event).then(() => navigate(`/events/${event.id}`));
    }
  };

  if (eventStore.loading) return <Loading />;

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
        <Button floated="right" type="button" content="Cancel" />
      </Form>
    </Segment>
  );
});
