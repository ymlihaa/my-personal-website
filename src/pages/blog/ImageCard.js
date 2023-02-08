const PostImage = ({ className, attachmentUrl }) => {
  return (
    <img className=" w-full h-96 md:h-auto object-cover md:w-48 rounded-t-lg md:rounded-none md:rounded-l-lg" src={require(`./attachments/${attachmentUrl.trim()}`)} alt="" />)
}

export default PostImage;
