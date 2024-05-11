const validFileExtensions = { image: ['jpg', 'gif', 'png', 'jpeg', 'svg', 'webp'] };

export const isValidFileType = (
  fileName: string,
  fileType: keyof typeof validFileExtensions
) => {
  if (fileName) {
    return validFileExtensions[fileType].indexOf(String(fileName.split('.').pop())) > -1;
  }
  return false;
};
