class Graph {
   
    constructor(x, y, h, w, yLabel, xLabel)   {
        this.wave = [];
        this.length = 0;
        this.x = x;
        this.y = y;
        this.h = h;
        this.w = w;
        this.xLabel = xLabel;
        this.yLabel = yLabel;
        this.graphend = [];
    }

    update(value)    {
        this.wave.push(value);
        if (this.wave.length > this.w) {
            this.wave = this.wave.slice(2);
        }
    }
    
    delete () {
        this.wave = [];
        t=0.05;
    }

    draw(r, g, b)  {
        push();
        let temp_y=[]; 
        beginShape();
        stroke(r, g, b);
        strokeWeight(2);
        noFill();
        //let maxy = 0 ;
        let tempy = 0;
     //  temp_y= this.wave;
        let flag = false;
        let flag2 = false;
        let cont = 20
       for (let i = 0; i < this.wave.length; i++) {
        if (abs(this.wave[i])/this.h>0.75){
           if(flag==false)
           {
            scale(0.05);
            flag = true;
           }
        vertex(i + (this.x)*cont, this.wave[i] + (this.y)*cont);
        this.graphend = [i+this.x,this.wave[i]+this.y]
        }
        else{
            if(flag==true)continue;
            vertex(i + this.x, this.wave[i] + this.y)
            this.graphend = [i+this.x,this.wave[i]+this.y]
        }
      
    }
     endShape();

        stroke(0);
        strokeWeight(1)
        if(flag==false){
            
        line(this.x, this.y, this.x, this.y + this.h);
        line(this.x, this.y, this.x, this.y - this.h);
        line(this.x, this.y, this.x + this.w, this.y);
        fill(0)
        strokeWeight(0)
        textSize(18);
        text(this.xLabel, this.x + this.w, this.y);
        translate(this.x, this.y)
        rotate(radians(-90))
        text(this.yLabel, 0 , -10);
        }
        else{
          
            line(this.x*cont, this.y*cont, this.x*cont, this.y*cont + this.h*cont);
            line(this.x*cont, this.y*cont, this.x*cont, this.y*cont - this.h*cont);
            line(this.x*cont, this.y*cont, this.x*cont + this.w*cont, this.y*cont);
            fill(0)
            strokeWeight(cont)
            textSize(18*cont);
            text(this.xLabel, (this.x + this.w)*cont, this.y*cont);
            translate(this.x*cont, this.y*cont)
            rotate(radians(-90))
            text(this.yLabel, 0 , -10);
        }
        
        fill(0)
        strokeWeight(0)
        textSize(18);
        text(this.xLabel, this.x*cont + this.w, this.y*cont);
        translate(this.x*cont, this.y*cont)
        rotate(radians(-90))
        text(this.yLabel, 0 , -10);
        pop();
    }
}
