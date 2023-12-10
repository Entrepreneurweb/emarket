import logo from './logo.svg';
import './App.css';
import AddProductForm from './composants/Ajouterprod';
import Navtopbar from './composants/Navtopbar';
import RealTimeDataComponent from './Affichercarte';
import ProductsList from './Affichercarte';
import { BrowserRouter as Router, Route, Link,  Switch } from 'react-router-dom';
import Test from './composants/test';
import LoginForm from './composants/Connection';
import Userview from './composants/Userview';
import { Form, Button, Container, Alert } from 'react-bootstrap';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Userview} />
         //
         
          <Route path="/admin" component={LoginForm} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
