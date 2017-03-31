import React from 'react';
import ReactDOM from 'react-dom';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import Navbar from 'react-bootstrap/lib/Navbar';
import Button from 'react-bootstrap/lib/Button';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import InputGroup from 'react-bootstrap/lib/InputGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
// import SimpleMap from './Container.js';
import fetch from 'node-fetch';
import keys from '../../key.js';

const navList = [
  { name: 'Bookmarks', url: '#'},
  { name: 'Contact', url: 'huiquanlu@gmail.com'}
]

class MyNavBar extends React.Component {
  render() {
    return(
      <Navbar  style={{marginBottom:'0px'}}>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">Chaser</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav bsStyle="tabs" activeKey="1">
          {this.props.list.map((e, i) =>
              (
                <NavItem key={i} href={e.url}>
                  {e.name}
                </NavItem>
              )
          )}
        </Nav>
      </Navbar>);
  }
}

class SearchBar extends React.Component {
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      inputValue: ''
    };
  }
  handleChange(event) {
    this.setState({
      inputValue: event.target.value
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    let reg = /^\d{1,5}$/g;
    if(reg.test(this.state.inputValue)){
      fetch('https://api.translink.ca/RTTIAPI/V1/stops/'+this.state.inputValue+'?apiKey='+keys['TRANSLINK_API_KEY'], {headers: {accpet: 'application/JSON'}})
        .then( (res) =>{
          console.log(res.json());
          return res.json();
        })
    } else {
      alert('Invalid input');
    }
  }
  render() {
    const style = {
      position: 'absolute',
      top: '60px',
      left: '20%',
      width: '60%',
      zIndex: '99'
    }
    return(
      <form onSubmit={this.handleSubmit}>
        <InputGroup style={style}>
          <FormControl type="text" placeholder="Enter bus # or code" onChange={this.handleChange} />
          <InputGroup.Addon>
            <Glyphicon glyph="search" />
          </InputGroup.Addon>
        </InputGroup>
      </form>
    )
  }
}

export default class App extends React.Component {
  render() {
    return (
      <div>
        <MyNavBar list={navList} />
        <div style={{textAlign: 'center',width:'100%'}}>
          <SearchBar />
        </div>
      </div>);
  }
}
