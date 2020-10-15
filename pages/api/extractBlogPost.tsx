const extractor = require('unfluff')
import { NextApiRequest, NextApiResponse } from "next"

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const blogPost = {
    url: "https://kentcdodds.com/blog/how-to-react"
    // url: "https://www.jamesqquick.com/blog/top-5-pieces-of-advice-for-aspiring-and-learning-developers"
  }

  fetch(blogPost.url).then(async function (response) {
    // Fetch text from site
    const res = await response.text();
    return res;
  }).then(async function (data) {
    // This is the JSON from our response
    const extractedData = await extractor(data)
    // console.log(extractedData)

    // Send response
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(extractedData))
  }).catch(function (err) {
    // There was an error
    console.warn('Something went wrong.', err);

    res.statusCode = 418
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({
      IMA: 'teapot'
    }))
  });
}