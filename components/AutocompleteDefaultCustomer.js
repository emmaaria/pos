import axios from "axios";
import $ from "jquery";
import {useState} from "react";

export default function AutocompleteDefaultCustomer({name, id, token}) {
    const headers = {
        headers: {Authorization: `Bearer ${token}`},
    };
    const [timer, setTimer] = useState(null);
    const [data, setData] = useState();
    const search = async () => {
        $('.autocompleteItemContainer.supplier').show();
        if (timer) {
            clearTimeout(timer);
            setTimer(null);
        }
        const name = $('.autocompleteInput').val();
        setTimer(
            setTimeout(() => {
                axios.get(
                    `${process.env.API_URL}/customer?name=${name}`,
                    headers
                ).then(res => {
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
        $('.autocompleteItemContainer.customer').hide();
    }
    return (
        <>
            <div className={`autocompleteWrapper`}>
                <input type="text" className={`form-control autocompleteInput customer-input`} autoComplete={`off`}
                       defaultValue={name}
                       onKeyUp={search}
                       onKeyDown={search}
                       onChange={search}/>
                <input type="hidden" className={`customer-id`} defaultValue={id}/>
                <div className={`autocompleteItemContainer customer`}>
                    {
                        data && (
                            data.map(el => (
                                <div className={`autocompleteItem`} key={`custoemr-${el.id}`}
                                     onClick={() => setValue(el.name, el.id)}>{el.name}</div>
                            ))
                        )
                    }
                </div>
            </div>
        </>
    );
}
