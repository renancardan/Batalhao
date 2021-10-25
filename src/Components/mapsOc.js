import React, { Component, useState, useEffect } from 'react';
import {GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from "react-google-maps";
import Modal from 'react-awesome-modal';
import Butao from './Butao_list';


let Localiza = {};
let coloca = "";
function Map() {
    return(
        <GoogleMap
        defaultZoom={14}
        defaultCenter={{lat:-4.22995432532184, lng: -44.77992046604799}}
        >
 {Localiza.map((Oc)=>(
     <>
        <Marker 
        position={Oc.Loc} 
        icon={{
            url:"../../assets/vitima.png",
            scaledSize: new window.google.maps.Size(20, 20),
        }}
        onClick={()=>{
            coloca(Oc, true);
        }}
        />
     
</>
 ))}
 
            </GoogleMap>

       
    );
}

const WrappedMap = withScriptjs(withGoogleMap(Map))

export default ({MapsCaixa, setModal, Loc, }) => {
    const [Visible, setVisible] = useState(false);
    const [Dados, setDados] = useState({});
    const [Time, setTime] = useState(0);
    const [Tem, setTem] = useState(0);
    useEffect(() => {
        console.log(Dados);
        }, [Dados]);

        useEffect(() => {
            tempo()
            }, [Tem]);


      Localiza = Loc;

      coloca=(col, Bol)=>{
        setVisible(Bol);
        setDados(col);
        setTem(col.dateIn/1000);
      }

      const closeModal = ()=>{
        setVisible(false);
      }

      const tempo = ()=>{
        console.log(Tem);
        let currentDate = '';
        let now =new Date(Tem * 1000);
        let hours = now.getHours();
        let minutes = now.getMinutes();
        let Dia = now.getDate();
        let Mes = (now.getMonth()+1);
        let Ano = now.getFullYear(); 
        hours = hours < 10 ? '0'+hours : hours;
        minutes = minutes < 10 ? '0'+minutes : minutes;
        Dia = Dia < 10 ? '0'+Dia : Dia;
        Mes = Mes < 10 ? '0'+Mes : Mes;
        currentDate = Dia+'/'+Mes+'/'+Ano;
        currentDate += ' ';
        currentDate += hours+':'+minutes;
        setTime(currentDate);
    }

      
     
        return (
                
            <div className="maps-contener"  style={{height: MapsCaixa ? '100%' : '0%'}}>
                <Modal visible={Visible} width="400" height="600" padding="10" effect="fadeInUp" onClickAway={() =>closeModal()}>   
              
                    <div className="col-sm-8 invoice-col"> 
                              <address>
                              <strong style={{"color":"red"}}>Obs.: Aperte na parte escura para fechar a informação </strong><br />
                                <strong>Nº Ocorrência:</strong><br />
                                {Dados.oCorr}<br />
                                <strong>Endereço</strong><br />
                                {Dados.rua}, {Dados.numero} - {Dados.bairro}<br />
                                <strong>Cidade:</strong><br />
                                {Dados.cidade}<br />
                                <strong>Estado:</strong><br />
                                {Dados.estado}<br />
                                <strong>Data de Inicio:</strong><br />
                               {Time}
                                <br />
                                <strong>Atendente Do Copom:</strong><br />
                                {Dados.atendenteCopom}<br />
                                <strong>Componentes da VTR:</strong><br />
                                {Dados.componentesVtr}<br />
                                <strong>Ocorrencia</strong><br />
                                {Dados.condi &&
                                <>
                                   {Dados.condi.map((item, key)=>(
                                    <>
                                    <string>{item.nome}</string> <br />
                                    </>
                   
                                  ))}
                                </>
                                }
                                <strong>Resultado Final:</strong><br />
                                {Dados.resultado}<br />
                              </address>
                            </div>
                          
                           
                </Modal>    
                   
                    <WrappedMap
                     googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBVYpwN6IT9kjonTs76bq1G9aSxYRhYU7U`}
                     loadingElement={<div style={{ height: `100%` }} />}
                     containerElement={<div style={{ height: `100%` }} />} 
                     mapElement={<div style={{ height: `100%` }} />} 
                     />
                    
                    
            </div>
        );
    }