import React, {useState, useEffect} from 'react';
import Api from '../../Api';
import Butao from '../../Components/Butao_list';
import Campo from '../../Components/Campo';
import Header from '../../Components/Header';
import Select from '../../Components/Select';
import DataTime from '../../Components/DateFormat';
import Maps from '../../Components/maps';
import ChatWindow from '../../Components/ChatVirzul';
import Modal from 'react-awesome-modal';
import Condic from '../../Components/Condoc';


export default ({Dados, Avisando, Fechar, Id, setAlert, setAlertTipo, Alert, AlertTipo, }) => {
  const [Infor, setInfor] = useState("nulo");
  const [Grupo, setGrupo] = useState();
  const [ListGrupo, setListGrupo] = useState([]);
  const [AtuaMaps, setAtuaMaps] = useState(false);
  const [MapsCaixa, setMapsCaixa] = useState(false);
  const [Loc, setLoc] = useState({});
  const [Vtr, setVtr] = useState("");
  const [AtenCop, setAtenCop] = useState("");
  const [CompVt, setCompVt] = useState("");
  const [Conduz, setConduz] = useState("");
  const [Viti, setViti] = useState("");
  const [ObjAp, setObjAp] = useState("");
  const [ResulOc, setResulOc] = useState("");
  const [Relato, setRelato] = useState("");
  const [Prov, setProv] = useState("");
  const [Visible, setVisible] = useState(false);
  const [Forms, setForms] = useState("");
  const [Arq, setArq] = useState("");
  const [Pdf, setPdf] = useState("")
  const [Visi2, setVisi2] = useState(false);
  const [Test, setTest] = useState("");
  const [Autor, setAutor] = useState("");
  const [NumOc, setNumOc] = useState("");
  const [NomeOc, setNomeOc] = useState("");
  const [Rua, setRua] = useState("");
  const [Numero, setNumero] = useState("");
  const [Bairro, setBairro] = useState("");
  const [Cidade, setCidade] = useState("");
  const [Estado, setEstado] = useState("");
  


  useEffect(() => {
    if(Infor.localizacao){
      setLoc(Infor.localizacao);
    }
    if(Infor !== "nulo"){
      setVtr(Infor.vtr);
      setAtenCop(Infor.atendenteCopom);
      setCompVt(Infor.componentesVtr);
      setConduz(Infor.conduzidos);
      setViti(Infor.vitimas);
      setObjAp(Infor.objetosApre);
      setResulOc(Infor.resultado);
      setRelato(Infor.relato);
      setProv(Infor.providencias);
      setForms(Infor.condicionais);
      setPdf(Infor.grupoOcrr);
      setTest(Infor.testemunha);
      setAutor(Infor.autores);
      setNumOc(Infor.Ocorr);
    }
    }, [Infor]);


 useEffect(() => {
 Vizualizar();
 }, []);

 useEffect(() => {

 console.log(ResulOc);
  }, [ResulOc]);

 

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
 
  const EnviandoOc = ()=> { 
    setVisi2(true);
    Api.EnviOcSalvar(Id, Vtr, AtenCop, CompVt,  
    Conduz, Viti, ObjAp, ResulOc, Relato, Prov, 
    setAlert, setAlertTipo, Arq, Pdf,setVisi2, Test, Autor, NumOc);
}

const closeModal = ()=>{
  setVisible(false);
}

const AbrirModal = ()=>{
  setVisible(true);
}

const TirarCond = async (Vale)=>{
  let cond = [];
  cond = [...Forms.filter((item, index) => item.id !== Vale)];
  Api.ExcluirCondiRev(Id, cond, setAlertTipo, setAlert);
  
}
const ExBo = ()=>{
  setPdf("");
}

  

        return (
            <>
<div className="content-wrapper">
  {/* Content Header (Page header) */}
  <Header 
  Titulo={"Editando Ocorrência"}
  Avisando={Avisando}
  Fechar={Fechar}
  />
   <Modal visible={Visible} width="500" height="500" effect="fadeInUp" onClickAway={() =>closeModal()}>
                     
                     <div className="ModalCond">
                       <div className="ModalP1" >
                       <div style={{width:"3000", height:"500" }}> 
                                      <div className="card card-info">
                                    <div className="card-header">
                                      <h3 className="card-title">Ocorrências Preenchidas</h3>
                                    </div>
                                  
                                    
                                    <div className="card-body">
                                {Forms !== "" &&
                                  <>
                                   {Forms.map((item,key)=>(
                                          <>
                                          <div className="listCond">
                                          <div className="listCondText" > 
                                          <string> {item.nome}</string>
                                          </div>
                                          <div className="chatWindow--btn2"
                                            onClick={()=>TirarCond(item.id)}
                                            >
                                                <p className="textButao" >EXCLUIR</p>
                                            </div>
                                          </div>
                                       <br/>
                                          </>
                                         ))
                
                                      }
                                  </>
                                }
                                  
                                  </div>
                                   
                                  </div>
                                  </div>

                       </div>
                       <div className="ModalP2" >
                       <div style={{width:"2000px", height:"500px" }}> 
                       <Condic
                        setAlert={setAlert}
                        setAlertTipo={setAlertTipo}
                        Forms={Forms}
                        setForms={setForms}
                        activeChat={Id}
                        setVirModal={setVisible}
                        />
                        </div>
                      </div>
                      </div>
                                
                               
                
                </Modal>
                <Modal visible={Visi2} width="500" height="100" effect="fadeInUp" onClickAway={() =>closeModal()}>
                <div className="row">
                  <div className="col-12">
                    <h4>
                      Espere Um momento está sendo enviado!
                    </h4>
                  </div>
                  {/* /.col */}
                </div>


                </Modal>

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
                      <strong>Nome:</strong><br />
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
                      {Pdf !== "" ?
                      <>
                      <a href={Pdf} target="_blank" style={{margin:"15px"}}>Link do B.O</a>
                      {Dados.grupo.menu.ocorrencia.editarOcorrencia.btn_escolherBO === true &&
                      <>
                      <Butao 
                        style={"btn btn-sm btn-danger"}
                        titulo={"Excluir B.O"}
                        onClick={()=>ExBo()}
                        />
                      <br /><br />
                      </>
                      }
                      </>
                      :
                      <>
                        {Dados.grupo.menu.ocorrencia.editarOcorrencia.btn_escolherBO === true &&
                       <div class="form-group">
                        <label for="exampleInputFile">Enviar B.O</label>
                        <div class="input-group">
                        <input type="file"
                  
                        onChange={(e)=>setArq(e.target.files[0])} 
                        />
                      </div>
                      </div>
                      }
                      <br />
                      </>
                      }
                      

                     

                     
                   
                      {Dados.grupo.menu.ocorrencia.editarOcorrencia.btn_salvar === true &&
                      <Butao 
                        style={"btn btn-sm btn-primary"}
                        titulo={"Salvar"}
                        onClick={()=>EnviandoOc()}
                        />
                      }
                    </address>
                  </div>
                  {/* /.col */}
                  <div className="col-sm-4 invoice-col">
                   
                       <address>
                       <strong>Numero da Ocorrência:</strong><br />
                       <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Digite o Número" 
                        value={NumOc}
                        onChange={t=>setNumOc(t.target.value)}
                        /><br />
                       <strong>Vtr:</strong><br />
                       <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Digite a Vtr" 
                        value={Vtr}
                        onChange={t=>setVtr(t.target.value)}
                        /><br />
                      <strong>Atendente Copom</strong><br />
                      <textarea 
                        className="form-control" 
                        rows={4} 
                        placeholder="Digite o Nome dos Atendentes ..." 
                        defaultValue={""} 
                        value={AtenCop}
                        onChange={t=>setAtenCop(t.target.value)}
                        /><br />
                      <strong>Componentes da Vrt</strong><br />
                      <textarea 
                        className="form-control" 
                        rows={4} 
                        placeholder="Digite o Nome dos Componentes da Vtr ..." 
                        defaultValue={""}
                        value={CompVt}
                        onChange={t=>setCompVt(t.target.value)}
                        /><br />
                      <strong>Conduzidos</strong><br />
                      <textarea 
                      className="form-control" 
                      rows={3}
                        placeholder="Digite as Informações dos Conduzidos..." 
                        defaultValue={""}
                        value={Conduz}
                        onChange={t=>setConduz(t.target.value)}
                        />
                     <br />
                     <strong>Autores</strong><br />
                      <textarea 
                      className="form-control" 
                      rows={3}
                        placeholder="Digite as Informações dos Altores..." 
                        defaultValue={""}
                        value={Autor}
                        onChange={t=>setAutor(t.target.value)}
                        />
                     <br />
                       <strong>Testemunha</strong><br />
                      <textarea 
                      className="form-control" 
                      rows={3}
                        placeholder="Digite as Informações das Testemunhas..." 
                        defaultValue={""}
                        value={Test}
                        onChange={t=>setTest(t.target.value)}
                        />
                     <br />
                      <strong>Vítimas</strong><br />
                      <textarea 
                                className="form-control" 
                                rows={3} 
                                placeholder="Digite as Informações das Vitimas..."  
                                defaultValue={""} 
                                value={Viti}
                                onChange={t=>setViti(t.target.value)}
                                /><br />
                      <strong>Objetos Apreendidos</strong><br />
                      <textarea 
                                className="form-control" 
                                rows={3} 
                                placeholder="Digite os objetos apreendidos..."  
                                defaultValue={""} 
                                value={ObjAp}
                                onChange={t=>setObjAp(t.target.value)}
                                /><br />

                     
                      
                      
                     </address>
                  
                   
                  </div>
                  {/* /.col */}
                  <div className="col-sm-4 invoice-col">
                    <address>
                    {Dados.grupo.menu.ocorrencia.editarOcorrencia.btn_mudarcondicional === true &&
                    <>
                      <strong>Ocorrencia</strong><br />
                      <Butao 
                        style={"btn btn-xs btn-success"}
                        titulo={"Mudar o Nome da Ocorrência"}
                        onClick={()=>AbrirModal()}
                        />
                      <br />
                      </>
                    }
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
                       <select className="form-control"
                                value={ResulOc}
                                onChange={t=>setResulOc(t.target.value)}
                                >
                                <option>Escolhar um Resultado</option>
                                <option>Condução ao DP</option>
                                <option>Resolvido no local</option>
                                <option>Evadiu-se</option>
                                <option>Nada constatado</option>
                                <option>Ocorrência computada</option>
                                <option>Outros</option>
                                </select><br />
                      <strong>Relato da Ocorrência</strong><br />
                      <textarea 
                                className="form-control" 
                                rows={10} 
                                placeholder="Digite o relato da Ocorrência..."  
                                defaultValue={""} 
                                value={Relato}
                                onChange={t=>setRelato(t.target.value)}
                                /><br />
                      <strong>Providencias Tomadas</strong><br />
                      <textarea 
                                className="form-control" 
                                rows={10} 
                                placeholder="Digite as providências tomadas.."  
                                defaultValue={""}
                                value={Prov}
                                onChange={t=>setProv(t.target.value)}
                                /><br />
                      
                    </address>
                  </div>
                  
                  {/* /.col */}
                </div>
               
               
                <div className="row no-print">
                  <div className="col-12">
                
                  
                     
                   
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
{/* /.content-wrapper */}

            </>
        );
}