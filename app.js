window.addEventListener('load',()=> {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimeZone = document.querySelector('.location-timezone');

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position =>{
            console.log(position);
            long= position.coords.longitude;
            lat=position.coords.latitude;
            const proxy='https://cors-anywhere.herokuapp.com/';
            const api=`${proxy}https://api.darksky.net/forecast/27b1827b31e9a54f4882431cdba1f5f7/${lat},${long}`;

            fetch(api)
            .then(response =>{
                return response.json();
            })
            .then(data =>{
                console.log(data);
                const {temperature,summary,icon} =data.currently;
                //const {timezone} =data;

                // set DOM elements from the API
                temperatureDegree.textContent =temperature;
                temperatureDescription.textContent = summary;
                locationTimeZone.textContent=data.timezone;

                // set Icon
                setIcons(icon, document.querySelector('.icon'));


            });
        });
         
    }
    
    function setIcons(icon, iconID){
        const skycons=new Skycons({color: "white"});
        const currentIcon =icon.replace(/-/g,"_").toUpperCase();
        skycons.play();
        return skycons.set(iconID,Skycons[currentIcon]);

    }

});