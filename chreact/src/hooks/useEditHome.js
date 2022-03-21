import { useEffect, useContext } from 'react'
import { CancelToken } from 'apisauce'
import { putHome } from '../api/apiHome'
import { AppContext } from '../context/AppContext'

export default function useEditHome(home) {   
    let response
    const {user, setAlert} =useContext(AppContext)

    useEffect(
        ()=>{
            const source = CancelToken.source()
            const editHome=async()=>{
                response = await putHome(user.token, home.id, home.vin, home.model, home.manufacturer, home.size, home.location, home.price, home.desc, home.year, home.category_id, source.token);
                if (response){
                    setAlert({msg:`Home: ${home.manufacturer} ${home.model} Edited`, cat:'success'})
                }else if(response!==undefined && response ===false){
                    setAlert({msg:`Home failed to save.`, cat:'warning'})
                }
            }
            if(home?.model){
                editHome();
            };
            return ()=>{source.cancel()}
        },[home]
    )
  
}