export const uploadFile = ({ url, files, onProgress }) => {
  console.log(`Uploading ${files.length} file(s) to ${url} ...`)
  let progress = 0
  const interval = setInterval(() => {
    progress++
    onProgress(progress)
    if (progress === 100) {
      clearInterval(interval)
    }
  }, 30)
}
