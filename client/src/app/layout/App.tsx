import { useEffect } from "react";
import { Container } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import "semantic-ui-css/semantic.min.css";

import Navigation from "./Navigation";
import EventDashboard from "../../features/events/dashboard/EventDashboard";
import Loading from "./Loading";
import { useStore } from "../stores";

function App() {
  const { eventStore } = useStore();

  useEffect(() => {
    eventStore.loadEvents();
  }, [eventStore]);

  if (eventStore.loading) return <Loading />;

  return (
    <>
      <Navigation />
      <Container style={{ paddingTop: "7rem", paddingBottom: "7rem" }}>
        <EventDashboard />
      </Container>
    </>
  );
}

export default observer(App);
