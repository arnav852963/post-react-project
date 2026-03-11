import React,{useId} from "react";


export const Select = React.forwardRef(({

    options,
    label,
    clasName='',
    ...props


                       } ,ref) => {

    const id = useId()
    return (
        <>
        <div className='w-full'>
            {label && (
                <label htmlFor={id} className=''> {label}</label>
            )}
            <select
            id={id}
            ref ={ref}
            {...props}
                className={`${clasName}`}
            >

                {
                    options?.map((op)=>{

                        return (
                            <option key={op} value={op} >
                                {op}

                            </option>
                        )
                    })
                }



            </select>




        </div>
        </>
    )
}
)
