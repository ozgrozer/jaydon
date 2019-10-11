const path = require('path')
const sqlite3 = require('sqlite3')

const defaults = require('./defaults')

const unixTime = () => Math.round(+new Date() / 1000)

const dbPath = path.join(__dirname, '..', '..', `${defaults.site.dbName}.sqlite`)
const db = new sqlite3.Database(dbPath)

db.serialize(() => {
  db.run(`
    create table if not exists adminUsers
    (
      id integer primary key,
      username text,
      password text,
      apiKey text,
      createdAt integer,
      updatedAt integer
    )
  `)
  console.log('Create table: adminUsers')

  db.run(`
    create table if not exists domains
    (
      id integer primary key,
      domain text,
      createdAt integer,
      updatedAt integer
    )
  `)
  console.log('Create table: domains')

  db.run(`
    insert into adminUsers
    (username, password, createdAt)
    values
    ('root', '4813494D137E1631BBA301D5ACAB6E7BB7AA74CE1185D456565EF51D737677B2', '${unixTime()}')
  `)
  console.log('Insert record: adminUsers')
})

db.close()
