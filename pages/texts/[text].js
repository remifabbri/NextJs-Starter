import { useEffect, useState } from 'react';
import fire from '../../config/firebase-config';
import Link from 'next/link'

const Text = (props) => {
  const [text, setText] = useState(null);
  
//   useEffect(() => {
//     fire.firestore()
//       .collection('OriginalText')
//       .doc(props.id)
//       .get()
//       .then(result => {
//         setText(result.data())
//       })
//   }, []);

//   console.log('text',text); 

  return (
    <div>
     <h2>{props.title}</h2>
      <p>
        {props.content}
      </p>
      <Link href="/">
        <a>Back</a>
      </Link>
    </div>
  )
}

export const getServerSideProps = async ({ query }) => {
    const content = {}
    console.log(query.text); 
    await fire.firestore()
      .collection('OriginalText')
      .doc(query.text)
      .get()
      .then(result => {
        console.log(result.data()); 
        content['title'] = result.data().title
        content['content'] = result.data().content
      });
    return {
      props: {
        title: content.title,
        content: content.content,
      }
    }
  }


export default Text