import  {createContext} from 'react'

/**
 * Это шаблон контекста  - то, что потом будет передаваться в компоненту;
 * По другому это default контекст 
 * Здесь просто прописаны поля без какой то логики. 
 * Сама логика передаётся уже непостредственно через пропсы в компоненту.
 */

export const Context = createContext({
    token:null,
    id:null,
    login:()=>{},
    logout:()=>{},
    isAuthnification:false, 
})
