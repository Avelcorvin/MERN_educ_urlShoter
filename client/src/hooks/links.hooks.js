import { useCallback, useState } from 'react'
/**
 * этот хук отправляет post или get запрос по указаному url
 * 
 * 
 */

export const uselinks = () => {

    const [longLink, setlongLink] = useState(null)
    const [shortLink, setshortLink] = useState(null)
    const [button, setsButton] = useState(null)

    const tableHandler = (EO) => {
        const target = EO.target
        const tableContent = EO.currentTarget.childNodes
        setlongLink(tableContent[1].textContent);
        setshortLink(tableContent[2].textContent);
        setsButton(target.name)
    }

    const copyLink=()=>{
        console.log("copy")
    }
    const deleteLink=()=>{
        console.log("delete")
    }
    if(button==="copy") copyLink()
    if(button==="delete") deleteLink()

    return { tableHandler,longLink,shortLink}
}


