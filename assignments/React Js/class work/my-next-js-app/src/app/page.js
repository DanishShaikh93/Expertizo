import Image from "next/image";
import Link from "next/link";


async function Homepage() {

 const res = await fetch('https://api.imgflip.com/get_memes')
 const response=  await res.json()

 
    
  return (
    <>
      <div className="container">
          <div className="logo">
          <Link href="/">
           <img src="https://img.freepik.com/premium-vector/meme-logo-m-letter-logo-smiling-logo_644562-4.jpg"/></Link>
          </div>
          <div className="memeSec">
          {
            response.data.memes.map((item) => {
return (
    <div className="memeBox">
    <Image
              src={item.url}
              alt={item.name}
              
              width={item.width}
              height={item.height}
             
            />
                <h2>{item.name}</h2>
                {/* <h2>{item.id}</h2> */}
                <Link href={`/meme-editor?url=${item.url}`}> Create Meme </Link>
                <Link href={`/meme-editor/${item.id}`}> View Detail </Link>
    </div>
)

            })
          }
</div>

      </div>
      <div className="footer">Design & Developed By Danish Shaikh Qadri</div>
      </>
  )
}

export default Homepage