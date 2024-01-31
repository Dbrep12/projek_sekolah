import React, {useState} from "react";
import Project from './Project';


const ProjectForm = ({onSave, oncancel, project : initialProject}) =>{
    const [project, setProject] = useState(initialProject)

    const [errors,setErrors] = useState({
        name:"",
        description: "",
        budget: ""
    })

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(!isValid());
        console.log(isValid());
        // if(!isValid()) return onSave(project)
        if(isValid) return onSave(project)
    }

    const handleChange = (event) => {
        const {type, name, value, checked} = event.target;
        let updatedValue = type === "checkbox" ? checked : value;

        if(type === "number"){
            updatedValue = Number(updatedValue)
        }

        const change = {
            [name] : updatedValue
        }

        let updatedProject;
        setProject((p)=>{
            updatedProject = new Project({...p, ...change});
            return updatedProject
        })

        setErrors(() => validate(updatedProject))
    }

    const validate = (project) => {
        let errors = {name: "", description: "", budget: ""}

        if(project.name.length === 0){
            errors.name = "name is required";
        }

        if(project.name.length > 0 && project.name.length < 3){
            errors.name = "name need to be at least 3 characters";
        }

        if(project.description.length === 0){
            errors.description = "description is required";
        }

        if(project.budget === 0){
            errors.budget = "Budget must be more than 50";
        }

        return errors;
    }

    const isValid = () => {
        return(
            errors.name.length === 0 &&
            errors.description.length === 0 &&
            errors.budget.length === 0
        )
    }

    return(
        <form className="input-group vertical" onSubmit={handleSubmit}>
            <label htmlFor="name">Project name</label>
            <input type="text" name="name" placeholder="Enter Name" onChange={handleChange} value={project.name}/>

            <label htmlFor="description">Project Description</label>
            <textarea name="description" placeholder="Enter description" cols="10" rows="4" onChange={handleChange} value={project.description}></textarea>

            <label htmlFor="budget">Project Budget</label>
            <input type="number" name="budget" placeholder="Enter Budget" onChange={handleChange} value={project.budget}/>

            <label htmlFor="isActive">Active</label>
            <input type="checkbox" name="isActive" onChange={handleChange} value={project.isActive}/>

            <div className="input-group">
                <button className="primary bordered medium">Save</button>

                <span />
                
                <button className="danger bordered medium" onClick={oncancel}>cancel</button>
            </div>
        </form>
    )
}
export default ProjectForm