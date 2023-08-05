export const returnEncodedImage = (
  event: React.ChangeEvent<HTMLInputElement>
): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const file = event.target.files && event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const img = new Image();
        img.src = reader.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const MAX_WIDTH = 800;
          const scaleSize = MAX_WIDTH / img.width;
          canvas.width = MAX_WIDTH;
          canvas.height = img.height * scaleSize;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            const dataUrl = canvas.toDataURL("image/jpeg", 0.8);
            resolve(dataUrl); // Resolve the promise with the data URL
          } else {
            reject(new Error("Canvas context is not available"));
          }
        };
      };
      reader.onerror = (error) => {
        reject(error);
      };
    } else {
      reject(new Error("No file selected"));
    }
  });
};
