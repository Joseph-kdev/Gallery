import './App.css';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Masonry from 'react-masonry-css';

const  ImageGallery= () => {
  const [searchItem, setSearchItem] = useState('')
  const [images, setImages] = useState([])
  const [searchPerformed, setSearchPerformed] = useState(false)
  const searchQuery = useRef('')

  const handleChange = (event) => {
    searchQuery.current = event.target.value
  }
  
  const search = (event) => {
    event.preventDefault()
    setSearchItem(searchQuery.current)
    setSearchPerformed(true)
  }

useEffect(() => {
    const requestUrl = `https://api.unsplash.com/search/photos?query=${searchItem}&per_page=10&client_id=${process.env.REACT_APP_UNSPLASH}`
    axios.get(requestUrl)
      .then(response => {
        setImages(response.data.results)
      })
      .catch(error => {
        console.error("error", error)
      })
}, [searchItem])

const breakPoints = {
  default: 3,
  1100: 2,
  700: 1
}

  return (
    <div>
      <form onSubmit={search} className='searchForm'>
        <input placeholder='search image' onChange={handleChange} className='searchBar'/>
      </form>
      {searchPerformed && images.length === 0 ? (
      <p className="notification">No results found for {searchItem}</p>
        ) : (
        <Masonry
        breakpointCols={breakPoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
        >
          {images.map(image => (
          <div key={image.id}>
          <img className='images' src={image.urls.small} alt={image.description} />
          </div>
          ))}
        </Masonry>
        )}
    </div>
   );
}

const App = () => {

  return ( 
    <ImageGallery />
   );
}

export default App;
