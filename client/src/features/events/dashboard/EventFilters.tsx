import Calendar from "react-calendar";
import { Menu, Header } from "semantic-ui-react";

export default function EventFilters() {
  return (
    <>
      <Menu
        vertical
        size="large"
        style={{ width: "100%", marginTop: "1.9rem" }}
      >
        <Header icon="filter" attached color="teal" content="Filters" />
        <Menu.Item content="All Events" />
        <Menu.Item content="I'm Going" />
        <Menu.Item content="I'm Hosting" />
      </Menu>
      <Calendar />
    </>
  );
}
