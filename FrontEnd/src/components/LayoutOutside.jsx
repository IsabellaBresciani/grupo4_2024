import React from 'react';
import NavBarOutside from './NavBarOutside';

const styles = {
    layoutContainer: {
        display: 'flex',
        flexDirection: 'row',
        minHeight: '100vh',
    },
    mainLayout: {
        minHeight: '90vh',
    
        flexGrow: 1,
        margin: '0'
    }
};

function LayoutOutside({ children }) {
    return (
        <div style={styles.bodyLayout}>
            <NavBarOutside/>
            <div style={styles.mainLayout}>
                {children}
            </div>
        </div>
    );
}

export default LayoutOutside;