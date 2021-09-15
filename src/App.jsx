import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import {
  Home,
  ItemRegistration,
  FreebieAndPrint,
  ERP,
  ItemInquiry,
  EventRegistration,
  EventHistory,
  OrderCollection,
  SignUp,
  ActivationAccount,
  FindPassword,
} from './pages';
import Navigator from 'components/Base/SideMenu/Navigator';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Navigator />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/registitem" component={ItemRegistration} />
          <Route path="/freebie" component={FreebieAndPrint} />
          <Route path="/erp" component={ERP} />
          <Route path="/inquiryitem" component={ItemInquiry} />
          <Route path="/registevent" component={EventRegistration} />
          <Route path="/historyevent" component={EventHistory} />
          <Route path="/support" component={OrderCollection} />
          <Route path="/signup" component={SignUp} />
          <Route path="/activation" component={ActivationAccount} />
          <Route path="/find-pw" component={FindPassword} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
