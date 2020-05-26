import React from 'react';
import {Component} from 'react';
import CardList from './Components/CardList';
/*import {robots} from './Components/robots';*/
import SearchBox from './Components/SearchBox';
import Scroll from './Scroll';
import './App.css';
import ErrorBoundary from './Components/ErrorBoundary';


class App extends Component {

	constructor(){
		super();
		this.state= {
			robots: [],
			searchfield:'',
		}
	}

	componentDidMount() {
		fetch('https://jsonplaceholder.typicode.com/users')
		.then(response => response.json())
		.then(users => this.setState({robots:users}))		
	}

	onSearchchange =(event) => {
		this.setState({searchfield: event.target.value});
		//console.log(event.target.value);
	};

	render() {

		const filteredRobots = this.state.robots.filter(robot => {
			return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
		})
		if (this.state.robots.length === 0){
			return <h1>Loading</h1>	
		} 
		else{
			return (
				<div className='tc'>
					<h1 className='f1'>RoboFriends</h1>
					<SearchBox searchChange= {this.onSearchchange}/>
					<Scroll>
						<ErrorBoundary>
							<CardList robots = {filteredRobots}/>
						</ErrorBoundary>
					</Scroll>
				</div>
			)
		}
	}
}
export default App;