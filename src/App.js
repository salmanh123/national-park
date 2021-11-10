import logo from "./logo.svg";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Parks from "./components/Parks";
import ParkInfo from "./components/ParkInfo";
import Webcam from "./components/Webcam";
function App() {
  return (

    // Routing is covered below
    <Router>
      <div className="App">
        {/* Switch to switch between different routes */}
        <Switch>
          {/* Routes to display parkWebcam images, specific park, related parks of an activity,  & home page */}
          
          <Route path="/park/:parkName/:parkCode" exact component={ParkInfo}/>
          <Route path="/parks/:activity/:id" exact component={Parks}/> 
          <Route path='/webcam/:parkName/:parkCode' exact component={Webcam} />
          <Route path="/"  component={Home}/>
          
        </Switch>
        
      </div>
      
      <Footer/>
    </Router>
  );
}

export default App;
