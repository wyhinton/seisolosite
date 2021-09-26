import WaveformData from "waveform-data"

export type CompositionTitle = "Bartok Movement 1" | "Bach Movement 1" | "Bach Movement 2"


class CompositionData{
    title!: CompositionTitle
    url!: string;
    waveFormData: WaveformData | undefined
    constructor(title: CompositionTitle, url: string) {
        this.title = title
        this.waveFormData
        this.url = url
    }

    buildWaveform(): Promise<WaveformData>{
        return getAudio(this.url).then(d=>{
          this.waveFormData = d
          return new Promise((resolve, reject)=>{
            resolve(d)
          })
        })
    }

}

export default CompositionData


const getAudio = (url: string): Promise<WaveformData>=>{
    // const audioContext = new AudioContext();
    const audioContext = new AudioContext();
    return fetch(url)
    .then(response => response.arrayBuffer())
    .then(buffer => {
      const options = {
        audio_context: audioContext,
        array_buffer: buffer,
        scale: 128
      };
  
      return new Promise((resolve, reject) => {
        WaveformData.createFromAudio(options, (err, waveform) => {
          if (err) {
            reject(err);
          }
          else {
            resolve(waveform);
          }
        });
      });
    })
  }