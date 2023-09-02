import axios from "axios";
import $ from "jquery";
import {useState} from "react";

export default function AutocompleteDefaultSupplier({name, id, token}) {
    const headers = {
        headers: {Authorization: `Bearer ${token}`},
    };
    const [timer, setTimer] = useState(null);
    const [data, setData] = useState();
    const [keyword, setKeyword] = useState();
    const [supplierId, setSupplierId] = useState(id);
    const [searching, setSearching] = useState(false);
    const search = async (value) => {
        setKeyword(value);
        setSearching(true)
        if (timer) {
            clearTimeout(timer);
            setTimer(null);
        }
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
    const setValue = (label, value) => {
        $('.supplier-input').val(label);
        setSupplierId(value)
        setKeyword(null)
    }
    return (
        <>
            <div className={`autocompleteWrapper`}>
                <input type="text" className={`form-control autocompleteInput supplier-input`} autoComplete={`off`}
                       defaultValue={name}
                       onKeyUp={(e) => search(e.target.value)}
                       onKeyDown={(e) => search(e.target.value)}
                       onChange={(e) => search(e.target.value)}/>
                <input type="hidden" className={`supplier-id`} value={supplierId}/>
                {
                    keyword && (
                        <div className={`autocompleteItemContainer supplier`}>
                            {
                                data && (
                                    data.length > 0 && (
                                        data.map(el => (
                                                <div className={`autocompleteItem`} key={`supplier-${el.id}`}
                                                     onClick={() => setValue(el.name, el.id)}>
                                                    {el.name}
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
