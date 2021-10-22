export default  { 
   Estrut:{  nome: " ", 
            telefone: " ", 
            cidade: " ", 
            estado: " ", 
            instituicao: " ",
            conta:{ admin:{ativo:false, desbloqueado:false, tipo:""},
                    app:{ativo:false, desbloqueado:false, tipo:""},
                    NegApp:{ativo:false, desbloqueado:false, tipo:""},
                    serv:{ativo:false, desbloqueado:false, tipo:""},
                    servApp:{ativo:false, desbloqueado:false, tipo:""},
            
                },
            grupo:{
                id:"mjcq9CMFFexmf5JPvTtX",
                nome:"Geral",
                menu:{
                    chat:{
                        Ver:true,
                        caixaChat:{
                            Ver:true,
                            btn_iniciarOc:true,
                            btn_formulario:true,
                            btn_maps:true,
                            btn_enviar:true,
                            btn_addCondicionais:true,
                            btn_chat:true,
                            btn_concluido:true,
                            },
                    },
                    condicionais:{
                        Ver:true,
                        listaCondicionais:{
                            Ver:true,
                            btn_editar:true,
                            btn_desativar:true,
                            btn_ativar:true,
                            btn_criarCondicional:true,
                            },
                        editarCondicional:{
                            Ver:true,
                            btn_salvar:true,
                            },
                        criarCondicional:{
                            Ver:true,
                            btn_salvar:true,
                            },
                            },
                    ocorrencia:{
                        Ver:true,
                        listaOcorrencia:{
                            Ver:true,
                            btn_editar:true,
                            btn_vizualizar:true,
                            },
                        vizualizarOcorrencia:{
                            Ver:true,
                            btn_maps:true,
                            },
                        editarOcorrencia:{
                            Ver:true,
                            btn_mudarcondicional:true,
                            btn_escolherBO:true,
                            btn_salvar:true,
                            },
                    },
                    noticias:{
                        Ver:true,
                        listaNoticia:{
                            Ver:true,
                            btn_editar:true,
                            btn_vizualizar:true,
                            btn_criarNoticia:true,
                            btn_ativar:true,
                            btn_desativa:true,
                            btn_excluir:true,
                            },
                        caixaCriarNoticia:{
                            Ver:true,
                            btn_salvar:true,
                            },
                        editarNoticia:{
                            Ver:true,
                            btn_escolherArquivo:true,
                            btn_excluir:true,
                            btn_salvar:true,
                            },
                    },
                    permissao:{
                        Ver:true,
                        listaGrupo:{
                            Ver:true,
                            btn_criarGrupo:true,
                            btn_editar:true,
                            },
                        caixaCriarGrupo:{
                            Ver:true,
                            btn_salvar:true,
                            },
                        editarGrupo:{
                            Ver:true,
                            btn_salvar:true,
                            },
                    },
                    contas:{
                        Ver:true,
                        listaContasServ:{
                            Ver:true,
                            btn_vizualizar:true,
                        },
                        contaServ:{
                            Ver:true,
                            btn_bloquear:true,
                            btn_desbloquear:true,
                        }
                    },
                    configuracao:{
                        Ver:true,
                        criarAvisoPm:{
                            Ver:true,
                            btn_ativar:true,
                            btn_desativar:true,
                            },
                        criarAvisoApp:{
                            Ver:true,
                            btn_ativar:true,
                            btn_desativar:true,
                            },
                        ListaTelefone:{
                            Ver:true,
                            btn_cadastrarTele:true,
                            btn_bloquear:true,
                            btn_desbloquear:true,
                            btn_excluir:true,
                            },
                    },
                    anuncio:{
                        Ver:false,
                      },


                    }
            },
   }
 };