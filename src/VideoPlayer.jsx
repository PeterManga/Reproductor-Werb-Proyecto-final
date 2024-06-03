import React, { useEffect, useState, useRef } from 'react';
import cloudinary from 'cloudinary-video-player';
import 'cloudinary-video-player/cld-video-player.min.css';
import 'cloudinary-video-player/chapters';
import 'cloudinary-video-player/playlist';
import { GetPlaylistByID } from './services/apicalls';

const VideoPlayer = () => {
    const [datos, setDatos] = useState([]);
    const [playlist, setPlaylist] = useState([]);
    const videoRef = useRef(null);
    const id = "664c7dcab046b6a3c4226f49";

    useEffect(() => {
        const fetchPlaylist = async () => {
            try {
                const result = await GetPlaylistByID(id);
                setDatos(result.playlist);
                console.log(result)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchPlaylist();
    }, [id]);

    useEffect(() => {
        if (datos.length > 0) {
            const archivosPlaylist = datos.flatMap(archivo => archivo.archivos);
            const datosPlaylist = archivosPlaylist.map(datos => datos.archivoId.datos.public_id);
            const newPlaylist = datosPlaylist.filter(file => file !== null).map(file => ({
                publicId: file
            }));
            console.log(newPlaylist)
            setPlaylist(newPlaylist);
        }
    }, [datos]);

    useEffect(() => {
        if (playlist.length > 0 && videoRef.current) {
            const cld = cloudinary.videoPlayer(videoRef.current, {
                cloudName: 'decmk6sb6',
                playlistWidget: true,
                autoPlay: true,
                muted: true,
                AutoplayMode: 'always',
                controls: false,
                sourceTypes: ['webm/vp9', 'mp4/h265', 'auto']
            });

            const playlistOptions = {
                autoAdvance: true,
                repeat: true,
                muted: true,
                autoPlay: true,
            };

            cld.playlist(playlist, playlistOptions);

            return () => {
                cld && cld.dispose();
            };
        }
        
    }, [playlist]);

    const handleFullscreen = () => {
        if (videoRef.current) {
            videoRef.current.requestFullscreen();
        }
    };

    return (
        <div className="container d-flex align-content-center justify-content-center" onClick={handleFullscreen}>
            <video
                id="cld-video-player"
                className="cld-video-player"
                autoPlay
                ref={videoRef}
            />
        </div>
    );
};

export default VideoPlayer;
