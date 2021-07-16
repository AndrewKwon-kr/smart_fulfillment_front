import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { Home, ItemRegistration, FreebieAndPrint, ERP, ExcelToJson } from './pages';
import Navigator from 'components/Base/SideMenu/Navigator';
import './App.css';


class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Navigator />
                <Switch>
                    <Route path='/' exact component={Home} />
                    <Route path='/registitem' component={ItemRegistration} />
                    <Route path='/freebie' component={FreebieAndPrint} />
                    <Route path='/erp' component={ERP} />                    
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;
