import axios from "axios";
import $ from "jquery";
import {useState} from "react";

export default function AutocompleteDefaultCustomer({name, id, token, className}) {
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
    const setValue = (label, value) => {
        $('.customer-input').val(label);
        $('.customer-id').val(value);
        setKeyword(null)
    }
    return (
        <>
            <div className={`autocompleteWrapper`}>
                <input type="text" className={`form-control autocompleteInput customer-input ${className}`} autoComplete={`off`}
                       defaultValue={name}
                       onKeyUp={search}
                       onKeyDown={search}
                       onChange={search}/>
                <input type="hidden" className={`customer-id`} defaultValue={id}/>
                {
                    keyword && (
                        <div className={`autocompleteItemContainer customer`}>
                            {
                                data && (
                                    data.length > 0 && (
                                        data.map(el => (
                                            <div className={`autocompleteItem`} key={`customer-${el.id}`}
                                                 onClick={() => setValue(el.name, el.id)}>{el.name}</div>
                                        ))
                                    ) || (
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
