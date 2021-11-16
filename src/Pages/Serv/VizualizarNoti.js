import React, {useState, useEffect} from 'react';
import Api from '../../Api';
import Butao from '../../Components/Butao_list';
import Campo from '../../Components/Campo';
import Header from '../../Components/Header';
import Select from '../../Components/Select';
import DataForma from '../../Components/DateFormat';



export default ({Dados, Avisando, Fechar, Id, setAlert, setAlertTipo, }) => {
  const [Infor, setInfor] = useState("nulo");
 


 

 useEffect(() => {
 Vizualizar();
 }, []);



  

 
 

 
 
  const Vizualizar = async ()=>{
    
    if (navigator.onLine) {
      
      await Api.VizualizandoNoti(Id, Dados, setInfor);
      
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
  Titulo={"Vizualizando a Notícia"}
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
                      <strong>Titulo do Anúncio:</strong><br />
                      {Infor.TituloAnun}<br /><br />
                      <strong>Titulo da Noticia:</strong><br />
                      {Infor.Titulo}<br /><br />
                      <strong>Data da Noticia:</strong><br />
                      <DataForma
                      DateIni={Infor.dataDanoti/1000}
                      />
                      <br /><br />
                      <strong>Data da Criação da Noticia:</strong><br />
                      <DataForma
                      DateIni={Infor.dataCriacao.seconds}
                      />
                      <br /><br />
                    </address>
                  </div>
                  {/* /.col */}
                  <div className="col-sm-8 invoice-col">
                  <address>
                  <label for="exampleInputFile">Imagens</label>
                    <div className="FotosArqui">
                    <div className="FotoArqui" >
                    {Infor.foto1 !== "" &&
                      <img src={Infor.foto1} alt="imagem" className="FotoQua" />
                    }
                      </div>
                    <div className="FotoArqui" >
                    {Infor.foto2 !== "" &&
                    <img src={Infor.foto2} alt="imagem" className="FotoQua" />
                      }
                      </div>
                      <div className="FotoArqui" >
                      {Infor.foto3 !== "" &&
                      <img src={Infor.foto3} alt="imagem" className="FotoQua" />
                        }
                      </div>
                      <div className="FotoArqui" >
                        {Infor.foto4 !== "" &&
                           <img src={Infor.foto4} alt="imagem" className="FotoQua" />
                        }
                     
                      </div>
                    </div>
                  <br />
                    <strong>Texto da Notícia:</strong><br />
                    {Infor.body}<br />
                    <br />
                  </address>
             </div>
                  {/* /.col */}
                  
                  
                  {/* /.col */}
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