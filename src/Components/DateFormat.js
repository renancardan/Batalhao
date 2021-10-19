import React, { useState, useEffect } from 'react';

export default ({ DateIni}) => {
  console.log(DateIni);
    const [time, setTime] = useState('');
    useEffect(()=>{
        tempo();
    }, []);

    const tempo = ()=>{
        let currentDate = '';
        let now =new Date(DateIni * 1000);
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


    

    return (
        <string>{time}</string>
      
    );
}