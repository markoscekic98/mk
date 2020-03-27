window.onload = () => {
  datumFun();
  ////////////template js(for burger menu in navbar)\\\\\\\\\\\\\\\\
  var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0); // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) { // Add a click event on each of them
    $navbarBurgers.forEach($el => {
      $el.addEventListener('click', () => {
        $('.navBarAnchor').css({
          'margin-right': '0px',
          'margin-bottom': '1.5rem'
        });
        $('.navbar-start p').css('color', 'silver');

        // Get the target from the "data-target" attribute
        var target = $el.dataset.target;
        var $target = document.getElementById(target);
        $target.style.width = "60%";
        $target.style.marginLeft = '20%'; // Toggle the class on both the "navbar-burger" and the "navbar-menu"
        $el.classList.toggle('is-active');
        $target.classList.toggle('is-active');
      });
    });
  }
  ////////////////  End of template js \\\\\\\\\\\\\\\\\\  
  document.querySelector('.navbar-burger').addEventListener('click', () => {
    document.getElementById('navbar').style.backgroundColor = 'rgba(223, 223, 223, 0.4)'; //'rgba(5, 5, 5, 0.4)';
    $('.burgerColor').css('color', '#272727');
    $('.AboutHover p').css('color', 'white');
  });
  let count = 0;

  function datumFun() {
    let datum = new Date();
    var satnica = datum.getHours();
    var bulmaLogo = `<img src="https://bulma.io/images/made-with-bulma.png" alt="Made with Bulma" width="128" height="24">`;
    var keycapLogo = `<link rel="shortcut icon" href="img/pbt-white.png" type="image/x-icon" />`;
    if (satnica > 20 || satnica < 6) {
      bulmaLogo = `<img src="https://bulma.io/images/made-with-bulma--dark.png" alt="Made with Bulma" width="128" height="24">`;
    }
    document.querySelector('#bulma').innerHTML = bulmaLogo;
    }


  if (window.location.pathname == '/products.html' || window.location.pathname == '/Products.html') {

    $.ajax('/data/products.json', {
      method: "GET",
      dataType: "json",
      success: function (products) {
      
        var keyboards = products;
        funKeyboardsHtmlDynamic(keyboards);
        addEventCart();

        //////////// sort by bigger keyboards first\\\\\\\\\\\\\\\\\\\\\\\
        document.getElementById('bigKeyboardFirst').addEventListener('click', () => {
          keyboards.sort((a, b) => b.numKeys - a.numKeys);
   
          funKeyboardsHtmlDynamic(keyboards);
          addEventCart();
        }); //EventListener big keyboards
        //////////////// small keyboards first \\\\\\\\\\\\\\\\\\\\\\\\
        document.getElementById('smallKeyboardFirst').addEventListener('click', () => {
          keyboards.sort((a, b) => a.numKeys - b.numKeys);
      
          funKeyboardsHtmlDynamic(keyboards);
          addEventCart();
        }); //eventListner small keyboards

        //// /////////////////////  C O L O R \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

        const color = document.getElementById('clickSelectColor');
        document.getElementById('clickSelectColor').addEventListener('click', () => {

          // e.options[e.selectedIndex].value;
          let selectColor = color.options[color.selectedIndex].value;
          if (selectColor.length > 1) {
            let keyboardColor = keyboards.filter((kbCol) => kbCol.color === selectColor);
            funKeyboardsHtmlDynamic(keyboardColor);
            addEventCart();
          } else {
            funKeyboardsHtmlDynamic(keyboards);
            addEventCart();
          }
        });

        function addEventCart() {

          var dataLsCart = [];
          document.querySelectorAll('.korpa').forEach(shoppingCart => {
            shoppingCart.addEventListener('click', eventCartButton => {
        
              let addToCartAnimation = setTimeout(loadAnim, 0);

              function loadAnim() {
                shoppingCart.classList.add('is-loading');
              }
              setTimeout(() => {
                clearInterval(addToCartAnimation);
                shoppingCart.classList.remove('is-loading');
                shoppingCart.innerHTML = `<span class="icon is-small white">
                                   <i class="fa fa-check white"></i>
                                   </span class="white"><span>Saved</span>`;
              }, 700);

              dataLsCart.push(shoppingCart.value);
              document.getElementById('cartAncher').innerHTML = `<span class="icon is-medium">
              <i class="fa fa-cart-arrow-down"></i>
          </span><p class="korpaBroj">${dataLsCart.length}</p>`;
    
              localStorage.setItem("Product", JSON.stringify(dataLsCart));
           });
          });
        } //fun addeventCart


        function funKeyboardsHtmlDynamic(data) {
          var htmlAjax = " ";

          data.forEach(p => {
            htmlAjax +=
              `  <div class="tiles " >
              <div class="tile is-13 keyboardPositioning">
                <div class="tile is-parent is-6">
                  <article class="tile is-child notification productPic">
                    <p class="title is-3 center">${p.name}</p>
                    <figure class="image ">
                        <img src="${p.pic}">
                    </figure>
                </article>
                </div>
                <div class="tile is-parent is-4">
                <article class="tile is-child notification productText">
                <h3 class="title center is-3" style="color:white;">Specs</h3><br>
                <ul>
                   <li> <p class="subtitle is-4"  style="color:white;">Name: <span class="productTextSpan">${p.name}<span></p> </li>
                </ul>
                <ul>
                    <li> <p class="subtitle is-4"  style="color:white;">Color: <span class="productTextSpan" > ${p.color}<span></p> </li>
                </ul>
                <ul>
                   <li> <p class="subtitle is-4"  style="color:white;">Number of keys: <span class="productTextSpan "> ${p.numKeys}<span></p> </li>
                </ul>
                <ul>
                   <li> <p class="subtitle is-4"  style="color:white;">Price: <span class="productTextSpan"> $${p.numKeys}<span></p> </li>
                </ul>
                <br>
                <button class="button is-dark korpa" id="idKorpa" value=${p.id} >Add to cart</button>
                </article>
           </div>
        </div>
      </div>`;
          }); //foreach
          if (data.length < 1) {
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
        } //// function funKeyboardsHtmlDynamic(data)
      } //success
    }); //ajax
    //} //function products 


  } //if products.html

  if (window.location.pathname == '/cart.html') {

    $.ajax('/data/products.json', {
      method: "GET",
      dataType: "json",
      success: allProducts => {
        cart(allProducts);

      } //success
    });

    function cart(data) { //cros refference of all producsts there are in JSON file with those ID that have been selected
   
      let getLSproducts = localStorage.getItem("Product");
      var dataLS = JSON.parse(getLSproducts);
      try{
      document.getElementById('cartAncher').innerHTML = `<span class="icon is-medium">
              <i class="fa fa-cart-arrow-down"></i>
          </span><p class="korpaBroj">${dataLS.length}</p>`;
      }catch {}
      var producstsInCart = [];
      var cartHtml = '<table  class="center">';
      var price = 0;
      if (dataLS) {
        for (var indexData = 0; indexData < dataLS.length; indexData++) {
          producstsInCart = data.filter(x => x.id === dataLS[indexData]);
          producstsInCart.forEach(ls => {
            cartHtml += `
              <tr >
                <td class="verticalLine">Product ID: ${ls.id} </td>
                <td class="verticalLine">Name: ${ls.name} </td>
                <td>Price: $${ls.numKeys} </td>
              </tr>`;
            price += ls.numKeys;
          });
        }

        cartHtml += `</table><div class="control center-column">
      </div>
      <div class="column abcd" id="priceCart">
       Price for all products combined is: $${price},   number of chosen products: ${indexData}
      </div><hr class="devider"><div class="control center-column"><button class="button" id="clearLSData" >Clear All</button></div>`;
        document.getElementById('localStorageCart').innerHTML = cartHtml;
       // document.getElementById('priceCart').innerHTML = `Price for all products combined is: $${price},   number of chosen products: ${indexData}`;
      };

      try {
        const cartBorder = $('tr');
        let len = cartBorder.length - 1;

        cartBorder[len].style.border = "0px solid white";
      } catch {}
      try {
        document.querySelector('#clearLSData').addEventListener('click', () => {
          localStorage.clear();
          document.getElementById('localStorageCart').innerHTML = `<main class="hero-body center" id="emptyCart">
        <div id="grid" style="width: 768px;">
          <div id="a" class="center-column has-text-centered subtitle sumPrice">
                  <h2 class="title is-2 white ">Cart is empty</h2><br>
                  <p class='content is-medium'>Plese click 'Add to cart' button on desired products</p>
          </div> </div>  </main>`;
        });
      } catch{ }
    };///for
  };//if cart.html
  if (window.location.pathname == '/contact.html' || window.location.pathname == '/Contact.html') {
    $.ajax({
      url: 'https://api.ipify.org?format=json',
      method: "get",
      dataType: "json",
      timeout: 3100,
      complete: data => {
        try {
          let l = JSON.stringify(data).split(`:\"`);
          let lo = l[2].split(`\"`);
          document.cookie = `IP=${lo[0]}`;
        } catch {}
      },
      error: function (error, xhr, status) {
        swal("Please disable adblocker", "In order to login, please disable adblocker", "error");
      }
    });
    document.querySelector('#contactForm').reset(); /// na onLoad stranice se brisu podaci ranije upisano iz forme;
    document.querySelector('#submitInfo').addEventListener('click', pd => {
      pd.preventDefault();


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
      if (lname.length < 1) {
        lnameError.innerHTML = `Please enter your last name corretly`;
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
      if (zip < 10000 || zip > 100000) {
        zipError.innerHTML = `Please enter correct zip code (10 000 - 99 999)`;
        validation = false;
      }

      data.push(zip);
      document.cookie = `Zip Code = ${zip}`;

      /////////////////  E M A I L \\\\\\\\\\\\\\\

      var em = document.querySelector('#email').value.trim();
      var emError = document.querySelector('#emailError');
      var reExEmail = /^[a-z0-9._%+]+@[a-z0-7.]+\.[a-z]{2,4}$/;
      if (em.length < 1) {
        emError.innerHTML = `Please enter your email address`;
        validation = false;
      }
      if (!reExEmail.test(em)) {
        emError.innerHTML = `Please enter valid email address`;
        validation = false;
      }
      data.push(em);
      document.cookie = `Email = ${em}`;
      ///////////////////////  PassWord \\\\\\\\\\\\\\\\\
      var pass = document.querySelector('#pass').value.trim();
      var passError = document.querySelector('#passError');
      var reExPass = /^[a-z0-9]{5,20}$/;
      if (!reExPass.test(pass)) {
        passError.innerHTML = `Please enter alfanumeric only password between 5 and 20 character in length`;
        validation = false;
      }
      let enigma = CryptoJS.AES.encrypt(pass, '11231').toString();
      data.push(enigma);
      document.cookie = `Password = ${enigma}`;

      if (data.length > 3 && validation) {
        swal("Success!", "Contact information is sent to our server for further validation", "success");
      }
    });

  } //if contact


}; //document.ready