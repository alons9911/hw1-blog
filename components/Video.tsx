import React, {useRef, useState} from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";
import {Player} from 'video-react';
import "node_modules/video-react/dist/video-react.css";


export type VideoProps = {
    link: string
};

const Video: React.FC<{ video: VideoProps }> = (video) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const ref = useRef(null);

    function handleClick() {
        const nextIsPlaying = !isPlaying;
        setIsPlaying(nextIsPlaying);

        if (nextIsPlaying && ref.current !== null) {
            ref.current.play();
        } else {
            ref.current.pause();
        }
    }

    return (
        <div>
            {/*<button onClick={handleClick}>
                {isPlaying ? 'Pause' : 'Play'}
            </button>
            <br/>
            <video
                width="250"
                ref={ref}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
            >
                <source
                    src={video.link}
                    type="video/mp4"
                />
            </video>*/}
            <Player
                playsInline
                src={video.link}
            />
            <br/>
        </div>
    );
};

export default Video;
