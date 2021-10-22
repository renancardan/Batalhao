import React, { Component, useState, useEffect } from 'react';
import HeaderPage from '../../Components/HeaderPages';
import SweetAlert from 'react-bootstrap-sweetalert';
import { Spinner  } from "react-awesome-spinners";
import Aviso from '../../Components/Aviso';
import CaixaInforme from '../../Components/CaixaInforme';
import Butao from '../../Components/Butao_list';
import Select from '../../Components/Select';
import Pagination from '../../Components/Pagination';
import CriarCond from './CriarCondicional';
import EditarCond from './EditarCondicional';
import Api from '../../Api';


export default ({Dados, setDados, Loading,  setLoading,  Alert, setAlert, AlertTipo,
   setAlertTipo, Avisando, setAvisando}) => {
      const [Offset, setOffset] = useState(0);
      const [Limit, setLimit] = useState(10);
      const [Quant, setQuant] = useState(0);
      const [Pag1, setPag1] = useState(false);
      const [Pag2, setPag2] = useState(false);
      const [Titulo, setTitulo] = useState("Condicionais");
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
              await Api.ListCondicionais(Dados, setQuant, setUsuariosContServ);
             
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


               
               


                

         

               const Pagina1 = ()=>{
                 setPag1(true);
               }

               const Pagina2 = async (id , nome)=>{
                await setId(id);
                await setNome(nome);
                await setPag1(true);
                await setPag2(true);

              }

                const MsgDesativar = (id, nome)=>{
                  setId(id);
                  setNome(nome);
                  setAlert("Ok");
                  setAlertTipo("Desativar");
                  
                }

                const Desativar = async ()=>{
                 
                  setAlert(" ");
                  setAlertTipo(" ");
       
              if (navigator.onLine) {
                
                await Api.DesativandoCondicional(Dados, Id, setAlertTipo, setAlert);

                
               } else {
                 setAlert("Sem Internet");
                 setAlertTipo("danger");
               }


                }

                const MsgAtivar = (id, nome)=>{
                  setId(id);
                  setNome(nome);
                  setAlert("Ok");
                  setAlertTipo("ativar");
                  
                }

                const Ativar = async ()=>{
                 
                  setAlert(" ");
                  setAlertTipo(" ");
       
              if (navigator.onLine) {
                
                await Api.AtivandoCondicional(Dados, Id, setAlertTipo, setAlert);

                
               } else {
                 setAlert("Sem Internet");
                 setAlertTipo("danger");
               }


                }
               
      
  return (
        
          <div>
             {Alert !== " " && AlertTipo === "success" &&
                  <SweetAlert  success title={Alert} onConfirm={confirma} onCancel={cancelar} />
                }

            {Alert !== " " && AlertTipo === "danger" &&
                  <SweetAlert  danger title={Alert} confirmBtnBsStyle="danger" onConfirm={confirma} onCancel={cancelar} />
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
              Tem certeza que deseja Desativar a condicional {Nome}!
            </SweetAlert>
            }
            { Alert !== " " && AlertTipo === "ativar" &&
              <SweetAlert
              warning
              showCancel
              confirmBtnText="Sim"
              cancelBtnText="Não"
              confirmBtnBsStyle="danger"
              onConfirm={()=>Ativar()}
              onCancel={cancelar}
              focusCancelBtn
            >
              Tem certeza que deseja ativar a condicional {Nome}!
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
                        {Dados.grupo.menu.condicionais.listaCondicionais.Ver === true &&
                    <div className="card card-warning">
                      {Dados.grupo.menu.condicionais.listaCondicionais.btn_criarCondicional === true &&
                        <div style={{margin:"10px", width:"250px"}}>
                        <Butao 
                        style={"btn btn-sm btn-success"}
                        titulo={"Criar Condicionais"}
                        onClick={()=>Pagina1()}
                        />

                        </div>
                      }
                      <div className="card-header">
                      
                        <h3 className="card-title" style={{ marginBottom: "10px"}}>Lista de Condicionais  </h3> 

                      </div>
                        <div class="card-body table-responsive p-0">
                          <table class="table table-hover text-nowrap">
                            <thead>
                              <tr>
                                <th>Nome</th>
                                
                                <th>Ativo</th>
                                
                                <th>Ações</th>
                              </tr>
                            </thead>
                            
                            { Lista[0].list ?
                            <tbody >
                            {Lista.map((item, key)=>(
                            
                            
                                    <tr key={item.list.id} style={{backgroundColor: item.list.ativo=== false ?"#F4B0B9":"#FFF"}} >
                                    <td>{item.list.nome}</td>
                                   
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
                                  {Dados.grupo.menu.condicionais.listaCondicionais.btn_editar === true &&
                                    <Butao 
                                    style={"btn btn-xs btn-success"}
                                    titulo={"Editar"}
                                    onClick={()=>Pagina2(item.list.id, item.list.nome)}
                                    />
                                      }
                                      {Dados.grupo.menu.condicionais.listaCondicionais.btn_desativar === true &&
                                    <Butao 
                                      style={"btn btn-xs btn-secondary"}
                                      titulo={"Desativar"}
                                      onClick={()=>MsgDesativar(item.list.id, item.list.nome)}
                                      />
                                      } 
                                      </>
                                      :
                                      <>
                                      {Dados.grupo.menu.condicionais.listaCondicionais.btn_editar === true &&
                                      <Butao 
                                      style={"btn btn-xs btn-success"}
                                      titulo={"Editar"}
                                      onClick={()=>Pagina2(item.list.id, item.list.nome)}
                                      /> 
                                      }
                                      {Dados.grupo.menu.condicionais.listaCondicionais.btn_ativar === true && 
                                      <Butao 
                                      style={"btn btn-xs btn-warning"}
                                      titulo={"Ativar"}
                                      onClick={()=>MsgAtivar(item.list.id, item.list.nome)}
                                      /> 
                                      }
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
                        }
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
          <CriarCond
          setAlert={setAlert}
          setAlertTipo={setAlertTipo}
          Avisando={Avisando}
          Fechar={Fechar}
          Dados={Dados}
          Id={Id}
          Nome={Nome}
            
            />
          :
          <EditarCond 
            setAlert={setAlert}
            setAlertTipo={setAlertTipo}
            Avisando={Avisando}
            Fechar={Fechar}
            Dados={Dados}
            Id={Id}
            Nome={Nome}
            />
        }
        
        </>
   
         }
      </div>

        );
    }

