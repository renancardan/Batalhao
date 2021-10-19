import React, {useState, useEffect} from 'react';
import Api from '../../Api';
import Butao from '../../Components/Butao_list';
import Campo from '../../Components/Campo';
import Header from '../../Components/Header';



export default ({Dados, Avisando, Fechar, Id, Nome, Telefone, setAlert, setAlertTipo, MsgDesativar}) => {
  const [Infor, setInfor] = useState("");

 useEffect(() => {
  Vizualizar();
 }, []);

 useEffect(() => {
  
 }, [Infor]);
 
 
 
 
  const Vizualizar = async ()=>{
    
    if (navigator.onLine) {
      
      await Api.VizualizarApp(Id, Dados, setInfor);
      
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
  Titulo={"Vizualizando App"}
  Avisando={Avisando}
  Fechar={Fechar}
  />
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
                      <strong>Nome do App:</strong><br />
                      {Nome}<br />
                      <strong>Telefone:</strong><br />
                      {Telefone}<br />
                    </address>
                  </div>
                  {/* /.col */}
                  <div className="col-sm-4 invoice-col">
                    {Infor.responsavel &&
                       <address>
                       <strong>Nomes dos Responsaveis:</strong><br />
                      {Infor.responsavel.map((item, index)=>(
                        <>
                        {item}<br />
                        </>
                      ))
                      }
                     </address>
                    }
                   
                  </div>
                  {/* /.col */}
                  <div className="col-sm-4 invoice-col">
                    <address>
                      <strong>Placa Veículo:</strong><br />
                      {Infor.placaVeiculo}<br />
                      <strong>Informção Veículo:</strong><br />
                      {Infor.inforVeiculo}<br />
                    </address>
                  </div>
                  
                  {/* /.col */}
                </div>
                <div className="row no-print">
                  <div className="col-12">
                  <Butao 
                  style={"btn .btn-sm btn-secondary"}
                  titulo={"Desativar"}
                  onClick={()=>MsgDesativar(Id, Nome)}
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