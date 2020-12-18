import { useState } from 'react';
import fire from '../../config/firebase-config';
import { useRouter } from 'next/router'
import { useAuth } from '../../hooks/useAuth'
import Link from 'next/link'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notify, setNotification] = useState('');
  const auth = useAuth();
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();

    return auth.signIn({email, password}).then(()=> {
        setEmail('')
        setPassword('')
        router.push("/")
    })
  }

  const signInWithGoogle = (e) => {
    e.preventDefault(); 
    return auth.signInWithGoogle().then(() => {
      router.push('/');
    });
  }

  return (
    <div>
      <h1>Login</h1>
      {notify}
      <h2>Sign in with social média</h2>
      <button onClick={signInWithGoogle}>Google</button>
      <form onSubmit={handleLogin}>
        Email<input type="text" value={email} 
        onChange= {({target}) => setEmail(target.value)} />
        <br />
        Password<input type="password" value={password} 
        onChange={({target}) => setPassword(target.value)} />
        <br />
        <button type="submit">Login</button>
      </form>
      <Link href="/users/resetpassword">
        <a>Mot de passe oublié ?</a>
      </Link>
    </div>
  )
}

export default Login