const express = require('express');
const axios=require(`axios`);
const cors=require(`cors`);
const app=express()
app.use(express.json())


const corsOptions={
    origin:"http://localhost:4200",
    optionSuccessStatus:200
}
app.use(cors(corsOptions))

app.post('/weather',(req,res)=>{
    let lat=req.query.lat
    let lon=req.query.lon

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=1040286cb56aefd2800de0a7f1aa9f0e`,
        headers: { }
      };
      axios(config)
      .then((response) => {
           console.log(JSON.stringify(response.data));
          res.json({
              temp:response.data.main.temp-273.15,
                weather:response.data.weather[0].main
             })
         })
      .catch((error) => {
        console.log(error);
      });
      
    })

    app.listen(3000,()=>{
       console.log("connected server");
    })