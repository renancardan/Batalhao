import React from 'react';
import { Link } from 'react-router-dom';
import Aviso from './Aviso';
import Butao from '../Components/Butao_list';


export default ({Titulo, Avisando, Fechar}) => {

        return (

            <section className="content-header">
            <div className="container-fluid">
            {Avisando !== "" &&
                        <Aviso 
                        Avisando={Avisando}
                        />
                    }
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1>{Titulo}</h1>
                </div>
                <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                <Butao 
                  style={"btn btn-xs btn-danger"}
                  titulo={"Fechar"}
                  onClick={Fechar}
                  />
                  </ol>
                </div>
              </div>
            </div>{/* /.container-fluid */}
          </section>
                
          
        
        );
    }