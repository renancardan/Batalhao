import React, { Component, useState, useEffect } from 'react';
import HeaderPage from '../../Components/HeaderPages';
import CaixaInforme from '../../Components/CaixaInforme';
import Butao from '../../Components/Butao_list';
import Select from '../../Components/Select';
import Pagination from '../../Components/Pagination';
import Vizualizacao from '../../Components/Vizualizar';
import InstitutoJson from '../../JSONS/institutojson';
import TipocontaJson from '../../JSONS/tipocontjson';
import CidadeJson from '../../JSONS/cidadejson';
import UsuariosServJson from '../../JSONS/UsusariosServ'

export default () => {
      const [Offset, setOffset] = useState(0);
      const [Limit, setLimit] = useState(10);
      const [Vizualizar, setVizualizar] = useState(false);
      const [EstadoContServ, setEstadoContServ] = useState(" ");
      const [CidadeContServ, setCidadeContServ] = useState(" ");
      const [InstituicaoContServ, setInstituicaoContServ] = useState(" ");
      const [ContaContServ, setContaContServ] = useState(" ");
      const [EstCidJson, setEstCidJson] = useState({CidadeJson});
      const [ListaEstado, setListaEstado] = useState([]);
      const [ListaCidade, setListaCidade] = useState([]);
      const [ListInst, setListInst] = useState(InstitutoJson.Intituicao);
      const [ListContaTipo, setListContaTipo] = useState(TipocontaJson.tipo);   
      const [UsuariosContServ, setUsuariosContServ] = useState([
        {id: 0, inst:"Policia Militar", cidade:"Bacabal", estado:"Maranhão", conta: "Lider"},
        {id: 1, inst:"Bombeiro", cidade:"São Paulo", estado:"São Paulo", conta: "Lider"},
        {id: 2, inst:"Ambulancia", cidade:"Teresina", estado:"Piauí", conta: "Lider"},
        {id: 3, inst:"Bombeiro", cidade:"São Luis", estado:"Maranhão", conta: "Lider"},
        {id: 4, inst:"Bombeiro", cidade:"Fortaleza", estado:"Ceará", conta: "Lider"},
        {id: 5, inst:"Policia Militar", cidade:"Bacabal", estado:"Sergipe", conta: "Lider"},
        {id: 6, inst:"Policia Militar", cidade:"Bacabal", estado:"Goias", conta: "Lider"},
        {id: 7, inst:"Policia Militar", cidade:"Bacabal", estado:"Amazonas", conta: "Lider"},
        {id: 8, inst:"Policia Militar", cidade:"Bacabal", estado:"Rio de Janeiro", conta: "Lider"},
        {id: 9, inst:"Policia Militar", cidade:"Bacabal", estado:"Santa Caratina", conta: "Lider"},
        {id: 10, inst:"Policia Militar", cidade:"Bacabal", estado:"Parana", conta: "Lider"},
        {id: 11, inst:"Policia Militar", cidade:"Bacabal", estado:"Amapa", conta: "Lider"},
        {id: 12, inst:"Policia Militar", cidade:"Bacabal", estado:"Mato grosso", conta: "Lider"},
        {id: 13, inst:"Policia Militar", cidade:"Bacabal", estado:"Para", conta: "Lider"},
        {id: 14, inst:"Bombeiro", cidade:"São Luis", estado:"Tocatins", conta: "Lider"},
        {id: 15, inst:"Bombeiro", cidade:"Fortaleza", estado:"Rio grande do Norte", conta: "Lider"}
      ]);
      
      console.log("offset "+ Offset);
      console.log("Limit  "+ Limit);
     

      useEffect(() => {
        ListandoEstado();
      }, []);

      useEffect(() => {
        ListandoCidade();
        }, [EstadoContServ]);

     


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
                      if(ListaEstado[i].cidades.nome === EstadoContServ) {
                        ListaEstado[i].cidades.cidades.forEach(result => {
                          listanha.push({
                            select: result,   
                        });   
                        });
                        setListaCidade(listanha);
                      }
                  }
                }

                function VizualizarConta(id) {
                  setVizualizar(true);

                }
               
      
  return (
        
          <div>
            { Vizualizar === false ?
            <div className="content-wrapper">
              <HeaderPage />            
              <section className="content">
                <div className="container-fluid">
                  <div className="row">
                      <CaixaInforme 
                      cor={"small-box bg-info"}
                      valor={"53"}
                      porcentagen={false}
                      nome={"Contas Lider"}
                      icon={"ion ion-bag"}
                      link={false}
                      />
                      <CaixaInforme 
                      cor={"small-box bg-success"}
                      valor={"53"}
                      porcentagen={true}
                      nome={"Rendimentos"}
                      icon={"ion ion-stats-bars"}
                      link={false}
                      />
                      <CaixaInforme 
                      cor={"small-box bg-warning"}
                      valor={"44"}
                      porcentagen={false}
                      nome={"Contas Subordinadas"}
                      icon={"ion ion-person-add" }
                      link={false}
                      />
                      <CaixaInforme 
                      cor={"small-box bg-danger"}
                      valor={"65"}
                      porcentagen={false}
                      nome={"Visitas"}
                      icon={"ion ion-pie-graph"}
                      link={false}
                      />                           
                   </div>
                <div className="row">
                  <section className="col-12">
                    <div className="card">
                      <div className="card-header">
                        <h3 className="card-title" style={{ marginBottom: "10px"}}>Todas as Contas Serv </h3>    
                        <div className="Campo_pesquisa" > 
                          <div className="pesquisa_unitaria" >
                              <Select 
                              type={null}
                              placeholder={"Instituição"}
                              icon={"fas fas fa-university"}
                              value={InstituicaoContServ}
                              onChange={e=>setInstituicaoContServ(e.target.value)}
                              List={ListInst}
                                />
                            </div>                
                          <div className="pesquisa_unitaria" >
                              <Select 
                              type={null}
                              placeholder={"Estado"}
                              icon={"fas fa-map"}
                              value={EstadoContServ}
                              onChange={e=>setEstadoContServ(e.target.value)}
                              List={ListaEstado}
                                />
                            </div>
                          <div className="pesquisa_unitaria" >
                              <Select 
                              type={null}
                              placeholder={"Cidade"}
                              icon={"fas fa-location-arrow"}
                              value={CidadeContServ}
                              onChange={e=>setCidadeContServ(e.target.value)}
                              List={ListaCidade}
                                />
                            </div>
                          <div className="pesquisa_unitaria" >
                              <Select 
                              type={null}
                              placeholder={"Conta"}
                              icon={"fas fa-desktop"}
                              value={ContaContServ}
                              onChange={e=>setContaContServ(e.target.value)}
                              List={ListContaTipo}
                                />
                            </div>                
                        </div>
                      </div>
                        <div class="card-body table-responsive p-0">
                          <table class="table table-hover text-nowrap">
                            <thead>
                              <tr>
                                <th>Instituição</th>
                                <th>Cidade</th>
                                <th>Estado</th>
                                <th>Conta</th>
                                <th>Ações</th>
                              </tr>
                            </thead>
                            <tbody>
                            {UsuariosContServ.map((item, key)=>(
                                    <tr key={item.id}>
                                    <td>{item.inst}</td>
                                    <td>{item.cidade}</td>
                                    <td>{item.estado}</td>
                                    <td>{item.conta}</td>
                                    <td>
                                    <Butao 
                                      style={"btn btn-xs btn-primary"}
                                      titulo={"Vizualizar"}
                                      onClick={() => VizualizarConta(item.id) }
                                      />
                                    <Butao 
                                      style={"btn btn-xs btn-success"}
                                      titulo={"Editar"}
                                      onClick={null}
                                      />                                      
                                    <Butao 
                                      style={"btn btn-xs btn-danger"}
                                      titulo={"Excluir"}
                                      onClick={null}
                                      />                          
                                    </td>
                                  </tr>
                             ))}
                            </tbody>      
                          </table>
                            <Pagination
                            limit={Limit} 
                            total={UsuariosContServ.length} 
                            offset={Offset}
                            setOffset={setOffset}
                            />
                         </div>
                        </div>
                    </section>       
               </div>
            </div>
          </section>
        </div>
        :
        <Vizualizacao 
        setVizualizar={setVizualizar}
        />
         }
      </div>

        );
    }
