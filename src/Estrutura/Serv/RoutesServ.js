import React, {useState} from 'react';
import { Switch, Route } from 'react-router-dom';
import Inicio from '../../Pages/Serv/inicio';
import Aplicativo from '../../Pages/Serv/Aplicativos';
import Condicionais from "../../Pages/Serv/CondicionaisApp";
import Contas from '../../Pages/Serv/ContasServ';
import Permissoes from '../../Pages/Serv/Permissoes';
import Config from '../../Pages/Serv/ConfigServ';
import Chat from '../../Pages/Serv/ChatServ';
import Ocorrencia from '../../Pages/Serv/Ocorrencia';
import Noticia from '../../Pages/Serv/Noticia';
import Anuncio from '../../Pages/Serv/Anuncios'
import Graficos from '../../Pages/Serv/Graficos'


export default ({Dados, setDados, Loading,  setLoading,  Alert, setAlert, AlertTipo, setAlertTipo, Avisando, setAvisando }) => {

   
    return (
        <Switch> 
            <Route exact path= "/">
                <Inicio
                    Dados={Dados}
                    setDados={setDados}
                    Loading={Loading}
                    setLoading={setLoading}
                    Alert={Alert}
                    setAlert={setAlert}
                    AlertTipo={AlertTipo}
                    setAlertTipo={setAlertTipo}
                    Avisando={Avisando}
                    setAvisando={setAvisando}
                />
            </Route>
            <Route exact path= "/aplicativo">
                <Aplicativo
                    Dados={Dados}
                    setDados={setDados}
                    Loading={Loading}
                    setLoading={setLoading}
                    Alert={Alert}
                    setAlert={setAlert}
                    AlertTipo={AlertTipo}
                    setAlertTipo={setAlertTipo}
                    Avisando={Avisando}
                    setAvisando={setAvisando}
                />
            </Route>
            <Route exact path= "/condicionais">
                <Condicionais
                    Dados={Dados}
                    setDados={setDados}
                    Loading={Loading}
                    setLoading={setLoading}
                    Alert={Alert}
                    setAlert={setAlert}
                    AlertTipo={AlertTipo}
                    setAlertTipo={setAlertTipo}
                    Avisando={Avisando}
                    setAvisando={setAvisando}
                />
            </Route>
            <Route exact path= "/contaserv">
                <Contas
                    Dados={Dados}
                    setDados={setDados}
                    Loading={Loading}
                    setLoading={setLoading}
                    Alert={Alert}
                    setAlert={setAlert}
                    AlertTipo={AlertTipo}
                    setAlertTipo={setAlertTipo}
                    Avisando={Avisando}
                    setAvisando={setAvisando}
                />
            </Route>
            <Route exact path= "/permissoes">
                <Permissoes
                    Dados={Dados}
                    setDados={setDados}
                    Loading={Loading}
                    setLoading={setLoading}
                    Alert={Alert}
                    setAlert={setAlert}
                    AlertTipo={AlertTipo}
                    setAlertTipo={setAlertTipo}
                    Avisando={Avisando}
                    setAvisando={setAvisando}
                />
            </Route>
            <Route exact path= "/config">
                <Config
                    Dados={Dados}
                    setDados={setDados}
                    Loading={Loading}
                    setLoading={setLoading}
                    Alert={Alert}
                    setAlert={setAlert}
                    AlertTipo={AlertTipo}
                    setAlertTipo={setAlertTipo}
                    Avisando={Avisando}
                    setAvisando={setAvisando}
                />
            </Route>
            <Route exact path= "/chat">
                <Chat
                    Dados={Dados}
                    setDados={setDados}
                    Loading={Loading}
                    setLoading={setLoading}
                    Alert={Alert}
                    setAlert={setAlert}
                    AlertTipo={AlertTipo}
                    setAlertTipo={setAlertTipo}
                    Avisando={Avisando}
                    setAvisando={setAvisando}
                />
            </Route>
            <Route exact path= "/ocorrencia">
                <Ocorrencia
                    Dados={Dados}
                    setDados={setDados}
                    Loading={Loading}
                    setLoading={setLoading}
                    Alert={Alert}
                    setAlert={setAlert}
                    AlertTipo={AlertTipo}
                    setAlertTipo={setAlertTipo}
                    Avisando={Avisando}
                    setAvisando={setAvisando}
                />
            </Route>
            <Route exact path= "/noticia">
                <Noticia
                    Dados={Dados}
                    setDados={setDados}
                    Loading={Loading}
                    setLoading={setLoading}
                    Alert={Alert}
                    setAlert={setAlert}
                    AlertTipo={AlertTipo}
                    setAlertTipo={setAlertTipo}
                    Avisando={Avisando}
                    setAvisando={setAvisando}
                />
            </Route>
            <Route exact path= "/anuncio">
                <Anuncio
                    Dados={Dados}
                    setDados={setDados}
                    Loading={Loading}
                    setLoading={setLoading}
                    Alert={Alert}
                    setAlert={setAlert}
                    AlertTipo={AlertTipo}
                    setAlertTipo={setAlertTipo}
                    Avisando={Avisando}
                    setAvisando={setAvisando}
                />
            </Route>
            <Route exact path= "/graficos">
                <Graficos
                    Dados={Dados}
                    setDados={setDados}
                    Loading={Loading}
                    setLoading={setLoading}
                    Alert={Alert}
                    setAlert={setAlert}
                    AlertTipo={AlertTipo}
                    setAlertTipo={setAlertTipo}
                    Avisando={Avisando}
                    setAvisando={setAvisando}
                />
            </Route>
            
        </Switch>
    )
}