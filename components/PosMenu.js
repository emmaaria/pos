import Link from "next/link";

export default function PosMenu(){
    return (
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
                <Link href={`/dashboard`}>
                    <a>
                        <i className="fa-solid fa-book"></i>
                    </a>
                </Link>
            </li>
        </ul>
    )
}