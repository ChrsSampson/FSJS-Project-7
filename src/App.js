import './css/index.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {useEffect, useState} from 'react'
import axios from 'axios';
import {apiKey} from './config'

// Import Components
import Search from './Search';
import Nav from './Nav';
import Gallery from './Gallery'
import NotFound from './NotFound';

function App() {

  const getRecent = `https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=${apiKey}&per_page=24&format=json&nojsoncallback=1`
  const catQuery = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=cats&per_page=24&page=1&format=json&nojsoncallback=1`
  const carQuery = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=cars&per_page=24&page=1&format=json&nojsoncallback=1`
  
  
  const [photos, setPhotos] = useState('')
  const [loading, setLoading] = useState(true)
  const [keyword, setKeyword] = useState('no search')
  const [catPhotos, setCatPhotos] = useState('')
  const [carPhotos, setCarPhotos] = useState('')
  const [searchPhotos, setSearchPhotos] = useState('')

  // Load Pre-set catagory buttons
  function loadPreset () {
    axios.get(catQuery)
      .then(res => {
        setCatPhotos(res.data.photos.photo)
      })
      .catch(err => {
        console.log(err)
      })
    axios.get(carQuery)
      .then(res => {
        setCarPhotos(res.data.photos.photo)
      })
      .catch(err => {
        console.log(err)
      })
  }
  
  // Function to make call the URL parameter and SetPhotos to result
  function getData (url) {
    setLoading(true)
    axios.get(url)
      .then(res => {
        setPhotos(res.data.photos.photo)
        setLoading(false)
      })
      .catch(err => {
        console.log('Axios Error:', err)
      })
  }

  // Search: create a url and send it
  function search (keyword) {
    setLoading(true)
    const searchUrl = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${keyword}&per_page=24&page=1&format=json&nojsoncallback=1`
    setKeyword(keyword)
    axios.get(searchUrl)
      .then(res => {
        setSearchPhotos(res.data.photos.photo)
      })
      .catch(err => {
        console.log(err)
      })
  }

  // update keyword state when searching
  function changeKeyword (word) {
    setKeyword(word);
  }

  // Load data ONCE and ONLY FUCKING ONCE at load time
  useEffect(() => {
    getData(getRecent)
    loadPreset()
  // eslint-disable-next-line 
  }, [])

  return (
    <Router>
      <section className="container">
        <Search onSearch={search} keyword={changeKeyword}  />
        <Nav />
        <Switch>
          <Route exact path="/" render={() => <Gallery data={photos} loading={loading} name="Recent Photos" /> } />
          <Route path="/cars" render={() => <Gallery  data={carPhotos} loading={loading} name="Car Photos" /> } />
          <Route path="/cats" render={() => <Gallery  data={catPhotos} loading={loading} name="Cat Photos" /> } />
          <Route path="/search" render={() => <Gallery data={searchPhotos} loading={loading} name={`Search for: ${keyword}`} /> } />
          <Route component={NotFound} />
        </Switch>
      </section>
    </Router>
  );
}

export default App;
