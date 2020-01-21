$(document).ready(() => {
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

  datumIspis.addEventListener('click', () => console.log(`Clicked ${count++} times`));


  function datumFun() {
    let datum = new Date();
    // let dan = datum.getDate();
    // let mesec = datum.getMonth()+1;
    // let godina = datum.getFullYear();
    var datCeo = `${datum.getDate()}.${datum.getMonth()+1}.${datum.getFullYear()}`;
    document.getElementById('datum').textContent = datCeo;
    var satnica = datum.getHours();
    console.log(satnica);
    var bulmaLogo = `<img src="https://bulma.io/images/made-with-bulma.png" alt="Made with Bulma" width="128" height="24">`;
    var keycapLogo = `<link rel="shortcut icon" href="img/pbt-white.png" type="image/x-icon" />`;
    if (satnica > 20 || satnica < 6) {
      bulmaLogo = `<img src="https://bulma.io/images/made-with-bulma--dark.png" alt="Made with Bulma" width="128" height="24">`;

      }
    document.querySelector('#bulma').innerHTML = bulmaLogo;
 
  }
  datumFun();


  if (window.location.pathname == '/index.html' || window.location.pathname == '/Index.html') {
    console.log("Na glavnoj stranici smo");
  }
  

  document.querySelector('#allProductsEventLidtenerClick').addEventListener('click', (e) => {
    if (window.location.pathname == '/products.html' || window.location.pathname == '/Products.html') {
      e.preventDefault();
      console.log("kliknut je")
    }
    // $('.hero').css('background', 'url(img/20190710174100lk3xyiMgX1.jpg) center/cover');
    // console.log("kliknut je");
  });

  $.getJSON('https://api.ipify.org?format=jsonp&callback=?', data => {
    let l = JSON.stringify(data).split(':');
    let lo = l[1].toString();
    var lok = lo.slice(1, lo.length - 2);
    $.when(lok.length > 1).done(() => {
      Cookies.set = ('IP', `${lok}`);
    });
  });
  /////////// C OO K I E S \\\\\\\\\\\    
  // To create a Cookie:
  //   Cookies.set('name', 'value');
  // To read a Cookie:
  // Cookies.get('name'); // => 'value'

  // var kolLok = Cookies.get("IPAdress");
  // console.log(kolLok);


  $.ajax('/data/products.json', {
    method: "GET",
    dataType: "json",
    success: function (products) {
      product(products);

    } //success
  }); //ajax

  function product(products) {

    ////////////// K E Y B O A R D S \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\


    document.querySelector('#KeyboardEventListenerClick').addEventListener('click', (kb) => {
      if (window.location.pathname == '/products.html' || window.location.pathname == '/Products.html') {
        kb.preventDefault();
      }

      var keyboards = products.filter(kb => kb.product === "keyboard");
      var htmlAjax = " ";
      keyboards.forEach(p => {
        htmlAjax +=
          ` <div class="tiles">
              <div class="tile is-12">
                <div class="tile is-parent is-8">
                  <article class="tile is-child notification is-dark">
                    <p class="title is-3 center">${p.name}</p>
                    <figure class="image ">
                        <img src="${p.pic}">
                    </figure>
                </article>
                </div>
                <div class="tile is-parent is-4">
                <article class="tile is-child notification is-info">
                <h2 class="title center is-3 white ">Specs</h2><br>
                <ul>
                   <li> <p class="title">Name: <span class="has-text-grey-light">${p.name}<span></p> </li>
                </ul>
                <ul>
                    <li> <p class="title">Form-factor: <span class="has-text-grey-light"> ${p.formFactor}<span></p> </li>
                </ul>
                <ul>
                   <li> <p class="title">Keycap material: <span class="has-text-grey-light"> ${p.keycapMaterial}<span></p> </li>
                </ul>
                <br>
                <button class="button is-dark">Add to cart</button>
                </article>
           </div>
        </div>
      </div>`;
        // <div class="grid is-fluid" style="border:2px solid red;margin:0.5rem;"> <h2>Product category: ${p.product}</h2>// <p>Name: ${p.name}</p>
        // <p>Number of keys: ${p.numKeys}</p>// <p>Form factor: ${p.formFactor}</p>// <p>Backlit <input type='checkbox' ${p.backlit}></p>// <p>RGB <input type='checkbox'${p.RGB}></p></div>
        document.querySelector("#keyboardHtml").innerHTML = htmlAjax;
      }); //foreach
    }); //eventListner

    //////////////    
    /////////////////////////// K E Y C A P S \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    /////////////

    document.querySelector('#KeycapsEventListenerClick').addEventListener('click', (kc) => {
      if (window.location.pathname == '/products.html' || window.location.pathname == '/Products.html') {
        kc.preventDefault();
        console.log("preventovan je");
        $('.hero').css('background', 'url(img/20190710174100lk3xyiMgX1.jpg) center/cover');
        // document.querySelector('.hero').style.background="url(img/201905171052391l9h5l0oE1.jpg) center/cover;";
      }
      var caps = products.filter(cap => cap.product === "keycaps");
      var htmlAjax = " ";
      caps.forEach(p => {
        htmlAjax +=
          ` <div class="tiles">
          <div class="tile is-12" >
                <div class="tile is-parent is-9">
                  <article class="tile is-child notification is-dark">
                      
                            <p class="title is-3 center">${p.name}</p>
                        
                   <figure class="image ">
                        <img src="${p.pic}">
                    </figure>
    
                </article>
                </div>
                <div class="tile is-parent is-3">
                <article class="tile is-child notification is-warning">
                <h2 class="title center is-3 white ">Specs</h2><br>
                <ul>
                   <li> <p class="title">Color: <span class="has-text-grey-light">${p.color}<span></p> </li>
                </ul>
                <ul>
                    <li> <p class="title">Material: <span class="has-text-grey-light"> ${p.material}<span></p> </li>
                </ul>
                <br>
                <button class="button is-dark">Add to cart</button>
                </article>
           </div>
        </div>
        
     </div>`;
        // <div class="grid is-fluid" style="border:2px solid red;margin:0.5rem;"> <h2>Product category: ${p.product}</h2>// <p>Name: ${p.name}</p>
        // <p>Number of keys: ${p.numKeys}</p>// <p>Form factor: ${p.formFactor}</p>// <p>Backlit <input type='checkbox' ${p.backlit}></p>// <p>RGB <input type='checkbox'${p.RGB}></p></div>
        document.querySelector("#keyboardHtml").innerHTML = htmlAjax;
      }); //foreach
    }); //eventListner


    ///////////  O T H E R S \\\\\\\\\\\\\\\\\


    document.querySelector('#SwitchesEventListenerClick').addEventListener('click', (ot) => {
      if (window.location.pathname == '/products.html' || window.location.pathname == '/Products.html') {
        ot.preventDefault();
        console.log("preventovan je");
        $('.hero').css('background', 'url(img/20190710174100lk3xyiMgX1.jpg) center/cover');
        // document.querySelector('.hero').style.background="url(img/201905171052391l9h5l0oE1.jpg) center/cover;";
      }
      var switches = products.filter(mx => mx.product === "other");
      var htmlAjax = " ";
      switches.forEach(p => {
        htmlAjax +=
          ` <div class="tiles">
          <div class="tile is-12" >
                <div class="tile is-parent is-6">
                  <article class="tile is-child notification is-dark">
                      
                            <p class="title is-3 center">${p.name}</p>
                        
                   <figure class="image ">
                        <img src="${p.pic}">
                    </figure>
    
                </article>
                </div>
                <div class="tile is-parent is-6">
                <article class="tile is-child notification is-danger">
                <h2 class="title center is-3 white ">Specs</h2><br>
                <ul>
                   <li> <p class="title">Name: <span class="has-text-grey-light">${p.name}<span></p> </li>
                </ul>
                <ul>
                    <li> <p class="title">Description: <span class="has-text-grey-light"> ${p.description}<span></p> </li>
                </ul>
                <br>
                <button class="button is-dark">Add to cart</button>
                </article>
           </div>
        </div>
        
     </div>`;
        // <div class="grid is-fluid" style="border:2px solid red;margin:0.5rem;"> <h2>Product category: ${p.product}</h2>// <p>Name: ${p.name}</p>
        // <p>Number of keys: ${p.numKeys}</p>// <p>Form factor: ${p.formFactor}</p>// <p>Backlit <input type='checkbox' ${p.backlit}></p>// <p>RGB <input type='checkbox'${p.RGB}></p></div>
        document.querySelector("#keyboardHtml").innerHTML = htmlAjax;
      }); //foreach
    }); //eventListner

  } //function products


  if (window.location.pathname == '/contact.html' || window.location.pathname == '/Contact.html') {
    console.log("Na contact stranici smo");
  
   document.querySelector('#submitInfo').addEventListener('click', pd => {
    pd.preventDefault();
    var data = [];
    var validation = true;
    ///////// f name ////////
         var fname = document.querySelector('#fname').value.trim();
         var fnameError = document.querySelector('#fnameError');
         var reExName = /^[A-Z]{1}[a-z]{1,13}$/;
         if (fname.length < 1) {
           fnameError.innerHTML = `Please enter your first name`;
         }
         if (!reExName.test(fname)) {
          fnameError.innerHTML = `Please enter your first name correctly`;
        }
         data.push(fname);
          document.cookie = `First name = ${fname}`;
        
     
         ///////////////// l name \\\\\\\\\\\\\    
     
      var lname = document.querySelector('#lname').value.trim();
     var lnameError = document.querySelector('#lnameError');
     if(lname.length<1){
       lnameError.innerHTML =`Please enter your last name corretly`;
     }
     if (!reExName.test(lname)) {
      lnameError.innerHTML = `Please enter your last name correctly`;
  
     }
     data.push(lname);
     document.cookie = `Last name = ${lname}`;
     
     //////////////   z  I  P   \\\\\\\\\\\\\\\\\\ 
     
      var zip = document.querySelector('#zip').value.trim();
      var zipError = document.querySelector('#zipError');
      if(zip<10000 || zip>99999){
        zipError.innerHTML = `Please enter correct zip code (10 000 - 99 999)`;
      
      }
      data.push(zip);
      document.cookie = `Zip Code = ${zip}`;
      
      /////////////////  E M A I L \\\\\\\\\\\\\\\
      
      var em = document.querySelector('#email').value.trim();
      var emError = document.querySelector('#emailError');
      var reExEmail = /^[a-z0-9._%+]+@[a-z0-7.]+\.[a-z]{2,4}$/;
      if(em.length<1){
        emError.innerHTML =`Please enter your email address`;
      }
      if(!reExEmail.test(em)){
        emError.innerHTML = `Please enter valid email address`;
      }
      data.push(em);
      document.cookie  = `Email = ${em}`;
      ///////////////////////  PassWord \\\\\\\\\\\\\\\\\
      var pass = document.querySelector('#pass').value.trim();
      var passError = document.querySelector('#passError');
      var reExPass = /^[a-z0-9]{5,20}$/;
      if(!reExPass.test(pass)){
        passError.innerHTML = `Please enter alfanumeric only password between 5 and 20 character length`;
      }
      data.push(pass);
      document.cookie= `Enigma = ${pass}`;


     if(data.length>2){
       alert("Successful login, thank you");
     } 
    });
  }//if contact
}); //document.ready