import React, { useState, useEffect, useRef } from 'react';
import VideoPlayer from "react-happy-video";
import EmojiPicker from 'emoji-picker-react';
import MessageItem from '../Components/MessageItem'
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

export default ({ AbrirMaps, MapsCaixa, data, Nome, Dados, Vizul, setVizul, Varia, setAlert, setAlertTipo, Alert, AlertTipo, setActiveChat, setFormu, Loc}) => {
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
    const onKeyDown = (event) => {
      
        if (event.key === 'Enter') {
          event.preventDefault();
          event.stopPropagation();
          handleSendClick();
        }
      }

 
    useEffect(()=>{  
       PegandoList()
    }, [data]);

    useEffect(()=>{  
        ListandoList();
        ListandoTempo();
     }, [list]);

 

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


    const ListandoList = ()=>{
        for(let i in list){
            let listra = [];
            if(list[i].id === data) {
                list[i].nome.forEach(result=>{
                    listra.push({
                       type:result.type,
                       autor:result.autor,
                       body: result.body,
                       date: result.date,
                       nome: result.nome,
                    });
                });
                setListInt(listra);
            }
        }


       
       
      
    }

    const ListandoTempo = ()=>{
        for(let i in list){
            let Temp = [];
            if(list[i].id === data) {  
                setDateIni(list[i].dataIni);
            }
        }


       
       
      
    }
   
    
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

    const AumetVizul = ()=>{
         setVizul(Vizul+1);
    }

    const Digite = ()=> {
        Api.Digitando(data);
    }

    const NaoDigite = ()=> {
        Api.NaoDigitando(data);
    }

    const handleEmojiClick = (e, emojiObject) => {
        setText( text + emojiObject.emoji );
   }

   const handleOpenEmoji = () => {
    setEmojiOpen(true);
    }

    const PegandoList = ()=>{
        Api.PesquisarConversa(data, Dados, setList, setUser, setTemUmlt, setDateIni);
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

   

    const handleMicClick = async () => {
        await setListening(false);
         await setMudar(true);
         setEmojiOpen(true);
         var device = navigator.mediaDevices.getUserMedia({audio: true});
         var items = [];
         device.then( stream => {
             setStream(stream);
              recorder = new MediaRecorder(stream);
             recorder.ondataavailable = e=>{
                items.push(e.data);
                 if (recorder.state == 'inactive'){
                     console.log(items);
                     var blob = new Blob(items, {type: 'audio/mp4'});
                     setSom(URL.createObjectURL(blob));
                 }
             } 
             recorder.start(100);
            //  setTimeout(()=>{
            //      recorder.stop();
            //  }, 5000);
         })
               
        
    }

    const Paragravar = async ()=>{
        await setMudar(false);
        await setListening(true);
        if (null !== Stream) {
            await Stream.getAudioTracks()[0].stop();
           
       }
        recorder.stop();

       
        // await setMudar(false);
        // 
       
        //     Grav.stop();
        //     Grav.exportWAV(function (blob) {
        //     var url = (window.URL || window.webkitURL)
        //             .createObjectURL(blob);
        //             console.log("essa Url" + url);
        
        //    }); 
        
    }



    const handleSendClick = () => {
        if(text !== '') {
            Api.sendMessage(data, text, nome, TemUmlt, Varia); 
            setText('');
            setEmojiOpen(false);
        }

        AumetVizul();
    }

    const EnviandoAudio = ()=>{
        Api.EnviarAudio(Som)
    }

    const closeModal = ()=>{
            setVisible(false);
            setBody('');
    }

    function Concluir() {
        setAlert("ok");
        setAlertTipo("Concluir");
      }

      const ConclusaoOc = ()=>{
        setAlert(" ");
        setAlertTipo(" ");
        Api.ConcluirOc(data);
    }

    function cancelar() {
        setAlert(" ");
        setAlertTipo(" ");
      }


      const  AbrirFormu = ()=>{
        
        setFormu(false);
      }

      const AbrirMenu = ()=>{
            setEmojiOpen(true);
      }

      const PedirLoc = ()=>{
        setEmojiOpen(false);
        Api.sendMessageBotao(data, text, nome, TemUmlt, Varia);
      }
      
    

    return (
        <div className="chatWindow" style={{height: MapsCaixa ? '50%' : '100%'}}>
             { Alert !== " " && AlertTipo === "Concluir" &&
              <SweetAlert
              success
              showCancel
              confirmBtnText="Sim"
              cancelBtnText="Não"
              confirmBtnBsStyle="success"
              onConfirm={()=>ConclusaoOc()}
              onCancel={cancelar}
              focusCancelBtn
            >
              Tem certeza que deseja Concluir a Ocorrencia {Nome}!
            </SweetAlert>
            }
            <Modal visible={Visible} width="500" height="500" effect="fadeInUp" onClickAway={() =>closeModal()}>
                    <div>
                    <img className="imgChat1"
                 src={Body} 
                />

                    
               
                
                        <a href="javascript:void(0);" onClick={() => closeModal()}>Fechar</a>
                    </div>
                </Modal>
            <div className="chatWindow--header">
            <div className="chatWindow--headerinfo">
           
            <div className="chatWindow--name"  style={{margin: '30px'}}>  
            <string className="textTitulo" >Nome: {Nome}</string><br/>
            <string className="textTitulo" >Inicio da ocorrencia: {time}</string>
            </div>
            </div>
            <div className="chatWindow--headerbuttons">

            {Dados.grupo.menu.chat.caixaChat.btn_formulario === true && 
                    <div className="chatWindow--btn1"
                     onClick={()=>AbrirFormu()}
                    >
                        <p className="textButao" >FORMULARIO</p>
                    </div>
                    }
                 {Dados.grupo.menu.chat.caixaChat.btn_maps === true &&     
                    <div className="chatWindow--btn"
                    onClick={AbrirMaps}
                    >
                        <RoomIcon style={{color: MapsCaixa?'#5d0bf7':'#919191'}} />
                    </div>
                    }

                </div>
            </div>
            <div ref={body} className="chatWindow--body">
            {ListInt.map((item, key)=>(
                    <MessageItem
                        key={key}
                        data={item}
                        user={User}
                        setVisible={setVisible}
                        setBody={setBody}
                    />
                ))}
            </div>
            <div className="chatWindow--emojiarea"
            style={{height: emojiOpen ? '50px' : '0px'}}
            >
               
                <div className="chatWindow--headerbuttons">
               {Loc.lng === 'vazio' &&

                <div className="chatWindow--btn1"
                onClick={()=>PedirLoc()}
               >
                   <p className="textButao" >PEDIR LOCALIZAÇÃO</p>
               </div>

               }
                

              
             
                  
               </div>
             
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
            <div onClick={AbrirMenu} className="chatWindow--btn"  style={{width: emojiOpen? 0:40}}>
                <AttachFileIcon style={{color:'#5d0bf7'}} />
                </div>
            <div className="chatWindow--inputarea">
            <input
                        className="chatWindow--input"
                        type="text"
                        placeholder="Digite uma mensagem"
                        value={text}
                        onChange={e=>setText(e.target.value)}
                        onFocus={()=>Digite()} 
                        onBlur={()=>NaoDigite()}
                        onKeyDown={onKeyDown}
                        // onKeyUp={handleInputKeyUp}
                      
                    />    
            </div>
            <div className="chatWindow--pos">
            {/* {text === '' &&
            <>
            {Mudar === false ?
                <div onClick={handleMicClick} className="chatWindow--btn">
                <MicIcon style={{color:'#919191'}} />
                </div>
            :
            <div onClick={Paragravar} className="chatWindow--btn">
                <MicIcon style={{color:'#5d0bf7'}} />
            </div>

            }
                     
            </>
            }   */}
             
              {Dados.grupo.menu.chat.caixaChat.btn_enviar === true &&  
                        <div  onClick={handleSendClick} className="chatWindow--btn">
                            <SendIcon style={{color: '#5d0bf7'}} />
                        </div>
                    }
            </div>
        </div>
        </div>
    );
}