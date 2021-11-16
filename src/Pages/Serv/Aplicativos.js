import React, { Component, useState, useEffect } from 'react';
import HeaderPage from '../../Components/HeaderPages';
import SweetAlert from 'react-bootstrap-sweetalert';
import { Spinner  } from "react-awesome-spinners";
import Aviso from '../../Components/Aviso';
import CaixaInforme from '../../Components/CaixaInforme';
import Butao from '../../Components/Butao_list';
import Select from '../../Components/Select';
import Pagination from '../../Components/Pagination';
import Vizualizacao from './VizualizarApp';
import AtivarApp from './AtivarApp';
import Api from '../../Api';


export default ({Dados, setDados, Loading,  setLoading,  Alert, setAlert, AlertTipo,
   setAlertTipo, Avisando, setAvisando}) => {
      const [Offset, setOffset] = useState(0);
      const [Limit, setLimit] = useState(10);
      const [Quant, setQuant] = useState(0);
      const [Pag1, setPag1] = useState(false);
      const [Pag2, setPag2] = useState(false);
      const [Titulo, setTitulo] = useState("Aplicativos");
      const [Time, setTime] = useState("")
      const [UsuariosContServ, setUsuariosContServ] = useState([]);
      const [Lista, setLista] = useState(["list"]);
      const [Carreg, setCarreg] = useState(false);
      const [Cont, setCont] = useState(0);
      const [Id, setId] = useState("");
      const [Nome, setNome] = useState("");
      const [Telefone, setTelefone] = useState("");
     

      useEffect(() => {
       ListApp();     
      }, [])

      useEffect(() => {
       
       }, [Lista])

      useEffect(() => {
      
        Listando();   
       }, [UsuariosContServ])

       useEffect(() => {
        Listando();
       }, [Offset])
     
    
  
     
          const ListApp = async ()=>{
            if (navigator.onLine) {
             setCarreg(true);
              await Api.ListServApp(Dados, setQuant, setUsuariosContServ, setCarreg );
             
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


                const VizualizarConta=(id, nome, telefone)=> {
                 
                  setId(id);
                  setNome(nome);
                  setTelefone(telefone);
                  setPag1(true);
                }

                const PagAtivar =async (id, nome, telefone) => {
                  await setId(id);
                  await setNome(nome);
                  await setTelefone(telefone);
                  await setPag1(true);
                  await setPag2(true);
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

                const Desativar = async ()=>{
                 
                  setAlert(" ");
                  setAlertTipo(" ");
       
              if (navigator.onLine) {
                
                await Api.DesativandoApp(Dados, Id, setAlertTipo, setAlert);

                
               } else {
                 setAlert("Sem Internet");
                 setAlertTipo("danger");
               }

                }

                const MsgBloqueio = (id, nome)=>{
                  setAlert("Ok");
                  setAlertTipo("Bloqueio");
                  setId(id);
                  setNome(nome);
                }

                const MsgDesativar = (id, nome)=>{
                  setAlert("Ok");
                  setAlertTipo("Desativar");
                  setId(id);
                  setNome(nome);
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
              onConfirm={()=>Bloqueando()}
              onCancel={cancelar}
              focusCancelBtn
            >
              Tem certeza que deseja Bloquear o App {Nome}!
            </SweetAlert>
            }
            { Alert !== " " && AlertTipo === "Desativar" &&
              <SweetAlert
              warning
              showCancel
              confirmBtnText="Sim"
              cancelBtnText="Não"
              confirmBtnBsStyle="danger"
              onConfirm={()=>Desativar()}
              onCancel={cancelar}
              focusCancelBtn
            >
              Tem certeza que deseja Desativar o App {Nome}!
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
                    <div className="card card-info">
                      <div className="card-header">
                        <h3 className="card-title" style={{ marginBottom: "10px"}}>Lista AppServ Desbloqueados  </h3> 

                      </div>
                        <div class="card-body table-responsive p-0">
                          <table class="table table-hover text-nowrap">
                            <thead>
                              <tr>
                                <th>Nome</th>
                                <th>Telefone</th>
                                <th>Ativo</th>
                                
                                <th>Ações</th>
                              </tr>
                            </thead>
                            
                            { Lista[0].list ?
                            <tbody >
                            {Lista.map((item, key)=>(
                            
                            
                                    <tr key={item.list.id} style={{backgroundColor: item.list.ativo=== false ?"#F4B0B9":"#FFF"}} >
                                    <td>{item.list.nome}</td>
                                    <td>{item.list.telefone}</td>
                                    <td>
                                      {item.list.ativo===true ?
                                      <span style={{ fontSize: "13px" }}>Ativo</span> 
                                      :
                                      <span style={{ color: "red", fontSize: "13px" }} >Desativo</span> 
                                    }                                   
                                                               
                                    </td>
                                   
                                    <td>
                                    
                                    {item.list.ativo===true ?
                                    <>
                                    <Butao 
                                    style={"btn btn-xs btn-primary"}
                                    titulo={"Vizualizar"}
                                    onClick={()=>VizualizarConta(item.list.id, item.list.nome, item.list.telefone)}
                                    />
                                    <Butao 
                                      style={"btn btn-xs btn-secondary"}
                                      titulo={"Desativar"}
                                      onClick={()=>MsgDesativar(item.list.id, item.list.nome)}
                                      /> 
                                      </>
                                      :
                                      <>
                                      <Butao 
                                      style={"btn btn-xs btn-success"}
                                      titulo={"Ativar"}
                                      onClick={()=>PagAtivar(item.list.id, item.list.nome, item.list.telefone)}
                                      /> 
                                      <Butao 
                                      style={"btn btn-xs btn-danger"}
                                      titulo={"Bloquear"}
                                      onClick={()=>MsgBloqueio(item.list.id, item.list.nome)}
                                      />   
                                      </>
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
                                      <p style={{color:"red", margin:"20px"}}>Não existe App Cadastrado ou Desbloqueado</p>
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
                        </>
                        }
                    </section>       
               </div>
            </div>
          </section>
        </div>
        :
        <>
        {Pag2 === false ?
          <Vizualizacao 
          setAlert={setAlert}
          setAlertTipo={setAlertTipo}
          Avisando={Avisando}
          Fechar={Fechar}
          Dados={Dados}
          Id={Id}
          Nome={Nome}
          Telefone={Telefone}
          MsgDesativar={MsgDesativar}
            
            />
          :
          <AtivarApp 
            setAlert={setAlert}
            setAlertTipo={setAlertTipo}
            Avisando={Avisando}
            Fechar={Fechar}
            Dados={Dados}
            Id={Id}
            Nome={Nome}
            Telefone={Telefone}
            />
        }
        </>
        
         }
      </div>

        );
    }

