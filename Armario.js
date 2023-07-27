import * as THREE from '../libs/three.module.js'
import * as TWEEN from '../libs/tween.esm.js'

class Armario extends THREE.Object3D {
  constructor() {
    super();
    const cuerpoArmario = this.createCuerpoArmario();
    this.puertaSuperior = this.createPuertaSuperior();
    this.puertaInferior = this.createPuertaInferior();
    this.add(cuerpoArmario,this.puertaSuperior, this.puertaInferior);
    this.abrirSuperior = this.crearAbrirSuperior();
    this.abrirInferior = this.crearAbrirInferior();
    this.cerrarSuperior = this.crearCerrarSuperior();
    this.cerrarInferior = this.crearCerrarInferior();
    this.cerradoSuperior = true;
    this.cerradoInferior = true;
  }
  
  createCuerpoArmario(){

    var texture = new THREE.TextureLoader().load('../imgs/wood.jpg');
    const cuerpoArmario = new THREE.Object3D();

    //18mm ancho, alto 210cm, largo 44cm
    const tableroLateralGeom = new THREE.BoxGeometry(1.8, 213.6, 44);
    const tableroLateralMat = new THREE.MeshPhongMaterial({map:texture});
    const tablerolateralIzquierdo = new THREE.Mesh(tableroLateralGeom,tableroLateralMat);

    //0.9 es la mitad de los mm de ancho y 49.25 es la mitad de 98.5(ancho total del armario por dentro)
    tablerolateralIzquierdo.position.set(-0.9-49.25,0,0);

    const tableroLateralDerecho = new THREE.Mesh(tableroLateralGeom,tableroLateralMat);
    tableroLateralDerecho.position.set(0.9+49.25,0,0);


    //Tableros inferior y superior
    const tableroSuperiorGeom = new THREE.BoxGeometry(98.5, 1.8, 44);
    const trableroSuperiorMat = new THREE.MeshPhongMaterial({map:texture});

    const tableroSuperior = new THREE.Mesh(tableroSuperiorGeom,trableroSuperiorMat);
    tableroSuperior.position.set(0,0.9+105,0);

    const tableroInferior = new THREE.Mesh(tableroSuperiorGeom,trableroSuperiorMat);
    tableroInferior.position.set(0,-0.9-105,0);

    //Pared trasera
    const tablaTraseraGeom = new THREE.BoxGeometry(102.1, 213.6, 1.8);
    const tablaTraseraMat = new THREE.MeshPhongMaterial({map:texture});

    const tablaTrasera = new THREE.Mesh(tablaTraseraGeom,tablaTraseraMat);
    tablaTrasera.position.set(0,0,-0.9-22);

    //Tabla de  abajo
    const tablaInferiorGeom = new THREE.BoxGeometry(98.5, 10, 1.8);
    const tablaInferiorMat = new THREE.MeshPhongMaterial({map:texture});

    const tablaInferior = new THREE.Mesh(tablaInferiorGeom,tablaInferiorMat);
    tablaInferior.position.set(0,5-105,-0.9+22);

    //Piezas interiores
    const piezaInteriorGeom = new THREE.BoxGeometry(6, 33, 6);   
    piezaInteriorGeom.translate(0,16.5-105,-3+22-1.8);
    const piezaInteriorMat = new THREE.MeshPhongMaterial({map:texture});

    const piezaInteriorI = new THREE.Mesh(piezaInteriorGeom,piezaInteriorMat);
    const piezaInteriorD = piezaInteriorI.clone();
    
    piezaInteriorI.position.set(3-49.25,0,0);
    piezaInteriorD.position.set(-3+49.25,0,0);

    


    //Añadir al armario
    cuerpoArmario.add(
        tablerolateralIzquierdo,
        tableroLateralDerecho,
        tableroSuperior, 
        tableroInferior, 
        tablaTrasera,
        tablaInferior,
        piezaInteriorI,
        piezaInteriorD,
    );
    
    return cuerpoArmario;
    
  }

  createPuertaSuperior(){
    var texture = new THREE.TextureLoader().load('../imgs/wood.jpg');
    //Puerta superior
    const puertaSuperiorGeom = new THREE.BoxGeometry(98.5, 66, 1.8);   
    puertaSuperiorGeom.translate(0,-33,-0.9);

    const puertaSuperiorMat = new THREE.MeshPhongMaterial({map:texture});
    const puertaSuperior = new THREE.Mesh(puertaSuperiorGeom,puertaSuperiorMat);

    puertaSuperior.position.set(0,105,22);
    //puertaSuperior.rotateX(-90*(Math.PI/180));
    
    puertaSuperior.userData = this;
    puertaSuperior.name = "puertaSuperior";

    return puertaSuperior;
  }

