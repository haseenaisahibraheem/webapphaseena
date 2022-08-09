import React, { Component } from "react";
import ListGroup from "../commone/listGroup";
import Pagination from "../commone/pagination";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import { paginate } from "../utils/paginate";
import MoviesTable from "./moviesTable";
import _ from "lodash";
import { Link } from "react-router-dom";
import Search from "../commone/search";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    searchQuery: "",
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" }
  };
  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }

  hendaleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    //console.log(movies);
    this.setState({ movies });
  };

  hendaleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };
  handlePage = (page) => {
    this.setState({ currentPage: page });
  };
  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };
  handelSort = (sortColumn) => {
    this.setState({ sortColumn });
  };
  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  getPageData = () => {
    const {
      pageSize,
      selectedGenre,
      currentPage,
      sortColumn,
      searchQuery,
      movies: allMovies
    } = this.state;
    let filterd = allMovies;
    if (searchQuery) {
      filterd = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    } else if (selectedGenre && selectedGenre._id) {
      filterd = allMovies.filter((m) => m.genre._id === selectedGenre._id);
    }
    const sorted = _.orderBy(filterd, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, pageSize, currentPage);

    return { totalCount: filterd.length, data: movies };
  };
  render() {
    const { length: count } = this.state.movies;
    const {
      pageSize,
      selectedGenre,
      genres,
      currentPage,
      sortColumn,
      searchQuery
    } = this.state;

    const { totalCount, data: movies } = this.getPageData();
    if (count === 0) return <h3>There are No Movies in the database.</h3>;
    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={genres}
            selectedItem={selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <Link
            to="/movies/new"
            className="btn btn-primary"
            style={{ marginBottom: 20 }}
          >
            New Movies
          </Link>
          <h3>There are {totalCount} movies are available</h3>
          <Search value={searchQuery} onChange={this.handleSearch} />
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.hendaleLike}
            onDelete={this.hendaleDelete}
            onSort={this.handelSort}
          />
          <Pagination
            onPageChane={this.handlePage}
            pageSize={pageSize}
            currentPage={currentPage}
            itemCount={totalCount}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
