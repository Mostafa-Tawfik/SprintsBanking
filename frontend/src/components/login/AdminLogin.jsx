import './login.scss'
import axios from 'axios';
import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/Auth-context';
import popAlert from '../../helpers/popAlert';

export default function Login() {

  const navigate = useNavigate()
  const {signIn} = useContext(AuthContext)

  // Error Message State
  const [errorMessages, setErrorMessages] = React.useState('');

  // used for storing user input
  const [loginUser, setLoginUser] = React.useState({
    email: '',
    hash_password: ''
  });


  // handle input change
  function handleChange(event) {
    const {name, value} = event.target
    setLoginUser(prev => {
      return {
        ...prev,
        [name]: value
      }
    })
  }


  function handleSubmit(login) {

    login.preventDefault();

    axios({
      url: 'api/admin/signin',
      method: 'POST',
      data: {
        'email': loginUser.email.toLowerCase().trim(),
        'hash_password': loginUser.hash_password.trim()
      }
    })
      .then((res) => {
        console.log('successfully logged in');
        console.log(res.data);
        localStorage.setItem('jwt', res.data.token);
        signIn(res);
        popAlert(`Welcome back admin`);
        navigate('/');
        return res.data;
      },
        (error) => {
          console.log(error);
          setErrorMessages('invalid username or password');
        }
      );
  }

  // Generate JSX code for login form
  const loginForm = (

    <main className='App-main'>
      <div className='login'>
        <div>
          {/* <h2 >Log In</h2> */}

          <form action="/" onSubmit={handleSubmit}>
            <p>
              <label>Email address</label><br/>
              <input 
                type="email"
                name="email"
                placeholder={'Enter your Email'}
                required
                autoFocus
                onChange={handleChange}
                value={loginUser.email}
              />
            </p>
            <p>
              <label>Password</label>
              <Link to="/forget-password"><label className="right-label "
              style={{color: "#007bff"}}>Forget password?</label></Link>
              <br/>
              <input 
                type="password" 
                name="hash_password"   
                placeholder={'Enter your Password'} 
                required
                onChange={handleChange}
                value={loginUser.hash_password}
              />
            </p>
            <div className="error">{errorMessages}</div>
            <p>
            <button id="sub_btn" type="submit" >Login</button>
            </p>
          </form>
              
        </div>
      </div>
    </main>

  )

  return (
    <div>
    {loginForm}
    </div>
  )
}
