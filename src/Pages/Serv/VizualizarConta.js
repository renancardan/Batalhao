import React, {useState, useEffect} from 'react';
import Api from '../../Api';
import Butao from '../../Components/Butao_list';
import Campo from '../../Components/Campo';
import Header from '../../Components/Header';
import Select from '../../Components/Select';



export default ({Dados, Avisando, Fechar, Id, setAlert, setAlertTipo, }) => {
  const [Infor, setInfor] = useState("nulo");
  const [Grupo, setGrupo] = useState();
  const [ListGrupo, setListGrupo] = useState([]);

  


 useEffect(() => {
 Vizualizar();
 }, []);

 useEffect(() => {
   if(Infor.grupo){
    setGrupo(Infor.grupo.nome)
   }

  }, [Infor]);

 useEffect(() => {
listandoGrupos();
  }, []);

  const MsgBloque = ()=>{
      setAlert("Ok");
      setAlertTipo("BloqueioCont");
  }

  const listandoGrupos = ()=>{
    Api.Gruposconta(Dados, setListGrupo);
  }
 
 const Desbloqueando = ()=>{
  if (navigator.onLine) {
      
    Api.DesbloquearConta(Dados, Id, Grupo, setAlert, setAlertTipo);
   
    
   } else {
     setAlert("Sem Internet");
     setAlertTipo("danger");
   }
 }
 
 
  const Vizualizar = async ()=>{
    
    if (navigator.onLine) {
      
      await Api.VizualizandoContas(Id, Dados, setInfor);
      
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
  Titulo={"Vizualizando Conta"}
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
                      <strong>Nome da Conta:</strong><br />
                      {Infor.nome}<br />
                      <strong>Telefone:</strong><br />
                      {Infor.telefone}<br />
                    </address>
                  </div>
                  {/* /.col */}
                  <div className="col-sm-4 invoice-col">
                   
                       <address>
                       <strong>Tipo de Conta:</strong><br />
                      {Infor.conta.serv.tipo}<br />
                      <strong>Grupo:</strong><br />
                      {Infor.conta.serv.desbloqueado === true ?
                        <>
                        {Infor.grupo.nome}<br />
                        </>
                        :
                        <>
                        <Select 
                        type={null}
                        icon={"fas "}
                        value={Grupo}
                        onChange={e=>setGrupo(e.target.value)}
                        List={ListGrupo}
                        />
                        <br />
                        </>
                      }
                      
                      
                      <br />
                      
                     </address>
                  
                   
                  </div>
                  {/* /.col */}
                  <div className="col-sm-4 invoice-col">
                    <address>
                      <strong>Ativo:</strong><br />
                      {Infor.conta.serv.ativo === true ?
                        <>
                        Sim <br />
                        </>
                        :
                        <>
                        Não <br />
                        </>
                      }
                      <strong>Desbloqueado:</strong><br />
                      {Infor.conta.serv.desbloqueado === true ?
                        <>
                        Sim <br />
                        </>
                        :
                        <>
                        Não <br />
                        </>
                      }
                    </address>
                  </div>
                  
                  {/* /.col */}
                </div>
                <div className="row no-print">
                  <div className="col-12">
                  {Infor.conta.serv.desbloqueado === true ?
                  <>
                  {Dados.grupo.menu.contas.contaServ.btn_bloquear === true &&
                        <Butao 
                        style={"btn .btn-sm btn-danger"}
                        titulo={"Bloquear"}
                        onClick={()=>MsgBloque()}
                        />
                  } 
                        </> 
                        :
                        <>
                         {Dados.grupo.menu.contas.contaServ.btn_desbloquear === true &&
                        <Butao 
                      style={"btn .btn-sm btn-warning"}
                      titulo={"Desbloquear"}
                      onClick={()=>Desbloqueando()}
                      /> 
                         }
                      </> 
                      }
                   
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