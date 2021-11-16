import React, { Component, useState, useEffect } from 'react';
import HeaderPage from '../../Components/HeaderPages';
import SweetAlert from 'react-bootstrap-sweetalert';
import { Spinner  } from "react-awesome-spinners";
import Aviso from '../../Components/Aviso';
import CaixaInforme from '../../Components/CaixaInforme';
import Butao from '../../Components/Butao_list';
import Select from '../../Components/Select';
import Pagination from '../../Components/Pagination';
import VizualizarCont from './VizualizarConta';



import Api from '../../Api';


export default ({Dados, setDados, Loading,  setLoading,  Alert, setAlert, AlertTipo,
   setAlertTipo, Avisando, setAvisando}) => {
      const [Offset, setOffset] = useState(0);
      const [Limit, setLimit] = useState(10);
      const [Quant, setQuant] = useState(0);
      const [Pag1, setPag1] = useState(false);
      const [Pag2, setPag2] = useState(false);
      const [Titulo, setTitulo] = useState("Contas");
      const [Time, setTime] = useState("")
      const [UsuariosContServ, setUsuariosContServ] = useState([]);
      const [Lista, setLista] = useState(["list"]);
      const [Carreg, setCarreg] = useState(false);
      const [Cont, setCont] = useState(0);
      const [Id, setId] = useState("");
      const [Nome, setNome] = useState("");
      const [Telefone, setTelefone] = useState("");

      //aqui vai ser usado para a outra lista abaixo
      const [UsuarioApp, setUsuarioApp] = useState([]);
      const [AppList, setAppList] = useState(["list"]);
      const [QuantApp, setQuantApp] = useState(0);
      const [Ofapp, setOfapp] = useState(0);
      const [CarregApp, setCarregApp] = useState(false);
      const [ContApp, setContApp] = useState(0);
      

      useEffect(() => {
       ListConta();
       ListaApp();     
      }, [])

      useEffect(() => {
       
       }, [Lista])

      useEffect(() => {   
        Listando();   
       }, [UsuariosContServ])

       useEffect(() => {
        Listando();
       }, [Offset])

       useEffect(() => {   
        ListandoApp(); 
       }, [UsuarioApp])

       useEffect(() => {   
        ListandoApp();
        
       }, [Ofapp])

      
     
    
  
     
          const ListConta = async ()=>{
            if (navigator.onLine) {
             setCarreg(true);
              await Api.ListContasServ(Dados, setQuant, setUsuariosContServ);
             
            } else {
              setAlert("Sem Internet");
              setAlertTipo("danger");
            }

               
          }

          const ListaApp = async ()=>{
            if (navigator.onLine) {
             setCarregApp(true);
              await Api.ListAppServ(Dados, setQuantApp, setUsuarioApp  );
             
            } else {
              setAlert("Sem Internet");
              setAlertTipo("danger");
            }

               
          }

          const Listando = async ()=>{
                
                  const cal1 = Quant/Limit;
                  const cal2 = Math.trunc(cal1);
                  const cal3 = cal2*10;
                  const cal4 = Quant - cal3;
                  if(Offset === cal3) {
                      
                          const inicio = Offset;
                          const fim = Quant;
                          var Listinha =[];
                          for (var i = inicio; i < fim; i++) {
                            Listinha.push({
                              list:UsuariosContServ[i],
                            });
                            setLista(Listinha);
                          
                    

                          }

                  } else {

                          const inicio = Offset;
                          const fim = (Offset + Limit) 
                          var Listinha =[];
                          for (var i = inicio; i < fim; i++) {
                            Listinha.push({
                              list:UsuariosContServ[i],
                            });
                            setLista(Listinha);
                           
                   

                        }
                  

                    } 

                    var num= Cont + 1;
                    setCont(num);
                    if(Cont === 1){
                      setCarreg(false); 
                    }          
                         
          }

          const ListandoApp = async ()=>{
                
            const cal11 = QuantApp/Limit;
            const cal12 = Math.trunc(cal11);
            const cal13 = cal12*10;
            const cal14 = QuantApp - cal13;
            if(Ofapp === cal13) {
                
                    const inicio = Ofapp;
                    const fim = QuantApp;
                    var Listarra =[];
                    for (var i = inicio; i < fim; i++) {
                      Listarra.push({
                        list:UsuarioApp[i],
                      });
                      setAppList(Listarra);
                    
              

                    }

            } else {

                    const inicio = Ofapp;
                    const fim = (Ofapp + Limit) 
                    var Listarra =[];
                    for (var i = inicio; i < fim; i++) {
                      Listarra.push({
                        list:UsuarioApp[i],
                      });
                      setAppList(Listarra);
                     
             

                  }
            

              } 

              var num1= ContApp + 1;
              setContApp(num1);
              if(ContApp === 1){
                setCarregApp(false); 
              }          
                   
    }

          function confirma() {
            setAlert(" ");
            setAlertTipo(" ");
            setPag2(false);
            setPag1(false);
           
          }
          function cancelar() {
            setAlert(" ");
            setAlertTipo(" ");
            setPag2(false);
            setPag1(false);
          }

          const Fechar = ()=>{
            setPag2(false);
            setPag1(false);
          }


          const MsgBloqueio = (id, nome)=>{
            setAlert("Ok");
            setAlertTipo("Bloqueio");
            setId(id);
            setNome(nome);
          }

          const Bloqueando = async ()=>{
            setAlert(" ");
            setAlertTipo(" ");
 
        if (navigator.onLine) {
          
           await Api.BloqueandoAppServ(Dados, Id, setAlertTipo, setAlert);

          
         } else {
           setAlert("Sem Internet");
           setAlertTipo("danger");
         }

      }

      const MsgDesbloqueio = (id, nome)=>{
        setAlert("Ok");
        setAlertTipo("Desbloqueio");
        setId(id);
        setNome(nome);
      }

      const Desbloqueando = async ()=>{
        setAlert(" ");
        setAlertTipo(" ");

    if (navigator.onLine) {
      
       await Api.DesbloqueandoAppServ(Dados, Id, setAlertTipo, setAlert);

      
     } else {
       setAlert("Sem Internet");
       setAlertTipo("danger");
     }

  }

  
                  const BloqueandoCont = async ()=>{
                    setAlert(" ");
                    setAlertTipo(" ");

                if (navigator.onLine) {
                  
                  await Api.BloqueandoContas(Dados, Id, setAlertTipo, setAlert);

                  
                } else {
                  setAlert("Sem Internet");
                  setAlertTipo("danger");
                }

                }
               


                

         

               const Pagina1 = (id, nome)=>{
                 setNome(nome)
                  setId(id);
                 setPag1(true);
               }

               const Pagina2 = async ()=>{
              

              }

               
               
      
  return (
        
          <div>
             {Alert !== " " && AlertTipo === "success" &&
                  <SweetAlert  success title={Alert} onConfirm={confirma} onCancel={cancelar} />
                }

            {Alert !== " " && AlertTipo === "danger" &&
                  <SweetAlert  danger title={Alert} confirmBtnBsStyle="danger" onConfirm={confirma} onCancel={cancelar} />
                }


            { Alert !== " " && AlertTipo === "Bloqueio" &&
              <SweetAlert
              warning
              showCancel
              confirmBtnText="Sim"
              cancelBtnText="Não"
              confirmBtnBsStyle="danger"
              onConfirm={Bloqueando}
              onCancel={cancelar}
              focusCancelBtn
            >
              Tem certeza que deseja Bloquear o App {Nome}!
            </SweetAlert>
            }

          { Alert !== " " && AlertTipo === "BloqueioCont" &&
              <SweetAlert
              warning
              showCancel
              confirmBtnText="Sim"
              cancelBtnText="Não"
              confirmBtnBsStyle="danger"
              onConfirm={BloqueandoCont}
              onCancel={cancelar}
              focusCancelBtn
            >
              Tem certeza que deseja Bloquear a conta {Nome}!
            </SweetAlert>
            }
            { Alert !== " " && AlertTipo === "Desbloqueio" &&
              <SweetAlert
              warning
              showCancel
              confirmBtnText="Sim"
              cancelBtnText="Não"
              confirmBtnBsStyle="danger"
              onConfirm={Desbloqueando}
              onCancel={cancelar}
              focusCancelBtn
            >
              Tem certeza que deseja Desbloquear o App {Nome}!
            </SweetAlert>
            }
            { Pag1 === false ?
            <div className="content-wrapper">
               
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
                        {Dados.grupo.menu.contas.listaContasServ.Ver === true &&
                    <div className="card card-info">
                    
                      <div className="card-header">
                      
                        <h3 className="card-title" style={{ marginBottom: "10px"}}>Lista Contas Serv  </h3> 

                      </div>
                        <div class="card-body table-responsive p-0">
                          <table class="table table-hover text-nowrap">
                            <thead>
                              <tr>
                                <th>Nome</th>
                                <th>Conta</th>
                                <th>Debloqueado</th>
                                
                                <th>Ações</th>
                              </tr>
                            </thead>
                            
                            { Lista[0].list ?
                            <tbody >
                            {Lista.map((item, key)=>(
                            
                            
                                    <tr key={item.list.id} style={{backgroundColor: item.list.desbloqueado=== false ?"#999":"#FFF"}} >
                                    <td>{item.list.nome}</td>
                                    <td>{item.list.conta}</td>
                                    <td>
                                      {item.list.desbloqueado===true ?
                                      <span style={{ fontSize: "13px" }}>Sim</span> 
                                      :
                                      <span style={{ color: "red", fontSize: "13px" }} >Não</span> 
                                    }                                   
                                                               
                                    </td>
                                   
                                    <td>
                                    
                                    {Dados.grupo.menu.contas.listaContasServ.btn_vizualizar === true &&
                                    <Butao 
                                    style={"btn btn-xs btn-info"}
                                    titulo={"Vizualizar"}
                                    onClick={()=>Pagina1(item.list.id, item.list.nome)}
                                    />
                                   
                                    }
                                                                        
                                                           
                                    </td>
                                  </tr>
                                 
                             ))}
                                </tbody> 
                                :
                                      <>
                                      { Carreg === true ?
                                        <Spinner 
                                        size={64}
                                        color={"#5d0bf7"}
                                        sizeUnit={'px'} 
                                        />
                                        :                                      
                                      <p style={{color:"red", margin:"20px"}}>Não existe Conta Cadastrada</p>
                                      }
                                      </>
                            }
                            
                            
                          </table>
                            <Pagination
                            limit={Limit} 
                            total={Quant} 
                            offset={Offset}
                            setOffset={setOffset}
                            />
                         </div>
                        </div>
                        }
                        </>
                        }
                    </section>       
               </div>
            </div>
          </section>
          {/* <section className="content">
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
                    <div className="card card-warning">
                    
                      <div className="card-header">
                      
                        <h3 className="card-title" style={{ marginBottom: "10px"}}>Lista de App Serv  </h3> 

                      </div>
                        <div class="card-body table-responsive p-0">
                          <table class="table table-hover text-nowrap">
                            <thead>
                              <tr>
                                <th>Nome</th>
                                <th>Telefone</th>
                                
                                <th>Desbloqueado</th>
                                
                                <th>Ações</th>
                              </tr>
                            </thead>
                            
                            { AppList[0].list ?
                            <tbody >
                            { AppList.map((item, key)=>(
                            
                            
                                    <tr key={item.list.id} style={{backgroundColor: item.list.desbloqueado=== false ?"#999":"#FFF"}} >
                                    <td>{item.list.nome}</td>
                                    <td>{item.list.telefone}</td>
                                   
                                    <td>
                                      {item.list.desbloqueado===true ?
                                      <span style={{ fontSize: "13px" }}>Sim</span> 
                                      :
                                      <span style={{ color: "red", fontSize: "13px" }} >Não</span> 
                                    }                                   
                                                               
                                    </td>
                                   
                                    <td>
                                    {item.list.desbloqueado===true ?
                                    <>
                                    {item.list.ativo===false &&
                                      <Butao 
                                      style={"btn btn-xs btn-danger"}
                                      titulo={"Bloquear"}
                                      onClick={()=>MsgBloqueio(item.list.id, item.list.nome)}
                                      />
                                    }                  
                                   </>
                                    :
                                    <Butao 
                                    style={"btn btn-xs btn-warning"}
                                    titulo={"Desbloquear"}
                                    onClick={()=>MsgDesbloqueio(item.list.id, item.list.nome)}
                                    />
                                     }
                                                                                                     
                                                           
                                    </td>
                                  </tr>
                                 
                             ))}
                                </tbody> 
                                :
                                      <>
                                      { CarregApp === true ?
                                        <Spinner 
                                        size={64}
                                        color={"#5d0bf7"}
                                        sizeUnit={'px'} 
                                        />
                                        :                                      
                                      <p style={{color:"red", margin:"20px"}}>Não existe App Cadastrado </p>
                                      }
                                      </>
                            }
                            
                            
                          </table>
                            <Pagination
                            limit={Limit} 
                            total={QuantApp} 
                            offset={Ofapp}
                            setOffset={setOfapp}
                            />
                         </div>
                        </div>
                        </>
                        }
                    </section>       
               </div>
            </div>
          </section> */}
        </div>
        :
        <>
        {Pag2 === false ?
          <VizualizarCont
          setAlert={setAlert}
          setAlertTipo={setAlertTipo}
          Avisando={Avisando}
          Fechar={Fechar}
          Dados={Dados}
          Id={Id}
            
            />
          :
         <>
         </>
        }
        </>
        
         }
      </div>

        );
    }

