import React, { useState, useEffect } from 'react'
import Layout from "../../../layouts/Layout";
import './style.css'

import aSound from "./tunes/A_clap.wav";
import dSound from "./tunes/D_kick.wav";
import fSound from "./tunes/F_openhat.wav";
import gSound from "./tunes/G_boom.wav";
import hSound from "./tunes/H_ride.wav";
import jSound from "./tunes/J_snare.wav";
import kSound from "./tunes/K_tom.wav";
import lSound from "./tunes/L_tink.wav";
import sSound from "./tunes/S_hihat.wav";
import drumsImage from "./drums.png";

const Drums = () => {
    const [activeKey, setActiveKey] = useState(null);

    const soundMap = {
        'A': aSound,
        'S': sSound,
        'D': dSound,
        'F': fSound,
        'G': gSound,
        'H': hSound,
        'J': jSound,
        'K': kSound,
        'L': lSound
    }

    const playTune = (key) => {
        const audio = new Audio(soundMap[key]);
        audio.play();
        setActiveKey(key);
        setTimeout(() => setActiveKey(null), 150);
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            const key = event.key.toUpperCase();
            if (soundMap[key]) {
                playTune(key);
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [soundMap]);

    return (
        <Layout header={4}>
            <br /><br /><br /><br />
            <div className="containeronslol">
                <img src={drumsImage} />
            </div>
            <div className="boxsonslol">
                {Object.keys(soundMap).map((key, index) => (
                    <div className="lettersonslol" key={index} onClick={() => playTune(key)}>
                        <div className={`inneronslol ${activeKey === key ? 'active' : ''}`}>{key}</div>
                    </div>
                ))}
            </div>
        </Layout>
    )
}

export default Drums
