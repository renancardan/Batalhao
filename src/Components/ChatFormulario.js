import React, { useState, useEffect} from 'react';
import RoomIcon from '@material-ui/icons/Room';
import SweetAlert from 'react-bootstrap-sweetalert';
import Modal from 'react-awesome-modal';
import Geocoder from 'react-native-geocoding';
import Api from '../Api';



let recorder = '';
let timer = '';
export default ({ AbrirMaps, MapsCaixa, data, Nome, Dados,  setAlert, setAlertTipo, Alert, AlertTipo,  setFormu, Forms, setActiveChat}) => {
   
    const [User, setUser] = useState('');
    const [list, setList] = useState([]);
    const [Visible, setVisible] = useState(false);
    const [Body, setBody] = useState('');
    const [nome, setnome] = useState(Dados.nome);
    const [TemUmlt, setTemUmlt] = useState('');
    const [DateIni, setDateIni] = useState('');
    const [time, setTime] = useState('');
    const [ListInt, setListInt] = useState([]);
    const [NumOc, setNumOc] = useState('');
    const [Vtr, setVtr] = useState("");
    const [AtenCop, setAtenCop] = useState("");
    const [CompVt, setCompVt] = useState("");
    const [DateH, setDateH] = useState("");
    const [Verh, setVerh] = useState("");
    const [Periodo, setPeriodo] = useState("");
    const [Horas, setHoras] = useState("");
    const [Rua, setRua] = useState("");
    const [Numero, setNumero] = useState("");
    const [Bairro, setBairro] = useState("");
    const [Cidade, setCidade] = useState("");
    const [Estado, setEstado] = useState("");
    const [Lat, setLat] = useState("");
    const [Lng, setLng] = useState("");
    const [End, setEnd] = useState("");
    const [Conduz, setConduz] = useState("");
    const [Viti, setViti] = useState("");
    const [ObjAp, setObjAp] = useState("");
    const [ResulOc, setResulOc] = useState("");
    const [Relato, setRelato] = useState("");
    const [Prov, setProv] = useState("");
    const [ExcOc, setExcOc] = useState("Não");
    const [Exc, setExc] = useState(false);
    const [DataTime, setDataTime] = useState(0);
    const [Test, setTest] = useState("");
    const [Autor, setAutor] = useState("");
    
    

    useEffect(()=>{ 
       PegandoList()
    }, []);

   
    useEffect(()=>{  
       Excluindo()
     }, [ExcOc]);

    useEffect(()=>{  
        ListandoList();
        ListandoTempo();
     }, [list]);

     useEffect(()=>{
        PegDados();
    }, []);

    useEffect(()=>{
        PeriodoHoras();
    }, [Horas]);

    useEffect(() => {
        Geocoder.init('AIzaSyBVYpwN6IT9kjonTs76bq1G9aSxYRhYU7U', {language:'pt-br'});
      }, []);

      useEffect(()=>{
        tempo();
    }, [DataTime]);

    useEffect(()=>{
        MotarEnd();
    }, [Rua, Numero, Bairro, Cidade, Estado]);

    useEffect(() => {
        if(End) {
          if(timer){
            clearTimeout(timer);
          }
          timer = setTimeout( async ()=>{
      
            const geo = await Geocoder.from(End);
            if(geo.results.length > 0){
              let tmpResults = []
              for(let i in geo.results){
                tmpResults.push({
                  address:geo.results[i].formatted_address,
                  latitude:geo.results[i].geometry.location.lat,
                  longitude:geo.results[i].geometry.location.lng,
                });
      
              }
              setLat(tmpResults[0].latitude);
              setLng(tmpResults[0].longitude);
      
            }
      
          }, 500);
        }
       
      }, [End]);

    const tempo = ()=>{
        let currentDate = '';
        let mdate ='';
        let Mhora = '';
        let now =new Date(DataTime);
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
        mdate = Dia+'/'+Mes+'/'+Ano;
        setDateH(mdate);
        currentDate += ' ';
        currentDate += hours+':'+minutes;
            Mhora = hours+':'+minutes;
        setVerh( Mhora)
        setTime(currentDate);
        setHoras(hours);
       
        
    }


    const ListandoList = ()=>{
        for(let i in list){
            let listra = [];
            if(list[i].id === data) {
                list[i].nome.forEach(result=>{
                    listra.push({
                       type:result.type,
                       autor:result.autor,
                       body: result.body,
                       date: result.date,
                       nome: result.nome,
                    });
                });
                setListInt(listra);
            }
        }


       
       
      
    }

    const ListandoTempo = ()=>{
        for(let i in list){
            let Temp = [];
            if(list[i].id === data) {  
                setDateIni(list[i].dataIni);
            }
        }


       
       
      
    }
   
    
  

    const PeriodoHoras = ()=>{
        if( Horas >= 6  ) {
            if(Horas < 12 ){
                setPeriodo("Manhã");
            }
           
        }
        if( Horas >= 12  ) {
            if(Horas < 18 ){
                setPeriodo("Tarde");
            }
           
        }

        if( Horas >= 18  ) {
            if(Horas < 24 ){
                setPeriodo("Noite");
            }
           
        }

        if( Horas >= 0  ) {
            if(Horas < 6 ){
                setPeriodo("Madrugada");
            }
           
        }

    }

  

    const PegDados = ()=> {  
        Api.DadosForm(data, setVtr, setAtenCop, setCompVt, setRua, 
        setNumero, setBairro, setCidade, setEstado, setLat, setLng,
        setConduz, setViti, setObjAp, setResulOc, setRelato, setProv, setDataTime, 
        setTest, setNumOc, setAutor );
    }

    const EnviandoVtr = ()=> {
        
            var dia  = DateH.split("/")[0];
            var mes  = DateH.split("/")[1];
            var ano  = DateH.split("/")[2];

            var Hora = Verh.split(":")[0];
            var Minu = Verh.split(":")[1];
            const mas =    ("0"+mes).slice(-2) + '/' + ("0"+dia).slice(-2) + '/' + ano + ' ' + ("0"+Hora).slice(-2) + ':' + ("0"+Minu).slice(-2);
            const tempoMad = Date.parse(mas)/1000; 
           
          

        Api.EnviVtr(data, Vtr, AtenCop, CompVt, Periodo, Rua, Numero, Bairro, Cidade, Estado, Lat, Lng, Conduz, Viti, ObjAp, ResulOc, Relato, Prov, tempoMad, NumOc, Test, Autor);
    }

   

  

    const PegandoList = ()=>{
        Api.PesquisarConversa(data, Dados, setList, setUser, setTemUmlt, setDateIni);
    }

    const MotarEnd = ()=>{
        let endereco = Rua + ", " + Numero + " - "+ Bairro + ", "+Cidade+ " - "+ Estado;
        setEnd(endereco);
    }

    

   

   

 

  

  

    const closeModal = ()=>{
            setVisible(false);
            setBody('');
    }

    function Concluir() {
        setAlert("ok");
        setAlertTipo("Concluir");
      }

      const ConclusaoOc = ()=>{
        setAlert(" ");
        setAlertTipo(" ");
        Api.ConcluirOc(data, Exc);
        setActiveChat(null);
    }

    function cancelar() {
        setAlert(" ");
        setAlertTipo(" ");
      }
      const fecharFormu = ()=>{
        setFormu(true);
      }

      const Excluindo = ()=>{
          if(ExcOc === "Sim"){
            setExc(true);
          }else{
            setExc(false);
          }
      }
          
     
    

    return (
        <div className="chatWindow" style={{height: MapsCaixa ? '50%' : '100%'}}>
             { Alert !== " " && AlertTipo === "Concluir" &&
              <SweetAlert
              warning
              showCancel
              confirmBtnText="Sim"
              cancelBtnText="Não"
              confirmBtnBsStyle="success"
              onConfirm={()=>ConclusaoOc()}
              onCancel={cancelar}
              focusCancelBtn
            >
              Tem certeza que deseja Concluir a Ocorrencia {Nome}!
            </SweetAlert>
            }
            <Modal visible={Visible} width="500" height="500" effect="fadeInUp" onClickAway={() =>closeModal()}>
                    <div>
                    <video width="500" height="500" controls
                    preload="auto"
                source src={Body} type="video/mp4" type="video/ogg"
                >

                    
               
                </video>
                        <a href="javascript:void(0);" onClick={() => closeModal()}>Close</a>
                    </div>
                </Modal>
            <div className="chatWindow--header">
            <div className="chatWindow--headerinfo">
           
            <div className="chatWindow--name"  style={{margin: '30px'}}>  
            <string className="textTitulo" >Nome: {Nome}</string><br/>
            <string className="textTitulo" >Inicio da ocorrencia: {time}</string>
            </div>
            </div>
            <div className="chatWindow--headerbuttons">
                     {Dados.grupo.menu.chat.caixaChat.btn_concluido === true && 
                    <div className="chatWindow--btn3"
                     onClick={()=>Concluir()}
                    >
                        <p className="textButao" >CONCLUIDO</p>
                    </div>
                    }
                    {Dados.grupo.menu.chat.caixaChat.btn_chat === true && 
                    <div className="chatWindow--btn1"
                     onClick={()=>fecharFormu()}
                    >
                        <p className="textButao" >CHAT</p>
                    </div>
                    }
                    <div className="chatWindow--btn"
                    onClick={AbrirMaps}
                    >
                        <RoomIcon style={{color: MapsCaixa?'#5d0bf7':'#919191'}} />
                    </div>

                </div>
            </div>
            <div style={{ overflow: 'auto'}} >
            <div className="chatWindow--body1">
                        <div className="row">
                        <div className="col-sm-12">
                        <label>Excluir Ocorrência</label>
                                <select className="form-control"
                                value={ExcOc}
                                onChange={t=>setExcOc(t.target.value)}
                                >
                                <option>Não</option>
                                <option>Sim</option>
                                </select>
                            </div>
                            </div>
                <h5>Fomulário de Ocorrência</h5>
              
                    <div className="card card-warning">
                    <div className="card-header">
                        <h3 className="card-title">Policias e Vtr da Ocorrência</h3>
                    </div>
                    {/* /.card-header */}
                    <div className="card-body">
                        
                        <div className="row">
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label>Nº da Ocorrência</label>
                                <input type="text" 
                                className="form-control"
                                 placeholder="Digite o Numero da Ocorrência..."
                                 value={NumOc}
                                 onChange={t=>setNumOc(t.target.value)}
                                  onBlur={()=>EnviandoVtr()}
                                  />
                            </div>
                            </div>
                            <div className="col-sm-6">
                            <div className="form-group">
                                <label>Vtr</label>
                                <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Digite a Vtr" 
                                value={Vtr}
                                onChange={t=>setVtr(t.target.value)}
                                onBlur={()=>EnviandoVtr()}
                                />
                            </div>
                            </div>
                            <div className="col-sm-6">
                            <div className="form-group">
                                <label>Atendente Copom</label>
                                <textarea 
                                className="form-control" 
                                rows={4} 
                                placeholder="Digite o Nome dos Atendentes ..." 
                                defaultValue={""} 
                                value={AtenCop}
                                onChange={t=>setAtenCop(t.target.value)}
                                onBlur={()=>EnviandoVtr()}
                                />
                            </div>
                            </div>
                            <div className="col-sm-6">
                            {/* text input */}
                            <div className="form-group">
                                <label>Componente da Vtr</label>
                                <textarea 
                                className="form-control" 
                                rows={4} 
                                placeholder="Digite o Nome dos Componentes da Vtr ..." 
                                defaultValue={""}
                                value={CompVt}
                                onChange={t=>setCompVt(t.target.value)}
                                onBlur={()=>EnviandoVtr()}
                                />
                            </div>
                            </div>
                            <div className="col-sm-6">
                            <div className="form-group">
                                <label>Ocorrência</label>
                                {Forms.map((item,key)=>(
                                          <>
                                          <div className="listCond1">
                                          <string> {item.nome}</string>
                                          </div>
                                            <br/>
                                          </>
                                         ))
                
                                      }
                            </div>
                            </div>
                            <div className="col-sm-6">
                            <div className="form-group">
                                <label>Resultado</label>
                                <select className="form-control"
                                value={ResulOc}
                                onChange={t=>setResulOc(t.target.value)}
                                onBlur={()=>EnviandoVtr()}
                                placeholder={"Resultado Final"}
                                >
                                <option>Resultado Final</option>
                                <option>Condução ao DP</option>
                                <option>Resolvido no local</option>
                                <option>Evadiu-se</option>
                                <option>Nada constatado</option>
                                <option>Ocorrência computada</option>
                                <option>Outros</option>
                                </select>
                            </div>
                            </div>
                            
                        </div>
                       
                    </div>
                    {/* /.card-body */}
                    </div>
                    <div className="card card-success">
                    <div className="card-header">
                        <h3 className="card-title">Data da Ocorrência</h3>
                    </div>
                    {/* /.card-header */}
                    <div className="card-body">
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label>Data</label>
                                <input 
                                type="text" 
                                className="form-control" 
                                placeholder="07/05/2021" 
                                value={DateH}
                                onChange={t=>setDateH(t.target.value)}
                                onBlur={()=>EnviandoVtr()}
                                />
                            </div>
                            </div>
                            <div className="col-sm-6">
                            {/* text input */}
                            <div className="form-group">
                                <label>Hora</label>
                                <input 
                                type="text" 
                                className="form-control"
                                placeholder="15:20:00"
                                value={Verh}
                                onChange={t=>setVerh(t.target.value)}
                                onBlur={()=>EnviandoVtr()}
                                />
                            </div>
                            </div>
                            <div className="col-sm-6">
                            <div className="form-group">
                                <label>Período</label>
                                <input 
                                type="text" 
                                className="form-control"
                                placeholder="15:20:00"
                                value={Periodo}
                                onChange={t=>setPeriodo(t.target.value)}
                                disabled
                                />
                            </div>
                            </div>
                        </div>
                        <div className="row">
                           
                        </div>
                        
                    </div>
                    {/* /.card-body */}
                    </div>
                    <div className="card card-primary">
                    <div className="card-header">
                        <h3 className="card-title">Endereço da Ocorrência</h3>
                    </div>
                    {/* /.card-header */}
                    <div className="card-body">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="form-group">
                                <label>Rua</label>
                                <input 
                                type="text"
                                autocomplete="off"
                                 className="form-control" 
                                 placeholder="Digite o Nome da Rua, ou Avenida..." 
                                 value={Rua}
                                 onChange={t=>setRua(t.target.value)}
                                 onBlur={()=>EnviandoVtr()}
                                 />
                            </div>
                            </div>
                            <div className="col-sm-6">
                            <div className="form-group">
                                <label>Número</label>
                                <input 
                                type="text" 
                                autocomplete="off"
                                className="form-control" 
                                placeholder="Digite o Número da Casa..." 
                                value={Numero}
                                onChange={t=>setNumero(t.target.value)}
                                onBlur={()=>EnviandoVtr()}
                                />
                            </div>
                            </div>
                            <div className="col-sm-6">
                            <div className="form-group">
                                <label>Bairro</label>
                                <input 
                                type="text" 
                                autocomplete="off"
                                className="form-control" 
                                placeholder="Digite o Bairro..." 
                                value={Bairro}
                                onChange={t=>setBairro(t.target.value)}
                                onBlur={()=>EnviandoVtr()}
                                />
                            </div>
                            </div>
                            <div className="col-sm-6">
                            <div className="form-group">
                                <label>Cidade</label>
                                <input 
                                type="text" 
                                autocomplete="off"
                                className="form-control" 
                                placeholder="Digite a Cidade..." 
                                value={Cidade}
                                onChange={t=>setCidade(t.target.value)}
                                onBlur={()=>EnviandoVtr()}
                                />
                            </div>
                            </div>
                            <div className="col-sm-6">
                            <div className="form-group">
                                <label>Estado</label>
                                <input 
                                type="text" 
                                autocomplete="off"
                                
                                className="form-control" 
                                placeholder="Digite o Estado..." 
                                value={Estado}
                                onChange={t=>setEstado(t.target.value)}
                                onBlur={()=>EnviandoVtr()}
                                />
                            </div>
                            </div>
                            <div className="col-sm-6">
                            <div className="form-group">
                                <label>Latitude</label>
                                <input 
                                type="text"
                                 className="form-control" 
                                 placeholder="Digite a Cidade..."
                                 disabled
                                 value={Lat}
                                 onChange={t=>setLat(t.target.value)}
                                 onBlur={()=>EnviandoVtr()}
                                 />
                            </div>
                            </div>
                            <div className="col-sm-6">
                            <div className="form-group">
                                <label>Longitude</label>
                                <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Digite o Estado..."
                                disabled
                                value={Lng}
                                onChange={t=>setLng(t.target.value)}
                                onBlur={()=>EnviandoVtr()}
                                />
                            </div>
                            </div>
                           
                        </div>
                     
                        
                    </div>
                    {/* /.card-body */}
                    </div>
                    <h5>Relatório Analítico</h5>
                    <div className="card card-danger">
                    <div className="card-header">
                        <h3 className="card-title">Envolvidos da Ocorrência</h3>
                    </div>
                    {/* /.card-header */}
                    <div className="card-body">
                    <div className="row">
                            <div className="col-sm-12">
                            <div className="form-group">
                                <label>Conduzidos</label>
                                <textarea 
                                className="form-control" 
                                rows={3}
                                 placeholder="Digite as Informações dos Conduzidos..." 
                                 defaultValue={""}
                                 value={Conduz}
                                 onChange={t=>setConduz(t.target.value)}
                                 onBlur={()=>EnviandoVtr()}
                                 />
                            </div>
                            </div>
                            <div className="col-sm-12">
                            <div className="form-group">
                                <label>Autores</label>
                                <textarea 
                                className="form-control" 
                                rows={3}
                                 placeholder="Digite as Informações Sobre Autores..." 
                                 defaultValue={""}
                                 value={Autor}
                                 onChange={t=>setAutor(t.target.value)}
                                 onBlur={()=>EnviandoVtr()}
                                 />
                            </div>
                            </div>
                            <div className="col-sm-12">
                            <div className="form-group">
                                <label>Vítimas</label>
                                <textarea 
                                className="form-control" 
                                rows={3} 
                                placeholder="Digite as Informações das Vitimas..."  
                                defaultValue={""} 
                                value={Viti}
                                onChange={t=>setViti(t.target.value)}
                                onBlur={()=>EnviandoVtr()}
                                />
                            </div>
                            </div>
                            <div className="col-sm-12">
                            <div className="form-group">
                                <label>Testemunha</label>
                                <textarea 
                                className="form-control" 
                                rows={3} 
                                placeholder="Digite as Informações das Testemunhas..."  
                                defaultValue={""} 
                                value={Test}
                                onChange={t=>setTest(t.target.value)}
                                onBlur={()=>EnviandoVtr()}
                                />
                            </div>
                            </div>
                            <div className="col-sm-12">
                            <div className="form-group">
                                <label>Objetos Apreendidos</label>
                                <textarea 
                                className="form-control" 
                                rows={3} 
                                placeholder="Digite os objetos apreendidos..."  
                                defaultValue={""} 
                                value={ObjAp}
                                onChange={t=>setObjAp(t.target.value)}
                                onBlur={()=>EnviandoVtr()}
                                />
                            </div>
                            </div>
                           
                        </div>
                     
                        
                    </div>
                    {/* /.card-body */}
                    </div>
                    <div className="card card-info">
                    <div className="card-header">
                        <h3 className="card-title">Informações da Ocorrência</h3>
                    </div>
                    {/* /.card-header */}
                    <div className="card-body">
                    <div className="row">
               
                            <div className="col-sm-12">
                            <div className="form-group">
                                <label>Relato da Ocorrência</label>
                                <textarea 
                                className="form-control" 
                                rows={10} 
                                placeholder="Digite o relato da Ocorrência..."  
                                defaultValue={""} 
                                value={Relato}
                                onChange={t=>setRelato(t.target.value)}
                                onBlur={()=>EnviandoVtr()}
                                />
                            </div>
                            </div>
                            <div className="col-sm-12">
                            <div className="form-group">
                                <label>Providências Tomadas</label>
                                <textarea 
                                className="form-control" 
                                rows={10} 
                                placeholder="Digite as providências tomadas.."  
                                defaultValue={""}
                                value={Prov}
                                onChange={t=>setProv(t.target.value)}
                                onBlur={()=>EnviandoVtr()} 
                                />
                            </div>
                            </div>
                           
                        </div>
                     
                        
                    </div>
                    {/* /.card-body */}
                    </div>
                    </div>
                    
{/* /.card */}
{/* general form elements disabled */}
                   
           
            
 
             </div>
        </div>
    );
}