import FbImageLibrary from 'react-fb-image-grid'

function PostsComponent({allPosts, myhd}) {


    return <div className='postSec'>
{
allPosts.map((item)=>{
        return <div className="postBox">
            <h2>{item.title}</h2>
            <h3>Brand Name: {item.brand}</h3>
            <p>{item.description}</p>
            <FbImageLibrary images={item.images}/>
            <div>

                <button>emoji 1</button>
                <button>emoji 2</button>
                like share comment</div>
        </div>
    })  
}
    </div>



}

export default PostsComponent;