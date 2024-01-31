import React, {useState} from "react"
import ProjectCard from "./ProjectCard"
import ProjectForm from "./ProjectForm"


const ProjectList = ({ projects, onSave }) => {
    const [projectBeingEdited, setProjectBeingEdited] = useState({})

    const handleEdit = (project) => {
        setProjectBeingEdited(project)
    }

    const cancelEditing = () =>{
        setProjectBeingEdited({})
    }
    return(
        <>
            <div className="row">
                {projects.map((project) =>{
                    return(
                        <div key={project.id} className="cols-sm">
                            {project === projectBeingEdited ? (
                                <ProjectForm onSave={onSave} oncancel={cancelEditing} project={project}/>
                            ) : (
                                <ProjectCard project ={project} onEdit={handleEdit}/>
                            )}
                        </div>
                    )
                    })
                }
            </div>
        </>
    )
}
export default ProjectList