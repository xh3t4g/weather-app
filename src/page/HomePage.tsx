import { useState, useEffect, useRef} from "react"
import  type { Weather } from "../data/interfaces";
import css from '../css/HomePage.module.css';
import { Videoelements } from "../data/Videoelements";
import { viduo_fn } from "../components/video_fn";
import "../css/index.css"

export function HomePage() {

    const [city, setCity] = useState("Москва");
    const [weather, setWeather] = useState<Weather | null>(null);
    const [isInvalid, setIsInvalid] = useState(false);
    const [videoSrc, setVideoSrc] = useState(viduo_fn(Videoelements, 'Default'));
    const inputRef = useRef<HTMLInputElement>(null);
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

    useEffect(() => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ru`)
        .then(res => res.json())
        .then(data => {
            if (data.cod === '404') {
                setIsInvalid(true);
                return;
            }

            setIsInvalid(false);
            setWeather(data)

            switch (data.weather[0].main) {
                case 'Rain':
                    setVideoSrc(viduo_fn(Videoelements, "Rain"))
                    break;
                case 'Clouds':
                    setVideoSrc(viduo_fn(Videoelements, "Clouds"))
                    break;
                case 'Mist':
                    setVideoSrc(viduo_fn(Videoelements, "Clouds"))
                    break;
                case 'Snow':
                    setVideoSrc(viduo_fn(Videoelements, "Clouds"))
                    break;
                case 'Clear':
                    setVideoSrc(viduo_fn(Videoelements, "Clouds"))
                    break;

                default:
                    setVideoSrc(viduo_fn(Videoelements, "Default"))
            }
        })

    }, [city])

    useEffect(() => {
        const handleKeyDown = () => {
            inputRef.current?.focus();
        }

        window.addEventListener('keydown', handleKeyDown);

        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [])



    return <>

    <video key={videoSrc} autoPlay muted loop>
        <source src={videoSrc} type="video/mp4"/>
    </video>
    
        <div className={css["container"]} key={weather?.name}>
            <form className="form" onSubmit={(e) => {
                e.preventDefault();
                const value = e.target.inputCity.value.trim();
                if (value) {
                    setIsInvalid(false)
                    setCity(value)
                    if (inputRef.current) {
                        inputRef.current.value = '';
                    }
                }
            }}>
                <input ref={inputRef} type="text" name="inputCity" className={`${css["inputCity"]} ${isInvalid ? css['red'] : ''}`} placeholder="Введите город..." enterKeyHint="search" />
            </form>
            {weather && <>
                <span className={css["WeatherIcone"]}>
                    ⛅
                </span>

                <span className={css["WeatherTemp"]}>
                    {Math.round(weather.main.temp)}°
                </span>

                <div className={css["ContainerCity"]}>
                    <span className={css["TitleCity"]}>
                        {weather.name}
                    </span>

                    <span className={css["ParametrCity"]}>
                        {weather.weather[0].description}
                    </span>
                </div>

                <div className={css["ContainerParameters"]}>
                    <div className={css["card"]}>
                        <h5>Ощущается</h5>
                        <span>{Math.floor(weather.main.feels_like)}°</span>
                    </div>

                    <div className={css["card"]}>
                        <h5>Влажность</h5>
                        <span>{weather.main.humidity} %</span>
                    </div>

                    <div className={css["card"]}>
                        <h5>Ветер</h5>
                        <span>{Math.round(weather.wind.speed)} м/с</span>
                    </div>
                </div>
                    
            </>}
        </div>
    </>
}
