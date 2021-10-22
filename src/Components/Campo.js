import React from 'react';
import InputMask from "react-input-mask";

export default ({type, placeholder, icon, value, onChange, mask}) => {

    
        return (
                <div className="input-group mb-3">
                     <InputMask mask={mask} type={type} className="form-control"  placeholder={placeholder} value={value} onChange={onChange} />
                        <div className="input-group-append">
                            <div className="input-group-text">
                                <span className={icon} />
                            </div>
                        </div>
                </div>

 
        );
    }

