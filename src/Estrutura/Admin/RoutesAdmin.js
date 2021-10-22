import React, {useState} from 'react';
import { Switch, Route } from 'react-router-dom';
import DashboardAdmin from '../../Pages/Admin/Dashboard';
import ConfigAdmin from '../../Pages/Admin/Config';
import ContaServ from '../../Pages/Admin/ContServ'
import ContaAdmin from '../../Pages/Admin/ContAdmin'

export default () => {

   
    return (
        <Switch> 
            <Route exact path= "/">
                <DashboardAdmin />
            </Route>
            <Route exact path= "/config">
                <ConfigAdmin />
            </Route>
            <Route exact path= "/serv">
                <ContaServ />
            </Route>
            <Route exact path= "/admin">
                <ContaAdmin />
            </Route>
        </Switch>
    )
}