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
import Maps from '../../Components/Rastreio';
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
      const [Titulo, setTitulo] = useState("Rastreador");
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
      const [DataD, setDataD] = useState(0);
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
     const [VerD, setVerD] = useState(false);
     const [Viat, setViat] = useState([])
     const [Resu, setResu] = useState("");
     const [VerResu, setVerResu] = useState(false);
     const [IdVtr, setIdVtr] = useState("");
     const [ListRotaVt, setListRotaVt] = useState([]);
     const [DataB, setDataB] = useState("");
     const [VerRtVt, setVerRtVt] = useState(false);
     const [AtiVtr, setAtiVtr] = useState(1)
  
     
    

     

      useEffect(() => {
        listandoCond();
          }, []);

          useEffect(() => {
            console.log(ListRotaVt);
              }, [ListRotaVt]);

          useEffect(() => {
            if(Resu){
              ColocIdVtr();
            }
           
              }, [Resu]);

              useEffect(() => {
           
               
                  }, [IdVtr]);
    

          useEffect(() => {
            VenDoRast();
              }, []);

              useEffect(() => {
                VendoAtiVtr();
                  }, [IdVtr]);

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

      const MudarAtiVtr= ()=>{
        if(IdVtr){
          Api.MudAtivo(IdVtr, setAtiVtr, setAlert, setAlertTipo)
        }else {
          setAlert("Escolha A Viatura!");
          setAlertTipo("danger");
       
      }
    }

      const VendoAtiVtr= ()=>{
        Api.VendoAtivo(IdVtr, setAtiVtr)
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
                   let Dat2  = new Date(currentDate +"T23:59:59.000").getTime();
                   let Dat = DataA;
                   if(Dat2 > Dat){
                    setDataD(Dat2)
                    setVerD(true);
                   // await Api.ListOcorr(Dados, setQuant, setUsuariosContServ, setCarreg, Dat, Dat2);
     
                   } else {
                     setAlert("O Dia Final tem que ser maior que o Dia Inicial");
                     setAlertTipo("danger");
                   }
                  
               }

               const VenDoRast = ()=>{
                var Cidade = Dados.cidade;
                var Estado = Dados.estado;
                Api.LocRast(Cidade, Estado, setViat)
                }

              const LimpandoPesq = ()=>{
                setDataP();
                setDataA(new Date());
                setDataD(new Date())
                setVerD(false);
                setVerA(false);
                setResu("");
                setVerRtVt(false)
                setListLoc([])
              }

              const ColocIdVtr = ()=>{
                console.log(Resu)
                for(let i in Viat ) {
                  if(Viat[i].nome === Resu){
                    setIdVtr(Viat[i].id)
                  }

                }
              }

              const Pesquisando = ()=>{
                setLoading(true)
                Api.ListRotasVtr(IdVtr, DataA, DataD, setListRotaVt, setVerRtVt, setLoading)
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
                         <div className="card card-warning">
                    <div className="card-header">
                        <h3 className="card-title">Filtros para pesquisa</h3>
                    </div>
                    {/* /.card-header */}
                    <div className="card-body">
                    <div className="row" >
                
                            <div className="col-sm-2">
                            <div className="form-group">
                                <label>Dia Inicial</label>
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
                                <label>Dia Final</label>
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
                                <label>Esolha A Viatura</label>
                                <select className="form-control"
                                value={Resu}
                                onChange={t=>setResu(t.target.value)} 
                                disabled={VerResu}
                                ><option>Escolha</option>
                                   {Viat.map((Oc)=>(
                                    <>
                                <option>{Oc.nome}</option>
                                </>
                                ))}
                                </select>
                                
                              
                            </div>
                            </div>
                         
                            <div className="col-sm-2" style={{marginTop:"35px"}}>
                            <div className="form-group">
                            <Butao 
                            style={"btn btn-sm btn-warning"}
                            titulo={"Pesquisar"}
                            onClick={()=>Pesquisando()}
                            />
                            </div>
                            </div> 
                            
                            <div className="col-sm-2">
                            <div className="form-group">
                            <Butao 
                            style={"btn btn-sm btn-secondary"}
                            titulo={"Limpar Pesquisa"}
                            onClick={()=>LimpandoPesq()}
                            />
                            </div>
                            </div> 

                            <div className="col-sm-2">
                            <div className="form-group">
                            <Butao 
                            style={"btn btn-sm btn-primary"}
                            titulo={"Ver Ativo"}
                            onClick={()=>MudarAtiVtr()}
                            />
                            </div>
                            </div>
                            {AtiVtr === 0 &&
                              <h3 className="card-title">App  {Resu} está Ativo</h3>
                            } 
                            
                          
                                   
                    </div>
                       
                    </div>
                    {/* /.card-body */}
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
                                   Info={Dados}
                                   ListRotaVt={ListRotaVt}
                                   VerRtVt={VerRtVt}
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

