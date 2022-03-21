import React, { useEffect, useContext } from 'react'
import { CancelToken } from 'apisauce'
import { deleteImage } from '../api/apiImage'
import { AppContext } from '../context/AppContext'

export default function useDeleteImage(image) {   
    let response
    const {user, setAlert} = useContext(AppContext)

    useEffect(
        ()=>{
            const source = CancelToken.source()
            const deleteAImage=async()=>{
                response = await deleteImage(user.token, image.id, source.token);
                if (response){
                    setAlert({msg:`Image: ${image.title} Deleted`, cat:'success'})
                }else if(response!==undefined && response ===false){
                    setAlert({msg:`Image failed to delete.`, cat:'warning'})
                }
            }
            if(image?.title){
                deleteAImage();
            };
            return ()=>{source.cancel()}
        },[image]
    )
  
}