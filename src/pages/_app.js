import 'bootstrap/dist/css/bootstrap.css'
import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-loading-skeleton/dist/skeleton.css';
import "react-datepicker/dist/react-datepicker.css";
import NextNProgress from "nextjs-progressbar";
import {ModeProvider} from "../lib/mode";

function MyApp({Component, pageProps}) {
    return (
        <ModeProvider>
            <NextNProgress color={`rgb(249, 58, 11)`} height={2}/>
            <Component {...pageProps} />
        </ModeProvider>
    );
}

export default MyApp
