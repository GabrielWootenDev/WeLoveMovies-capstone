const knex = require("../db/connection");


// need to reduce critics in showReviews
function showReviews(movieId) {
  return knex("reviews as r")
  .select("*")
  .join("critics as c", "c.critic_id", "r.critic_id")
  .where({movie_id: movieId})
}


function showingAtTheater(movieId) {
  return knex("theaters as t")
    .select("*")
    .join("movies_theaters as mt", "mt.theater_id", "t.theater_id")
    .where({ movie_id: movieId }, { is_showing: true });
}

function listShowing() {
  return knex("movies as m")
    .select(
      "m.movie_id",
      "m.title",
      "m.runtime_in_minutes",
      "m.description",
      "m.image_url"
    )
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .where({ is_showing: true })
    .groupBy("m.movie_id");
}

function read(movieId) {
  return knex("movies").select("*").where({ movie_id: movieId }).first();
}

function list() {
  return knex("movies as m").select(
    "movie_id",
    "title",
    "runtime_in_minutes",
    "rating",
    "description",
    "image_url"
  );
}


module.exports = {
  read,
  list,
  listShowing,
  showingAtTheater,
  showReviews,
};
