import { main_fetch } from './fetchApi.js'

export async function listener(e){
	e.preventDefault();

	let city=document.querySelector('#search_city').value;
	document.querySelector('#search_city').value='';
	if (!city){
		return
	}

	let loading=document.getElementById('loading_gif')
	loading.style.display='block';
	await populateInfo(city);
	loading.style.display='none'
}


async function populateInfo(city){
	let result=document.querySelector('#results');
	result.textContent=''
	let weatherObject=await main_fetch(city)
	if (typeof(weatherObject)=='string'){
		result.textContent=weatherObject;
		return
	}

	let iconCode= weatherObject.weather[0].icon
	let iconSrc= `https://openweathermap.org/img/wn/${iconCode}@2x.png`
	
	result.innerHTML=	`<div id='result-header'> ${weatherObject.name}, ${weatherObject.sys.country} </div>
						<div id='result-main'>
							<div id='result-desc'> ${weatherObject.weather[0].main}</div>
							<img src=${iconSrc} id='result-icon'>
						</div>
						<div id='result-info'>
							<div>
								<p><strong>Temp.</strong> : ${convertToCelsius(weatherObject.main.temp)}℃<p>
								<p><strong>Sunrise</strong> : ${convertToTime(weatherObject.sys.sunrise*1000)}<p>
								<p><strong>Sunset</strong> : ${convertToTime(weatherObject.sys.sunset*1000)}<p>
							</div>
							<div>
								<p><strong>Wind flow</strong> : ${weatherObject.wind.speed} m/s at ${weatherObject.wind.deg} degs<p>
								<p><strong>Visibility</strong> : ${weatherObject.visibility}</p>
								<p><strong>Humidity</strong> : ${weatherObject.main.humidity}</p>
							<div>
						</div>`
}

function convertToCelsius(valueInKelvin){
	return (valueInKelvin-273.15).toFixed(2);
}

function convertToTime(time){
	let t=new Date(time);

	let array = [t.getHours()+'', t.getMinutes()+'', t.getSeconds()+''];
	array = array.map(x => (x.length==1 ? '0'+x : x));

	return array[0]+':'+array[1]+':'+array[2];
}