import React, { Component } from 'react';
import axios from 'axios';

export default class DeleteStudent extends Component {

  constructor (props) {
    super(props);
    this.state = {
      student: this.props.student,
      error: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount (props) {
    //console.log(this.state.student, "student inside DeleteStudent")

    //const student = this.state.student;
    // axios.get(`/api/student/${student.id}`)
    //   .then(res => res.data)
    //   .then(student => {
    //     this.setState({ student });
    //   });
  }

  handleChange (props) {
      console.log(this.state.student)
      const student = this.state.student;
    console.log("test");
    axios.delete(`api/students/${student.id}`)
    this.setState({ student: {} })

  }

  render () {

    const student = this.state.student;
    const handleChange = this.handleChange;
    

    return (

      <div className="deleteStudent">
                <button
                  className="selectDelete"
                  onClick={handleChange}>
                 X
                </button>
      </div>
    );
  }
}