
import React, { useState, useEffect } from 'react';
import Markdown from "markdown-to-jsx";
const PostCard = () => {
  const [posts, setPosts] = useState([])

  const fetchAllMarkdown = () => {
    const tempMarkdownFiles = require.context('./notes/', false, /\.md$/);
    tempMarkdownFiles.keys().map((x) =>
      import(`./notes/${x.slice(2)}`)
        .then(res =>
          fetch(res.default)
            .then(response => response.text())
            .then(response => {
              const o = {
                "docName": x.slice(2),
                "content": response
              }
              setPosts(posts => [...posts, o])

            })
            .catch(err => console.log(err))
        )
    )
  }

  useEffect(() => {
    return () => {
      fetchAllMarkdown()
    }
  }, [])




  return (
    <div className='flex align-center justify-center'>
      {posts.map((post, index) => (
        <div key={index} className="h-44 w-44 m-4 border-solid	border-gray-50 rounded-md shadow-md flex align-center justify-center">
          <span className="block p-1 font-sans text-lg text-xl font-bold " >{post.docName}</span>
        </div>
      ))}
    </div>
  )
}

export default PostCard;