import React from "react";

export const Logo = ({width = '100px'}) => {
    return (
        <>
            <div
                style={{ width }}
                className="font-black uppercase tracking-tighter text-black italic text-2xl flex items-center justify-center border-2 border-black bg-white px-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-[#B4FF39] transition-all cursor-default"
            >
                Logo
            </div>
        </>
    )
}