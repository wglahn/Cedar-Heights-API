import {useEffect, useState} from 'react';
import {getHome} from '../api/apiHome';
import {CancelToken} from 'apisauce';

export default function useHome(id) {
  const [home, setHome] = useState([])
  
  useEffect(
      ()=>{
          const source = CancelToken.source();
          const getMHome=async()=>{
              const response = await getHome(id, source.token)
              setHome(response)
          }
          getMHome()
          return ()=>{source.cancel();}
      },
      [id]
  )
  return home
}