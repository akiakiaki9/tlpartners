import { useEffect, useRef, useState } from "react";

export default function LoadVideo() {
    const videoRef = useRef(null);
    const [showVideo, setShowVideo] = useState(true);

    useEffect(() => {
        const video = videoRef.current;

        if (video) {
            video.play().then(() => {
                if (video.requestFullscreen) {
                    video.requestFullscreen();
                } else if (video.webkitRequestFullscreen) {
                    video.webkitRequestFullscreen();
                } else if (video.mozRequestFullScreen) {
                    video.mozRequestFullScreen();
                } else if (video.msRequestFullscreen) {
                    video.msRequestFullscreen();
                }
            }).catch(err => console.error("Ошибка автозапуска:", err));

            // Убираем видео после завершения
            video.onended = () => {
                setShowVideo(false);
            };
        }
    }, []);

    if (!showVideo) return null; // Если видео закончилось — скрываем его

    return (
        <div className="loadvideo">
            <video
                ref={videoRef}
                src="/videos/loadvideo1.mp4"
                autoPlay
                muted
            />
        </div>
    );
};