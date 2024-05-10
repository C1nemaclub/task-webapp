const validFileExtensions = { image: ['jpg', 'gif', 'png', 'jpeg', 'svg', 'webp'] };

export const isValidFileType = (
  fileName: string,
  fileType: keyof typeof validFileExtensions
) => {
  return (
    fileName &&
    validFileExtensions[fileType].indexOf(String(fileName.split('.').pop())) > -1
  );
};
