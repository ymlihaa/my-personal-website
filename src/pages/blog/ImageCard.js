const ImageCard = ({ className, attachmentsUrl }) => {
  const src = './attachments/' + attachmentsUrl.trim();
  return (
    <div className="w-full flex justify-center align-center">
      <img src={src} alt={attachmentsUrl} className="w-54 h-54" />
    </div>
  )
}

export default ImageCard;