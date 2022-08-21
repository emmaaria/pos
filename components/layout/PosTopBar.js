import styles from './PosTopBar.module.scss';
export default function PosTopBar({title}) {
    return(
        <div className={styles.topBar}>
            <div className={styles.logoBox}/>
            <h4 className={styles.pageTitle}>
                {title}
            </h4>
        </div>
    )
}