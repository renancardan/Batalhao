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
import { ContactlessOutlined } from '@material-ui/icons';


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
      const [Patente, setPatente] = useState("");
      const [NomeGuerra, setNomeGuerra] = useState("");
      const [NomeComp, setNomeComp] = useState("");
      const [Tel, setTel] = useState("");
      const [VerNomeComp, setVerNomeComp] = useState(false);
      const [VerNomeGuerra, setVerNomeGuerra] = useState(false);
      const [VerPatente, setVerPatente] = useState(false);
      const [VerTel, setVerTel] = useState(false);
      const [TempAtiv, setTempAtiv] = useState(0);
      const [Varia, setVaria] = useState()
     
      useEffect(() => {
        LevarTemp();
    }, [])

    useEffect(() => {
      DesativoAltomatico();
  }, [])

      useEffect(() => {
       ListApp();     
      }, [])

      useEffect(() => {
       temporizador();
       }, [])

      useEffect(() => {
      
        Listando();   
       }, [UsuariosContServ])

       useEffect(() => {
        Listando();
       }, [Offset])

       const DesativoAltomatico = ()=>{
         Api.DesativandoAltoma();
       }
     
  
       const LevarTemp = async ()=>{
        await Api.VariacaoTemp();
        await Api.VarTempPegar(Dados, setVaria);
       }
     
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
          const temporizador = ()=>{
            let currentDate = '';
            let now =new Date();
              let Dia = now.getDate();
              let Mes = (now.getMonth()+1);
              let Ano = now.getFullYear();
              Dia = Dia < 10 ? '0'+Dia : Dia;
              Mes = Mes < 10 ? '0'+Mes : Mes;
              currentDate = Ano+'-'+Mes+'-'+Dia; 
              let Dat  = new Date(currentDate +" 08:00:00.000").getTime();
              let Dat2 = Dat + 86400000;
              setTempAtiv(Dat2);
          }
          const PesqNomComp = ()=>{
             
            if(NomeComp !== ""){
              setVerNomeComp(true);
           
            let listra2 = [];
            for(let i in UsuariosContServ ) {
            
                if( UsuariosContServ[i].nome.toLowerCase().includes(NomeComp.toLowerCase())  ) {
                  
                  listra2.push({
                    id: UsuariosContServ[i].id, 
                    nome: UsuariosContServ[i].nome,
                    ativo: UsuariosContServ[i].ativo, 
                    telefone: UsuariosContServ[i].telefone,
                    nomeGuerra:UsuariosContServ[i].nomeGuerra,
                    patente:UsuariosContServ[i].patente,
                    ativaPerman:UsuariosContServ[i].ativaPerman,
                    tempAtiva:UsuariosContServ[i].tempAtiva,
                });   
                }
               
              }
              
              setLista(["list"]);
              setQuant(listra2.length);
              setUsuariosContServ(listra2);

            }
          }
          const PesqNomGuerra = ()=>{
             
            if(NomeGuerra !== ""){
              setVerNomeGuerra(true);
           
            let listra2 = [];
            for(let i in UsuariosContServ ) {
            
                if( UsuariosContServ[i].nomeGuerra.toLowerCase().includes(NomeGuerra.toLowerCase())  ) {
                  
                  listra2.push({
                    id: UsuariosContServ[i].id, 
                    nome: UsuariosContServ[i].nome,
                    ativo: UsuariosContServ[i].ativo, 
                    telefone: UsuariosContServ[i].telefone,
                    nomeGuerra:UsuariosContServ[i].nomeGuerra,
                    patente:UsuariosContServ[i].patente,
                    ativaPerman:UsuariosContServ[i].ativaPerman,
                    tempAtiva:UsuariosContServ[i].tempAtiva,
                });   
                }
               
              }
              
              setLista(["list"]);
              setQuant(listra2.length);
              setUsuariosContServ(listra2);

            }
          }
          const PesqPatente = ()=>{
             
            if(Patente !== ""){
              setVerPatente(true);
           
            let listra2 = [];
            for(let i in UsuariosContServ ) {
            
                if( UsuariosContServ[i].patente.toLowerCase().includes(Patente.toLowerCase())  ) {
                  
                  listra2.push({
                    id: UsuariosContServ[i].id, 
                    nome: UsuariosContServ[i].nome,
                    ativo: UsuariosContServ[i].ativo, 
                    telefone: UsuariosContServ[i].telefone,
                    nomeGuerra:UsuariosContServ[i].nomeGuerra,
                    patente:UsuariosContServ[i].patente,
                    ativaPerman:UsuariosContServ[i].ativaPerman,
                    tempAtiva:UsuariosContServ[i].tempAtiva,
                });   
                }
               
              }
              
              setLista(["list"]);
              setQuant(listra2.length);
              setUsuariosContServ(listra2);

            }
          }

          const PesqTelefone = ()=>{
             
            if(Tel !== ""){
              setVerTel(true);
           
            let listra2 = [];
            for(let i in UsuariosContServ ) {
            
                if( UsuariosContServ[i].telefone.toLowerCase().includes(Tel)  ) {
                  
                  listra2.push({
                    id: UsuariosContServ[i].id, 
                    nome: UsuariosContServ[i].nome,
                    ativo: UsuariosContServ[i].ativo, 
                    telefone: UsuariosContServ[i].telefone,
                    nomeGuerra:UsuariosContServ[i].nomeGuerra,
                    patente:UsuariosContServ[i].patente,
                    ativaPerman:UsuariosContServ[i].ativaPerman,
                    tempAtiva:UsuariosContServ[i].tempAtiva,
                });   
                }
               
              }
              
              setLista(["list"]);
              setQuant(listra2.length);
              setUsuariosContServ(listra2);

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

          const LimpandoPesq = ()=>{
           setNomeGuerra("");
           setVerNomeGuerra(false);
           setNomeComp("");
           setVerNomeComp(false);
           setPatente("");
           setVerPatente(false);
           setTel("");
           setVerTel(false);
           ListApp();
          }

          const ativandopermanente = (id, nome)=>{
            setAlert("Ok");
            setAlertTipo("ativandosempre");
            setId(id);
            setNome(nome)
            // Api.AtivadoSempe();
          }

          const ativarPerm = ()=>{
            Api.AtivadoSempe(Id, Nome, Varia, setAlertTipo, setAlert);
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

                const MsgAtivarDiario = (id, nome)=>{
                  setAlert("Ok");
                  setAlertTipo("ativar");
                  setId(id);
                  setNome(nome);
                }
                const ativandoDiario = ()=>{
                  Api.AtivandoApp(Id, Nome, Varia,  TempAtiv, setAlertTipo, setAlert,);
                }

                const AtivandoLocali = (item)=>{
                  Api.AtivandoLoc(item, setAlertTipo, setAlert,);
                }
                const DesativandoLocali = (item)=>{
                  Api.DesativandoLoc(item, setAlertTipo, setAlert,);
                }
               
               
      
  return (
        
          <div>
             {Alert !== " " && AlertTipo === "success" &&
                  <SweetAlert  success title={Alert} onConfirm={confirma} onCancel={cancelar} />
                }

            {Alert !== " " && AlertTipo === "danger" &&
                  <SweetAlert  danger title={Alert} confirmBtnBsStyle="danger" onConfirm={confirma} onCancel={cancelar} />
                }

            { Alert !== " " && AlertTipo === "ativandosempre" &&
              <SweetAlert
              warning
              showCancel
              confirmBtnText="Sim"
              cancelBtnText="Não"
              confirmBtnBsStyle="danger"
              onConfirm={()=>ativarPerm()}
              onCancel={cancelar}
              focusCancelBtn
            >
              Tem certeza que deseja ativar o App dessa conta {Nome} para sempre!
            </SweetAlert>
            }
             { Alert !== " " && AlertTipo === "ativar" &&
              <SweetAlert
              warning
              showCancel
              confirmBtnText="Sim"
              cancelBtnText="Não"
              confirmBtnBsStyle="danger"
              onConfirm={()=>ativandoDiario()}
              onCancel={cancelar}
              focusCancelBtn
            >
              Tem certeza que deseja ativar o App dessa conta {Nome} durante 24 horas!
            </SweetAlert>
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
                         
                            {Dados.grupo.menu.aplicativos.filtros.Ver === true &&
                        <div className="card card-warning">
                    <div className="card-header">
                        <h3 className="card-title">Filtros para pesquisa</h3>
                    </div>
                    {/* /.card-header */}
                    <div className="card-body">
                    <div className="row" >
                   
                            <div className="col-sm-2">
                            <div className="form-group">
                                <label>Nome Completo</label>
                                <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Digite o Titulo "
                                value={NomeComp}
                                onChange={t=>setNomeComp(t.target.value)}
                                disabled={VerNomeComp}
                                onBlur={()=>PesqNomComp()}
                                />
                                
                              
                            </div>
                            </div>
                            <div className="col-sm-2">
                            <div className="form-group">
                                <label>Nome de Guerra</label>
                                <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Digite o Titulo "
                                value={NomeGuerra}
                                onChange={t=>setNomeGuerra(t.target.value)}
                                disabled={VerNomeGuerra}
                                onBlur={()=>PesqNomGuerra()}
                                />
                                
                              
                            </div>
                            </div>
                            <div className="col-sm-2">
                            <div className="form-group">
                                <label>Patente</label>
                                <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Digite o Titulo "
                                value={Patente}
                                onChange={t=>setPatente(t.target.value)}
                                disabled={VerPatente}
                                onBlur={()=>PesqPatente()}
                                />
                                
                              
                            </div>
                            </div>
                            {/* <div className="col-sm-2">
                            <div className="form-group">
                                <label>Telefone</label>
                                <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Digite aqui.... "
                                value={Tel}
                                onChange={t=>setTel(t.target.value)}
                                disabled={VerTel}
                                onBlur={()=>PesqTelefone()}
                                />
                            </div>
                            </div>   */}
                        
                        {Dados.grupo.menu.aplicativos.filtros.btn_pesquisa === true &&
                            <div className="col-sm-2" style={{marginTop:"35px"}}>
                            <div className="form-group">
                            <Butao 
                            style={"btn btn-sm btn-warning"}
                            titulo={"Pesquisar"}
                            onClick={null}
                            />
                            </div>
                            </div> 
                            }
                              {Dados.grupo.menu.aplicativos.filtros.btn_limpapesquisa === true &&
                            <div className="col-sm-2" style={{marginTop:"35px"}}>
                            <div className="form-group">
                            <Butao 
                            style={"btn btn-sm btn-secondary"}
                            titulo={"Limpar Pesquisa"}
                            onClick={()=>LimpandoPesq()}
                            />
                            </div>
                            </div> 
                              }
                            
                          
                                   
                    </div>
                    </div>
                       
                  
                   
                    </div>
                  }
                  {Dados.grupo.menu.aplicativos.listaAppServ.Ver === true &&
                    <div className="card card-info">
                      <div className="card-header">
                        <h3 className="card-title" style={{ marginBottom: "10px"}}>Lista AppServ Desbloqueados  </h3> 

                      </div>
                        <div class="card-body table-responsive p-0">
                          <table class="table table-hover text-nowrap">
                            <thead>
                              <tr>
                                <th>Nome</th>
                                <th>Nome De Guerra</th>
                                <th>Patente</th>
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
                                    <td>{item.list.nomeGuerra}</td>
                                    <td>{item.list.patente}</td>
                                    <td>{item.list.telefone}</td>
                                    <td>
                                      {item.list.ativo===true ?
                                      <>
                                      {item.list.ativaPerman === true &&
                                        <span style={{ fontSize: "13px" }}>Ativo Permanente</span> 
                                      }
                                      {item.list.tempAtiva !== 0 &&
                                        <span style={{ fontSize: "13px" }}>Ativo Por tempo</span> 
                                      }
                                      
                                      </>
                                      :
                                      <span style={{ color: "red", fontSize: "13px" }} >Desativo</span> 
                                    }                                   
                                                               
                                    </td>
                                   
                                    <td>
                                    
                                    {item.list.ativo===true ?
                                    <>
                                     {Dados.grupo.menu.aplicativos.listaAppServ.btn_vizualizar === true &&
                                    <Butao 
                                    style={"btn btn-xs btn-primary"}
                                    titulo={"Vizualizar"}
                                    onClick={()=>VizualizarConta(item.list.id, item.list.nome, item.list.telefone)}
                                    />
                                     }
                                      {Dados.grupo.menu.aplicativos.listaAppServ.btn_desativar === true &&
                                    <Butao 
                                      style={"btn btn-xs btn-secondary"}
                                      titulo={"Desativar"}
                                      onClick={()=>MsgDesativar(item.list.id, item.list.nome)}
                                      /> 
                                        }
                                          {item.list.LocAtiva=== false ? 
                                          <Butao 
                                      style={"btn btn-xs btn-warning"}
                                      titulo={"Ativar Posição"}
                                      onClick={()=>AtivandoLocali(item.list.id)}
                                      /> 
                                      :
                                      <Butao 
                                      style={"btn btn-xs btn-secondary"}
                                      titulo={"Desativar Posição"}
                                      onClick={()=>DesativandoLocali(item.list.id)}
                                      /> 
                                          }
                                      </>
                                      :
                                      <>
                                       {Dados.grupo.menu.aplicativos.listaAppServ.btn_ativar === true &&
                                      <Butao 
                                      style={"btn btn-xs btn-success"}
                                      titulo={"Ativar "}
                                      onClick={()=>ativandopermanente(item.list.id, item.list.nome)}
                                      /> 
                                       }
                                        {Dados.grupo.menu.aplicativos.listaAppServ.btn_ativarDiaria === true &&
                                      <Butao 
                                      style={"btn btn-xs btn-success"}
                                      titulo={"Ativação Diaria"}
                                      onClick={()=>MsgAtivarDiario(item.list.id, item.list.nome)}
                                      /> 
                                        }
                                         {Dados.grupo.menu.aplicativos.listaAppServ.btn_bloquear === true &&
                                      <Butao 
                                      style={"btn btn-xs btn-danger"}
                                      titulo={"Bloquear"}
                                      onClick={()=>MsgBloqueio(item.list.id, item.list.nome)}
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

