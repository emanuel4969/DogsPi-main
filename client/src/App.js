import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage.jsx";
import Home from "./components/Home/Home";
import DogsDetail from "./components/DogDetails/DogDetails";
import CreateDogs from "./components/CreateDogs/CreateDogs";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3001/";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/home" component={Home} />
          <Route path="/detail/:id" component={DogsDetail} />
          <Route path="/createdogs" component={CreateDogs} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
