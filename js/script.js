$(document).ready( () => {
  datumFun();
////////////template js(for burger menu in navbar)\\\\\\\\\\\\\\\\
  var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {  // Add a click event on each of them
    $navbarBurgers.forEach($el => {
      $el.addEventListener('click', () => {
        $('.navBarAnchor').css('margin-right', '0px');
        $('.navbar-start p').css('color', 'silver');
        $('#datum').css('color', 'silver');
        // Get the target from the "data-target" attribute
        var target = $el.dataset.target;
        var $target = document.getElementById(target);
        $target.style.width = "60%";
        $target.style.marginLeft = '20%';   // Toggle the class on both the "navbar-burger" and the "navbar-menu"
        $el.classList.toggle('is-active');
        $target.classList.toggle('is-active');
        });
    });
  }
////////////////  End of template js \\\\\\\\\\\\\\\\\\  
  document.querySelector('.navbar-burger').addEventListener('click', () => {
    // document.getElementById('navbar').style.backgroundColor = 'rgba(5, 5, 5, 0.4)';
    document.getElementById('navbar').style.backgroundColor = 'rgba(223, 223, 223, 0.4)'; //'rgba(5, 5, 5, 0.4)';
    let arrColor = ['KeyboardEventListenerClick', 'KeycapsEventListenerClick', 'SwitchesEventListenerClick', 'bela0', 'bela1'];
    for (let ii in arrColor) {
      document.querySelector(`#${arrColor[ii]}`).style.color = '#272727';
    }
  });
  let count = 0;
  var datumIspis = document.querySelector('#datum');

 // datumIspis.addEventListener('click', () => console.log(`Clicked ${count++} times`));


  function datumFun() {
    let datum = new Date();
    var datCeo = `${datum.getDate()}.${datum.getMonth()+1}.${datum.getFullYear()}`;
    document.getElementById('datum').textContent = datCeo;
    var satnica = datum.getHours();
    var bulmaLogo = `<img src="https://bulma.io/images/made-with-bulma.png" alt="Made with Bulma" width="128" height="24">`;
    var keycapLogo = `<link rel="shortcut icon" href="img/pbt-white.png" type="image/x-icon" />`;
    if (satnica > 20 || satnica < 6) {
      bulmaLogo = `<img src="https://bulma.io/images/made-with-bulma--dark.png" alt="Made with Bulma" width="128" height="24">`;
    }
    document.querySelector('#bulma').innerHTML = bulmaLogo;
 
  }

  
  if (window.location.pathname == '/products.html' || window.location.pathname == '/Products.html'){

  $.ajax('/data/products.json', {
    method: "GET",
    dataType: "json",
    success: function (products) {
      product(products);

    } //success
  }); //ajax

  function product(products) {

      var keyboards = products.filter(kb => kb.product === "keyboard");
     document.getElementById('bigKeyboardFirst').addEventListener('click',()=> {
        var bigKeyboardFirst = keyboards.sort((a,b)=> b.numKeys - a.numKeys);
        console.log("velike");
        funKeyboardsHtmlDynamic(bigKeyboardFirst);
      });//EventListener big keyboards
      //////////////// small keyboards first \\\\\\\\\\\\\\\\\\\\\\\\
      document.getElementById('smallKeyboardFirst').addEventListener('click', ()=> {
         var smallKeyboardsFirst = keyboards.sort((a,b)=> a.numKeys - b.numKeys);
        console.log("male");
         funKeyboardsHtmlDynamic(smallKeyboardsFirst);
      });//eventListner small keyboards
///////////////  C O L O R \\\\\\\\\\\\\\\\\\\\\\\
      var color = document.getElementById('clickSelectColor');
    document.getElementById('clickSelectColor').addEventListener('click',()=>{
       // e.options[e.selectedIndex].value;
        let selectColor = color.options[color.selectedIndex].value;
        if(selectColor != 0){
          console.log("izabrana boja boju");
          let keyboardColor = keyboards.filter((kbCol)=> kbCol.color === selectColor);
          console.log(keyboardColor);
          funKeyboardsHtmlDynamic(keyboardColor);
        }
        
      funKeyboardsHtmlDynamic(keyboards);
        
});
   
    funKeyboardsHtmlDynamic(keyboards);
//}); //eventListner
function funKeyboardsHtmlDynamic(data){
  var htmlAjax = " ";

  let keyboards = data;//.filter(kb => kb.product === "keyboard");
     keyboards.forEach(p => {
        htmlAjax +=
          `  <div class="tiles " >
              <div class="tile is-13 keyboardPositioning">
                <div class="tile is-parent is-6">
                  <article class="tile is-child notification is-dark">
                    <p class="title is-3 center">${p.name}</p>
                    <figure class="image ">
                        <img src="${p.pic}">
                    </figure>
                </article>
                </div>
                <div class="tile is-parent is-4">
                <article class="tile is-child notification is-light">
                <h2 class="title center is-3 white ">Specs</h2><br>
                <ul>
                   <li> <p class="subtitle is-4">Name: <span class="has-text-grey-light">${p.name}<span></p> </li>
                </ul>
                <ul>
                    <li> <p class="subtitle is-4">Color: <span class="has-text-grey-light"> ${p.color}<span></p> </li>
                </ul>
                <ul>
                   <li> <p class="subtitle is-4">Number of keys: <span class="has-text-grey-light"> ${p.numKeys}<span></p> </li>
                </ul>
                <ul>
                   <li> <p class="subtitle is-4">Price: <span class="has-text-grey-light"> $${p.numKeys}<span></p> </li>
                </ul>
                <br>
                <button class="button is-dark">Add to cart</button>
                </article>
           </div>
        </div>
      </div>`;
        // <div class="grid is-fluid" style="border:2px solid red;margin:0.5rem;"> <h2>Product category: ${p.product}</h2>// <p>Name: ${p.name}</p>
        // <p>Number of keys: ${p.numKeys}</p>// <p>Form factor: ${p.formFactor}</p>// <p>Backlit <input type='checkbox' ${p.backlit}></p>// <p>RGB <input type='checkbox'${p.RGB}></p></div>
      }); //foreach
      if(data.length<1){
        htmlAjax = `<main class="hero-body center" style="padding: 2rem;">
            <div id="grid" style="width: 768px;">
              <div id="a" class="center-column has-text-centered subtitle" >
                <h2 class="title is-2 white ">There are no available products</h2><br>
                <p class='content is-small'>Please contact as for further assistance</p>
              </div>
            </div>
          </main>`;
    }
      let keyboardHTML = document.querySelector("#keyboardHtml");
      keyboardHTML.innerHTML = htmlAjax;
    //  keyboardHTML.style.marginTop = '50px';
  }
 
  }//function products 
 } //if products.html


  if (window.location.pathname == '/contact.html' || window.location.pathname == '/Contact.html') {
    console.log("Na contact stranici smo");
    document.querySelector('#contactForm').reset(); /// na onLoad stranice se brisu podaci ranije upisano iz forme;
   document.querySelector('#submitInfo').addEventListener('click', pd => {
    pd.preventDefault();
    $.ajax({
      url: 'https://api.ipify.org?format=jsonp&callback=?',
      method: "get",
      dataType: "json",
      timeout: 3000,
      complete: data => {
        let l = JSON.stringify(data).split(':');
        let lo = l[3].toString();
        let lok = lo.slice(1, lo.length - 11);
          document.cookie = `IP=${lok}`;
        },
      error: function (error, xhr, status) {
        console.log(status);
        alert("Please disable your adblock");
      }
    });
    
    var data = [];
    var validation = true;
    ///////// f name ////////
         var fname = document.querySelector('#fname').value.trim();
         var fnameError = document.querySelector('#fnameError');
         var reExName = /^[A-Z]{1}[a-z]{1,13}$/;
         if (fname.length < 2) {
           fnameError.innerHTML = `Please enter your first name`;
           validation = false;
         }
         if (!reExName.test(fname)) {
          fnameError.innerHTML = `Please enter your first name correctly`;
          validation = false;
        }
         data.push(fname);
          document.cookie = `First name = ${fname}`;
        
     
         ///////////////// l name \\\\\\\\\\\\\    
     
      var lname = document.querySelector('#lname').value.trim();
     var lnameError = document.querySelector('#lnameError');
     if(lname.length<1){
       lnameError.innerHTML =`Please enter your last name corretly`;
       validation = false;
     }
     if (!reExName.test(lname)) {
      lnameError.innerHTML = `Please enter your last name correctly`;
      validation = false;
     }
     data.push(lname);
     document.cookie = `Last name = ${lname}`;
     
     //////////////   z  I  P   \\\\\\\\\\\\\\\\\\ 
     
      var zip = document.querySelector('#zip').value.trim();
      var zipError = document.querySelector('#zipError');
      if(zip<10000 || zip>99999){
        zipError.innerHTML = `Please enter correct zip code (10 000 - 99 999)`;
        validation = false;
      }
      data.push(zip);
      document.cookie = `Zip Code = ${zip}`;
      
      /////////////////  E M A I L \\\\\\\\\\\\\\\
      
      var em = document.querySelector('#email').value.trim();
      var emError = document.querySelector('#emailError');
      var reExEmail = /^[a-z0-9._%+]+@[a-z0-7.]+\.[a-z]{2,4}$/;
      if(em.length<1){
        emError.innerHTML =`Please enter your email address`;
        validation = false;
      }
      if(!reExEmail.test(em)){
        emError.innerHTML = `Please enter valid email address`;
        validation = false;
      }
      data.push(em);
      document.cookie  = `Email = ${em}`;
      ///////////////////////  PassWord \\\\\\\\\\\\\\\\\
      var pass = document.querySelector('#pass').value.trim();
      var passError = document.querySelector('#passError');
      var reExPass = /^[a-z0-9]{5,20}$/;
      if(!reExPass.test(pass)){
        passError.innerHTML = `Please enter alfanumeric only password between 5 and 20 character in length`;
        validation = false;
      }
      let enigma = CryptoJS.AES.encrypt(pass, '11231').toString();
      data.push(enigma);
      document.cookie= `Password = ${enigma}`;


     if(data.length>2 && validation){
       console.log(data);
       alert("Successful login, thank you");
     } 
    });
  }//if contact
}); //document.ready