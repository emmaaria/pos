import TopBar from "./TopBar";
import Sidebar from "./Sidebar";
export default function Layout(props) {
    return (
        <>
            <TopBar title={props.title}/>
            <Sidebar user={props.user}/>
            {props.children}
        </>
    )
}