import { NavLink, useNavigate } from "react-router-dom";
import "./MenuButtons.css";

interface StyleProps{
    icon: React.ReactNode;
    text:string;
    path: string;

}

export function MenuButtons(props: StyleProps): JSX.Element {
    const navigate = useNavigate();
    return (
        <div className="MenuButtons" onClick={()=>navigate(props.path)}>
			{props.icon }
            <div className="menuText">
            <NavLink to={props.path} className={({ isActive }) => isActive ? 'navlink active' : 'navlink'}>{props.text}</NavLink>
            </div>
        </div>
    );
}
