import React, { useId } from "react";

export const Select = React.forwardRef(({
                                            options,
                                            label,
                                            className = '',
                                            ...props
                                        }, ref) => {
    const id = useId()
    return (
        <div className='w-full'>
            {label && (
                <label
                    htmlFor={id}
                    className='inline-block mb-2 ml-1 text-sm font-black uppercase tracking-wider text-black'
                >
                    {label}
                </label>
            )}
            <select
                id={id}
                ref={ref}
                {...props}
                className={`w-full border-4 border-black bg-white px-4 py-3 text-black font-bold outline-none appearance-none cursor-pointer shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] focus:bg-[#B4FF39] transition-all ${className}`}
                style={{
                    backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='3' stroke-linecap='square' stroke-linejoin='inherit'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 1rem center',
                    backgroundSize: '1.5em'
                }}
            >
                {options?.map((op) => {
                    return (
                        <option key={op} value={op} className="font-bold bg-white text-black">
                            {op}
                        </option>
                    )
                })}
            </select>
        </div>
    )
})