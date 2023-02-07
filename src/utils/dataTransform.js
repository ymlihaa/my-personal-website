const extractContent = str => {
  const startIndex = str.indexOf('---');
  const endIndex = str.lastIndexOf('---');

  if (startIndex === -1 || endIndex === -1 || startIndex >= endIndex) {
    return str;
  }

  return str.slice(endIndex + 3);
};


const extractAttachments = str => {
  const startIndex = str.indexOf('---');
  const endIndex = str.lastIndexOf('---');

  if (startIndex === -1 || endIndex === -1 || startIndex >= endIndex) {
    return null;
  }

  const data = str.slice(startIndex + 3, endIndex);
  const attachmentsIndex = data.indexOf('attachments:');

  if (attachmentsIndex === -1) {
    return null;
  }

  const attachmentsLine = data.slice(attachmentsIndex);
  const attachmentsMatch = attachmentsLine.match(/attachments:\s*\[(.*)\]/);

  if (!attachmentsMatch) {
    return null;
  }

  console.log(attachmentsMatch[1].split(','))

  return attachmentsMatch[1].split(',');
};

export { extractContent, extractAttachments };