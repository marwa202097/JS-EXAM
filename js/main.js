// **********************LOADING SCREEN***********************
$(document).ready(function () {
    $('#loading').fadeOut(2000,function(){
        $('body').css('overflow','visible')
    })
  })
// *******************************smoothing scroll*******************
$('.nav-category').click(function () { 
    let currentHref= $(this).attr('href');
    let currentOffset= $(currentHref).offset().top;
    $('body,html').animate({scrollTop: currentOffset},1000)
 })
 // *******************************top button*******************
let secOffset=$('#contact').offset().top;
    $(window).scroll(function(){
        if($(window).scrollTop()>secOffset)
        {
            $('#topBtn').fadeIn(1000);
        }
        else{
            $('#topBtn').fadeOut(1000);
        }
    })
    $('#topBtn').click(function(){
        $('body,html').animate({scrollTop:0},1000)
    })

// Contact Section variables
var inputName=document.getElementById('name');
var inputEmail=document.getElementById('email');
var inputPhone=document.getElementById('phone');
var inputAge=document.getElementById('age');
var inputPassword=document.getElementById('password');
var inputRepassword=document.getElementById('rePassword');
var submitBtn=document.getElementById('submitBtn');
var nameAlert=document.getElementById('namealert')
//Header variables
var responseData;
var response;
var data;
var imgLayer=document.getElementsByClassName('img-layer');
var search=document.getElementById('search');
var searchKeyWord=document.getElementById('searchKeyWord');

//Validate Input Email Function:
var emailRejex=/^[a-zA-Z0-9.!#$%&'+=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;
inputEmail.addEventListener('keyup',function(){
    if(emailRejex.test(inputEmail.value) )
    {
        $('#emailalert').addClass('d-none')
    }
    else{
        $('#emailalert').removeClass('d-none')
    }
})

//Validate Input Name Function:
var nameRejex=/^[a-z]{3,12}$/;
inputName.addEventListener('keyup',function(){
    if(nameRejex.test(inputName.value) )
    {
        $('#namealert').addClass('d-none')
    }
    else{
        $('#namealert').removeClass('d-none')
    }
})

//Validate Input PHone Function:
var phoneRejex=/^01[50296][0-9]{8}$/gm;
inputPhone.addEventListener('keyup',function(){
    if(phoneRejex.test(inputPhone.value) )
    {
        $('#phonealert').addClass('d-none')
    }
    else{
        $('#phonealert').removeClass('d-none')
    }
})
   
//Validate Input Age Function:
var ageRejex=/^([1-7][0-9]|80)$/gm;
inputAge.addEventListener('keyup',function(){
    if(ageRejex.test(inputAge.value) )
    {
        $('#agealert').addClass('d-none')
    }
    else{
        $('#agealert').removeClass('d-none')
    }
})

//Validate Input Password Function:
var passwordRejex=/^[0-9]{3,10}$/gm;
inputPassword.addEventListener('keyup',function(){
    if(passwordRejex.test(inputPassword.value) )
    {
        $('#passwordalert').addClass('d-none')
    }
    else{
        $('#passwordalert').removeClass('d-none')
    }
})

//Validate Input RePassword Function:
inputRepassword.addEventListener('keyup',function(){
    if(inputPassword.value == inputRepassword.value)
    {
        $('#Repasswordalert').addClass('d-none')
        submitBtn.removeAttribute('disabled');
    }
    else{
        $('#Repasswordalert').removeClass('d-none');
        submitBtn.disabled='true'
    }
})
// ************************END Contact*********************************

//*******************START HOME SECTION **************** */


async function getData(){
    responseData= await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=978e78abb24a4a96e6d401aad2542b97`);
    response= await responseData.json();
     data=response.results;
    displayData();
    console.log(data);
}
getData();
// Display Data
function displayData()
{
    var content="";
    {
        for(var i=0;i<data.length;i++)
        {
            content+=`
            <div class=" col-md-4 my-3">
            <div class="images">
            <img class=" w-100" src="https://image.tmdb.org/t/p/w500/${data[i].poster_path}" />
             <div class="img-layer ">
              <h3 class=" mt-5 pt-5 pb-3">${data[i].title || data[i].name}</h3>
              <p>${data[i].overview}</p>
              <p>rate: ${data[i].vote_average}</p>
              <p>${data[i].release_date || data[i].first_air_date}</p>
             </div>
            </div>
            </div>
            `
            
            document.getElementById('rows').innerHTML=content;   
        }  
    }
}

//searchKeyWord Function
searchKeyWord.addEventListener('keyup',function(){
    var cartonaa='';
    for(let i=0;i<data.length;i++)
    {
        if(data[i].title.toLowerCase().includes((searchKeyWord.value).toLowerCase()))
        {
            cartonaa+= `
            <div class=" col-md-4 my-3">
            <div class="images">
            <img class=" w-100" src="https://image.tmdb.org/t/p/w500/${data[i].poster_path}" />
             <div class="img-layer ">
              <h3 class=" mt-5 pt-5 pb-3">${data[i].title || data[i].name}</h3>
              <p>${data[i].overview}</p>
              <p>rate: ${data[i].vote_average}</p>
              <p>${data[i].release_date || data[i].first_air_date}</p>
             </div>
            </div>
            </div>
                       `
           document.getElementById('rows').innerHTML=cartonaa           
       }     
    }
})
   var alldata;
   var searchData;
   var searchResponsedData;
search.addEventListener('keyup', async function(){
    searchData = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=978e78abb24a4a96e6d401aad2542b97&query=${search.value}`);
    searchResponsedData=await searchData.json();
    alldata = searchResponsedData.results;
    console.log(alldata);

    var cartonaaaa="";
    for(var i=0;i<alldata.length;i++)
    {
        if(alldata[i].title.toLowerCase().includes((search.value).toLowerCase()))
        {
            cartonaaaa+= `
            <div class=" col-md-4 my-3">
            <div class="images">
            <img class=" w-100" src="https://image.tmdb.org/t/p/w500/${alldata[i].poster_path}" />
             <div class="img-layer ">
              <h3 class=" mt-5 pt-5 pb-3">${alldata[i].title}</h3>
              <p>${alldata[i].overview}</p>
              <p>rate: ${alldata[i].vote_average}</p>
              <p>${alldata[i].release_date || alldata[i].first_air_date}</p>
             </div>
            </div>
            </div>
                    `
        }
        document.getElementById('rows').innerHTML=cartonaaaa;
    }
})


