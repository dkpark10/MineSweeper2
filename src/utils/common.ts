export const isMobile = () => {
  return /iPhone|iPad|iPod|Android/i.test(window.navigator.userAgent);
}