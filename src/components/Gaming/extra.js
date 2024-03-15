function modifyKeys(videosList) {
  const temp = videosList.map(eachVideo => ({
    id: eachVideo.id,
    thumbnailUrl: eachVideo.thumbnail_url,
    title: eachVideo.title,
    viewCount: eachVideo.view_count,
  }))

  return temp
}

export default modifyKeys
