import React, { Component } from 'react';
// import '../stylesheets/components/UserInfo.css';
import '../../stylesheets/main.css'; // for dev
import Button from '../atoms/Button.js';
import Loader from "../atoms/Loader.js";
import defaultAvatar from "../../images/default-avatar.png";

class UserInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            projects: null
        };
    }
    componentDidMount() {
        this.getUserInfo();
    }
    componentWillReceiveProps(nextProps) {
        if (this.state.user) {
            this.getOwnedProjects(nextProps.projects, this.state.user);
        }
    }
    getUserInfo = () => {
        // Get user ID from URL path, and retrieve user data from server
        const userId = this.props.match.params.id;
        this.props.getOneUser(userId, profile => {
            this.getOwnedProjects(this.props.projects, profile);
            this.setState({
                user: profile
            });
        });
    }
    getOwnedProjects = (allProjects, owner) => {
        if (allProjects.length > 0) {
            let ownedProjects = allProjects.filter(item => {
                return owner.projects.includes(item._id);
            });
            this.setState({
                projects: ownedProjects
            });
        }
    }
    handleClick = (e) => {
        this.props.history.push('/project/view/' + e.target.id);
    }
    renderInfo = (user, projects) => {
        if (user) {
            return (
                <div className='user-info'>
                    <div className='user-info-meta row'>
                        <p>User Profile</p>
                    </div>
                    <div className='row'>
                        <div>
                            <img 
                                key={user.avatar} 
                                src={user.avatar} 
                                onError={(e) => {
                                    e.target.src = defaultAvatar;
                                }} 
                                className="img-fluid avatar" 
                                alt="User Avatar" />
                            </div>
                        <div><h1>{user.displayName}</h1></div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <table>
                                <tr>
                                    <td>Username:</td>
                                    <td>{user.username}</td>
                                </tr>
                                <tr>
                                    <td>skillset:</td>
                                    <td>{user.skillset.map(item => {
                                        return <tr>{item}</tr>;
                                    })}</td>
                                </tr>
                            </table>
                        </div>
                        <div className='col'>
                            <h4>My Projects</h4>
                            <ul>
                                {(projects) ? (
                                    projects.map(item => {
                                        return (
                                            <li key={item._id}>
                                                <a id={item._id} onClick={this.handleClick}>
                                                    {item.title}
                                                </a>
                                            </li>
                                        ); 
                                    }) 
                                ) : (
                                    'No projects yet'
                                )}
                            </ul>
                        </div>
                    </div>
                    <div className='d-flex justify-content-around btn-section'>
                        {(this.props.user && user._id === this.props.user._id) ? 
                            (<Button label='Edit Profile' redirect='/user/edit/' />) : 
                            (<Button label={'Contact ' + user.displayName} redirect={'/contact/'+user._id} />)
                        }
                    </div>
                </div>
            );
        }
        else {
            return <Loader />
        }
        
    }
    render() {
        let user = this.state.user;
        let projects = this.state.projects;
        //console.log('Rendering UserInfo', user, projects, this.props.user);
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        {this.renderInfo(user, projects)}
                        <Button label='Back to main' />
                    </div>
                </div>
            </div>
        );
    }
}

export default UserInfo;