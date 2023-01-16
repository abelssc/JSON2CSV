//globales
const $form = document.querySelector("form");
const $json = $form.json;
const $csv = document.querySelector("textarea[name='csv'");
//valores 
const separador='","';
let content="";

$form.addEventListener("submit", (e) => {
  e.preventDefault();
  let json = $json.value;

  json=convertToJson(json);

  let llaves=extraerLLaves(json);
  //insertamos las llaves
  content=`"${llaves.join(separador)}"\n`;
  
  //evaluamos en el json y sus datos
  for(let objeto of json){
    for(let llave in objeto){
      content+=JSON.stringify(objeto[llave])+","
    }
    content=content.slice(0,content.length-1)+"\n";
  }
  $csv.value=content;
});
const convertToJson = (json) => {
  try {
    let newjson = JSON.parse(json);
  
    if (Array.isArray(newjson)) return newjson;
    if (typeof newjson === "string") return [{ file1: newjson }];
    if (typeof newjson === "number") return [{ file1: newjson }]; //NaN is include. return ""
    if (typeof newjson === "boolean") return [{ file1: newjson}];
    if (Object.prototype.toString.call(newjson)==='[object Null]') return [{ file1:newjson}];
    if (typeof newjson === "object") return [newjson];
  
  } catch (error) {
    //Undefined is include here
    $csv.value=error
  }
};
const extraerLLaves=(json)=>{
  let llaves=[];
  json.forEach((obj) => {
    llaves.push(...Object.keys(obj));
  });
  llaves=llaves.filter((llave, index) => llaves.indexOf(llave) === index);
  return llaves;
}
//descarga
document.querySelector(".descarga").addEventListener("click",(e)=>{
  let text=$csv.value;
  let blob=new Blob([text],{type: 'text/csv'});

  let link=document.createElement("a");
  link.href=URL.createObjectURL(blob);
  link.download="csv.csv";
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
      $json.value=reader.result

    }
  }
})

