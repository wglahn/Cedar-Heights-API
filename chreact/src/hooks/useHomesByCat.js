import {useEffect, useState} from 'react';
import {getHomesByCatId} from '../api/apiHome';
import {CancelToken} from 'apisauce';

export default function useHomeByCat(id) {
  const [homes, setHomes] = useState([])
  
  useEffect(
      ()=>{
          const source = CancelToken.source();
          const getMHomeByCatId=async()=>{
              const response = await getHomesByCatId(id, source.token)
              setHomes(response)
          }
          getMHomeByCatId()
          return ()=>{source.cancel();}
      },
      [id]
  )
  return homes
}