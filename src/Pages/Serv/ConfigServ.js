import React, { Component, useState, useEffect } from 'react';
import HeaderPage from '../../Components/HeaderPages';
import SweetAlert from 'react-bootstrap-sweetalert';
import { Spinner  } from "react-awesome-spinners";
import Aviso from '../../Components/Aviso';
import CaixaInforme from '../../Components/CaixaInforme';
import Butao from '../../Components/Butao_list';
import Select from '../../Components/Select';
import Campo from '../../Components/Campo';
import TextArea from '../../Components/TextArea';
import Pagination from '../../Components/Pagination';
import CriarGrupo from './CriarGrupo';
import EditarGrupo from './EditarGrupo';
import Api from '../../Api';



export default ({Dados, setDados, Loading,  setLoading,  Alert, setAlert, AlertTipo,
   setAlertTipo, Avisando, setAvisando}) => {
      const [Offset, setOffset] = useState(0);
      const [Limit, setLimit] = useState(10);
      const [Quant, setQuant] = useState(0);
      const [Pag1, setPag1] = useState(false);
      const [Pag2, setPag2] = useState(false);
      const [Titulo, setTitulo] = useState("Configurações");
      const [Time, setTime] = useState("")
      const [UsuariosContServ, setUsuariosContServ] = useState([]);
      const [Lista, setLista] = useState(["list"]);
      const [Carreg, setCarreg] = useState(false);
      const [Cont, setCont] = useState(0);
      const [Id, setId] = useState("");
      const [Nome, setNome] = useState("");
      const [Telefone, setTelefone] = useState("");
      const [Cor, setCor] = useState("Escolha a Cor ");
      const [Msg, setMsg] = useState("Enter...");
      const [IdAviso, setIdAviso] = useState("");
      const [ListCor, setListCor] = useState([
          {id:1, select:"Azul"},
          {id:2, select:"Vermelho"},
          {id:3, select:"Amarelo"},
          {id:4, select:"Verde"},

      ]);
      const [MsgApp, setMsgApp] = useState("Enter...");
      const [AvApp, setAvApp] = useState("");
      const [AppAvi, setAppAvi] = useState('')
      
      
      useEffect(() => {
        PegAvisando();    
       }, [Avisando])

       useEffect(() => {
        if(AvApp[0]){
          setMsgApp(AvApp[0].body);
        }
       }, [AvApp])
      

      useEffect(() => {
       ListApp();     
      }, [])

      useEffect(() => {
      AvisosAppPega();
       }, [])

      useEffect(() => {
      
        Listando();   
       }, [UsuariosContServ])

       useEffect(() => {
        Listando();
       }, [Offset])

       const AvisosAppPega = ()=>{
         Api.PegarAvisoApp(AvApp, setAvApp);
         
       }
     
       const CriandoTelefone = async ()=>{
        if(Telefone !=="" && Telefone  !==" " && Telefone  !=="  " && Telefone  !=="   " && Telefone  !=="    " && Telefone  !=="     " && Telefone  !=="      "
        && Telefone  !=="       " && Telefone  !=="        " && Telefone  !=="         " && Telefone  !=="          " 
        && Telefone  !=="           " ){

        if (navigator.onLine) {
         setCarreg(true);
          await Api.TelefoneCriar(Dados, Telefone, setAlert, setAlertTipo);
         
        } else {
          setAlert("Sem Internet");
          setAlertTipo("danger");
        }
    } else {
        setAlert("Campos Vazios!");
        setAlertTipo("danger");
    }
           
      }
  
     
          const ListApp = async ()=>{
            if (navigator.onLine) {
             setCarreg(true);
              await Api.ListTelefone(Dados, setQuant, setUsuariosContServ);
             
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

                const MsgDesativar = (id, telefone)=>{
                  setId(id);
                  setNome(telefone);
                  setAlert("Ok");
                  setAlertTipo("Desativar");
                  
                }

                const Desativar = async ()=>{
                 
                  setAlert(" ");
                  setAlertTipo(" ");
       
              if (navigator.onLine) {
                
                await Api.DesativandoTelefone(Dados, Id, setAlertTipo, setAlert);

                
               } else {
                 setAlert("Sem Internet");
                 setAlertTipo("danger");
               }


                }

                const MsgAtivar = (id, telefone)=>{
                  setId(id);
                  setNome(telefone);
                  setAlert("Ok");
                  setAlertTipo("ativar");
                  
                }

                const Ativar = async ()=>{
                 
                  setAlert(" ");
                  setAlertTipo(" ");
       
              if (navigator.onLine) {
                
                await Api.AtivandoTelefone(Dados, Id, setAlertTipo, setAlert);

                
               } else {
                 setAlert("Sem Internet");
                 setAlertTipo("danger");
               }


                }

                const MsgExcluir = (id, telefone)=>{
                  setId(id);
                  setNome(telefone);
                  setAlert("Ok");
                  setAlertTipo("Excluir");
                  
                }

                const Excluir = async ()=>{
                 
                  setAlert(" ");
                  setAlertTipo(" ");
       
              if (navigator.onLine) {
                
                await Api.ExcluirTelefone(Dados, Id, setAlertTipo, setAlert);

                
               } else {
                 setAlert("Sem Internet");
                 setAlertTipo("danger");
               }


                }

                const AtivarAviso = ()=>{
                    if(Cor !== "Escolha a Cor ") {
                        if (navigator.onLine) {
                
                            Api.AtivandoAviso(Dados, Msg, Cor, setAlertTipo, setAlert);
            
                            
                           } else {
                             setAlert("Sem Internet");
                             setAlertTipo("danger");
                           }
                    } else {
                        setAlert("Escolha uma cor");
                        setAlertTipo("danger");
                    }
                    
                   
                }

                const PegAvisando = ()=>{
                    if(Avisando[0]){
                      
                            setMsg(Avisando[0].frase);
                            setCor(Avisando[0].cor);
                            setIdAviso(Avisando[0].id);
                    }
                }

                const DesativarAviso = ()=>{
                    Api.DesativandoAviso(Dados, IdAviso, setAlertTipo, setAlert)
                }
                const CriarAvisoApp = ()=>{
                  Api.CriandoAvisoApp(Dados, MsgApp, setAlertTipo, setAlert );
                }
                const DesativarAvisoApp = async ()=>{
                 await  setAlert(" ");
                 await  setAlertTipo(" "); 
                await Api.DesativandoAvisoApp(AppAvi, setAlertTipo, setAlert)

                }

                const DesApp = (value)=>{
                  setAppAvi(value);
                  setAlert("ok");
                  setAlertTipo("DesativarApp");
                  
                }

    
      
  return (
        
          <div>
             {Alert !== " " && AlertTipo === "success" &&
                  <SweetAlert  success title={Alert} onConfirm={confirma} onCancel={cancelar} />
                }

            {Alert !== " " && AlertTipo === "danger" &&
                  <SweetAlert  danger title={Alert} confirmBtnBsStyle="danger" onConfirm={confirma} onCancel={cancelar} />
                }

               { Alert !== " " && AlertTipo === "DesativarApp" &&
              <SweetAlert
              warning
              showCancel
              confirmBtnText="Sim"
              cancelBtnText="Não"
              confirmBtnBsStyle="danger"
              onConfirm={()=>DesativarAvisoApp()}
              onCancel={cancelar}
              focusCancelBtn
            >
              Tem certeza que deseja Desativar o Aviso nos Apps dos Usuários
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
              Tem certeza que deseja Desativar o Telefone {Nome}
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
              Tem certeza que deseja ativar o Telefone {Nome}
            </SweetAlert>
            }
            { Alert !== " " && AlertTipo === "Excluir" &&
              <SweetAlert
              warning
              showCancel
              confirmBtnText="Sim"
              cancelBtnText="Não"
              confirmBtnBsStyle="danger"
              onConfirm={()=>Excluir()}
              onCancel={cancelar}
              focusCancelBtn
            >
              Tem certeza que deseja Excluir o Telefone {Nome}
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
                        
 {/* general form elements disabled */}
 {Dados.grupo.menu.configuracao.criarAvisoPm.Ver === true &&
<div className="card card-warning">
  <div className="card-header">
    <h3 className="card-title">Criar Avisos Para Polícia</h3>
  </div>
  {/* /.card-header */}
  <div className="card-body">
    
      <div className="row">
        <div className="col-sm-6">
          {/* textarea */}
          <div className="form-group">
            <label>Digite a Mensagem</label>
            
            <TextArea 
            placeholder={Msg}
            value={Msg}
            onChange={e=>setMsg(e.target.value)}
            />
            </div>
         
        </div>
        <div className="col-sm-6">
          <div className="form-group">
            <label>Cor do aviso:</label>
            <div style={{height:"50px", width:"500px", display:"flex",  justifyContent:"space-between" }}>
            <div style={{marginLeft:"10px", width:"200px"}}>
                    <Select 
                        type={null}
                        placeholder={Cor}
                        icon={"fas "}
                        value={Cor}
                        onChange={e=>setCor(e.target.value)}
                        List={ListCor}
                        />
                        <br />
                
             </div>
             <div style={{marginTop:"4px",width:"250px"}}>
                 {Avisando[0] ?
                 <>
                 {Avisando[0].ativo === true ?
                 <>
                 {Dados.grupo.menu.configuracao.criarAvisoPm.btn_desativar === true &&
                    <Butao 
                    style={"btn btn-sm btn-secondary"}
                    titulo={"Desativar"}
                    onClick={()=>DesativarAviso()}
                    />
                 }
                    </>
                    :
                    
                    <>
                    {Dados.grupo.menu.configuracao.criarAvisoPm.btn_ativar === true &&
                    <Butao 
                    style={"btn btn-sm btn-warning"}
                    titulo={"Ativar"}
                    onClick={()=>AtivarAviso()}
                    />
                      }
                    </>
                 }
                 </>
                 :
                 <Butao 
                 style={"btn btn-sm btn-success"}
                 titulo={"Criar Aviso"}
                 onClick={()=>AtivarAviso()}
                 />
                 }
                        
                        </div>
                        </div>
          </div>
        </div>
      </div>
    
  </div>
  {/* /.card-body */}
</div>
   }
{/* /.card */}
{/* general form elements disabled */}
{Dados.grupo.menu.configuracao.criarAvisoApp.Ver === true &&
<div className="card card-success">
  <div className="card-header">
    <h3 className="card-title">Criar Avisos Para o App Cliente</h3>
  </div>
  {/* /.card-header */}
  <div className="card-body">
    
      <div className="row">
        <div className="col-sm-6">
          {/* textarea */}
          <div className="form-group">
            <label>Digite a Mensagem</label>
            
            <TextArea 
            placeholder={MsgApp}
            value={MsgApp}
            onChange={e=>setMsgApp(e.target.value)}
            />
            </div>
         
        </div>
        <div className="col-sm-6">
          <div className="form-group">
            
            <div style={{height:"50px", width:"500px", display:"flex",  justifyContent:"center" }}>
         
             <div style={{marginTop:"4px",width:"250px"}}>

                 {AvApp[0] ?
                 <>
                 { AvApp[0].ativo === true ?
                 <>
                 {Dados.grupo.menu.configuracao.criarAvisoApp.btn_desativar === true &&
                    <Butao 
                    style={"btn btn-sm btn-secondary"}
                    titulo={"Desativar"}
                    onClick={()=>DesApp(AvApp[0].id)}
                    />
                 }
                   </>
                    :
                    <>
                      {Dados.grupo.menu.configuracao.criarAvisoApp.btn_ativar === true &&
                    <Butao 
                    style={"btn btn-sm btn-warning"}
                    titulo={"Ativar"}
                    onClick={()=>CriarAvisoApp()}
                    />
                      }
                    </>
                 }  
                   </>
                   :
                   <Butao 
                   style={"btn btn-sm btn-warning"}
                   titulo={"Ativar"}
                   onClick={()=>CriarAvisoApp()}
                   />
                 }
                
                        
                        </div>
                        </div>
          </div>
        </div>
      </div>
    
  </div>
  {/* /.card-body */}
</div>
   }
                  {Dados.grupo.menu.configuracao.ListaTelefone.Ver === true &&
                    <div className="card card-info">
                        <strong style={{marginTop:"10px", marginLeft:"10px"}}>Cadastre um Telefone:</strong><br />
                        <div style={{height:"50px", width:"500px", display:"flex",  justifyContent:"space-between" }}>
                        <div style={{marginLeft:"10px", width:"200px"}}>
                        
                        <Campo 
                        type={"telefone"}
                        placeholder={"Digite um Telefone"}
                        icon={"fas"}
                        value={Telefone}
                        onChange={e=>setTelefone(e.target.value)}
                        mask={"(99) 99999-9999"}
                        />
                        </div>
                        <div style={{marginTop:"4px",width:"250px"}}>
                        {Dados.grupo.menu.configuracao.ListaTelefone.btn_cadastrarTele === true &&
                        <Butao 
                        style={"btn btn-sm btn-success"}
                        titulo={"Cadastrar Telefone"}
                        onClick={()=>CriandoTelefone()}
                        />
                          }
                        </div>
                        </div>
                               
                    
                      <div className="card-header">
                      
                        <h3 className="card-title" style={{ marginBottom: "10px"}}>Lista de Telefones </h3> 

                      </div>
                        <div class="card-body table-responsive p-0">
                          <table class="table table-hover text-nowrap">
                            <thead>
                              <tr>
                                <th>Numero</th>
                                
                               
                                
                                <th>Ações</th>
                              </tr>
                            </thead>
                            
                            { Lista[0].list ?
                            <tbody >
                            {Lista.map((item, key)=>(
                            
                            
                                    <tr key={item.list.id} style={{backgroundColor: item.list.ativo=== false ?"#999":"#FFF"}} >
                                    <td>{item.list.numero}</td>                           
                                    <td>
                                   {item.list.ativo=== false ?
                                   <>
                                   {Dados.grupo.menu.configuracao.ListaTelefone.btn_desbloquear === true &&
                                    <Butao 
                                    style={"btn btn-xs btn-warning"}
                                    titulo={"Ativar"}
                                    onClick={()=>MsgAtivar(item.list.id, item.list.numero)}
                                    />
                                   }
                                    </>
                                   :
                                   <>
                                   {Dados.grupo.menu.configuracao.ListaTelefone.btn_bloquear === true &&
                                   <Butao 
                                   style={"btn btn-xs btn-secondary"}
                                   titulo={"Desativar"}
                                   onClick={()=>MsgDesativar(item.list.id, item.list.numero)}
                                   />
                                    }
                                   </>
                                   } 
                                    {Dados.grupo.menu.configuracao.ListaTelefone.btn_excluir === true &&
                                   <Butao 
                                   style={"btn btn-xs btn-danger"}
                                   titulo={"Excluir"}
                                   onClick={()=>MsgExcluir(item.list.id, item.list.numero)}
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
                                      <p style={{color:"red", margin:"20px"}}>Não existe Telefone Cadastrado </p>
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
          <CriarGrupo
          setAlert={setAlert}
          setAlertTipo={setAlertTipo}
          Avisando={Avisando}
          Fechar={Fechar}
          Dados={Dados}
          Id={Id}
          Nome={Nome}
            
            />
          :
          <EditarGrupo 
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

