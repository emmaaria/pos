import {Swiper, SwiperSlide} from "swiper/react";
import {FreeMode, Virtual} from "swiper";
import {useEffect, useState} from "react";
import axios from "axios";

export default function PosCategories({token}){
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
            <Swiper
                modules={[Virtual, FreeMode]}
                spaceBetween={10}
                slidesPerView={8.2}
                virtual
                freeMode={true}
            >
                {
                    categories && (
                        categories.map((cat, index) => (
                            <SwiperSlide key={cat.id} virtualIndex={index}>
                                <div className="cat-item">
                                    <a className={`btn`}>{cat.name}</a>
                                </div>
                            </SwiperSlide>
                        ))
                    )
                }
            </Swiper>
        </div>
    )
}