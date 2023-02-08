
import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown'
import { removePrefix, removePrefixAndSuffix } from '../../utils/stringOperation';
import { extractContent, extractAttachments, extractPicks } from '../../utils/dataTransform';
import PostImage from './ImageCard';
const PostCard = () => {
  const [posts, setPosts] = useState([]);
  const [attachments, setAttachments] = useState({})
  const [picks, setPicks] = useState({});


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
                "attachments": extractAttachments(response),
                "picks": extractPicks(response)
              }
              const pick_temp = picks;
              const attachment_temp = attachments;
              attachment_temp[`${o.docName}`] = o.attachments;
              pick_temp[`${o.docName}`] = o.picks;

              setPosts(posts => [...posts, o])
              setPicks(pick_temp)
              setAttachments(attachment_temp)
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
        <div key={index} className="flex justify-center">
          <div className="flex flex-col md:flex-row md:max-w-xl rounded-lg bg-white shadow-lg">
            {
              Array.isArray(attachments[`${post.docName}`]) ?
                attachments[`${post.docName}`].map((attachment, index) => (
                  <PostImage className="w-24 h-24 m-4" key={index} docName={post.docName} attachmentUrl={attachment} />
                )) :
                null
            }
            <div className="p-6 flex flex-col justify-start">
              <h5 className="text-gray-900 text-xl font-medium mb-2">{post.docName}</h5>
              <div className="w-80	text-gray-700 text-base mb-4 text-justify truncate " >
                <ReactMarkdown>{post.content}</ReactMarkdown>
              </div>
              {
                Array.isArray(picks[`${post.docName}`]) ?
                  picks[`${post.docName}`].map((pick, index) => (
                    <p key={pick} className="px-4 py-1 m-1 rounded-full text-gray-500 bg-gray-200 font-semibold text-sm flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease">
                      {pick}</p>
                  )) :
                  null
              }
              <div className='flex align-center justify-center'>
                <button type="button" class="inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight  rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">Devamını oku </button>
              </div>
            </div>


          </div>

        </div>
      ))}
    </div>
  )
}

export default PostCard;




