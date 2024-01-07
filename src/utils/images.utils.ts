const isFileImageCheck = (file: File): boolean => {
  const acceptedImageTypes = ["image/jpeg", "image/png"];

  return file && acceptedImageTypes.includes(file["type"]);
};

export const getBlobImageUrl = (file: File): string | null => {
  const isImage = isFileImageCheck(file);

  if (!isImage) return null;
  const url = URL.createObjectURL(file);

  return url;
};

export const imageToBase64 = async (file: File): Promise<string | null> => {
  const isImage = isFileImageCheck(file);

  if (!isImage) return null;

  return new Promise((resolve) => {
    const reader = new FileReader();
    console.log(reader);
    reader.addEventListener(
      "load",
      () => resolve(reader.result as string),
      false
    );
    reader.readAsDataURL(file);
  });
};
