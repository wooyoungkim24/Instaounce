import { useEffect, useState } from "react"

function TestingPost() {

    const [posts, setPosts] = useState([]);

    useEffect(() => {

        (async () => {
            const response = await fetch(`/api/posts/`);
            const resPosts = await response.json();
            console.log('test', resPosts)
            setPosts(resPosts.posts)

        })();
    }, [])

    return (
        <div>

            {posts.map((ele) => {

                return (

                    <div key={ele.id}>
                        {ele.user_id}
                    </div>
                )
            })}
            Hello
        </div>
    )

}

export default TestingPost
