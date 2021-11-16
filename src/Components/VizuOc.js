import React from 'react';
import { Link } from 'react-router-dom';
import Butao from './Butao_list';
import DataTime from './DateFormat';
import Header from './Header';
import jsPDF  from 'jspdf';

export default ({Lista, Avisando, Fechar}) => {

  const Salvando = ()=>{
    var doc = new jsPDF({
      "orientation":"l", 
      "unit":"px", 
      "format":"a4",
      "hotfixes":["px_scaling", "fill_close"],
    });
    doc.html(document.querySelector("#dados"), {
      callback: function(pdf){
        pdf.save("mypdf.pdf");
      }
    });
  }

        return (

          <div className="content-wrapper" >
            <Header 
            Titulo={"Lista de  Ocorrências"}
            Avisando={Avisando}
            Fechar={Fechar}
            />
            <div className="row">
              <section className="col-12">
              <div  >

{/* <DatePicker locale='pt-br'  onChange={null} value={date} /> */}

 <div className="card-header">
 
   <h3 className="card-title" style={{ marginBottom: "10px", marginRight: "20px"}}>Lista de Ocorrência  </h3> 
  
   
   
 </div>
   <div class="card-body table-responsive p-0">
   <div className="col-sm-4">
    <div className="form-group" style={{"margin":10}}>
    <Butao 
    style={"btn btn-sm btn-info"}
    titulo={"Salvar Em pdf"}
    onClick={()=>Salvando()}
    />
    </div>
    </div> 
     <img src="assets/logoapp.jpeg" alt="15º Batalhão Logo"  style={{opacity: '1', width: 60, marginRight: 20, marginLeft:20, marginTop:20 }} />
     <table style={{"borderCollapse":"collapse", "border":"1px solid #000", "margin":20, "fontSize":10}} id="dados" >
       <thead style={{"backgroundColor":"yellow"}}>
         <tr >
           <th style={{"borderCollapse":"collapse", "border":"1px solid #000"}} >Nº Copom</th>
           <th style={{"borderCollapse":"collapse", "border":"1px solid #000"}} >Atendente Copom</th>
           <th style={{"borderCollapse":"collapse", "border":"1px solid #000"}} >VTR</th>
           <th style={{"borderCollapse":"collapse", "border":"1px solid #000"}} >Componentes VTR</th>
           <th style={{"borderCollapse":"collapse", "border":"1px solid #000"}} >Data</th>
           <th style={{"borderCollapse":"collapse", "border":"1px solid #000"}} >Período</th>
           <th style={{"borderCollapse":"collapse", "border":"1px solid #000"}} >Rua</th>
           <th style={{"borderCollapse":"collapse", "border":"1px solid #000"}} >Nº</th>
           <th style={{"borderCollapse":"collapse", "border":"1px solid #000"}} >Bairro</th>
           <th style={{"borderCollapse":"collapse", "border":"1px solid #000"}} >Ocorrência</th>
           <th style={{"borderCollapse":"collapse", "border":"1px solid #000"}} >Resultado</th>
          
         </tr>
       </thead>
      
       <tbody >
       {Lista.map((item, key)=>(

              

               
               <tr key={item.id}  >
               <td style={{"borderCollapse":"collapse", "border":"1px solid #000"}} >
               {item.oCorr}
                </td>

                 <td style={{"borderCollapse":"collapse", "border":"1px solid #000"}}>
                 {item.atendenteCopom} 
                 </td>

                 <td style={{"borderCollapse":"collapse", "border":"1px solid #000"}}>
                 {item.vtr}
                 </td>

                 <td style={{"borderCollapse":"collapse", "border":"1px solid #000"}}>
                 {item.componentesVtr}
                 </td>

                 <td style={{"borderCollapse":"collapse", "border":"1px solid #000"}}>
                 <DataTime 
                  DateIni={item.date}
                  />
                 </td >

                 <td style={{"borderCollapse":"collapse", "border":"1px solid #000"}}>
                 {item.periodo}
                 </td>

                 <td style={{"borderCollapse":"collapse", "border":"1px solid #000"}}>
                 {item.rua}
                 </td>

                 <td style={{"borderCollapse":"collapse", "border":"1px solid #000"}}>
                 {item.numero}
                 </td>

                 <td style={{"borderCollapse":"collapse", "border":"1px solid #000"}}>
                 {item.bairro}
                 </td>


                 <td style={{"borderCollapse":"collapse", "border":"1px solid #000"}}>
                 {item.condi.map((item, key)=>(
                   <>
                   <sting>{item.nome}/</sting><br/>
                   </>
                 ))}
                 </td>

                 <td style={{"borderCollapse":"collapse", "border":"1px solid #000"}}>
                 {item.resultado}
                 </td>
             </tr>
            
        ))}
           </tbody> 
     
       
       
     </table>
      
    </div>
   </div>
              </section>
                </div>
                
          </div>
                
          
        
        );
    }