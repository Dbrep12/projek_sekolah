import React from "react";
import { Link } from "react-router-dom";

const FormatDescription = (description) =>{
    return description.substring(0, 60) + " ... "
}

const ProjectCard = (props) => {
    const {project, onEdit} = props
    
    const handleEditClick = (projectBeingEdited) =>{
        onEdit(projectBeingEdited)
    }

    return(
        <div className="card">
            <img src={project.imageUrl} alt={project.name} />
            <section className="section dark">
                <Link to={"/projects/" + project.id}>
                    <h5 className="strong">
                        <strong>{project.name}</strong>
                    </h5>
                        <p>{FormatDescription(project.description)}</p>
                        <p>Budget : {project.budget.toLocaleString()}</p>
                </Link>
                    <button type="button" className="bordered" onClick={()=> handleEditClick(project)}>
                        <span className="icon-edit"></span>
                        edit
                    </button>
            </section>
        </div>
    )
}
export default ProjectCard