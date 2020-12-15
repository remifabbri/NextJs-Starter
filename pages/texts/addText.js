import React, { useState } from 'react';
import fire from '../../config/firebase-config';
import Layout from '../../components/layout'
import Head from 'next/head'

export default function AddTranslate() {

    const [title, setTitle] = useState (''); 
    const [content, setContent] = useState ('');
    const [notification, setNotification] = useState('');
    
    const handleSubmit = (event) => { 
        event.preventDefault();

        fire.firestore()
        .collection('OriginalText')
        .add({
            title: title,
            content: content,
        });
        
        setTitle (''); 
        setContent (''); 

        setNotification('Blogpost created');

        setTimeout(() => {
            setNotification('')
        }, 2000)
    } 

    return (
      <Layout>
        <Head>
          <title>Nouveau Text</title>
        </Head>
        <h2>Add Text</h2>
        {notification}
        <form onSubmit={handleSubmit}>
            <div>
                Title<br />
                <input type="text" value={title} 
                    onChange={({target}) => setTitle(target.value)} />
            </div>
            <div>
                Content<br />
                <textarea value={content} 
                    onChange={({target}) => setContent(target.value)} />
            </div>
            <button type="submit">Save</button>
        </form>
      </Layout>
    )
  }