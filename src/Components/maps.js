import React, { Component, useState, useEffect } from 'react';
import {GoogleMap, withScriptjs, withGoogleMap, Marker } from "react-google-maps";
import Modal from 'react-awesome-modal';
import Butao from './Butao_list';
let Localiza = {};
let LocalizaPM = {};
let coloca = "";

function Map() {
    return(
        <GoogleMap
        defaultZoom={14}
        defaultCenter={Localiza}
        >

    <Marker 
    position={Localiza} 
    icon={{
        url:"../../assets/vitima.png",
        scaledSize: new window.google.maps.Size(30, 30),
    }}
    />
    {LocalizaPM !== {} &&
     <Marker 
     position={LocalizaPM.loc} 
     icon={{
         url:"../../assets/carroPo.png",
         scaledSize: new window.google.maps.Size(30, 30),
     }}
     onClick={()=>{
         coloca(LocalizaPM, true);
     }}
     />

    }
     
            </GoogleMap>

       
    );
}

const WrappedMap = withScriptjs(withGoogleMap(Map))

export default ({MapsCaixa, Loc, LocPM}) => {
    const [Visible, setVisible] = useState(false);
    const [Dados, setDados] = useState({});
    const [Time, setTime] = useState(0);
    const [Tem, setTem] = useState(0);
    console.log(Loc);
      Localiza = Loc;
      LocalizaPM = LocPM;
      useEffect(() => {
        tempo()
        }, [Tem]);
        coloca=(col, Bol)=>{
            setVisible(Bol);
            setDados(col);
            setTem(col.temp/1000);
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
                
            <div className="maps-contener"  style={{height: MapsCaixa ? '45%' : '0%'}}>
                {/* <div className="maps--header">
                    </div> */}
                    <Modal visible={Visible} width="400" height="400" padding="10" effect="fadeInUp" onClickAway={() =>closeModal()}>   
              
              <div className="col-sm-8 invoice-col"> 
                        <address>
                        <strong style={{"color":"red"}}>Obs.: Aperte na parte escura para fechar a informação </strong><br />
                          <strong>Nome do PM</strong><br />
                          {Dados.nome}<br />
                         
                          <strong>Horario que foi enviado a Ultima Localização:</strong><br />
                         {Time}
                          <br />
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