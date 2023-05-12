import "./App.css"
import {getMovieList, searchMovie} from "./api"
import { useEffect, useState } from 'react'

const App = () => {
  const [popularMovies, setPopularMovies] = useState([])

  useEffect(() => {
    getMovieList().then((result) => {
      setPopularMovies(result)
    })
  }, [])

  const PopularMovieList = () => {
    return popularMovies.map((movie, i) => {
      return(
        <div key={i}>
          <div className="Movie-wrapper">
            <div className="Movie-title">{movie.title}</div>
            <img className="Movie-image" src={`${process.env.REACT_APP_BASEIMGURL}/${movie.poster_path}`}/>
            <div className="Movie-date">{movie.release_date}</div>
            <div className="Movie-rate">{movie.vote_average}</div>
          </div>
        </div>
      ) 
    })
  }

  const search = async(q) => {
    // console.log({q})
    if(q.length > 3){
      const query = await searchMovie(q)
      setPopularMovies(query.results)
      // console.log({query: query})
    }
  }

  // console.log({popularMovies: popularMovies})

  return (
    <div className="App">
      <header className="App-header">
        <h1>Tim Movie Search</h1>
        <input
          type="text"
          className="Movie-search"
          placeholder='Search movie..'
          onChange={ ({target}) => search(target.value)}  
        />
        <div className="Movie-container">
          <PopularMovieList />
        </div>
      </header>
    </div>
  );
}

export default App;
