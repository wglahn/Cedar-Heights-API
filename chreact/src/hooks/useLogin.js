import {useEffect, useContext} from 'react';
import {getUser} from  "../api/apiBasicAuth";
import { CancelToken } from 'apisauce';
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom';

export default function useLogin(loginCreds, setError, setUser, setLoginCreds) {
    const {setAlert} = useContext(AppContext)
    const navigate = useNavigate()
    

    useEffect(
        ()=>{
            const source = CancelToken.source()
            const login=async()=>{
                const response_object = await getUser(loginCreds.email, loginCreds.password, source.token)
                if (response_object.user?.token){
                    setAlert({msg:`Welcome ${response_object.user.first_name}`, cat:'success'})
                    setUser(response_object.user);
                    setError(response_object.error);
                    setLoginCreds({});
                    navigate('/')
                }else if(response_object!==undefined && response_object ===false){
                    setAlert({msg:`Login failed.`, cat:'warning'})
                }
            };

            if (loginCreds.email && loginCreds.password){
                login();
            };
            return ()=>{
                source.cancel()
            }
        },
        [loginCreds, setLoginCreds, setUser, setError, setAlert, navigate]
    )
}