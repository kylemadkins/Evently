import { Outlet } from "react-router-dom";

import PageWithNav from "../../app/layout/PageWithNav";

export default function Events() {
  return (
    <PageWithNav>
      <Outlet />
    </PageWithNav>
  );
}
