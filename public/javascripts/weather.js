const input = document.getElementById("cityInput")
const btn = document.getElementById("knowWeatherBtn")
const line = document.getElementById("line")
const getdata = () =>{
    return new Promise((resolve,reject)=>{
        console.log("fetching weather data...")
        setTimeout(async()=>{
            let data = await fetch(`http://api.weatherapi.com/v1/current.json?key=ec5b58a0f5b045d1b7e123216250601&q=${input.value}&aqi=yes`)
            let response = await data.json()
            line.innerText = `Temperature of ${input.value} is ${response.current.temp_c}°C`
        })
    })
}
btn.addEventListener("click",()=>{
    getdata()
})