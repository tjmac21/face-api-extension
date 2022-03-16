import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { ToProp } from "../types";
import { CurrentTabImages } from "../chrome/utils";

export const GenericFacePage = ({pageName}: any) => {
    const {push} = useHistory();
    const location = useLocation() as ToProp;
    const imgClass = location.state.imgClass as CurrentTabImages;
    const [imgUrls, setImgUrls] = useState<string[]>(imgClass.urls);

    useEffect(()=>{
        setImgUrls(imgClass.urls);
    }, [imgClass]);

    return (
        <div className="App">
            <header className="App-header">
                <p>{pageName}</p>
                <p>IMGS:</p>
                <p>
                    {imgUrls.map((el: string)=><img src={el} alt={el}/>)}
                </p>
                <button onClick={() => {
                    push('/')
                }}>Back
                </button>
            </header>
        </div>
    )
}
