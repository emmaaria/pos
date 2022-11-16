import {useEffect, useState} from "react";
import axios from "axios";

export default function PosProducts({token, addProduct}){
    const [staticProducts, setStaticProducts] = useState()
    const headers = {
        headers: {Authorization: `Bearer ${token}`},
    }
    useEffect(() => {
        axios.get(
            `${process.env.API_URL}/products-with-stock`,
            headers
        ).then(res => {
            if (res.data.status === true) {
                setStaticProducts(res.data.products)
            }
        }).catch(err => {
            console.log(err)
        })
    }, [])
    return (
        <div className="products-wrapper">
            <div className="product-grid">
                {
                    staticProducts && (
                        staticProducts.map(pr => (
                            <div className={`product-item`} key={pr.product_id}
                                 onClick={() => addProduct(pr)}>
                                <p className={`name`}>{pr.name}</p>
                                <p>Price: {pr.price} Tk.</p>
                                <p>Stock: {pr.purchase - pr.sell}</p>
                            </div>
                        ))
                    )
                }
            </div>
        </div>
    )
}