import React, { useEffect, useState } from 'react';
import logo from '../../assets/devcode.png'
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from "react-helmet";
import {useLocation} from "react-router-dom";

const Register = () => {
    const [fName, setFName] = useState("");
    const [lName, setlName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const search = useLocation().search;
    const redirectURI = new URLSearchParams(search).get('redirect');

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('auth-token')) {
            navigate('/projects');
        }
    }, []);

    const register = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:8181/api/auth/createuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password, fname: fName, lname: lName })
        });
        const json = await response.json();
        if (json.error) {
            toast.error(json.error);
        }
        else if (json.errors) {
            json.errors.forEach(error => {
                toast.error(error.msg);
            });
        }
        else if (json.authtoken) {
            localStorage.setItem('auth-token', json.authtoken);
            // toast.success(json.authtoken);
            if (!redirectURI) {
                navigate('/projects');
            }
            else {
                navigate(`/newproject?redirect=${redirectURI}`);
            }
        }
        else {
            toast.error('Internal Server Error');
        }
    }
  return (
    <>
        <Helmet>
            <title>DevCode | Register</title>
            <meta name="description" content="Register for a new Devcode account here." />
        </Helmet>
        <section className="bg-black">
            <div className="nav">
                <Navbar />
            </div>
            <div className="flex mt-[-90px] flex-col bg-black items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-white">
                    <img className="w-32 h-32 mr-2" src={logo} alt="logo" />
                    {/* DevCode */}
                </a>
                <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
                            Register to your account
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={register}>
                            <div>
                                <label htmlFor="fname" className="block mb-2 text-sm font-medium text-white">First Name</label>
                                <input value={fName} onChange={(e) => setFName(e.target.value)} type="text" name="fname" id="fname" className="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="Elon" required="" />
                            </div>
                            <div>
                                <label htmlFor="lname" className="block mb-2 text-sm font-medium text-white">Last Name</label>
                                <input value={lName} onChange={(e) => setlName(e.target.value)} type="text" name="lname" id="lname" className="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="Musk" required="" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">Your email</label>
                                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" className="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="name@company.com" required="" />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">Password</label>
                                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" className="sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" required="" />
                            </div>
                            <button type="submit" className="w-full text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800">Register</button>
                            <p className="text-sm font-light text-gray-400">
                                Already Have an account? <Link to={redirectURI?`/login?redirect=${redirectURI}`:'/login'} className="font-medium hover:underline text-primary-500">Sign In</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer toastStyle={{ backgroundColor: "#202d40", color: 'white' }} />
            <Footer />
        </section>
    </>
  )
}

export default Register