import React, { useState, useEffect} from "react";
import {useStoreActions, useStoreState} from "@hooks";
import classNames from "classnames";
import {Pane} from "evergreen-ui";
import Sound, {ReactSoundProps  } from 'react-sound';
import "./Sample.scss";
import sf from "./s1.wav"
import ReactAudioPlayer from 'react-audio-player';
import ReactPlayer from 'react-player'
import IXDrop from "@components/IXDrop";
import { env } from "process";

interface SampleProperties{
  url?: string
  label?: string
}


const Sample = ({url, label}: SampleProperties): JSX.Element =>{
// const [status, setStatus] = useState<ReactSoundProps['playStatus']>('PLAYING');
function statusLabel(status: ReactSoundProps['playStatus']): string {
    switch(status) {
      case 'STOPPED':
        return 'PLAY';
      case 'PLAYING':
        return 'STOP';
      default:
        return 'STOP';
    }
  }
const [playing, setPlaying] = useState(false)
  return(
    <div onClick = {(e)=>{setPlaying(!playing)}} className = {"sample-container"}>
      {label}
      <ReactPlayer
      playing= {playing}
      width = {10}
      height = {10}
      url={`${process.env.PUBLIC_URL}/Samples/s1.wav`} />
      <img src  = {`${process.env.PUBLIC_URL}/SampleShape2.svg`}></img>
    </div>
  )
}



export default Sample

