import React, { FC } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Signup from "./pages/signup";
import ErrorPage from "./pages/error-page";
import { AuthContext } from "./auth";
import { useSubscription } from "@apollo/client";
import { ME } from "./graphql/subscriptions";

type MeContentTypes = {
  id: string;
  username: string;
  email: string;
  about_me: string;
  profile_image: string;
  date_of_birth: string;
  phone_number: string;
};

type CurrentUserContextTypes = MeContentTypes & { currentUserId: string };

export const CurrentUserContext = React.createContext<CurrentUserContextTypes>(
  undefined!
);

const App: FC = () => {
  const { authState } = React.useContext(AuthContext);
  const isAuth = authState.status === "in";
  const firebaseUserId = isAuth ? authState.user.uid : null;
  const { data, loading } = useSubscription(ME, {
    variables: { firebaseUserId: firebaseUserId },
  });

  if (!isAuth && authState.status !== "loading") {
    return (
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Redirect to="/login" />
      </Switch>
    );
  }

  if (loading) {
    return <div> LOADING ... </div>;
  }

  const me: MeContentTypes = data ? data?.user[0] : null;
  const currentUserId = me!.id;

  return (
    <div>
      <CurrentUserContext.Provider value={{ ...me, currentUserId }}>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="*" componenent={ErrorPage} />
        </Switch>
      </CurrentUserContext.Provider>
    </div>
  );
};
export default App;
