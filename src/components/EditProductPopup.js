import {useState} from "react";
import styles from './EditProductPopup.module.css'

export default function EditProductPopup({product, saveDiscount, cancelDiscount}) {
    const [discount, setDiscount] = useState();
    return (
        <>
            <div className={styles.editProductPopup}>
                <div className={styles.editProductPopupContainer}>
                    <h5>
                        {product.name}
                    </h5>
                    <hr/>
                    <div className="form-group">
                        <label className={`form-label`}>Discount Type</label>
                        <select name="" id="" className='form-control form-select'>
                            <option value="%">Percentage (%)</option>
                            <option value="fixed">Fixed</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label className={`form-label`}>Discount</label>
                        <input type="text" className='form-control'
                               defaultValue={product.discount ? product.discount : ''} onChange={e => setDiscount(e.target.value)}/>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-md-6">
                            <button className='btn btn-danger' onClick={cancelDiscount}>Cancel</button>
                        </div>
                        <div className="col-md-6">
                            <button className='btn btn-warning float-end'
                                    onClick={() => saveDiscount(product.product_id, discount)}>Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}