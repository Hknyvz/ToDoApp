import React,{useState, createContext} from "react"

const accountContext = createContext(null);

export const AccountProvider=({children})=>{

    const [account, setAccount] = useState({id: "", userName: "", email: ""});

    const values={
        account,
        setAccount
    };
   return <accountContext.Provider value={values}>{children}</accountContext.Provider>
}

export default accountContext;