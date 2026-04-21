export interface Weather {
    name: string;
    main: {
        temp: number;
        feels_like: number;
        humidity: number;
    };
    weather: {
        main: string;
        description: string;
        icon: string;
    }
    wind: {
        speed: number;
    }
}
