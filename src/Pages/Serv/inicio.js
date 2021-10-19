import React, {useState, useEffect} from 'react';
import Butao from '../../Components/Butao_list';
import Campo from '../../Components/Campo';
import SweetAlert from 'react-bootstrap-sweetalert';
import { Spinner  } from "react-awesome-spinners";
import Aviso from '../../Components/Aviso';
import HeaderPage from '../../Components/HeaderPages';
import Api from "../../Api";
import Header from '../../Components/Header';


export default ({Dados, setDados, Loading,  setLoading,  Alert, setAlert, AlertTipo, setAlertTipo, Avisando, setAvisando}) => {
    const [Editar, setEditar] = useState(false);
    const [Nome, setNome] = useState("");
    const [Telefone, setTelefone] = useState("");
    const [Inst, setInst] = useState("");
    const [Estado, setEstado] = useState("");
    const [Cidade, setCidade] = useState("");
    const [ContaTipo, setContaTipo] = useState("");
    const [Titulo, setTitulo] = useState("Home")

    




    const Entrar = () => {
      setInst(Dados.instituicao);
      setEstado(Dados.estado);
      setCidade(Dados.cidade);
      setContaTipo(Dados.conta.serv.tipo);
      setNome(Dados.nome);
      setTelefone(Dados.telefone);
      setEditar(true);
    }
    const Salvar = async () => {
    
        if(Nome !== "" && Telefone !== "") {
          if (navigator.onLine) {
            setLoading(true);
            const res = await Api.AtualizandoUsersServ(Nome, Telefone, Estado, Cidade, Inst, ContaTipo, setDados);
            if(res) {
              setLoading(false);
              setDados(res);
              setEditar(false);
              setAlert("Salvo com sucesso!");
              setAlertTipo("success");
  
            } else {
              setLoading(false);
              setEditar(false);
              setAlert("Seus dados Não foi Atualizado!");
              setAlertTipo("danger");
            }
          } else {
            setAlert("Sem Internet");
            setAlertTipo("danger");
          }
          
          
         
        } else {
          setLoading(false);
          setAlert("Preencha todos os campos!");
          setAlertTipo("danger");
        }
      
        
    }
    const Fechar = () => {
        setEditar(false);
        setNome(Dados.nome);
        setTelefone(Dados.telefone);
    }

    function confirma() {
        setAlert(" ");
        setAlertTipo(" ");
       
      }
      function cancelar() {
        setAlert(" ");
        setAlertTipo(" ");
      }



    return (
        <div>
              <div className="content-wrapper">
              {Alert !== " " && AlertTipo === "success" &&
                  <SweetAlert  success title={Alert} onConfirm={confirma} onCancel={cancelar} />
                }

            {Alert !== " " && AlertTipo === "danger" &&
                  <SweetAlert  danger title={Alert} confirmBtnBsStyle="danger" onConfirm={confirma} onCancel={cancelar} />
                }
    {/* Content Header (Page header) */}         
    
        {Loading === true ?
            <Spinner 
            size={64}
            color={"#5d0bf7"}
            sizeUnit={'px'} 
            />
            :
            <>
        {Editar === false ?
                <>
                 <HeaderPage 
                Titulo={Titulo}
                Avisando={Avisando}
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
                      <strong>Nome Completo:</strong><br />
                      {Dados.nome}<br />
                      <strong>Telefone:</strong><br />
                      {Dados.telefone}<br />
                    </address>
                  </div>
                  {/* /.col */}
                  <div className="col-sm-4 invoice-col">
                    <address>
                      <strong>Cidade:</strong><br />
                      {Dados.cidade}<br />
                      <strong>Estado:</strong><br />
                      {Dados.estado}<br />
                    </address>
                  </div>
                  {/* /.col */}
                  <div className="col-sm-4 invoice-col">
                    <address>
                      <strong>Conta:</strong><br />
                      {Dados.conta.serv.tipo}<br />
                      <strong>Grupo:</strong><br />
                      {Dados.grupo.nome}<br />
                    </address>
                  </div>
                  
                  {/* /.col */}
                </div>
                <div className="row no-print">
                  <div className="col-12">
                  <Butao 
                  style={"btn .btn-sm btn-info"}
                  titulo={"Editar"}
                  onClick={Entrar}
                  />   
                  </div>
                </div>
              </div> 
              </div>
              </div>
            </div>
          </section>
              </>


              :



              <>
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
                    <strong>Nome Completo:</strong><br />
                    <div className="input_cadatro">
                              <Campo 
                                  type={"text"}
                                  placeholder= {Dados.N568745}
                                  icon={"fas "}
                                  value={Nome}
                                  onChange={e=>setNome(e.target.value)}
                                  mask={null}
                                />

                            </div> 
                    <br />
                    <strong>Telefone:</strong><br />
                    
                    <div className="input_cadatro">
                              <Campo 
                                  type={"text"}
                                  placeholder={Dados.T5665457}
                                  icon={"fas "}
                                  value={Telefone}
                                  onChange={e=>setTelefone(e.target.value)}
                                  mask={"(99) 99999-9999"}
                                />
                              </div>
                    <br />
                  </address>
                </div>
                {/* /.col */}
        
                
                {/* /.col */}
              </div>
              <div className="row no-print">
                <div className="col-12">
                <Butao 
                style={"btn .btn-sm btn-info"}
                titulo={"Salvar"}
                onClick={Salvar}
                />  
                </div>
              </div>
            </div> 
            </div>
            </div>
            </div>
          </section>
            </>


        }
        </>
        }
           
            



    
    </div>
        </div>
    );
}