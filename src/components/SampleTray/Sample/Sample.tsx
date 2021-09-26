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
import Waveform from "./Waveform";
import SampleData from "@classes/SampleData";

interface SampleProperties{
  data: SampleData
  url?: string
  label?: string
}


const Sample = ({data, url, label}: SampleProperties): JSX.Element =>{

const [sampleProgress, setSampleProgress] = useState(0.0)
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
      <PlayHead distance={sampleProgress}/>
      <ReactPlayer
      playing= {playing}
      width = {10}
      height = {10}
      progressInterval ={1}
      onProgress = {({played, playedSeconds, loaded, loadedSeconds})=>{
      //   console.log(
      //   played, 
      //   playedSeconds,
      //   loaded,
      //   loadedSeconds,
      // )
      setSampleProgress(played)
    }}
      url={data.src} />
      
      <Waveform path = {data.path}></Waveform>
    </div>
  )
}

const PlayHead = ({distance}:{distance: number}): JSX.Element =>{
  // console.log(distance);
  
  const playHeadStyle = {
    position: "absolute",
    left: `${distance*100}%`,
    width: 2,
    height: "100%",
    backgroundColor: "red",
  } as React.CSSProperties

  return( 
    <div style = {playHeadStyle}>
      {distance}
    </div>
  )
}


export default Sample

