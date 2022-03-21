import apiClientNoAuth from './clientNoAuth'
import apiClientTokenAuth from './clientTokenAuth'

const endpoint = '/api/image'

export const getImages = async (cancelToken) =>{
    let error;
    let images;

    const response = await apiClientNoAuth(cancelToken).get(endpoint);
    if (response.ok){
        images=response.data.images
    }else{
        error = 'An Unexpected Error has Occured. Please Try Again'
    }

    return{
        error,
        images,
    }
}

export const getImagesByHome = async (id, cancelToken) =>{
    let error;
    let images;

    const response = await apiClientNoAuth(cancelToken).get(endpoint + '/home/' + id);
    if (response.ok){
        images=response.data.images
    }else{
        error = 'An Unexpected Error has Occured. Please Try Again'
    }

    return{
        error,
        images,
    }
}

export const postImage = async(token, title, order, url, home_id, cancelToken)=>{
    const response = await apiClientTokenAuth(token).post(endpoint,{title:title,order:order,url:url,home_id:home_id});
    return response.ok
}


export const putImage = async(token, id, title, order, url, home_id, cancelToken)=>{
    const response = await apiClientTokenAuth(token).put(endpoint+'/'+id,{title:title,order:order,url:url,home_id:home_id});
    return response.ok
}


export const deleteImage = async(token, id, cancelToken)=>{
    const response = await apiClientTokenAuth(token).delete(endpoint+'/'+id);
    return response.ok
}