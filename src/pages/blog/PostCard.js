
import React, { useState, useEffect } from 'react';
import Markdown from "markdown-to-jsx";
import { removePrefix, removePrefixAndSuffix } from '../../utils/stringOperation';
import { extractContent, extractAttachments } from '../../utils/dataTransform';
import ImageCard from './ImageCard';
const PostCard = () => {
  const [posts, setPosts] = useState([])

  const fetchAllMarkdown = () => {
    const tempMarkdownFiles = require.context('./notes/', false, /\.md$/);
    tempMarkdownFiles.keys().map((docName) =>
      import(`./notes/${removePrefix(docName)}`)
        .then(res =>
          fetch(res.default)
            .then(response => response.text())
            .then(response => {
              const o = {
                "docName": removePrefixAndSuffix(docName),
                "content": extractContent(response),
                "attachments": extractAttachments(response)

              }
              console.log(response)
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
        <div key={index} className="h-44 w-44 m-4 border-solid	border-gray-50 rounded-md shadow-md flex flex-col align-center justify-center">
          <span className="block p-1 text-center font-sans text-lg text-xl font-bold " >{post.docName}</span>
          <div>
            <Markdown
            >{post.content}</Markdown>
          </div>
          {
            post.attachments.map((src) =>
              <ImageCard key={src} attachmentsUrl={src} />
            )
          }
        </div>
      ))}
    </div>
  )
}

export default PostCard;