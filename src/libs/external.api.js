import config from "../config";

export const getYouTubeVideos = async (channelId) => {
    return fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=10&key=${config.youtube.key}`)
    .then(res => res.json())
    .then(data => {
        if(data.items) {
            return data.items
        }

        throw new Error(data.error);
    })
}
