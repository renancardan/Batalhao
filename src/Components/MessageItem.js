import React, { useState, useEffect } from 'react';
import AudioPlayer from "react-h5-audio-player";
import { Spinner  } from "react-awesome-spinners";


export default ({data, user, setBody, setVisible}) => {
    const [time, setTime] = useState('');
    const [Ouvir, setOuvir] = useState(false);
    const [Carre, setCarre] = useState(false);
    
    const tempo = ()=>{
        let currentDate = '';
        let now =new Date(data.date);
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

    
    useEffect(()=>{
        tempo();
    }, []);

    const openModal = (body)=>{
        setVisible(true);
        setBody(body);
    }

    const ouviraudio = ()=>{
        setOuvir(true);
        setCarre(true);
    }

    const carregar = ()=>{
        setCarre(false);
    }

    return (
        <div
            className="messageLine"
            
            style={{
                justifyContent: user=== data.autor ? 'flex-end' : 'flex-start'
            }}
        >
           
            <div
                className="messageItem"
               
            style={{
                    backgroundColor: user === data.autor ? '#DCF8C6' : '#ccc'
                }}
            >
                 <strong style={{
                    color: user === data.autor ? '#23C725' : '#2344C7',  marginBottom: '1px', marginLeft:'5px', fontSize: '10px'
                }} >{data.nome}</strong>
               {data.type === "text" &&
                    <>
                  <div className="messageText">{data.body} </div>
                  {/* <div className="messageDate">{time}</div> */}
                  </>
               }
               {data.type === "audio" &&
                    <>
                    {Ouvir === false ?
                    <div  className="video--btn"  width="200" height="200"
                    onClick={()=>ouviraudio()}
                   >
                       <string style={{"marginRight":10, "marginLeft":5, "fontSize":12 }}>Audio</string>
                       <img src="../assets/video.png" alt="Video" width="30" height="30"/>
                       
                   </div> 

                    :
                    <>
                    {Carre === true &&
                         <Spinner 
                         size={64}
                         color={"#5d0bf7"}
                         sizeUnit={'px'} 
                         />
 
                    }
                    
                    <AudioPlayer
                    layout='stacked'
                    preload='auto'
                    customAdditionalControls={[]}
                    showJumpControls={false}
                    customVolumeControls={[]}
                    onCanPlay={ (e)=>carregar()}
                        src={data.body}
                        onPlay = { e  =>  console . log ( "onPlay" ) } 
                    
                        // other props here
                    />
                </>
                    }
                
                
                  {/* <div className="messageDate">{time}</div> */}
                  </>
               }

                {data.type === "image" &&
                    <>
                      <div  className="video--btn"  width="200" height="200"
                     onClick={()=>openModal(data.body)}
                    >
                 <img className="imgChat"
                 src={data.body} 
                />  
                </div>
                  {/* <div className="messageDate">{time}</div> */}
                  </>
               }

                {data.type === "video" &&
                    <>
                     <div  className="video--btn"  width="200" height="200"
                     onClick={()=>openModal(data.body)}
                    >
                        <img src="../assets/video.png" alt="Video" width="100" height="100"/>
                        
                    </div>
                {/*  */}
                
                  {/* <div className="messageDate">{time}</div> */}
                  </>
               }
              
            </div>
        </div>
    );
}