import 'bootstrap/dist/css/bootstrap.css'
import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-loading-skeleton/dist/skeleton.css';
import "react-datepicker/dist/react-datepicker.css";
import NextNProgress from "nextjs-progressbar";

function MyApp({Component, pageProps}) {
    return (
        <>
            <NextNProgress  color={`rgb(249, 58, 11)`} height={2}/>
            <Component {...pageProps} />
        </>
    );
}

export default MyApp
