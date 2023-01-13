const $form = document.querySelector("form");
const $csv= document.querySelector("textarea[name='csv'");
$form.addEventListener("submit", (e) => {
  e.preventDefault();
  let json = $form.json.value;

  json = JSON.parse(json);

  if (!Array.isArray(json)) {
    if (typeof json === "object") {
      json = [json];
    } else if (typeof json === "string") {
      json = [{ file1: json }];
    }
  }
  let llaves = [];
  json.forEach((obj) => {
    llaves.push(...Object.keys(obj));
  });
  //otra forma
  //let llaves=json.map(obj=>Object.keys(obj));
  //devuelve valores unicos
  llaves = llaves.filter((llave, index) => llaves.indexOf(llave) === index);
  //otra posibilidad es usando el set- set no permite valores duplicados
  //const uniqueValues = Array.from(new Set(arr));
  //obtenemos los valores
  let valores = [];

  for (let obj = 0; obj < json.length; obj++) {
    let array = [];
    for (let llave = 0; llave < llaves.length; llave++) {
      if (json[obj][llaves[llave]]) {
        array.push(json[obj][llaves[llave]]);
      } else {
        array.push("");
      }
    }
    valores.push(array);
  }

  let text = "";
  let separador = ",";

  text += llaves.join(separador) + "\n";
  for (let i = 0; i < json.length; i++) {
    text += valores[i].join(separador) + "\n";
  }
  $csv.value=text;

})
