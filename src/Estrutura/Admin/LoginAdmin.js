import React, {useState, useEffect} from 'react';
import Header from '../../Components/HeaderLogin';
import Informe from '../../Components/Informe';
import Campo from '../../Components/Campo';
import TextLink from '../../Components/TextLink';
import Butao from '../../Components/Butao';
import Select from '../../Components/Select';
import { Spinner  } from "react-awesome-spinners";
import CidadeJson from "../../JSONS/cidadejson";
import InstitutoJson from "../../JSONS/institutojson";
import TipocontaJson from "../../JSONS/tipocontjson";

export default ({setEmail, Email, Senha, setSenha, Confirsenha, 
  setConfirsenha, Cidade, setCidade, Estado, setEstado, Nome, 
  setNome, Telefone, setTelefone, ContaTipo, setContaTipo, 
  Loading, cadastrando, logando }) => {


      const [EstCidJson, setEstCidJson] = useState({CidadeJson});
      const [ListaEstado, setListaEstado] = useState([]);
      const [ListaCidade, setListaCidade] = useState([]);
      const [ListInst, setListInst] = useState(InstitutoJson.Intituicao);
      const [ListContaTipo, setListContaTipo] = useState(TipocontaJson.tipo);   
      const [Aparercer, setAparercer] = useState(false);
      const [CadasPag, setCadasPag] = useState(false);

                useEffect(() => {
                  ListandoEstado();
                }, []);
          
                useEffect(() => {
                  ListandoCidade();
                  }, [Estado]);

                                  function ListandoEstado() {
                                    let list = [] ;
                                    EstCidJson.CidadeJson.estados.forEach(result => {
                                          list.push({
                                              select: result.nome,
                                              cidades: result,
                                          });   
                                    });
                                    setListaEstado(list);
                                  }



                                  function ListandoCidade() {
                                      for(let i in ListaEstado ) {
                                          let listanha = [];
                                          if(ListaEstado[i].cidades.nome === Estado) {
                                            ListaEstado[i].cidades.cidades.forEach(result => {
                                              listanha.push({
                                                select: result,   
                                            });   
                                            });
                                            setListaCidade(listanha);
                                          }
                                      }
                                    }
                
              
    return (
        <div>
                <div className="loginAdmin"> 
                  { CadasPag === false &&
                     <>
                        <div className="quadroAcesso" >
                            <div className="caixaAcesso"> 
                              <img className='imagem_top' src='../../assets/cityhandadmin.png' style={{ }} alt="" /> 
                                  <h3 className="tituloQuadro" >LOGIN Admin</h3>
                                  {Loading === true ?
                                        <Spinner 
                                          size={64}
                                          color={"#5d0bf7"}
                                          sizeUnit={'px'} 
                                          />
                                    :
                                         <>
                                        <Campo 
                                          type={"email"}
                                          placeholder={"Email"}
                                          icon={"fas fa-envelope"}
                                          value={Email}
                                          onChange={e=>setEmail(e.target.value)}
                                          mask={null}
                                          />
                                        <Campo 
                                          type={"password"}
                                          placeholder={"Senha"}
                                          icon={"fas fa-lock"}
                                          value={Senha}
                                          onChange={e=>setSenha(e.target.value)}
                                          mask={null}
                                          />
                                        <Butao 
                                          onClick={logando}
                                          text={"Entrar"}
                                          /> 
                                        <div className="quadroLink">
                                              <TextLink 
                                                onClick={()=>setCadasPag(true)}
                                                estilo={"Text_link"}
                                                text={"Quero Me Cadastrar!"}
                                                />  
                                              <TextLink 
                                                onClick={null}
                                                estilo={"Text_link"}
                                                text={"Esquecir Minha Senha"}
                                                />
                                        </div>
                                        </>
                                    }
                            </div>
                         </div>
                    </>
                    }

                  { CadasPag === true &&
                    <>
                          <div className="quadro_site" >
                            <img className='imagem_top' src='../../assets/cityhandadmin.png' style={{ }} alt="" />
                            <div className="Titulo_pag">
                            <h3 className="tituloQuadro" >CADASTRO</h3>
                          </div>
                          <div className="conteudo">
                                {Loading === true ?
                                    <Spinner 
                                    size={64}
                                    color={"#5d0bf7"}
                                    sizeUnit={'px'} 
                                    />
                                  :
                                     <>
                                    <div className="input_cadatro">
                                        <Select 
                                            type={null}
                                            placeholder={"Estado"}
                                            icon={"fas fa-map"}
                                            value={Estado}
                                            onChange={e=>setEstado(e.target.value)}
                                            List={ListaEstado}
                                            />
                                    </div>
                                    <div className="input_cadatro">
                                        <Select 
                                            type={null}
                                            placeholder={"Cidade"}
                                            icon={"fas fa-location-arrow"}
                                            value={Cidade}
                                            onChange={e=>setCidade(e.target.value)}
                                            List={ListaCidade}
                                            />
                                    </div>
                                    <div className="input_cadatro">
                                        <Campo 
                                            type={"text"}
                                            placeholder={"Nome do Responsavel"}
                                            icon={"fas fa-user"}
                                            value={Nome}
                                            onChange={e=>setNome(e.target.value)}
                                            mask={null}
                                          />
                                    </div>
                                    <div className="input_cadatro">
                                        <Campo 
                                            type={"text"}
                                            placeholder={"Telefone"}
                                            icon={"fas fa-phone"}
                                            value={Telefone}
                                            onChange={e=>setTelefone(e.target.value)}
                                            mask={"(99) 9999-9999"}
                                          />
                                    </div>
                                    <div className="input_cadatro">
                                        <Campo 
                                            type={"email"}
                                            placeholder={"Email"}
                                            icon={"fas fa-envelope"}
                                            value={Email}
                                            onChange={e=>setEmail(e.target.value)}
                                            mask={null}
                                            />
                                    </div>
                                    <div className="input_cadatro">
                                        <Select 
                                            type={null}
                                            placeholder={"Conta"}
                                            icon={"fas fa-desktop"}
                                            value={ContaTipo}
                                            onChange={e=>setContaTipo(e.target.value)}
                                            List={ListContaTipo}
                                            /> 
                                    </div>
                                    <div className="input_cadatro">
                                        <Campo 
                                            type={"password"}
                                            placeholder={"Senha"}
                                            icon={"fas fa-lock"}
                                            value={Senha}
                                            onChange={e=>setSenha(e.target.value)}
                                            mask={null}
                                            />
                                    </div>
                                    <div className="input_cadatro">
                                        <Campo 
                                            type={"password"}
                                            placeholder={"Confimar a Senha"}
                                            icon={"fas fa-lock"}
                                            value={Confirsenha}
                                            onChange={e=>setConfirsenha(e.target.value)}
                                            mask={null}
                                            />
                                    </div>
                                    <div className="input_cadatro">
                                      <Butao 
                                        onClick={cadastrando}
                                        text={"Cadastrar"}
                                      />
                                    </div>
                                    <div className="input_cadatro">
                                      <TextLink 
                                        onClick={()=>setCadasPag(false)}
                                        estilo={"Text_link"}
                                        text={"Quero me Conectar!"}
                                        />
                                    </div>
                                    </>
                                }  
                            </div>
                          </div>
                    </>
                    }
                  </div>
              
        </div>
    );
}