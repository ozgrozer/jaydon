import axios from 'axios'

const connectApi = props => {
  const url = '/connect-api'
  const data = props
  data.version = '1'

  return new Promise((resolve, reject) => {
    axios
      .post(url, data)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

module.exports = connectApi
