import React from "react";

export function DecorativeHeader() {
    const image = {
        backgroundImage: 'url("/esmetric_logo_bb_transp.png")',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    };
    return (
        <div className="decorative-header bullseye-image" style={image}></div>
    );
}

export function DecorativeHeaderSpace({ children }) {
    return <div className="decorative-header-space">{children}</div>;
}
