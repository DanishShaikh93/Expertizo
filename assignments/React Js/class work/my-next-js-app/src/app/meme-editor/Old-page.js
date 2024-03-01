'use client'
import Draggable from 'react-draggable';
import { useState, createRef } from 'react';
import { useSearchParams } from 'next/navigation'
import { exportComponentAsJPEG } from 'react-component-export-image'

import { HexColorPicker } from "react-colorful";
import Link from 'next/link';

function MemeEditor() {
    const [displayText01, setDisplayText01] = useState('');
    const [displayText02, setDisplayText02] = useState('');
    const [memeFileName, setMemeName] = useState('Meme');

    const[fontSize01, setFontSize01] = useState(30);
    const[fontSize02, setFontSize02] = useState(30);

    const [color1, setColor1] = useState("#aabbcc");
    const [color2, setColor2] = useState("#aabbcc");

    const searchParams = useSearchParams()

    const memeName = searchParams.get('name')
    const memeUrl = searchParams.get('url')

    const memeRef = createRef()


    const exportMemeAsJPEG = () => {
        exportComponentAsJPEG(memeRef, {
            fileName: memeFileName // You can pass custom file name here
        });
    }


    return (
        <div  className="container">
<div className="logo">
    <Link href="/">
           <img src="https://img.freepik.com/premium-vector/meme-logo-m-letter-logo-smiling-logo_644562-4.jpg"/></Link>
          </div>
            <div ref={memeRef} className='memeEditor-box'>
                <h2>{memeName}</h2>
                <img src={memeUrl} />
                <Draggable><div style={{ fontSize: fontSize01, color: color1, cursor: 'pointer', fontWeight: 'bold' }}> {displayText01}</div></Draggable>
                <Draggable><div style={{ fontSize: fontSize02, color: color2, cursor: 'pointer', fontWeight: 'bold'  }}>  {displayText02}</div></Draggable>
            </div>

            <div className="memeAction">
                <h2>Meme Details</h2>
                <div className="textSec">

                    <div>
               <input type="text" placeholder='Type Text 1' onChange={e => setDisplayText01(e.target.value)} />
               <input type="number" placeholder='Text 1 Size' onChange={e => setFontSize01(e.target.value+"px")}/>
                   </div>

                   <div>
                <HexColorPicker color={color1} onChange={setColor1} />
                   </div>

                </div> 

               <div className="textSec">

               <div>
               <input type="text" placeholder='Type Text 2' onChange={e => setDisplayText02(e.target.value)} />
               <input type="number" placeholder='Text 1 Size' onChange={e => setFontSize02(e.target.value+"px")} />
               </div>

               <div>
                <HexColorPicker color={color2} onChange={setColor2} />
                </div>
                </div> 

                <button onClick={exportMemeAsJPEG}>Download Meme</button>
            </div>

        </div>
    )
}

export default MemeEditor