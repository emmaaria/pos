import axios from "axios";
import $ from "jquery";
import {useState} from "react";

export default function AutocompleteInput({type, token, placeholder, className}) {
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
        $('.autocompleteItemContainer.supplier').show();
        if (timer) {
            clearTimeout(timer);
            setTimer(null);
        }
        if (type === 'supplier') {
            setTimer(
                setTimeout(() => {
                    axios.get(
                        `${process.env.API_URL}/supplier?name=${value}`,
                        headers
                    ).then(res => {
                        setSearching(false)
                        if (res.data.status === true) {
                            setData(res.data.suppliers.data);
                        }
                    }).catch(err => {
                        console.log(err);
                    });
                }, 1000)
            );
        }
        if (type === 'customer') {
            setTimer(
                setTimeout(() => {
                    axios.get(
                        `${process.env.API_URL}/customer?name=${value}`,
                        headers
                    ).then(res => {
                        setSearching(false)
                        if (res.data.status === true) {
                            setData(res.data.customers.data);
                        }
                    }).catch(err => {
                        console.log(err);
                    });
                }, 1000)
            );
        }
    }
    const setValue = (label, value) => {
        $('.supplier-input').val(label);
        if (type === 'supplier') {
            $('.supplier-id').val(value);
        }
        if (type === 'customer') {
            $('.customer-id').val(value);
        }
        setKeyword(null)
    }
    return (
        <>
            <div className={`autocompleteWrapper`}>
                <input type="text" className={`form-control autocompleteInput supplier-input ${className}`}
                       autoComplete={`off`}
                       onKeyUp={(e) => search(e.target.value)}
                       onKeyDown={(e) => search(e.target.value)}
                       onChange={(e) => search(e.target.value)}
                       placeholder={placeholder ? placeholder : ''}
                />
                {
                    type && type === 'supplier' && (
                        <input type="hidden" className={`supplier-id`}/>
                    )
                }
                {
                    type && type === 'customer' && (
                        <input type="hidden" className={`customer-id`}/>
                    )
                }
                {
                    keyword && (
                        <div className={`autocompleteItemContainer supplier`}>
                            {
                                data && (
                                    data.length > 0 && (
                                        data.map(el => (
                                                <div className={`autocompleteItem`} key={`supplier-${el.id}`}
                                                     onClick={() => setValue(`${el.name} (${el.address})`, el.id)}>
                                                    {el.name}
                                                    {type !== 'supplier' && (
                                                        ` (${el.address ? el.address : ''})`
                                                    )
                                                    }
                                                </div>
                                            )
                                        )) || (
                                        <div className={`autocompleteItem`}>
                                            No result found
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
