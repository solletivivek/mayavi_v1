

const url=new URLSearchParams(window.location.search);
const id=url.get('id');
console.log(id);
var nam=url.get('name');
console.log(nam);
if(nam==null)
{
    document.getElementById('m').innerHTML=`<h1>404 Not Found</h1>`;
}

try{
p=nam.replaceAll(' ','_');
console.log(p);
}
catch(e)
{
    console.log(e);
}


async function getUsers1() {
    let url = 'data.json';
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
    
  }

async function fillPage()
{
    var data=await getUsers1();
    console.log(data);
    //var event=data.find((ob)=>ob.id==id);
    var event=data.find((ob)=>btoa(ob.name)==btoa(nam));
    if(event==undefined)
    {
        document.getElementById('m').innerHTML=`<br><br><br><h1 >404 Not Found</h1><br><br><br><a href="events.html">Go Back</a>`;
        
    }
    var html='';
    html+=`<main id="main">
    <div class="breadcrumbs d-flex align-items-center" style="background-image: url('assets/img/breadcrumbs-bg.jpg');">
      <div class="container position-relative d-flex flex-column align-items-center" data-aos="fade">

        <h2>Events</h2>
        <ol>
          <li><a href="index.html">Home</a></li>
          <li>${event.name}</li>
        </ol>

      </div>
    </div>
    <section id="project-details" class="project-details">
      <div class="container" data-aos="fade-up" data-aos-delay="100">

        <div class="position-relative h-100">
          <div class="slides-1 portfolio-details-slider swiper">
            <div class="swiper-wrapper align-items-center">

            </div>
            <div class="swiper-pagination"></div>
            
          
        </div>

        <div class="row justify-content-between gy-4 mt-4">

          <div class="col-lg-8">
            <div class="portfolio-description">
              <h2>${event.name}</h2>
             <p>${event.des}</p>
             
            </div>
          </div>
          <div class="col-lg-3">
            <div class="portfolio-info">
              <h3>Event information</h3>
              <ul>
                <li><strong>Category</strong> <span>${event.category}</span></li>
                <li><strong>Event date</strong> <span>${event.date}</span></li>
                <li><strong>Venue</strong> <span>${event.venue}</span></li>
              </ul>
            </div>
          </div>

        </div>

      </div>
    </section>

  </main>

  `
  document.getElementById('m').innerHTML=html
 setTimeout(imga(event), 5000);


 


  
}

function imga(event)
{
  var html1='';
  var i=0;
  for(var img of event.img)
  {
    html1+=`<div class="swiper-slide">
    <img  src="${img}" alt="">
  </div>`
  i++;
  console.log(img);
  }
  document.getElementsByClassName('swiper-wrapper')[0].innerHTML=html1;
  var swiper = new Swiper(".portfolio-details-slider", {
    pagination: {
      el: ".swiper-pagination",
      type: "progressbar",
    },
    loop:true,  
    autoplay: {
      delay: 2500,
      disableOnInteraction: true,
    },
  });
}

document.addEventListener('DOMContentLoaded', function() {
fillPage();});



