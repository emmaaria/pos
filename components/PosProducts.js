import Skeleton, {SkeletonTheme} from "react-loading-skeleton";

export default function PosProducts({addProduct, staticProducts, searchText}) {
    return (
        <div className="products-wrapper">
            <div className="product-grid">
                {
                    staticProducts && (
                        staticProducts.filter((item) => {
                            return searchText.toLowerCase() === '' ? item : item.name.toLowerCase().includes(searchText) || item.product_id.includes(searchText)
                        }).map(pr => (
                            <div className={`product-item`} key={pr.product_id}
                                 onClick={() => addProduct(pr)}>
                                <p className={`name`}>{pr.name}</p>
                                <p>Price: {pr.price} Tk.</p>
                                <p>Stock: {pr.purchase - pr.sale}</p>
                            </div>
                        ))
                    ) || (
                        <>
                            <div className={`product-item`}>
                                <SkeletonTheme baseColor="rgba(249, 58, 11, 0.1)" highlightColor="#dddddd">
                                    <Skeleton width={`100px`} height={60}/>
                                </SkeletonTheme>
                            </div>
                            <div className={`product-item`}>
                                <SkeletonTheme baseColor="rgba(249, 58, 11, 0.1)" highlightColor="#dddddd">
                                    <Skeleton width={`100px`} height={60}/>
                                </SkeletonTheme>
                            </div>
                            <div className={`product-item`}>
                                <SkeletonTheme baseColor="rgba(249, 58, 11, 0.1)" highlightColor="#dddddd">
                                    <Skeleton width={`100px`} height={60}/>
                                </SkeletonTheme>
                            </div>
                            <div className={`product-item`}>
                                <SkeletonTheme baseColor="rgba(249, 58, 11, 0.1)" highlightColor="#dddddd">
                                    <Skeleton width={`100px`} height={60}/>
                                </SkeletonTheme>
                            </div>
                            <div className={`product-item`}>
                                <SkeletonTheme baseColor="rgba(249, 58, 11, 0.1)" highlightColor="#dddddd">
                                    <Skeleton width={`100px`} height={60}/>
                                </SkeletonTheme>
                            </div>
                            <div className={`product-item`}>
                                <SkeletonTheme baseColor="rgba(249, 58, 11, 0.1)" highlightColor="#dddddd">
                                    <Skeleton width={`100px`} height={60}/>
                                </SkeletonTheme>
                            </div>
                            <div className={`product-item`}>
                                <SkeletonTheme baseColor="rgba(249, 58, 11, 0.1)" highlightColor="#dddddd">
                                    <Skeleton width={`100px`} height={60}/>
                                </SkeletonTheme>
                            </div>
                            <div className={`product-item`}>
                                <SkeletonTheme baseColor="rgba(249, 58, 11, 0.1)" highlightColor="#dddddd">
                                    <Skeleton width={`100px`} height={60}/>
                                </SkeletonTheme>
                            </div>
                            <div className={`product-item`}>
                                <SkeletonTheme baseColor="rgba(249, 58, 11, 0.1)" highlightColor="#dddddd">
                                    <Skeleton width={`100px`} height={60}/>
                                </SkeletonTheme>
                            </div>
                            <div className={`product-item`}>
                                <SkeletonTheme baseColor="rgba(249, 58, 11, 0.1)" highlightColor="#dddddd">
                                    <Skeleton width={`100px`} height={60}/>
                                </SkeletonTheme>
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    )
}