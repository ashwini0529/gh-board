import React from 'react';
import _ from 'underscore';
import {Link} from 'react-router';

import Client from '../github-client';
import Loadable from './loadable.jsx';

const Dashboard = React.createClass({
  displayName: 'Dashboard',
  render() {
    const {data} = this.props;

    const items = _.map(data, (repo) => {
      const repoOwner = repo.owner.login;
      const repoName = repo.name;

      return (
        <div key={repo.id}>
          {repoOwner} /
          <Link to='viewRepo' params={{repoOwner, repoName}}>{repoName}</Link>
        </div>
      );
    });

    return (
      <div className='dashboard'>
        {items}
      </div>
    );
  }
});

const DashboardShell = React.createClass({
  displayName: 'DashboardShell',
  render() {
    return (
      <Loadable
        promise={Client.getOcto().user.repos.fetch()}
        renderLoaded={(data) => { return (<Dashboard data={data}/>); } }
        renderError={() => { return <span>Are you logged in?</span>; }}
      />
    );
  }
});

export default DashboardShell;
