import CompositionData from "@classes/🎻CompositionData";

const genearteDefaultCompositions = (): CompositionData =>{
    // const url = `${process.env.PUBLIC_URL}/`+"RECORDINGS/Bach Mov 2 v2.wav"
    const url = `${process.env.PUBLIC_URL}/`+"BACH2.mp3"
    const bachMovement1 = new CompositionData("Bach Movement 2", url)
    console.log(bachMovement1);
    return bachMovement1
}

const defaultCompositions: CompositionData[] = [genearteDefaultCompositions()]

export default defaultCompositions