const fs = require("fs/promises");
const path = require("path");

// console.log(__dirname);
// console.log(__filename);

const filmsPath = path.join(__dirname, "..", "db", "films.json");

// console.log(filmsPath);

class FileOperations {
  constructor(filmsPath) {
    this.filmsPath = filmsPath;
  }

  async read() {
    try {
      return await fs.readFile(this.filmsPath, "utf-8");
    } catch (err) {
      console.log(err.message);
    }
  }

  async create(data) {
    return await fs.writeFile(this.filmsPath, JSON.stringify(data, null, 2));
  }

  async remove() {
    try {
      return await fs.unlink(this.filmsPath);
    } catch (err) {
      console.log(err.message);
    }
  }

  async update(newFilm) {
    try {
      const films = JSON.parse(await this.read());
      const newFilms = [...films, newFilm];

      return await fs.writeFile(
        this.filmsPath,
        JSON.stringify(newFilms, null, 2)
      );
    } catch (err) {
      console.log(err.message);
    }
  }

  async display() {
    console.log(await this.read());
  }
}

// function asyncHandler(func) {
//   return function () {
//     try {
//       func();
//     } catch (err) {
//       console.log(err.message);
//     }
//   };
// }

function asyncHandler(func) {
  try {
    return func;
  } catch (err) {
    console.log(err.message);
  }
}

const file = new FileOperations(filmsPath);

// file.display();

const data = [
  { id: "10", title: "Street kings", year: "2010" },
  { id: "20", title: "Garry Potter", year: "1999" },
  { id: "30", title: "Forest Gumb", year: "1990" },
];

// file.create(data);

asyncHandler(file.create(data));

// const newFilm = { id: "50", title: "Star Wars", year: "1980" };

// file.update(newFilm);

// file.remove();
