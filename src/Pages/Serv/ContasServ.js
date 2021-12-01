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
      
      const [Patente, setPatente] = useState("");
      const [NomeGuerra, setNomeGuerra] = useState("");
      const [NomeComp, setNomeComp] = useState("");
      const [Tel, setTel] = useState("");
      const [VerNomeComp, setVerNomeComp] = useState(false);
      const [VerNomeGuerra, setVerNomeGuerra] = useState(false);
      const [VerPatente, setVerPatente] = useState(false);
      const [VerTel, setVerTel] = useState(false);
      

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

          const LimpandoPesq = ()=>{
            setNomeGuerra("");
            setVerNomeGuerra(false);
            setNomeComp("");
            setVerNomeComp(false);
            setPatente("");
            setVerPatente(false);
            setTel("");
            setVerTel(false);
            ListConta();
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
    const PesqNomComp = ()=>{
             
      if(NomeComp !== ""){
        setVerNomeComp(true);
     
      let listra2 = [];
      for(let i in UsuariosContServ ) {
      
          if( UsuariosContServ[i].nome.toLowerCase().includes(NomeComp.toLowerCase())  ) {
            
            listra2.push({
              id: UsuariosContServ[i].id, 
              nome: UsuariosContServ[i].nome,
              desbloqueado: UsuariosContServ[i].desbloqueado, 
              nomeGuerra:UsuariosContServ[i].nomeGuerra,
              patente:UsuariosContServ[i].patente,
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
              desbloqueado: UsuariosContServ[i].desbloqueado, 
              nomeGuerra:UsuariosContServ[i].nomeGuerra,
              patente:UsuariosContServ[i].patente,
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
              desbloqueado: UsuariosContServ[i].desbloqueado, 
              nomeGuerra:UsuariosContServ[i].nomeGuerra,
              patente:UsuariosContServ[i].patente,
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
                        
                            
                            <div className="col-sm-2" style={{marginTop:"35px"}}>
                            <div className="form-group">
                            <Butao 
                            style={"btn btn-sm btn-warning"}
                            titulo={"Pesquisar"}
                            onClick={null}
                            />
                            </div>
                            </div> 
                            <div className="col-sm-2" style={{marginTop:"35px"}}>
                            <div className="form-group">
                            <Butao 
                            style={"btn btn-sm btn-secondary"}
                            titulo={"Limpar Pesquisa"}
                            onClick={()=>LimpandoPesq()}
                            />
                            </div>
                            </div> 
                            
                          
                                   
                    </div>
                    </div>
                       
                  
                    {/* /.card-body */}
                    </div>
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
                                <th>Nome De Guerra</th>
                                <th>Patente</th>
                                <th>Debloqueado</th>
                                
                                <th>Ações</th>
                              </tr>
                            </thead>
                            
                            { Lista[0].list ?
                            <tbody >
                            {Lista.map((item, key)=>(
                            
                            
                                    <tr key={item.list.id} style={{backgroundColor: item.list.desbloqueado=== false ?"#999":"#FFF"}} >
                                    <td>{item.list.nome}</td>
                                    <td>{item.list.nomeGuerra}</td>
                                    <td>{item.list.patente}</td>
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

