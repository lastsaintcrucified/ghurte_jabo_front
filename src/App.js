import { Switch, Route, Redirect } from "react-router-dom";
import NewPlace from "./places/pages/newPlace/newPlace.page.jsx";
import UserPlace from "./places/pages/userPlace/userPlace.page.jsx";
import User from "./users/pages/users.page.jsx";
import MainNavigation from "./shared/navigation/mainNavigation/mainNavigation.component.jsx";

import './App.css';

function App() {
  return (
    <div className="app">
      <MainNavigation/>
      <Switch>
        <Route path="/" exact>
          <User/>
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlace/>
        </Route>
        <Route path="/places/new" exact>
          <NewPlace/>
        </Route>
        <Redirect to="/"/>
      </Switch>
    </div>
  );
}

export default App;
