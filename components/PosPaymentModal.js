import {useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";

export default function PosPaymentModal({
                                            hidePayment,
                                            calculateDue,
                                            addMoney,
                                            grandTotal,
                                            discountAmount,
                                            paid,
                                            handleForm,
                                            token
                                        }) {
    const [banks, setBanks] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState('cash');
    const headers = {
        headers: {Authorization: `Bearer ${token}`},
    };
    const handlePaymentMethod = (event) => {
        if (event.target.value === 'bank' || event.target.value === 'multiple') {
            axios.get(
                `${process.env.API_URL}/bank?allData=true`,
                headers
            ).then(res => {
                if (res.data.status === true) {
                    setBanks(res.data.banks);
                    calculateDue();
                } else {
                    toast.error('No bank account fround. Please add bank first.', {
                        position: "bottom-right",
                        autoClose: false,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        theme: 'dark',
                    });
                }
            }).catch(err => {
                console.log(err);
            });
        }
        setPaymentMethod(event.target.value)
    }
    return (
        <div className="payment-modal">
            <div className="payment-modal-container">
                <div className="close">
                    <span className='fa-solid fa-close' onClick={hidePayment}></span>
                </div>
                <div className="title">
                    Make Payment
                </div>
                <hr/>
                <div className="row gx-5">
                    <div className="col-md-8">
                        <div className="form-group mb-3">
                            <label className={`form-label`}>
                                Payment Method
                            </label>
                            <select className={`paymentMethod form-control form-select`}
                                    value={paymentMethod} onChange={handlePaymentMethod}>
                                <option value="cash">Cash</option>
                                <option value="bank">Bank</option>
                                <option value="bkash">Bkash</option>
                                <option value="nagad">Nagad</option>
                                <option value="card">Card</option>
                                <option value="multiple">Multiple</option>
                            </select>
                        </div>
                        {
                            paymentMethod === 'cash' && (
                                <div className="form-group mb-3">
                                    <label className={`form-label`}>
                                        Cash
                                    </label>
                                    <input type="text" className={`form-control paid cash`}
                                           onKeyUp={calculateDue}
                                           onKeyDown={calculateDue} onChange={calculateDue}/>
                                </div>
                            )
                        }
                        {
                            paymentMethod === 'bkash' && (
                                <div className="form-group mb-3">
                                    <label className={`form-label`}>
                                        Bkash
                                    </label>
                                    <input type="text" className={`form-control paid bkash`}
                                           onKeyUp={calculateDue}
                                           onKeyDown={calculateDue} onChange={calculateDue}/>
                                </div>
                            )
                        }
                        {
                            paymentMethod === 'nagad' && (
                                < div className="form-group mb-3">
                                    <label className={`form-label`}>
                                        Nagad
                                    </label>
                                    <input type="text" className={`form-control paid nagad`}
                                           onKeyUp={calculateDue}
                                           onKeyDown={calculateDue} onChange={calculateDue}/>
                                </div>
                            )
                        }
                        {
                            paymentMethod === 'card' && (
                                <div className="form-group mb-3">
                                    <label className={`form-label`}>
                                        Card
                                    </label>
                                    <input type="text" className={`form-control paid card`}
                                           onKeyUp={calculateDue}
                                           onKeyDown={calculateDue} onChange={calculateDue}/>
                                </div>
                            )
                        }
                        {
                            paymentMethod === 'bank' && banks && banks.length > 0 && (
                                <>
                                    <div className="form-group mb-3">
                                        <label className={`form-label`}>
                                            Bank
                                        </label>
                                        <select className={`form-control form-select bankId`} required>
                                            <option value="">Select Bank</option>
                                            {
                                                banks.map(bank => (
                                                    <option key={bank.id} value={bank.id}>
                                                        {bank.name} ({bank.account_no})
                                                    </option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label className={`form-label`}>
                                            Bank Paid Amount
                                        </label>
                                        <input type="text" className={`form-control paid bank`}
                                               onKeyUp={calculateDue}
                                               onKeyDown={calculateDue} onChange={calculateDue}/>
                                    </div>
                                </>
                            )
                        }
                        <div className="mb-3 mt-3">
                            <textarea id="note" rows="3" className={`note form-control`} placeholder='Note'/>
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