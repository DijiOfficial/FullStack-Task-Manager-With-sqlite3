const sqlite3 = require('sqlite3').verbose();

// BACKEND FILE FOR MY DATABASES QUERIES
const addTask = (task) => {
    // console.log(task);
    let db = new sqlite3.Database('db/taskdatabase.db');
    // db.run(`INSERT INTO movie (title, url, type, year) VALUES ("terminator", "enroule.jpg", "film", "sdlfn")`, function(err) {
    db.run(`INSERT INTO tasks (task) VALUES (?)`, [task.task], function(err) {
        if (err) {
        return console.log(err);
        }
        // get the last insert id
        // console.log(`A row has been inserted with rowid ${this.lastID}`);
    });

    // console.log(task)
    db.close();
};

const loadTasks = (req, res) => {
    // console.log("loading tasks");
    let sendData = {data: []};

    let db = new sqlite3.Database('db/taskdatabase.db', (err) => {
        if (err) {
        console.error(err.message);
        }
        // console.log('Connected to the movies database.');
    });
    db.serialize(() => {
        db.each(`SELECT * FROM tasks`, (err, row) => {
        if (err) {
            console.error(err.message);
        }
        // console.log(row)
        sendData.data.push(row)
        });
        // res.send(sendData)
    });

    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        // console.log(sendData)
        res.send(sendData)
        // console.log('Close the database connection.');
    });
};

const removeTask = (id) => {
    let db = new sqlite3.Database('db/taskdatabase.db');
    db.run(`DELETE FROM tasks WHERE id=(?)`, id.id, function(err) {
        if (err) {
        return console.log(err);
        }
    });
    // console.log(task)
    db.close();
    // delete from tasks where rowid=1;
}


exports.removeTask = removeTask;
exports.loadTasks = loadTasks;
exports.addTask = addTask;