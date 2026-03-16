import React from "react";

export const Container = ({children}) => {
    return (
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 selection:bg-[#B4FF39] selection:text-black">
            {children}
        </div>
    );
}