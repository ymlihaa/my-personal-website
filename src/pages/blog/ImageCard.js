const ImageCard = ({ className, attachmentUrl }) => {
  console.log('attachmentUrl', attachmentUrl.trim());

  const src = './pages/blog/attachments/' + attachmentUrl.trim()
  return (
    <div className="w-full flex justify-center align-center">
      <img src={src} alt={attachmentUrl} className="w-54 h-54" />
    </div>
  )
}

export default ImageCard;