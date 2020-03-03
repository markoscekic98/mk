let arrN = [1n,2n,3n,4n,5n,6n,7n,8n];
for(let n of arrN){
  console.log(n);// vraca [i] niza
}
let arr  = [1,2,3,4,5,6,7,8];
for(let i of arr){
  console.log(i); //vraca [i].value
}


//     var lok1 = $.getJSON('https://api.ipify.org?format=jsonp&callback=?',data => {
//         let l = JSON.stringify(data).split(':');
//         let lo = l[1].toString();
//         var lok =lo.slice(1, lo.length - 2);
//         return lok;
//          }); 
     

// async function getIP(){
//     const ipA = await lok1;
//     console.log(ipA);
// }
// getIP();