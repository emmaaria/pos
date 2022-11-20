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
                        <a>
                            <i className="fa-solid fa-gauge-high"></i>
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href={`/dashboard`}>
                        <a>
                            <i className="fa-solid fa-chart-simple"></i>
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href={`#`}>
                        <a onClick={(e) => handleShowSalesPopup(e)}>
                            <i className="fa-solid fa-book"></i>
                        </a>
                    </Link>
                </li>
            </ul>
        </>
    )
}