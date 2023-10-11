import { useState } from "react";
import { Button, Header, Segment } from "semantic-ui-react";
import { toast } from "react-toastify";
import axios from "axios";

import PageWithNav from "../../app/layout/PageWithNav";
import ValidationErrors from "./ValidationErrors";

export default function Errors() {
  const [errors, setErrors] = useState<string[]>([]);

  const baseUrl = "http://localhost:5000/api/";

  function handleNotFound() {
    axios.get(baseUrl + "buggy/not-found").catch(() => {});
  }

  function handleBadRequest() {
    axios
      .get(baseUrl + "buggy/bad-request")
      .catch(() => toast.error("Bad request"));
  }

  function handleServerError() {
    axios
      .get(baseUrl + "buggy/server-error")
      .catch(() => toast.error("Server error"));
  }

  function handleUnauthorized() {
    axios
      .get(baseUrl + "buggy/unauthorized")
      .catch(() => toast.error("Unauthorized"));
  }

  function handleBadGuid() {
    axios.get(baseUrl + "events/notaguid").catch(() => {});
  }

  function handleValidationErrors() {
    axios.post(baseUrl + "events", {}).catch((err) => {
      setErrors(
        Object.values(
          err.response.data.errors as { [field: string]: string[] },
        ).flat(),
      );
      toast.error("There were validation errors");
    });
  }

  return (
    <PageWithNav>
      <Header as="h1" content="Errors" />
      <Segment>
        <Button.Group widths="7">
          <Button onClick={handleNotFound} content="Not Found" basic primary />
          <Button
            onClick={handleBadRequest}
            content="Bad Request"
            basic
            primary
          />
          <Button
            onClick={handleValidationErrors}
            content="Validation Errors"
            basic
            primary
          />
          <Button
            onClick={handleServerError}
            content="Server Error"
            basic
            primary
          />
          <Button
            onClick={handleUnauthorized}
            content="Unauthorized"
            basic
            primary
          />
          <Button onClick={handleBadGuid} content="Bad GUID" basic primary />
        </Button.Group>
      </Segment>
      {errors.length ? <ValidationErrors errors={errors} /> : ""}
    </PageWithNav>
  );
}
