import { createContext } from "react";

export const Appcontext=createContext()

const Appcontextprovider=(props)=>{
    const currency='$'
    const caluculateAge=(dob)=>{
        const today =new Date()
        const birthDate=new Date(dob)

        let age=today.getFullYear()-birthDate.getFullYear()
        return age;
    }
      const months=["JAN","FEB","MAR","APR","MAY","JUN","JULY","AUG","SEPT","OCt","NOV","DEC"]

     const slotDateFormat =(slotDate)=>{
    const dateArray=slotDate.split('_')
    return dateArray[0]+" " + months[Number(dateArray[1]-1)] + " " + dateArray[2]
  }

    const value={
        caluculateAge,
        slotDateFormat,
        currency
    }
    return (
        <Appcontext.Provider value={value}>
            {props.children}
        </Appcontext.Provider>
    )

}

export default Appcontextprovider

