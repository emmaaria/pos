import Link from "next/link";
import {useState} from "react";
import PosSaleListPopup from "./PosSaleListPopup";

export default function PosMenu({token}) {
    const [showSales, setShowSales] = useState(false)
    const handleShowSalesPopup = (e) => {
        e.preventDefault()
        setShowSales(true)
    }
    return (
        <>
            {
                showSales && (
                    <PosSaleListPopup token={token} setShowSales={setShowSales}/>
                )
            }
            <ul className="pos-icon-list flex-grow-1">
                <li>
                    <Link href={`/dashboard`}>
                        <i className="fa-solid fa-gauge-high"></i>
                    </Link>
                </li>
                <li>
                    <Link href={`/dashboard`}>
                        <i className="fa-solid fa-chart-simple"></i>
                    </Link>
                </li>
                <li>
                    <Link href={`#`} onClick={(e) => handleShowSalesPopup(e)}>
                        <i className="fa-solid fa-book"></i>
                    </Link>
                </li>
            </ul>
        </>
    )
}