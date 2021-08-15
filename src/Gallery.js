import Photo from './Photo'
import NoResults from './NoResults'


function Gallery (props) {
    // convert the array into another array to make the mean map function happy
    const results = Array.from(props.data)
    
    let photoList = results.map((item, i) =>
        <Photo key={i} photo={item} />
    )
    // Show sad message if there is nothing here
    if(photoList.length === 0 && !props.loading){
        photoList = <NoResults />
    }

    return(
        <article className="photo-container">
            <h3>{props.name}</h3>
            
            <ul>
                {photoList}
            </ul>
        </article>
    )
}

export default Gallery;