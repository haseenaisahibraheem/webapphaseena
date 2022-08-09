import Navbar from "./commone/nevbar";
import Movies from "./components/movies";
import Rentals from "./components/rentals";
import Customers from "./components/customers";
import NotFound from "./components/notFound";
import MoviesForm from "./components/moviesForm";
import Login from "./components/login";
import { Route, Redirect, Switch } from "react-router-dom";
import "./styles.css";
import Registration from "./components/registration";

export default function App() {
  return (
    <div>
      <Navbar />
      <div className="container">
        <Switch>
          <Route path="/register" component={Registration} />
          <Route path="/login" component={Login} />
          <Route path="/movies/:id" component={MoviesForm} />
          <Route path="/movies" component={Movies} />
          <Route path="/customers" component={Customers} />
          <Route path="/rentals" component={Rentals} />
          <Route path="/notFound" component={NotFound} />
          <Redirect exact from="/" to="/movies" />
          <Redirect to="/notFound" />
        </Switch>
      </div>
    </div>
  );
}
