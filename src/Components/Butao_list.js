import React from 'react';

export default ({style, titulo, onClick}) => {

    
        return (
                
            <button type="button" className={style} onClick={onClick} >{titulo}</button>
        );
    }