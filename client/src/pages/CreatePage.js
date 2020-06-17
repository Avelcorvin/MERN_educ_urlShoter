import React, { useState, useContext } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import { Context } from '../context/context'
import { useHistory } from 'react-router-dom'


export const CreatePage = () => {
    //hooks
    const history = useHistory()
    const [linkName, setLinkName] = useState("")
    const [longLink, setLongLink] = useState("")
    const { request } = useHttp()
    const message = useMessage()
    const { token } = useContext(Context);

    //constant
    const body = {
        name: linkName,
        longLink: longLink
    }
    const headers = {
        Authorization: `Bearer ${token} `
    }

    //methods   
    const linkNameHandler = (EO) => {
        setLinkName(EO.target.value)
    }
    const longLinkHandler = (EO) => {
        setLongLink(EO.target.value)
    }
    const stoterLinkHandler = async (EO) => {
        try {
            const data = await request('/api/links/createlink', "POST", body, headers)
            message(data.message)
            history.push(`/detail/${data.link._id}`)
            console.log(data)
        } catch (error) {
            message(error)
            console.log("error:",error)

        }
    }


    return (
        <div className="row">
            <div className="col s12" >
                <div className="row">

                    <div className="input-field col s3">

                        <input
                            placeholder="Имя"
                            id="name"
                            type="text"
                            className="validate"
                            value={linkName}
                            onChange={linkNameHandler}/>

                        <label
                            htmlFor="name"
                            >Название ссылки</label></div>

                    <div className="input-field col s9">

                        <input
                            placeholder="Ссылка"
                            id="longlink"
                            type="text"
                            className="validate"
                            value={longLink}
                            onChange={longLinkHandler} />

                        <label
                            htmlFor="longlink"
                            >Длинная ссылка</label></div>

                </div>

                <button
                    className="btn waves-effect waves-light"
                    name="action"
                    onClick={stoterLinkHandler}
                    >Сократить сслыку</button>
            </div>
        </div>
    )
}