/**************************************END HOME SECTION*********************** */


/**************************************START SIDE BAR ********************************* */


$(".openNav").click(function(){
   $("#home-content").animate({left :'240px'},50);
   $('.sideBar-menu').css({transform : 'scale(1)'},50);
   $('.items').css({'opacity':'1'},500)
   $('.items').animate({'padding-top': '25px'},1000)
})

$(".closebtn").click(function(){
    $('.sideBar-menu').css({transform : 'translateX(-100%)'},50);
    $("#home-content").animate({left :'0'},50);
    $('.items').css({'opacity':'0'},50)
   $('.items').animate({'padding-top': '500px'},1000)
})

var linkss=document.getElementsByClassName('nav-category');
for(var i=0;i<linkss.length;i++)
{
    linkss[i].addEventListener('click',function(e){
      var currentLink=e.target.text;
      console.log(currentLink);
      if(currentLink=='Popular')
      {
         getPopularData()   
      }
      else if(currentLink=='Top Rated')
      {
        getTopRatedData()
      }
      else if(currentLink=='Trending')
      {
        getData()
      }
      else if(currentLink=='Upcoming')
      {
        getUpComingData()
      }
      else if(currentLink=='Now playing')
      {
    getNowPlayingData()
      }

    })
}
async function getPopularData(){
    responseData= await fetch('https://api.themoviedb.org/3/movie/popular?api_key=eba8b9a7199efdcb0ca1f96879b83c44');
    response= await responseData.json();
     data=response.results;
   console.log(data);
   displayData()
}

async function getTopRatedData(){
    responseData= await fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=eba8b9a7199efdcb0ca1f96879b83c44');
    response= await responseData.json();
     data=response.results;
   console.log(data);
   displayData()
}
async function getUpComingData(){
    responseData= await fetch('https://api.themoviedb.org/3/movie/upcoming?api_key=eba8b9a7199efdcb0ca1f96879b83c44');
    response= await responseData.json();
     data=response.results;
   console.log(data);
   displayData()
}
async function getNowPlayingData(){
    responseData= await fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=eba8b9a7199efdcb0ca1f96879b83c44');
    response= await responseData.json();
     data=response.results;
   console.log(data);
   displayData()
}
//api_key=eba8b9a7199efdcb0ca1f96879b83c44
//https://api.themoviedb.org/3/search/movie?api_key=eba8b9a7199efdcb0ca1f96879b83c44&language=en-US&page=1&include_adult=false
/* *************************************END LeftMenu**************************************** */