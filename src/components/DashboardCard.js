import styles from "./DashboardCard.module.css"
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";

export default function DashboardCard({icon, title, value, bgColor}) {
    return (
        <div className={styles.cardContainer} style={{background: bgColor ? bgColor : "rgb(249, 58, 11)"}}>
            <div className="d-flex align-items-center">
                <div className={styles.icon}>
                    <i className={icon}></i>
                </div>
                <div className={styles.content}>
                    <p className={styles.title}>{title}</p>
                    {
                        value && (
                            <p className={styles.number}>{value}</p>
                        ) || (
                            <SkeletonTheme baseColor="rgba(255,255,255,0.1)" highlightColor="#dddddd">
                                <Skeleton width={`100%`} height={30}/>
                            </SkeletonTheme>
                        )
                    }
                </div>
            </div>
        </div>
    )
}