window.addEventListener('load',()=>{
    let long;
    let lat;
    let temprature_des = document.querySelector('.temp-description');
    let timezone = document.querySelector('.location-timezone');
    let temp_deg = document.querySelector('.num');
    let temp_display = document.querySelector(".temp-display");
    let type = document.querySelector(".temp-display span");
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position=>{
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy ="https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/0372bda0e2df9e9c70690f6d190ebaf3/${lat},${long}`;

            fetch(api)
            .then(response =>{
                return response.json();
            })
            .then(data =>{
                console.log(data); 
                const {temperature, summary, icon} = data.currently;
                temp_deg.textContent =  temperature;
                temprature_des.textContent = summary;
                timezone.textContent = data.timezone;
                let celcius = (temperature - 32)* 5/9;
                setIcons(icon, document.querySelector(".icon"));
                temp_display.addEventListener('click', () => {
                if(type.textContent === 'F')
                {
                    temp_deg.textContent = Math.floor(celcius);
                    type.textContent = 'C';
                }else{
                    temp_deg.textContent = temperature;
                    type.textContent = 'F';
                }
            })
            })
            
        })
        function setIcons(icons, inconID)
        {
            const skycons = new Skycons({color: "white"});
            const currentIcon = icons.replace(/-/g, "_").toUpperCase();
            skycons.play();
            return skycons.set(inconID, Skycons[currentIcon]);
        }
    }
})