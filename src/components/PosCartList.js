import $ from 'jquery'

export default function PosCartList({invoiceProducts, calculateSubtotal, removeProduct, discountType}) {
    const handleQty = (row, type) => {
        const oldVal = parseFloat($(`.productQuantity_${row}`).val())
        if (type === 'inc') {
            $(`.productQuantity_${row}`).val(oldVal + 1)
            calculateSubtotal(row)
        } else {
            if (oldVal > 0) {
                $(`.productQuantity_${row}`).val(oldVal - 1)
                calculateSubtotal(row)
            }
        }
    }
    const handleDiscount = (product) => {
        const disType = $(`.product_discount_type_${product}`).val()
        const discount = parseFloat($(`.product_discount_${product}`).val())
        const price = parseFloat($(`.productPrice_${product}`).val())
        const qty = parseFloat($(`.productQuantity_${product}`).val())
        if (disType === '%') {
            const total = price * qty
            let discountAmount = (total * discount) / 100
            if (isNaN(discountAmount)){
                discountAmount = 0
                $(`.productDiscountedAmount_${product}`).val(discountAmount)
            }else {
                $(`.productDiscountedAmount_${product}`).val(discountAmount)
            }
        }else {
            let discountAmount = discount
            
            if (isNaN(discountAmount)){
                discountAmount = 0
                $(`.productDiscountedAmount_${product}`).val(discountAmount)
            }else {
                $(`.productDiscountedAmount_${product}`).val(discountAmount)
            }
        }
        calculateSubtotal(product)
    }
    return (
        <div className={`product-table ${discountType == 'product' ? 'product-wise-discount' : 'invoice-wise-discount'}`}>
            <table className={`table`}>
                <thead>
                {
                    discountType !== 'product' && (
                        <tr>
                            <th width={`5%`}>
                                SL
                            </th>
                            <th width={`30%`}>
                                Product
                            </th>
                            <th width={`15%`}>
                                Price
                            </th>
                            <th width={`25%`} className={`text-center`}>
                                Qty
                            </th>
                            <th className={`text-end`} width={`20%`}>
                                Subtotal
                            </th>
                            <th className={`text-center`} width={`5%`}>
                                Action
                            </th>
                        </tr>
                    ) || (
                        <tr>
                            <th width={`5%`}>
                                SL
                            </th>
                            <th width={`20%`}>
                                Product
                            </th>
                            <th width={`10%`}>
                                Price
                            </th>
                            <th width={`17%`} className={`text-center`}>
                                Qty
                            </th>
                            <th width={`15%`}>
                                Dis. Type
                            </th>
                            <th width={`15%`}>
                                Discount
                            </th>
                            <th className={`text-end`} width={`13%`}>
                                Subtotal
                            </th>
                            <th className={`text-center`} width={`5%`}>
                                Action
                            </th>
                        </tr>
                    )
                }

                </thead>
                <tbody className={`border-bottom border-1 border-white`}>
                {
                    invoiceProducts && invoiceProducts.length <= 0 && (
                        <tr>
                            <td colSpan={8} className={`text-center`}>
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
                                <div className="product-qty-container">
                                    <div className="product-decrement qty-control">
                                        <button className={`btn btn-danger`}
                                                onClick={() => handleQty(el.product_id, 'dec')}>
                                            <i className="fa-solid fa-minus"></i>
                                        </button>
                                    </div>
                                    <div className="product-qty-field">
                                        <input type="text"
                                               className={`form-control productQuantity productQuantity_${el.product_id} border-radius-0`}
                                               defaultValue={el.quantity ? el.quantity : 1}
                                               onChange={() => calculateSubtotal(el.product_id)}
                                               onKeyUp={() => calculateSubtotal(el.product_id)}
                                               onKeyDown={() => calculateSubtotal(el.product_id)}/>
                                    </div>
                                    <div className="product-increment qty-control">
                                        <button className={`btn btn-warning`}
                                                onClick={() => handleQty(el.product_id, 'inc')}>
                                            <i className="fa-solid fa-plus"></i>
                                        </button>
                                    </div>
                                </div>
                            </td>
                            {
                                discountType === 'product' && (
                                    <>
                                        <td>
                                            <select
                                                className={`form-select form-control product_discount_type product_discount_type_${el.product_id}`} onChange={()=> handleDiscount(el.product_id)} defaultValue={el.discount_type}>
                                                <option value="%">%</option>
                                                <option value="fixed">Fixed</option>
                                            </select>
                                        </td>
                                        <td>
                                            <input type="text" onChange={()=> handleDiscount(el.product_id)} onKeyDown={()=> handleDiscount(el.product_id)} onKeyUp={()=> handleDiscount(el.product_id)}
                                                   className={`form-control product_discount product_discount_${el.product_id}`} defaultValue={el.discount}/>
                                        </td>
                                    </>
                                )
                            }
                            <td className={`text-end`}>
                                <input type="hidden"
                                       className={`form-control productDiscountedAmount productDiscountedAmount_${el.product_id}`} defaultValue={el.discount_amount}/>
                                                                <span className={`subtotal subtotal_${el.product_id}`}>
                                                                    {el.quantity ? el.quantity * el.price : el.price}
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