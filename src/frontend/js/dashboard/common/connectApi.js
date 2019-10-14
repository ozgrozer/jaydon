import axios from 'axios'

const connectApi = props => {
  const url = '/connect-api'
  const meta = props.meta
  const data = props.data
  meta.version = '1'
  const postData = { meta, data }

  return new Promise((resolve, reject) => {
    axios
      .post(url, postData)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

module.exports = connectApi
