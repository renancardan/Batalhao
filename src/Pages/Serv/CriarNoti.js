
import React, {useState, useEffect} from 'react';
import Api from '../../Api';
import Butao from '../../Components/Butao_list';
import Campo from '../../Components/Campo';
import Header from '../../Components/Header';
import { ReactTrixRTEInput, ReactTrixRTEToolbar } from "react-trix-rte";
import { DatePicker, DatePickerInput } from 'rc-datepicker';
import Modal from 'react-awesome-modal';
import { Spinner  } from "react-awesome-spinners";
import SweetAlert from 'react-bootstrap-sweetalert';




export default ({Dados, Avisando, Fechar, Id, setAlert, setAlertTipo, MsgDesativar}) => {
const [Nome, setNome] = useState("");
const [Titulo, setTitulo] = useState("Criar Notícia");
const [TituNoti, setTituNoti] = useState("");
const [TituAnun, setTituAnun] = useState("");
const [value, setValue] = useState("");
const [Data, setData] = useState(0);
const [Hora, setHora] = useState("00");
const [Minuto, setMinuto] = useState("00");
const [DiaMesAno, setDiaMesAno] = useState("");
const [Visi1, setVisi1] = useState(false);
const [Alert1, setAlert1] = useState("");
const [AlertTipo1, setAlertTipo1] = useState("")

const [Img1, setImg1] = useState("../assets/avatarimg.png");
const [Img2, setImg2] = useState("../assets/avatarimg.png");
const [Img3, setImg3] = useState("../assets/avatarimg.png");
const [Img4, setImg4] = useState("../assets/avatarimg.png");
const [Imgs, setImgs] = useState([{Foto:""}, {Foto:""}, {Foto:""}, {Foto:""}]);




 useEffect(() => {
   if(Hora !== "00" || Minuto !== "00"){
    MudaDate();
   }
 }, [Hora, Minuto])




  const criando = ()=>{
      if(Data !== 0){
        
        if(TituAnun !== ""){
          if(TituNoti !== ""){
            if(value !== ""){
              if(Img1 !== "../assets/avatarimg.png"){
                if (navigator.onLine) {
                        
                  Api.CriandoNoti(Dados, Data, value, TituNoti, TituAnun , setAlertTipo, setAlert, Imgs, setVisi1);
           
                 
                } else {
                  setAlert1("Sem Internet");
                  setAlertTipo1("danger");
                }
        
              } else {
                setAlert1("Coloque  pelo menos 1 imagem no primeiro quadrado");
                setAlertTipo1("danger");
              }
            
      
            } else {
              setAlert1("Preencha as informações da Notícia");
              setAlertTipo1("danger");
            }
          
    
          } else {
            setAlert1("Preencha o Titulo da notícia da Notícia");
            setAlertTipo1("danger");
          }
        
  
        } else {
          setAlert1("Preencha O titulo do Anuncio da Notícia");
          setAlertTipo1("danger");
        }
      

      } else {
        setAlert1("Preencha a Data da Notícia");
        setAlertTipo1("danger");
      }
    
    
  }
 

  const DatandoA = (jsDate, dateString)=>{
    let currentDate = '';
    let now =new Date(jsDate);
    let Dia = now.getDate();
    let Mes = (now.getMonth()+1);
    let Ano = now.getFullYear();
    Dia = Dia < 10 ? '0'+Dia : Dia;
    Mes = Mes < 10 ? '0'+Mes : Mes;
    currentDate = Ano+'-'+Mes+'-'+Dia;
    setDiaMesAno(currentDate);
    let variac = new Date(currentDate +"T"+Hora+":"+Minuto+":00.000").getTime();
    setData(variac);
  }

  const MudaDate= ()=> {
    let mid = new Date(DiaMesAno+"T"+Hora+":"+Minuto+":00.000").getTime();
    setData(mid);
  }
  const ColocarImg1 = async (e)=>{
    const reader = new FileReader()
   reader.onload = () => {
      if(reader.readyState === 2) {
        setImg1(reader.result);
        
      }
    }
   await reader.readAsDataURL(e.target.files[0]);
  
    Imgs[0].Foto = e.target.files[0];
    
    
    setImgs([...Imgs]);
  } 
  const ColocarImg2 = (e)=>{
    const reader = new FileReader()
    reader.onload = () => {
      if(reader.readyState === 2) {
        setImg2(reader.result);
      }
    }
   reader.readAsDataURL(e.target.files[0]);
   Imgs[1].Foto = e.target.files[0];
   setImgs([...Imgs]);
  
  } 

  const ColocarImg3 = (e)=>{
    const reader = new FileReader()
    reader.onload = () => {
      if(reader.readyState === 2) {
        setImg3(reader.result);
      }
    }
   reader.readAsDataURL(e.target.files[0]);
   Imgs[2].Foto = e.target.files[0];
   setImgs([...Imgs]);
  
  } 

  const ColocarImg4 = (e)=>{
    const reader = new FileReader()
    reader.onload = () => {
      if(reader.readyState === 2) {
        setImg4(reader.result);
      }
    }
   reader.readAsDataURL(e.target.files[0]);
   Imgs[3].Foto = e.target.files[0];
   setImgs([...Imgs]);
  
  } 
  const ExcImg1 = ()=>{
    Imgs[0].Foto = "";
    setImgs([...Imgs]);
    setImg1("../assets/avatarimg.png");
  }
  const ExcImg2 = ()=>{
    Imgs[1].Foto = "";
    setImgs([...Imgs]);
    setImg2("../assets/avatarimg.png");
  }

  const ExcImg3 = ()=>{
    Imgs[2].Foto = "";
    setImgs([...Imgs]);
    setImg3("../assets/avatarimg.png");
  }

  const ExcImg4 = ()=>{
    Imgs[3].Foto = "";
    setImgs([...Imgs]);
    setImg4("../assets/avatarimg.png");
  }
  const confirma1 = ()=>{
    setAlert1("");
    setAlertTipo1("");
  }
  const cancelar1 = ()=>{
    setAlert1("");
    setAlertTipo1("");
  }
  

        return (
            <>
<div className="content-wrapper">
                <Header 
                Titulo={Titulo}
                Avisando={Avisando}
                Fechar={Fechar}
                />
                 {Alert1 !== " " && AlertTipo1 === "success" &&
                  <SweetAlert  success title={Alert1} onConfirm={confirma1} onCancel={cancelar1} />
                }

            {Alert1 !== " " && AlertTipo1 === "danger" &&
                  <SweetAlert  danger title={Alert1} confirmBtnBsStyle="danger" onConfirm={confirma1} onCancel={cancelar1} />
                }
                  <Modal visible={Visi1} width="500" height="100" effect="fadeInUp" onClickAway={null}>
                <div className="row">
                  <div className="col-12">
                    <h4>
                      Espere Um momento está sendo enviado!
                    </h4>
                    <Spinner 
                    size={64}
                    color={"#5d0bf7"}
                    sizeUnit={'px'} 
                    />
                  </div>
                  {/* /.col */}
                </div>


                </Modal>
               <section className="content">
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-12">
                      <div className="callout callout-info">
            <h5><i className="fas fa-info" /> Nota:</h5>
           Crie uma notícia para colocar no app!
          </div>
              <div className="invoice p-3 mb-3">
              {/* title row */}
              <div className="row">
                <div className="col-12">
                  <h4>
                    <i className="fas fa-university" /> Instituição {Dados.instituicao} 
                  </h4>
                </div>
                {/* /.col */}
              </div>
              {/* info row */}
              <div className="row invoice-info">
                <div className="col-sm-4 invoice-col">
                  <address>
                    <strong>Digite o Titulo da Notícia Anúncio:</strong><br />
                    <div className="input_cadatro">
                            <textarea 
                               rows={2}
                                type="text" 
                                className="form-control" 
                                placeholder="Digite o Titulo da Notícia Anúncio"
                                value={TituAnun}
                                onChange={t=>setTituAnun(t.target.value)}
                                maxlength="54"
                                />

                            </div> 
                    <br />
                    <strong>Digite o Titulo da Notícia :</strong><br />
                    <div className="input_cadatro">
                            <textarea 
                               rows={3}
                                type="text" 
                                className="form-control" 
                                placeholder="Digite o Titulo "
                                value={TituNoti}
                                onChange={t=>setTituNoti(t.target.value)}
                               
                                />

                            </div> 
                    <br />
                    <strong>Escolha a Data:</strong><br />
                    <DatePickerInput
                                  onChange={DatandoA}
                                  value={Data}
                                  className='my-custom-datepicker-component'
                                  
                                />
                                <br /> 
                                <div className="row" >
                                <div className="col-sm-3">
                               <div className="form-group">
                                <label>Hora</label>
                                <select className="form-control"
                                value={Hora}
                                onChange={t=>setHora(t.target.value)} 
                                >
                      
                                <option>00</option>
                                <option>01</option>
                                <option>02</option>
                                <option>03</option>
                                <option>04</option>
                                <option>05</option>
                                <option>06</option>
                                <option>07</option>
                                <option>08</option>
                                <option>09</option>
                                <option>10</option>
                                <option>11</option>
                                <option>12</option>
                                <option>13</option>
                                <option>14</option>
                                <option>15</option>
                                <option>16</option>
                                <option>17</option>
                                <option>18</option>
                                <option>19</option>
                                <option>20</option>
                                <option>21</option>
                                <option>22</option>
                                <option>23</option>
                                
                                </select>
                                
                            </div>
                            </div>
                            <string style={{marginTop:"25px", fontSize:"30px",}}>:</string>
                            <div className="col-sm-3">
                               <div className="form-group">
                                <label>Minuto</label>
                                <select className="form-control"
                                value={Minuto}
                                onChange={t=>setMinuto(t.target.value)} 
                                >
                                <option>00</option>
                                <option>01</option>
                                <option>02</option>
                                <option>03</option>
                                <option>04</option>
                                <option>05</option>
                                <option>06</option>
                                <option>07</option>
                                <option>08</option>
                                <option>09</option>
                                <option>10</option>
                                <option>11</option>
                                <option>12</option>
                                <option>13</option>
                                <option>14</option>
                                <option>15</option>
                                <option>16</option>
                                <option>17</option>
                                <option>18</option>
                                <option>19</option>
                                <option>20</option>
                                <option>21</option>
                                <option>22</option>
                                <option>23</option>
                                <option>24</option>
                                <option>25</option>
                                <option>26</option>
                                <option>27</option>
                                <option>28</option>
                                <option>29</option>
                                <option>30</option>
                                <option>31</option>
                                <option>32</option>
                                <option>33</option>
                                <option>34</option>
                                <option>35</option>
                                <option>36</option>
                                <option>37</option>
                                <option>38</option>
                                <option>39</option>
                                <option>40</option>
                                <option>41</option>
                                <option>42</option>
                                <option>43</option>
                                <option>44</option>
                                <option>45</option>
                                <option>46</option>
                                <option>47</option>
                                <option>48</option>
                                <option>49</option>
                                <option>50</option>
                                <option>51</option>
                                <option>52</option>
                                <option>53</option>
                                <option>54</option>
                                <option>55</option>
                                <option>56</option>
                                <option>57</option>
                                <option>58</option>
                                <option>59</option>

                                
                                </select>
                                
                            </div>
                            </div>
                            </div>
                            
                  </address>
                </div>
               
                <div className="col-sm-8 invoice-col">
                  <address>
                  <label for="exampleInputFile">Imagens (Obs. O primeiro Quadro de foto é a da foto de anuncio)</label>
                    <div className="FotosArqui1">
                    <div className="FotoArqui" >
                   
                      <img src={Img1} alt="imagem" className="FotoQua" />
                    
                     

                       {Imgs[0].Foto === "" ?
                        <div class="input-group">
                        <input type="file"
                        accept="image/*"
                        className="Arquivos"
                        onChange={(e)=>ColocarImg1(e)} 
                        />
                      </div>
                       :
                       <div className="row no-print">
                      <div className="col-12">
                     <Butao 
                      style={"btn .btn-sm btn-danger"}
                      titulo={"Excluir"}
                      onClick={()=>ExcImg1()}
                      />  
                      </div>
                      </div>

                       } 
                      
                      

                      </div>
                    <div className="FotoArqui" >
                    <img src={Img2} alt="imagem" className="FotoQua" />

                    {Imgs[1].Foto === "" ? 
                      <div class="input-group">
                        <input type="file"
                         accept="image/*"
                        className="Arquivos"
                        onChange={(e)=>ColocarImg2(e)} 
                        />
                      </div>
                      :
                       <div className="row no-print">
                      <div className="col-12">
                     <Butao 
                      style={"btn .btn-sm btn-danger"}
                      titulo={"Excluir"}
                      onClick={()=>ExcImg2()}
                      />  
                      </div>
                      </div>

                       } 

                      </div>
                      <div className="FotoArqui" >
                      <img src={Img3} alt="imagem" className="FotoQua" />

                      {Imgs[2].Foto === "" ?  
                      <div class="input-group">
                        <input type="file"
                         accept="image/*"
                        className="Arquivos"
                        onChange={(e)=>ColocarImg3(e)} 
                        />
                      </div>
                      :
                      <div className="row no-print">
                     <div className="col-12">
                    <Butao 
                     style={"btn .btn-sm btn-danger"}
                     titulo={"Excluir"}
                     onClick={()=>ExcImg3()}
                     />  
                     </div>
                     </div>

                      } 
                      

                      </div>
                      <div className="FotoArqui" >
                      <img src={Img4} alt="imagem" className="FotoQua" />

                      {Imgs[3].Foto === "" ?   
                      <div class="input-group">
                        <input type="file"
                         accept="image/*"
                        className="Arquivos"
                        onChange={(e)=>ColocarImg4(e)} 
                        />
                      </div>
                      :
                      <div className="row no-print">
                     <div className="col-12">
                    <Butao 
                     style={"btn .btn-sm btn-danger"}
                     titulo={"Excluir"}
                     onClick={()=>ExcImg4()}
                     />  
                     </div>
                     </div>

                      } 

                      </div>
                    </div>
                  <br />
                    <strong>Digite a Notícia:</strong><br />
                    <div className="input_cadatro">
                            <textarea 
                               rows={15}
                                type="text" 
                                className="form-control" 
                                placeholder="Digite o Titulo "
                                value={value}
                                onChange={t=>setValue(t.target.value)}
                            
                                />

                            </div> 
                    <br />
                  </address>
             </div>
                
              </div>
              {Dados.grupo.menu.noticias.caixaCriarNoticia.btn_salvar === true &&
              <div className="row no-print">
                <div className="col-12">
                <Butao 
                style={"btn .btn-sm btn-primary"}
                titulo={"Salvar"}
                onClick={()=>criando()}
                />  
                </div>
              </div>
              }
            </div> 
            </div>
            </div>
            </div>
          </section>
  
</div>

            </>
        );
}