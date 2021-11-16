import React from 'react';
import { Link } from 'react-router-dom';


export default ({cor, valor,  porcentagen, nome, icon, link}) => {

        return (
          <div className="col-lg-3 col-6">
                    {/* small box */}
                    <div className={cor}>
                      <div className="inner">
                        <h3>{valor} 
                          {porcentagen === true &&   <sup style={{fontSize: 20}}>%</sup>}
                          </h3>
                        <p>{nome}</p>
                      </div>
                      <div className="icon">
                        <i className={icon}/>
                      </div>
                     
                    </div>
                  </div>  
              
             
 
        );
    }
 