import React from 'react';
import Aviso from './Aviso';
import Butao from './Butao_list';
import Header from './Header';
import DataTime from './DateFormat';
import jsPDF  from 'jspdf';


export default ({Fechar, Avisando, Infor, Id}) => {

  const Salvando = ()=>{
    var doc = new jsPDF({
      "orientation":"p", 
      "unit":"px", 
      "format":"a4",
      "hotfixes":["px_scaling", "fill_close"],
    });
    doc.html(document.querySelector("#dique"), {
      callback: function(pdf){
        pdf.save("mypdf.pdf");
      }
    });



  }
         
        return (
            <>
            <div className="content-wrapper" >
            <Header 
            Titulo={"Relatório Analítico"}
            Avisando={Avisando}
            Fechar={Fechar}
            />
            <div className="row">
              <section className="col-12">
              <div className="col-sm-4">
                <div className="form-group" style={{"margin":10}}>
               
                <Butao 
                style={"btn btn-sm btn-info"}
                titulo={"Salvar Em pdf"}
                onClick={()=>Salvando()}
                />
                </div>
                </div>
                <div  className="Document" >
              <div  className="Relatorio" id="dique">
              <img src="assets/logoapp.jpeg" alt="15º Batalhão Logo"  style={{opacity: '1', width: 60, marginRight: 20, marginLeft:20, marginTop:20 }} />
              <string style={{"font-weight":"bolder", "font-size":15,}}>ESTADO DO MARANHÃO </string>
              <string style={{"font-weight":"bolder", "font-size":15,}}>SECRETARIA DE ESTADO DE SEGURANÇA PÚBLICA </string>
              <string style={{"font-weight":"bolder", "font-size":15,}}>POLÍCIA MILITAR DO MARANHÃO </string>
              <string style={{"font-weight":"bolder", "font-size":15,}}>COMANDO DE POLICIAMENTO DO INTERIOR </string>
              <string style={{"font-weight":"bolder", "font-size":15,}}>15° BATALHÃO DE POLÍCIA MILITAR</string>
              <string style={{"font-weight":"bolder", "font-size":15,}}>RELATÓRIO ANALÍTICO DIÁRIO DE OCORRÊNCIAS 2021</string>
              <string style={{"font-weight":"bolder", "font-size":12,}}>DADOS INFORMATIVOS</string>
                <div className="RelatCent">
                <div className="RelatEsq">
                  <string style={{"font-weight":"bolder", "font-size":15,}}>TIPO DE OCORRÊNCIA</string>
                </div>
                <div className="RelatDire">
                {Infor.condicionais.map((item, key)=>(
                                    <>
                                    <string>{item.nome} /</string> <br />
                                    </>
                   
                                  ))}
                </div>
                </div>
                <div className="RelatCent">
                <div className="RelatEsq">
                  <string style={{"font-weight":"bolder", "font-size":15,}}>LOCAL</string>
                </div>
                <div className="RelatDire">
                <string>
                {Infor.rua}, {Infor.numero} - {Infor.bairro}, BACABAL/MA
              </string>
                </div>
                </div>
                <div className="RelatCent">
                <div className="RelatEsq">
                  <string style={{"font-weight":"bolder", "font-size":15,}}>DATA/HORA</string>
                </div>
                <div className="RelatDire">
                <string>
                <DataTime 
                DateIni={Infor.dataInicio.seconds}
                />
              </string>
                </div>
                </div>
                <div className="RelatCent">
                <div className="RelatEsq">
                  <string style={{"font-weight":"bolder", "font-size":15,}}>CONDUZIDOS</string>
                </div>
                <div className="RelatDire">
                <string>
                {Infor.conduzidos}
              </string>
                </div>
                </div>
               
                <div className="RelatCent">
                <div className="RelatEsq">
                  <string style={{"font-weight":"bolder", "font-size":15,}}>VÍTIMA</string>
                </div>
                <div className="RelatDire">
                <string>
                {Infor.vitimas}
              </string>
                </div>
                </div>
                <div className="RelatCent">
                <div className="RelatEsq">
                  <string style={{"font-weight":"bolder", "font-size":15,}}>OBJETO (S) APREENDIDO (S)</string>
                </div>
                <div className="RelatDire">
                <string>
                {Infor.objetosApre}
              </string>
                </div>
                </div>
              
                <div className="RelatCent">
                <div className="RelatEsq">
                  <string style={{"font-weight":"bolder", "font-size":15,}}>GU/SERVIÇO</string>
                </div>
                <div className="RelatDire">
                <string>
                {Infor.componentesVtr}
              </string>
                </div>
                </div>
                <div className="RelatCent">
                <div className="RelatEsq">
                  <string style={{"font-weight":"bolder", "font-size":15,}}>GUARNIÇÃO/COPOM</string>
                </div>
                <div className="RelatDire">
                <string>
                {Infor.atendenteCopom}
               </string>
                </div>
                </div>
                <div className="RelatCent">
                <div className="RelatEsq">
                  <string style={{"font-weight":"bolder", "font-size":15,}}>Nº DA OCORRÊNCIA</string>
                </div>
                <div className="RelatDire">
                <string>
                {Id}
                </string>
                </div>
                </div>
                <div className="RelatCent">
                <string style={{"font-weight":"bolder", "font-size":15,}}>RELATO DA OCORRÊNCIA</string>
                  </div>
                  <div className="RelatCent">
                <string >{Infor.relato}</string>
                  </div>
                  <div className="RelatCent">
                <string style={{"font-weight":"bolder", "font-size":15,}}>PROVIDÊNCIAS   TOMADAS</string>
                  </div>
                  <div className="RelatCent">
                <string >{Infor.providencias}</string>
                  </div>
                  <div className="RelatAssi">
               
                  </div>
                  <string style={{}}>CPU DO DIA</string>
              </div>
              </div> 
              </section>
              </div>
              </div>

            </>

        );
    }