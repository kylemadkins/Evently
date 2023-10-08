import { ReactNode } from "react";
import { Container } from "semantic-ui-react";

import Navigation from "./Navigation";

type Props = {
  children: ReactNode;
};

export default function PageWithNav({ children }: Props) {
  return (
    <>
      <Navigation />
      <Container style={{ paddingTop: "7rem", paddingBottom: "7rem" }}>
        {children}
      </Container>
    </>
  );
}
