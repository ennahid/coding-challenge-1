import React from 'react';
import Repo from './components/Repo';
import moment from 'moment';
import './App.css';


export default class App extends React.Component
{

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      repos: [],
      height: window.innerHeight,
      page : 1
    }
    this.handleScroll = this.handleScroll.bind(this);
  }
  
  handleScroll() {
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    const windowBottom =   + window.pageYOffset;
    if (windowBottom >= (docHeight - 1000)) {
      !this.state.isLoading && this.getRepos(this.state.page);
    }
  }
  getRepos(page = 1)
  {
    this.setState({isLoading : true});
    let myDate = moment().subtract(30, 'days').format('YYYY-MM-DD');
    fetch(`https://api.github.com/search/repositories?q=created:>${myDate}&sort=stars&order=desc&page=${page}`)
        .then(response => response.json())
        .then(data => {
          this.setState({ repos: [...this.state.repos, ...data.items] }, () =>
          {
            this.setState({isLoading : false, page : this.state.page + 1})
          })
        })
        .catch(() => this.setState({ isLoading: false }))
  }
  componentDidMount()
  {
    window.addEventListener("scroll", this.handleScroll);
    this.getRepos();
  }
  render() {
    return (
      <div className="App">
        {
          this.state.repos && this.state.repos.map((data, index) => 
          <Repo
            key={index}
            name={data.name}
            description={data.description}
            image={data.owner.avatar_url}
            user_name={data.owner.login}
            issues={data.open_issues}
            stars={data.stargazers_count}
            date={data.created_at}
          />
          )
        }
        {this.state.isLoading && (
          <h3>Loading...</h3>
        )}
      </div>
    );
  }
}

