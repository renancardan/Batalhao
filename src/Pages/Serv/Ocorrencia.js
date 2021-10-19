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
import 'rc-datepicker/lib/style.css';
import Checkbox from '../../Components/Checkbox';
import ViOcrr from '../../Components/VizuOc'



export default ({Dados, setDados, Loading,  setLoading,  Alert, setAlert, AlertTipo,
   setAlertTipo, Avisando, setAvisando}) => {
      const [Offset, setOffset] = useState(0);
      const [Limit, setLimit] = useState(10);
      const [Quant, setQuant] = useState(0);
      const [Pag1, setPag1] = useState(false);
      const [Pag2, setPag2] = useState(false);
      const [Pag3, setPag3] = useState(false);
      const [Titulo, setTitulo] = useState("Ocorrências");
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
      const [VerRua, setVerRua] = useState(false);
      const [Bairro, setBairro] = useState("");
      const [VerBairro, setVerBairro] = useState(false);
      const [Vtr, setVtr] = useState("");
      const [VerVtr, setVerVtr] = useState(false);
      const [AtenCop, setAtenCop] = useState("");
      const [VerAtenCop, setVerAtenCop] = useState(false);
      const [CompVtr, setCompVtr] = useState("");
      const [VerCompVtr, setVerCompVtr] = useState(false);
      const [Condu, setCondu] = useState("");
      const [VerCondu, setVerCondu] = useState(false);
      const [Viti, setViti] = useState("");
      const [VerViti, setVerViti] = useState(false);
      const [Obj, setObj] = useState("");
      const [VerObj, setVerObj] = useState(false);
      const [Ocorr, setOcorr] = useState("");
      const [VerOcrr, setVerOcrr] = useState(false);
      const [PesqBtn, setPesqBtn] = useState(false);
      const [Exc, setExc] = useState(true);
     
     

      useEffect(() => {
       ListOc();     
      }, [])

      useEffect(() => {
        PesqExcluidos();
       }, [Exc])

      useEffect(() => {
        Listando();
       
       }, [UsuariosContServ])

       useEffect(() => {
        Listando();
       }, [Offset])

       useEffect(() => {
        if(Resu !== ""){
            PesqResult();
        }
       }, [Resu])

       useEffect(() => {
       console.log(Lista)
       }, [Lista])

     
      
  
     
          const ListOc = async ()=>{
            if (navigator.onLine) {
             await setCarreg(true);
              await Api.ListOcorr(Dados, setQuant, setUsuariosContServ, setCarreg);
             
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


               
               


                

         

               const Pagina1 = (id)=>{
                setId(id);
                setPag1(true);
               }

               const Pagina2 = async (id)=>{
                setId(id);
                setPag1(true);
                setPag2(true);

              }
              const Pagina3 = async ()=>{
              
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
              setPesqBtn(false);
              ListOc();
              setBairro("");
              setResu("");
              setRua("");
              setVtr("");
              setAtenCop("");
              setCompVtr("");
              setCondu("");
              setViti("");
              setObj("");
              setOcorr("");
              setVerOcrr(false);
              setVerObj(false);
              setVerViti(false);
              setVerCondu(false);
              setVerCompVtr(false);
              setVerRua(false);
              setVerResu(false);
              setVerBairro(false);
              setVerVtr(false);
              setVerAtenCop(false);
              setExc(true);
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
              console.log(Dat);
              if(DataA > Dat){
                setVerD(true);
                let listanha = [];
                for(let i in UsuariosContServ ) {
                  
                  if( UsuariosContServ[i].dateIn >= Dat ) {
                    if( UsuariosContServ[i].dateIn <= DataA ) {
                      listanha.push({
                        id: UsuariosContServ[i].id, 
                        date: UsuariosContServ[i].date,
                        ativo: UsuariosContServ[i].ativo, 
                        dateIn: UsuariosContServ[i].dateIn,
                        bairro:  UsuariosContServ[i].bairro,
                        resultado: UsuariosContServ[i].resultado,
                        condi: UsuariosContServ[i].condi,
                        vtr:  UsuariosContServ[i].vtr, 
                        atendenteCopom:  UsuariosContServ[i].atendenteCopom,
                        componentesVtr:  UsuariosContServ[i].componentesVtr,
                        conduzidos:  UsuariosContServ[i].conduzidos,
                        vitimas:  UsuariosContServ[i].vitimas,
                        objetosApre:  UsuariosContServ[i].objetosApre,
                        excluir: UsuariosContServ[i].excluir,
                        periodo: UsuariosContServ[i].periodo,
                        numero: UsuariosContServ[i].numero,
                          
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

            

   

            const PesqResult = ()=>{
             
              setVerResu(true);
              let listra1 = [];
              for(let i in UsuariosContServ ) {
                
                  if( UsuariosContServ[i].resultado.toLowerCase() == Resu.toLowerCase() ) {
                    listra1.push({
                      id: UsuariosContServ[i].id, 
                      date: UsuariosContServ[i].date,
                      ativo: UsuariosContServ[i].ativo, 
                      dateIn: UsuariosContServ[i].dateIn,
                      bairro: UsuariosContServ[i].bairro,
                      resultado: UsuariosContServ[i].resultado,
                      condi: UsuariosContServ[i].condi,
                      rua:  UsuariosContServ[i].rua,
                      vtr:  UsuariosContServ[i].vtr, 
                      atendenteCopom:  UsuariosContServ[i].atendenteCopom,
                      componentesVtr:  UsuariosContServ[i].componentesVtr,
                      conduzidos:  UsuariosContServ[i].conduzidos,
                      vitimas:  UsuariosContServ[i].vitimas,
                      objetosApre:  UsuariosContServ[i].objetosApre,
                      excluir: UsuariosContServ[i].excluir,
                      periodo: UsuariosContServ[i].periodo,
                      numero: UsuariosContServ[i].numero,   
                  });   
                  }
                 
                }
                setLista(["list"]);
                 setQuant(listra1.length);
                setUsuariosContServ(listra1);
            }


            const PesqRua = ()=>{
              if(Rua !== ""){
                setVerRua(true);
             
              let listra2 = [];
              for(let i in UsuariosContServ ) {
              
                  if( UsuariosContServ[i].rua.toLowerCase().includes(Rua.toLowerCase())  ) {
                    
                    listra2.push({
                      id: UsuariosContServ[i].id, 
                      date: UsuariosContServ[i].date,
                      ativo: UsuariosContServ[i].ativo, 
                      dateIn: UsuariosContServ[i].dateIn,
                      bairro: UsuariosContServ[i].bairro,
                      resultado: UsuariosContServ[i].resultado,
                      condi: UsuariosContServ[i].condi,
                      rua:  UsuariosContServ[i].rua,
                      vtr:  UsuariosContServ[i].vtr, 
                      atendenteCopom:  UsuariosContServ[i].atendenteCopom,
                      componentesVtr:  UsuariosContServ[i].componentesVtr,
                      conduzidos:  UsuariosContServ[i].conduzidos,
                      vitimas:  UsuariosContServ[i].vitimas,
                      objetosApre:  UsuariosContServ[i].objetosApre,
                      excluir: UsuariosContServ[i].excluir,
                      periodo: UsuariosContServ[i].periodo,
                      numero: UsuariosContServ[i].numero,
                  });   
                  }
                 
                }
                
                setLista(["list"]);
                setQuant(listra2.length);
                setUsuariosContServ(listra2);

              }
              
            }

            

            const PesqBairro = ()=>{
              if(Bairro !== ""){
                setVerBairro(true);
             
                let listra3 = [];
                for(let i in UsuariosContServ ) {
                  
                    if( UsuariosContServ[i].bairro.toLowerCase().includes(Bairro.toLowerCase())  ) {
                      listra3.push({
                        id: UsuariosContServ[i].id, 
                        date: UsuariosContServ[i].date,
                        ativo: UsuariosContServ[i].ativo, 
                        dateIn: UsuariosContServ[i].dateIn,
                        bairro: UsuariosContServ[i].bairro,
                        resultado: UsuariosContServ[i].resultado,
                        condi: UsuariosContServ[i].condi,
                        rua:  UsuariosContServ[i].rua,
                        vtr:  UsuariosContServ[i].vtr, 
                        atendenteCopom:  UsuariosContServ[i].atendenteCopom,
                        componentesVtr:  UsuariosContServ[i].componentesVtr,
                        conduzidos:  UsuariosContServ[i].conduzidos,
                        vitimas:  UsuariosContServ[i].vitimas,
                        objetosApre:  UsuariosContServ[i].objetosApre,
                        excluir: UsuariosContServ[i].excluir,
                        periodo: UsuariosContServ[i].periodo,
                        numero: UsuariosContServ[i].numero,
                    });   
                    }
                   
                  }
                  setLista(["list"]);
                   setQuant(listra3.length);
                  setUsuariosContServ(listra3);
              }
             
            }

            const PesqVtr = ()=>{
              if(Vtr !== ""){
                setVerVtr(true);
             
              let listra4 = [];
              for(let i in UsuariosContServ ) {
                
                  if( UsuariosContServ[i].vtr.toLowerCase().includes(Vtr.toLowerCase())  ) {
                    listra4.push({
                      id: UsuariosContServ[i].id, 
                      date: UsuariosContServ[i].date,
                      ativo: UsuariosContServ[i].ativo, 
                      dateIn: UsuariosContServ[i].dateIn,
                      bairro: UsuariosContServ[i].bairro,
                      resultado: UsuariosContServ[i].resultado,
                      condi: UsuariosContServ[i].condi,
                      rua:  UsuariosContServ[i].rua,
                      vtr:  UsuariosContServ[i].vtr, 
                      atendenteCopom:  UsuariosContServ[i].atendenteCopom,
                      componentesVtr:  UsuariosContServ[i].componentesVtr,
                      conduzidos:  UsuariosContServ[i].conduzidos,
                      vitimas:  UsuariosContServ[i].vitimas,
                      objetosApre:  UsuariosContServ[i].objetosApre,
                      excluir: UsuariosContServ[i].excluir,
                      periodo: UsuariosContServ[i].periodo,
                      numero: UsuariosContServ[i].numero,
                  });   
                  }
                 
                }
                setLista(["list"]);
                 setQuant(listra4.length);
                setUsuariosContServ(listra4);

              }
              
            }

            const PesqAtendCop = ()=>{
              if(AtenCop !== ""){
                setVerAtenCop(true);
             
              let listra5 = [];
              for(let i in UsuariosContServ ) {
                
                  if( UsuariosContServ[i].atendenteCopom.toLowerCase().includes(AtenCop.toLowerCase())  ) {
                    listra5.push({
                      id: UsuariosContServ[i].id, 
                      date: UsuariosContServ[i].date,
                      ativo: UsuariosContServ[i].ativo, 
                      dateIn: UsuariosContServ[i].dateIn,
                      bairro: UsuariosContServ[i].bairro,
                      resultado: UsuariosContServ[i].resultado,
                      condi: UsuariosContServ[i].condi,
                      rua:  UsuariosContServ[i].rua,
                      vtr:  UsuariosContServ[i].vtr, 
                      atendenteCopom:  UsuariosContServ[i].atendenteCopom,
                      componentesVtr:  UsuariosContServ[i].componentesVtr,
                      conduzidos:  UsuariosContServ[i].conduzidos,
                      vitimas:  UsuariosContServ[i].vitimas,
                      objetosApre:  UsuariosContServ[i].objetosApre,
                      excluir: UsuariosContServ[i].excluir,
                      periodo: UsuariosContServ[i].periodo,
                      numero: UsuariosContServ[i].numero,
                  });   
                  }
                 
                }
                setLista(["list"]);
                 setQuant(listra5.length);
                setUsuariosContServ(listra5);

              }
              
            }

            const PesqCompVtr = ()=>{
              if(CompVtr !== ""){
                setVerCompVtr(true);
             
              let listra6 = [];
              for(let i in UsuariosContServ ) {
                
                  if( UsuariosContServ[i].componentesVtr.toLowerCase().includes(CompVtr.toLowerCase())  ) {
                    listra6.push({
                      id: UsuariosContServ[i].id, 
                      date: UsuariosContServ[i].date,
                      ativo: UsuariosContServ[i].ativo, 
                      dateIn: UsuariosContServ[i].dateIn,
                      bairro: UsuariosContServ[i].bairro,
                      resultado: UsuariosContServ[i].resultado,
                      condi: UsuariosContServ[i].condi,
                      rua:  UsuariosContServ[i].rua,
                      vtr:  UsuariosContServ[i].vtr, 
                      atendenteCopom:  UsuariosContServ[i].atendenteCopom,
                      componentesVtr:  UsuariosContServ[i].componentesVtr,
                      conduzidos:  UsuariosContServ[i].conduzidos,
                      vitimas:  UsuariosContServ[i].vitimas,
                      objetosApre:  UsuariosContServ[i].objetosApre,
                      excluir: UsuariosContServ[i].excluir,
                      periodo: UsuariosContServ[i].periodo,
                      numero: UsuariosContServ[i].numero,
                  });   
                  }
                 
                }
                setLista(["list"]);
                 setQuant(listra6.length);
                setUsuariosContServ(listra6);

              }
              
            }

            const PesqCondu = ()=>{
              if(Condu !== ""){
                setVerCondu(true);
             
              let listra7 = [];
              for(let i in UsuariosContServ ) {
                
                  if( UsuariosContServ[i].conduzidos.toLowerCase().includes(Condu.toLowerCase())  ) {
                    listra7.push({
                      id: UsuariosContServ[i].id, 
                      date: UsuariosContServ[i].date,
                      ativo: UsuariosContServ[i].ativo, 
                      dateIn: UsuariosContServ[i].dateIn,
                      bairro: UsuariosContServ[i].bairro,
                      resultado: UsuariosContServ[i].resultado,
                      condi: UsuariosContServ[i].condi,
                      rua:  UsuariosContServ[i].rua,
                      vtr:  UsuariosContServ[i].vtr, 
                      atendenteCopom:  UsuariosContServ[i].atendenteCopom,
                      componentesVtr:  UsuariosContServ[i].componentesVtr,
                      conduzidos:  UsuariosContServ[i].conduzidos,
                      vitimas:  UsuariosContServ[i].vitimas,
                      objetosApre:  UsuariosContServ[i].objetosApre,
                      excluir: UsuariosContServ[i].excluir,
                      periodo: UsuariosContServ[i].periodo,
                      numero: UsuariosContServ[i].numero,
                  });   
                  }
                 
                }
                setLista(["list"]);
                 setQuant(listra7.length);
                setUsuariosContServ(listra7);

              }
              
            }

            const PesqViti = ()=>{
              if(Viti !== ""){
                setVerViti(true);
             
              let listra8 = [];
              for(let i in UsuariosContServ ) {
                
                  if( UsuariosContServ[i].vitimas.toLowerCase().includes(Viti.toLowerCase())  ) {
                    listra8.push({
                      id: UsuariosContServ[i].id, 
                      date: UsuariosContServ[i].date,
                      ativo: UsuariosContServ[i].ativo, 
                      dateIn: UsuariosContServ[i].dateIn,
                      bairro: UsuariosContServ[i].bairro,
                      resultado: UsuariosContServ[i].resultado,
                      condi: UsuariosContServ[i].condi,
                      rua:  UsuariosContServ[i].rua,
                      vtr:  UsuariosContServ[i].vtr, 
                      atendenteCopom:  UsuariosContServ[i].atendenteCopom,
                      componentesVtr:  UsuariosContServ[i].componentesVtr,
                      conduzidos:  UsuariosContServ[i].conduzidos,
                      vitimas:  UsuariosContServ[i].vitimas,
                      objetosApre:  UsuariosContServ[i].objetosApre,
                      excluir: UsuariosContServ[i].excluir,
                      periodo: UsuariosContServ[i].periodo,
                      numero: UsuariosContServ[i].numero,
                  });   
                  }
                 
                }
                setLista(["list"]);
                 setQuant(listra8.length);
                setUsuariosContServ(listra8);

              }
              
            }

            const PesqObj = ()=>{
              if(Obj !== ""){
                setVerObj(true);
             
              let listra9 = [];
              for(let i in UsuariosContServ ) {
                
                  if( UsuariosContServ[i].objetosApre.toLowerCase().includes(Obj.toLowerCase())  ) {
                    listra9.push({
                      id: UsuariosContServ[i].id, 
                      date: UsuariosContServ[i].date,
                      ativo: UsuariosContServ[i].ativo, 
                      dateIn: UsuariosContServ[i].dateIn,
                      bairro: UsuariosContServ[i].bairro,
                      resultado: UsuariosContServ[i].resultado,
                      condi: UsuariosContServ[i].condi,
                      rua:  UsuariosContServ[i].rua,
                      vtr:  UsuariosContServ[i].vtr, 
                      atendenteCopom:  UsuariosContServ[i].atendenteCopom,
                      componentesVtr:  UsuariosContServ[i].componentesVtr,
                      conduzidos:  UsuariosContServ[i].conduzidos,
                      vitimas:  UsuariosContServ[i].vitimas,
                      objetosApre:  UsuariosContServ[i].objetosApre,
                      excluir: UsuariosContServ[i].excluir,
                      periodo: UsuariosContServ[i].periodo,
                      numero: UsuariosContServ[i].numero,
                  });   
                  }
                 
                }
                setLista(["list"]);
                 setQuant(listra9.length);
                setUsuariosContServ(listra9);

              }
              
            }

            const PesqOcrr = ()=>{
              if(Ocorr !== ""){
                setVerOcrr(true);
             
              let listra10 = [];
              for(let i in UsuariosContServ ) {
                for(let j in UsuariosContServ[i].condi ){
                    if( UsuariosContServ[i].condi[j].nome.toLowerCase().includes(Ocorr.toLowerCase())  ) {
                      listra10.push({
                        id: UsuariosContServ[i].id, 
                        date: UsuariosContServ[i].date,
                        ativo: UsuariosContServ[i].ativo, 
                        dateIn: UsuariosContServ[i].dateIn,
                        bairro: UsuariosContServ[i].bairro,
                        resultado: UsuariosContServ[i].resultado,
                        condi: UsuariosContServ[i].condi,
                        rua:  UsuariosContServ[i].rua,
                        vtr:  UsuariosContServ[i].vtr, 
                        atendenteCopom:  UsuariosContServ[i].atendenteCopom,
                        componentesVtr:  UsuariosContServ[i].componentesVtr,
                        conduzidos:  UsuariosContServ[i].conduzidos,
                        vitimas:  UsuariosContServ[i].vitimas,
                        objetosApre:  UsuariosContServ[i].objetosApre,
                        excluir: UsuariosContServ[i].excluir,
                        periodo: UsuariosContServ[i].periodo,
                        numero: UsuariosContServ[i].numero,
                    });   
                    }

                  }
                 
                 
                }
                setLista(["list"]);
                 setQuant(listra10.length);
                setUsuariosContServ(listra10);

              }
              
            }

            const PesqExcluidos = ()=>{
              if(Exc !== true){
             
             
              let listra11 = [];
              for(let i in UsuariosContServ ) {
                console.log(UsuariosContServ[i].excluir)
                  if( UsuariosContServ[i].excluir === Exc)   {
                    listra11.push({
                      id: UsuariosContServ[i].id, 
                      date: UsuariosContServ[i].date,
                      ativo: UsuariosContServ[i].ativo, 
                      dateIn: UsuariosContServ[i].dateIn,
                      bairro: UsuariosContServ[i].bairro,
                      resultado: UsuariosContServ[i].resultado,
                      condi: UsuariosContServ[i].condi,
                      rua:  UsuariosContServ[i].rua,
                      vtr:  UsuariosContServ[i].vtr, 
                      atendenteCopom:  UsuariosContServ[i].atendenteCopom,
                      componentesVtr:  UsuariosContServ[i].componentesVtr,
                      conduzidos:  UsuariosContServ[i].conduzidos,
                      vitimas:  UsuariosContServ[i].vitimas,
                      objetosApre:  UsuariosContServ[i].objetosApre,
                      excluir: UsuariosContServ[i].excluir,
                      periodo: UsuariosContServ[i].periodo,
                      numero: UsuariosContServ[i].numero,
                  });   
                  }
                 
                }
                setLista(["list"]);
                 setQuant(listra11.length);
                setUsuariosContServ(listra11);

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
                      <CaixaInforme 
                      cor={"small-box bg-info"}
                      valor={Quant}
                      porcentagen={false}
                      nome={"Quant. Ocorrência"}
                      icon={"nav-icon fas fa-taxi"}
                      link={false}
                      />
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
                                <label>Resultado Final</label>
                                <select className="form-control"
                                value={Resu}
                                onChange={t=>setResu(t.target.value)} 
                                disabled={VerResu}
                                >
                                <option>Pesquisar</option>
                                <option>Condução ao DP</option>
                                <option>Resolvido no local</option>
                                <option>Evadiu-se</option>
                                <option>Nada constatado</option>
                                <option>Ocorrência computada</option>
                                <option>Outros</option>
                                </select>
                                
                              
                            </div>
                            </div>
                            <div className="col-sm-2">
                            <div className="form-group">
                                <label>Rua da Ocorrência</label>
                                <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Digite a Rua "
                                value={Rua}
                                onChange={t=>setRua(t.target.value)}
                                disabled={VerRua}
                                onBlur={()=>PesqRua()}
                                />
                            </div>
                            </div>  
                            <div className="col-sm-2">
                            <div className="form-group">
                                <label>Bairro da Ocorrência</label>
                                <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Digite o Bairro"
                                disabled={VerBairro}
                                value={Bairro}
                                onChange={t=>setBairro(t.target.value)}
                                onBlur={()=>PesqBairro()}
                                />
                                
                            </div>
                            </div> 
                            <div className="col-sm-2">
                            <div className="form-group">
                                <label>Vtr</label>
                                <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Digite A Vtr"
                                disabled={VerVtr}
                                value={Vtr}
                                onChange={t=>setVtr(t.target.value)}
                                onBlur={()=>PesqVtr()}
                                />
                            </div>
                            </div> 
                            <div className="col-sm-2">
                            <div className="form-group">
                                <label>Atendente Copom</label>
                                <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Digite o Atendente"
                                value={AtenCop}
                                onChange={t=>setAtenCop(t.target.value)}
                                onBlur={()=>PesqAtendCop()}
                                disabled={VerAtenCop}
                                />
                            </div>
                            </div> 
                            <div className="col-sm-2">
                            <div className="form-group">
                                <label>Componentes da Vtr</label>
                                <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Digite os Componentes "
                                value={CompVtr}
                                onChange={t=>setCompVtr(t.target.value)}
                                onBlur={()=>PesqCompVtr()}
                                disabled={VerCompVtr}
                                />
                            </div>
                            </div>
                            <div className="col-sm-2">
                            <div className="form-group">
                                <label>Conduzidos</label>
                                <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Digite os Conduzidos "
                                value={Condu}
                                onChange={t=>setCondu(t.target.value)}
                                onBlur={()=>PesqCondu()}
                                disabled={VerCondu}
                                />
                            </div>
                            </div>  
                            <div className="col-sm-2">
                            <div className="form-group">
                                <label>Vítimas</label>
                                <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Digite as Vítimas "
                                value={Viti}
                                onChange={t=>setViti(t.target.value)}
                                onBlur={()=>PesqViti()}
                                disabled={VerViti}
                                />
                            </div>
                            </div>  
                            <div className="col-sm-2">
                            <div className="form-group">
                                <label>Objetos Ap.</label>
                                <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Digite os objetos apreendidos "
                                value={Obj}
                                onChange={t=>setObj(t.target.value)}
                                onBlur={()=>PesqObj()}
                                disabled={VerObj}
                                />
                            </div>
                            </div>  
                          
                            <div className="col-sm-2">
                            <div className="form-group">
                                <label>Ocorrência</label>
                                <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Digite as Ocorrências "
                                value={Ocorr}
                                onChange={t=>setOcorr(t.target.value)}
                                onBlur={()=>PesqOcrr()}
                                disabled={VerOcrr}
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
                            
                          
                                   
                    </div>
                       
                    </div>
                    {/* /.card-body */}
                    </div>
                    {Dados.grupo.menu.ocorrencia.listaOcorrencia.Ver === true &&
                    <div className="card card-primary" >

                     {/* <DatePicker locale='pt-br'  onChange={null} value={date} /> */}
                    
                      <div className="card-header">
                      
                        <h3 className="card-title" style={{ marginBottom: "10px", marginRight: "20px"}}>Lista de Ocorrência  </h3> 
                        {Exc === true ?
                         <Checkbox 
                         label={"Tirar as Ocorrencias Excluidas"} 
                         res={Exc} 
                         onChange={(value)=>{setExc(value)}} 
                         />
                        
                        :
                        <string>Foi tirada todas as ocorrências Excluidas</string>
                        }
                        
                        
                      </div>
                        <div class="card-body table-responsive p-0">
                        <div className="col-sm-4">
                            <div className="form-group" style={{"margin":10}}>
                            <Butao 
                            style={"btn btn-sm btn-info"}
                            titulo={"Vizualizar Todos os campos"}
                            onClick={()=>Pagina3()}
                            />
                            </div>
                            </div> 
                          <table class="table table-hover text-nowrap">
                            <thead>
                              <tr>
                                <th>Data</th>
                                <th>Ocorrência</th>
                                <th>Bairro</th>
                                <th>Resultado</th>
                                <th>Status</th>
                                <th>Ações</th>
                               
                              </tr>
                            </thead>
                            
                            { Lista[0].list ?
                            <tbody >
                            {Lista.map((item, key)=>(
    
                                   

                                    
                                    <tr key={item.list.id}  style={{backgroundColor: item.list.ativo=== true ?"#98C0FF": item.list.excluir === false ? "#FFF": "#FF7878"}}>
                                    <td >
                                      <DataTime 
                                      DateIni={item.list.date}
                                      />
                                      </td>
                                      <td >
                                        {item.list.condi[0] &&
                                        <>
                                           {item.list.condi[0].nome}
                                        </>
                                        }
                                     
                                      </td>
                                      <td >
                                      {item.list.bairro}
                                      </td>
                                      <td >
                                      {item.list.resultado}
                                      </td>
                                    {item.list.ativo === false ?
                                       <td>Concluido</td>
                                    :
                                       <td>Em andamento</td>
                                    }
                                   
                                   
                                   
                                    <td>
                                    
                                    {Dados.grupo.menu.ocorrencia.listaOcorrencia.btn_vizualizar === true &&
                                    <Butao 
                                    style={"btn btn-xs btn-info"}
                                    titulo={"Vizualizar"}
                                    onClick={()=>Pagina1(item.list.id)}
                                    />
                                    }
                                    {Dados.grupo.menu.ocorrencia.listaOcorrencia.btn_editar === true &&
                                    <Butao 
                                    style={"btn btn-xs btn-success"}
                                    titulo={"Editar"}
                                    onClick={()=>Pagina2(item.list.id)}
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
                                      <p style={{color:"red", margin:"20px"}}>Não existe Ocorrência Cadastrada</p>
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
         <VizualizaOc 
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
         <EditOc
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
            <ViOcrr
            Lista={Lista}
            Avisando={Avisando}
            Fechar={Fechar}
            />
          }
        </>
       

        }
         
        </>
        
         }
      </div>

        );
    }

