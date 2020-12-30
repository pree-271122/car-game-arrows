class Form {

  constructor() {
    this.input = createInput("Name");
    this.button = createButton('Play');
    this.greeting = createElement('h2');
    this.title = createElement('h2');
    this.getname = createElement('h3');
    //this.reset=createButton('Reset');
  }
  hide(){
    this.greeting.hide();
    this.button.hide();
    this.input.hide();
    this.title.hide();
    this.getname.hide();
  }

  display(){
    
    this.title.html("CAR RACING GAME")
    this.title.style('color','red')
    this.title.position(displayWidth/2 - 50, 0)
    this.getname.html("ENTER YOUR NAME =>")
    this.getname.style('color','red')
    this.getname.position(displayWidth/2 -250 , displayHeight/2 - 95)
    this.input.position(displayWidth/2 - 40 , displayHeight/2 - 80)
    this.input.style('background','white')
    this.input.style('border-radius','100px')
    this.input.style('width','300px')
    this.input.style('height','20px')
    this.button.position(displayWidth/2 + 30, displayHeight/2)
    this.button.style('background','white')
    this.button.style('border-radius','100px')
    this.button.style('width','100px')
    this.button.style('height','30px')

    this.button.mousePressed(()=>{
    this.button.hide();
    this.input.hide();
    this.title.hide();
    this.getname.hide();
      player.name = this.input.value();
      playerCount+=1;
      player.index = playerCount;
      player.update();
      player.updateCount(playerCount);
      this.greeting.html("HELLO "+ player.name);
      this.greeting.position(displayWidth/2 - 70, displayHeight/4);
      this.greeting.style('color','white')
    });
   

  }
}
