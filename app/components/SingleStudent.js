import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import Bluebird from 'bluebird';
import axios from 'axios';
import AllCampuses from './AllCampuses'



export default class SingleStudent extends React.Component {
    
    constructor () {
        super();
        this.state = {
            student : {}
        };
    }

    fetchStudent(studentId) {
        const studentPath = `/api/students/${studentId}`
        const campusPath = `/api/students/${studentId}/campus`
        const paths = [studentPath, campusPath];
        Bluebird.map(paths, path => axios.get(path))
        .map(res => res.data)
        .spread((student, campus) => {
            student.campus = campus.name;
            console.log(student.campus);
             this.setState({ student });
        });
       
    }
     componentDidMount () {
        const studentId = this.props.match.params.studentId;
        this.fetchStudent(studentId);
     }
     componentWillReciveProps (nextProps) {
         const nextStudentId = nextProps.match.params.studentId;
         const currentStudentId = this.props.match.params.studentId;
         if (nextStudentId !== currentStudentId) {
            this.fetchStudent(nextStudentId)
         }
     }

     render () {
         const student = this.state.student;

         return (
             <div className="student">
                <h3>{ student.name }</h3>
                <p>{ student.email }</p>
                <p>{ student.campus }</p>
             </div>
         )
     }
} 