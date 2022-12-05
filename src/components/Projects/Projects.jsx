import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import { Helmet } from "react-helmet";

const Projects = () => {
    const navigate = useNavigate();

    const [projectList, setProjectList] = useState([]);

    const getProjects = async() => {
        const authtoken = localStorage.getItem('auth-token');
        const response = await fetch('http://localhost:8181/api/auth/getprojects', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': authtoken
            }
        });
        const json = await response.json();
        setProjectList(json);
    }

    useEffect(() => {
        if (!localStorage.getItem('auth-token')) {
            navigate('/');
        }
        else {
            getProjects();
        }
    }, []);

    const collaborateClick = async (id, link) => {
        const authtoken = localStorage.getItem('auth-token');
        const response = await fetch('http://localhost:8181/api/auth/increaseclick', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': authtoken
            },
            body: JSON.stringify({ projectId: id })
        });
        const json = await response.json();
        // console.log(json);
        if (json.success) {
            // Simulate a mouse click:
            window.location.href = link;

            // Simulate an HTTP redirect:
            window.location.replace(link);
        }
    }
    
    return (
        <div className='bg-black'>
            <Helmet>
              <title>DevCode | Projects</title>
              <meta name="description" content="View All Public Projects Submissions on DevCode" />
            </Helmet>
            <section className="bg-black dark:bg-black">
            <div className="nav">
                <Navbar />
            </div>
            </section>
            <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
                {projectList.map((project) => {
                    return (
                        <div key={project._id} className="relative overflow-hidden shadow-lg bg-[#262626] p-0 rounded-xl">
                            {project.level === 1 && <span class="absolute font-extrabold bg-green-100 text-green-800 text-lg mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900">Beginner</span>}
                            {project.level === 2 && <span class="absolute font-extrabold bg-yellow-100 text-yellow-800 text-lg mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-200 dark:text-yellow-900">Intermediate</span>}
                            {project.level === 3 && <span class="absolute font-extrabold bg-purple-100 text-purple-800 text-lg mr-2 px-2.5 py-0.5 rounded dark:bg-purple-200 dark:text-purple-900">Advance</span>}
                            {project.level === 4 && <span class="absolute font-extrabold bg-red-100 text-red-800 text-lg mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900">Expert</span>}
                            <img className="w-full" src={project.image.url} alt="Mountain" />
                            <div className="px-6 py-4">
                                <div className="text-white font-bold text-xl mb-2">{project.name}</div>
                                <p className="text-gray-300 text-base">
                                {project.description}
                                </p>
                            </div>
                            <div className="px-6 pt-4 pb-2 mb-[55px]">
                                {project.languages.map((language, index) => {
                                    return (
                                        <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-black mr-2 mb-2">#{language}</span>
                                    );
                                })}
                                {/* <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-black mr-2 mb-2">#travel</span>
                                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-black mr-2 mb-2">#winter</span> */}
                            </div>
                            <button onClick={() => collaborateClick(project._id, project.repoLink)} href={project.repoLink} target="_blank" className='bg-purple-500 text-white bottom-0 p-4 flex w-full justify-center items-center absolute'>Collaborate</button>
                        </div>
                    );
                })}
            
            </div>
        </div>
    )
  }

export default Projects