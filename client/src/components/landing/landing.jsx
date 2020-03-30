import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FaGithub, FaLinkedinIn, FaAngellist, FaAddressCard } from 'react-icons/fa';
import './landing.css'
import { useMutation, useApolloClient } from 'react-apollo';
import { LOGIN_USER } from '../../graphql/mutations';

export default function Landing() {

    const [loginUser] = useMutation(LOGIN_USER);
    const client = useApolloClient();
    const history = useHistory();

    function handleDemo() {
        loginUser({
            variables: { email: 'alex@alex.com', password: 'password' }
        }).then(data => {
            const { token, loggedIn } = data.data.login;
            localStorage.setItem("auth-token", token);
            client.writeData({ data: { isLoggedIn: loggedIn } });
        });
        history.push("/");
    }

    return (
        <div className="landing">
            <header className="landing-header">
                <div className="landing-header-title">Odots</div>
                <div className="landing-header-links">
                    <div onClick={handleDemo}>Demo</div>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </div>
            </header>

            <section className="landing-content">

            </section>

            <footer className="landing-footer">
                    <p>Hi! I'm looking for a job. Check me out!</p>
                    <div className="links">
                        <a href="https://github.com/AlexanderDGeorge/Odots">
                            <FaGithub />
                        </a>
                        <a href="https://www.linkedin.com/in/alexander-george-410466151/">
                            <FaLinkedinIn />
                        </a>
                        <a href="https://angel.co/alexander-george-3">
                            <FaAngellist />
                        </a>
                        <a href="https://alexgeorge.dev">
                            <FaAddressCard />
                        </a>
                    </div>
            </footer>
        </div>
    )
}