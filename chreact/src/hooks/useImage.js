import {useEffect, useState} from 'react';
import {getImages} from '../api/apiImage';
import {CancelToken} from 'apisauce';

export default function useImages() {
  const [images, setImages] = useState([])
  
  useEffect(
      ()=>{
          const source = CancelToken.source();
          const getMImages=async()=>{
              const response = await getImages(source.token)
              setImages(response)
          }
          getMImages()
          return ()=>{source.cancel();}
      },
      []
  )

  return images
}