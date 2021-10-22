import React, {useState} from 'react';
import Butao from '../../Components/Butao';
import SweetAlert from 'react-bootstrap-sweetalert';

export default ({IndoLogar, setAlert, Alert, setAlertTipo, AlertTipo, verStatus }) => {


  const confirma = async  () =>{
    await localStorage.setItem('roma', "S23458765");
    verStatus();
    setAlert(" ");
    setAlertTipo(" ");
  }
  
  function cancelar() {
    setAlert(" ");
    setAlertTipo(" ");
  }
  
  
  
  
  
  return (

      

        <div className="login">
           
             <img className='imagem_top' src='../../assets/cityhandserv.png' style={{ }} alt="" />
                 
                 <img className='imagem_aviao' src='../../assets/aviao.png' style={{ }} alt="" /> 
                    <img className='imagem_ambulancia' src='../../assets/ambulanciabranca.png' style={{ }} alt="" />
                    <img className='imagem_bombeiro' src='../../assets/bombeirobranco.png' style={{ }} alt="" />
                    <img className='imagem_policia' src='../../assets/policiabranca.png' style={{ }} alt="" />
                 <div className="quadro_site" >
                     <div className="Titulo_pag">
                     <h3 className="tituloQuadro" >Ativar Sua Conta Serv</h3>
                     </div>
                     <div className="conteudo">
                      <p> Vc precisa Ativar tua conta Serv </p>
                         
                      <div className="input_cadatro">
                        <Butao 
                          onClick={IndoLogar}
                          text={"Ativar"}
                        />

                        </div>
                            
                         
                     </div>
       
                 </div>

                 {Alert !== " " && AlertTipo === "success" &&
                  <SweetAlert  success title={Alert} onConfirm={confirma} onCancel={cancelar} />
                }

            {Alert !== " " && AlertTipo === "danger" &&
                  <SweetAlert  danger title={Alert} confirmBtnBsStyle="danger" onConfirm={confirma} onCancel={cancelar} />
                }
        </div>

        );
    }