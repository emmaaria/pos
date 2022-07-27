import TopBar from "./TopBar";
import Sidebar from "./Sidebar";
import {Offline} from "react-detect-offline";

export default function Layout(props) {
    return (
        <>
            <TopBar title={props.title}/>
            <Sidebar user={props.user}/>
            {props.children}
            <Offline>
                <div style={{
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    background: 'red',
                    width: '100%',
                    textAlign: 'center',
                    color: '#ffffff',
                    fontSize: '20px',
                    zIndex: 999999999999
                }}>
                    No Internet Connection
                </div>
            </Offline>
        </>
    )
}