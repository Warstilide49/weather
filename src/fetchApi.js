export async function main_fetch(city, country=""){
	let main= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=4ae90237a4015a7019be94de7d6dbf0c`, {mode: 'cors'})
	if (main.status==404)
		return 'City not found'
	
	//let temp_forcast=await fetch('')
	let object= await main.json();
	console.log(object)
	return object
}
