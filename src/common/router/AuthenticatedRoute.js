import React from "react";
import { Route, Redirect } from "react-router-dom";
import Nav from "../../components/nav";
import { useUser } from "../hooks/useUser";

export default function AuthenticatedRoute({ component: Component, ...rest }) {

  const { isAuthenticated } = useUser();

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthenticated) {
          return (
            <>
              {" "}
              <Nav />
              <Component {...props} />
            </>
          );
        } else {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};
