import React, { useState, useEffect } from 'react';
import Api from '../Api';

let res = '';
export default ({onClick, active, data, Ocorr}) => {
    const [Time, setTime] = useState('');
    const [Hora, setHora] = useState(data.data.seconds);
    const [Conv, setConv] = useState('');
    const [Qmsg, setQmsg] = useState('');
    const [Cont, setCont] = useState('');

    const tempo = ()=>{
        let currentDate = '';
        let now =new Date(data.data.seconds * 1000);
        let hours = now.getHours();
        let minutes = now.getMinutes();
        let Dia = now.getDate();
        let Mes = (now.getMonth()+1);
        let Ano = now.getFullYear(); 
        hours = hours < 10 ? '0'+hours : hours;
        minutes = minutes < 10 ? '0'+minutes : minutes;
        Dia = Dia < 10 ? '0'+Dia : Dia;
        Mes = Mes < 10 ? '0'+Mes : Mes;
        currentDate = Dia+'/'+Mes+'/'+Ano;
        currentDate += ' ';
        currentDate += hours+':'+minutes;
        setTime(currentDate);
    }
    res = data.QuantMsg;
    useEffect(()=>{
        tempo();
    }, [Hora, Time]);

  
    
  
    return (
      
        <div  className="chatListItem"
        style={{
            backgroundColor: data.QuantMsg === data.Vizualizar ? '' : '#F7F424'
        }}
        
        className={`chatListItem ${active?'active':''}`}
        onClick={onClick}
        >
            <div className="chatListItem--lines">
                <div className="chatListItem--line">
                    <div className="chatListItem--name">{data.nome} </div>
                    <div className="chatListItem--date"></div>
                </div>
                <div className="chatListItem--line">
                    <div className="chatListItem--lastMsg">
                        {data.QuantMsg === data.Vizualizar ?
                        <p>{data.msg} </p>
                        :
                        <strong style={{color: '#00E50E'}}>Chegou {data.QuantMsg - data.Vizualizar} Mensagem... </strong>
                        }
                        
                    </div>
                </div>
            </div>
        </div>
    );
}