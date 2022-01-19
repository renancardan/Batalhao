import React, { Component, useState, useEffect } from 'react';
import HeaderPage from '../../Components/HeaderPages';
import SweetAlert from 'react-bootstrap-sweetalert';
import { Spinner  } from "react-awesome-spinners";
import Aviso from '../../Components/Aviso';
import CaixaInforme from '../../Components/CaixaInforme';
import Butao from '../../Components/Butao_list';
import Select from '../../Components/Select';
import Pagination from '../../Components/Pagination';
import ChatListItem from '../../Components/ChatListItem';
import ChatIntro from '../../Components/ChatIntro';
import ChatWindow from '../../Components/ChatWindow';
import ChatWindowPM from '../../Components/ChatWindowPM';
import ChatFormulario from '../../Components/ChatFormulario';
import Vizualizacao from './VizualizarApp';
import AtivarApp from './AtivarApp';
import Api from '../../Api';
import Maps from '../../Components/maps';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import Modal from 'react-awesome-modal';
import Condic from '../../Components/Condoc';
import Geocoder from 'react-native-geocoding';

let timer = '';
export default ({Dados, setDados, Loading,  setLoading,  Alert, setAlert, AlertTipo,
   setAlertTipo, Avisando, setAvisando}) => {
     
      const [Titulo, setTitulo] = useState("Chat");
      const [MapsCaixa, setMapsCaixa] = useState(false)
      const [Forms, setForms] = useState([]);
      const [user, setUser] = useState({
        id:1234,
        avatar: '//www.w3schools.com/howto/img_avatar2.png',
        name:"Renan Cardan"
      });
      const [Id, setId] = useState("");
      const [Nome, setNome] = useState("");
      const [IdPM, setIdPM] = useState("");
      const [NomePM, setNomePM] = useState("");
      const [Telefone, setTelefone] = useState("");
      const [Chatlist, setChatlist] = useState([]);
      const [ChatListPM, setChatListPM] = useState([]);
      const [activeChatPM, setActiveChatPM] = useState(null);
      const [activeChat, setActiveChat] = useState(null);
      const [Vizul, setVizul] = useState('');
      const [VizulPM, setVizulPM] = useState('');
      const [Varia, setVaria] = useState('');
      const [Loc, setLoc] = useState({});
      const [VirModal, setVirModal] = useState(false);
      const [Cont, setCont] = useState([]);
      const [NomeCond, setNomeCond] = useState('');
      const [AtuaMaps, setAtuaMaps] = useState(false);
      const [PesEnd, setPesEnd] = useState(false);
      const [DigEnd, setDigEnd] = useState('');
      const [Result, setResult] = useState([]);
      const [Pesq1, setPesq1] = useState("");
      const [Formu, setFormu] = useState(true);
      const [CodOc, setCodOc] = useState("");
      const [Letra, setLetra] = useState(["", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "X", "Z"]);
      const [Let1, setLet1] = useState(0);
      const [Let2, setLet2] = useState(0);
      const [Let3, setLet3] = useState(0);
      const [NumVal, setNumVal] = useState(0);
      const [NuOc, setNuOc] = useState("");
      const [Qantlis, setQantlis] = useState(0);
      const [LocPM, setLocPM] = useState({});
      const [PmIndo, setPmIndo] = useState(false);
      const [VtrOcup, setVtrOcup] = useState(false);
      const [Pm, setPm] = useState("");
      const [MdEnvi, setMdEnvi] = useState(false);
      const [MdREnvi, setMdREnvi] = useState(false);
      useEffect(() => {
          LevarTemp();
      }, [])
      useEffect(() => {
        PegarListPM();
        PegarList();
    }, [])
 
    useEffect(() => {
      
  }, [activeChat])

     useEffect(() => {
       if(Chatlist !== []){
         
         if(Chatlist.length > Qantlis){
            // NotFic();
         }
       }
  
    
    }, [Chatlist])

  
     

    useEffect(() => {
      Geocoder.init('AIzaSyBVYpwN6IT9kjonTs76bq1G9aSxYRhYU7U', {language:'pt-br'});
    }, []);

   

  useEffect(() => {
    CondPegar();
 }, [activeChat])


 

useEffect(() => {
  //  Vizuali();
}, [Vizul ,activeChat]);



useEffect(() => {
  VizualiPM();
}, [VizulPM ,activeChatPM]);

useEffect(() => {
  if(DigEnd) {
    if(timer){
      clearTimeout(timer);
    }
    timer = setTimeout( async ()=>{

      const geo = await Geocoder.from(DigEnd);
      if(geo.results.length > 0){
        let tmpResults = []
        for(let i in geo.results){
          tmpResults.push({
            address:geo.results[i].formatted_address,
            latitude:geo.results[i].geometry.location.lat,
            longitude:geo.results[i].geometry.location.lng,
          });

        }
        setResult(tmpResults);

      }

    }, 500);
  }
 
}, [DigEnd]);

     

// const NotFic = ()=>{
//   console.log(Notification.permission);
//   if(Notification.permission === "granted") {
//     ShowNot();
//   } else if(Notification.permission !== "denied") {
//      Notification.requestPermission().then(permission => {
//          ShowNot();
//      });
//   }
//   setQantlis(Chatlist.length)
// }

// const ShowNot = ()=>{
//   let n = new Notification("OCORRÊNCIA",{
//       body: "Ocorrência Iniciada",
//       icon: "https://bpmbacabal.herokuapp.com/graficos/assets/logoapp.jpeg"
//     } 
//    )
// }
       

     const LevarTemp = async ()=>{
      await Api.VariacaoTemp();
      await Api.VarTempPegar(Dados, setVaria);
     }

     const AdicionaCond = ()=>{
      setVirModal(true);
     }

     const CondPegar = ()=>{
       if(activeChat !== null){
        Api.PegarCond(activeChat, setForms, setLoc);
       }
        
     }

    
     
     
      const PegarList = ()=>{
        Api.PesquisarList(Dados, setChatlist )
      }

      const PegarListPM = ()=>{
        Api.PesquisarListPM(Dados, setChatListPM );
      }

    

      const AbrirMaps = ()=>{
        console.log("entrou ");
        setAtuaMaps(!AtuaMaps);
        setMapsCaixa(!MapsCaixa);
        setPesEnd(false);
        setDigEnd('');
        setResult([]);
       
      }

      const Verconversa = async (id, nome, Quant, Indo, PM)=>{
     let V = Quant;
     let Id = id;
        setMdEnvi(false);
        setMapsCaixa(false);
        setAtuaMaps(false);
        setFormu(true);
        await setForms([]);
        await setNome(nome);
        await setActiveChat(id);
        await setVizul(Quant);
        await setPmIndo(Indo);
        await setPm(PM);
        Api.MsgLida(Id, V);
      }

      const VerconversaPM = async (id, nome, Quant, Ocup )=>{
        setVirModal(true);
       
        await setNomePM(nome);
        await setActiveChatPM(id);
        await setVizulPM(Quant);
        await setVtrOcup(Ocup)
      
        

      }

      const Vizuali = ()=>{
        if(Vizul !== '' && activeChat !== null) {
          Api.MsgLida(activeChat, Vizul);
        }
      }

      const VizualiPM = ()=>{
        if(VizulPM !== '' && activeChatPM !== null) {
          Api.MsgLidaPM(activeChatPM, VizulPM);
        }
      }

      const TirarCond = async (Vale, tipo)=>{
        await setNomeCond(tipo)
        await setCont([...Forms.filter((item, index) => item.id !== Vale)]);
        await setAlert("oK");
        await setAlertTipo("Excluir");
        
      }

      const Cancelar = ()=>{
        setAlert(" ");
       setAlertTipo("");
      }

      const CondGuard = ()=>{
        Api.ExcluirCondi(activeChat, Cont, setAlertTipo, setAlert);
        setAlert(" ");
        setAlertTipo("");
      }
      const AbrirPesEnd = ()=>{
       
        setPesEnd(true);
        
      }

      const FecharPesEnd = ()=>{
        setMapsCaixa(true);
        setPesEnd(false);
        setDigEnd('');
        setResult([]);
      }

      const enviarLoc = (lat, lng)=>{
        let la = lat;
        let ln = lng;
        Api.EnviarLocali(activeChat, la, ln, setAlert, setAlertTipo );
        setMapsCaixa(false);
        setPesEnd(false);
        setAtuaMaps(false);
        setDigEnd('');
        setResult([]);

      }
      function confirma() {
        setAlert(" ");
        setAlertTipo(" ");
       
       
      }
      function cancelar() {
        setAlert(" ");
        setAlertTipo(" ");
      
      }
      const PergCriarOc = ()=>{
          setAlertTipo("IniciarOc");
          setAlert("Ok")
      }
      const AddOc = (nome)=>{
        setAlert(" ");
        setAlertTipo(" ");
        let came = `${nome}`+" Via Sist"
       
        Api.AddOcorrencia(Dados, came, Varia,  setAlert, setAlertTipo);
      
      }
      
  
               
      
  return (
        
          <div>
            
           
            <div className="content-wrapper">
            {Alert !== " " && AlertTipo === "success" &&
                  <SweetAlert  success title={Alert} onConfirm={confirma} onCancel={cancelar} />
                }

            {Alert !== " " && AlertTipo === "danger" &&
                  <SweetAlert  danger title={Alert} confirmBtnBsStyle="danger" onConfirm={confirma} onCancel={cancelar} />
                }
            { Alert !== " " && AlertTipo === "Excluir" &&
              <SweetAlert
              warning
              showCancel
              confirmBtnText="Sim"
              cancelBtnText="Não"
              confirmBtnBsStyle="danger"
              onConfirm={()=>CondGuard()}
              onCancel={()=>Cancelar()}
              focusCancelBtn
            >
              Tem certeza que deseja Excluir a o Nome da Ocorrência {NomeCond}
            </SweetAlert>
            }

              { Alert !== " " && AlertTipo === "IniciarOc" &&
             <SweetAlert
             input
             showCancel
             cancelBtnBsStyle="light"
             title="Criando A Ocorrência"
             placeHolder="Digite o Nome da Ocorrência"
             onConfirm={(reponse)=>AddOc(reponse)}
             onCancel={()=>Cancelar()}
           >
             Digite o Nome da Ocorrência
           </SweetAlert>
            }   
            
              <HeaderPage
              Avisando={Avisando} 
              Titulo={Titulo}
              />            
              <section className="content">
                <div className="container-fluid">
                  
                <div className="row">
                  <section className="col-12">
                  {Loading === true ?
                        <Spinner 
                        size={64}
                        color={"#5d0bf7"}
                        sizeUnit={'px'} 
                        />
                        :
                        <>
                    {Dados.grupo.menu.chat.caixaChat.Ver === true && 
                      <>
                       <div className="card ">
                        <div className="app-window">
                            <div className="contatos">
                                <div className="topo">
                                {Dados.grupo.menu.chat.caixaChat.btn_iniciarOc === true &&
                                <div className="chatWindow--btn1"
                                onClick={()=>PergCriarOc()}
                                >
                                  <p className="textButao" >INICIAR UMA OCORRENCIA</p>
                              </div>
                                }
                                </div>
                                <div className="busca">
                         
                                </div>
                                <div className="chatlist">
                                {Chatlist.filter((val)=>{
                                  if (Pesq1 == "") {
                                    return val;
                                  }else if (val.nome.toLowerCase().includes(Pesq1.toLowerCase())) {
                                    return val;
                                  }
                                }).map((item, key)=>(
                                        <ChatListItem 
                                        key={key}
                                        data={item}
                                        Ocorr={Chatlist[key].idOc}
                                        active={activeChat === Chatlist[key].idOc}
                                        onClick={()=>Verconversa(Chatlist[key].idOc, item.nome, Chatlist[key].QuantMsg, Chatlist[key].PmIndo, Chatlist[key].IdPM,)}
                                        />
                                ))}
                                </div>
                            </div>
                            <div className="contentarea">
                             {/* //18 - colocando o qual pagina vai mostrar  no contentarea*/}
                        {activeChat !== null &&
                        <>
                        {Formu === true ?
                           <ChatWindow
                           IdPM={IdPM}
                           Loc={Loc}
                           data={activeChat}
                           setActiveChat={setActiveChat}
                           activeChatPM={activeChatPM}
                           setAlert={setAlert}
                           setAlertTipo={setAlertTipo}
                           Alert={Alert}
                           AlertTipo={AlertTipo}
                           AbrirMaps={AbrirMaps} 
                           MapsCaixa={MapsCaixa}
                           Nome={Nome} 
                           Dados={Dados} 
                           Vizul={Vizul}
                           Varia={Varia}
                           setVizul={setVizul}
                           setFormu={setFormu}
                           NomePM={NomePM}
                           PmIndo={PmIndo}
                           VtrOcup={VtrOcup}
                           Pm={Pm}
                           MdEnvi={MdEnvi}
                           setMdEnvi={setMdEnvi}
                           setNomePM={setNomePM}
                           setVirModal={setVirModal}
                           setActiveChatPM={setActiveChatPM}
                           setMdREnvi={setMdREnvi}
                           MdREnvi={MdREnvi}
                           />
                        :
                        <ChatFormulario
                        tiracond={TirarCond}
                        AdicionaCond={AdicionaCond}
                        data={activeChat}
                        setActiveChat={setActiveChat}
                        setAlert={setAlert}
                        setAlertTipo={setAlertTipo}
                        Alert={Alert}
                        AlertTipo={AlertTipo}
                        AbrirMaps={AbrirMaps} 
                        MapsCaixa={MapsCaixa}
                        Nome={Nome} 
                        Dados={Dados} 
                        setFormu={setFormu}
                        Forms={Forms}
                        Varia={Varia}
                        />

                        }
                       
                        {AtuaMaps === true &&
                         <>
                         {PesEnd === false ?
                           <div className="CaixaDeMaps">
                           <div className="chatWindow--btn1"
                           onClick={()=>AbrirPesEnd()}
                           >
                               <p className="textButao" >PROCURAR ENDEREÇO</p>
                           </div>
                           </div>
                         :
                         <div className="CaixaDeMapsPes">
                           <div className="CaixaInputPes" >
                            
                            <div  onClick={()=>FecharPesEnd()} className="chatWindow--btn">
                           <string>X</string>
                              </div>
                              <input
                                          className="chatWindow--input1"
                                          type="text"
                                          placeholder="Digite a Rua, Número, Cidade-Estado."
                                          value={DigEnd}
                                          onChange={e=>setDigEnd(e.target.value)}
                                        
                                          // onKeyUp={handleInputKeyUp}
                                        
                                      />    
                              
                              </div>
                              {Result.map((item, key)=>(
                                 <div className="CaixaEndPes" >
                                 <string>{item.address}</string>
                                 <div className="chatWindow--btn1"
                                  onClick={()=>enviarLoc(item.latitude, item.longitude)}
                                  >
                               <p className="textButao" >ENVIAR</p>
                                </div>
                                 </div>
                              ))}
                             
                            
                              
                              </div>
                         }
                         
                         
                         {Loc.lng !== 0 ?
                         <Maps 
                         MapsCaixa={MapsCaixa}
                         Loc={Loc}
                         LocPM={LocPM}
                         />
                         :
                         <>
                         <p>Não Existe Endereço Registrado.</p>
                         </>

                         }
                        
                         </>
                        }
                       
                        </>
                       }
                        {activeChat === null &&
                       
                          <ChatIntro />
                          
                          
                      }

                            </div>
                        
                            <>
                              {VirModal === false ?
                                      <div className="formularioCond">
                                      <div className="card card-info">
                                    <div className="card-header">
                                      <h3 className="card-title">Pms De Serviço</h3>
                                    </div>
                                  
                                    {/* /.card-header */}
                                    <div className="card-body">
                                    {ChatListPM.map((item, key)=>(
                                        <ChatListItem 
                                        key={key}
                                        data={item}
                                        Ocorr={ChatListPM[key].idChat}
                                        active={activeChatPM === ChatListPM[key].idChat}
                                        onClick={()=>VerconversaPM(ChatListPM[key].idChat, item.nome, ChatListPM[key].QuantMsg, ChatListPM[key].ocupado )}
                                        />
                                ))}
                               
                                        </div>
                                    {/* /.card-body */}
                                  </div>
                                </div>
                                :
                                <ChatWindowPM
                                setNomePM={setNomePM}
                                setIdPM={setIdPM}
                                Loc={LocPM}
                                AbrirMaps={AbrirMaps}
                                setLocPM={setLocPM}
                                data={activeChatPM}
                                setActiveChatPM={setActiveChatPM}
                                setAlert={setAlert}
                                setAlertTipo={setAlertTipo}
                                Alert={Alert}
                                AlertTipo={AlertTipo}
                                MapsCaixa={MapsCaixa}
                                Nome={NomePM} 
                                Dados={Dados} 
                                Vizul={VizulPM}
                                Varia={Varia}
                                setVizul={setVizulPM}
                                setVirModal={setVirModal}
                                />
                              }
                              </>
                    
                        
                        </div>                            
                    </div>
                      </>
                    }  
                   </>
                        }
                    </section>       
               </div>
            </div>
          </section>
        </div>
       
     
      </div>

        );
    }

