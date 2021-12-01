import React, {useState, useEffect} from 'react';
import Header from '../../Components/HeaderLogin';
import Manual from '../../Pages/Serv/Manual';
import Contato from '../../Pages/Serv/Contato';
import RecupSenha from '../../Pages/Serv/RecupSenhaServ';
import Campo from '../../Components/Campo';
import TextLink from '../../Components/TextLink';
import Butao from '../../Components/Butao';
import Select from '../../Components/Select';
import { Spinner  } from "react-awesome-spinners";
import CidadeJson from "../../JSONS/cidadejson";
import InstitutoJson from "../../JSONS/institutojson";
import TipocontaJson from "../../JSONS/tipocontjson";
import SweetAlert from 'react-bootstrap-sweetalert';


export default ({setConta, setEmail, Email, Senha, setSenha, 
  Confirsenha, setConfirsenha, Cidade, setCidade, Estado, 
  setEstado, Instituicao, setInstituicao, Nome, setNome, 
  Telefone, setTelefone,  ContaTipo, setContaTipo,
   Loading, cadastrando, logando, Alert, setAlert, NomeGuerra, setNomeGuerra,
   Patente, setPatente}) => {

          
          const [EstCidJson, setEstCidJson] = useState({CidadeJson});
          const [ListaEstado, setListaEstado] = useState([]);
          const [ListaCidade, setListaCidade] = useState([]);
          const [ListInst, setListInst] = useState(InstitutoJson.Intituicao);
          const [ListContaTipo, setListContaTipo] = useState(TipocontaJson.tipo);   
          const [VerManual, setVerManual] = useState(false);
          const [VerContato, setVerContato] = useState(false);
          const [CadasPag, setCadasPag] = useState(false);
          const [EsqSenhaServ, setEsqSenhaServ] = useState(false);

                  useEffect(() => {
                    ListandoEstado();
                  }, []);

                  useEffect(() => {
                    
                  }, [Estado]);
                  
            
                  useEffect(() => {
                    ListandoCidade();
                    }, [Estado]);

                          const Entrarpainel= () => {
                            setConta("45564556");
                          }

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
                            function confirma() {
                              setAlert(" ");
                            }
                            function cancelar() {
                              setAlert(" ");
                            }

                            function recuperarSenha() {
                              setEsqSenhaServ(true);
                            }
                    
   
    return (
        <div>
           {/* <Header
            setAparercer={setVerManual} 
            Aparercer={VerManual} 
            setVerContato={setVerContato}
            VerContato={VerContato} 
            /> */}
           
          {VerManual === true &&
           <>
              { VerContato === false ?
                <Manual /> 
                :
                <Contato />
              }
            </> 
           }

          {EsqSenhaServ === true &&
           <>
            <RecupSenha 
            setEsqSenhaServ={setEsqSenhaServ}
            />
            </> 
           }


           {VerManual === false && EsqSenhaServ === false &&
                <div className="login"> 
                {Alert !== " " &&
                  <SweetAlert danger title={Alert} confirmBtnBsStyle="danger" onConfirm={confirma} onCancel={cancelar} />
                }
                  
                  { CadasPag === false &&
                  <>
                   <img className='imagem_top' src='../../assets/logoapp.jpeg' style={{ }} alt="" />
                    
                  <div className="quadroAcesso" >
                    <div className="caixaAcesso">  
                      <h3 className="tituloQuadro" >LOGIN</h3>
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
                                      onClick={recuperarSenha}
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
                        <img className='imagem_top' src='../../assets/logoapp.jpeg' style={{ }} alt="" />
                      
                        <div className="quadro_site" >
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
                            {/* <div className="input_cadatro"> 
                              <Select 
                                  type={null}
                                  placeholder={"Instituição"}
                                  icon={"fas fa-university"}
                                  value={Instituicao}
                                  onChange={e=>setInstituicao(e.target.value)}
                                  List={ListInst}
                                  /> 
                             </div>
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
                              </div> */}
                            <div className="input_cadatro">
                              <Campo 
                                  type={"text"}
                                  placeholder={"Nome Completo"}
                                  icon={"fas fa-user"}
                                  value={Nome}
                                  onChange={e=>setNome(e.target.value)}
                                  mask={null}
                                />

                            </div>
                            <div className="input_cadatro">
                              <Campo 
                                  type={"text"}
                                  placeholder={"Nome De Guerra"}
                                  icon={"fas fa-user"}
                                  value={NomeGuerra}
                                  onChange={e=>setNomeGuerra(e.target.value)}
                                  mask={null}
                                />

                            </div>
                          
                            <div className="input_cadatro">
                              <Select 
                                  type={null}
                                  placeholder={"Patente"}
                                  icon={"fas fa-user"}
                                  value={Patente}
                                  onChange={e=>setPatente(e.target.value)}
                                  List={ListContaTipo}
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
                    {/* <div className='painel_login' >
                        <Butao 
                          text={"Painel Admin"}
                          onClick={Entrarpainel}
                        />
                        
                      </div> */}
                </div>
                
            }
            
          </div>
    );
}