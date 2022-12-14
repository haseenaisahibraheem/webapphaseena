import React, { Component } from "react";
import { Link } from "react-router-dom";
import Like from "../commone/like";
import Table from "../commone/table";

class MoviesTable extends Component {
  columns = [
    {
      path: "title",
      lable: "Title",
      content: (movie) => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
    },
    { path: "genre.name", lable: "Genre" },
    { path: "numberInStock", lable: "Stock" },
    { path: "dailyRentalRate", lable: "Rate" },
    {
      key: "like",
      content: (movie) => (
        <Like islike={movie.liked} onClick={() => this.props.onLike(movie)} />
      )
    },
    {
      key: "delete",
      content: (movie) => (
        <button
          onClick={() => {
            this.props.onDelete(movie);
          }}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      )
    }
  ];
  render() {
    const { movies, sortColumn, onSort } = this.props;
    return (
      <Table
        data={movies}
        sortColumn={sortColumn}
        onSort={onSort}
        columns={this.columns}
      />
    );
  }
}

export default MoviesTable;
