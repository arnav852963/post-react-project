import React, { useId } from "react";

export const Input = React.forwardRef(({
                                           label,
                                           type = "text",
                                           className = '',
                                           ...props
                                       }, ref) => {
    const id = useId()
    return (
        <div className="w-full">
            {label && (
                <label
                    className="inline-block mb-2 ml-1 text-sm font-black uppercase tracking-wider text-black"
                    htmlFor={id}
                >
                    {label}
                </label>
            )}

            <input
                type={type}
                className={`w-full border-4 border-black bg-white px-4 py-3 text-black font-bold outline-none placeholder:text-gray-500 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] focus:bg-[#B4FF39] transition-all ${className}`}
                ref={ref}
                id={id}
                {...props}

            />
        </div>
    )
})