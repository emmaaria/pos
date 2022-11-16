export default function PosPaymentModal({hidePayment, calculateDue, addMoney, grandTotal, discountAmount, paid, handleForm}) {
    return (
        <div className="payment-modal">
            <div className="payment-modal-container">
                <div className="close">
                    <span className='fa-solid fa-close' onClick={hidePayment}></span>
                </div>
                <div className="title">
                    Payment
                </div>
                <hr/>
                <div className="row gx-5">
                    <div className="col-md-8">
                        <div className="mb-3 mt-3">
                            <textarea id="note" rows="3" className={`note form-control`} placeholder='Note'/>
                        </div>
                        <div className="form-group mb-3">
                            <label className={`form-label`}>
                                Cash
                            </label>
                            <input type="text" className={`form-control paid cash`}
                                   onKeyUp={calculateDue}
                                   onKeyDown={calculateDue} onChange={calculateDue}/>
                        </div>
                        <div className="form-group mb-3">
                            <label className={`form-label`}>
                                Bkash
                            </label>
                            <input type="text" className={`form-control paid bkash`}
                                   onKeyUp={calculateDue}
                                   onKeyDown={calculateDue} onChange={calculateDue}/>
                        </div>
                        <div className="form-group mb-3">
                            <label className={`form-label`}>
                                Nagad
                            </label>
                            <input type="text" className={`form-control paid nagad`}
                                   onKeyUp={calculateDue}
                                   onKeyDown={calculateDue} onChange={calculateDue}/>
                        </div>
                        <div className="form-group mb-3">
                            <label className={`form-label`}>
                                Card
                            </label>
                            <input type="text" className={`form-control paid card`}
                                   onKeyUp={calculateDue}
                                   onKeyDown={calculateDue} onChange={calculateDue}/>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="notes">
                            Notes
                        </div>
                        <ul className='note-list'>
                            <li onClick={() => addMoney(50)}>
                                50
                            </li>
                            <li onClick={() => addMoney(100)}>
                                100
                            </li>
                            <li onClick={() => addMoney(200)}>
                                200
                            </li>
                            <li onClick={() => addMoney(500)}>
                                500
                            </li>
                            <li onClick={() => addMoney(1000)}>
                                1000
                            </li>
                        </ul>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-md-6">
                        Total : {grandTotal - discountAmount} Tk.
                    </div>
                    <div className="col-md-6">
                        Change/Due : {Math.abs((grandTotal - discountAmount) - paid)} Tk.
                    </div>
                </div>
                <button className={`btn btn-success mt-3 float-end`} onClick={handleForm}>Save</button>
            </div>
        </div>
    )
}