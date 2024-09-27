interface PreviewVideoProps {
    video: any
}

export default function PreviewVideo(props: PreviewVideoProps) {

    return (
        <video className="preview-vid" src={props.video} autoPlay={true} loop/>
    )
}