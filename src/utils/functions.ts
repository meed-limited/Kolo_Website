export const convertFileToBase64String = async (
  file: File,
  setBase64ImgString: React.Dispatch<React.SetStateAction<any>>
) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    setBase64ImgString(e.target?.result);
  };
  reader.readAsDataURL(file);
};
