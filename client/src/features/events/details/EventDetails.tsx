import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Grid } from "semantic-ui-react";

import { useStore } from "../../../app/stores";
import { Event as IEvent } from "../../../app/types/Event";
import Loading from "../../../app/layout/Loading";
import EventDetailsHeader from "./EventDetailsHeader";
import EventDetailsInfo from "./EventDetailsInfo";
import EventDetailsChat from "./EventDetailsChat";
import EventDetailsSidebar from "./EventDetailsSidebar";

export default observer(function EventDetails() {
  const { id } = useParams();

  const { eventStore } = useStore();
  const [event, setEvent] = useState<IEvent | null>(null);

  useEffect(() => {
    if (id) {
      eventStore.loadEvent(id).then((event) => {
        if (event) setEvent(event);
      });
    }
  }, [id, eventStore]);

  if (eventStore.loading) return <Loading />;

  if (!event) return;

  return (
    <Grid>
      <Grid.Column width="10">
        <EventDetailsHeader event={event} />
        <EventDetailsInfo event={event} />
        <EventDetailsChat />
      </Grid.Column>
      <Grid.Column width="6">
        <EventDetailsSidebar />
      </Grid.Column>
    </Grid>
  );
});
