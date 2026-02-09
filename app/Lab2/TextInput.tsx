'use client';
import { useState } from "react";

export default function TextInput(){
    const [text, setText] = useState("");

    return(
        <div>
            {text}
            <input type="text" value ={text} onChange={(e) => setText(e.target.value)}
            />
        </div>
    );
}
