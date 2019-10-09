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
    ('root', 'dc76e9f0c0006e8f919e0c515c66dbba3982f785', '${unixTime()}')
  `)
  console.log('Insert record: adminUsers')
})

db.close()
