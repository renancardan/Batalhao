import React, { Component } from 'react';
import Butao from '../../Components/Butao';

export default ({ setEsqSenhaServ }) => {

        function Voltar() {
          setEsqSenhaServ(false);
        }
    
        return (
          <>
            <div className="login"> 
          <img className='imagem_top' src='../../assets/cityhandserv.png' style={{ }} alt="" />
                 
          <img className='imagem_aviao' src='../../assets/aviao.png' style={{ }} alt="" /> 
             <img className='imagem_ambulancia' src='../../assets/ambulanciabranca.png' style={{ }} alt="" />
             <img className='imagem_bombeiro' src='../../assets/bombeirobranco.png' style={{ }} alt="" />
             <img className='imagem_policia' src='../../assets/policiabranca.png' style={{ }} alt="" />
          <div className="quadro_site" >
              <div className="Titulo_pag">
              <h3 className="tituloQuadro" >Recuperar Senha </h3>
              </div>
              <div className="conteudo">
              <div className="input_cadatro">
                        <Butao 
                          onClick={Voltar}
                          text={"Voltar"}
                        />

                        </div>

                  
              </div>

          </div>
          </div>
         </>
 
        );
    }