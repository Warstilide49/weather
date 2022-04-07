import "./style.css";
import Icon from "./imgs/Ghost.gif"

import { listener } from "./actions.js"

function initialize(){
	let body=document.body;
	body.append(createStartPage())
}

function createStartPage(){
	let container=document.createElement('div');
	container.id='start_page';

	container.innerHTML=`<h1>Weather Report</h1>
						<div id='search_container'>
							<div id='search_instructions'>Enter the name of the city</div> 
							<form>
								<input id='search_city' placeholder='Example: Mumbai' type='text' required>
								<button type='submit'>Submit</button>
							</form>
						</div>
						<img id='loading_gif' src=${Icon} >
						<div id='results'></div>
						<footer>Made by @warstilide49 for The Odin Project</footer>`

	let img=container.querySelector('#loading_gif')
	img.style.display='none'					
	let button=container.querySelector('button');
	button.addEventListener('click', listener)
	return container;
}

initialize()