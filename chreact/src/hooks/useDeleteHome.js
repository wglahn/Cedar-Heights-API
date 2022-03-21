import React, { useEffect, useContext } from 'react'
import { CancelToken } from 'apisauce'
import { deleteHome } from '../api/apiHome'
import { AppContext } from '../context/AppContext'

export default function useDeleteHome(home) {   
    let response
    const {user, setAlert} = useContext(AppContext)

    useEffect(
        ()=>{
            const source = CancelToken.source()
            const deleteMHome=async()=>{
                response = await deleteHome(user.token, home.id, source.token);
                if (response){
                    setAlert({msg:`Home: ${home.manufacturer} ${home.model} Deleted`, cat:'success'})
                }else if(response!==undefined && response ===false){
                    setAlert({msg:`Home failed to delete.`, cat:'warning'})
                }
            }
            if(home?.model){
                deleteMHome();
            };
            return ()=>{source.cancel()}
        },[home]
    )
  
}