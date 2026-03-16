


export const Button = ({
                           children,
    type = "button",
    bgColor = "bg-blue-600",
    textColor = 'text-white',
    className ='',
    ...props


}) => {
    return (
       <button className={`${className} ${bgColor} ${textColor}`}
           {...props}
       >
           {children}

       </button>
    )
}
