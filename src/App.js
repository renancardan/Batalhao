import React, {useState, useEffect} from 'react';
import { BrowserRouter } from 'react-router-dom';
import Api from "./Api";


import LoginServ from './Estrutura/Serv/LoginServ';
import HeaderServ from './Estrutura/Serv/HeaderServ';
import MenuServ from './Estrutura/Serv/MenuServ';
import FooterServ from './Estrutura/Serv/FooterServ';
import RoutesServ from './Estrutura/Serv/RoutesServ';
import VerificarServ from './Pages/Serv/VerificarServ';
import AtivarServ from './Pages/Serv/AtivarServ';
import DesbloServ from './Pages/Serv/DesbloServ';
import BoOc from './Pages/Serv/BoOc';
import './App.css';
import EstruServJson from './JSONS/EstruServJson';

function App() {
    const [InstCad, setInstCad] = useState("Polícia Militar");
    const [EstadoCad, setEstadoCad] = useState("Maranhão");
    const [CidadeCad, setCidadeCad] = useState("Bacabal");
    const [NomeCad, setNomeCad] = useState("");
    const [TelCad, setTelCad] = useState("");
    const [EmailCad, setEmailCad] = useState("");
    const [ContaCad, setContaCad] = useState("Lider");
    const [SenhaCad, setSenhaCad] = useState("");
    const [SenhaComfCad, setSenhaComfCad] = useState("");
    const [NomeGuerra, setNomeGuerra] = useState("");
    const [Patente, setPatente] = useState("")
    const [User, setUser] = useState("L23252679");
    const [Conta, setConta] = useState("serv");
    const [Loading, setLoading] = useState(false);
    const [Alert, setAlert] = useState(" ");
    const [AlertTipo, setAlertTipo] = useState(" ");
    const [Dados, setDados] = useState(EstruServJson.Estrut);
    const [Avisando, setAvisando] = useState([]);
   

              useEffect(async () => {
                ObtendoDados();                        
              }, []);

             useEffect(() => { 
              
                MsgAvisando();
            
             }, [Dados])
              
              
              useEffect(() => {
 
                  bloqueio();         
               }, [Dados]);

              useEffect(() => {
                verStatus();
              }, []);

              useEffect(() => {
                setInterval(() =>{verStatus()}, 
                60000);
              }, [])
             
              useEffect(() => {
                setInterval(() =>{}, 
                10000);
              }, [])

             
              
                    const bloqueio = () => {
                      
                      if(Conta === "serv" && User !== "V23736478" && User !== "L23252679") {
                        if(Dados.conta.serv.desbloqueado === false){
                          localStorage.setItem('roma', "B23987845");
                          setUser("B23987845");
                          
                        }
                      }
                    }

                    const MsgAvisando = ()=>{
                       Api.AvisandoMsg(Dados, setAvisando)
                    }


                  const cadastroServ =  async ()=> {
                    await setLoading(true);
                    if(EmailCad !== "" && SenhaCad !== "" && NomeCad !== "" && TelCad !== ""
                    && SenhaComfCad !== "" && CidadeCad !== "" && EstadoCad !== ""
                    && InstCad !== "" && ContaCad !== "" && Patente !== "" && NomeGuerra !== "") {
                            if(SenhaComfCad === SenhaCad) {
                              if(InstCad !== "Instituição" ) {
                                if(CidadeCad !== "Cidade") {
                                  if(EstadoCad !== "Estado") {
                                    if(ContaCad !== "Conta") {
                                      await setConta("serv");
                                      const res = await Api.cadastroserv(EmailCad, SenhaCad, NomeCad,
                                         TelCad, CidadeCad, EstadoCad, InstCad,  ContaCad, NomeGuerra, Patente);
                                      if(res === "ok") {
                                        await localStorage.setItem('brasil', "serv");
                                        await localStorage.setItem('roma', "V23736478");
                                        await verStatus();
                                      } else {
                                        setAlert(res);
                                      }


                                      } else {
                                        setAlert("Escolha Uma Conta"); 
                                      }
                                    } else {
                                      setCidadeCad(" ");
                                      setAlert("Escolha Um Estado");
                                    }
                                  } else {
                                    setAlert("Escolha Uma Cidade");
                                  }
                                } else {
                                  setAlert("Escolha Uma Instituição");
                              }

                            } else {
                              setAlert("A Confirmação de senha está errado!");
                            }
                      } else {
                          setAlert("Preencha Todos os Campos!");
                      }

                      await setLoading(false);

                  }


                  const logarServ =  async ()=> {
                    await setLoading(true);
                    if(EmailCad !== "" && SenhaCad !== ""){
                      const res = await Api.LogandocontaServ(EmailCad, SenhaCad, setLoading, setDados);
                      if(res === "ok") {                      
                        await verStatus();
                      } else {  
                        await setAlert(res);
                      }
                    } else {
                       
                      setAlert("Preencha Todos os Campos");
                    }
                    await setLoading(false);
                  }
                  

                  const AtivandoServ = async ()=> {
                    const res = await Api.AtivarcontaServ();
                    if(res === "Atualizado com sucesso!"){
                      setAlert("Ativado com sucesso!");
                      setAlertTipo("success");
                    } else {
                      setAlert("Seu perfil não foi ativado!");
                      setAlertTipo("danger")
                      verStatus();
                    }
                  }

                    //aqui vai servir para colocar qual acesso no site
                  const verStatus = async() => {
                    console.log(User);
                    console.log(Conta);
                  
                    const status = await localStorage.getItem('roma');
                    const fromat = await localStorage.getItem('brasil');
                    
                    if( status !== null ){
                      setUser(status);
                      setConta(fromat);
                    } else {
                      setUser("L23252679");
                      setConta("serv");
                    }

                    
                    
                   } 
                   
                   const sair = async ()=> {
                    await Api.sairdaconta();
                    await setEmailCad("");
                    await setSenhaCad("");
                    await verStatus();
                  }
                    // aqui vai servir para trazer os dados dele na hora da atualização 
                  const ObtendoDados = async () => {
                      setLoading(true);
                      const res = await Api.AnliseDados(Dados, setDados, setLoading);
                  }

            


                  const CriarDados = async () => {
                    await Api.gerarDados();
                  }

                  const ApagarDados = async () => {
                    await Api.excluirDados();
                  }

                  const VerBo = async () => {
                    await localStorage.setItem('roma', "BO123");
                    await localStorage.setItem('brasil', "BO");
                    setUser("BO123");
                    setConta("BO");
                  }

                 



  return (
    <div class="wrapper">
              {User === "L23252679" &&  Conta === "serv" &&
              <LoginServ 
              setConta={setContaCad} 
              setEmail={setEmailCad} 
              Email={EmailCad} 
              Senha={SenhaCad} 
              setSenha={setSenhaCad} 
              Confirsenha={SenhaComfCad}
              setConfirsenha={setSenhaComfCad}
              Cidade={CidadeCad}
              setCidade={setCidadeCad}
              Estado={EstadoCad}
              setEstado={setEstadoCad}
              Instituicao={InstCad}
              setInstituicao={setInstCad}
              Nome={NomeCad}
              setNome={setNomeCad}
              Telefone={TelCad}
              setTelefone={setTelCad}
              cadastrando={cadastroServ}
              ContaTipo={ContaCad}
              setContaTipo={setContaCad}
              setLoading={setLoading}
              Loading={Loading}
              logando={logarServ}
              Alert={Alert}
              setAlert={setAlert}
              NomeGuerra={NomeGuerra}
              setNomeGuerra={setNomeGuerra}
              Patente={Patente}
              setPatente={setPatente}
              Bo={VerBo}
              />  
              }

              {User === "V23736478" &&  Conta === "serv" &&
              <>
              <VerificarServ
              IndoLogar={sair}
              />
              </>
              }

              {User === "A23569874" &&  Conta === "serv" &&
              <>
              <AtivarServ
              IndoLogar={AtivandoServ}
              setAlert={setAlert}
              Alert={Alert}
              setAlertTipo={setAlertTipo}
              AlertTipo={AlertTipo}
              verStatus={verStatus}
              />
              </>
              }

              {User === "B23987845" &&  Conta === "serv" &&
              <>
              <DesbloServ
              IndoLogar={sair}
              />
              </>
              }

            {User === "BO123" &&  Conta === "BO" &&
              <>
              <BoOc
              setUser={setUser}
              setConta={setConta}
              />
              </>
              }

              {User === "S23458765" && Conta === "serv" &&            
              <BrowserRouter>
              <HeaderServ
              Dados={Dados}
              />
              <MenuServ 
              sair={sair}
              Dados={Dados}
              CriarDados={CriarDados}
              ApagarDados={ApagarDados}
              />
              <RoutesServ
              Loading={Loading}
              setLoading={setLoading}
              Alert={Alert}
              setAlert={setAlert}
              AlertTipo={AlertTipo}
              setAlertTipo={setAlertTipo}
              Dados={Dados}
              Avisando={Avisando}
              setAvisando={setAvisando}
              setDados={setDados}
              />
              <FooterServ />
              </BrowserRouter>
              }

      </div>
    );
  }
  
  export default App;