// components/LayoutInside.jsx
import React from "react";
import NavbarInside from './NavbarInside';



function LayoutInside({ children, activeItem }) {
  return (
    <div>
      <NavbarInside content={children} activeItem={activeItem}/>
    </div>
  );
}

export default LayoutInside;