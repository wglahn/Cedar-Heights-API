import { useEffect, useContext } from 'react'
import { CancelToken } from 'apisauce'
import { AppContext } from '../context/AppContext'

export default function useCreateMessage(message) {   
    // let response
    const {setAlert} =useContext(AppContext)

    useEffect(
        ()=>{
            const source = CancelToken.source()
            const createMessage=()=>{

                setAlert({msg:`Thank you. We will contact you soon!`, cat:'success'})

            }
            if(message.name){
                createMessage();
            };
            return ()=>{source.cancel()}
        },[message,setAlert]
    )
}