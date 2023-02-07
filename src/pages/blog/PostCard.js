
import React, { useState, useEffect } from 'react';
import Markdown from "markdown-to-jsx";
import { removePrefix, removePrefixAndSuffix } from '../../utils/stringOperation';
import { extractContent, extractAttachments } from '../../utils/dataTransform';
import ImageCard from './ImageCard';
const PostCard = () => {
  const [posts, setPosts] = useState([]);
  const [attachments, setAttachments] = useState({})


  const fetchAllMarkdown = async () => {
    const tempMarkdownFiles = require.context('./notes/', false, /\.md$/);
    await tempMarkdownFiles.keys().map((docName) =>
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
              const temp = attachments;
              temp[`${o.docName}`] = o.attachments;
              setPosts(posts => [...posts, o])
              setAttachments(temp)
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
            Array.isArray(attachments[`${post.docName}`]) ?
              attachments[`${post.docName}`].map((attachment, index) => (
                <ImageCard key={index} docName={post.docName} attachmentUrl={attachment} />
              )) :
              null
          }

        </div>
      ))}
    </div>
  )
}

export default PostCard;