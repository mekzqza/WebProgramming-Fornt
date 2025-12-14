'use client';
import { useState } from "react";

export interface Data{
    name:string;
    price:string;
}

export default function ListOfObject(){
    const [lst,setLst] = useState<Data[]>([{name:'A',price:"100"},{name:'B',price:"200"}]);
    const [intPutName, setIntPutName] = useState<string>('');
    const [intPutPrice, setIntPutPrice] = useState<string>(''); 


    const overwrite =()=>{
        const newObj:Data={name:intPutName,price:(intPutPrice)};
        setLst([...lst,newObj]);
        setIntPutName('');
        setIntPutPrice('');
    }


    return(
        <div>
            {lst.map((obj,index) =>(
                <div key={index}>{obj.name} - {obj.price}</div>
            ))}
            <input type="text" value={intPutName} onChange={(e) => setIntPutName(e.target.value)} />
            <input type="text" value={intPutPrice} onChange={(e) => setIntPutPrice(e.target.value)} />

            <button onClick={overwrite}>Add Object</button>
        </div>
    );
}