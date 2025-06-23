export default function Die(props){
    return <button 
        className={props.isHeld ? "isHeld" : ""} 
        onClick={() => props.hold(props.id)}
        aria-label={`Die with value${props.value},
        ${props.isHeld ? "held":"not Held"}`}
        aria-pressed={props.isHeld}>
    {props.value}</button>
}

