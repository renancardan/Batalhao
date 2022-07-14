import React from 'react'
import { Link } from 'react-router-dom';
import Butao from '../../Components/Butao';
import MenuLink from '../../Components/MenuLink';
import Api from "../../Api";

export default ({sair , Dados, CriarDados, ApagarDados}) => {

  const Desbloquear = () => {
    Api.DesbloqueioContaServ();
  }
   
  return (
  <div>
  <aside className="main-sidebar sidebar-dark-primary elevation-4">
    {/* Brand Logo */}
    <a href="index3.html" className="brand-link" style={{backgroundColor: "#fff"}}>
      <img src="assets/logoapp.jpeg" alt="15º Batalhão Logo"  style={{opacity: '1', width: 60, marginRight: 20, marginLeft:20 }} />
      <span className="brand-text font-weight-light" style={{color: "#000"}} >15º Batalhão </span>
    </a>
    {/* Sidebar */}
    <div className="sidebar">
      {/* Sidebar user panel (optional) */}
      <div className="user-panel mt-3 pb-3 mb-3 d-flex">
        <div className="image">
          
        </div>
        <div className="info">
          <a href="#" className="d-block">{Dados.nome}</a>
        </div>
      </div>
      {/* Sidebar Menu */}
      <nav className="mt-2">
        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
        {Dados.grupo.menu.chat.Ver &&
        <>
         {Dados.grupo.menu.chat.Ver === true &&
         <MenuLink 
         Linkto={"/chat"}
         Icon={"nav-icon fas fa-comments"}
         Titulo={"CHAT"}
         Notificacao={false}
         NotiEstilo={"right badge badge-danger"}
         ValorNoti={"New"}
         />

        }
        </>
        }
        {Dados.grupo.menu.aplicativos &&
        <>
          {Dados.grupo.menu.aplicativos.Ver === true &&
       
       <MenuLink 
           Linkto={"/aplicativo"}
           Icon={"nav-icon fas fa-tablet"}
           Titulo={"APLICATIVOS"}
           Notificacao={false}
           NotiEstilo={"right badge badge-danger"}
           ValorNoti={"New"}
           />
    }

        </>
        }
     
        {Dados.grupo.menu.condicionais.Ver === true &&
           <MenuLink 
              Linkto={"/condicionais"}
              Icon={"nav-icon fas fa-sitemap"}
              Titulo={"CONDICIONAIS"}
              Notificacao={false}
              NotiEstilo={"right badge badge-danger"}
              ValorNoti={"New"}
              />
        }
          {Dados.grupo.menu.graficos &&
        <>
          {Dados.grupo.menu.graficos.Ver === true &&
          <MenuLink 
              Linkto={"/graficos"}
              Icon={"nav-icon fas fa-signal"}
              Titulo={"GRÁFICOS"}
              Notificacao={false}
              NotiEstilo={"right badge badge-danger"}
              ValorNoti={"New"}
              />
            }

            </>
            }
             {Dados.grupo.menu.ocorrencia.Ver === true &&
            <MenuLink 
              Linkto={"/ocorrencia"}
              Icon={"nav-icon fas fa-taxi"}
              Titulo={"OCORRÊNCIAS"}
              Notificacao={false}
              NotiEstilo={"right badge badge-danger"}
              ValorNoti={"New"}
              />
              }
                  {Dados.grupo.menu.pesquisa &&
        <>
          {Dados.grupo.menu.pesquisa.Ver === true &&
               <MenuLink 
              Linkto={"/pesquisa"}
              Icon={"nav-icon fas fa-search"}
              Titulo={"PESQUISA"}
              Notificacao={false}
              NotiEstilo={"right badge badge-danger"}
              ValorNoti={"New"}
              />
            }

            </>
            }
              
              {Dados.grupo.menu.noticias.Ver === true &&
               <MenuLink 
              Linkto={"/noticia"}
              Icon={"nav-icon fas fa-newspaper"}
              Titulo={"NOTÍCIAS"}
              Notificacao={false}
              NotiEstilo={"right badge badge-danger"}
              ValorNoti={"New"}
              />
              }
              {Dados.grupo.menu.permissao.Ver === true &&
            <MenuLink 
              Linkto={"/permissoes"}
              Icon={"nav-icon fas fa-check-square"}
              Titulo={"PERMISSÕES"}
              Notificacao={false}
              NotiEstilo={"right badge badge-danger"}
              ValorNoti={"New"}
              />
              }
              {Dados.grupo.menu.contas.Ver === true &&
            <MenuLink 
              Linkto={"/contaserv"}
              Icon={"nav-icon fas fa-desktop"}
              Titulo={"CONTAS"}
              Notificacao={false}
              NotiEstilo={"right badge badge-danger"}
              ValorNoti={"New"}
              />
                }
              {Dados.grupo.menu.configuracao.Ver === true &&
              <MenuLink 
              Linkto={"/config"}
              Icon={"nav-icon fas  fa-cogs"}
              Titulo={"CONFIGURAÇÃO"}
              Notificacao={false}
              NotiEstilo={"right badge badge-danger"}
              ValorNoti={"New"}
              />
              }
            {Dados.grupo.menu.configuracao.Ver === true &&
            <MenuLink 
              Linkto={"/rastreio"}
              Icon={"nav-icon fas fa-taxi"}
              Titulo={"RASTREADOR"}
              Notificacao={false}
              NotiEstilo={"right badge badge-danger"}
              ValorNoti={"New"}
              />
              }
               {/* {Dados.grupo.menu.anuncio.Ver === true && */}
               {Dados.grupo.menu. anuncio &&
        <>
          {Dados.grupo.menu.anuncio.Ver === true &&
              <MenuLink 
              Linkto={"/anuncio"}
              Icon={"nav-icon fas fa-bullhorn"}
              Titulo={"ANUNCIO"}
              Notificacao={false}
              NotiEstilo={"right badge badge-danger"}
              ValorNoti={"New"}
              />
            }

            </>
            }
              {/* } */}
               
          <li className="nav-item">
            <div className="input_cadatro">
                        <Butao 
                          onClick={sair}
                          text={"Sair"}
                        />
                </div>
          </li> 
          {/* <li className="nav-item">
            <div className="input_cadatro">
                        <Butao 
                          onClick={CriarDados}
                          text={"CriarDados"}
                        />
                </div>
          </li> 
          <li className="nav-item">
            <div className="input_cadatro">
                        <Butao 
                          onClick={ApagarDados}
                          text={"ApagarDados"}
                        />
                </div>
          </li> 
          <li className="nav-item">
            <div className="input_cadatro">
                        <Butao 
                          onClick={Desbloquear}
                          text={"Desbloquear"}
                        />
                </div>
          </li>  */}

        </ul>
      </nav>
    </div>
  </aside>
</div>

     
    );
}
