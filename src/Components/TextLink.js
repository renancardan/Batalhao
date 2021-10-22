import React from 'react';

export default ({text,estilo, onClick}) => {

    
        return (
            <div onClick={onClick}  className= {estilo}>
            <p className="pLinsk">{text}</p>
         </div>

        );
    }