import React, {useState, useEffect} from 'react';
import Api from '../../Api';
import Butao from '../../Components/Butao_list';
import Campo from '../../Components/Campo';
import Header from '../../Components/Header';
import Select from '../../Components/Select';
import DataTime from '../../Components/DateFormat';
import Maps from '../../Components/maps';
import ChatWindow from '../../Components/ChatVirzul';
import RelatAni from '../../Components/Analitico';


export default ({Dados, Avisando, Fechar, Id, setAlert, setAlertTipo, Alert, AlertTipo, }) => {
  const [Infor, setInfor] = useState("nulo");
  const [Grupo, setGrupo] = useState();
  const [Pag5, setPag5] = useState(false);
  const [ListGrupo, setListGrupo] = useState([]);
  const [AtuaMaps, setAtuaMaps] = useState(false);
  const [MapsCaixa, setMapsCaixa] = useState(false);
  const [Loc, setLoc] = useState({});

  useEffect(() => {
    if(Infor.localizacao){
      setLoc(Infor.localizacao);
    }
    }, [Infor]);


 useEffect(() => {
 Vizualizar();
 }, []);

 

  const MsgBloque = ()=>{
      setAlert("Ok");
      setAlertTipo("BloqueioCont");
  }

  const listandoGrupos = ()=>{
    Api.Gruposconta(Dados, setListGrupo);
  }

  const AbrirMaps = ()=>{
    setAtuaMaps(true);
    setMapsCaixa(!MapsCaixa);
   
  }
 

 
 
  const Vizualizar = async ()=>{
    
    if (navigator.onLine) {
      
      await Api.VizualizandoOcorren(Id, Dados, setInfor);
      
     } else {
       setAlert("Sem Internet");
       setAlertTipo("danger");
     }
  }

  const Pagina5 = ()=>{
    setPag5(true);
  }
  
  const tirar = ()=>{
    setPag5(false)
  }

  

        return (
            <>
            {Pag5 === false ?
            <div className="content-wrapper">
            {/* Content Header (Page header) */}
            <Header 
            Titulo={"Relatório Analítico"}
            Avisando={Avisando}
            Fechar={Fechar}
            />
          
          {Infor !== "nulo" &&
              <section className="content">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-12">
                    
                    {/* Main content */}
                    <div className="invoice p-3 mb-3">
                          {/* title row */}
                          <div className="row">
                            <div className="col-12">
                              <h4>
                                <i className="fas fa-university" /> Instituição {Dados.instituicao} 
                              </h4>
                            </div>
                            {/* /.col */}
                          </div>
                          {/* info row */}
                         
                          <div className="row invoice-info">
                            <div className="col-sm-4 invoice-col">
                              <address>
                                <strong>Nome da Vítima:</strong><br />
                                {Infor.nomevitima}<br />
                                <strong>Endereço</strong><br />
                                {Infor.rua}, {Infor.numero} - {Infor.bairro}<br />
                                <strong>Cidade:</strong><br />
                                {Infor.cidade}<br />
                                <strong>Estado:</strong><br />
                                {Infor.estado}<br />
                                <strong>Data de Inicio:</strong><br />
                                <DataTime 
                                  DateIni={Infor.dataInicio.seconds}
                                  />
                                <br />
                                <strong>Data de Finalização:</strong><br />
                                {Infor.ativo === true ?
                                <p>Em Andamento</p>
                                :
                                <DataTime 
                                DateIni={Infor.dataFim.seconds}
                                />
                                }
                               
                                <br />
          
                                      <div className="col-sm-6">
                                      <div className="form-group">
                                      <Butao 
                                      style={"btn btn-sm btn-info"}
                                      titulo={"Relatótio Analítico"}
                                      onClick={()=>Pagina5()}
                                      />
                                      </div>
                                      </div> <br /> 
                                {Infor.Ocorr !== "" &&
                                <>
                                <a href={Infor.Ocorr} target="_blank">Link do B.O</a> <br />
                                </>
                                }
                               
                              </address>
                            </div>
                            {/* /.col */}
                            <div className="col-sm-4 invoice-col">
                             
                                 <address>
                                 <strong>Vtr:</strong><br />
                                {Infor.vtr}<br />
                                <strong>Atendente Copom</strong><br />
                                {Infor.atendenteCopom}<br />
                                <strong>Componentes da Vrt</strong><br />
                                {Infor.componentesVtr}<br />
                                <strong>Conduzidos</strong><br />
                                {Infor.conduzidos}<br />
                                <strong>Vítimas</strong><br />
                                {Infor.vitimas}<br />
                                <strong>Objetos Apreendidos</strong><br />
                                {Infor.objetosApre}<br />
          
                               
                                
                                
                               </address>
                            
                             
                            </div>
                            {/* /.col */}
                            <div className="col-sm-4 invoice-col">
                              <address>
                            
                                <strong>Ocorrencia</strong><br />
                                {Infor.condicionais &&
                                <>
                                   {Infor.condicionais.map((item, key)=>(
                                    <>
                                    <string>{item.nome}</string> <br />
                                    </>
                   
                                  ))}
                                </>
                                }
                                 <strong>Resultado</strong><br />
                                {Infor.resultado}<br />
                                <strong>Relato da Ocorrência</strong><br />
                                {Infor.relato}<br />
                                <strong>Providencias Tomadas</strong><br />
                                {Infor.providencias}<br />
                                
                              </address>
                            </div>
                            
                            {/* /.col */}
                          </div>
                         
                         
                          <div className="row no-print">
                            <div className="col-12">
                          
                            
                               
                             
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
                                  AbrirMaps={AbrirMaps} 
                                  MapsCaixa={MapsCaixa}
                                  Nome={Infor.nomevitima} 
                                  Dados={Dados} 
                                  Vizul={Infor.mensagem}
                                  Varia={Infor.idvitima}
                                  setVizul={null}
                                  />
                                {Dados.grupo.menu.ocorrencia.vizualizarOcorrencia.btn_maps === true &&
                                <>
                                  {AtuaMaps === true &&
                                   <Maps 
                                   MapsCaixa={MapsCaixa}
                                   Loc={Loc}
                                   />
                                  }
                                 
                                  </>
                                 }
                                 </>
                              }
                                
                          </div>
                          </div>
                          </div>
                        </div> 
          
                    {/* /.invoice */}
                    
                  </div>{/* /.col */}
                
                </div>{/* /.row */}
              </div>{/* /.container-fluid */}
            </section>
          }
          
            {/* /.content */}
          </div>

            :
            <>
            <RelatAni
            Fechar={tirar}
            Avisando={Avisando}
            Infor={Infor}
            Id={Id}
            />
            </>

            }

{/* /.content-wrapper */}

            </>
        );
}