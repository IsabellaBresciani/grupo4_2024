import React from 'react';
import SideMenu from './SideBarCopied';
import Sidebar from './Sidebar';
import { MdAddCircle, MdStar, MdPerson} from 'react-icons/md'
import { CiSettings, CiLogout, CiSearch} from "react-icons/ci";
import NavBarInside from './NavBarInside';

const styles = {
    bodyLayout: {
        padding: "5vh 3vh",
        //display: "flex",
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


function LayoutInside({ children }) {
    return (
        <div style={styles.bodyLayout}>
            {/*<NavBarInside />*/}
            <div style={styles.mainLayout}>
                {children}
            </div>
        </div>
    );
}

export default LayoutInside;