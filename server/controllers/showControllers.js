import axios from 'axios';
import Movie from '../models/Movie.js';
import Show from '../models/Show.js';
import { inngest } from '../inngest/index.js';



// Api to get now playing movies from TMDB API
export const getNowPlayingMovies = async (req, res) => {
    try {
        const { data } = await axios.get('https://api.themoviedb.org/3/movie/now_playing',{
            headers: {
                Authorization: `Bearer ${process.env.TMDB_API_KEY}`
            }
        })

        const movies = data.results;
        res.json({success: true, movies: movies});
    } catch (error) {
        console.error(error);
        res.json({success: false, message: error.message});
    }
}

// API to add a new show to the database
export const addShow = async (req, res) => {
    try {
        const {movieId, showsInput, showPrice} = req.body;

        // Logic to add show to the database goes here
        let movie = await Movie.findById(movieId);
        if(!movie){
            // fetch movie details from TMDB API
            const [movieDetailsResponse, movieCreditsResponse] = await Promise.all([
                axios.get(`https://api.themoviedb.org/3/movie/${movieId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${process.env.TMDB_API_KEY}`
                        }
                    }
                ),
                axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits`,{
                    headers: {
                        Authorization: `Bearer ${process.env.TMDB_API_KEY}`
                    }
                })
            ]);
            const movieApiData= movieDetailsResponse.data;
            const movieCreditsData = movieCreditsResponse.data;

            // create new movie document
            const movieDetails = {
                _id: movieId,
                title: movieApiData.title,
                overview: movieApiData.overview,
                poster_path: movieApiData.poster_path,
                backdrop_path: movieApiData.backdrop_path,
                genres: movieApiData.genres,
                casts: movieCreditsData.cast,
                release_date: movieApiData.release_date,
                original_language: movieApiData.original_language,
                tagline: movieApiData.tagline || '',
                vote_average: movieApiData.vote_average,
                runtime: movieApiData.runtime
            }
            // add movie to the database if not exists
            movie = await Movie.create(movieDetails);

        }

        // const showsToCreate = [];
        // showsInput.forEach(showInput => {
        //     const showDate = showInput.date;
        //     showInput.time.forEach(time => {
        //         const dateTimeString = `${showDate}T${time}`;
        //         showsToCreate.push({
        //             movie: movieId,
        //             showDateTime: new Date(dateTimeString),
        //             showPrice,
        //             occupiedSeats: {}
        //         });
        //     });
        // });

        const showsToCreate = [];

    for (const showInput of showsInput) {
      const showDate = showInput.date;

      for (const time of showInput.time) {
        const showDateTime = new Date(`${showDate}T${time}`);

        // Check if same show already exists
        const exists = await Show.findOne({
          movie: movieId,
          showDateTime
        });

        if (!exists) {
          showsToCreate.push({
            movie: movieId,
            showDateTime,
            showPrice,
            occupiedSeats: {}
          });
        }
      }
    }

        // if(showsToCreate.length > 0){
        //     await Show.insertMany(showsToCreate);
        // }

        if (showsToCreate.length > 0) {
  try {
    await Show.insertMany(showsToCreate, { ordered: false });

  } catch (err) {

    // Duplicate key error — safe to ignore
    if (err.code !== 11000) {
      throw err;
    }
  }
}


        //  Trigger inngest event
        await inngest.send({
            name: 'app/show.added',
            data: {movieTitle: movie.title}
        })

        
        // res.json({success: true, message: 'Shows added successfully'});

        res.json({
            success: true,
            message: showsToCreate.length > 0
                ? "Shows added successfully"
                : "No new shows added (duplicate timings skipped)"
        });
        
    } catch (error) {
        console.error(error);
        res.json({success: false, message: error.message});
    }
}

// API to get all shows from the database
export const getShows = async (req, res)=>{
    try {
        const shows = await Show.find({showDateTime: {$gte: new Date()}}).populate('movie').sort({showDateTime: 1});
        // filter unique shows
        // const uniqueShows = new Set(shows.map(show => show.movie))


        const upcoming = shows.filter(show => (
            show.showDateTime >= new Date()
        ));

    // unique movies only
    const uniqueShows = new Set(upcoming.map(show => show.movie));
        
    res.json({success: true, shows: Array.from(uniqueShows)})
        // const shows = await Show.find().populate("movie");
        // res.json({ success: true, shows });
        
    } catch (error) {
        console.error(error);
        res.json({success: false, message: error.message});
    }
}


// API to get a single show from the database
export const getShow = async (req, res)=>{
    try {
        const {movieId} = req.params;
        // get all upcoming shows for the movie
        const shows = await Show.find({movie: movieId, showDateTime: {$gte: new Date()}});
        // const shows = await Show.find();
        // console.log(shows);
        const movie = await Movie.findById(movieId);
        const dateTime = {};
        
        
        shows.forEach(show => {
            // const date = show.showDateTime.toISOString().split("T")[0];
            const date = show.showDateTime.toLocaleDateString("en-CA");
            if(!dateTime[date]){
                dateTime[date] = [];
            }
            dateTime[date].push({ time: show.showDateTime, showId: show._id})  ;
        });  
        res.json({success: true, movie, dateTime});    
    } catch (error) {
        console.error(error);
        res.json({success: false, message: error.message});
    }
}
