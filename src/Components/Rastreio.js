import React, { Component, useState, useEffect }  from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import Api from '../Api';
import Datando from '../Components/DateFormat'

                               
export default function Rastreio({MapsCaixa, Loc, LocPM, Info,  VerRtVt, ListRotaVt}) {
    const [Visible, setVisible] = useState(false);
    const [Dados, setDados] = useState({});
    const [Time, setTime] = useState(0);
    const [Tem, setTem] = useState(0);
    const [Viat, setViat] = useState([])
    console.log(ListRotaVt);
    useEffect(() => {
        VenDoRast()
        }, []);
    
    
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyBVYpwN6IT9kjonTs76bq1G9aSxYRhYU7U"
      })

      const VenDoRast = ()=>{
        var Cidade = Info.cidade;
        var Estado = Info.estado;
        Api.LocRast(Cidade, Estado, setViat)
      }
   
  return (
    <div className="maps-contener"  style={{height: '100%' }}>
        {Viat.length !== 0 &&
        <>
          {isLoaded ? (
      <GoogleMap
        mapContainerStyle={{width:"100%", height:"100%"}}
        center={Viat[0].Loc}
        zoom={15}
        // onLoad={onLoad}
        // onUnmount={onUnmount}
      >
       {VerRtVt === true ?
       <>
       {ListRotaVt.length !== 0 &&
       <>
        {ListRotaVt.map((Oc)=>(
         <>
             <Marker 
         position={Oc.localizacao} 
         icon={{
             url:"../../assets/carroPo.png",
             scaledSize: new window.google.maps.Size(30, 30),
         }}
         options={{
            label:{
                text:Oc.date ,
                className: "maps-text",
            }
         }}
        //  onClick={()=>{
        //      coloca(LocalizaPM, true);
        //  }}
         />
         
    </>
     ))}
     </>
}
       
       </>
       :
       <>
        {Viat.map((Oc)=>(
         <>
             <Marker 
         position={Oc.Loc} 
         icon={{
             url:"../../assets/carroPo.png",
             scaledSize: new window.google.maps.Size(30, 30),
         }}
         options={{
            label:{
                text: Oc.nome,
                className: "maps-text",
            }
         }}
        //  onClick={()=>{
        //      coloca(LocalizaPM, true);
        //  }}
         />
         
    </>
     ))}
       
       </>

        
       }
       
       
      </GoogleMap>
  ) : <></>}
        
        
        </>

        }
  

    </div>
  )
}
