import { Grid } from "semantic-ui-react";

import { Event as IEvent } from "../../../app/types/Event";
import EventList from "./EventList";
import EventDetails from "../details/EventDetails";
import EventForm from "../form/EventForm";

type Props = {
  events: IEvent[];
};

export default function EventDashboard({ events }: Props) {
  return (
    <Grid>
      <Grid.Column width="10">
        <EventList events={events} />
      </Grid.Column>
      <Grid.Column width="6">
        {events.length > 0 ? <EventDetails event={events[0]} /> : ""}
        <EventForm />
      </Grid.Column>
    </Grid>
  );
}
