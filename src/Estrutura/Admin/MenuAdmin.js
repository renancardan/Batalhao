import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MenuLink from '../../Components/MenuLink';
import Butao from '../../Components/Butao';

export default ({sair}) => {
  
    
  return (
  <div>
  <aside className="main-sidebar sidebar-dark-primary elevation-4">
    {/* Brand Logo */}
    <a href="index3.html" className="brand-link">
      <img src="assets/city.png" alt="AdminLTE Logo"  style={{opacity: '.8', width: 40, marginRight: 20, marginLeft:20 }} />
      <span className="brand-text font-weight-light">City Hand Admin</span>
    </a>
    {/* Sidebar */}
    <div className="sidebar">
      {/* Sidebar user panel (optional) */}
      <div className="user-panel mt-3 pb-3 mb-3 d-flex">
        <div className="image">
          <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
        </div>
        <div className="info">
          <a href="#" className="d-block">Renan Azevedo</a>
        </div>
      </div>
      {/* Sidebar Menu */}
      <nav className="mt-2">
        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          {/* Add icons to the links using the .nav-icon class
           with font-awesome or any other icon font library */}
         <li className="nav-item has-treeview">
            <a href="#" className="nav-link">
              <i className="nav-icon fas fa-folder" />
              <p>
                Contas
                <i className="fas fa-angle-left right" />
                <span className="badge badge-info right">6</span>
              </p>
            </a>
            <ul className="nav nav-treeview">

              <MenuLink 
              Linkto={"/admin"}
              Icon={"nav-icon fas fa-th"}
              Titulo={"Contas Admin"}
              Notificacao={false}
              NotiEstilo={"right badge badge-danger"}
              ValorNoti={"New"}
              />

              <MenuLink 
              Linkto={"/serv"}
              Icon={"nav-icon fas fa-th"}
              Titulo={"Contas Serv"}
              Notificacao={false}
              NotiEstilo={"right badge badge-danger"}
              ValorNoti={"New"}
              />

               <MenuLink 
              Linkto={"/config"}
              Icon={"nav-icon fas fa-th"}
              Titulo={"Contas ServApp"}
              Notificacao={false}
              NotiEstilo={"right badge badge-danger"}
              ValorNoti={"New"}
              />

              <MenuLink 
              Linkto={"/config"}
              Icon={"nav-icon fas fa-th"}
              Titulo={"Contas App"}
              Notificacao={false}
              NotiEstilo={"right badge badge-danger"}
              ValorNoti={"New"}
              />
             <li className="nav-item">
            <div className="input_cadatro">
                        <Butao 
                          onClick={sair}
                          text={"Sair"}
                        />
                </div>
          </li>
         
              
            </ul>
          </li>
  
          
          
        </ul>
      </nav>
      {/* /.sidebar-menu */}
    </div>
    {/* /.sidebar */}
  </aside>
</div>

        );
    }

