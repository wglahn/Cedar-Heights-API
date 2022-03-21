import { useEffect, useContext } from 'react'
import { CancelToken } from 'apisauce'
import { postImage } from '../api/apiImage'
import { AppContext } from '../context/AppContext'

export default function useCreateImage(image) {   
    let response
    const {user, setAlert} =useContext(AppContext)

    useEffect(
        ()=>{
            const source = CancelToken.source()
            const createImage=async()=>{
                response = await postImage(user.token, image.title, image.order, image.url, image.home_id, source.token);
                if (response){
                    setAlert({msg:`Image: ${image.title} Created`, cat:'success'})
                }else if(response!==undefined && response ===false){
                    setAlert({msg:`Image failed to save.`, cat:'warning'})
                }
            }
            if(image?.title){
                createImage();
            };
            return ()=>{source.cancel()}
        },[image]
    )
}