  createPuertaInferior(){
    var texture = new THREE.TextureLoader().load('../imgs/wood.jpg');
    
    const puertaInferiorArribaGeom = new THREE.BoxGeometry(98.5,111,1.8);
    const puertaInferiorArribaMat = new THREE.MeshPhongMaterial({map:texture});

    const puertaInferiorArriba = new THREE.Mesh(puertaInferiorArribaGeom,puertaInferiorArribaMat);
    puertaInferiorArriba.position.set(0,(111/2)+9,0.9);
    puertaInferiorArriba.userData = this;
    puertaInferiorArriba.name ="puertaInferior";


    const puertaInferiorAbajoGeom = new THREE.BoxGeometry(86.5,23,1.8);
    puertaInferiorAbajoGeom.translate(0,(23/2)-14,0.9);

    const puertaInferiorAbajoMat = new THREE.MeshPhongMaterial({map:texture});
    const puertaInferiorAbajo = new THREE.Mesh(puertaInferiorAbajoGeom,puertaInferiorAbajoMat);

    //puertaInferiorAbajo.position.set(0,14-105+10,-0.9-0.9+22);
    

    const puertaInferior = new THREE.Object3D();
    puertaInferior.add(puertaInferiorAbajo);//,puertaInferiorArriba);
    puertaInferior.userData = this;
    puertaInferior.name ="puertaInferior";

    puertaInferiorAbajo.userData =this;
    puertaInferiorAbajo.name ="puertaInferior";

    
    

    puertaInferior.position.set(0,14-105+10,-0.9-0.9+22);
    puertaInferior.add(puertaInferiorArriba);


    return puertaInferior;
  }
  

  crearAbrirSuperior(){

    var armario = this;
    var objeto = this.puertaSuperior;

    var origen = {angulo:0};
    var destino = {angulo:-90*(Math.PI/180)};

    var abrir = new TWEEN.Tween(origen)
    .to(destino,2000)
    .onUpdate(function(){
      objeto.rotation.x = origen.angulo;
    })
    .onComplete(function(){
      armario.cerradoSuperior = false;
      
    });

    function animate() {
      requestAnimationFrame(animate);
      TWEEN.update();
    }

    animate();
    
    return abrir;
    

  }

  crearCerrarSuperior(){
    var armario = this;
    var objeto = this.puertaSuperior;

    var origen = {angulo:-90*(Math.PI/180)};
    var destino = {angulo:0};

    var abrir = new TWEEN.Tween(origen)
    .to(destino,2000)
    .onUpdate(function(){
      objeto.rotation.x = origen.angulo;
    })
    .onComplete(function(){
      armario.cerradoSuperior = true;
    });

    function animate() {
      requestAnimationFrame(animate);
      TWEEN.update();
    }

    animate();
    
    return abrir;
    

  }

  crearAbrirInferior(){
    var armario = this;
    var objeto = this.puertaInferior;

    var origen = {angulo:0};
    var destino = {angulo:90*(Math.PI/180)};

    var abrir = new TWEEN.Tween(origen)
    .to(destino,2000)
    .onUpdate(function(){
      objeto.rotation.x = origen.angulo;
    })
    .onComplete(function(){
      armario.cerradoInferior = false;
      
    });

    function animate() {
      requestAnimationFrame(animate);
      TWEEN.update();
    }

    animate();
    
    return abrir;
  }

  crearCerrarInferior(){
    var armario = this;
    var objeto = this.puertaInferior;

    var origen = {angulo:90*(Math.PI/180)};
    var destino = {angulo:0};

    var abrir = new TWEEN.Tween(origen)
    .to(destino,2000)
    .onUpdate(function(){
      objeto.rotation.x = origen.angulo;
    })
    .onComplete(function(){
      armario.cerradoInferior = true;
      
    });

    function animate() {
      requestAnimationFrame(animate);
      TWEEN.update();
    }

    animate();
    
    return abrir;
  }

  recibeClick(puertaSuperior){
    if(puertaSuperior){
        if(this.cerradoSuperior)
            this.abrirSuperior.start();
        else{
          this.cerrarSuperior.start();
        }
    }else{
        if(this.cerradoInferior)
            this.abrirInferior.start();
        else{
          this.cerrarInferior.start();
        }
    }
  }
  
  update () {
    // No hay nada que actualizar ya que la apertura de la grapadora se ha actualizado desde la interfaz
  }
}

export { Armario }
