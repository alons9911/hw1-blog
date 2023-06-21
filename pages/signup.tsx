import React, {useState} from "react";
import Layout from "../components/Layout";
import Router from "next/router";
import {Md5} from 'ts-md5';


const Signup: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");

    const verify_input = () => {
        let message = '';
        if (!username)
            message += '  - Username must not be empty\n';
        if (!password)
            message += '  - Password must not be empty\n';
        else if (password.length < 8)
            message += '  - Password must contains a least 8 characters\n';
        if (!email)
            message += '  - Email must not be empty\n';
        if (!name)
            message += '  - Name must not be empty\n';

        if (message !== '') {
            alert(`There are some problems or missing information in the form:\n${message}`);
            return false;
        }
        return true;
    }

    const onSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!verify_input())
            return;
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
            alert('Successfully signed up!')
            await Router.push("/login");

        } else {
            const errorData = await response.json();
            const errorMessage = errorData.message;
            console.log('Sign up failed. Error:', errorMessage);
            alert(`Sign up failed. Error: ${errorMessage}`)
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
                            style={{flex: 1, maxWidth: '200px'}}
                        />
                    </div>
                    <div style={{display: 'flex', marginBottom: '1rem'}}>
                        <label htmlFor="password" style={{marginRight: '0.5rem', width: '80px'}}>Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={onPasswordChange}
                            style={{flex: 1, maxWidth: '200px'}}
                        />
                    </div>
                    <div style={{display: 'flex', marginBottom: '1rem'}}>
                        <label htmlFor="email" style={{marginRight: '0.5rem', width: '80px'}}>Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={onEmailChange}
                            style={{flex: 1, maxWidth: '200px'}}
                        />
                    </div>
                    <div style={{display: 'flex', marginBottom: '1rem'}}>
                        <label htmlFor="name" style={{marginRight: '0.5rem', width: '80px'}}>Name:</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={onNameChange}
                            style={{flex: 1, maxWidth: '200px'}}
                        />
                    </div>
                    <button type="submit" style={{padding: '0.5rem 1rem', width: '289px'}}>Sign Up</button>
                </form>
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
