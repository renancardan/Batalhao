import React, { Component, useState, useEffect } from 'react';
import HeaderPage from '../../Components/HeaderPages';
import SweetAlert from 'react-bootstrap-sweetalert';
import { Spinner  } from "react-awesome-spinners";
import Aviso from '../../Components/Aviso';
import CaixaInforme from '../../Components/CaixaInforme';
import Butao from '../../Components/Butao_list';
import Select from '../../Components/Select';
import Pagination from '../../Components/Pagination';
import CriarGrupo from './CriarGrupo';
import VizualizaOc from './VizualizarOcorr';
import EditOc from './EditarOcrr';
import DataTime from '../../Components/DateFormat';
import Api from '../../Api';
import 'moment/locale/pt-br.js';
import { DatePicker, DatePickerInput } from 'rc-datepicker';
import CriarNoti from './CriarNoti';
import Vizuali from './VizualizarNoti';
import EditarNoti from './EditarNoti';
import 'rc-datepicker/lib/style.css';


export default ({Dados, setDados, Loading,  setLoading,  Alert, setAlert, AlertTipo,
   setAlertTipo, Avisando, setAvisando}) => {
      const [Offset, setOffset] = useState(0);
      const [Limit, setLimit] = useState(10);
      const [Quant, setQuant] = useState(0);
      const [Pag1, setPag1] = useState(false);
      const [Pag2, setPag2] = useState(false);
      const [Pag3, setPag3] = useState(false);
      const [Titulo, setTitulo] = useState("Notícias");
      const [Time, setTime] = useState("")
      const [UsuariosContServ, setUsuariosContServ] = useState([]);
      const [Lista, setLista] = useState(["list"]);
      const [Carreg, setCarreg] = useState(false);
      const [Cont, setCont] = useState(0);
      const [Id, setId] = useState("");
      const [Nome, setNome] = useState("");
      const [Telefone, setTelefone] = useState("");
      const [DataP, setDataP] = useState(new Date());
      const [DataA, setDataA] = useState(new Date());
      const [VerA, setVerA] = useState(false);
      const [VerD, setVerD] = useState(false);
      const [Resu, setResu] = useState("");
      const [VerResu, setVerResu] = useState(false);
      const [Rua, setRua] = useState("");
  
      const [TituNoti, setTituNoti] = useState("");
      const [Vertito, setVertito] = useState("");
      const [Text, setText] = useState("");
      const [VerText, setVerText] = useState(false);
      const [QuantVis, setQuantVis] = useState(0);

     

      useEffect(() => {
       ListOc();     
      }, [])

      useEffect(() => {
       
          contandoVisita();
    
       }, [Lista])

      useEffect(() => {
        Listando();
       
       }, [UsuariosContServ])

       useEffect(() => {
        Listando();
       }, [Offset])

     

     
      
  
     
          const ListOc = async ()=>{
            if (navigator.onLine) {
             await setCarreg(true);
              await Api.ListNoti(Dados, setQuant, setUsuariosContServ, setCarreg);
             
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
            setPag3(false);
          }


               
               


                

         

               const Pagina1 = ()=>{
                setPag1(true);
               }

               const Pagina2 = async (id)=>{
                setId(id);
                setPag1(true);
                setPag2(true);

              }

              const Pagina3 = async (id)=>{
                setId(id);
                setPag1(true);
                setPag2(true);
                setPag3(true);

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

                const date = new Date() // or Date or Moment.js

           

            const DatandoA = (jsDate, dateString)=>{
              let currentDate = '';
              let now =new Date(jsDate);
              let Dia = now.getDate();
              let Mes = (now.getMonth()+1);
              let Ano = now.getFullYear();
              Dia = Dia < 10 ? '0'+Dia : Dia;
              Mes = Mes < 10 ? '0'+Mes : Mes;
              currentDate = Ano+'-'+Mes+'-'+Dia;
              let variac = new Date(currentDate +"T00:00:00.000").getTime();
              setDataA(variac) 
              setVerA(true)  
              setDataP(jsDate)
            }

           

            const LimpandoPesq = ()=>{
              setDataP(new Date());
              setDataA(new Date());
              setVerD(false);
              setVerA(false);
              ListOc();
              setTituNoti("");
              setVertito(false);
              setText("");
              setVerText(false);
            }

            const contandoVisita = ()=>{
              let cont=0;
              if(Lista[0].list ){
              for(let i in Lista ) {
                cont += Lista[i].list.visitas
              }
            }
              setQuantVis(cont);
            }


            const datando = async (jsDate, dateString)=>{
              setDataP(jsDate)
              let currentDate = '';
              let now =new Date(jsDate);
              let Dia = now.getDate();
              let Mes = (now.getMonth()+1);
              let Ano = now.getFullYear();
              Dia = Dia < 10 ? '0'+Dia : Dia;
              Mes = Mes < 10 ? '0'+Mes : Mes;
              currentDate = Ano+'-'+Mes+'-'+Dia;
              let Dat  = new Date(currentDate +"T00:00:00.000").getTime();
              if(DataA > Dat){
                setVerD(true);
                let listanha = [];
                for(let i in UsuariosContServ ) {
                  
                  if( UsuariosContServ[i].dateNoti >= Dat ) {
                    if( UsuariosContServ[i].dateNoti <= DataA ) {
                      listanha.push({
                        id: UsuariosContServ[i].id, 
                        dateNoti: UsuariosContServ[i].dateNoti,
                        ativo: UsuariosContServ[i].ativo, 
                        body: UsuariosContServ[i].body,
                        titulo:UsuariosContServ[i].titulo,
                        visitas:UsuariosContServ[i].visitas,  
                    });   
                    }
                   
                  }
                 
              }
              await setLista(["list"]);
              await  setQuant(listanha.length);
              await setUsuariosContServ(listanha);

              } else {
                setAlert("A data Depois tem que ser menor que a de Antes");
                setAlertTipo("danger");
              }
             
          }

            

   

            const PesqText = ()=>{
             
              if(Text !== ""){
                setVerText(true);
             
              let listra2 = [];
              for(let i in UsuariosContServ ) {
              
                  if( UsuariosContServ[i].body.toLowerCase().includes(Text.toLowerCase())  ) {
                    
                    listra2.push({
                      id: UsuariosContServ[i].id, 
                      dateNoti: UsuariosContServ[i].dateNoti,
                      ativo: UsuariosContServ[i].ativo, 
                      body: UsuariosContServ[i].body,
                      titulo:UsuariosContServ[i].titulo,
                      visitas:UsuariosContServ[i].visitas,
                  });   
                  }
                 
                }
                
                setLista(["list"]);
                setQuant(listra2.length);
                setUsuariosContServ(listra2);

              }
            }


            const PesqTitulo = ()=>{
              if(TituNoti !== ""){
                setVertito(true);
             
              let listra2 = [];
              for(let i in UsuariosContServ ) {
              
                  if( UsuariosContServ[i].titulo.toLowerCase().includes(TituNoti.toLowerCase())  ) {
                    
                    listra2.push({
                      id: UsuariosContServ[i].id, 
                      dateNoti: UsuariosContServ[i].dateNoti,
                      ativo: UsuariosContServ[i].ativo, 
                      body: UsuariosContServ[i].body,
                      titulo:UsuariosContServ[i].titulo,
                      visitas:UsuariosContServ[i].visitas,
                  });   
                  }
                 
                }
                
                setLista(["list"]);
                setQuant(listra2.length);
                setUsuariosContServ(listra2);

              }
              
            }

            const Desativando = (id)=>{
              Api.DesativarNoti(id,  setAlertTipo, setAlert);
            }

            const Ativando = (id)=>{
              Api.AtivarNoti(id,  setAlertTipo, setAlert);
            }

            const MsgExcluir = (id, Titulo)=>{
              
              setAlert("Ok");
              setAlertTipo("Excluir");
              setNome(Titulo)
              setId(id);
            }

            const Excluindo = ()=>{
              
              Api.ExcluirNoti(Id, setAlertTipo, setAlert)
            }

                   
               
      
  return (
        
          <div>
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
              onConfirm={()=>Excluindo()}
              onCancel={cancelar}
              focusCancelBtn
            >
              Tem certeza que deseja Excluir a Notícia {Nome}!
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
                      <CaixaInforme 
                      cor={"small-box bg-success"}
                      valor={Quant}
                      porcentagen={false}
                      nome={"Quant. Notícias"}
                      icon={"nav-icon fas fa-newspaper"}
                      link={false}
                      
                      />
                       <CaixaInforme 
                      cor={"small-box bg-warning"}
                      valor={QuantVis}
                      porcentagen={false}
                      nome={"Visitas"}
                      icon={"ion ion-person-add" }
                      link={false}
                      />
                       {/* <CaixaInforme 
                      cor={"small-box bg-danger"}
                      valor={QuantVis}
                      porcentagen={false}
                      nome={"Visitas"}
                      icon={"ion ion-pie-graph"}
                      link={false}
                      />               */}
                      {/* <CaixaInforme 
                      cor={"small-box bg-success"}
                      valor={"53"}
                      porcentagen={true}
                      nome={"Rendimentos"}
                      icon={"ion ion-stats-bars"}
                      link={false}
                      />
                      <CaixaInforme 
                      cor={"small-box bg-warning"}
                      valor={"44"}
                      porcentagen={false}
                      nome={"Contas Subordinadas"}
                      icon={"ion ion-person-add" }
                      link={false}
                      />
                      <CaixaInforme 
                      cor={"small-box bg-danger"}
                      valor={"65"}
                      porcentagen={false}
                      nome={"Visitas"}
                      icon={"ion ion-pie-graph"}
                      link={false}
                      />                            */}
                   </div>
                  
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
                                <label>Antes</label>
                                <DatePickerInput
                                  onChange={DatandoA}
                                  value={DataA}
                                  className='my-custom-datepicker-component'
                                  disabled={VerA}
                                  
                                />
                            </div>
                            </div>
                            <div className="col-sm-2">
                            <div className="form-group">
                                <label>Depois</label>
                                <DatePickerInput
                                onChange={datando}
                                value={DataP}
                                className='my-custom-datepicker-component'
                                disabled={VerD}
                                
                              />
                            </div>
                            </div> 
                            <div className="col-sm-2">
                            <div className="form-group">
                                <label>Titulo da Notícia</label>
                                <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Digite o Titulo "
                                value={TituNoti}
                                onChange={t=>setTituNoti(t.target.value)}
                                disabled={Vertito}
                                onBlur={()=>PesqTitulo()}
                                />
                                
                              
                            </div>
                            </div>
                            <div className="col-sm-2">
                            <div className="form-group">
                                <label>Palavras ou Frases</label>
                                <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Digite aqui.... "
                                value={Text}
                                onChange={t=>setText(t.target.value)}
                                disabled={VerText}
                                onBlur={()=>PesqText()}
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
                    {Dados.grupo.menu.noticias.listaNoticia.Ver === true &&
                    <div className="card card-danger">
                      {Dados.grupo.menu.noticias.listaNoticia.btn_criarNoticia === true &&
                    <div style={{margin:"10px", width:"250px"}}>
                        <Butao 
                        style={"btn btn-sm btn-success"}
                        titulo={"Criar Notícias"}
                        onClick={()=>Pagina1()}
                        />

                        </div>
                      }
                      <div className="card-header">
                      
                        <h3 className="card-title" style={{ marginBottom: "10px"}}>Lista de Notícias  </h3> 

                      </div>
                        <div class="card-body table-responsive p-0">
                          <table class="table table-hover text-nowrap">
                            <thead>
                              <tr>
                                <th>Data</th>
                                <th>Titulo</th>
                                <th>Visitas</th>
                                <th>Ações</th>
                               
                              </tr>
                            </thead>
                            
                            { Lista[0].list ?
                            <tbody >
                            {Lista.map((item, key)=>(
    
                            
                                    <tr key={item.list.id}  >
                                    <td >
                                      {/* {item.list.dateNoti} */}
                                      <DataTime 
                                      DateIni={item.list.dateNoti/1000}
                                      />
                                      </td>
                                    
                                      <td >
                                      {item.list.titulo}
                                      </td>

                                      <td >
                                      {item.list.visitas}
                                      </td>
                                   
                                   
                                    <td>
                                    
                                    {Dados.grupo.menu.noticias.listaNoticia.btn_vizualizar === true &&
                                    <Butao 
                                    style={"btn btn-xs btn-info"}
                                    titulo={"Vizualizar"}
                                    onClick={()=>Pagina2(item.list.id)}
                                    />
                                    }
                                    {Dados.grupo.menu.noticias.listaNoticia.btn_editar === true &&
                                    <Butao 
                                    style={"btn btn-xs btn-success"}
                                    titulo={"Editar"}
                                    onClick={()=>Pagina3(item.list.id)}
                                    />
                                    }
                                    {item.list.ativo === true ?
                                    <>
                                    {Dados.grupo.menu.noticias.listaNoticia.btn_desativa === true &&
                                     <Butao 
                                     style={"btn btn-xs btn-secondary"}
                                     titulo={"Desativar"}
                                     onClick={()=>Desativando(item.list.id)}
                                     />
                                    }
                                    </>
                                    :
                                    <>
                                    {Dados.grupo.menu.noticias.listaNoticia.btn_ativar === true &&
                                      
                                    <Butao 
                                    style={"btn btn-xs btn-warning"}
                                    titulo={"Ativar"}
                                    onClick={()=>Ativando(item.list.id)}
                                    />
                                    }
                                    </>
                                    }
                                    {Dados.grupo.menu.noticias.listaNoticia.btn_excluir === true &&
                                    <Butao 
                                    style={"btn btn-xs btn-danger"}
                                    titulo={"Excluir"}
                                    onClick={()=>MsgExcluir(item.list.id, item.list.titulo)}
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
                                      <p style={{color:"red", margin:"20px"}}>Não existe Notícia Cadastrada</p>
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
        <>
         <CriarNoti 
            setAlert={setAlert}
            setAlertTipo={setAlertTipo}
            Avisando={Avisando}
            Fechar={Fechar}
            Dados={Dados}
            Id={Id}
            Alert={Alert}
            AlertTipo={AlertTipo}
            />
        </>

        :
        <>
        {Pag3 === false ?
          <Vizuali
          setAlert={setAlert}
          setAlertTipo={setAlertTipo}
          Avisando={Avisando}
          Fechar={Fechar}
          Dados={Dados}
          Id={Id}
          Alert={Alert}
          AlertTipo={AlertTipo}
          />
        :
        <EditarNoti
          setAlert={setAlert}
          setAlertTipo={setAlertTipo}
          Avisando={Avisando}
          Fechar={Fechar}
          Dados={Dados}
          Id={Id}
          Alert={Alert}
          AlertTipo={AlertTipo}
          />

        }
       
        </>

        }
         
        </>
        
         }
      </div>

        );
    }

