var $ = {
	canvas:null,
	ctx:null,
	w:600,
	h:400,
	imgs:{},
	sounds:{},
	state:"null",
	tick:0,
	vars:{},
	keys:{up:0,down:0,left:0,right:0,space:0,ctrl:0,shift:0,enter:0,fire:0},
	P:null,
	E:null,
	map:null,
	ITEMS : ["heart","water","light","leaf","plasma","science","love","zen","ninja","poop"],
	ITEMSDESC : ["HP+","SHOOT+","POWER+","SIZE-","FIRE+","LUCK+","SHOT SPEED+","SHIELD+","SPEED+","FIRERATE+"],
	ITEMSUI : null,
	FRICTION:0.9,
	cursor:{x:-10,y:-10},
	waves:[
		{blindpeon:4},
		{blindpeon:4,peon:2},
		{peon:4,slider:2,blindpeon:1},
		{peon:6,slider:3,blindpeon:3},
		{peon:4,range:2,slider:1},//5
		{peon:10,range:2,slider:2,blindpeon:1},
		{range:2,tripeon:1,blindpeon:1},
		{bigpeon:3,slider:2},
		{peon:30,tripeon:1,slider:4,range:4},
		{peon:15,bigpeon:5,slider:10},//10
		{quad:2,range:5},
		{quad:5,range:2},
		{range:20},
		{tripeon:5},
		{tripeon:5,range:4},//15
		{tripeon:5,hardrange:4}, 
		{tripeon:5,tritripeon:2,movingrange:4},
		{tritripeon:5,movingrange:4},
		{tritripeon:10,movingrange:4,doublemovingrange:2},
		{tritripeon:5,movingrange:4,doublemovingrange:2},//20
		{bigquad:5},
		{bigquad:5,movingrange:4,doublemovingrange:2},
		{tritripeon:5,qua:4,range:2},
		{bigquad:5,hardrange:5,peon:20},
		{bigquad:15,bigpeon:4,doublemovingrange:2},//25
		{quad:5,hardrange:4,slider:10},
		{tritripeon:5,slider:4,doublemovingrange:2},
		{tripeon:15,movingrange:4,doublemovingrange:10},
		{bigquad:15,tritripeon:4,hardrange:2,hardrange:10},
		{bigquad:25,tritripeon:10,doublemovingrange:2,hardrange:10},
		{win:1}
	],
	wave:0,
	ennemiesLife:0,
	ennemiesLifeLeft:0,
	ennemiesLeft:0,
	ennemiesToSpawn:[],
	select:true,
	init:function(){
		$.canvas = document.getElementById("game");
		$.w = $.canvas.width; $.h = $.canvas.height;
		$.ctx = $.canvas.getContext("2d");
		$.ctx.font = '24px "Somy"';
		$.ctx.shadowBlur = 10;
		$.controlsRegister();
		$.imagesRegister();
		$.soundsRegister();
		$.initMenu();
		$.update();
	},
	initMenu:function(){
		$.tick = 0;
		$.state = "menu";
		$.vars.buttons=[
				{
					title:"Play",
					callback:function(){
						$.initGame();
					},
					hover:true
				},
				{
					title:"Controls & Rules",
					callback:function(){
						$.initRules();
					},
					hover:false
				},
				{
					title:"Credits",
					callback:function(){
						$.state = "credits";
					},
					hover:false
				}
			];
		$.vars.buttonsIndex=0;;
	},
	initGame:function(){
		$.tick = 0;
		$.P={shieldrad:0,shield:0,x:500,y:400,enemyspeed:1,r:20,god:0,rateTick:30,rate:30,vx:0,rad:0,vy:0,life:60,lifeMax:60,luck:0.9,stamina:5,staminaMax:5,speed:3,shot:1,shotr:2,shots:2,color:"rgba(255,255,255,.8)",
		heal:function(c){this.life+=c;if(this.life>this.lifeMax)this.life=this.lifeMax;},
		healstam:function(c){this.stamina+=c;if(this.stamina>this.staminaMax)this.stamina=this.staminaMax;},
		hurt:function(c){if($.P.god!=0) return;$.play("hurt"); this.life-=c;$.P.god=100;if(this.life<=0) $.initGameover();}
		};
		$.map={
			scroll:{x:-500,y:-400},
			w:1000,
			h:900,
			drops:[],
			bullets:[]
		};
		$.E = [];
		$.state = "game";
		$.wave = 0;
		$.map.drops.push(new $.Item($.map.w/2,$.map.h/2,10,"power"));
		$.ITEMSUICOLOR = ["e9270d","1157c0","efc916","49bd1b","731bbd","2fd5b8","f024d1","da7e12","1b6d27","61441b"];
		$.initStats();
	},
	initWave:function(){
		$.ennemiesLife=0;
		if($.ennemiesLeft == 0){
			$.select = false;
			for(var i in $.waves[$.wave]){
				switch(i){
					case "peon":
						for(var j=0;j<$.waves[$.wave][i];j++){
							var p = new $.Peon();
							$.ennemiesToSpawn.push(p);
							$.ennemiesLife+=p.life;
						}
					break;
					case "blindpeon":
						for(var j=0;j<$.waves[$.wave][i];j++){
							var p = new $.BlindPeon();
							$.ennemiesToSpawn.push(p);
							$.ennemiesLife+=p.life;
						}
					break;DoubleMovingRange
					case "range":
						for(var j=0;j<$.waves[$.wave][i];j++){
							var s = new $.Range();
							$.ennemiesToSpawn.push(s);
							$.ennemiesLife+=s.life;
						}
					break;
					case "doublemovingrange":
						for(var j=0;j<$.waves[$.wave][i];j++){
							var s = new $.DoubleMovingRange();
							$.ennemiesToSpawn.push(s);
							$.ennemiesLife+=s.life;
						}
					break;
					case "hardrange":
						for(var j=0;j<$.waves[$.wave][i];j++){
							var s = new $.HardRange();
							$.ennemiesToSpawn.push(s);
							$.ennemiesLife+=s.life;
						}
					break;
					case "movingrange":
						for(var j=0;j<$.waves[$.wave][i];j++){
							var s = new $.MovingRange();
							$.ennemiesToSpawn.push(s);
							$.ennemiesLife+=s.life;
						}
					break;
					case "slider":
						for(var j=0;j<$.waves[$.wave][i];j++){
							var s = new $.Slider();
							$.ennemiesToSpawn.push(s);
							$.ennemiesLife+=s.life;
						}
					break;
					case "quad":
						for(var j=0;j<$.waves[$.wave][i];j++){
							var s = new $.Quad();
							$.ennemiesToSpawn.push(s);
							$.ennemiesLife+=s.life;
						}
					break;
					case "bigquad":
						for(var j=0;j<$.waves[$.wave][i];j++){
							var s = new $.BigQuad();
							$.ennemiesToSpawn.push(s);
							$.ennemiesLife+=s.life;
						}
					break;
					case "bigpeon":
						for(var j=0;j<$.waves[$.wave][i];j++){
							var s = new $.Bigpeon();
							$.ennemiesToSpawn.push(s);
							$.ennemiesLife+=s.life;
						}
					break;
					case "tripeon":
						for(var j=0;j<$.waves[$.wave][i];j++){
							var s = new $.Tripeon();
							$.ennemiesToSpawn.push(s);
							$.ennemiesLife+=s.life;
						}
					break;
					case "tritripeon":
						for(var j=0;j<$.waves[$.wave][i];j++){
							var s = new $.TriTripeon();
							$.ennemiesToSpawn.push(s);
							$.ennemiesLife+=s.life;
						}
					break;
					case "win":
					$.initWin();
					break;
				}
			}
			$.ennemiesLifeLeft = $.ennemiesLife;
			$.ennemiesN = $.ennemiesLeft = $.ennemiesToSpawn.length;
			$.shuffle($.ennemiesToSpawn);
		}
		$.wave++;
	},
	initGameover:function(){
		$.play("die");
		$.state = "gameover";
		$.tick = 0;
	},
	initWin:function(){
		$.state = "win";
		$.tick = 0;
	},
	initRules:function(){
		$.state = "rules";
		$.tick = 0;
		$.vars.items = [];
		for(var i=0;i<10;i++){
			$.vars.items.push(new $.Item(270,-125+30*i,10,$.ITEMS[i]));
		}
		$.map = {};
		$.map.scroll = {x:0,y:0};
	},
	initCredits:function(){
		$.state = "credits";
		$.tick = 0;
	},
	imagesRegister:function(){
		$.imgs.background = document.getElementById("image-background"); 
		$.imgs.cursor = document.getElementById("image-cursor"); 
		$.imgs.leoche = document.getElementById("image-leoche"); 
		$.imgs.power = document.getElementById("image-power"); 
		$.imgs.powers = document.getElementById("image-powers"); 
	},
	soundsRegister:function(){
		$.sounds.die = document.getElementById("sound-die"); 
		$.sounds.hurt = document.getElementById("sound-hurt"); 
		$.sounds.pickup = document.getElementById("sound-pickup"); 
		$.sounds.quad = document.getElementById("sound-quad"); 
		$.sounds.select = document.getElementById("sound-select");
		$.sounds.shoot = document.getElementById("sound-shoot"); 
		$.sounds.shoot2 = document.getElementById("sound-shoot2"); 
		$.sounds.wave = document.getElementById("sound-wave"); 
		$.sounds.select2 = document.getElementById("sound-select2"); 
		$.sounds.split = document.getElementById("sound-split"); 
	},
	initStats:function(){

		$.ITEMSUI = ["HP:"+$.P.lifeMax,"SHOOT:"+$.P.staminaMax,"POWER:"+$.P.shotr,"SIZE:"+$.P.r,"FIRE:"+$.P.shot,"LUCK:"+$.P.luck,"SHOT SPEED:"+$.P.shots,"SHIELD:"+$.P.shield,"SPEED:"+$.P.speed,"FIRERATE:"+$.P.rate];
	},
	controlsRegister:function(){
		window.onkeydown = function(e){
			e.preventDefault();
			switch(e.keyCode){
				case 38:
					$.keys.up=1;
				break;
				case 90:
					$.keys.up=1;
				break;
				case 37:
					$.keys.left=1;
				break;
				case 81:
					$.keys.left=1;
				break;
				case 40:
					$.keys.down=1;
				break;
				case 83:
					$.keys.down=1;
				break;
				case 39:
					$.keys.right=1;
				break;
				case 68:
					$.keys.right=1;
				break;
				case 17:
					$.keys.ctrl=1;
				break;
				case 32:
					$.keys.space=1;
				break;
				case 16:
					$.keys.shift=1;
				break;
				case 13:
					$.keys.enter=1;
				break;
				case 27:
					$.keys.escape=1;
				break;
			}
		};
		window.onkeyup = function(e){
			e.preventDefault();
			switch(e.keyCode){
				case 38:
					$.keys.up=0;
				break;
				case 90:
					$.keys.up=0;
				break;
				case 37:
					$.keys.left=0;
				break;
				case 81:
					$.keys.left=0;
				break;
				case 40:
					$.keys.down=0;
				break;
				case 83:
					$.keys.down=0;
				break;
				case 39:
					$.keys.right=0;
				break;
				case 68:
					$.keys.right=0;
				break;
				case 17:
					$.keys.ctrl=0;
				break;
				case 32:
					$.keys.space=0;
				break;
				case 16:
					$.keys.shift=0;
				break;
				case 13:
					$.keys.enter=0;
				break;
				case 27:
					$.keys.escape=0;
				break;
			}
		};
		$.canvas.onmousemove = function(e){
			$.cursor.x=e.offsetX;
			$.cursor.y=e.offsetY;
			if($.state == "game"){
				$.P.rad=Math.atan(($.cursor.y-$.h/2)/($.cursor.x-$.w/2));
				if($.cursor.x-$.w/2<0){
					if($.P.rad<0) $.P.rad += Math.PI;
					else $.P.rad -= Math.PI;
				}
			}
		}
		$.canvas.onmouseleave = function(e){
			$.cursor.x=$.cursor.y=-10;
		}
		$.canvas.onmousedown = function(e){
			e.preventDefault();
			$.keys.fire = 1;
		}
		$.canvas.onmouseup = function(e){
			e.preventDefault();
			$.keys.fire = 0;
		}
	},
	update:function(){
		$.render();
		requestAnimFrame($.update);
		switch($.state){
			case "menu":
				$.updateMenu();
				$.renderMenu();
			break;
			case "rules":
				$.updateRules();
				$.renderRules();
			break;
			case "game":
				$.updateGame();
				$.renderGame();
			break;
			case "gameover":
				$.updateGameover();
				$.renderGameover();
			break;
			case "win":
				$.updateWin();
				$.renderWin();
			break;
			case "credits":
				$.updateCredits();
				$.renderCredits();
			break;
		}
		if($.cursor.x != -10) $.renderCursor();
	},
	updateMenu:function(){
		if($.keys.up == 1){
			$.play("select");
			$.keys.up=2;
			$.vars.buttons[$.vars.buttonsIndex].hover=false;
			if($.vars.buttonsIndex==0) $.vars.buttonsIndex = $.vars.buttons.length-1;
			else $.vars.buttonsIndex--;
			$.vars.buttons[$.vars.buttonsIndex].hover=true;
		}
		if($.keys.down == 1){
			$.play("select");
			$.keys.down=2;
			$.vars.buttons[$.vars.buttonsIndex].hover=false;
			if($.vars.buttonsIndex==$.vars.buttons.length-1) $.vars.buttonsIndex = 0;
			else $.vars.buttonsIndex++;
			$.vars.buttons[$.vars.buttonsIndex].hover=true;
		}
		if($.keys.enter == 1){
			$.play("select2");
			$.keys.enter=2;
			$.vars.buttons[$.vars.buttonsIndex].callback();
		}
	},
	updateRules:function(){
		if($.keys.escape == 1){
			$.play("select2");
			$.keys.escape=2;
			$.initMenu();
		}
	},
	updateCredits:function(){
		if($.keys.escape == 1){
			$.play("select2");
			$.keys.escape=2;
			$.initMenu();
		}
	},
	updateGameover:function(){
		if($.keys.escape == 1){
			$.play("select2");
			$.keys.escape=2;
			$.initMenu();
		}
	},
	updateWin:function(){
		if($.keys.escape == 1){
			$.play("select2");
			$.keys.escape=2;
			$.initMenu();
		}
	},
	updateGame:function(){
		$.P.rateTick++;
		if($.keys.escape == 1){
			$.keys.escape=2;
			$.initMenu();
		}
		if($.keys.up == 1) $.P.vy-=.1;
		if($.keys.down == 1) $.P.vy+=.1;
		if($.keys.left == 1) $.P.vx-=.1;
		if($.keys.right == 1) $.P.vx+=.1;
		if($.keys.fire == 1){
			if($.P.rate<$.P.rateTick)
				if($.P.stamina>1){
					$.play("shoot");
					if($.P.shot<10){

					if($.P.shot%2 == 0){
						for(var j=0;j< ($.P.shot-1)/2;j++){
							var r = Math.PI/12;
							var i = j+1;
							$.map.bullets.push(new $.Bullet(-$.map.scroll.x,-$.map.scroll.y,$.P.shotr,$.P.rad+r*i,$.P.shots,$.P.vx,$.P.vy,1,$.P.r));
							$.map.bullets.push(new $.Bullet(-$.map.scroll.x,-$.map.scroll.y,$.P.shotr,$.P.rad-r*i,$.P.shots,$.P.vx,$.P.vy,1,$.P.r));
						}
					}else{
						$.map.bullets.push(new $.Bullet(-$.map.scroll.x,-$.map.scroll.y,$.P.shotr,$.P.rad,$.P.shots,$.P.vx,$.P.vy,1,$.P.r));
						for(var j=0;j< ($.P.shot-1)/2;j++){
							var r = Math.PI/10;
							var i = j+1;
							$.map.bullets.push(new $.Bullet(-$.map.scroll.x,-$.map.scroll.y,$.P.shotr,$.P.rad+r*i,$.P.shots,$.P.vx,$.P.vy,1,$.P.r));
							$.map.bullets.push(new $.Bullet(-$.map.scroll.x,-$.map.scroll.y,$.P.shotr,$.P.rad-r*i,$.P.shots,$.P.vx,$.P.vy,1,$.P.r));
						}
					}
					}
					else{
						for(var i=0;i<$.P.shot+1;i++){
							var r = Math.PI*2/$.P.shot;
							$.map.bullets.push(new $.Bullet(-$.map.scroll.x,-$.map.scroll.y,$.P.shotr,$.P.rad+r*i,$.P.shots,$.P.vx,$.P.vy,1,$.P.r));
						}
					}
					$.P.stamina -= 1;
					$.P.rateTick = 0;
				}
		}
		for(var d in $.map.drops){
			if($.map.drops.length == 0) break;
			if($.collide($.map.drops[d],$.P)){
				$.map.drops[d].callback();
				if($.select && $.map.drops[d].type != "stam" && $.select && $.map.drops[d].type != "power" && $.map.drops[d].type != "halfheart"){
					$.map.drops = [];
					$.initWave();
					$.initStats();
				}
				$.play("pickup");
				$.map.drops.splice(d,1);
			}
				
		}
		$.updatePlayer();
		$.updateAI();
	},
	updateAI:function(){
		if(Math.random()>0.9 && $.ennemiesToSpawn.length !=0){
			$.E.push($.ennemiesToSpawn.splice(0,1)[0]);
		}
		$.changeColor("rgba(50,0,0,.9)");
		$.ctx.globalCompositeOperation = "lighter";
		for(var i in $.E){
			if(typeof $.E[i] != "NaN"){
				$.E[i].update(i);
				if(typeof $.E[i] != "undefined") $.E[i].render();
			}
		}
		if($.ennemiesLeft == 0 && !$.select){
			$.select=true;
			$.play("wave");
			$.map.drops.push(new $.Item($.map.w/2,$.map.h/2,10,"power"));
		}

		$.ctx.globalCompositeOperation = "source-over";
	},
	updatePlayer:function(){
		$.P.x += $.P.vx*$.P.speed;
		$.P.y += $.P.vy*$.P.speed;
		$.map.scroll.x -= $.P.vx*$.P.speed;
		$.map.scroll.y -= $.P.vy*$.P.speed;
		$.P.vy*=$.FRICTION;
		$.P.vx*=$.FRICTION;
		if($.P.god>0) $.P.god-=.5;
		$.resolveMapCollision($.P,true);
		if($.P.shield>0){
			$.P.shieldrad+=.05;
			if($.P.shieldrad>Math.PI*2) $.P.shieldrad=0;
		}
		if($.P.stamina<$.P.staminaMax) $.P.stamina += 0.02;
	},
	render:function(){
		$.ctx.globalCompositeOperation = "source-over";
		$.ctx.clearRect(0,0,$.w,$.h);
		$.ctx.fillStyle = "black";
		$.ctx.fillRect(0,0,$.w,$.h);
		$.changeColor("rgba(0,100,50,1)");
		//$.ctx.shadowOffsetY = 1000;
		//$.ctx.shadowBlur = 1000;
		//$.circle($.w/2,$.h/2-1000,100);
		$.ctx.shadowBlur = 10;
		$.ctx.shadowOffsetY = 0;
		$.ctx.fillStyle=$.ctx.createPattern($.imgs.background,"repeat");
		$.ctx.fillRect(0,0,$.w,$.h);
		if($.state == "game"){
			$.tick+=.05;
			if($.tick>1) $.tick = 0;
		}
	},
	renderMenu:function(){
		$.ctx.font = '48px "Somy"';
		$.changeColor("rgba(100,230,250,"+$.tick+")");
		$.tick+=.05;
		if($.tick>1) $.tick = .8;
		$.ctx.fillText("Digital Hero",50,100);
		var j = 0;
		$.ctx.font = '34px "Somy"';
		for(var i in $.vars.buttons){
			$.changeColor("rgba(30,100,50,.3)");
			if($.vars.buttons[i].hover){
				$.changeColor("rgba(230,250,250,.5)");
				$.triangle(30,233+(50*j),15);
			}
			$.ctx.fillText($.vars.buttons[i].title,50,250+(50*j));
			j++;
		}
		$.changeColor("rgba(250,250,250,.9)");
		$.circle($.w-20,$.h/2,100);
		$.circle($.w-20+Math.cos(Math.PI*6/5)*100,$.h/2+Math.sin(Math.PI*6/5)*100,20);
	},
	renderGameover:function(){
		$.ctx.font = '72px "Somy"';
		$.tick+=.05;
		if($.tick>1) $.tick = .7;
		$.changeColor("rgba(100,230,250,"+$.tick+")");
		$.ctx.fillText("GAME OVER",$.w/2-$.ctx.measureText("GAME OVER").width/2,200);
		$.ctx.font = '34px "Somy"';
		$.changeColor("rgba(10,100,80,"+$.tick+")");
		$.ctx.fillText("WAVE "+$.wave,$.w/2-$.ctx.measureText("WAVE "+$.wave).width/2,240);
		$.changeColor("rgba(30,100,50,.3)");
		$.ctx.font = '20px "Somy"';
		$.ctx.fillText("Press ESCAPE",$.w/2-$.ctx.measureText("Press ESCAPE").width/2,300);
	},
	renderWin:function(){
		$.ctx.font = '72px "Somy"';
		$.tick+=.05;
		if($.tick>1) $.tick = .7;
		$.changeColor("rgba(100,230,250,"+$.tick+")");
		$.ctx.fillText("YOU WIN",$.w/2-$.ctx.measureText("YOU WIN").width/2,200);
		$.ctx.font = '34px "Somy"';
		$.changeColor("rgba(10,100,80,"+$.tick+")");
		$.ctx.fillText("Pretty Impressive!",$.w/2-$.ctx.measureText("Pretty Impressive!").width/2,240);
		$.changeColor("rgba(30,100,50,.3)");
		$.ctx.font = '20px "Somy"';
		$.ctx.fillText("Press ESCAPE",$.w/2-$.ctx.measureText("Press ESCAPE").width/2,300);
	},
	renderUI:function(){
		$.changeColor("rgba(30,100,50,.2)");
		$.ctx.font = '14px "Somy"';
		for(var i in $.ITEMSUI){
			if($.select) $.changeColor("#"+$.ITEMSUICOLOR[i]);
			$.ctx.fillText($.ITEMSUI[i],20,75 + i*15);
		}
		$.ctx.shadowBlur=5;
		$.changeColor("rgba(100,200,100,.5)");
		$.ctx.strokeStyle = "rgba(100,200,100,.7)";
		$.ctx.beginPath();
		$.ctx.rect(20,20,$.P.lifeMax+6,16);
		$.ctx.stroke();
		$.ctx.beginPath();
		$.ctx.rect(20,40,$.P.staminaMax*2+6,16);
		$.ctx.stroke();
		$.ctx.beginPath();
		if(!$.select) $.ctx.rect(370,20,206,16);
		if(!$.select) $.ctx.fillRect(373,23,200*$.ennemiesLifeLeft/$.ennemiesLife,10);
		if(!$.select) $.ctx.fillText("WAVE "+$.wave,373,17);
		$.ctx.stroke();
		$.changeColor("rgba(250,50,50,.5)");
		$.ctx.beginPath();
		$.ctx.shadowBlur=10;
		$.ctx.rect(23,23,$.P.life,10);
		$.ctx.fill();
		$.changeColor("rgba(50,50,250,.5)");
		$.ctx.beginPath();
		$.ctx.rect(23,43,$.P.stamina*2,10);
		$.ctx.fill();
	},
	renderCredits:function(){
		$.ctx.font = '34px "Somy"';
		$.tick+=.05;
		if($.tick>1) $.tick = .7;
		$.changeColor("rgba(100,230,250,"+$.tick+")");
		$.ctx.fillText("Credits",20,50);
		$.changeColor("rgba(250,250,250,"+$.tick+")");
		$.ctx.fillText("www.leoche.org",$.w/2-$.ctx.measureText("www.leoche.org").width/2,300);
		$.ctx.drawImage($.imgs.leoche,$.w/2-91,60);
		$.changeColor("rgba(30,100,50,.3)");
		$.ctx.font = '20px "Somy"';
		$.ctx.fillText("Press ESCAPE",$.w/2-$.ctx.measureText("Press ESCAPE").width/2,380);
	},
	renderRules:function(){
		$.ctx.font = '34px "Somy"';
		$.tick+=.05;
		if($.tick>1) $.tick = .7;
		$.changeColor("rgba(100,230,250,"+$.tick+")");
		$.ctx.fillText("Rules",20,50);
		$.ctx.fillText("Upgrades",390,50);
		$.ctx.fillText("Controls",20,250);
		$.changeColor("rgba(30,100,50,.3)");
		$.ctx.font = '20px "Somy"';
		$.ctx.fillText("Press ESCAPE",$.w/2-$.ctx.measureText("Press ESCAPE").width/2,380);
		$.changeColor("rgba(30,100,50,.6)");
		$.ctx.font = '14px "Somy"';
		$.ctx.fillText("You embody a white digital hero who",20,80);
		$.ctx.fillText("fight against red enemies waves.",20,100);
		$.ctx.fillText("When you beat a wave,",20,130);
		$.ctx.fillText("you only can get one upgrade.",20,150);
		$.ctx.textAlign = "right";
		for(var i=0;i<10;i++){
			$.vars.items[i].render();
			$.ctx.fillText($.ITEMSDESC[i],550,83+30*i);
		}
		$.ctx.textAlign = "left";
		$.changeColor("rgba(30,100,50,.6)");
		$.ctx.fillText("MOVE: Arrows OR ZQSD",20,280);
		$.ctx.fillText("SHOOT: Mouse Click",20,300);
		$.ctx.fillText("BACK: Escape",20,320);
	},
	renderGame:function(){
		$.renderMap();
		$.renderPlayer();
		$.ctx.globalCompositeOperation = "lighter";
		$.renderUI();
		$.ctx.globalCompositeOperation = "source-over";
	},
	renderPlayer:function(){
		if($.P.god%2 == 0) $.changeColor($.P.color);
		else $.changeColor("rgba(255,255,255,.3)");
		$.circle($.w/2+$.P.x+$.map.scroll.x,$.h/2+$.P.y+$.map.scroll.y,$.P.r);
		if($.P.shot<10){
			if($.P.shot%2 == 0){
				for(var j=0;j< ($.P.shot-1)/2;j++){
					var r = Math.PI/12;
					var i = j+1;
					$.circle($.w/2+$.P.x+$.map.scroll.x+Math.cos($.P.rad+r*i)*$.P.r,$.h/2+$.P.y+$.map.scroll.y+Math.sin($.P.rad+r*i)*$.P.r,3);
					$.circle($.w/2+$.P.x+$.map.scroll.x+Math.cos($.P.rad-r*i)*$.P.r,$.h/2+$.P.y+$.map.scroll.y+Math.sin($.P.rad-r*i)*$.P.r,3);
				}
			}else{
				$.circle($.w/2+$.P.x+$.map.scroll.x+Math.cos($.P.rad)*$.P.r,$.h/2+$.P.y+$.map.scroll.y+Math.sin($.P.rad)*$.P.r,3);
				for(var j=0;j< ($.P.shot-1)/2;j++){
					var r = Math.PI/10;
					var i = j+1;
					$.circle($.w/2+$.P.x+$.map.scroll.x+Math.cos($.P.rad+r*i)*$.P.r,$.h/2+$.P.y+$.map.scroll.y+Math.sin($.P.rad+r*i)*$.P.r,3);
					$.circle($.w/2+$.P.x+$.map.scroll.x+Math.cos($.P.rad-r*i)*$.P.r,$.h/2+$.P.y+$.map.scroll.y+Math.sin($.P.rad-r*i)*$.P.r,3);
				}
			}
		}else{
			for(var j=0;j<$.P.shot+1;j++){
				var r = Math.PI*2/$.P.shot;
				var i = j;
				$.circle($.w/2+$.P.x+$.map.scroll.x+Math.cos($.P.rad+r*i)*$.P.r,$.h/2+$.P.y+$.map.scroll.y+Math.sin($.P.rad+r*i)*$.P.r,3);
			}
		}
		if($.P.shield==0) return;
		$.changeColor("rgba(232,118,19,.8)");
		for(var i=0;i<$.P.shield;i++){
			$.circle($.w/2+$.P.x+$.map.scroll.x+Math.cos(Math.PI*2/$.P.shield*i+$.P.shieldrad)*($.P.r+10),$.h/2+$.P.y+$.map.scroll.y+Math.sin(Math.PI*2/$.P.shield*i+$.P.shieldrad)*($.P.r+10),3);
		}
	},
	renderMap:function(){
		$.changeColor("rgba(30,100,50,.9)");
		if($.P.y<$.h/2) $.ctx.fillRect($.w/2+$.map.scroll.x-5,$.h/2+$.map.scroll.y-5,$.map.w+10,5);
		if($.P.x<$.w/2) $.ctx.fillRect($.w/2+$.map.scroll.x-5,$.h/2+$.map.scroll.y-5,5,$.map.h+10);
		if($.P.x>$.map.w-$.w/2) $.ctx.fillRect($.w/2+$.map.scroll.x+$.map.w,$.h/2+$.map.scroll.y-5,5,$.map.h+10);
		if($.P.y>$.map.h-$.h/2) $.ctx.fillRect($.w/2+$.map.scroll.x-5,$.h/2+$.map.scroll.y+$.map.h,$.map.w+10,5);
		$.changeColor("rgba(205,255,205,.1)");
		$.ctx.globalCompositeOperation = "lighter";
		$.ctx.font = '14px "Somy"';
		$.ctx.fillText("YOU ONLY GET ONE",Math.round($.map.w/2+$.w/2+$.map.scroll.x-$.ctx.measureText("YOU ONLY GET ONE").width/2),Math.round($.map.h/2+$.h/2+$.map.scroll.y+50));
		$.changeColor("rgba(255,35,55,.3)");
		if($.P.y<$.h/2+70){
			if($.P.x<$.w/2+70){
				$.ctx.beginPath();
				$.ctx.moveTo($.w/2+$.map.scroll.x,$.h/2+$.map.scroll.y)
				$.ctx.arc($.w/2+$.map.scroll.x,$.h/2+$.map.scroll.y,70,0,Math.PI/2);
				$.ctx.fill();
			}
			if($.P.x>$.map.w-$.w/2-70){
				$.ctx.beginPath();
				$.ctx.moveTo($.w/2+$.map.scroll.x+$.map.w,$.h/2+$.map.scroll.y)
				$.ctx.arc($.w/2+$.map.scroll.x+$.map.w,$.h/2+$.map.scroll.y,70,Math.PI/2,-Math.PI);
				$.ctx.fill();
			}
		}
		else if($.P.y>$.map.h-$.h/2-70){
			if($.P.x<$.w/2+70){
				$.ctx.beginPath();
				$.ctx.moveTo($.w/2+$.map.scroll.x,$.h/2+$.map.scroll.y+$.map.h)
				$.ctx.arc($.w/2+$.map.scroll.x,$.h/2+$.map.scroll.y+$.map.h,70,-Math.PI/2,0);
				$.ctx.fill();
			}
			if($.P.x>$.map.w-$.w/2-70){
				$.ctx.beginPath();
				$.ctx.moveTo($.w/2+$.map.scroll.x+$.map.w,$.h/2+$.map.scroll.y+$.map.h)
				$.ctx.arc($.w/2+$.map.scroll.x+$.map.w,$.h/2+$.map.scroll.y+$.map.h,70,-Math.PI,-Math.PI/2);
				$.ctx.fill();
			}
		}
		$.ctx.globalCompositeOperation = "source-over";
		for(var d in $.map.drops)
			if($.isVisible($.map.drops[d]))
				$.map.drops[d].render();
		$.changeColor("rgba(230,230,230,.9)");
		for(var d in $.map.bullets){
			if($.isVisible($.map.bullets[d]))
				$.map.bullets[d].render();
			$.map.bullets[d].update(d);
		}
	},
	renderCursor:function(){$.ctx.drawImage($.imgs.cursor,$.cursor.x-5,$.cursor.y);
	},
	/*============ ENTITIES ===========*/
	Item:function(x,y,r,type){
		this.x=x;
		this.type=type;
		this.y=y;
		this.r=10;
		this.back = function(){
			$.ctx.globalCompositeOperation = "lighter";
			$.ctx.shadowBlur = (.7+$.tick*.3)*30;
			$.ctx.shadowOffsetY = 1000;
			$.ctx.fillRect($.w/2+$.map.scroll.x+this.x-5,$.h/2+$.map.scroll.y+this.y-5-1000,10,10);
			$.ctx.fillRect($.w/2+$.map.scroll.x+this.x-5,$.h/2+$.map.scroll.y+this.y-5-1000,10,10);
			$.ctx.fillRect($.w/2+$.map.scroll.x+this.x-5,$.h/2+$.map.scroll.y+this.y-5-1000,10,10);
			$.ctx.shadowBlur = 0;
			$.ctx.globalCompositeOperation = "source-over";
		},
		this.next = function(){
			$.ctx.shadowBlur = 10;
			$.ctx.shadowOffsetY = 0;
		},
		this.render = function(){$.changeColor("#FFFFFF"); this.back();};
		switch(type){
			case "halfheart":
			this.render = function(){ 
				$.changeColor("#e9270d"); this.back();
				$.ctx.drawImage($.imgs.powers,200,0,20,20,-10+$.w/2+$.map.scroll.x+this.x,-10+$.h/2+$.map.scroll.y+this.y,20,20);
				this.next();
			}
			this.callback = function(){
				$.P.heal(5);
			}
			break;
			case "stam":
			this.render = function(){ 
				$.changeColor("#1157c0"); this.back();
				$.ctx.drawImage($.imgs.powers,220,0,20,20,-10+$.w/2+$.map.scroll.x+this.x,-10+$.h/2+$.map.scroll.y+this.y,20,20);
				this.next();
			}
			this.callback = function(){
				$.P.healstam(5);
			}
			break;
			case "power":
			this.render = function(){ 
				$.changeColor("#fff");
				this.back();
				$.ctx.save();
				$.ctx.translate($.w/2+$.map.scroll.x+this.x,$.h/2+$.map.scroll.y+this.y);
				$.ctx.rotate(Math.PI*2*$.tick);
				$.ctx.drawImage($.imgs.power,-15,-15);
				$.ctx.restore();
				this.next();
			}
			this.callback = function(){
				for(var i=0;i<10;i++){
					sx = Math.round(Math.cos(Math.PI*2/10*i)*150);
					sy = Math.round(Math.sin(Math.PI*2/10*i)*150);
					$.map.drops.push(new $.Item($.map.w/2+sx,$.map.h/2+sy,10,$.ITEMS[i]));
					$.select = true;
				}
				$.P.stamina = $.P.staminaMax;
			}
			break;
			case "heart":
			this.render = function(){
				$.changeColor("#e9270d"); this.back();
				$.ctx.drawImage($.imgs.powers,0,0,20,20,-10+$.w/2+$.map.scroll.x+this.x,-8+$.h/2+$.map.scroll.y+this.y,20,20);
				this.next();
			}
			this.callback = function(){
				$.P.lifeMax +=10;
				$.P.life +=10;
			}
			break;
			case "water":
			this.render = function(){
				$.changeColor("#1157c0"); this.back();
				$.ctx.drawImage($.imgs.powers,20,0,20,20,-10+$.w/2+$.map.scroll.x+this.x,-8+$.h/2+$.map.scroll.y+this.y,20,20);
				this.next();
			}
			this.callback = function(){
				$.P.staminaMax+=3;
			}
			break;
			case "light":
			this.render = function(){
				$.changeColor("#efc916"); this.back();
				$.ctx.drawImage($.imgs.powers,40,0,20,20,-12+$.w/2+$.map.scroll.x+this.x,-8+$.h/2+$.map.scroll.y+this.y,20,20);
				this.next();
			}
			this.callback = function(){
				$.P.shotr += 2;
			}
			break;
			case "leaf":
			this.render = function(){
				$.changeColor("#49bd1b"); this.back();
				$.ctx.drawImage($.imgs.powers,60,0,20,20,-10+$.w/2+$.map.scroll.x+this.x,-8+$.h/2+$.map.scroll.y+this.y,20,20);
				this.next();
			}
			this.callback = function(){
				if($.P.r>4) $.P.r -= 2;
			}
			break;
			case "plasma":
			this.render = function(){
				$.changeColor("#731bbd"); this.back();
				$.ctx.drawImage($.imgs.powers,80,0,20,20,-10+$.w/2+$.map.scroll.x+this.x,-8+$.h/2+$.map.scroll.y+this.y,20,20);
				this.next();
			}
			this.callback = function(){
				$.P.shot++;
			}
			break;
			case "science":
			this.render = function(){
				$.changeColor("#2fd5b8"); this.back();
				$.ctx.drawImage($.imgs.powers,100,0,20,20,-7+$.w/2+$.map.scroll.x+this.x,-14+$.h/2+$.map.scroll.y+this.y,20,20);
				this.next();
			}
			this.callback = function(){
				if($.P.luck>=0.1) $.P.luck -= 0.0500;
				$.P.luck = Math.round($.P.luck*100)/100;
			}
			break;
			case "love":
			this.render = function(){
				$.changeColor("#f024d1"); this.back();
				$.ctx.drawImage($.imgs.powers,120,0,20,20,-10+$.w/2+$.map.scroll.x+this.x,-8+$.h/2+$.map.scroll.y+this.y,20,20);
				this.next();
			}
			this.callback = function(){
				$.P.shots +=1;
			}
			break;
			case "zen":
			this.render = function(){
				$.changeColor("#da7e12"); this.back();
				$.ctx.drawImage($.imgs.powers,140,0,20,20,-10+$.w/2+$.map.scroll.x+this.x,-8+$.h/2+$.map.scroll.y+this.y,20,20);
				this.next();
			}
			this.callback = function(){
				$.P.shield++;
			}
			break;
			case "ninja":
			this.render = function(){
				$.changeColor("#1b6d27"); this.back();
				$.ctx.drawImage($.imgs.powers,160,0,20,20,-10+$.w/2+$.map.scroll.x+this.x,-8+$.h/2+$.map.scroll.y+this.y,20,20);
				this.next();
			}
			this.callback = function(){
				$.P.speed +=1;
			}
			break;
			case "poop":
			this.render = function(){
				$.changeColor("#61441b"); this.back();
				$.ctx.drawImage($.imgs.powers,180,0,20,20,-10+$.w/2+$.map.scroll.x+this.x,-8+$.h/2+$.map.scroll.y+this.y,20,20);
				this.next();
			}
			this.callback = function(){
				$.P.rate -= 3;
			}
			break;
		}
	},
	Bullet:function(x,y,r,rad,speed,vx,vy,mine,ra){
		this.x=x+Math.cos(rad)*ra;
		this.y=y+Math.sin(rad)*ra;
		this.r=r;
		this.mine = mine;
		if(Math.cos(rad)*vx >0 ) this.vx=vx+Math.cos(rad);
		else this.vx=Math.cos(rad);
		if(Math.sin(rad)*vy >0 ) this.vy=vy+Math.sin(rad);
		else this.vy=Math.sin(rad);
		this.speed=speed;
		this.render = function(){
			if(this.mine)
				$.changeColor("rgba(200,200,200,1)");
			else
				$.changeColor("rgba(200,50,50,1)");
				$.circle($.w/2+$.map.scroll.x+this.x,$.h/2+$.map.scroll.y+this.y,this.r);
		};
		this.update= function(id){
			this.x+=this.vx*this.speed;
			this.y+=this.vy*this.speed;
			if(this.x<0) this.die(id);
			if(this.x>$.map.w) this.die(id);
			if(this.y<0) this.die(id);
			if(this.y>$.map.h) this.die(id);
			for(var i in $.E){
				if(this.mine){
					if($.collide(this,$.E[i])){
						$.E[i].life -= this.r;
						if($.E[i].speed<=1){
							$.E[i].vx += this.vx*2;
							$.E[i].vy += this.vy*2;
						}
						if($.E[i].life<=0){
							$.play("die");
							$.E[i].die();
							$.ennemiesLifeLeft += Math.abs($.E[i].life);
							if(Math.random()>$.P.luck) 
								if(Math.random()>.5)
									$.map.drops.push(new $.Item($.E[i].x,$.E[i].y,10,"halfheart"));
								else
									$.map.drops.push(new $.Item($.E[i].x,$.E[i].y,10,"stam"));
							$.E.splice(i,1);
							$.ennemiesLeft--;
						}
						$.ennemiesLifeLeft -= this.r;
						this.die(id);
					}
				}else{
					for(var i=0;i<$.P.shield;i++){
						if($.collide({
							x:$.P.x+Math.cos(Math.PI*2/$.P.shield*i+$.P.shieldrad)*($.P.r+10),
							y:$.P.y+Math.sin(Math.PI*2/$.P.shield*i+$.P.shieldrad)*($.P.r+10),
							r:3
						},this)){
							this.die(id);
						}
					}
					if($.collide(this,$.P)){
						$.P.hurt(this.r*4);
						this.die(id);
					}
				}
			}
		};
		this.die = function(id){
			$.map.bullets.splice(id,1);
		}
	},
	Peon:function(x,y,vx,vy){
		this.life = 3;
		this.r = 10;
		this.speed = 1*$.P.enemyspeed;
		this.x=x || (20+Math.round(Math.random())*($.map.w-40));
		this.y=y || (20+Math.round(Math.random())*($.map.h-40));
		this.vx = vx || 0;
		this.vy = vy || 0;
		this.render = function(){
			$.changeColor("rgba(50,0,0,.9)");
			$.ctx.globalCompositeOperation = "lighter";
				$.circle($.w/2+$.map.scroll.x+this.x,$.h/2+$.map.scroll.y+this.y,this.r);
		}
		this.update = function(id){
			this.x+=this.vx*this.speed;
			this.y+=this.vy*this.speed;
			if(this.x<$.P.x && this.vx<2) this.vx+=0.1;
			if(this.x>$.P.x && this.vx>-2) this.vx-=0.1;
			if(this.y<$.P.y && this.vy<2) this.vy+=0.1;
			if(this.y>$.P.y && this.vy>-2) this.vy-=0.1;
			if($.P.god==0 && $.collide(this,$.P)){
				$.P.hurt(3);
				$.ennemiesLifeLeft -= this.life;
				$.ennemiesLeft--;
				$.E.splice(id,1);
			}
		}
		this.die = function(){};
	},
	BlindPeon:function(x,y,vx,vy){
		this.life = 1;
		this.r = 10;
		this.speed = 1.5*$.P.enemyspeed;
		this.x=x || (20+Math.round(Math.random())*($.map.w-40));
		this.y=y || (20+Math.round(Math.random())*($.map.h-40));
		this.vx = vx || Math.round(Math.random())*2-1;
		this.vy = vy || Math.round(Math.random())*2-1;
		this.render = function(){
			$.changeColor("rgba(50,0,0,.9)");
			$.ctx.globalCompositeOperation = "lighter";
				$.circle($.w/2+$.map.scroll.x+this.x,$.h/2+$.map.scroll.y+this.y,this.r);
		}
		this.update = function(id){
			this.x+=this.vx*this.speed;
			this.y+=this.vy*this.speed;
			$.resolveMapCollision(this,false);
			if($.P.god==0 && $.collide(this,$.P)){
				$.P.hurt(3);
				$.ennemiesLifeLeft -= this.life;
				$.ennemiesLeft--;
				$.E.splice(id,1);
			}
		}
		this.die = function(){};
	},
	Bigpeon:function(x,y){
		this.life = 10;
		this.r = 20;
		this.speed = .5*$.P.enemyspeed;
		this.x=20+Math.round(Math.random())*($.map.w-40);
		this.y=20+Math.round(Math.random())*($.map.h-40);
		this.vx = this.vy = 0;
		this.render = function(){
			$.changeColor("rgba(80,0,0,.9)");
			$.ctx.globalCompositeOperation = "lighter";
			$.circle($.w/2+$.map.scroll.x+this.x,$.h/2+$.map.scroll.y+this.y,this.r);
		}
		this.update = function(id){
			this.x+=this.vx*this.speed;
			this.y+=this.vy*this.speed;
			if(this.x<$.P.x && this.vx<2) this.vx+=0.1;
			if(this.x>$.P.x && this.vx>-2) this.vx-=0.1;
			if(this.y<$.P.y && this.vy<2) this.vy+=0.1;
			if(this.y>$.P.y && this.vy>-2) this.vy-=0.1;
			if(this.y>$.P.y && this.vy>-2) this.vy-=0.1;
			if($.P.god==0 && $.collide(this,$.P)){
				$.P.hurt(10);
				$.ennemiesLifeLeft -= this.life;
				$.ennemiesLeft--;
				$.E.splice(id,1);
			}
		}
		this.die = function(){};
	},
	Tripeon:function(x,y,vx,vy){
		this.life = 10;
		this.r = 15;
		this.speed = .5*$.P.enemyspeed;
		this.x=x || (20+Math.round(Math.random())*($.map.w-40));
		this.y=y || (20+Math.round(Math.random())*($.map.h-40));
		this.vx = vx || 0;
		this.vy = vy || 0;
		this.render = function(){
			$.changeColor("rgba(80,0,0,.9)");
			$.ctx.globalCompositeOperation = "lighter";
			$.circle($.w/2+$.map.scroll.x+this.x-5,$.h/2+$.map.scroll.y+this.y-5,10);
			$.circle($.w/2+$.map.scroll.x+this.x+5,$.h/2+$.map.scroll.y+this.y,10);
			$.circle($.w/2+$.map.scroll.x+this.x-5,$.h/2+$.map.scroll.y+this.y+5,10);
		}
		this.update = function(id){
			this.x+=this.vx*this.speed;
			this.y+=this.vy*this.speed;
			if(this.x<$.P.x && this.vx<2) this.vx+=0.1;
			if(this.x>$.P.x && this.vx>-2) this.vx-=0.1;
			if(this.y<$.P.y && this.vy<2) this.vy+=0.1;
			if(this.y>$.P.y && this.vy>-2) this.vy-=0.1;
			if($.P.god==0 && $.collide(this,$.P)){
				$.P.hurt(7);
				this.die();
				$.ennemiesLifeLeft -= this.life;
				$.ennemiesLeft--;
				$.E.splice(id,1);
			}
		}
		this.die = function(){
			$.play("split");
			$.E.push(new $.Peon(this.x-5,this.y-5,-5,-5));
			$.E.push(new $.Peon(this.x+5,this.y,0,5));
			$.E.push(new $.Peon(this.x-5,this.y+5,-5,5));
			$.ennemiesLeft+=3;
			$.ennemiesLife+=9;
			$.ennemiesLifeLeft+=9;
		};
	},
	TriTripeon:function(x,y){
		this.life = 20;
		this.r = 25;
		this.speed = 1*$.P.enemyspeed;
		this.x=20+Math.round(Math.random())*($.map.w-40);
		this.y=20+Math.round(Math.random())*($.map.h-40);
		this.vx = this.vy = 0;
		this.render = function(){
			$.changeColor("rgba(80,0,0,.9)");
			$.ctx.globalCompositeOperation = "lighter";
			$.circle($.w/2+$.map.scroll.x+this.x-5,$.h/2+$.map.scroll.y+this.y-5,20);
			$.circle($.w/2+$.map.scroll.x+this.x+5,$.h/2+$.map.scroll.y+this.y,20);
			$.circle($.w/2+$.map.scroll.x+this.x-5,$.h/2+$.map.scroll.y+this.y+5,20);
		}
		this.update = function(){
			this.x+=this.vx*this.speed;
			this.y+=this.vy*this.speed;
			if(this.x<$.P.x && this.vx<2) this.vx+=0.1;
			if(this.x>$.P.x && this.vx>-2) this.vx-=0.1;
			if(this.y<$.P.y && this.vy<2) this.vy+=0.1;
			if(this.y>$.P.y && this.vy>-2) this.vy-=0.1;
		}
		this.die = function(){
			$.play("split");
			$.E.push(new $.Tripeon(this.x-5,this.y-5,-5,-5));
			$.E.push(new $.Tripeon(this.x+5,this.y,0,5));
			$.E.push(new $.Tripeon(this.x-5,this.y+5,-5,5));
			$.ennemiesLeft+=3;
			$.ennemiesLife+=30;
			$.ennemiesLifeLeft+=30;
		};
	},
	Range:function(x,y){
		this.life = 3;
		this.r = 10;
		this.speed = 1*$.P.enemyspeed;
		this.x=50+Math.round(Math.random())*($.map.w-100);
		this.y=50+Math.round(Math.random())*($.map.h-100);
		this.vx = this.vy = 0;
		this.rad=Math.atan((this.y-$.h/2)/(this.x-$.w/2));
			if(this.x-$.w/2<0){
				if(this.rad<0) this.rad += Math.PI;
				else this.rad -= Math.PI;
			}
		this.rad = Math.atan();
		this.tick = -50;
		this.shots = 2;
		this.shotr = 2;
		this.render = function(){
			$.changeColor("rgba(50,0,0,.9)");
			$.ctx.globalCompositeOperation = "lighter";
				$.circle($.w/2+$.map.scroll.x+this.x,$.h/2+$.map.scroll.y+this.y,this.r);
				$.circle($.w/2+$.map.scroll.x+this.x,$.h/2+$.map.scroll.y+this.y,this.r/2);
				$.ctx.beginPath();
				$.ctx.moveTo($.w/2+$.map.scroll.x+this.x,$.h/2+$.map.scroll.y+this.y);
				$.ctx.lineTo($.w/2+$.map.scroll.x+this.x+Math.cos(this.rad)*this.r,$.h/2+$.map.scroll.y+this.y+Math.sin(this.rad)*this.r);
				$.ctx.strokeStyle = "red";
				$.ctx.lineWidth = "2.0";
				$.ctx.stroke();
				$.ctx.lineWidth = "1.0";
		}
		this.update = function(){
			this.tick +=.5;
			if(this.tick == 10 || this.tick == 20 || this.tick == 30){
				$.play("shoot2");
				$.map.bullets.push(new $.Bullet(this.x,this.y,this.shotr,this.rad,this.shots,0,0,0,this.r))
			}
			if(this.tick > 100) this.tick = 0;
			this.rad=Math.atan(($.P.y-this.y)/($.P.x-this.x));
			if($.P.x-this.x<0){
				if(this.rad<0) this.rad += Math.PI;
				else this.rad -= Math.PI;
			}
		}
		this.die = function(){};
	},
	HardRange:function(x,y){
		this.life = 20;
		this.r = 20;
		this.speed = 1*$.P.enemyspeed;
		this.x=50+Math.round(Math.random())*($.map.w-100);
		this.y=50+Math.round(Math.random())*($.map.h-100);
		this.vx = this.vy = 0;
		this.rad=Math.atan((this.y-$.h/2)/(this.x-$.w/2));
			if(this.x-$.w/2<0){
				if(this.rad<0) this.rad += Math.PI;
				else this.rad -= Math.PI;
			}
		this.rad = Math.atan();
		this.tick = -50;
		this.shots = 5;
		this.shotr = 5;
		this.render = function(){
			$.changeColor("rgba(50,0,0,.9)");
			$.ctx.globalCompositeOperation = "lighter";
				$.circle($.w/2+$.map.scroll.x+this.x,$.h/2+$.map.scroll.y+this.y,this.r);
				$.circle($.w/2+$.map.scroll.x+this.x,$.h/2+$.map.scroll.y+this.y,this.r/2);
				$.ctx.beginPath();
				$.ctx.moveTo($.w/2+$.map.scroll.x+this.x,$.h/2+$.map.scroll.y+this.y);
				$.ctx.lineTo($.w/2+$.map.scroll.x+this.x+Math.cos(this.rad)*this.r,$.h/2+$.map.scroll.y+this.y+Math.sin(this.rad)*this.r);
				$.ctx.strokeStyle = "red";
				$.ctx.lineWidth = "2.0";
				$.ctx.stroke();
				$.ctx.lineWidth = "1.0";
		}
		this.update = function(){
			this.tick +=.5;
			if(this.tick == 5 || this.tick == 10 || this.tick == 15 || this.tick == 20 || this.tick == 25 || this.tick == 30 || this.tick == 35 || this.tick == 40){
				$.play("shoot2");
				$.map.bullets.push(new $.Bullet(this.x,this.y,this.shotr,this.rad,this.shots,0,0,0,this.r))
			}
			if(this.tick > 100) this.tick = 0;
			this.rad=Math.atan(($.P.y-this.y)/($.P.x-this.x));
			if($.P.x-this.x<0){
				if(this.rad<0) this.rad += Math.PI;
				else this.rad -= Math.PI;
			}
		}
		this.die = function(){};
	},
	MovingRange:function(x,y){
		this.life = 3;
		this.r = 10;
		this.speed = 1*$.P.enemyspeed;
		this.x=50+Math.round(Math.random())*($.map.w-100);
		this.y=50+Math.round(Math.random())*($.map.h-100);
		this.vx = this.vy = 0;
		this.rad=Math.atan((this.y-$.h/2)/(this.x-$.w/2));
			if(this.x-$.w/2<0){
				if(this.rad<0) this.rad += Math.PI;
				else this.rad -= Math.PI;
			}
		this.rad = Math.atan();
		this.tick = -50;
		this.shots = 5;
		this.shotr = 2;
		this.render = function(){
			$.changeColor("rgba(50,0,0,.9)");
			$.ctx.globalCompositeOperation = "lighter";
				$.circle($.w/2+$.map.scroll.x+this.x,$.h/2+$.map.scroll.y+this.y,this.r);
				$.circle($.w/2+$.map.scroll.x+this.x,$.h/2+$.map.scroll.y+this.y,this.r/2);
				$.ctx.beginPath();
				$.ctx.moveTo($.w/2+$.map.scroll.x+this.x,$.h/2+$.map.scroll.y+this.y);
				$.ctx.lineTo($.w/2+$.map.scroll.x+this.x+Math.cos(this.rad)*this.r,$.h/2+$.map.scroll.y+this.y+Math.sin(this.rad)*this.r);
				$.ctx.strokeStyle = "red";
				$.ctx.lineWidth = "2.0";
				$.ctx.stroke();
				$.ctx.lineWidth = "1.0";
		}
		this.update = function(){
			this.x+=this.vx*this.speed;
			this.y+=this.vy*this.speed;
			if(this.x<$.P.x && this.vx<2) this.vx+=0.1;
			if(this.x>$.P.x && this.vx>-2) this.vx-=0.1;
			if(this.y<$.P.y && this.vy<2) this.vy+=0.1;
			if(this.y>$.P.y && this.vy>-2) this.vy-=0.1;
			this.tick +=.5;
			if(this.tick == 10 || this.tick == 20 || this.tick == 30){
				$.play("shoot2");
				$.map.bullets.push(new $.Bullet(this.x,this.y,this.shotr,this.rad,this.shots,0,0,0,this.r))
			}
			if(this.tick > 100) this.tick = 0;
			this.rad=Math.atan(($.P.y-this.y)/($.P.x-this.x));
			if($.P.x-this.x<0){
				if(this.rad<0) this.rad += Math.PI;
				else this.rad -= Math.PI;
			}
		}
		this.die = function(){};
	},
	DoubleMovingRange:function(x,y){
		this.life = 3;
		this.r = 10;
		this.speed = .5*$.P.enemyspeed;
		this.x=50+Math.round(Math.random())*($.map.w-100);
		this.y=50+Math.round(Math.random())*($.map.h-100);
		this.vx = this.vy = 0;
		this.rad=Math.atan((this.y-$.h/2)/(this.x-$.w/2));
			if(this.x-$.w/2<0){
				if(this.rad<0) this.rad += Math.PI;
				else this.rad -= Math.PI;
			}
		this.rad = Math.atan();
		this.tick = -50;
		this.shots = 7;
		this.shotr = 2;
		this.render = function(){
			$.changeColor("rgba(50,0,0,.9)");
			$.ctx.globalCompositeOperation = "lighter";
				$.circle($.w/2+$.map.scroll.x+this.x,$.h/2+$.map.scroll.y+this.y,this.r);
				$.circle($.w/2+$.map.scroll.x+this.x,$.h/2+$.map.scroll.y+this.y,this.r/2);
				$.ctx.beginPath();
				$.ctx.moveTo($.w/2+$.map.scroll.x+this.x,$.h/2+$.map.scroll.y+this.y);
				$.ctx.lineTo($.w/2+$.map.scroll.x+this.x+Math.cos(this.rad+0.2)*this.r,$.h/2+$.map.scroll.y+this.y+Math.sin(this.rad)*this.r);
				$.ctx.strokeStyle = "red";
				$.ctx.lineWidth = "2.0";
				$.ctx.stroke();
				$.ctx.beginPath();
				$.ctx.moveTo($.w/2+$.map.scroll.x+this.x,$.h/2+$.map.scroll.y+this.y);
				$.ctx.lineTo($.w/2+$.map.scroll.x+this.x+Math.cos(this.rad-0.2)*this.r,$.h/2+$.map.scroll.y+this.y+Math.sin(this.rad)*this.r);
				$.ctx.strokeStyle = "red";
				$.ctx.lineWidth = "2.0";
				$.ctx.stroke();
				$.ctx.lineWidth = "1.0";
		}
		this.update = function(){
			this.x+=this.vx*this.speed;
			this.y+=this.vy*this.speed;
			if(this.x<$.P.x && this.vx<2) this.vx+=0.1;
			if(this.x>$.P.x && this.vx>-2) this.vx-=0.1;
			if(this.y<$.P.y && this.vy<2) this.vy+=0.1;
			if(this.y>$.P.y && this.vy>-2) this.vy-=0.1;
			this.tick +=.5;
			if(this.tick == 10){
				$.map.bullets.push(new $.Bullet(this.x,this.y,this.shotr,this.rad-0.2,this.shots,0,0,0,this.r))
				$.map.bullets.push(new $.Bullet(this.x,this.y,this.shotr,this.rad+0.2,this.shots,0,0,0,this.r))
			}
			if(this.tick > 50) this.tick = 0;
			this.rad=Math.atan(($.P.y-this.y)/($.P.x-this.x));
			if($.P.x-this.x<0){
				if(this.rad<0) this.rad += Math.PI;
				else this.rad -= Math.PI;
			}
		}
		this.die = function(){};
	},
	Slider:function(x,y){
		this.life = 5;
		this.r = 10;
		this.speed = .1*$.P.enemyspeed;
		this.x=20+Math.round(Math.random())*($.map.w-40);
		this.y=20+Math.round(Math.random())*($.map.h-40);
		this.vx = this.vy = 0;
		this.dir = "x";
		this.render = function(){
			$.ctx.globalCompositeOperation = "source-over";
			$.changeColor("rgba(150,30,30,1)");
			if(this.dir=="x"){
				$.circle($.w/2+$.map.scroll.x+this.x-10,$.h/2+$.map.scroll.y+this.y,this.r);
				$.ctx.fillRect($.w/2+$.map.scroll.x+this.x-10,$.h/2+$.map.scroll.y+this.y-10,this.r,this.r*2);
				$.changeColor("rgba(170,30,30,1)");
				$.circle($.w/2+$.map.scroll.x+this.x,$.h/2+$.map.scroll.y+this.y,this.r);
			}else{
				$.circle($.w/2+$.map.scroll.x+this.x,$.h/2+$.map.scroll.y+this.y-10,this.r);
				$.ctx.fillRect($.w/2+$.map.scroll.x+this.x-10,$.h/2+$.map.scroll.y+this.y-10,this.r*2,this.r);
				$.changeColor("rgba(170,30,30,1)");
				$.circle($.w/2+$.map.scroll.x+this.x,$.h/2+$.map.scroll.y+this.y,this.r);
			}
		}
		this.die = function(){};
		this.update = function(id){
			this.x+=this.vx*this.speed;
			this.y+=this.vy*this.speed;
			if(this.speed<2) this.speed += .1;
			if(this.dir=="x"){
				if(this.x>$.P.x) this.vx = -2;
				else this.vx = 2;
				if(Math.abs(this.x-$.P.x)<10){
					this.dir="y";
					this.speed = 0.1;
				}
				this.vy = 0;
			}
			else{
				if(this.y>$.P.y) this.vy = -2;
				else this.vy = 2;
				if(Math.abs(this.y-$.P.y)<10){
					this.dir="x";
					this.speed = 0.1;
				}
				this.vx = 0;
			}
			if($.P.god==0 && $.collide(this,$.P)){
				$.P.hurt(10);
				this.die();
				$.ennemiesLifeLeft -= this.life;
				$.ennemiesLeft--;
				$.E.splice(id,1);
			}
		}
	},
	Quad:function(x,y){
		this.life = 5;
		this.r = 10;
		this.speed = .5*$.P.enemyspeed;
		this.x=20+Math.round(Math.random())*($.map.w-40);
		this.y=20+Math.round(Math.random())*($.map.h-40);
		this.vx = this.vy = 0;
		this.dir = "x";
		this.render = function(){
			$.ctx.globalCompositeOperation = "source-over";
			$.changeColor("rgba(150,30,30,1)");
			$.circle($.w/2+$.map.scroll.x+this.x,$.h/2+$.map.scroll.y+this.y,this.r);
			$.circle($.w/2+$.map.scroll.x+this.x,$.h/2+$.map.scroll.y+this.y+this.r,2);
			$.circle($.w/2+$.map.scroll.x+this.x,$.h/2+$.map.scroll.y+this.y-this.r,2);
			$.circle($.w/2+$.map.scroll.x+this.x+this.r,$.h/2+$.map.scroll.y+this.y,2);
			$.circle($.w/2+$.map.scroll.x+this.x-this.r,$.h/2+$.map.scroll.y+this.y,2);
		}
		this.die = function(){};
		this.fire = function(){
			$.play("quad");
			$.map.bullets.push(new $.Bullet(this.x,this.y,2,0,2,0,0,0,this.r));
			$.map.bullets.push(new $.Bullet(this.x,this.y,2,Math.PI/2,2,0,0,0,this.r));
			$.map.bullets.push(new $.Bullet(this.x,this.y,2,-Math.PI/2,2,0,0,0,this.r));
			$.map.bullets.push(new $.Bullet(this.x,this.y,2,Math.PI,2,0,0,0,this.r));
		},
		this.update = function(){
			this.x+=this.vx*this.speed;
			this.y+=this.vy*this.speed;
			if(this.dir=="x"){
				if(this.x>$.P.x) this.vx = -2;
				else this.vx = 2;
				if(Math.abs(this.x-$.P.x)<10){
					this.dir="y";
					this.fire();
				}
				this.vy = 0;
			}
			else{
				if(this.y>$.P.y) this.vy = -2;
				else this.vy = 2;
				if(Math.abs(this.y-$.P.y)<10){
					this.dir="x";
					this.fire();
				}
				this.vx = 0;
			}
		}
		if($.P.god==0 && $.collide(this,$.P)){
			$.P.hurt(3);
		}
	},
	BigQuad:function(x,y){
		this.life = 35;
		this.r = 20;
		this.speed = .5*$.P.enemyspeed;
		this.x=20+Math.round(Math.random())*($.map.w-40);
		this.y=20+Math.round(Math.random())*($.map.h-40);
		this.vx = this.vy = 0;
		this.dir = "x";
		this.shotr = 7;
		this.rad = 0;
		this.render = function(){
			$.ctx.globalCompositeOperation = "source-over";
			$.changeColor("rgba(150,30,30,1)");
			$.circle($.w/2+$.map.scroll.x+this.x,$.h/2+$.map.scroll.y+this.y,this.r);
			$.circle($.w/2+$.map.scroll.x+this.x+this.r*Math.cos(this.rad),$.h/2+$.map.scroll.y+this.y+this.r*Math.sin(this.rad),2);
			$.circle($.w/2+$.map.scroll.x+this.x+this.r*Math.cos(this.rad+Math.PI*2),$.h/2+$.map.scroll.y+this.y+this.r*Math.sin(this.rad+Math.PI*2),2);
			$.circle($.w/2+$.map.scroll.x+this.x+this.r*Math.cos(this.rad+Math.PI),$.h/2+$.map.scroll.y+this.y+this.r*Math.sin(this.rad+Math.PI),2);
			$.circle($.w/2+$.map.scroll.x+this.x+this.r*Math.cos(this.rad+Math.PI/2*3),$.h/2+$.map.scroll.y+this.y+this.r*Math.sin(this.rad+Math.PI/2*3),2);
			$.circle($.w/2+$.map.scroll.x+this.x+this.r*Math.cos(this.rad+Math.PI/2*5),$.h/2+$.map.scroll.y+this.y+this.r*Math.sin(this.rad+Math.PI/2*5),2);
		}
		this.die = function(){};
		this.fire = function(){
			$.play("quad");
			$.map.bullets.push(new $.Bullet(this.x,this.y,this.shotr,this.rad,3,0,0,0,this.r));
			$.map.bullets.push(new $.Bullet(this.x,this.y,this.shotr,this.rad+Math.PI/2,3,0,0,0,this.r));
			$.map.bullets.push(new $.Bullet(this.x,this.y,this.shotr,this.rad-Math.PI/2,3,0,0,0,this.r));
			$.map.bullets.push(new $.Bullet(this.x,this.y,this.shotr,this.rad+Math.PI,3,0,0,0,this.r));
		},
		this.update = function(){
			this.rad += 0.05;
			if(this.rad>Math.PI*2) this.rad = 0;
			this.x+=this.vx*this.speed;
			this.y+=this.vy*this.speed;
			if(this.dir=="x"){
				if(this.x>$.P.x) this.vx = -2;
				else this.vx = 2;
				if(Math.abs(this.x-$.P.x)<10){
					this.dir="y";
					this.fire();
				}
				this.vy = 0;
			}
			else{
				if(this.y>$.P.y) this.vy = -2;
				else this.vy = 2;
				if(Math.abs(this.y-$.P.y)<10){
					this.dir="x";
					this.fire();
				}
				this.vx = 0;
			}
			if($.P.god==0 && $.collide(this,$.P)){
				$.P.hurt(5);
			}
		}
	},
	/*============ MECHAS =============*/
	distance:function(a,b){return Math.sqrt(Math.pow(b.x-a.x,2)+Math.pow(b.y-a.y,2));
	},
	isVisible:function(a){
		if($.aabb(a,{w:$.w,h:$.h,x:$.P.x-$.w/2,y:$.P.y-$.h/2}))
			return true; return false;
	},
	aabb:function(a,b){
		if(typeof a.w == "undefined")
			if((b.x >= a.x-a.r + a.r*2) || (b.x + b.w <= a.x) || (b.y >= a.y-a.r + a.r*2) || (b.y + b.h <= a.y-a.r)) return false;
		else
			if((b.x >= a.x + a.w) || (b.x + b.w <= a.x) || (b.y >= a.y + a.h) || (b.y + b.h <= a.y)) return false;
		return true;
	},
	collide:function(a,b){return (a.r+b.r>$.distance(a,b));
	},
	shuffle:function(array) {
	  for (var tmp, cur, top=array.length; top--;){
	    cur = (Math.random() * (top + 1)) << 0;
	    tmp = array[cur]; array[cur] = array[top]; array[top] = tmp;
	  }
	},
	resolveMapCollision:function(i,mine){
		if(i.x-i.r<0){
			i.x=i.r;
			if(mine) $.map.scroll.x = -i.x;
			i.vx*=-1;
		}		
		if(i.y-i.r<0){
			i.y=i.r;
			if(mine) $.map.scroll.y = -i.y;
			i.vy*=-1;
		}	
		if(i.y+i.r>$.map.h){
			i.y=$.map.h-i.r;
			if(mine) $.map.scroll.y = -i.y;
			i.vy*=-1;
		}
		if(i.x+i.r>$.map.w){
			i.x=$.map.w-i.r;
			if(mine) $.map.scroll.x = -i.x;
			i.vx*=-1;
		}
	},
	/*============ UTILS =============*/
	changeColor:function(c){
		$.ctx.fillStyle = c;
		$.ctx.shadowColor = c;
	},	
	circle:function(x,y,r){
		$.ctx.beginPath();
		$.ctx.arc(x,y,r,0,Math.PI*2,true);
		$.ctx.fill();
		$.ctx.closePath();
	},
	play:function(s){
		var snd = new Audio($.sounds[s].src);
		snd.play();
	},
	toDeg:function(rad){ return rad*180/Math.PI*2;},
	triangle:function(x,y,r){
		$.ctx.beginPath();
		$.ctx.moveTo(x-r/3,y-r/2);
		$.ctx.lineTo(x-r/3+1,y-r/2);
		$.ctx.lineTo(x+r/3,y-1);
		$.ctx.lineTo(x+r/3,y+1);
		$.ctx.lineTo(x-r/3+1,y+r/2);
		$.ctx.lineTo(x-r/3,y+r/2);
		$.ctx.fill();
		$.ctx.closePath();
	}
};
window.onload = function(){$.init();}
window.requestAnimFrame=(function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(callback){window.setTimeout(callback,1000/60);};})();