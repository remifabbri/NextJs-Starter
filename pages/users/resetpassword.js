import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../hooks/useAuth';
const ResetPasswordForm = () => {
    const [email, setEmail] = useState('');
    const [notify, setNotification] = useState('');
    const auth = useAuth();
    const router = useRouter();
    
    const onSubmit = (e) => {
        e.preventDefault();

        auth.sendPasswordResetEmail(email)
        .then(()=>{
            console.log("before router.push()")
            debugger
            router.push('/users/login');
        })
    };

    return (
        <div>
            <h1>Reset Password</h1>
            {notify}
            <form onSubmit={onSubmit}>
                Email
                <input type="text" value={email} 
                onChange= {({target}) => setEmail(target.value)} />
                <br />
                <button type="submit">Send Email</button>
            </form>
        </div>
    );
};
export default ResetPasswordForm;