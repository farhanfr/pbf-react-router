import React from 'react';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom';
import CategoriesDetail from './CategoriesDetail';


const dataCategory = [
    {
        "id": 1,
        "name": "Pupuk"
    },
    {
        "id": 2,
        "name": "Alat Petani"
    },
    {
        "id": 3,
        "name": "Kumpulan Benih"
    }
]

const Categories = () => {
    let { path, url } = useRouteMatch();
    return (
        <>
            <h2>Category Produk Marketplace Tani</h2>
            <ul>
                {
                    dataCategory.map((data) => {
                        return (
                            <li>
                                <Link to={`${url}/${data.name}/${data.id}`}>{data.name}</Link>
                            </li>
                        )
                    })
                }
            </ul>

            <Switch>
                <Route path={`${path}/:categoryName/:categoryId`}>
                    <CategoriesDetail />
                </Route>
            </Switch>
        </>
    )
}

export default Categories