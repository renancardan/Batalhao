import React from 'react';
import { Link } from 'react-router-dom';
import Aviso from './Aviso';


export default ({Titulo, Avisando}) => {

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
                  <li className="breadcrumb-item"><Link to="/"  >Home</Link></li>
                  <li className="breadcrumb-item active">{Titulo}</li>
                </ol>
              </div>
            </div>
          </div>{/* /.container-fluid */}
        </section>
        );
    }