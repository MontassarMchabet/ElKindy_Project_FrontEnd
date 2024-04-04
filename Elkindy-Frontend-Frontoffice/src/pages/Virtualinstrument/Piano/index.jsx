import React, { useState, useEffect } from 'react'
import Layout from "../../../layouts/Layout";
import "./style.css";

import aSound from "./tunes/a.wav";
import wSound from "./tunes/w.wav";
import sSound from "./tunes/s.wav";
import eSound from "./tunes/e.wav";
import dSound from "./tunes/d.wav";
import fSound from "./tunes/f.wav";
import tSound from "./tunes/t.wav";
import gSound from "./tunes/g.wav";
import ySound from "./tunes/y.wav";
import hSound from "./tunes/h.wav";
import uSound from "./tunes/u.wav";
import jSound from "./tunes/j.wav";
import kSound from "./tunes/k.wav";
import oSound from "./tunes/o.wav";
import lSound from "./tunes/l.wav";
import pSound from "./tunes/p.wav";
import semicolonSound from "./tunes/b.wav";

const Piano = () => {
    const [volume, setVolume] = useState(0.5);
    const [showKeys, setShowKeys] = useState(true);
    const [activeKey, setActiveKey] = useState(null);

    const soundMap = {
        'a': aSound,
        'w': wSound,
        's': sSound,
        'e': eSound,
        'd': dSound,
        'f': fSound,
        't': tSound,
        'g': gSound,
        'y': ySound,
        'h': hSound,
        'u': uSound,
        'j': jSound,
        'k': kSound,
        'o': oSound,
        'l': lSound,
        'p': pSound,
        ';': semicolonSound
    };

    const playTune = (key) => {
        const audio = new Audio(soundMap[key]);
        audio.volume = volume;
        audio.play();
        setActiveKey(key);
        setTimeout(() => setActiveKey(null), 150);
    }

    const handleVolume = (e) => {
        setVolume(e.target.value);
    }

    const toggleKeys = () => {
        setShowKeys(!showKeys);
    }

    useEffect(() => {
        const handleKeyDown = (event) => {
            const key = event.key.toLowerCase();
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
            <div className="wrapper" style={{ width: "900px", margin: "auto", marginTop: "280px" }} >
                <header>
                    <h2 style={{ color: "white" }}>Playable PIANO</h2>
                    <div className="column volume-slider">
                        <span>Volume</span><input type="range" min="0" max="1" defaultValue={volume} step="any" />
                    </div>
                    <div className="column keys-checkbox">
                        <span>Show Keys</span><input type="checkbox" defaultChecked={showKeys} onChange={toggleKeys} />
                    </div>
                </header>
                <ul className="piano-keys">
                    <li className={`key white ${showKeys ? '' : 'hide'} ${activeKey === 'a' ? 'active' : ''}`} data-key="a" onClick={() => playTune('a')}><span>a</span></li>
                    <li className={`key black ${showKeys ? '' : 'hide'} ${activeKey === 'w' ? 'active' : ''}`} data-key="w" onClick={() => playTune('w')}><span>w</span></li>
                    <li className={`key white ${showKeys ? '' : 'hide'} ${activeKey === 's' ? 'active' : ''}`} data-key="s" onClick={() => playTune('s')}><span>s</span></li>
                    <li className={`key black ${showKeys ? '' : 'hide'} ${activeKey === 'e' ? 'active' : ''}`} data-key="e" onClick={() => playTune('e')}><span>e</span></li>
                    <li className={`key white ${showKeys ? '' : 'hide'} ${activeKey === 'd' ? 'active' : ''}`} data-key="d" onClick={() => playTune('d')}><span>d</span></li>
                    <li className={`key white ${showKeys ? '' : 'hide'} ${activeKey === 'f' ? 'active' : ''}`} data-key="f" onClick={() => playTune('f')}><span>f</span></li>
                    <li className={`key black ${showKeys ? '' : 'hide'} ${activeKey === 't' ? 'active' : ''}`} data-key="t" onClick={() => playTune('t')}><span>t</span></li>
                    <li className={`key white ${showKeys ? '' : 'hide'} ${activeKey === 'g' ? 'active' : ''}`} data-key="g" onClick={() => playTune('g')}><span>g</span></li>
                    <li className={`key black ${showKeys ? '' : 'hide'} ${activeKey === 'y' ? 'active' : ''}`} data-key="y" onClick={() => playTune('y')}><span>y</span></li>
                    <li className={`key white ${showKeys ? '' : 'hide'} ${activeKey === 'h' ? 'active' : ''}`} data-key="h" onClick={() => playTune('h')}><span>h</span></li>
                    <li className={`key black ${showKeys ? '' : 'hide'} ${activeKey === 'u' ? 'active' : ''}`} data-key="u" onClick={() => playTune('u')}><span>u</span></li>
                    <li className={`key white ${showKeys ? '' : 'hide'} ${activeKey === 'j' ? 'active' : ''}`} data-key="j" onClick={() => playTune('j')}><span>j</span></li>
                    <li className={`key white ${showKeys ? '' : 'hide'} ${activeKey === 'k' ? 'active' : ''}`} data-key="k" onClick={() => playTune('k')}><span>k</span></li>
                    <li className={`key black ${showKeys ? '' : 'hide'} ${activeKey === 'o' ? 'active' : ''}`} data-key="o" onClick={() => playTune('o')}><span>o</span></li>
                    <li className={`key white ${showKeys ? '' : 'hide'} ${activeKey === 'l' ? 'active' : ''}`} data-key="l" onClick={() => playTune('l')}><span>l</span></li>
                    <li className={`key black ${showKeys ? '' : 'hide'} ${activeKey === 'p' ? 'active' : ''}`} data-key="p" onClick={() => playTune('p')}><span>p</span></li>
                    <li className={`key white ${showKeys ? '' : 'hide'} ${activeKey === ';' ? 'active' : ''}`} data-key=";" onClick={() => playTune(';')}><span>;</span></li>
                </ul>
            </div>
        </Layout>
    )
}

export default Piano
