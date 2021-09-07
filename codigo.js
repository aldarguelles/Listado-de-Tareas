let contenedor = document.querySelector(".contenedor");
let tarea = document.querySelector(".nuevaTarea");
let longitud = document.querySelector(".longitud");
let time = document.querySelector(".time");
let date = document.querySelector(".date");
let hora = document.querySelector(".fecha1");
let agregar = document.querySelector(".btn-agregar");
let local = window.localStorage;

tarea.addEventListener("keydown",()=>{tarea.maxLength=80;})
tarea.addEventListener("keyup",()=>{
	longitud.innerHTML = tarea.value.length+"/80";
	if (!tarea.value) longitud.innerHTML = "";
});

function guardarTareas(x,nuevaTarea){
	local.setItem(x,nuevaTarea);
	window.location.href = "";
}

agregar.addEventListener("click",()=>{
	if (!tarea.value) alert("Debe escribir una tarea");
	else if (tarea.value.length <= 4) alert("La tarea debe tener al menos 5 caracteres");
	else {
		let claves = Object.keys(local);
		let x = 1;
		if (claves == "") {
			let fecha = date.value.split("-");
			let nuevaTarea = [x,fecha[2],fecha[1],time.value,tarea.value,"azul"];
			setTimeout(function(){
				local.setItem(x,nuevaTarea);
				window.location.href = "";
				}, 100);
		} else {
			for(i of claves){
				if (local.getItem(i+1)) {
					x++
					continue
				} else {
					x++;
					let fecha = date.value.split("-"); 
					//let random = Math.round(Math.random() * 10000)
					let nuevaTarea = [x,fecha[2],fecha[1],time.value,tarea.value,"azul"];
					setTimeout(function(){
						local.setItem(x,nuevaTarea);
						window.location.href = "";
					}, 100);
				}
			}
		}
		}
	
})

const imprimirTareas = (tareaArray)=>{

	let divTiempo = document.createElement("div");
	let spanTiempo = document.createElement("span");

	let divTarea = document.createElement("div");
	let pTarea = document.createElement("p");
	let spanIconDel = document.createElement("span");
	let spanIconFin = document.createElement("span");

	if (tareaArray[1] && tareaArray[2] && tareaArray[3]) {
		spanTiempo.innerHTML = `${tareaArray[1]}/${tareaArray[2]} - ${tareaArray[3]}`;
	} else if (tareaArray[1] && tareaArray[2] && !tareaArray[3]) {
		spanTiempo.innerHTML = `${tareaArray[1]}/${tareaArray[2]}`;
	} else if (!tareaArray[1] && !tareaArray[2] && tareaArray[3]) {
		spanTiempo.innerHTML = `${tareaArray[3]}`;	
	}
	divTiempo.classList.add("tiempo-listado","azul");
	divTiempo.appendChild(spanTiempo);
	pTarea.innerHTML = `${tareaArray[4]}`;
	spanIconFin.innerHTML = "check_circle_outline";
	spanIconFin.classList.add("material-icons","btn-icon");
	spanIconFin.title = "Tarea terminada";
	
	spanIconDel.innerHTML = "delete_forever";
	spanIconDel.classList.add("material-icons");
	spanIconDel.title = "Borrar tarea"
	spanIconDel.addEventListener("click",()=>{
		if (confirm("¿Esta seguro que desea eliminar esta tarea?")) {
			local.setItem(tareaArray[0],false);
			window.location.href = "";
		}
			
	})
	divTarea.classList.add("listado","listado-azul","azul");

	if (tareaArray[5] == "verde") {
		divTiempo.classList.replace("azul","verde");
		divTarea.classList.replace("azul","verde");
		divTarea.classList.replace("listado-azul","listado-verde");
		spanIconFin.classList.add("verde");
	} else {
		spanIconFin.addEventListener("click",function cambiarColor(){
			if (confirm("¿Ya se ha completado la tarea?")) {
				tareaArray[5] = "verde";
				local.setItem(tareaArray[0],tareaArray)
				divTiempo.classList.replace("azul","verde");
				divTarea.classList.replace("azul","verde");
				divTarea.classList.replace("listado-azul","listado-verde");
				spanIconFin.classList.add("verde");
				spanIconFin.removeEventListener("click",cambiarColor);
			}
		})
	}

	divTarea.appendChild(pTarea);
	divTarea.appendChild(spanIconFin);
	divTarea.appendChild(spanIconDel);

	contenedor.appendChild(divTiempo);
	contenedor.appendChild(divTarea);
}

const cargarTareas = ()=>{
	let claves = Object.keys(local);
	claves.sort(function(a, b){return a - b});
	for(i in claves){
		let tareaGuardada = local.getItem(claves[i]);
		if (tareaGuardada != "false") {
			let tareaArray = tareaGuardada.split(",");
			imprimirTareas(tareaArray);
		}
	}
}

cargarTareas();