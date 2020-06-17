import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useHttp } from '../hooks/http.hook'
import { Context } from '../context/context'
/**
 *_id : 5ee641c291ed5b441c5f68b0
name : "ololo"
longLink : "oololo"
shortLink : "http://localhost:5000/links/t/ololo"
owner : "5ee641ae91ed5b441c5f68af"
clicks : 0
__v : 0
*/

export const DetailPage =()=>{

    //hooks
    const params = useParams().id;
    const {request} = useHttp();
    const {token} = useContext(Context);
    const [state,setState] =  useState({})
    
    //constants
    const body = { _id:params}
    const headers = {
        Authorization: `Bearer ${token} `
    }

    //methods
    const getDataLink = useCallback( async()=>{
        try {
            const data = await request( "/api/links/id" , "POST", body, headers )
            setState(data)
            console.log("datalink:",data)
        } catch (error) { 
            console.log("error:",error)

        }
    },[body,headers,request])

    useEffect( ()=>{
        try {
            getDataLink()
        } catch (error) {
            
        }
        
    },[getDataLink])
    
    console.log(params) 



    return(
        <div>
            <ul className="flow-text font-style-2">
                <li>
                    Название ссылки: {true&&state.name}
                </li>
                <li>
                    Длинная ссылка:  {true&&state.longLink}
                </li>
                <li>
                    Короткая ссылка {true&&state.shortLink}
                </li>
                <li>
                    Владелец {true&&state.owner}
                </li>
                <li>
                    ID: ссылки {true&&state._id}
                </li>
                <li>
                    Клики {true&& state.clicks}
                </li>

            </ul>

        </div>
    )
} 