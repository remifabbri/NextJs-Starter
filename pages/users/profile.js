import { useState } from 'react';
import fire from '../../config/firebase-config';
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useAuth } from '../../hooks/useAuth'
import utilStyles from '../../styles/utils.module.scss'

const profile = () => {
    const auth = useAuth();
    const router = useRouter();
    const user = auth.user; 
    // console.log("profile User", user);

    const handleLogout = () => {
        auth
        .signOut()
        .then(() => {
            router.push("/")
            // setNotification('Logged out')
            // setTimeout(() => {
            //     setNotification('')
                
            // }, 2000)
        })
    }

  if(!user){
    return (
      <div>Loading ...</div>
    )
  }

  return (
    <div>
      <h1>Profile</h1>
      
      <h2>Information du profile</h2>
      <p>Nom / Pseudo</p>
      <p>{user.name}</p>
      <p>Email</p>
      <p>{user.email}</p>

      <h2>Option de gestion</h2>
      <Link href="/users/resetpassword">
        <a>Changé le mot de passe de son compte</a>
      </Link>

      <button className={`${utilStyles.ButtonAhref}`} onClick={handleLogout}>Logout</button>
      {/* {notify}
      <form onSubmit={handleLogin}>
        Email<input type="text" value={email} 
        onChange= {({target}) => setEmail(target.value)} />
        <br />
        Password<input type="password" value={password} 
        onChange={({target}) => setPassword(target.value)} />
        <br />
        <button type="submit">Login</button>
      </form> */}
    </div>
  )
}

export default profile