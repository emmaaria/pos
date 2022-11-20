import {useReactToPrint} from 'react-to-print';
import {useRef} from "react";

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
                        <div className="invoiceRow">
                            <p className={`date`}>Date: 2022-15-22</p>
                            <p className={`invNum`}>Invoice: 10002</p>
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
                                    <>
                                        <tr key={item.product_id}>
                                            <td>{item.name}</td>
                                            <td>{item.price}00 Tk.</td>
                                            <td style={{textAlign: 'center'}}>{item.quantity}</td>
                                            <td style={{textAlign: 'right'}}>{item.total} Tk.</td>
                                        </tr>
                                        <tr>
                                            <td className={`p-0`} colSpan={4}></td>
                                        </tr>
                                    </>
                                ))
                            }
                            </tbody>
                            <tfoot>
                            <tr style={{textAlign: 'right'}}>
                                <td colSpan={4}>Subtotal : {invoice.subtotal} Tk.</td>
                            </tr>
                            {
                                invoice.discount && (
                                    <>
                                        <tr style={{textAlign: 'right'}}>
                                            {
                                                invoice.discountType === '%' && (
                                                    <td colSpan={4}>Discount : {invoice.discount}%</td>
                                                ) || (
                                                    <td colSpan={4}>Discount : {invoice.discount} Tk.</td>
                                                )
                                            }
                                        </tr>
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
                            <tr>
                                <td className={`p-0`} colSpan={4}></td>
                            </tr>
                            <tr style={{textAlign: 'right'}}>
                                {
                                    invoice.due < 0 && (
                                        <td colSpan={4}>Change : {Math.abs(invoice.due)} Tk.</td>
                                    ) || (
                                        <td colSpan={4}>Due : {invoice.due} Tk.</td>
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