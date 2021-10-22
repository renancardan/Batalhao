import React, {useState} from 'react';
import Api from '../../Api';
import Butao from '../../Components/Butao_list';
import Campo from '../../Components/Campo';
import Header from '../../Components/Header';



export default ({Dados, Nome, Avisando, Fechar, Id, setAlert, setAlertTipo, }) => {
const [NomeEdit, setNomeEdit] = useState(Nome);
const [Titulo, setTitulo] = useState("Editar Condicional");

        const Editando = ()=>{
          if(NomeEdit !=="" && NomeEdit !==" " && NomeEdit !=="  " && NomeEdit !=="   " && NomeEdit !=="    " && NomeEdit !=="     " && NomeEdit !=="      "
          && NomeEdit !=="       " && NomeEdit !=="        " && NomeEdit !=="         " && NomeEdit !=="          " 
          && NomeEdit !=="           " ){
            if (navigator.onLine) {
                
                Api.EditandoCondicional(Dados, Id, NomeEdit, setAlert, setAlertTipo);
         
               
              } else {
                setAlert("Sem Internet");
                setAlertTipo("danger");
              }
            }else {
                  setAlert("Coloque um nome no campo");
                  setAlertTipo("danger");
              }
        }
  
 
  

        return (
            <>
<div className="content-wrapper">
                <Header 
                Titulo={Titulo}
                Avisando={Avisando}
                Fechar={Fechar}
                />
               <section className="content">
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-12">
                      <div className="callout callout-info">
            <h5><i className="fas fa-info" /> Nota:</h5>
           Você só poderá editar a condicional, mas jamais excluir pois essa condicional ja foi usada em  outras ocorrência!
          </div>
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
                    <strong>Digite o Nome da Condicional:</strong><br />
                    <div className="input_cadatro">
                              <Campo 
                                  type={"text"}
                                  placeholder= {Nome}
                                  icon={"fas "}
                                  value={NomeEdit}
                                  onChange={e=>setNomeEdit(e.target.value)}
                                  mask={null}
                                />

                            </div> 
                    <br />
                  </address>
                </div>
                
              </div>
              <div className="row no-print">
              {Dados.grupo.menu.condicionais.editarCondicional.btn_salvar === true &&
                <div className="col-12">
                <Butao 
                style={"btn .btn-sm btn-primary"}
                titulo={"Salvar"}
                onClick={()=>Editando()}
                />  
                </div>
              }
              </div>
            </div> 
            </div>
            </div>
            </div>
          </section>
  
</div>

            </>
        );
}