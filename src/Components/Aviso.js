import React from 'react';

export default ({Avisando}) => {

    
        return (
            <>
            {Avisando[0] &&
            <>
            { Avisando[0].ativo === true &&     
            <div className={Avisando[0].tipo}>
        <button type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
        <h5><i className={Avisando[0].icons} /> Aviso</h5>
            {Avisando[0].frase}
                </div>               
             }
            </>
            }            
             </>
        );
    }