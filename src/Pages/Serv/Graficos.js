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
import { Info } from '@material-ui/icons';
import jsPDF  from 'jspdf';



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
      const [DataB, setDataB] = useState(0);
      const [VerB, setVerB] = useState(false);
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
     const [LDCond, setLDCond] = useState([]);
     const [LQuantTo, setLQuantTo] = useState([])
     const [MedI, setMedI] = useState([]);
     const [DiSemana, setDiSemana] = useState([]);
     const [SemQuant, setSemQuant] = useState(0);
     const [DadosSemana, setDadosSemana] = useState([]);
     const [Espectro, setEspectro] = useState([]);
     const [ValEspectro, setValEspectro] = useState([]);
     const [DiaHoras, setDiaHoras] = useState([]);
     const [EspcHoras, setEspcHoras] = useState([]);
     
    

     

      useEffect(() => {
        listandoCond();
          }, []);

      useEffect(() => {
       
       EnviarDados();
       }, [ListDias])

       useEffect(() => {

        DiasQuantizados();
        }, [QuatD])

        useEffect(() => {
          setAtuaMaps(false);
         PesqOcrr();
       
          }, [Cond]);
         

          useEffect(() => {
            if(ListLoc !== []){
              MostarMap();
              
            }
          
            }, [ListLoc]);

            useEffect(() => {
              CalcuSemanal();
              }, []);


              useEffect(() => {
                   }, [LDGrafi]);

    

    
     
       const listandoCond = ()=>{
        Api.Condconta(Dados, setListCond);
      }

      const MostarMap = ()=>{
        setAtuaMaps(true);
      }
     
  
     
      const EnviarDados = ()=>{
        setLoading(true);
        Api.DadosdeGraficos(Dados, ListDias, setListDados, setListLoc, QuatD,  setLoading)
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



          const LimparCampo = ()=>{
            window.location.reload()
         
          }


           const CalcuSemanal = ()=>{
             let seg = [];
             let laon = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []];
            let Inicio = new Date("2021-10-25T00:00:00.000").getTime();
            let Atual = new Date().getTime();
            let dial = (Atual - Inicio)/86400000;
            let diaResu =Math.trunc(dial);
            for (let j in laon) {
            for (let i = 0; i < diaResu; i++) {
              let foa = ((j*3600000) + Inicio) + (i*86400000);
              let toa = foa + 3600000;
              laon[j].push({
                ini:foa,
                fim: toa,
              });
            }
            }
            let semanal =  86400000 * 7;
            let Result = (Atual - Inicio)/semanal;
            let semaResul = Math.trunc(Result);
            setSemQuant(semaResul);
            
            

           setDiaHoras(laon);
            setDiSemana(seg);
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
                  console.log(currentDate);
                  let variac = new Date(currentDate +"T00:00:00.000").getTime();
                  setDataA(variac) 
                  setVerA(true)  
                  
                }

                const DatandoB = (jsDate, dateString)=>{
                  let currentDate = '';
                  let now =new Date(jsDate);
                  let Dia = now.getDate();
                  let Mes = (now.getMonth()+1);
                  let Ano = now.getFullYear();
                  Dia = Dia < 10 ? '0'+Dia : Dia;
                  Mes = Mes < 10 ? '0'+Mes : Mes;
                  currentDate = Ano+'-'+Mes+'-'+Dia;
                  let variac = new Date(currentDate +"T00:00:00.000").getTime();
                  setDataB(variac); 
                  setVerB(true); 

                  var days = (variac - DataA) / (60 * 60 * 24 * 1000);
                  setQuatD(days);
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

                const GrafCond = ()=>{
                  let listraCond = [];
                  let listra11 = [];
                  let ListraDados = [];
                  console.log(ListLoc);
                  for(let i in ListCond ) {
                    let Cor = (ListCond[i].select);
                    for(let i in ListLoc ) {
                          if( ListLoc[i].condi[0].nome.includes(Cor)  ) {
                          

                            if(listraCond.includes(Cor)){
                                  for(i in listraCond){
                                    if(listraCond[i] === Cor){
                                      let mert = ListraDados[i] + 1;
                                      let mi = mert/QuatD;
                                      ListraDados.splice(i, 1, mert);
                                      listra11.splice(i, 1, mi);
                                    }
                                  }

                              

                                  } else {
                                   let Mi = 1/QuatD;
                                    listraCond.push(
                                      Cor
                                  );
                                  
                                  ListraDados.push(
                                    1
                                  ); 

                                    listra11.push({
                                    Mi
                                  });   
                           
                            }
      
                        }
                       
                       
                     
                        
                        }
                     
                       
                      
                }
              
                setLDCond(listraCond);
                setLQuantTo(ListraDados);
                setMedI(listra11);
              }

                const PesqOcrr = ()=>{
                 
                 
                  let listra10 = [];
                  for(let i in ListLoc ) {
                    for(let j in ListLoc[i].condi ){
                        if( ListLoc[i].condi[j].nome.includes(Cond)  ) {
                          listra10.push({
                            Loc:ListLoc[i].Loc, 
                            cidade:ListLoc[i].cidade,
                            estado:ListLoc[i].estado,
                            id: ListLoc[i].id,
                            date: ListLoc[i].date,
                            ativo: ListLoc[i].ativo, 
                            dateIn:  ListLoc[i].dateIn,
                            condi:  ListLoc[i].condi,
                            bairro:  ListLoc[i].bairro,
                            resultado: ListLoc[i].resultado,
                            rua: ListLoc[i].rua,
                            vtr: ListLoc[i].vtr,
                            atendenteCopom: ListLoc[i].atendenteCopom,
                            componentesVtr:  ListLoc[i].componentesVtr,
                            conduzidos: ListLoc[i].conduzidos,
                            vitimas: ListLoc[i].vitimas,
                            objetosApre: ListLoc[i].objetosApre,
                            excluir:  ListLoc[i].excluir,
                            periodo: ListLoc[i].periodo,
                            numero: ListLoc[i].numero,
                            oCorr: ListLoc[i].oCorr,
                        });   
                        }
    
                      }
                     
                     
                    }
                    let ListQuant = [];
                    for (let i = 0; i < QuatD; i++) {
                      let march = i+1;
                      let Antes = ListDias[i];
                      let Depois = ListDias[march];
                      let size = 0;
                      for(let j in listra10 ) {
                          if(listra10[j].dateIn >= Antes && listra10[j].dateIn <= Depois){
                            size +=1;
                            
                          }
                      }
                      ListQuant.push(
                        size,
                      );
                    }
                      
                      setListLoc(listra10);
                      setListDados(ListQuant);
                   console.log(ListQuant);
                  
                }

                const SemanalOc = ()=>{
                
                  let Semanal = [0, 0, 0, 0, 0, 0, 0];
                  for(let i in ListLoc ) {
                    let date = ListLoc[i].dateIn;
                    for(let i in DiSemana ) {
                      if(DiSemana[i].iniSeg < date < DiSemana[i].fimSeg ){
                        let ForSeg = Semanal[0] + 1;
                        Semanal.splice(0, 1, ForSeg);
                      } else if (DiSemana[i].iniTer < date < DiSemana[i].fimTer ){
                        let ForTer = Semanal[1] + 1;
                        Semanal.splice(1, 1, ForTer);
                      }  else if (DiSemana[i].iniQua < date < DiSemana[i].fimQua ){
                        let ForQua = Semanal[2] + 1;
                        Semanal.splice(2, 1, ForQua);
                      }  else if (DiSemana[i].iniQui < date < DiSemana[i].fimQui ){
                        let ForQui = Semanal[3] + 1;
                        Semanal.splice(3, 1, ForQui);
                      }  else if (DiSemana[i].iniSex < date < DiSemana[i].fimSex ){
                        let ForSex = Semanal[4] + 1;
                        Semanal.splice(4, 1, ForSex);
                      }  else if (DiSemana[i].iniSab < date < DiSemana[i].fimSab ){
                        let ForSab = Semanal[5] + 1;
                        Semanal.splice(5, 1, ForSab);
                      }  else if (DiSemana[i].iniDom < date < DiSemana[i].fimDom ){
                        let ForDom = Semanal[6] + 1;
                        Semanal.splice(6, 1, ForDom);
                      }



                    }
                     
                    }
                    
                    console.log(Semanal);
                   
                  
                }
                 
                const ColDias = (t)=>{
                  setQuatD(parseInt(t.target.value));
                  setVerB(true);
                }

                const SemanalExtra = ()=>{
                  let Semanal = [0, 0, 0, 0, 0, 0, 0];
                  for (let i = 0; i <  SemQuant; i++) {
                  let vir = 7 * i;
                  let ForSeg = Semanal[0] + ListDados[vir];
                  Semanal.splice(0, 1, ForSeg);
                  }

                  for (let i = 0; i <  SemQuant; i++) {
                    let vir = 1 + (7 * i);
                    let ForSeg = Semanal[1] + ListDados[vir];
                    Semanal.splice(1, 1, ForSeg);
                    }

                    for (let i = 0; i <  SemQuant; i++) {
                      let vir = 2 + (7 * i);
                      let ForSeg = Semanal[2] + ListDados[vir];
                      Semanal.splice(2, 1, ForSeg);
                      }

                      for (let i = 0; i <  SemQuant; i++) {
                        let vir = 3 + (7 * i);
                        let ForSeg = Semanal[3] + ListDados[vir];
                        Semanal.splice(3, 1, ForSeg);
                        }

                        for (let i = 0; i <  SemQuant; i++) {
                          let vir = 4 + (7 * i);
                          let ForSeg = Semanal[4] + ListDados[vir];
                          Semanal.splice(4, 1, ForSeg);
                          }

                          for (let i = 0; i < SemQuant; i++) {
                            let vir = 5 + (7 * i);
                            let ForSeg = Semanal[5] + ListDados[vir];
                            Semanal.splice(5, 1, ForSeg);
                            }

                            for (let i = 0; i <  SemQuant; i++) {
                              let vir = 6 + (7 * i);
                              let ForSeg = Semanal[6] + ListDados[vir];
                              Semanal.splice(6, 1, ForSeg);
                              }
                  
                        setDadosSemana(Semanal);

                }

                const IndiceInc = ()=>{
                  let Mart = [];
                  let Org = [];
                  for (let i = 0; i <  SemQuant; i++) {
                    let lev = i + 1;
                    let mek = i;
                    Mart.push(
                    lev
                    );
                    Org.push(
                       0   
                      );
                    let ind = lev * 7;
                      for (let i = 0; i < ind ; i++) {
                       let loi = Org[mek] + ListDados[i];
                       Org.splice(mek, 1, loi); 
                      }
                    let coc = Org[mek]/ind
                    Org.splice(mek, 1, coc);
                  }

                  setEspectro(Mart);
                  setValEspectro(Org);
                 
                }

                const AnaliseHoras = ()=>{
                  let Horas = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                  for(let i in ListLoc ) {
                    let date = ListLoc[i].dateIn;
                    for(let i in DiaHoras ) {
                      for(let j in  DiaHoras[i] ) {
                         if(DiaHoras[i][j].ini <= date  && DiaHoras[i][j].fim >= date ){
                           let fiq = Horas[i] + 1;
                           Horas.splice(i, 1, fiq);
                         } 
                      }  
                    }
                  }
                  let soma = 0;
                  for(var i = 0; i < Horas.length; i++) {
                    soma += Horas[i];
                }
                console.log(soma);

                  setEspcHoras(Horas);
                }

                const GerarPdf = ()=>{
                  var doc = new jsPDF("l", "pt", "a4");
                  doc.html(document.querySelector("#content"), {
                    callback: function(pdf) {
                      pdf.save("analitico.pdf");
                    }
                  })
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
                   
              <section className="content" 
              
              >
                <div className="container-fluid">
                  
                <div className="row">
                  <section className="col-12">
                  <div className="card card-warning">
                    <div className="card-header">
                        <h3 className="card-title">Filtros de Datas para Gráfico </h3>
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
                            <label>Data de Fim</label>
                                <DatePickerInput
                                  onChange={DatandoB}
                                  value={DataB}
                                  className='my-custom-datepicker-component'
                                  disabled={VerB}
                                  
                                />
                            </div>
                            </div>

                            <div className="col-sm-2">
                            <div className="form-group">
                                <label>Quantidades de Dias</label>
                                <input 
                              type="text" 
                              className="form-control" 
                              placeholder="Digite a quantidade" 
                              value={QuatD}
                              onChange={t=>ColDias(t)}
                              disabled={VerB}
                              />
                                
                              
                            </div>
                            </div>

                        
                           
                          

                            
                            <div className="col-sm-2">
                            <div className="form-group">
                            <Butao 
                            style={"btn btn-sm btn-secondary"}
                            titulo={"Limpar Pesquisa"}
                            onClick={()=>LimparCampo()}
                            />
                            </div>
                            </div>

               
                                   
                    </div>
                       
                    </div>
                    {/* /.card-body */}
                    </div>
                  {Loading === true ?
                  <>
                    <Spinner 
                        size={64}
                        color={"#5d0bf7"}
                        sizeUnit={'px'} 
                        />
                       <string style={{"font-weight":"bolder", "font-size":15,}}>ESPERE UM MOMENTO ESTAMOS PREPARANDO OS DADOS PARA OS GRÁFICOS</string>
                  </>
                      
                        :
                        <>
                    <div className="card card-danger">
                    <div className="card-header">
                        <h3 className="card-title">Filtros de Ocorrência para Gráficos </h3>
                    </div>
                    {/* /.card-header */}
                    <div className="card-body">
                    <div className="row" >
                  

                        
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
                            style={"btn btn-sm btn-success"}
                            titulo={"Produzir Gráfico das Ocorrências"}
                            onClick={()=>GrafCond()}
                            />
                           </div>
                            </div>

                            <div className="col-sm-2">
                            <div className="form-group">
                            <Butao 
                            style={"btn btn-sm btn-success"}
                            titulo={"Produzir Gráfico Referente a dias da Semana"}
                            onClick={()=>SemanalExtra()}
                            />
                            </div>
                            </div>

                            <div className="col-sm-2">
                            <div className="form-group">
                            <Butao 
                            style={"btn btn-sm btn-success"}
                            titulo={"Produzir Grafico Linha Incidencia"}
                            onClick={()=>IndiceInc()}
                            />
                            </div>
                            </div>

                            <div className="col-sm-2">
                            <div className="form-group">
                            <Butao 
                            style={"btn btn-sm btn-success"}
                            titulo={"Produzir Gráfico Referente a Horas do Dia "}
                            onClick={()=>AnaliseHoras()}
                            />
                            </div>
                            </div>
                            
                            <div className="col-sm-2">
                            <div className="form-group">
                            <Butao 
                            style={"btn btn-sm btn-warning"}
                            titulo={"Gerar Pdf"}
                            onClick={()=>GerarPdf()}
                            />
                            </div>
                            </div>
                            
                          
                                   
                    </div>
                       
                    </div>
                    {/* /.card-body */}
                    </div>
                  
                  
                   


                        <div className="card card-success" id="content">
                          
                          <div className="card-header">
                          
                            <h3 className="card-title" style={{ marginBottom: "10px"}}>Gráfico Referente a todas as Ocorrências em Quantidades  </h3> 
    
                          </div>
                            <div class="card-body table-responsive p-0">
                         
                            <Bar
                            data={{
                              labels: LDCond,
                                    datasets: [{
                                        label: ['Bloco de Ocorrencia'],
                                        data: LQuantTo,
                                        backgroundColor: [
                                            'blue',   
                                        ],
                                    }],
                            }}
                            width={400}
                            options={{   indexAxis: 'y',
                            elements: {
                              bar: {
                                borderWidth: 2,
                              },
                            },
                            responsive: true,
                            plugins: {
                              legend: {
                                position: 'right',
                              },
                              title: {
                                display: true,
                                text: 'Quantidade de Cada Ocorrência por determinado Tempo',
                              },
                            }, }}
                            />
    
                             </div>
                            </div>


                            <div className="card card-warning">
                          
                          <div className="card-header">
                          
                            <h3 className="card-title" style={{ marginBottom: "10px"}}>Gráfico Referente a todas as Ocorrências Indices de Incidencia </h3> 
    
                          </div>
                            <div class="card-body table-responsive p-0">
                         
                            <Bar
                            data={{
                              labels: LDCond,
                                    datasets: [{
                                        label: ['Bloco de Ocorrencia'],
                                        data: MedI,
                                        backgroundColor: [
                                            'red',   
                                        ],
                                    }],
                            }}
                            width={400}
                            options={{   indexAxis: 'y',
                            elements: {
                              bar: {
                                borderWidth: 2,
                              },
                            },
                            responsive: true,
                            plugins: {
                              legend: {
                                position: 'right',
                              },
                              title: {
                                display: true,
                                text: 'Indice de Incidência de cada Ocorrência',
                              },
                            }, }}
                            />
    
                             </div>
                            </div>
                            <div className="card card-secondary">
                          
                          <div className="card-header">
                          
                            <h3 className="card-title" style={{ marginBottom: "10px"}}>Linhas de Incidencia de Determinada Ocorrência </h3> 
    
                          </div>
                            <div class="card-body table-responsive p-0">
                         
                            <Line
                            data={{
                              labels: Espectro,
                                    datasets: [{
                                        label: ['Ponto de Indice'],
                                        data: ValEspectro,
                                        backgroundColor: [
                                            'purple',   
                                        ],
                                        borderColor: [
                                          'purple',   
                                      ],
                                    }],
                            }}
                            width={400}
                            options={{ 
                              responsive: true,
                              plugins: {
                                legend: {
                                  position: 'top',
                                },
                                title: {
                                  display: true,
                                  text: 'LInha de Incidencia',
                                },
                              },
                              }}
                            />
    
                             </div>
                            </div>
                            <div className="card card-primary">
                          
                          <div className="card-header">
                          
                            <h3 className="card-title" style={{ marginBottom: "10px"}}>Gráficos Referente a Dias    </h3> 
    
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
                                         
                    <div className="card card-info">
                          
                          <div className="card-header">
                          
                            <h3 className="card-title" style={{ marginBottom: "10px"}}>Gráfico Referente a dias da Semana </h3> 
    
                          </div>
                            <div class="card-body table-responsive p-0">
                         
                            <Bar
                            data={{
                              labels: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"],
                                    datasets: [{
                                        label: ['Bloco de Ocorrencia'],
                                        data: DadosSemana,
                                        backgroundColor: [
                                            'yellow',   
                                        ],
                                    }],
                            }}
                            width={400}
                            height={200}
                            options={{ maintainAspectRatio: false }}
                            />
    
                             </div>
                            </div>
                            <div className="card card-danger">
                          
                          <div className="card-header">
                          
                            <h3 className="card-title" style={{ marginBottom: "10px"}}> Gráfico Referente a Horas do Dia </h3> 
    
                          </div>
                            <div class="card-body table-responsive p-0">
                         
                            <Bar
                            data={{
                              labels: ["0H", "1H", "2H", "3H", "4H", "5H", "6H", "7H", "8H", "9H", "10H", "11H", "12H", "13H", "14H", "15H", "16H", "17H", "18H", "19H", "20H", "21H", "22H", "23H"],
                                    datasets: [{
                                        label: ['Bloco de Ocorrencia'],
                                        data: EspcHoras,
                                        backgroundColor: [
                                            'brown',   
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

