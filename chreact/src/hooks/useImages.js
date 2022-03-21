import {useEffect, useState} from 'react'
import {getImagesByHome} from '../api/apiImage';
import {CancelToken} from 'apisauce'

export default function useImages(id) {
  const [images, setImages] = useState([])
  
  useEffect(
      ()=>{
          const source = CancelToken.source();
          const getImages=async()=>{
              const response = await getImagesByHome(id, source.token)
              console.log(response)
              setImages(response)
          }
          getImages()
          return ()=>{source.cancel();}
      },
      [id]
  )

  return images
}