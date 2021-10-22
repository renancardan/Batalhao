import React, { Component } from 'react';

export default ({setAparercer, Aparercer, VerContato, setVerContato}) => {

    const aparecer = () => {
        setAparercer(true);
        setVerContato(false);
    }
    const fechar = () => {
        setAparercer(false);
        setVerContato(false);
    }
    const AbrirContato = ()=> {
        setVerContato(true);
        setAparercer(true);
    }

    
        return (

    <div className='header_login'>
      
        
            <div onClick={fechar} className="header--btnhead"
            style={{
                color: Aparercer === false  ? '#999' : '#5d0bf7'
            }}>
         
                            <p>Inicio</p>
            </div>
            <div onClick={aparecer} className="header--btnhead" style={{
                    color: Aparercer === true && VerContato === false? '#999':'#5d0bf7'
                }} >
                            <p>Manual</p>
            </div>
           
          <div onClick={AbrirContato} className="header--btnhead"
          style={{
            color: Aparercer === true && VerContato === true? '#999':'#5d0bf7'
        }}
          >
                            <p>Contatos</p>
          </div>
         
    </div>

        );
    }


