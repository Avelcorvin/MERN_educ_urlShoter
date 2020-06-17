import React, { useState, useEffect, useCallback, useContext } from 'react'
import {Link} from 'react-router-dom'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import { Context } from '../context/context'




export const LinksPage = () => {
    //hooks
    const { request, loading } = useHttp()
    const [links, setLinks] = useState([])
    const message = useMessage()
    const { token } = useContext(Context)

    //methods
    const getData = useCallback(async () => {
        try {
        const data = await request("/api/links/findlink", "POST", {}, {
            Authorization: `Bearer ${token} `
        })
        setLinks(data.data)
        } catch (error) {
            console.log("error:",error)

         }
        }, [request])

    const deleteLink = useCallback(async ({ name }) => {
        try {
        const data = await request("/api/links/deletelink", "POST", { name });
        message(data.message)
        } catch (error) {
        }
  }, [request, message])


    useEffect(() => {
        try {
            getData()
        } catch (error) {
        }
       }, [getData])



    const tableHandler = (EO) => {

        const target = EO.target
        const tableContent = EO.currentTarget.childNodes
        const name = tableContent[0].textContent;
        const shortLink = tableContent[2]

        if (target.name === "copy") {
            const range = document.createRange();
            range.selectNode(shortLink)
            window.getSelection().addRange(range);
            try {
                document.execCommand('copy');
                message("ссылка скопирована");
            } catch (error) {
                console.log('Can`t copy, boss');
            }
            window.getSelection().removeAllRanges();
        }

        if (target.name === "delete") {
            deleteLink({ name })
            getData()
        }
    }



    const tableContent = links.map((e, n) => {
        try {
            return (
                <tr key={n} onClick={tableHandler}>
                    <td>
                        <Link to={"detail/"+e._id}>
                            {e.name}</Link></td>
    
                    <td name="longLink" >
                        {e.longLink} </td>
    
                    <td name="shortLink"  >
                        <a href={e.shortLink} >
                             {e.shortLink}</a></td>
    
                    <td>
                        <button
                            className="material-icons"
                            name="delete"
                            disabled={loading}
                        > delete </button></td>
    
                    <td>
                        <button
                            className="material-icons"
                            name="copy"
                        > content_copy </button></td></tr>
            )
        } catch (error) {
            return false;
        }
        
    })


    return (
        <div>
            <table className="flow-text font-style-1" >
                <thead>
                    <tr>
                        <td>
                            Название ссылки</td>
                        <td>
                            Ссылка</td>
                        <td>
                            Сокращенная ссылка</td>
                        <td>
                            Удалить ссылку</td>
                        <td>
                            Скопировать ссылку </td>
                    </tr></thead>
                <tbody>
                    {true&&tableContent}
                </tbody></table></div>
    )
}   