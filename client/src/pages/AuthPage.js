import React, { useState, useEffect, useContext } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import { Context } from '../context/context'

export const AuthPage = () => {
    // hooks
    const message = useMessage()
    const auth = useContext(Context)
    const { request, loading, error } = useHttp()
    const [form, setForm] = useState({
        email: '', pasword: ''
    })


    useEffect(() => {
        console.log(error)
        message(error)
    }, [error, message])

    //methods
    const changeHandler = event => {
        setForm({
            ...form, [event.target.name]: event.target.value
        })
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/registr', "POST", { ...form })
            message(data.message)
        } catch (e) { }
    }
    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', "POST", { ...form })
            auth.login(data.token,data.userid)
            message(data.message)
           console.log(data)
        } catch (e) {
            console.log("error:",error)

         }
    }



    return (

        <div>
            <div className="row">
                <div className="col s6 offset-s3">
                    <h1> Сократи ссылку</h1>
                    <div className="card blue darken-1">

                        <div className="card-content white-text">
                            <span className="card-title">Authorisatione</span>
                            <div>
                                <div className="input-field">
                                    <input
                                        placeholder="Введите эмайл"
                                        id="email"
                                        type="text"
                                        name="email"
                                        className="yellow-input"
                                        onChange={changeHandler}
                                        disabled={loading}
                                    />
                                    <label
                                        htmlFor="email">
                                        Email</label>
                                </div>

                                <div className="input-field">
                                    <input
                                        placeholder="пароль"
                                        id="password"
                                        type="password"
                                        name="pasword"
                                        className="yellow-input"
                                        onChange={changeHandler}
                                        disabled={loading}
                                    />
                                    <label
                                        htmlFor="first_name ">
                                        Pasword</label>
                                </div>
                            </div>
                        </div>



                        <div className="card-action">
                            <button
                                className="btn yellow darken-4 "
                                style={{ marginRight: 10 }}
                                disabled={loading}
                                onClick={loginHandler}

                            >
                                Войти
                                </button>
                            <button
                                className="btn grey black-text"
                                disabled={loading}
                                onClick={registerHandler}
                            >
                                Регистрцация
                              </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* AuthPage */}
        </div>
    )
}