import React, {useState} from 'react';

export default ({type, placeholder, icon, value, onChange, List}) => {

   

    
        return (
                <div className="input-group mb-3">
                        <select class="form-control" value={value} onChange={onChange} >
                        <option > {placeholder} </option>
                        {List.map((item, key)=>(
                            <option key={key}> {item.select} </option>
                            ))}
                    
                                
                     </select>
                        <div className="input-group-append">
                            <div className="input-group-text">
                                <span className={icon} />
                            </div>
                        </div>
                </div>

 
        );
    }