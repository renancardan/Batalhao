import React, {useEffect, useState} from 'react';
import Api from '../../Api';
import Butao from '../../Components/Butao_list';
import Campo from '../../Components/Campo';
import Header from '../../Components/Header'; 
import Checkbox from '../../Components/Checkbox';
import SweetAlert from 'react-bootstrap-sweetalert';



export default ({Dados, Avisando, Fechar, Id, setAlert, setAlertTipo, MsgDesativar}) => {
const [Nome, setNome] = useState("");
const [Titulo, setTitulo] = useState("Criar Grupo");
const [Valor, setValor] = useState("nulo");
const [Alert1, setAlert1] = useState("");
const [AlertTipo1, setAlertTipo1] = useState("");
const [res1, setres1] = useState(false);
const [res2, setres2] = useState(false);
const [res3, setres3] = useState(false);
const [res4, setres4] = useState(false);
const [res5, setres5] = useState(false);
const [res6, setres6] = useState(false);
const [res7, setres7] = useState(false);
const [res8, setres8] = useState(false);
const [res9, setres9] = useState(false);
const [res10, setres10] = useState(false);
const [res11, setres11] = useState(false);
const [res12, setres12] = useState(false);
const [res13, setres13] = useState(false);
const [res14, setres14] = useState(false);
const [res15, setres15] = useState(false);
const [res16, setres16] = useState(false);
const [res17, setres17] = useState(false);
const [res18, setres18] = useState(false);
const [res19, setres19] = useState(false);
const [res20, setres20] = useState(false);
const [res21, setres21] = useState(false);
const [res22, setres22] = useState(false);
const [res23, setres23] = useState(false);
const [res24, setres24] = useState(false);
const [res25, setres25] = useState(false);
const [res26, setres26] = useState(false);
const [res27, setres27] = useState(false);
const [res28, setres28] = useState(false);
const [res29, setres29] = useState(false);
const [res30, setres30] = useState(false);
const [res31, setres31] = useState(false);
const [res32, setres32] = useState(false);
const [res33, setres33] = useState(false);
const [res34, setres34] = useState(false);
const [res35, setres35] = useState(false);
const [res36, setres36] = useState(false);
const [res37, setres37] = useState(false);
const [res38, setres38] = useState(false);
const [res39, setres39] = useState(false);
const [res40, setres40] = useState(false);
const [res41, setres41] = useState(false);
const [res42, setres42] = useState(false);
const [res43, setres43] = useState(false);
const [res44, setres44] = useState(false);
const [res45, setres45] = useState(false);
const [res46, setres46] = useState(false);
const [res47, setres47] = useState(false);
const [res48, setres48] = useState(false);
const [res49, setres49] = useState(false);
const [res50, setres50] = useState(false);
const [res51, setres51] = useState(false);
const [res52, setres52] = useState(false);
const [res53, setres53] = useState(false);
const [res54, setres54] = useState(false);
const [res55, setres55] = useState(false);
const [res56, setres56] = useState(false);
const [res57, setres57] = useState(false);
const [res58, setres58] = useState(false);
const [res59, setres59] = useState(false);
const [res60, setres60] = useState(false);




useEffect(() => { 
  console.log(Valor);  
   }, [Valor])

   useEffect(() => {   
    estrutGrup();
   }, [res1, res2, res3, res4, res5, res6, res7,
     res8, res9, res10, res11, res12, res13, res14, res15, res16, res17, res18, res19, res20,
    res21, res22, res23, res24, res25, res26, res27, res28, res29, res30, res31, res32, res33,
  res34, res35, res36, res38, res39, res37, res40, res41, res42, res43, res44, res45, res46, res47, res48, 
  res49, res50, res51, res52, res53, res54, res55, res56, res54, res55, res56, res57, res58, res59, res60])

   

  const criando = ()=>{
    if(Nome !=="" && Nome !==" " && Nome !=="  " && Nome !=="   " && Nome !=="    " && Nome !=="     " && Nome !=="      "
    && Nome !=="       " && Nome !=="        " && Nome !=="         " && Nome !=="          " 
    && Nome !=="           " ){
    if (navigator.onLine) {
                
       Api.CriarGrupo(Dados, Nome, Valor, setAlertTipo, setAlert, setAlert1, setAlertTipo1);

      
     } else {
       setAlert("Sem Internet");
       setAlertTipo("danger");
     }
  }else {
    setAlert1("Coloque um nome no campo");
    setAlertTipo1("danger");
  }
} 

  const receber = (res)=>{
        setValor(res);
  }
  const estrutGrup = ()=>{
      const Estrut = {
        chat:{
          Ver:res1,
          caixaChat:{
              Ver:res2,
              btn_iniciarOc:res3,
              btn_formulario:res4,
              btn_maps:res5,
              btn_enviar:res6,
              btn_addCondicionais:res7,
              btn_chat:res8,
              btn_concluido:res9,
              },
      },
      condicionais:{
        Ver:res10,
        listaCondicionais:{
            Ver:res11,
            btn_editar:res12,
            btn_desativar:res13,
            btn_ativar:res14,
            btn_criarCondicional:res15,
            },
        editarCondicional:{
            Ver:res12,
            btn_salvar:res16,
            },
        criarCondicional:{
            Ver:res15,
            btn_salvar:res17,
            },
          },
        ocorrencia:{
          Ver:res18,
          listaOcorrencia:{
              Ver:res19,
              btn_editar:res20,
              btn_vizualizar:res21,
              },
          vizualizarOcorrencia:{
              Ver:res21,
              btn_maps:res22,
              },
          editarOcorrencia:{
              Ver:res20,
              btn_mudarcondicional:res23,
              btn_escolherBO:res24,
              btn_salvar:res25,
              },
      },
      noticias:{
        Ver:res26,
        listaNoticia:{
            Ver:res27,
            btn_editar:res28,
            btn_vizualizar:res29,
            btn_criarNoticia:res30,
            btn_ativar:res31,
            btn_desativa:res32,
            btn_excluir:res33,
            },
        caixaCriarNoticia:{
            Ver:res30,
            btn_salvar:res34,
            },
        editarNoticia:{
            Ver:res28,
            btn_escolherArquivo:res35,
            btn_excluir:res36,
            btn_salvar:res37,
            },
    },
    permissao:{
      Ver:res38,
      listaGrupo:{
          Ver:res39,
          btn_criarGrupo:res40,
          btn_editar:res41,
          },
      caixaCriarGrupo:{
          Ver:res40,
          btn_salvar:res42,
          },
      editarGrupo:{
          Ver:res41,
          btn_salvar:res43,
          },
  },
  contas:{
    Ver:res44,
    listaContasServ:{
        Ver:res45,
        btn_vizualizar:res46,
    },
    contaServ:{
        Ver:res46,
        btn_bloquear:res47,
        btn_desbloquear:res48,
    }
    },
    configuracao:{
      Ver:res49,
      criarAvisoPm:{
          Ver:res50,
          btn_ativar:res51,
          btn_desativar:res52,
          },
      criarAvisoApp:{
          Ver:res53,
          btn_ativar:res54,
          btn_desativar:res55,
          },
      ListaTelefone:{
          Ver:res56,
          btn_cadastrarTele:res57,
          btn_bloquear:res58,
          btn_desbloquear:res59,
          btn_excluir:res60,
          },
  },
  anuncio:{
    Ver:false,
  },
       
      }

      setValor(Estrut);
  
  }

  const cancelar = ()=>{
    setAlertTipo1("")
    setAlert1("")
}
 
  

        return (
            <>
<div className="content-wrapper">
        {Alert1 !== " " && AlertTipo1 === "success" &&
                  <SweetAlert  success title={Alert1} onConfirm={cancelar} onCancel={cancelar} />
                }

            {Alert1 !== " " && AlertTipo1 === "danger" &&
                  <SweetAlert  danger title={Alert1} confirmBtnBsStyle="danger" onConfirm={cancelar} onCancel={cancelar} />
                }
                <Header 
                Titulo={Titulo}
                Avisando={Avisando}
                Fechar={Fechar}
                />
               <section className="content">
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-12">
                      <div className="callout callout-info">
            <h5><i className="fas fa-info" /> Nota:</h5>
           Crie grupo de permissões para os usuarios do sistema!
          </div>
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
                    <strong>Digite o Nome do Grupo:</strong><br />
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
                            <strong>Menus:</strong> <br />
                  <br />
                    <Checkbox 
                   label={"Chat"} 
                   res={res1} 
                   onChange={(value)=>{setres1(value)}} 
                   /> <br />
                    <Checkbox 
                   label={"Condicionai "} 
                   res={res10} 
                   onChange={(value)=>{setres10(value)}} 
                   /> <br />
                    <Checkbox 
                   label={"Ocorrência"} 
                   res={res18} 
                   onChange={(value)=>{setres18(value)}} 
                   /> <br />
                    <Checkbox 
                   label={"Notícias"} 
                   res={res26} 
                   onChange={(value)=>{setres26(value)}} 
                   /> <br />
                    <Checkbox 
                   label={"Permissões"} 
                   res={res38} 
                   onChange={(value)=>{setres38(value)}} 
                   /> <br />
                    <Checkbox 
                   label={"Contas"} 
                   res={res44} 
                   onChange={(value)=>{setres44(value)}} 
                   /> <br />
                   <Checkbox 
                   label={"Configurações"} 
                   res={res49} 
                   onChange={(value)=>{setres49(value)}} 
                   /> <br />
                  </address>
                </div>
                <div className="col-sm-4 invoice-col">
                    <address>
                        {Valor !== "nulo" &&
                            <>
                                {Valor.chat.Ver === true &&
                                <>
                                <strong>Caixas do menu Chat:</strong><br />
                                <Checkbox 
                                label={""} 
                                res={res2} 
                                onChange={(value)=>{setres2(value)}} 
                                 /><span style={{color:"green", }}>Caixa Chat</span> <br/>
                                 {Valor.chat.caixaChat.Ver === true &&
                                 <>
                                  <Checkbox 
                                label={"Botão Iniciar Ocorrência"} 
                                res={res3} 
                                onChange={(value)=>{setres3(value)}} 
                                 /> <br />
                                 <Checkbox 
                                label={"Botão Formulário"} 
                                res={res4} 
                                onChange={(value)=>{setres4(value)}} 
                                 /> <br />
                                 <Checkbox 
                                label={"Botão Maps"} 
                                res={res5} 
                                onChange={(value)=>{setres5(value)}} 
                                 /> <br />
                                  <Checkbox 
                                label={"Botão Enviar Conversa"} 
                                res={res6} 
                                onChange={(value)=>{setres6(value)}} 
                                 /> <br />
                                     <Checkbox 
                                label={"Botão Add Condicionais"} 
                                res={res7} 
                                onChange={(value)=>{setres7(value)}} 
                                 /> <br />
                                 <Checkbox 
                                label={"Botão chat"} 
                                res={res8} 
                                onChange={(value)=>{setres8(value)}} 
                                 /> <br />
                                 <Checkbox 
                                label={"Botão concluido"} 
                                res={res9} 
                                onChange={(value)=>{setres9(value)}} 
                                 /> <br />
                                 </>
                                 }
   
                            </>
                            }
                           {Valor.condicionais.Ver === true &&
                                <>
                                <strong>Caixas do menu Condicionais:</strong><br />
                                <Checkbox 
                                label={""} 
                                res={res11} 
                                onChange={(value)=>{setres11(value)}}/> 
                                <span style={{color:"green", }}>Lista de Condicionais</span> <br/>
                                {Valor.condicionais.listaCondicionais.Ver === true &&
                                <>
                                <Checkbox 
                                label={"Botão Editar"} 
                                res={res12} 
                                onChange={(value)=>{setres12(value)}} 
                                 /> <br />
                                 <Checkbox 
                                label={"Botão Desativar"} 
                                res={res13} 
                                onChange={(value)=>{setres13(value)}} 
                                 /> <br />
                                 <Checkbox 
                                label={"Botão Ativar"} 
                                res={res14} 
                                onChange={(value)=>{setres14(value)}} 
                                 /> <br />
                                  <Checkbox 
                                label={"Botão Criar Condicionais"} 
                                res={res15} 
                                onChange={(value)=>{setres15(value)}} 
                                 /> <br />
                               
                                {Valor.condicionais.editarCondicional.Ver === true &&
                                <>
                                <span style={{color:"green", }}>Editar Condicional </span> <br/>
                                <Checkbox 
                                label={"Botão Salvar"} 
                                res={res16} 
                                onChange={(value)=>{setres16(value)}} 
                                 /> <br />
                                </>                           
                                }
                                 {Valor.condicionais.criarCondicional.Ver === true &&
                                <>
                                <span style={{color:"green", }}> Criar Condicional</span> <br/>
                                <Checkbox 
                                label={"Botão Salvar"} 
                                res={res17} 
                                onChange={(value)=>{setres17(value)}} 
                                 /> <br />
                                </> 
                                                        
                                }
                                </>
                                 }  
                            </>
                        }
                              {Valor.ocorrencia.Ver === true &&
                                <>
                                <strong>Caixas do menu Ocorrência:</strong><br />
                                <Checkbox 
                                label={""} 
                                res={res19} 
                                onChange={(value)=>{setres19(value)}}/> 
                                <span style={{color:"green", }}>Lista de Ocorrência</span> <br/>
                                {Valor.ocorrencia.listaOcorrencia.Ver === true &&
                                <>
                                <Checkbox 
                                label={"Botão Editar"} 
                                res={res20} 
                                onChange={(value)=>{setres20(value)}} 
                                 /> <br />
                                  <Checkbox 
                                label={"Botão Vizualizar"} 
                                res={res21} 
                                onChange={(value)=>{setres21(value)}} 
                                 /> <br />
                               
                                {Valor.ocorrencia.vizualizarOcorrencia.Ver === true &&
                                <>
                                <span style={{color:"green", }}>Vizualizar Ocorrência </span> <br/>
                                <Checkbox 
                                label={"Botão Maps"} 
                                res={res22} 
                                onChange={(value)=>{setres22(value)}} 
                                 /> <br />
                                </>                           
                                }
                                 {Valor.ocorrencia.editarOcorrencia.Ver === true &&
                                <>
                                <span style={{color:"green", }}> Editar Ocorrência</span> <br/>
                                <Checkbox 
                                label={"Botão Mudar Condicional"} 
                                res={res23} 
                                onChange={(value)=>{setres23(value)}} 
                                 /> <br />
                                  <Checkbox 
                                label={"Botão Escolher B.O"} 
                                res={res24} 
                                onChange={(value)=>{setres24(value)}} 
                                 /> <br />
                                  <Checkbox 
                                label={"Botão Salvar"} 
                                res={res25} 
                                onChange={(value)=>{setres25(value)}} 
                                 /> <br />
                                </> 
                                                        
                                }
                                </>
                                 }  
                            </>
                        }
                              {Valor.noticias.Ver === true &&
                                <>
                                <strong>Caixas do menu Notícias:</strong><br />
                                <Checkbox 
                                label={""} 
                                res={res27} 
                                onChange={(value)=>{setres27(value)}}/> 
                                <span style={{color:"green", }}>Lista de Notícias</span> <br/>
                                {Valor.noticias.listaNoticia.Ver === true &&
                                <>
                                <Checkbox 
                                label={"Botão Editar"} 
                                res={res28} 
                                onChange={(value)=>{setres28(value)}} 
                                 /> <br />
                                  <Checkbox 
                                label={"Botão Vizualizar"} 
                                res={res29} 
                                onChange={(value)=>{setres29(value)}} 
                                 /> <br />
                                  <Checkbox 
                                label={"Botão Criar Notícia"} 
                                res={res30} 
                                onChange={(value)=>{setres30(value)}} 
                                 /> <br />
                                  <Checkbox 
                                label={"Botão Ativar"} 
                                res={res31} 
                                onChange={(value)=>{setres31(value)}} 
                                 /> <br />
                                  <Checkbox 
                                label={"Botão Desativar"} 
                                res={res32} 
                                onChange={(value)=>{setres32(value)}} 
                                 /> <br />
                                  <Checkbox 
                                label={"Botão Excluir"} 
                                res={res33} 
                                onChange={(value)=>{setres33(value)}} 
                                 /> <br />
                               
                                {Valor.noticias.caixaCriarNoticia.Ver === true &&
                                <>
                                <span style={{color:"green", }}>Criar Notícias </span> <br/>
                                <Checkbox 
                                label={"Botão Salvar"} 
                                res={res34} 
                                onChange={(value)=>{setres34(value)}} 
                                 /> <br />
                                </>                           
                                }
                                 {Valor.noticias.editarNoticia.Ver === true &&
                                <>
                                <span style={{color:"green", }}> Editar Notícias</span> <br/>
                                <Checkbox 
                                label={"Botão Ecolher Arquivo"} 
                                res={res35} 
                                onChange={(value)=>{setres35(value)}} 
                                 /> <br />
                                  <Checkbox 
                                label={"Botão Excluir"} 
                                res={res36} 
                                onChange={(value)=>{setres36(value)}} 
                                 /> <br />
                                  <Checkbox 
                                label={"Botão Salvar"} 
                                res={res37} 
                                onChange={(value)=>{setres37(value)}} 
                                 /> <br />
                                </> 
                                                        
                                }
                                </>
                                 }  
                            </>
                        }
                              {Valor.permissao.Ver === true &&
                                <>
                                <strong>Caixas do menu Permissões:</strong><br />
                                <Checkbox 
                                label={""} 
                                res={res39} 
                                onChange={(value)=>{setres39(value)}}/> 
                                <span style={{color:"green", }}>Lista de Grupo</span> <br/>
                                {Valor.permissao.listaGrupo.Ver === true &&
                                <>
                                <Checkbox 
                                label={"Botão Criar Grupo"} 
                                res={res40} 
                                onChange={(value)=>{setres40(value)}} 
                                 /> <br />
                                  <Checkbox 
                                label={"Botão Editar"} 
                                res={res41} 
                                onChange={(value)=>{setres41(value)}} 
                                 /> <br />
                                  
                               
                                {Valor.permissao.caixaCriarGrupo.Ver === true &&
                                <>
                                <span style={{color:"green", }}>Criar Grupo </span> <br/>
                                <Checkbox 
                                label={"Botão Salvar"} 
                                res={res42} 
                                onChange={(value)=>{setres42(value)}} 
                                 /> <br />
                                </>                           
                                }
                                 {Valor.permissao.editarGrupo.Ver === true &&
                                <>
                                <span style={{color:"green", }}> Editar Grupo</span> <br/>
                                  <Checkbox 
                                label={"Botão Salvar"} 
                                res={res43} 
                                onChange={(value)=>{setres43(value)}} 
                                 /> <br />
                                </> 
                                                        
                                }
                                </>
                                 }  
                            </>
                        }
                              {Valor.contas.Ver === true &&
                                <>
                                <strong>Caixas do menu Contas:</strong><br />
                                <Checkbox 
                                label={""} 
                                res={res45} 
                                onChange={(value)=>{setres45(value)}}/> 
                                <span style={{color:"green", }}>Lista de Contas Serv</span> <br/>
                                {Valor.contas.listaContasServ.Ver === true &&
                                <>
                                <Checkbox 
                                label={"Botão Vizualizar"} 
                                res={res46} 
                                onChange={(value)=>{setres46(value)}} 
                                 /> <br />
                                                               
                                {Valor.contas.contaServ.Ver === true &&
                                <>
                                <span style={{color:"green", }}>Conta Serv </span> <br/>
                                <Checkbox 
                                label={"Botão Bloquear"} 
                                res={res47} 
                                onChange={(value)=>{setres47(value)}} 
                                 /> <br />
                                 <Checkbox 
                                label={"Botão Desbloquear"} 
                                res={res48} 
                                onChange={(value)=>{setres48(value)}} 
                                 /> <br />
                                </>                           
                                }
                                </>
                                 }  
                            </>
                        }
                          {Valor.configuracao.Ver === true &&
                                <>
                                <strong>Caixas do menu Configuração:</strong><br />
                                <Checkbox 
                                label={""} 
                                res={res50} 
                                onChange={(value)=>{setres50(value)}}/> 
                                <span style={{color:"green", }}>Criar Aviso Pm</span> <br/>
                                {Valor.configuracao.criarAvisoPm.Ver === true &&
                                <>
                                <Checkbox 
                                label={"Botão Ativar"} 
                                res={res51} 
                                onChange={(value)=>{setres51(value)}} 
                                 /> <br />
                                <Checkbox 
                                label={"Botão Desativar"} 
                                res={res52} 
                                onChange={(value)=>{setres52(value)}} 
                                 /> <br />
                                                               
                         
                                </>
                                 }
                                <Checkbox 
                                label={""} 
                                res={res53} 
                                onChange={(value)=>{setres53(value)}}/> 
                                <span style={{color:"green", }}>Criar Aviso App</span> <br/>
                                {Valor.configuracao.criarAvisoApp.Ver === true &&
                                <>
                                <Checkbox 
                                label={"Botão Ativar"} 
                                res={res54} 
                                onChange={(value)=>{setres54(value)}} 
                                 /> <br />
                                <Checkbox 
                                label={"Botão Desativar"} 
                                res={res55} 
                                onChange={(value)=>{setres55(value)}} 
                                 /> <br />
                                                               
                         
                                </>
                                 }
                                <Checkbox 
                                label={""} 
                                res={res56} 
                                onChange={(value)=>{setres56(value)}}/> 
                                <span style={{color:"green", }}>Lista de Telefone</span> <br/>
                                {Valor.configuracao.ListaTelefone.Ver === true &&
                                <>
                                <Checkbox 
                                label={"Botão Cadastrar Telefone"} 
                                res={res57} 
                                onChange={(value)=>{setres57(value)}} 
                                 /> <br />
                                <Checkbox 
                                label={"Botão desativar"} 
                                res={res58} 
                                onChange={(value)=>{setres58(value)}} 
                                 /> <br />
                                 <Checkbox 
                                label={"Botão Ativar"} 
                                res={res59} 
                                onChange={(value)=>{setres59(value)}} 
                                 /> <br />
                                <Checkbox 
                                label={"Botão Excluir"} 
                                res={res60} 
                                onChange={(value)=>{setres60(value)}} 
                                 /> <br />
                                                               
                         
                                </>
                                 }        
                            </>
                        }
   
                        </>                           
                     } 
                      
                     
                    </address>
                  </div>
              </div>
              <div className="row no-print">
              {Dados.grupo.menu.permissao.caixaCriarGrupo.btn_salvar === true &&
                <div className="col-12">
                <Butao 
                style={"btn .btn-sm btn-primary"}
                titulo={"Salvar"}
                onClick={()=>criando()}
                />  
                </div>
              }
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