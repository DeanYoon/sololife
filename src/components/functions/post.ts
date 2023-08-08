//  encode Image using base64
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

// change date data into 1s , 1h, 1d , 1m (ago)
export function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  if (diff < 1000 * 60) {
    return `${Math.floor(diff / 1000)}s ago`;
  } else if (diff < 1000 * 60 * 60) {
    return `${Math.floor(diff / (1000 * 60))}min ago`;
  } else if (diff < 1000 * 60 * 60 * 24) {
    return `${Math.floor(diff / (1000 * 60 * 60))}h ago`;
  } else if (diff < 1000 * 60 * 60 * 24 * 30) {
    return `${Math.floor(diff / (1000 * 60 * 60 * 24))}d ago`;
  } else {
    const formattedDate = new Date(date).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    return formattedDate;
  }
}
