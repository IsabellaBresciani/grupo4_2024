import React from 'react';
import SideMenu from './SideBarCopied';
import Sidebar from './Sidebar';
import { MdAddCircle, MdStar, MdPerson} from 'react-icons/md'
import { CiSettings, CiLogout, CiSearch} from "react-icons/ci";

const styles = {
    bodyLayout: {
        padding: "5vh 3vh",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: "100px"
    },
    mainLayout: {
        padding: '5v',
        marginLeft: '5vh',
        // Additional styles for main layout can be added here if needed
    },
};

const menu = [
    
    {
        icon: MdAddCircle,
        text: "New",
        link: "/new"
    },
    {
        icon: MdStar,
        text: "Favorites",
        link: "/favorites"
    },
    {
        hr: true
    },
    {
        icon: MdPerson,
        text: "Mi Perfil",
        link: "/profile"
    },
    {
        icon: CiSearch,
        text: "Buscador",
        link: "/search"
    }
    ,
    {
        icon: CiSettings,
        text: "Configuracion",
        link: "/settings"
    }
    ,
    {
        icon: CiLogout,
        text: "Log Out",
        link: "/login"
    }
]

function LayoutInside({ children }) {
    return (
        <div style={styles.bodyLayout}>
            <SideMenu menu={menu}  />
            <div style={styles.mainLayout}>
                {children}
            </div>
        </div>
    );
}

export default LayoutInside;