import React, {useState} from 'react';
import Api from '../../Api';
import Butao from '../../Components/Butao_list';
import Campo from '../../Components/Campo';
import Header from '../../Components/Header';



export default ({Dados, Avisando, Fechar, Id, setAlert, setAlertTipo, MsgDesativar}) => {
const [Nome, setNome] = useState("");
const [Titulo, setTitulo] = useState("Criar Condicional");


  const criando = ()=>{
    console.log(Nome);
    if(Nome !=="" && Nome !==" " && Nome !=="  " && Nome !=="   " && Nome !=="    " && Nome !=="     " && Nome !=="      "
    && Nome !=="       " && Nome !=="        " && Nome !=="         " && Nome !=="          " 
    && Nome !=="           " ){
      if (navigator.onLine) {
                
        Api.CriarCondicionalServ(Dados, Nome, setAlertTipo, setAlert);
 
       
      } else {
        setAlert("Sem Internet");
        setAlertTipo("danger");
      }
    } else {
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
           Crie uma condicional para ser usado na hora da  ocorrência!
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
                                  placeholder= {"Nome da condicional"}
                                  icon={"fas "}
                                  value={Nome}
                                  onChange={e=>setNome(e.target.value)}
                                  mask={null}
                                />

                            </div> 
                    <br />
                  </address>
                </div>
                
              </div>
              <div className="row no-print">
              {Dados.grupo.menu.condicionais.criarCondicional.btn_salvar === true &&
                <div className="col-12">
                <Butao 
                style={"btn .btn-sm btn-info"}
                titulo={"Salvar"}
                onClick={()=>criando()}
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