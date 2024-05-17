import Resizer from "react-image-file-resizer";

export const resizeFile = async (file) => {
  return new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      512,
      512,
      "JPEG",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "file",
    );
  });
};
