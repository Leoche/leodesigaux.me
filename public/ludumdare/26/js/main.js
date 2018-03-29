var Catlife = {
	ctx:null,
	w:600,
	h:300,
	imgs:{},
	tickControll:0,
	tickLim:3,
	map:{i:10000,max:10000,min:10001,offsetX:0,chunks:[]},
	cat:{x:45,y:0,oy:0,bot:false,top:true,pos:0,state:0,statestep:0,tick:0,dead:false,tickcat:0},
	keys:{left:false,right:false,up:false,down:false,space:false},
	sky:{x:0,tick:0},
	ia:{cartick:0,mototick:0,tickLim:100,cars:[],motos:[]},
	ingame:false,
	score:0,
	init:function(){
		var canvas = document.getElementById("game");
		Catlife.ctx = canvas.getContext("2d");
		Catlife.controlsRegister();
		Catlife.imagesRegister();
		Catlife.generateMap();
		Catlife.update();
	},
	play:function(){
		Catlife.ingame = true;
		Catlife.cat.x = 25;
		Catlife.cat.dead=false;
		Catlife.score = 0;
		Catlife.ia={hard:10,cartick:0,mototick:0,tickLim:100,cars:[],motos:[]};
		Catlife.keys.up=false;Catlife.keys.down=false;Catlife.keys.left=false;Catlife.keys.right=false;Catlife.keys.space=false;
	},
	imagesRegister:function(){
		Catlife.imgs.cat = document.getElementById("image-cat"); 
		Catlife.imgs.roads = document.getElementById("image-roads"); 
		Catlife.imgs.sky = document.getElementById("image-sky"); 
		Catlife.imgs.maison = document.getElementById("image-maison"); 
		Catlife.imgs.garage = document.getElementById("image-garage");
		Catlife.imgs.murs = document.getElementById("image-murs"); 
		Catlife.imgs.voitures = document.getElementById("image-voitures"); 
		Catlife.imgs.motos = document.getElementById("image-motos"); 
		Catlife.imgs.buildings = document.getElementById("image-buildings"); 
		Catlife.imgs.gameover = document.getElementById("image-gameover"); 
		Catlife.imgs.logo = document.getElementById("image-logo"); 
	},
	controlsRegister:function(c){
		window.onkeydown=function(e){
			if(!Catlife.ingame||Catlife.cat.dead){
				if(e.keyCode==32){
					Catlife.play();
				}
				return;
			}
			switch(e.keyCode){
				case 38:
					Catlife.keys.up=true;
				break;
				case 40:
					Catlife.keys.down=true;
				break;
				case 37:
					Catlife.keys.left=true;
				break;
				case 39:
					Catlife.keys.right=true;
				break;
				case 32:
					Catlife.keys.space=true;
				break;
			}
		};
		window.onkeyup=function(e){
			if(!Catlife.ingame||Catlife.cat.dead){
				return;
			}
			switch(e.keyCode){
				case 38:
					Catlife.keys.up=false;
				break;
				case 40:
					Catlife.keys.down=false;
				break;
				case 37:
					Catlife.keys.left=false;
				break;
				case 39:
					Catlife.keys.right=false;
				break;
				case 32:
					Catlife.keys.space=false;
				break;
			}
		};
	},
	update:function(){
		Catlife.updateGame();
		if(Catlife.ingame&&!Catlife.cat.dead) Catlife.updateIa();
		Catlife.render();
		requestAnimFrame(Catlife.update);
	},
	updateIa:function(){
		Catlife.ia.cartick++;
		if(Catlife.ia.cartick>Catlife.ia.tickLim||Math.random()*5<1){
			if(Catlife.ia.tickLim>20) Catlife.ia.tickLim-=2;
			Catlife.ia.cartick = 0;
			if(Catlife.ia.cars.length<=Math.floor(Catlife.score/10)){
				Catlife.score++;
				Catlife.ia.cars.push(new Catlife.car());
			}
		}
		Catlife.ia.mototick++;
		if(Catlife.ia.mototick>Catlife.ia.tickLim||Math.random()*5<1){
			if(Catlife.ia.tickLim>20) Catlife.ia.tickLim-=2;
			Catlife.ia.mototick = 0;
			if(Catlife.ia.motos.length<=Math.floor(Catlife.score/10)){
				Catlife.score++;
				Catlife.ia.motos.push(new Catlife.moto());
			}
		}

	},
	checkDeath:function(){
		if(Catlife.cat.bot){
			for(j in Catlife.ia.cars){
				var i = Catlife.ia.cars[j];
				if((Catlife.cat.state!=2||(Catlife.cat.state==2&&Catlife.cat.statestep>4))&&(Catlife.cat.state!=6||(Catlife.cat.state==6&&Catlife.cat.statestep>4))&&Catlife.cat.x*10<i.x&&i.sens>0&&i.x-Catlife.cat.x*10<60) Catlife.cat.dead = true;
				if((Catlife.cat.state!=2||(Catlife.cat.state==2&&Catlife.cat.statestep>4))&&(Catlife.cat.state!=6||(Catlife.cat.state==6&&Catlife.cat.statestep>4))&&Catlife.cat.x*10>i.x&&i.sens<0&&Catlife.cat.x*10-i.x<100) Catlife.cat.dead = true;
			}
		}else{
			for(j in Catlife.ia.motos){
				var i = Catlife.ia.motos[j];
				if((Catlife.cat.state!=2||(Catlife.cat.state==2&&Catlife.cat.statestep>4))&&(Catlife.cat.state!=6||(Catlife.cat.state==6&&Catlife.cat.statestep>4))&&Catlife.cat.x*10<i.x&&i.sens>0&&i.x-Catlife.cat.x*10<50) Catlife.cat.dead = true;
				if((Catlife.cat.state!=2||(Catlife.cat.state==2&&Catlife.cat.statestep>4))&&(Catlife.cat.state!=6||(Catlife.cat.state==6&&Catlife.cat.statestep>4))&&Catlife.cat.x*10>i.x&&i.sens<0&&Catlife.cat.x*10-i.x<70) Catlife.cat.dead = true;
			}
		}
		if(Catlife.cat.dead){
			Catlife.keys.up=false;Catlife.keys.down=false;Catlife.keys.left=false;Catlife.keys.right=false;Catlife.keys.space=false;
		}
	},
	updateGame:function(){
		Catlife.checkDeath();
		Catlife.tickControll++;
		if(Catlife.tickControll<Catlife.tickLim) return;
		for(j in Catlife.ia.cars){
			if(Catlife.cat.dead) break;
			var i = Catlife.ia.cars[j];
			if(Catlife.ia.cars[j].state>4) Catlife.ia.cars[j].state=0;
			else Catlife.ia.cars[j].state++;
			Catlife.ia.cars[j].x-=10*Catlife.ia.cars[j].sens;
			if(Math.abs(Catlife.cat.x-i.x)>1500) Catlife.ia.cars.splice(j,1);
			if(i.sens==-1&&i.x>600) Catlife.ia.cars.splice(j,1);
			if(i.sens==1&&i.x<-120) Catlife.ia.cars.splice(j,1);
		}
		for(j in Catlife.ia.motos){
			if(Catlife.cat.dead) break;
			var i = Catlife.ia.motos[j];
			if(Catlife.ia.motos[j].state>4) Catlife.ia.motos[j].state=0;
			else Catlife.ia.motos[j].state++;
			Catlife.ia.motos[j].x-=10*Catlife.ia.motos[j].sens;
			if(Math.abs(Catlife.cat.x-i.x)>1500) Catlife.ia.motos.splice(j,1);
			if(i.sens==-1&&i.x>600) Catlife.ia.motos.splice(j,1);
			if(i.sens==1&&i.x<-120) Catlife.ia.motos.splice(j,1);
		}
		Catlife.tickControll = 0;
		if(Catlife.keys.space){tickcat=0;
			if(Catlife.cat.state>3){
				if(Catlife.cat.state!=6) Catlife.cat.statestep=5; Catlife.cat.state=6;
			}else{
				if(Catlife.cat.state!=2) Catlife.cat.statestep=5; Catlife.cat.state=2;
			}
		}
		if(Catlife.keys.right&&Catlife.cat.state!=2){
			if(Catlife.cat.state>3){
				Catlife.cat.state-=4;
			}else{
				if(Catlife.cat.state!=1) Catlife.cat.statestep=2; Catlife.cat.state=1;
			}
		}
		if(Catlife.keys.left&&Catlife.cat.state!=6){
			if(Catlife.cat.state<4){
				Catlife.cat.state+=4;
			}else{
				if(Catlife.cat.state!=5) Catlife.cat.statestep=2; Catlife.cat.state=5;
			}
		}
		if(Catlife.cat.pos==0&&Catlife.cat.oy!=0){
			Catlife.cat.oy--;
			if(Catlife.cat.state>3){
				if(Catlife.cat.state!=5) Catlife.cat.statestep=2; Catlife.cat.state=5;
			}else{
				if(Catlife.cat.state!=1) Catlife.cat.statestep=2; Catlife.cat.state=1;
			}
		}
		if(Catlife.cat.pos==1&&Catlife.cat.oy!=6){
			Catlife.cat.oy++;
			if(Catlife.cat.state>3){
				if(Catlife.cat.state!=5) Catlife.cat.statestep=2; Catlife.cat.state=5;
			}else{
				if(Catlife.cat.state!=1) Catlife.cat.statestep=2; Catlife.cat.state=1;
			}
		}
		if(Catlife.keys.down && Catlife.cat.bot==false &&Catlife.cat.state!=6&&Catlife.cat.state!=2){tickcat=0;
			Catlife.cat.pos=1;
		}
		if(Catlife.keys.up && Catlife.cat.top==false &&Catlife.cat.state!=6&&Catlife.cat.state!=2){tickcat=0;
			Catlife.cat.pos=0;
		}
		if(Catlife.cat.oy>3){Catlife.cat.bot=true;Catlife.cat.top=false;}
		else{Catlife.cat.bot=false;Catlife.cat.top=true;}
		//EN COURSE
		if(Catlife.cat.state==1){tickcat=0;
			if(Catlife.cat.statestep<3) Catlife.cat.statestep++; else{
				Catlife.cat.statestep=0; Catlife.cat.state=(Catlife.keys.right)?1:0;
			} Catlife.scroll(true);
		}else if(Catlife.cat.state==5){
			if(Catlife.cat.statestep<3) Catlife.cat.statestep++; else{
				Catlife.cat.statestep=0; Catlife.cat.state=(Catlife.keys.left)?5:4;
			} Catlife.scroll(false);
		}
		//EN SAUT
		if(Catlife.cat.state==2){tickcat=0;
			if(Catlife.cat.statestep<5){
				Catlife.cat.statestep+=.50;
				if(Catlife.cat.statestep==1||Catlife.cat.statestep==2)Catlife.cat.y-=4;
				if(Catlife.cat.statestep==4||Catlife.cat.statestep==5)Catlife.cat.y+=4;
			}else{
				Catlife.cat.statestep=0; Catlife.cat.state=(Catlife.keys.space)?2:(Catlife.keys.right)?1:0;
			} Catlife.scroll(true);
		}else if(Catlife.cat.state==6){
			if(Catlife.cat.statestep<5){
				Catlife.cat.statestep+=.50;
				if(Catlife.cat.statestep==1||Catlife.cat.statestep==2)Catlife.cat.y-=4;
				if(Catlife.cat.statestep==4||Catlife.cat.statestep==5)Catlife.cat.y+=4;
			}else{
				Catlife.cat.statestep=0; Catlife.cat.state=(Catlife.keys.space)?6:(Catlife.keys.left)?5:4;
			} Catlife.scroll(false);
		}
		//Long repos
		if(Catlife.cat.state==3){
			if(Catlife.cat.statestep<8)Catlife.cat.statestep++;
		}
		if(Catlife.cat.state==7){
			if(Catlife.cat.statestep<8)Catlife.cat.statestep++;
		}
		Catlife.cat.tickcat++;
		if(Catlife.cat.tickcat>30){
			Catlife.cat.tickcat=0;
			if(Catlife.cat.state==0) Catlife.cat.state=3;
			if(Catlife.cat.state==4) Catlife.cat.state=7;
			if(Catlife.cat.state==3&&Catlife.cat.statestep==8) Catlife.cat.statestep=7;
			if(Catlife.cat.state==7&&Catlife.cat.statestep==8) Catlife.cat.statestep=7;
		};
	},
	scroll:function(sens,boost){
		var b = (boost==undefined)?0:boost;
		if((Catlife.cat.x<25&&Catlife.cat.state<4)||(Catlife.cat.x>25&&Catlife.cat.state>3)||(Catlife.cat.state>3&&Catlife.cat.x>3+b&&Catlife.map.i==0)){
			if(sens) Catlife.cat.x+=2+b; else Catlife.cat.x-=2+b;
		}else{
			if(sens) Catlife.map.offsetX-=2+b; else if(!(Catlife.map.i==0&&Catlife.map.offsetX>-2-b)) Catlife.map.offsetX+=2+b;
			if(Catlife.map.offsetX<=-17){
				Catlife.map.offsetX+=17;
				Catlife.map.i++;
				if(Catlife.map.i+5>Catlife.map.max) Catlife.generateChunk(Catlife.map.max);
				Catlife.sky.x-=.5;
			}
			if(Catlife.map.offsetX>=17){
				Catlife.map.offsetX-=17;
				Catlife.map.i--;
				Catlife.generateChunk(Catlife.map.min-1);
				Catlife.sky.x+=.5;
			}
			for(j in Catlife.ia.cars){
				if(sens) Catlife.ia.cars[j].x -= (2+b)*10;
				else Catlife.ia.cars[j].x += (2+b)*10;
			}
			for(j in Catlife.ia.motos){
				if(sens) Catlife.ia.motos[j].x -= (2+b)*10;
				else Catlife.ia.motos[j].x += (2+b)*10;
			}
		}
	},
	render:function(){
		Catlife.ctx.clearRect(0,0,Catlife.w,Catlife.h);
		Catlife.ctx.fillStyle = "black";
		Catlife.ctx.fillRect(0,0,Catlife.w,Catlife.h);
		Catlife.drawSky();
		Catlife.drawChunks();
		Catlife.drawCat();
		Catlife.drawIa();
		Catlife.drawMenu();
	},
	drawMenu:function(){
		if(Catlife.cat.dead){
			Catlife.ctx.drawImage(Catlife.imgs.gameover,90,100);
			Catlife.ctx.font = '24px "Somy"';
			Catlife.ctx.fillStyle = "rgba(255,255,255,.8)";
			Catlife.ctx.fillText("Score:"+Catlife.score,(600-Catlife.ctx.measureText("Score:"+Catlife.score).width)/2,210);
		}
		if(!Catlife.ingame){
			Catlife.ctx.drawImage(Catlife.imgs.logo,50,130);
			Catlife.ctx.font = '30px "Somy"';
			Catlife.ctx.fillStyle = "rgba(255,255,255,.5)";
			Catlife.ctx.fillText("Press Space to play",110,280);
		}
		if(Catlife.ingame&&!Catlife.cat.dead){
			Catlife.ctx.fillStyle = "rgba(0,0,0,.5)";
			Catlife.ctx.fillText("Score:"+Catlife.score,10,26);
		}
	},
	drawIa:function(){
		for(j in Catlife.ia.motos){
			var i = Catlife.ia.motos[j];
			Catlife.ctx.drawImage(Catlife.imgs.motos,((i.sens<0)?160:0)+((i.state>2)?0:80),i.couleur*100,80,100,i.x,120,80,100);
		}
		for(j in Catlife.ia.cars){
			var i = Catlife.ia.cars[j];
			Catlife.ctx.drawImage(Catlife.imgs.voitures,((i.sens<0)?240:0)+((i.state>2)?0:120),i.couleur*70,120,70,i.x,210,120,70);
		}
	},
	drawSky:function(){
		Catlife.sky.tick++;
		if(Catlife.sky.tick>200){ Catlife.sky.x--; Catlife.sky.tick=0; }
		if(Catlife.sky.x<=-120 || Catlife.sky.x>=120)Catlife.sky.x=0;
		if(Catlife.sky.x<0) Catlife.ctx.drawImage(Catlife.imgs.sky,Catlife.sky.x*10+1200,0);
		if(Catlife.sky.x>0) Catlife.ctx.drawImage(Catlife.imgs.sky,Catlife.sky.x*10-1200,0);
		Catlife.ctx.drawImage(Catlife.imgs.sky,Catlife.sky.x*10,0);
	},
	drawCat:function(){
		Catlife.ctx.fillStyle="rgba(0,0,0,.1)";
		Catlife.ctx.fillRect(Catlife.cat.x*10,Catlife.cat.oy*10+210,80,10);
		Catlife.ctx.drawImage(Catlife.imgs.cat,Math.floor(Catlife.cat.statestep)*80,Catlife.cat.state*70,80,70,Catlife.cat.x*10,(Catlife.cat.y+15+Catlife.cat.oy)*10,80,70);
	},
	drawChunks:function(){
		for(var i=4;i>=-2;i--) Catlife.drawChuckById(Catlife.map.i,i);
	},
	drawChuckById:function(id,i){
		var o = Catlife.map.offsetX*10;
		Catlife.ctx.drawImage(Catlife.imgs.roads,0,Catlife.map.chunks[id+i].sol*150,170,150,170*i+o,Catlife.h-150,170,150);
		Catlife.ctx.drawImage(Catlife.imgs.murs,0,Catlife.map.chunks[id+i].mur*50,170,50,170*i+o-10,110,180,50);
		if(Catlife.map.chunks[id+i].building==0) Catlife.drawHouse(id,i);
		if(Catlife.map.chunks[id+i].building==1) Catlife.drawGarage(id,i);
		if(Catlife.map.chunks[id+i].building==2) Catlife.drawBuilding(id,i);
	},
	drawBuilding:function(id,i){
		var o = Catlife.map.offsetX*10;
		Catlife.ctx.drawImage(Catlife.imgs.buildings,Catlife.map.chunks[id+i].buildingData.type*230,0,230,190,170*i+o-20,0,230,190);
	}, //23 19
	drawHouse:function(id,i){
		var o = Catlife.map.offsetX*10;
		Catlife.ctx.drawImage(Catlife.imgs.maison,480,0,170,110,170*i+o,80,170,110);
		Catlife.ctx.drawImage(Catlife.imgs.maison,Catlife.map.chunks[id+i].buildingData.fenetrehaut*90,210,90,40,170*i+o+70,70,90,40);
		Catlife.ctx.drawImage(Catlife.imgs.maison,Catlife.map.chunks[id+i].buildingData.toitcouleur*160,Catlife.map.chunks[id+i].buildingData.toit*70,160,70,170*i+o+20,30,160,70);
		Catlife.ctx.drawImage(Catlife.imgs.maison,Catlife.map.chunks[id+i].buildingData.fenetredroite*60,250,60,60,170*i+o+100,120,60,60);
		Catlife.ctx.drawImage(Catlife.imgs.maison,Catlife.map.chunks[id+i].buildingData.devanture*80,310,80,40,170*i+o+120,170,80,40);
	},
	drawGarage:function(id,i){
		var o = Catlife.map.offsetX*10;
		Catlife.ctx.drawImage(Catlife.imgs.garage,Catlife.map.chunks[id+i].buildingData.garage*110,0,110,70,170*i+o+100,100,110,70);
		Catlife.ctx.drawImage(Catlife.imgs.garage,Catlife.map.chunks[id+i].buildingData.garage*60,70,60,50,170*i+o+140+Math.floor(Math.random())*10,140+Math.floor(Math.random())*10,60,50);
	},
	generateMap:function(){
		Catlife.map.chunks[Catlife.map.i] = new Catlife.chunk();
		for(var i=-5;i<6;i++) Catlife.generateChunk(Catlife.map.i+i);
	},
	generateChunk:function(t){
		if(t>Catlife.map.i){Catlife.map.chunks[t] = new Catlife.chunk();Catlife.map.max++;}
		else{Catlife.map.chunks[t] = new Catlife.chunk();Catlife.map.min--;}
	},
	chunk:function(){
		this.sol=0;
		this.building = Math.floor(Math.random()*2);
		this.mur = Math.floor(Math.random()*4);
		if(this.building == 0) this.buildingData = new Catlife.generateHouse();
		if(this.building == 1){
			if(Catlife.map.chunks[(Catlife.map.max-1)]!=undefined&&(Catlife.map.max!=0&&Catlife.map.chunks[(Catlife.map.max-1)].building != 1)) this.buildingData = new Catlife.generateGarage();
			else{ this.buildingData = new Catlife.generateHouse(); this.building = 0;}
		} 
		if(Catlife.map.chunks[(Catlife.map.max-1)]!=undefined&&Catlife.map.max!=0&&Catlife.map.chunks[(Catlife.map.max-1)].building == 1){ this.buildingData = new Catlife.generateHouse(); this.building = 0;}
		if(Math.floor(Math.random()*7)==1){ this.buildingData = new Catlife.generateBuilding(); this.building = 2;}
	},
	generateBuilding:function(){
		this.type = Math.floor(Math.random()*3);
	},
	generateHouse:function(){
		this.toit = Math.floor(Math.random()*3);
		this.toitcouleur = Math.floor(Math.random()*3);
		this.fenetrehaut = Math.floor(Math.random()*5);
		this.fenetredroite = Math.floor(Math.random()*7);
		this.devanture = Math.floor(Math.random()*5);
	},
	generateGarage:function(){
		this.garage = Math.floor(Math.random()*2);
		this.voiture = Math.floor(Math.random()*4);
		this.double = Math.floor(Math.random()*2);
	},
	car:function(){
		if(Catlife.ia.motos[0]!=undefined&&Catlife.ia.motos.length<2)
		this.sens = Catlife.ia.motos[0].sens*-1;
		else this.sens = Math.round(Math.random())*2-1;
		this.couleur = Math.floor(Math.random()*3);
		this.x = -120+this.sens*720+Math.floor(Math.random())*1000;
		this.speed = 10;
		this.state=0;
	},
	moto:function(){
		if(Catlife.ia.cars[0]!=undefined&&Catlife.ia.cars.length<2)
		this.sens = Catlife.ia.cars[0].sens*-1;
		else this.sens = Math.round(Math.random())*2-1;
		this.couleur = Math.floor(Math.random()*3);
		this.x = -220+this.sens*820+this.sens*Math.floor(Math.random())*1000;
		this.speed = 10;
		this.state=0;
	}

};
window.onload = function(){Catlife.init();}
window.requestAnimFrame=(function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(callback){window.setTimeout(callback,1000/60);};})();