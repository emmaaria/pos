import Image from 'next/image';
import styles from './CustomImage.module.css';
export default function CustomImage({src, circle}) {
    return (
        circle === true ? (
            <div className={styles.unsetImg}>
                <Image
                    src={src}
                    layout="fill"
                    className={`${styles.customImg} ${styles.circle}`}
                    alt="Logo"
                />
            </div>
        ) :  (
            <div className={styles.unsetImg}>
                <Image
                    src={src}
                    layout="fill"
                    className={styles.customImg}
                    alt="Logo"
                />
            </div>
        )
    );
}
