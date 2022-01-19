import React, {useState, useEffect} from 'react';
import Api from '../../Api';
import Butao from '../../Components/Butao_list';
import Campo from '../../Components/Campo';
import Header from '../../Components/Header';



export default ({Dados, Avisando, Fechar, Id, setAlert, setAlertTipo, MsgDesativar}) => {
const [Nome, setNome] = useState("");
const [Titulo, setTitulo] = useState("Criar Anuncio");
const [Img1, setImg1] = useState("../assets/avatarimg.png");
const [Imgs, setImgs] = useState("");

useEffect(() => {
 console.log(Imgs)
  }, [Imgs]);

  const criando = ()=>{
    console.log(Nome);
    if(Nome !=="" && Nome !==" " && Nome !=="  " && Nome !=="   " && Nome !=="    " && Nome !=="     " && Nome !=="      "
    && Nome !=="       " && Nome !=="        " && Nome !=="         " && Nome !=="          " 
    && Nome !=="           " ){
      if (navigator.onLine) {
                
        Api.CriandoAnun(Dados,  setAlertTipo, setAlert, Imgs, Nome );
 
       
      } else {
        setAlert("Sem Internet");
        setAlertTipo("danger");
      }
    } else {
      setAlert("Coloque um nome no campo");
        setAlertTipo("danger");
    }
    
  }

  const ColocarImg1 = (e)=>{
    const reader = new FileReader()
    reader.onload = () => {
      if(reader.readyState === 2) {
        setImg1(reader.result);
      }
    }
   reader.readAsDataURL(e.target.files[0]);
    setImgs(e.target.files[0]);
  }
  const ExcImg1 = ()=>{
   
    setImgs("");
    setImg1("../assets/avatarimg.png");
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
                    <strong>Digite o Nome do Anuncio:</strong><br />
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
                    <strong>Coloque uma Imagem 400px por 50px  :</strong><br />
                    <div className="FotosArqui" >
                    <div className="FotoQuaAnun" >
                      {Img1 === "../assets/avatarimg.png" ?
                         <img src={Img1} alt="imagem" className="FotoQua2" />
                      :
                      <img src={Img1} alt="imagem" className="FotoQua1" />
                      }
                   
                    </div>
                  
                 
                  

                    {Imgs === "" ?
                     <div class="input-group">
                     <input type="file"
                     accept="image/*"
                     className="Arquivos"
                     onChange={(e)=>ColocarImg1(e)} 
                     />
                   </div>
                    :
                    <div className="row no-print">
                   <div className="col-12">
                  <Butao 
                   style={"btn .btn-sm btn-danger"}
                   titulo={"Excluir"}
                   onClick={()=>ExcImg1()}
                   />  
                   </div>
                   </div>

                    } 
                   
                   

                   </div>
                  </address>
                </div>
                
              </div>
              <div className="row no-print">
             
                <div className="col-12">
                <Butao 
                style={"btn .btn-sm btn-info"}
                titulo={"Salvar"}
                onClick={()=>criando()}
                />  
                </div>
              
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