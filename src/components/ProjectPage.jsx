import React, {Fragment, useState, useEffect} from "react";
import ProjectList from "./ProjectList";
import Project from "./Project";
import { projectAPI } from './ProjectApi'

const ProjectPage = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(undefined)
    const [currentPage, setCurrentPage] = useState(1)

    const handleMoreClick = () => {
        setCurrentPage(currentPage => currentPage + 1)
    }

    // const saveProject = (project) => {
    //     let updatedProject = project.map((p) => {
    //         return p.id === project.id ? project : p
    //     })
    //     setProjects(updatedProject)
    // }

    useEffect(() =>{
        const loadProjects = async() =>{
            setLoading(true);
            try{
                const data = await projectAPI.get(currentPage);
                if(currentPage === 1){
                    setProjects(data);
                }else{
                    setProjects((projects) => [...projects, ...data])
                }
            }catch(e){
                if(e instanceof Error){
                    setError(e.message)
                }
            }finally{
                setLoading(false)
            }
        }
        loadProjects()
    }, [currentPage])

    const saveProject = (project) =>{
        projectAPI.put(project)
        .then((updatedProject) => {
            let updatedProjects = projects.map((p) => {
                return p.id === project.id ? new Project(updatedProject) : p
            })
            setProjects(updatedProjects)
        })
        .catch((e)=> {
            if(e instanceof Error){
                setError(e.message)
            }
        })
    }
    
    return(
        <Fragment>
            <h1>Project</h1>
            {error && (
                <div className="row">
                    <div className="card large error">
                        <section>
                            <p>
                                <span className="icon-alert inverse"></span>
                                {error}
                            </p>
                        </section>
                    </div>
                </div>
            )}

            <ProjectList onSave={saveProject} projects={projects}/> 

            {!loading && !error && (
                <div className="row">
                    <div className="col-sm-12">
                        <div className="button-group fluid">
                            <button className="button default" onClick={handleMoreClick}>More ...</button>
                        </div>
                    </div>
                </div>
            )}
            {loading && (
                <div className="center-page">
                    <span className="spinner primary"></span>
                    <p>Loading...</p>
                </div>
            )}
        </Fragment>
    )
}
export default ProjectPage