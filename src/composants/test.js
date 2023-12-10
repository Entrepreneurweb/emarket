import React from 'react'
import { useState } from 'react'
import { Button } from 'react-bootstrap'

export default function Test() {
    const [im, setim]=useState(null);
    const [im2, setim2]=useState(null);
    const [bigim, setbigim]=useState({
        big1:null,
        big2:null
    });

const handleim=(e)=>{
e.preventDefault();

setim(e.target.files[0]);

}
const handleim2=(e)=>{
    e.preventDefault();
    
    setim2(e.target.files[0]);
    
    }
  return (
    <div>
       <div>
       test
        </div> 
        

    <input type='file'  accept='image'    onChange={handleim} />
    <input type='file'  accept='image'    onChange={handleim2} />
    <br/>
    <button onClick={(e) => {
                e.preventDefault();
                setbigim(prevState => ({
                    ...prevState,
                    big1: im
                }));
            }} >
    CLIQUER 1
</button>
<button onClick={(e) => {
                e.preventDefault();
                setbigim(prevState => ({
                    ...prevState,
                    big2: im2
                }));
            }} >
    CLIQUER 2
</button>
<button onClick={()=>{
    console.log(bigim);
}} >
    CLIQUER ICI
</button>
    
    </div>
  )
}
