import Nav from '../components/nav'
import { useState, useEffect } from "react";

export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library

  const res = await fetch('http://localhost:3000/api/extractBlogPost')
  const posts = await res.json()

  // By returning { props: posts }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      posts,
    },
  }
}

type Props = {
  posts: {
    text: string
    title: string
  }
}

interface IArticle {
  text: string;
  title: string;
}

export default function IndexPage({ posts }: Props) {

  const [article, setArticle] = useState<IArticle>(posts)
  const isBrowser = (): Boolean => typeof window !== "undefined"

  // if (isBrowser()) {
  const msg = new SpeechSynthesisUtterance();
  const voices = [];

  async function generateVoices() {
    const voi = await speechSynthesis.getVoices();
    voi.forEach(voice => voices.push(voice))
  }

  generateVoices()


  console.log(voices)
  function speakMessage() {
    msg.voice = voices.find(voice => voice.lang === "en")
    speechSynthesis.speak(article.text)
  }
  // }


  useEffect(() => {
    // console.log(posts.text)
    posts.text = posts.text.replace(/(?:\r\n|\r|\n)/g, '<br>');
    setArticle(posts)
  }, [posts])

  function createMarkup() { return { __html: article.text } };

  return (
    <div>
      <Nav />
      <div className="py-20">
        <h1 className="text-5xl text-center text-accent-1">
          {article.title}
        </h1>
        <button onClick={() => speakMessage()}>Speak</button>
        <div className="mt-8 w-3/5 mx-auto border-gray-700 border-dashed border-2 p-4" dangerouslySetInnerHTML={createMarkup()}>
        </div>
      </div>
    </div >
  )
}