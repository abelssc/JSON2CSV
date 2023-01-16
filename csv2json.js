//globales
const $form = document.querySelector("form");
const $csv = $form.csv;
const $json = document.querySelector("textarea[name='json'");
let abc;

const CSV2JSON=(csv)=>{
  console.log(csv);
  abc=csv;
  //  csv=JSON.parse(csv);
   csv=csv.split("\n");
   let headers=csv[0].split(",").map(e=>JSON.parse(e));
   csv.shift();//array de strings
   
   const json=[];

   for(let elem of csv){
    let obj={};
    let array=elem.split(",");
    for(let key of headers){
      obj[key]=JSON.parse(array.shift());//shift devuelve el primer valor, y lo elimia del arreglo
    }
    json.push(obj)
   }
   $json.value=JSON.stringify(json,null,2);
}


$form.addEventListener("submit",e=>{
    e.preventDefault();
    let csv=$csv.value;
    let json=CSV2JSON(csv);

})




//descarga
document.querySelector(".descarga").addEventListener("click",(e)=>{
  let text=$json.value;
  let blob=new Blob([text],{type: 'application/json'});

  let link=document.createElement("a");
  link.href=URL.createObjectURL(blob);
  link.download="json.json";
  link.target="_blank";
  link.click();
  URL.revokeObjectURL(blob);

})
//subida
const input=document.querySelector("input[type=file]");

$form.addEventListener("change",e=>{
  if(e.target.matches("input[type=file]")){
    let file=input.files[0];

    let reader=new FileReader();
    reader.readAsText(file);
    reader.onload=()=>{
      $csv.value=reader.result

    }
  }
})

