const fixContent = require('./fixContent')

const indexHtmlContentGenerator = props => {
  const { domain } = props
  const str = `
    <!doctype html>
    <html lang="en">
    <head>
      <meta charset="utf-8" />
      <title>${domain}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no" />
      <style>
        html, body {
          height: 100%;
        }
        body {
          margin: 0;
          display: flex;
          text-align: center;
          align-items: center;
          justify-content: center;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
        }
        h1 {
          margin-top: 0;
          color: #a4b0be;
          font-size: 60px;
          margin-bottom: 50px;
        }
        a {
          color: #70a1ff;
          font-size: 18px;
          text-decoration: none;
        }
      </style>
    </head>
    <body>
      <div>
        <h1>${domain}</h1>
        <a href="https://github.com/ozgrozer/jaydon" target="_blank">
          Powered by Jaydon
        </a>
      </div>
    </body>
    </html>
  `
  const spaces = 4

  return fixContent({ str, spaces })
}

module.exports = indexHtmlContentGenerator
