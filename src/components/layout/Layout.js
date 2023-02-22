import TopBar from "./TopBar";
import Sidebar from "./Sidebar";
import {Offline} from "react-detect-offline";
import {FullScreen, useFullScreenHandle} from "react-full-screen";

export default function Layout(props) {
    const handle = useFullScreenHandle();
    return (
        <FullScreen handle={handle}>
            {
                props.sidebar || props.sidebar !== false && (
                    <TopBar title={props.title} handle={handle}/>
                )
            }
            {
                props.sidebar || props.sidebar !== false && (
                    <Sidebar user={props.user}/>
                )
            }
            {props.children}
            <Offline>
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    background: 'rgba(0,0,0,0.9)',
                    width: '100%',
                    textAlign: 'center',
                    color: '#ffffff',
                    fontSize: '20px',
                    zIndex: 999999999999,
                    paddingTop: '10px',
                    paddingBottom: '10px',
                    height: '100%'
                }}>
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%,-50%)'
                    }}>
                        <div className="img" style={{marginBottom: '10px'}}>
                            <svg width="50px" height="50px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path fill="#ffffff"
                                      d="M6.92,5.51h0L3.71,2.29A1,1,0,0,0,2.29,3.71L4.56,6A15.21,15.21,0,0,0,1.4,8.39a1,1,0,0,0,0,1.41,1,1,0,0,0,.71.3,1,1,0,0,0,.7-.29A13.07,13.07,0,0,1,6.05,7.46L7.54,9a10.78,10.78,0,0,0-3.32,2.27,1,1,0,1,0,1.42,1.4,8.8,8.8,0,0,1,3.45-2.12l1.62,1.61a7.07,7.07,0,0,0-3.66,1.94,1,1,0,1,0,1.42,1.4A5,5,0,0,1,12,14a4.13,4.13,0,0,1,.63.05l7.66,7.66a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42ZM12,16a3,3,0,1,0,3,3A3,3,0,0,0,12,16Zm0,4a1,1,0,1,1,1-1A1,1,0,0,1,12,20ZM22.61,8.39A15,15,0,0,0,10.29,4.1a1,1,0,1,0,.22,2A13.07,13.07,0,0,1,21.2,9.81a1,1,0,0,0,1.41-1.42Zm-4.25,4.24a1,1,0,0,0,1.42-1.4,10.75,10.75,0,0,0-4.84-2.82,1,1,0,1,0-.52,1.92A8.94,8.94,0,0,1,18.36,12.63Z"/>
                            </svg>
                        </div>
                        No internet connection!
                    </div>
                </div>
            </Offline>
        </FullScreen>
    )
}