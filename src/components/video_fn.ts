type Weather = 
    | "Rain"
    | "Clear"
    | "Snow"
    | "Mist"
    | "Clouds"
    | "Default";

type videoObjType = Record<Weather, string[]>

export function viduo_fn(videoObj:videoObjType, weather:Weather) {
    const video = videoObj[weather] ?? videoObj.Default;
    
    return (
        video[Math.floor(Math.random() * video.length)]
    )
}
