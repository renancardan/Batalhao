import React from 'react';
import { Link } from 'react-router-dom';


export default ({Linkto, Icon,  Titulo,  Notificacao, NotiEstilo,  ValorNoti}) => {

        return (
                
            <li className="nav-item">
            <Link to={Linkto}  className="nav-link">
              <i className={Icon} />
              <p>
                {Titulo}
                {Notificacao === true &&
                 <span className="right badge badge-danger">{ValorNoti}</span>
                }
                
              </p>
            </Link>
          </li>
 
        );
    }