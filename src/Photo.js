
function Photo (props) {
    // Access data with props.photo.{property}
    return(
        <li>
            <img src={`https://live.staticflickr.com/${props.photo.server}/${props.photo.id}_${props.photo.secret}.jpg`} alt={props.title} />
        </li>
    )
}

export default Photo;