export default function PosCartList({invoiceProducts, calculateSubtotal, removeProduct}) {
    return (
        <div className="product-table">
            <table className={`table`}>
                <thead>
                <tr>
                    <th width={`5%`}>
                        SL
                    </th>
                    <th width={`35%`}>
                        Product
                    </th>
                    <th width={`15%`}>
                        Price
                    </th>
                    <th width={`15%`}>
                        Qty
                    </th>
                    <th className={`text-end`} width={`20%`}>
                        Subtotal
                    </th>
                    <th className={`text-center`} width={`10%`}>
                        Action
                    </th>
                </tr>
                </thead>
                <tbody className={`border-bottom border-1 border-white`}>
                {
                    invoiceProducts && invoiceProducts.length <= 0 && (
                        <tr>
                            <td colSpan={6} className={`text-center`}>
                                No product added
                            </td>
                        </tr>
                    )
                }
                {
                    invoiceProducts.map((el, index) => (
                        <tr key={`purchase-product-item-${el.product_id}`}>
                            <td>
                                {index + 1}
                            </td>
                            <td className={`bold`}>
                                {el.name}
                                <input type="hidden" className={`productId`}
                                       defaultValue={el.product_id}/>
                            </td>
                            <td>
                                {el.price} Tk.
                                <input type="hidden"
                                       className={`form-control productPrice productPrice_${el.product_id}`}
                                       defaultValue={el.price}/>
                            </td>
                            <td>
                                <div className="product-qry-container">

                                </div>
                                <input type="text"
                                       className={`form-control productQuantity productQuantity_${el.product_id}`}
                                       defaultValue={1}
                                       onChange={() => calculateSubtotal(el.product_id)}
                                       onKeyUp={() => calculateSubtotal(el.product_id)}
                                       onKeyDown={() => calculateSubtotal(el.product_id)}/>
                            </td>
                            <td className={`text-end`}>
                                                                <span className={`subtotal subtotal_${el.product_id}`}>
                                                                    {el.price}
                                                                </span> Tk.
                            </td>
                            <td className={`text-center`}>
                                <button
                                    className={`btn btn-danger btn-sm`}
                                    onClick={() => removeProduct(el.product_id)}>
                                    <i className="fa-solid fa-trash-can"/>
                                </button>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    )
}