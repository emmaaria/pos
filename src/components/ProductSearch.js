import axios from "axios";
import $ from "jquery";
import {useState} from "react";

export default function ProductSearch({token}) {
    const headers = {
        headers: {Authorization: `Bearer ${token}`},
    };
    const [timer, setTimer] = useState(null);
    const [data, setData] = useState();
    const [keyword, setKeyword] = useState();
    const [searching, setSearching] = useState(false);
    const search = async (value) => {
        setKeyword(value);
        setSearching(true)
        setData(null)
        if (timer) {
            clearTimeout(timer);
            setTimer(null);
        }
        const name = $('.autocompleteInput').val();
        setTimer(
            setTimeout(() => {
                axios.get(
                    `${process.env.API_URL}/product?name=${name}`,
                    headers
                ).then(res => {
                    setSearching(false)
                    if (res.data.status === true) {
                        setData(res.data.products.data);
                    }
                }).catch(err => {
                    console.log(err);
                });
            }, 1000)
        );
    }
    const setValue = (label, value) => {
        $('.product-input').val(label);
        $('.product-id').val(value);
        setKeyword(null)
    }
    return (
        <>
            <div className={`autocompleteWrapper`}>
                <input type="text" className={`form-control autocompleteInput product-input`} autoComplete={`off`}
                       defaultValue={name}
                       onKeyUp={search}
                       onKeyDown={search}
                       onChange={search}/>
                <input type="hidden" className={`product-id`}/>
                {
                    keyword && (
                        <div className={`autocompleteItemContainer product`}>
                            {
                                data && (
                                    data.length > 0 && (
                                        data.map(el => (
                                            <div className={`autocompleteItem`} key={`customer-${el.id}`}
                                                 onClick={() => setValue(el.name, el.id)}>{el.name}</div>
                                        ))
                                    ) || (
                                        <div className={`autocompleteItem`}>
                                            No product found
                                        </div>
                                    )
                                )
                            }
                            {
                                searching && (
                                    <div className={`autocompleteItem`}>
                                        Searching...
                                    </div>
                                )
                            }
                        </div>
                    )
                }
            </div>
        </>
    );
}
