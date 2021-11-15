import React from 'react';
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
  MyPage,
  ChannelRegistration,
} from './pages';
import Navigator from 'components/Base/SideMenu/Navigator';
import './App.css';

export default function App() {
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
        <Route path="/my-page" component={MyPage} />
        <Route path="/registchannel" component={ChannelRegistration} />
      </Switch>
    </BrowserRouter>
  );
}
