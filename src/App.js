import React, {useRef, useState} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import SignUp from './Components/SignUp';
import SignIn from './Components/SignIn/SignIn';
import Home from './Components/Home/Home';
import Cart from './Components/Cart/Cart';
import Bills from './Components/Bills/Bills';
import Error from './Components/Error';
import Modal from 'react-modal';

export const ValuesContext = React.createContext();

Modal.setAppElement('#root');

function App() {

  const refEmail = useRef();
  const refPassword = useRef();
  const [mainContentShow,setMainContentShow] = useState(true);

  return (
    <Router>
    <ValuesContext.Provider value={{refEmail, refPassword, mainContentShow, setMainContentShow}}>
      <Switch>
        <Route path="/signup">
          <SignUp/>
        </Route>
        <Route path="/signin">
          <SignIn/>
        </Route>
        <Route exact path="/">
          <Home/>
        </Route>
        <Route path="/cart">
          <Cart/>
        </Route>
        <Route path="/bills">
          <Bills/>
        </Route>
        <Route path="*">
          <Error/>
        </Route>
      </Switch>
    </ValuesContext.Provider>
    </Router>
  );
}

export default App;
