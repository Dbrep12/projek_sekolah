import React, {useState, useEffect} from "react";
import { projectAPI } from "./ProjectApi";
import { useParams } from "react-router";
import ProjectDetail from "./ProjectDetail";

const ProjectsPage = () =>{
    const [loading, setLoading] = useState(false)
    const [project, setProject] = useState(null)
    const [error, setError] = useState(null)

    const params = useParams;
    const id = Number(params.id)

    useEffect(()=> {
        setLoading(true);
        projectAPI
        .find(id)
        .then((data) =>{
            setProject(data)
            setLoading(false)
        })
        .catch((e) => {
            setError(e)
            setLoading(false)
        })
    }, [id])

    console.log(project)

    return(
        <div>
            <h1>Project Detail</h1>
            {loading && (
                <div className="center-page">
                    <span className="spinner-primary"></span>
                    <p>loading...</p>
                </div>
            )}

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
            
            {project && <ProjectDetail project={project} />}
        </div>
    )
}
export default ProjectsPage