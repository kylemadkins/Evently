import { Grid } from "semantic-ui-react";

import { Event as IEvent } from "../../../app/types/Event";
import EventList from "./EventList";

type Props = {
  events: IEvent[];
};

export default function EventDashboard({ events }: Props) {
  return (
    <Grid>
      <Grid.Column width="10">
        <EventList events={events} />
      </Grid.Column>
    </Grid>
  );
}
