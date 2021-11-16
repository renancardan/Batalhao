import React, {useState, useEffect} from 'react';
import Api from '../../Api';
import Butao from '../../Components/Butao_list';
import Campo from '../../Components/Campo';
import Header from '../../Components/Header';
import { ReactTrixRTEInput, ReactTrixRTEToolbar } from "react-trix-rte";
import { DatePicker, DatePickerInput } from 'rc-datepicker';
import Modal from 'react-awesome-modal';
import { Spinner  } from "react-awesome-spinners";
import Trix from "trix";



export default ({Dados, Avisando, Fechar, Id, setAlert, setAlertTipo, MsgDesativar}) => {
const [Infor, setInfor] = useState("nulo");
const [Nome, setNome] = useState("");
const [Titulo, setTitulo] = useState("Criar Notícia");
const [TituNoti, setTituNoti] = useState("");
const [TituAnun, setTituAnun] = useState("");
const [value, setValue] = useState("");
const [Data, setData] = useState(new Date());
const [Hora, setHora] = useState("00");
const [Minuto, setMinuto] = useState("00");
const [DiaMesAno, setDiaMesAno] = useState("");
const [Visi1, setVisi1] = useState(false);

const [Img1, setImg1] = useState("../assets/avatarimg.png");
const [Img2, setImg2] = useState("../assets/avatarimg.png");
const [Img3, setImg3] = useState("../assets/avatarimg.png");
const [Img4, setImg4] = useState("../assets/avatarimg.png");
const [Imgs, setImgs] = useState([{Foto:""}, {Foto:""}, {Foto:""}, {Foto:""}]);




 useEffect(() => {
   if(Hora !== "00" || Minuto !== "00"){
    MudaDate();
   }
   if(DiaMesAno === ""){
  ColoqHora()
    } 

 }, [Hora, Minuto])


 useEffect(() => {
   console.log(Data)
 }, [Data])


 useEffect(() => {
  Vizualizar();
  }, []);
 
  useEffect(() => {
    if(Infor !== "nulo"){
      setTituNoti(Infor.Titulo);
      setTituAnun(Infor.TituloAnun);
      setData(Infor.dataDanoti);
      setValue(Infor.body);
      let hours = new Date(Infor.dataDanoti).getHours();
      hours = hours < 10 ? '0'+hours : hours;
      setHora(hours);
      let minutes = new Date(Infor.dataDanoti).getMinutes();
      minutes = minutes < 10 ? '0'+minutes : minutes;
      setMinuto(minutes);
      if(Infor.foto1 !== ""){
        setImg1(Infor.foto1);
        Imgs[0].Foto = Infor.foto1;
        
      }
      if(Infor.foto2 !== ""){
        setImg2(Infor.foto2);
        Imgs[1].Foto = Infor.foto2;
      }
      if(Infor.foto3 !== ""){
        setImg3(Infor.foto3);
        Imgs[2].Foto = Infor.foto3;
      }
      if(Infor.foto4 !== ""){
        setImg4(Infor.foto4);
        Imgs[3].Foto = Infor.foto4;
      }
    }
   
    
    }, [Infor]);
 
  
   
    const Editando = ()=>{
  
      if (navigator.onLine) {
                
        Api.EditandoNoti(Dados, Id, Data, value, TituNoti, TituAnun , setAlertTipo, setAlert, Imgs, setVisi1);
 
       
      } else {
        setAlert("Sem Internet");
        setAlertTipo("danger");
      }
    
  }
  
  
 
  
  
   const Vizualizar = async ()=>{
     
     if (navigator.onLine) {
       
       await Api.VizualizandoNoti(Id, Dados, setInfor);
       
      } else {
        setAlert("Sem Internet");
        setAlertTipo("danger");
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
    if(DiaMesAno !== ""){
    let mid = new Date(DiaMesAno+"T"+Hora+":"+Minuto+":00.000").getTime();
    setData(mid);
    } 
    
  }
  const ColocarImg1 = (e)=>{
    const reader = new FileReader()
    reader.onload = () => {
      if(reader.readyState === 2) {
        setImg1(reader.result);
      }
    }
   reader.readAsDataURL(e.target.files[0]);
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

  const ColoqHora = async(t)=>{
     
    let current = '';
    let now =new Date(Data);
    let Dia = now.getDate();
    let Mes = (now.getMonth()+1);
    let Ano = now.getFullYear();
    Dia = Dia < 10 ? '0'+Dia : Dia;
    Mes = Mes < 10 ? '0'+Mes : Mes;
    current = Ano+'-'+Mes+'-'+Dia;
    let variac = new Date(current +"T"+Hora+":"+Minuto+":00.000").getTime();
    console.log(variac);;
    setData(variac);
  }
  

        return (
            <>
<div className="content-wrapper">
                <Header 
                Titulo={Titulo}
                Avisando={Avisando}
                Fechar={Fechar}
                />
                  <Modal visible={Visi1} width="500" height="100" effect="fadeInUp" onClickAway={null}>
                <div className="row">
                  <div className="col-12">
                    <h4>
                      Espere Um momento está sendo enviado a Atualização!
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
                                onChange={(t)=>setHora(t.target.value)} 
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
                  <label for="exampleInputFile">Imagens</label>
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
                      <> 
                        {Dados.grupo.menu.noticias.editarNoticia.btn_escolherArquivo === true && 
                      <div class="input-group">
                        <input type="file"
                         accept="image/*"
                        className="Arquivos"
                        onChange={(e)=>ColocarImg4(e)} 
                        />
                      </div>
                        }
                      </>
                      :
                      <div className="row no-print">
                      {Dados.grupo.menu.noticias.editarNoticia.btn_excluir === true && 
                     <div className="col-12">
                    <Butao 
                     style={"btn .btn-sm btn-danger"}
                     titulo={"Excluir"}
                     onClick={()=>ExcImg4()}
                     />  
                     </div>
                      }
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
              {Dados.grupo.menu.noticias.editarNoticia.btn_salvar === true &&
              <div className="row no-print">
                <div className="col-12">
                <Butao 
                style={"btn .btn-sm btn-primary"}
                titulo={"Salvar"}
                onClick={()=>Editando()}
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