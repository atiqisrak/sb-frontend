export const siteConstants = {
  imageURL:
    typeof window !== "undefined"
      ? `${window.location.origin}/images/`
      : "http://127.0.0.1:3000/images/",
};
