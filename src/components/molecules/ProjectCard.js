import React, { Component } from 'react';
// import '../stylesheets/components/ProjectCard.css';
import '../../stylesheets/main.css'; // for dev
import Dotdotdot from 'react-dotdotdot';
import Button from '../atoms/Button';
import Loader from "../atoms/Loader";


class ProjectCard extends Component {
    setProjects() {
    if (this.props.projects.length > 0) {
        const projects = this.props.projects.slice(0, this.props.limit);
        return projects.map((item,i) => {
            return (
            <div className="col-md-3 card"
                onClick={() => this.props.history.push('/project/view/' + item._id)}
                key={i}
                id={item._id}>
                <div className="card-body">
                    <p className="card-category">{item.category}</p>
                    <h4 className="card-title">{item.title}</h4>
                        <Dotdotdot clamp={4}>
                        <p className="card-text">
                            {item.description}</p>
                        </Dotdotdot>
                    <Button label="More" />
                </div>
            </div>
        );   
    })

      } else {
        return <Loader />
      }
    }
    render() {
        const partial = Boolean(this.props.limit);
        return (
            <div className={(partial) ? 
                ("container") : 
                ("container project-cards-full")}
            >
                <div className="row justify-content-center">
                    {this.setProjects()}
                </div>
                <div className="text-center">
                    {(partial) ? 
                        (<Button label="All projects" redirect="/project/view/"/>) :
                        (<Button label="Back to main" redirect="/" />)
                    }
                </div>
            </div>
        );
    }
}

export default ProjectCard;
