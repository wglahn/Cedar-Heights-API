import apiClientNoAuth from './clientNoAuth'
import apiClientTokenAuth from './clientTokenAuth'

const endpoint = '/api/home'

export const getHomes = async (cancelToken) =>{
    let error;
    let homes;

    const response = await apiClientNoAuth(cancelToken).get(endpoint);
    if (response.ok){
        homes=response.data.homes
    }else{
        error = 'An Unexpected Error has Occured. Please Try Again'
    }

    return{
        error,
        homes,
    }
}

export const postHome = async(token, vin, model, manufacturer, size, location, price, desc, year, category_id, cancelToken)=>{
    const response = await apiClientTokenAuth(token).post(endpoint,{vin:vin,model:model,manufacturer:manufacturer,size:size,location:location,price:price,desc:desc,year:year,category_id:category_id});
    console.log(response)
    return response.ok
}


export const putHome = async(token, id, vin, model, manufacturer, size, location, price, desc, year, category_id, cancelToken)=>{
    const response = await apiClientTokenAuth(token).put(endpoint+'/'+id,{vin:vin,model:model,manufacturer:manufacturer,size:size,location:location,price:price,desc:desc,year:year,category_id:category_id});
    return response.ok
}


export const deleteHome = async(token, id, cancelToken)=>{
    const response = await apiClientTokenAuth(token).delete(endpoint+'/'+id);
    return response.ok
}