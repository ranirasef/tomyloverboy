onload = () =>{
        document.body.classList.remove("container");
};
let canvas = document.getElementById('tutorial');
let ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
gravity = 0.08
// ctx.fillRect(20, 20, 100, 100);
// ctx.clearRect(40, 40, 60, 60);

class Circle {
    constructor(x, y, dx, dy, radius, color, firework) {
        this.x = x;
        this.y = y;
        this.dy = dy;
        this.dx = dx;
        this.radius = radius
        this.color = color
        this.collisions = 0;
        this.firework = firework
        this.brightness = 255
        this.has_exploaded = false
        
    }

    update() {
        this.x += this.dx
        this.y += this.dy
        this.dy += gravity
        if(this.firework){
            this.brightness-=3
            this.dy -= gravity

            this.dy *=0.9
            this.dx *=0.9
        }
        this.draw()
    }
  

    draw() {
        ctx.fillStyle = this.color
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        ctx.fill();
    }
}

class Firework {
    constructor(x, y, dx, dy, radius, color){
        this.color=color
        this.circle = new Circle(x, y, dx, dy, radius, color)
        this.particles = []
    }
    update(){
        if(!this.exploded()){
        this.circle.update()
        }
        for(let i=0 ; i<this.particles.length;i++){
            
            this.particles[i].update()
            if(this.particles[i].brightness<0){
                this.particles.splice(i,1)
        
        }
        }

    }

    exploded(){
        if(this.circle.dy>=0 ){
            if( !this.has_exploaded){
            for(let x = 100; x>=0;x--){
                let cl = 'hsl('+(Math.random()*255+1)+', 100%, 50%)'
                var vx = (16 * Math.pow(Math.sin(x), 3));
                var vy = -(13 * Math.cos(x) - 5 * Math.cos(2 * x) - 2 * Math.cos(3 * x) - Math.cos(4 * x));
                let particle = new Circle(this.circle.x,this.circle.y,vx,vy,2,cl, true)
                this.particles.push(particle)
            }
        }
        this.has_exploaded = true
            this.circle.color = "black"
            return true
        }
    }
}
let fireworks = []
// let colors = [
//     "#ff0000",
//     "#ff7878",
//     "#74d680",
//     "#371769",
//     "#378b29",

// ]



function animate() {
    requestAnimationFrame(animate);
    ctx.fillStyle = "rgba(0, 0, 0, 0.3)"
    ctx.fillRect(0, 0, innerWidth, innerHeight)
    if(Math.random()<=0.08){
        let x = Math.random() * innerWidth
        let y = innerHeight
        let vx = 0
        let vy = - (Math.random() * (10 - 8) + 8)
        let radius = 4
        let cl = 'hsl('+ Math.floor(Math.random()*255+1)+', 100%, 50%)'
        let firework = new  Firework(x, y, vx, vy, radius, cl)
        fireworks.push(firework)
    }
    for (let i = 0; i < fireworks.length; i++) {
        fireworks[i].update()
        if (fireworks[i].exploded() && fireworks[i].particles.length == 0){
            fireworks.splice(i,1)
            
        }

    };
   
}

animate();
