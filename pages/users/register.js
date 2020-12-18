import { useState } from 'react'; 
import fire from '../../config/firebase-config';
import { useRouter } from 'next/router';
import { useAuth } from '../../hooks/useAuth'

const Register = () => {
  const router = useRouter();
  const auth = useAuth();
  const [name, setname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passConf, setPassConf] = useState('');
  const [notification, setNotification] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (password !== passConf) {
      setNotification(
       'Password and password confirmation does not   match'
      )
      setTimeout(() => {
        setNotification('')
      }, 2000)
      setPassword('');
      setPassConf('');
      return null;
    }

    return auth.signUp({ name, email, password }).then(()=> {
        setname('');
        setEmail('');
        setPassword('');
        setPassConf('');
        router.push("/")
    })
  }

  const signUpWithGoogle = (e) => {
    e.preventDefault(); 
    return auth.signUpWithGoogle().then(() => {
      router.push('/');
    });
  }

  return (
    <div>
      <h1>Create new user</h1>
        {notification}

      <h2>Sign up with social média</h2>
      <button onClick={signUpWithGoogle}>Google</button>

      <form onSubmit={handleLogin}>
        Name: <input type="text" value={name} 
        onChange={({target}) => setname(target.value)} /> 
        <br />
        Email<input type="text" value={email} 
        onChange= {({target}) => setEmail(target.value)} />
        <br />
        Password: <input type="password" value={password} 
        onChange={({target}) => setPassword(target.value)} /> 
        <br />
        Password conf: <input type="password" value={passConf}    
        onChange={({target}) => setPassConf(target.value)} /> 
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Register