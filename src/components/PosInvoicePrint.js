import {useReactToPrint} from 'react-to-print';
import React, {useRef} from "react";

export default function PosInvoicePrint({companyName, companyAddress, companyMobile, invoice, closeInvoice}) {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    return (
        <>
            <div className={`invoiceModal`} ref={componentRef}>
                <div className="invoiceModalContainer">
                    <div className="invoiceHeader text-center">
                        <h3>{companyName}</h3>
                        <p>
                            {companyAddress}
                        </p>
                        <p>
                            Mobile: {companyMobile}
                        </p>
                        <p style={{
                            textAlign: 'left',
                            borderTop: '1px solid #000',
                            marginBottom: 0,
                            marginTop: '10px',
                            paddingTop: '5px'
                        }}>Customer: {invoice.customer_name}</p>
                        <div className="invoiceRow">
                            <p className={`date`}>Date: {invoice.date}</p>
                            <p className={`invNum`}>Invoice: {invoice.invoice_id}</p>
                        </div>
                    </div>
                    <div className="product-table">
                        <table className={`table`}>
                            <thead>
                            <tr>
                                <th width={`40%`}>
                                    Product
                                </th>
                                <th width={`25%`}>
                                    Price
                                </th>
                                <th width={`10%`}>
                                    Qty
                                </th>
                                <th className={`text-end`} width={`25%`}>
                                    Subtotal
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                invoice.items.map((item) => (
                                    <React.Fragment key={item.name}>
                                        <tr key={item.name}>
                                            <td>{item.name}</td>
                                            <td>{item.price} Tk.</td>
                                            <td style={{textAlign: 'center'}}>{item.quantity}</td>
                                            <td style={{textAlign: 'right'}}>{item.total} Tk.</td>
                                        </tr>
                                        <tr>
                                            <td className={`p-0`} colSpan={4}></td>
                                        </tr>
                                    </React.Fragment>
                                ))
                            }
                            </tbody>
                            <tfoot>
                            <tr style={{textAlign: 'right'}}>
                                <td colSpan={4}>Subtotal : {invoice.subtotal} Tk.</td>
                            </tr>
                            {
                                invoice.discountAmount > 0 && (
                                    <>
                                        <tr>
                                            <td className={`p-0`} colSpan={4}></td>
                                        </tr>
                                        <tr style={{textAlign: 'right'}}>
                                            <td colSpan={4}>Discounted Amount : {invoice.discountAmount} Tk.</td>
                                        </tr>
                                        <tr>
                                            <td className={`p-0`} colSpan={4}></td>
                                        </tr>
                                    </>
                                )
                            }
                            <tr style={{textAlign: 'right'}}>
                                <td colSpan={4}><strong>Grand Total : {invoice.grandTotal} Tk.</strong></td>
                            </tr>
                            <tr style={{textAlign: 'right'}}>
                                <td colSpan={4}><strong>Paid : {invoice.paid} Tk.</strong></td>
                            </tr>
                            <tr>
                                <td className={`p-0`} colSpan={4}></td>
                            </tr>
                            <tr style={{textAlign: 'right'}}>
                                {
                                    (invoice.due < 0 || invoice.due === 0) && (
                                        <td colSpan={4}>Change : {Math.abs(invoice.due).toFixed(2)} Tk.</td>
                                    ) || (
                                        <td colSpan={4}>Due : {parseFloat(invoice.due).toFixed(2)} Tk.</td>
                                    )
                                }
                            </tr>
                            </tfoot>
                        </table>
                        <table style={{width: '100%', display: 'block'}} className={`no-print`}>
                            <tfoot style={{width: '100%', display: 'block'}}>
                            <tr style={{width: '100%', display: 'block', textAlign: 'center', borderBottom: 'none'}}>
                                <td style={{textAlign: 'center', display: 'inline-block'}}>
                                    <button style={{
                                        background: '#e84118',
                                        border: 'none',
                                        color: '#ffffff',
                                        fontSize: '15px',
                                        padding: '5px 12px',
                                        borderRadius: '5px',
                                        marginRight: '10px'
                                    }} onClick={closeInvoice}>Close
                                    </button>
                                </td>
                                <td style={{textAlign: 'center', display: 'inline-block'}}>
                                    <button style={{
                                        background: '#009432',
                                        border: 'none',
                                        color: '#ffffff',
                                        fontSize: '15px',
                                        padding: '5px 12px',
                                        borderRadius: '5px',
                                        marginRight: '10px'
                                    }} onClick={handlePrint}>
                                        Print
                                    </button>
                                </td>
                            </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}