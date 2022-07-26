import axios from "axios";
import $ from "jquery";
import {useState} from "react";

export default function AutocompleteInput({type, token}) {
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
        if (type === 'supplier') {
            const name = $('.autocompleteInput').val();
            setTimer(
                setTimeout(() => {
                    axios.get(
                        `${process.env.API_URL}/supplier?name=${name}`,
                        headers
                    ).then(res => {
                        if (res.data.status === true) {
                            setData(res.data.suppliers.data);
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
        if (type === 'supplier'){
            $('.supplier-id').val(value);
        }
        if (type === 'customer'){
            $('.customer').val(value);
        }
        $('.autocompleteItemContainer.supplier').hide();
    }
    return (
        <>
            <div className={`autocompleteWrapper`}>
                <input type="text" className={`form-control autocompleteInput supplier-input`} autoComplete={`off`} onKeyUp={search}
                       onKeyDown={search}
                       onChange={search}/>
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
                <div className={`autocompleteItemContainer supplier`}>
                    {
                        data && (
                            data.map(el => (
                                <div className={`autocompleteItem`} key={`supplier-${el.id}`}
                                     onClick={() => setValue(el.name, el.id)}>{el.name}</div>
                            ))
                        )
                    }
                </div>
            </div>
        </>
    );
}
