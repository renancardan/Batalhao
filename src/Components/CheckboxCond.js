import { render } from '@testing-library/react';
import React, {useState,  useEffect} from 'react';

function renderLabel(label){
    return label ? (<span>{label}</span>) : null;
}

function Checkbox({label, onChange, res, key , Forms, id, activeChat}){
    const [Checked, setChecked] = useState(res);
    // useEffect(() => {
    //  Mudar();
    //  console.log(Forms); 
    // }, [Forms])
  
    // const Mudar = ()=>{
    //   for(let i in Forms){
    //       if(Forms[i].id === id){
    //           setChecked(true);
    //       }
    //   }
    // }

    function toggle(){
        const newValue = !Checked
        setChecked(newValue);
        if(Checked === true){
            onChange && onChange({id:id, nome:label}, Checked);
        } else {
            onChange && onChange({id:id, nome:label}, Checked);
        }
        
    }

    const checkedClass = Checked ? 'checked' : '';
    const containerClass = `checkboxcond ${checkedClass}`.trim() 

    return (
        <div key={key} className="checkboxcond-container" onClick={toggle}>
            <div className={containerClass}>
            </div>
            {renderLabel(label)}
        </div>
        
    )
}

Checkbox.defaultProps = {
    label: ''
}

export default Checkbox;