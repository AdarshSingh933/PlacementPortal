//render searchJob page
module.exports.searchJob = async function(req,res){
    return res.render('searchJob');
}

//action for url /search-job/result
module.exports.searchJobResult = async function(req,res){
    const axios = require('axios');
    

const options = {
  method: 'GET',
  url: 'https://jsearch.p.rapidapi.com/search',
  params: {
    query:`${req.body.job} ${req.body.location}`,
    page: '1',
    num_pages: '1'
  },
  headers: {
    'X-RapidAPI-Key': 'd32026fca5msh4f6a6620e68ca14p14d327jsn935f682946ea',
    'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
  }
};

try {
    const response = await axios.request(options);
    //render searchJobResult page and passing the response
    return res.render('searchJobResult',{
        jobs :response.data.data
      })
        
  } catch (error) {
    console.error(error);
  }
}
