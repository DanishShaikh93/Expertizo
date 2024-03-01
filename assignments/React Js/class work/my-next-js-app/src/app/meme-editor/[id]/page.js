import Detail from "./Detail";

export default async function memeDetail(props) {
    const memeId= props;
    // console.log(props)
    // console.log(memeId)

    const res = await fetch('https://api.imgflip.com/get_memes')
 const response=  await res.json()
 const memeData= response.data.memes;
//  console.log(memeData)

    
    return (
        <Detail memeData={memeData} memeId={memeId}/>
    )
}