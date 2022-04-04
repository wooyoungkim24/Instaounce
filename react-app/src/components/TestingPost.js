import { useEffect, useState } from "react"

function TestingPost() {

    const [posts, setPosts] = useState({});

    useEffect(() => {

        (async () => {
            const response = await fetch(`/api/posts`);
            const resPosts = await response.json();
            console.log('test', resPosts)
            setPosts(resPosts)
        })();
    }, [])

    return (
        <div>
            Hello
        </div>
    )

}

export default TestingPost
