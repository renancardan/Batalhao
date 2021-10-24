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
import EditarGrupo from './EditarGrupo';
import Api from '../../Api';
import {Bar, Line, Radar, PolarArea } from 'react-chartjs-2';
import { DatePicker, DatePickerInput } from 'rc-datepicker';
import FinderSelect from 'react-finderselect';
import 'react-finderselect/dist/index.css'
import Maps from '../../Components/mapsOc';
import ChatWindow from '../../Components/ChatMaps';
import Modal from 'react-awesome-modal';



export default ({Dados, setDados, Loading,  setLoading,  Alert, setAlert, AlertTipo,
   setAlertTipo, Avisando, setAvisando}) => {
      const [Offset, setOffset] = useState(0);
      const [Limit, setLimit] = useState(10);
      const [Quant, setQuant] = useState(0);
      const [Pag1, setPag1] = useState(false);
      const [Pag2, setPag2] = useState(false);
      const [Titulo, setTitulo] = useState("Gráficos");
      const [Time, setTime] = useState("")
      const [UsuariosContServ, setUsuariosContServ] = useState([]);
      const [Lista, setLista] = useState(["list"]);
      const [Carreg, setCarreg] = useState(false);
      const [Cont, setCont] = useState(0);
      const [Id, setId] = useState("");
      const [Nome, setNome] = useState("");
      const [Telefone, setTelefone] = useState("");
      const [data, setdata] = useState({
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      });
      const [DataA, setDataA] = useState(0);
      const [VerA, setVerA] = useState(false);
      const [DataP, setDataP] = useState(new Date());
      const [QuatD, setQuatD] = useState(0);
      const [Cond, setCond] = useState();
      const [ListCond, setListCond] = useState([]);
      const [ListDias, setListDias] = useState([]);
      const [LDGrafi, setLDGrafi] = useState([]);
      const [ListDados, setListDados] = useState([]);
      const [Loc, setLoc] = useState({lat:-4.22995432532184, lng: -44.77992046604799});
      const [MapsCaixa, setMapsCaixa] = useState(true);
      const [AtuaMaps, setAtuaMaps] = useState(false);
     const [ListLoc, setListLoc] = useState([]);
     const [Visible, setVisible] = useState(false);
     
    

     

      useEffect(() => {
        listandoCond();
          }, []);

      useEffect(() => {
       console.log(ListDias)
       EnviarDados();
       }, [ListDias])

       useEffect(() => {
         console.log(QuatD)
        DiasQuantizados();
        }, [QuatD])

        useEffect(() => {
          EnviarDados();
          }, [Cond]);

          useEffect(() => {
            if(ListLoc !== []){
              MostarMap();
            }
        
            }, [ListLoc]);



    

    
     
       const listandoCond = ()=>{
        Api.Condconta(Dados, setListCond);
      }

      const MostarMap = ()=>{
        setAtuaMaps(true);
      }
  
     
      const EnviarDados = ()=>{
        Api.DadosdeGraficos(Dados, ListDias, setListDados, setListLoc, QuatD)
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

              

                const printValue = (target) => {
                  setCond(target.value);
                  
                    }

                   
                
                const DiasQuantizados = ()=>{
                  let ListaD = [];
                  let ListGrafi = [];

                  for (var i = 0; i <= QuatD; i++) {
                    const dataVer = DataA + i * 86400000
                    let curre = '';
                    let now =new Date(dataVer);
                    let Dia = now.getDate();
                    let Mes = (now.getMonth()+1);
                    Dia = Dia < 10 ? '0'+Dia : Dia;
                    Mes = Mes < 10 ? '0'+Mes : Mes;
                    curre = Dia+'/'+Mes;
                    
                   ListaD.push(
                      dataVer
                   );
                   if(i !== QuatD) {
                    ListGrafi.push(
                      curre
                     );
                   }
                  
                 }
                 setLDGrafi(ListGrafi);
                 setListDias(ListaD);
                
                }

                const closeModal = ()=>{
                  setVisible(false);
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
                                                <div className="card card-warning">
                    <div className="card-header">
                        <h3 className="card-title">Filtros para Gráfico Diário</h3>
                    </div>
                    {/* /.card-header */}
                    <div className="card-body">
                    <div className="row" >
                    <div className="col-sm-2">
                            <div className="form-group">
                            <label>Data de Inicio</label>
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
                                <label>Quantidades de Dias</label>
                                <input 
                              type="number" 
                              className="form-control" 
                              placeholder="Digite a quantidade" 
                              value={QuatD}
                              onChange={t=>setQuatD(parseInt(t.target.value))}
                              />
                                
                              
                            </div>
                            </div>
                            <div className="col-sm-6">
                            <div className="form-group">
                                <label>Oocorrência</label>
                                {ListCond !== [] &&
                                    <FinderSelect 
                                    data={ListCond} 
                                    label='select'
                                    value = 'select'  
                                    extraInfo='capital' 
                                    name='country' 
                                    className='anyClass' 
                                    placeholder='Selecione a ocorrência'
                                    onClick={() => console.log('entering')} 
                                    onChange={(target) => printValue(target)}
                                    
                                    
                                />
                
                       } 
                            </div>
                            </div> 
                          
                          

                            
                            <div className="col-sm-2">
                            <div className="form-group">
                            <Butao 
                            style={"btn btn-sm btn-secondary"}
                            titulo={"Limpar Pesquisa"}
                            onClick={null}
                            />
                            </div>
                            </div> 
                            
                          
                                   
                    </div>
                       
                    </div>
                    {/* /.card-body */}
                    </div>
                  
                    <div className="card card-primary">
                          
                      <div className="card-header">
                      
                        <h3 className="card-title" style={{ marginBottom: "10px"}}>Gráficos Diário  </h3> 

                      </div>
                        <div class="card-body table-responsive p-0">
                     
                        <Bar
                        data={{
                          labels: LDGrafi,
                                datasets: [{
                                    label: ['Bloco de Ocorrencia'],
                                    data: ListDados,
                                    backgroundColor: [
                                        'green',   
                                    ],
                                }],
                        }}
                        width={400}
                        height={200}
                        options={{ maintainAspectRatio: false }}
                        />

                         </div>
                        </div>
                        <div className="card ">
                           <div className="app-window">
                          <div className="contentarea">
                          {Id !== null &&
                                  <>
                                  <ChatWindow
                                  data={Id}
                                  setActiveChat={null}
                                  setAlert={setAlert}
                                  setAlertTipo={setAlertTipo}
                                  Alert={Alert}
                                  AlertTipo={AlertTipo}
                                  AbrirMaps={null} 
                                  MapsCaixa={MapsCaixa}
                                  Nome={null} 
                                  Dados={Dados} 
                                  Vizul={null}
                                  Varia={null}
                                  setVizul={null}
                                  />
                                {Dados.grupo.menu.ocorrencia.vizualizarOcorrencia.btn_maps === true &&
                                <>
                                  {AtuaMaps === true &&
                                   <Maps 
                                   setModal={setVisible}
                                   MapsCaixa={MapsCaixa}
                                   Loc={ListLoc}
                                   />
                                  }
                                 
                                  </>
                                 }
                                 </>
                              }
                                
                          </div>
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

