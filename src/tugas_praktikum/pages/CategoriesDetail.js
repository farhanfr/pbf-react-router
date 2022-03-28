import React from 'react';
import { useParams } from 'react-router-dom';


const CategoriesDetail = () =>{
    let { categoryId,categoryName } = useParams();
    return(
        <>
            <h5>Anda sekarang berada di kategori : {categoryName}</h5>
        </>
    )
}

export default CategoriesDetail