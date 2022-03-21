import { useEffect, useContext } from 'react'
import { CancelToken } from 'apisauce'
import { postHome } from '../api/apiHome'
import { AppContext } from '../context/AppContext'

export default function useCreateHome(home) {   
    let response
    const {user, setAlert} =useContext(AppContext)

    useEffect(
        ()=>{
            const source = CancelToken.source()
            const createHome=async()=>{
                response = await postHome(user.token, home.vin, home.model, home.manufacturer, home.size, home.location, home.price, home.desc, home.year, home.category_id, source.token);
                if (response){
                    setAlert({msg:`Home: ${home.manufacturer} ${home.model} Created`, cat:'success'})
                }else if(response!==undefined && response ===false){
                    setAlert({msg:`Home failed to save.`, cat:'warning'})
                }
            }
            if(home?.model){
                createHome();
            };
            return ()=>{source.cancel()}
        },[home]
    )
}