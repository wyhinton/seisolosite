import RawSampleRow from "@interfaces/RawSampleRow";

class SampleData {
  id!: string;
  src!: string;
  tags!: string[];
  svgPath!: string;
  filename!: string;
  length!: number;
  composition: string;
  startTime: Date;
  endTime: Date;
  

  constructor(sampleDataRow: RawSampleRow) {
    const {
      filename,
      tags,
      composition,
      starTime: start,
      endTime: end,
      hour,
      svgPath,
      length, 
    } = sampleDataRow;
    const url = `${process.env.PUBLIC_URL}/Clips/` + filename;
    const defaultStartTime = new Date("1995-12-17T03:24:00");
    const defaultEndTime = new Date("1995-12-17T03:24:01");
    this.src = url;
    this.tags = tags.split(",");
    this.startTime = defaultStartTime;
    this.endTime = defaultEndTime;
    this.composition = composition;
    this.filename = filename;
    this.svgPath = svgPath;
    this.length = length; 
  }

  setPath = (path: string): void => {
    this.svgPath = path;
  };
}
export default SampleData;

