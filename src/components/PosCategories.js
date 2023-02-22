import {Swiper, SwiperSlide} from "swiper/react";
import {FreeMode, Virtual} from "swiper";
import {useEffect, useState} from "react";
import axios from "axios";
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";

export default function PosCategories({token}) {
    const headers = {
        headers: {Authorization: `Bearer ${token}`},
    }
    useEffect(() => {
        axios.get(
            `${process.env.API_URL}/category?allData=true`,
            headers
        ).then(res => {
            if (res.data.status === true) {
                setCategories(res.data.categories)
            }
        }).catch(err => {
            console.log(err)
        })
    }, [])
    const [categories, setCategories] = useState()
    return (
        <div className="category-wrapper">
            {
                categories && (
                    <Swiper
                        modules={[Virtual, FreeMode]}
                        spaceBetween={10}
                        slidesPerView={8.2}
                        virtual
                        freeMode={true}
                    >
                        {
                            categories.map((cat, index) => (
                                <SwiperSlide key={cat.id} virtualIndex={index}>
                                    <div className="cat-item">
                                        <a className={`btn`}>{cat.name}</a>
                                    </div>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                ) || (
                    <SkeletonTheme baseColor="rgba(249, 58, 11, 0.1)" highlightColor="#dddddd">
                        <Skeleton width={`100%`} height={40}/>
                    </SkeletonTheme>
                )
            }

        </div>
    )
}