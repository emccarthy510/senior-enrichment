import React, { Component } from 'react';
import StatefulCampuses from './StatefulCampuses';
//import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import StatefulStudents from './StatefulStudents';
import SingleStudent from './SingleStudent';
import SingleCampus from './SingleCampus';
import AddStudent from './AddStudent';

export default class Main extends Component {

constructor () {
    super();
    this.state = {};
}

render () {

    return (
       <Router>
            <div id="main" className="container-fluid">
                <div className="col-xs-2">
                 <Sidebar />
                </div>
                <div className="col-xs-10">
                    {/* <StatefulCampuses  /> */}
                    <Switch>
                   <Route exact path="/" component={StatefulCampuses} />
                   <Route exact path="/campuses" component={StatefulCampuses} />
                   <Route exact path="/students" component={StatefulStudents} />
                   <Route path="/students/:studentId" component={SingleStudent} />
                   <Route path="/campuses/:campusId" component={SingleCampus} />
                   <Route path="/addStudent" component={AddStudent} />
                    </Switch>
                </div>
            </div>
      </Router>
    )
}
    
}