import React, {useState, useEffect} from 'react';
import './App.css';
import Api from "./Api";






function App() {
    const [InstCad, setInstCad] = useState("Polícia Militar");
    const [EstadoCad, setEstadoCad] = useState("Maranhão");
    const [CidadeCad, setCidadeCad] = useState("Bacabal");
    const [NomeCad, setNomeCad] = useState("");
    const [TelCad, setTelCad] = useState("");
    const [EmailCad, setEmailCad] = useState("");
    const [ContaCad, setContaCad] = useState("");
    const [SenhaCad, setSenhaCad] = useState("");
    const [SenhaComfCad, setSenhaComfCad] = useState("");

    const [User, setUser] = useState("L23252679");
    const [Conta, setConta] = useState("serv");
    const [Loading, setLoading] = useState(false);
    const [Alert, setAlert] = useState(" ");
    const [AlertTipo, setAlertTipo] = useState(" ");
    const [Dados, setDados] = useState('');
    const [Avisando, setAvisando] = useState([]);
   

           
           
                 



  return (
   <div>
     <p>
       Projeto
     </p>
   </div>
    );
  }
  
  export default App;