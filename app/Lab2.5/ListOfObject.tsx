'use client';
import { useState } from "react";

interface Data{
    name:string,
    price:string
}

export default function ListOfObject (){
    const [lst,setLst] = useState<Data[]>([
        {name:'A',price:'10'},
        {name:'B',price:'20'},
        {name:'C',price:'30'},
    ]);

    const [namePut,setNamePut] = useState<string>('');
    const [pricePut,setPriceput] = useState<string>('');
    
    const overwrite =()=>{
        const newobj:Data = {name:namePut,price:pricePut};
        setLst([...lst,newobj]);
        setNamePut('');
        setPriceput('');
    }

    return(
        <div>
            {lst.map((item,index) => (
                <div key={index} > {item.name} {item.price}
                </div>  
            ))}
            <input type="text" value={namePut} onChange={(e)=>setNamePut(e.target.value)} />
            <input type="text" value={pricePut} onChange={(e)=> setPriceput(e.target.value)} />
            <button onClick={overwrite}>Add</button>
        </div>
    );
}