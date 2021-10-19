import React, {useState} from 'react';
import Api from '../../Api';
import Butao from '../../Components/Butao_list';
import Campo from '../../Components/Campo';
import Header from '../../Components/Header';



export default ({Dados, Avisando, Fechar, Id, Nome, Telefone, setAlert, setAlertTipo}) => {
  const [Forms, setForms] = useState([]);
  const [Placa, setPlaca] = useState("");
  const [Infor, setInfor] = useState("");

  const addInput = (e)=>{
    e.preventDefault();
    
    setForms([... Forms, ""]);
   
  }

  const DigitandoNomes = (e, index)=> {
    Forms[index] = e.target.value;
    setForms([...Forms]);
   
  }

  const TirarEsse = (position) =>{
    setForms([...Forms.filter((item, index) => index !== position)]);
   
  }
  
 const Ativando = async()=>{
    if (navigator.onLine) {
       
        await Api.AtivandoApp(Dados, Forms, Id, Placa, Infor, setAlertTipo, setAlert, Fechar); 
        
       } else {
         setAlert("Sem Internet");
         setAlertTipo("danger");
       }
    
 }

  

        return (
            <>
<div className="content-wrapper">
  {/* Content Header (Page header) */}
  <Header 
  Titulo={"Ativando App"}
  Avisando={Avisando}
  Fechar={Fechar}
  />
  
  <section className="content">
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="callout callout-info">
            <h5><i className="fas fa-info" /> Nota:</h5>
           Escolha quem vai usar o Aplicativo e qual veiculo vai interligar com app e  ative-o.
          </div>
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
                      <strong>Nome do App:</strong><br />
                      {Nome}<br />
                      <strong>Telefone:</strong><br />
                      {Telefone}<br />

<br />

                      <strong>Adicionar os Responsaveis:</strong><br />
                      <a class="btn btn-app" onClick={addInput}>
                      <i class="fas fa-plus"></i> Add</a><br />
                      {
                        Forms.map( (item, index )=> (
                          <>
                          <div key={index} className="input_cadatro">
                           
                          <Campo 
                              type={"text"}
                              placeholder= {"Responsavel " + (index+1)}
                              icon={"fas"}
                              value={item}
                              onChange={e=>DigitandoNomes(e, index)}
                              mask={null}
                            />
                           
                           <a class="btn btn-danger" onClick={()=>TirarEsse(index)}>
                           <i class="fas fa-trash"></i> 
                            </a> 
                        </div> <br />
                        </>
                        ))
                      }
                    </address>
                  </div>
                  {/* /.col */}
                  <div className="col-sm-4 invoice-col">
                    <address>
                      <strong>Nomes dos Responsaveis:</strong><br />
                      {
                        Forms.map( (item, index )=> (
                          <>
                          {item}<br />
                          </>
                        ))
                        } 
                    </address>
                  </div>
                  {/* /.col */}
                  <div className="col-sm-4 invoice-col">
                    <address>
                      <strong>Placa do Veiculo:</strong><br />
                      <Campo 
                              type={"text"}
                              placeholder= {"Placa do Veiculo"}
                              icon={"fas"}
                              value={Placa}
                              onChange={e=>setPlaca(e.target.value)}
                              mask={"aaa-9*99"}
                            />
                      <br />
                      <strong>Informação do Veiculo:</strong><br />
                      <Campo 
                              type={"text"}
                              placeholder= {"Informações"}
                              icon={"fas"}
                              value={Infor}
                              onChange={e=>setInfor(e.target.value)}
                              mask={null}
                            />
                      <br />
                    </address>
                  </div>
                  
                  {/* /.col */}
                </div>
                <div className="row no-print">
                  <div className="col-12">
                  <Butao 
                  style={"btn .btn-sm btn-success"}
                  titulo={"Ativar"}
                  onClick={Ativando}
                  />   
                  </div>
                </div>
              </div> 

          {/* /.invoice */}
        </div>{/* /.col */}
      </div>{/* /.row */}
    </div>{/* /.container-fluid */}
  </section>
  {/* /.content */}
</div>
{/* /.content-wrapper */}

            </>
        );
}