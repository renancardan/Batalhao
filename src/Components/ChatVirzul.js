import React, { useState, useEffect, useRef } from 'react';
import VideoPlayer from "react-happy-video";
import EmojiPicker from 'emoji-picker-react';
import MessageItem from './MessageItem'
import RoomIcon from '@material-ui/icons/Room';
import SearchIcon from '@material-ui/icons/Search';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import CloseIcon from '@material-ui/icons/Close';
import SendIcon from '@material-ui/icons/Send';
import MicIcon from '@material-ui/icons/Mic';
import { CollectionsOutlined, Reorder } from '@material-ui/icons';
import SweetAlert from 'react-bootstrap-sweetalert';
import Modal from 'react-awesome-modal';
import Api from '../Api';


let recorder = '';

export default ({ AbrirMaps, MapsCaixa, data, Nome, Dados, Vizul, setVizul, Varia, setAlert, setAlertTipo, Alert, AlertTipo, setActiveChat}) => {
    console.log(Varia);
    const body = useRef();
    let recognition = null;
    let SpeechRecognition = window.AudioContext || window.webkitAudioContext;
    if(SpeechRecognition !== undefined) {
        recognition = new SpeechRecognition();
    }
    const [User, setUser] = useState('');
    const [emojiOpen, setEmojiOpen] = useState(false);
    const [Som, setSom] = useState('');
    const [Stream, setStream] = useState('');
    const [text, setText] = useState('');
    const [listening, setListening] = useState(false);
    const [Mudar, setMudar] = useState(false);
    const [list, setList] = useState([]);
    const [Visible, setVisible] = useState(false);
    const [Body, setBody] = useState('');
    const [nome, setnome] = useState(Dados.nome);
    const [TemUmlt, setTemUmlt] = useState('');
    const [DateIni, setDateIni] = useState('');
    const [time, setTime] = useState('');
    const [ListInt, setListInt] = useState([]);
    
    const [users, setUsers] = useState([]);


   

  

   

    // useEffect(()=>{ 
    //     if(Recorder !== null){
    //         Recorder.record();
    //     } 
       
    //  }, [Recorder]);

    useEffect(()=>{
        if(body.current.scrollHeight > body.current.offsetHeight) {
            body.current.scrollTop = body.current.scrollHeight - body.current.offsetHeight;
        }
      
    }, [ListInt]);


  

   
   
    
    useEffect(()=>{
        tempo();
    }, [DateIni]);

    const tempo = ()=>{
        let currentDate = '';
        let now =new Date(DateIni * 1000);
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



  



  

  

  

    const handleCloseEmoji = () => {
     setEmojiOpen(false);
    }

    // const init = async ()=>{
    //     if (null === Context) {
    //        const acao = new (
    //                 window.AudioContext || window.webkitAudioContext
    //                 );
    //          setContext(acao);
    //     }
    // }

   

    

   

   

   

    const closeModal = ()=>{
            setVisible(false);
            setBody('');
    }

    

     

    function cancelar() {
        setAlert(" ");
        setAlertTipo(" ");
      }
      
    

    return (
        <div className="chatWindow" style={{height: MapsCaixa ? '50%' : '100%'}}>
       
            <Modal visible={Visible} width="500" height="500" effect="fadeInUp" onClickAway={() =>closeModal()}>
                    <div>
                    <video width="500" height="500" controls
                    preload="auto"
                source src={Body} type="video/mp4" type="video/ogg"
                >

                    
               
                </video>
                        <a href="javascript:void(0);" onClick={() => closeModal()}>Close</a>
                    </div>
                </Modal>
            <div className="chatWindow--header">
            <div className="chatWindow--headerinfo">
           
            <div className="chatWindow--name"  style={{margin: '30px'}}>  
            <string className="textTitulo" >Chat da Ocorrência</string><br/>
            </div>
            </div>
            <div className="chatWindow--headerbuttons">
    
                    <div className="chatWindow--btn"
                    onClick={AbrirMaps}
                    >
                        <RoomIcon style={{color: MapsCaixa?'#5d0bf7':'#919191'}} />
                    </div>

                </div>
            </div>
            <div ref={body} className="chatWindow--body">
            {Vizul.map((item, key)=>(
                    <MessageItem
                        key={key}
                        data={item}
                        user={Varia}
                        setVisible={setVisible}
                        setBody={setBody}
                    />
                ))}
            </div>
            <div className="chatWindow--emojiarea"
            style={{height: emojiOpen ? '50px' : '0px'}}
            >
                {listening === false ?
                <p>Gravando Audio ...</p>
                :
                <audio controls
                source src={Som} type="audio/mp4"
                >  
                </audio>
                }
             
            </div>
            <div className="chatWindow--footer">

            <div className="chatWindow--pre">
            <div className="chatWindow--btn"
            onClick={handleCloseEmoji}
            style={{width: emojiOpen? 40:0}}
            >
                        <CloseIcon style={{color: '#919191'}} />
                    </div>
           
            </div>

          
        </div>
        </div>
    );
}