import styles from './TopBar.module.scss';
export default function TopBar({title}) {
    return(
        <div className={styles.topBar}>
            <div className={styles.logoBox}/>
            <h4 className={styles.pageTitle}>
                {title}
            </h4>
        </div>
    )
}