import React from 'react';



export default ({limit, total, offset, setOffset}) => {

    const MAX_ITENS = 9;
    const MAX_LEFT = (MAX_ITENS - 1) /2;
    const current = offset ? (offset/limit) + 1 : 1;
    const pages = Math.ceil(total / limit);
    const first = Math.max(current - MAX_LEFT, 1);

    function onPageChange(pages) {
        setOffset((pages - 1) * limit);
    }

        return (
            <div>
                <ul class="pagination justify-content-center">
                    <li class={current === 1 ? "page-item disabled": "page-item"}
                    onClick={() => onPageChange(current -1) }
                    ><a class="page-link" >Anterior</a></li>
                    {Array.from({ length: Math.min(MAX_ITENS, pages)  })
                    .map((_, index) => index + first)
                    .map((pages)=> (
                        <li key={pages} class={pages === current ? "page-item active": "page-item" }
                        onClick={() => onPageChange(pages) } style={{ cursor: 'pointer'}}
                            ><a class="page-link" >{pages}</a></li>
                    ))} 
                     <li class={current === pages ? "page-item disabled": "page-item"}
                    onClick={() => onPageChange(current + 1) }
                    ><a class="page-link"  >Próximo</a></li>
                </ul>
            </div>
        );

}