import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Logon from './pages/Logon';              //Importa a rota de logon
import Register from './pages/Register';        //Importa a rota de registro
import Profile from './pages/Profile';
import NewIncident from './pages/NewIncident';


export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Logon} /> {/* Tem de ser chamado Exatamente esta rota, para evitar o erro de sempre rotear para o root*/}
        <Route path="/register" component={Register} />
      
        <Route path="/profile" component={Profile} />	
        <Route path="/incidents/new" component={NewIncident} />	
        

			</Switch>
    </BrowserRouter>
  );
}