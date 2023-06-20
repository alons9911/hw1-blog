import React, {useState} from "react";
import Layout from "../components/Layout";
import Router from "next/router";
import {Md5} from 'ts-md5';


const Signup: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");

    const onSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const hash = Md5.hashStr(password);
        const response = await fetch('/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, hash, email, name}),
        });
        if (response.ok) {
            console.log('Sign up successful!');
            await Router.push("/login");

        } else {
            const errorData = await response.json();
            const errorMessage = errorData.error;
            console.log('Sign up failed. Error:', errorMessage);
        }
    }

    const onUsernameChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const onPasswordChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const onEmailChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const onNameChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };
    return (
        <Layout>
            <div>
                <h1>Sign Up</h1>
                <form onSubmit={onSubmit} style={{display: 'flex', flexDirection: 'column'}}>
                    <div style={{display: 'flex', marginBottom: '1rem'}}>
                        <label htmlFor="username" style={{marginRight: '0.5rem', width: '80px'}}>Username:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={onUsernameChange}
                            //className={errorFlag && errors.username_errors && errors.username_errors.length > 0 ? 'error' : ''}
                            style={{flex: 1, maxWidth: '200px'}}
                        />
                        {/*errorFlag && errors.username_errors && (
                            <span className="error-message">
                {errors.username_errors
                    .map(error => errors_dict.username_errors[error])
                    .join(', ')}
              </span>
                        )*/}
                    </div>
                    <div style={{display: 'flex', marginBottom: '1rem'}}>
                        <label htmlFor="password" style={{marginRight: '0.5rem', width: '80px'}}>Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={onPasswordChange}
                            //className={errorFlag && errors.password_errors && errors.password_errors.length > 0 ? 'error' : ''}
                            style={{flex: 1, maxWidth: '200px'}}
                        />
                        {/*errorFlag && errors.password_errors && (
                            <span className="error-message">
                {errors.password_errors
                    .map(error => errors_dict.password_errors[error])
                    .join(', ')}
              </span>
                        )*/}
                    </div>
                    <div style={{display: 'flex', marginBottom: '1rem'}}>
                        <label htmlFor="email" style={{marginRight: '0.5rem', width: '80px'}}>Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={onEmailChange}
                            //className={errorFlag && errors.email_errors && errors.email_errors.length > 0 ? 'error' : ''}
                            style={{flex: 1, maxWidth: '200px'}}
                        />
                        {/*errorFlag && errors.email_errors && (
                            <span className="error-message">
                {errors.email_errors
                    .map(error => errors_dict.email_errors[error])
                    .join(', ')}
              </span>
                        )*/}
                    </div>
                    <div style={{display: 'flex', marginBottom: '1rem'}}>
                        <label htmlFor="name" style={{marginRight: '0.5rem', width: '80px'}}>Name:</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={onNameChange}
                            //className={errorFlag && errors.name_errors && errors.name_errors.length > 0 ? 'error' : ''}
                            style={{flex: 1, maxWidth: '200px'}}
                        />
                        {/*errorFlag && errors.name_errors && (
                            <span className="error-message">
                {errors.name_errors
                    .map(error => errors_dict.name_errors[error])
                    .join(', ')}
              </span>
                        )*/}
                    </div>
                    <button type="submit" style={{padding: '0.5rem 1rem', width: '289px'}}>Sign Up</button>
                </form>
                <div>
                    {/* maybe change to alert */}
                    {/*signupFailMessage*/}
                </div>
            </div>

            <style jsx>{`
        .error {
          border: 1px solid red;
        }
        .error-message {
          color: red;
          margin-left: 0.5rem;
        }
      `}</style>
        </Layout>
    );
};

export default Signup;
