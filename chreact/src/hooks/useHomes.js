import {useEffect, useState} from 'react'
import {getHomes} from '../api/apiHome';
import {CancelToken} from 'apisauce'

export default function useHomes() {
  const [homes, setHomes] = useState([])
  
  useEffect(
      ()=>{
          const source = CancelToken.source();
          const getMHomes=async()=>{
              const response = await getHomes(source.token)
              setHomes(response)
          }
          getMHomes()
          return ()=>{source.cancel();}
      },
      []
  )

  return homes
}