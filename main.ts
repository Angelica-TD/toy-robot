const readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'TOY ROBOT> ',
    terminal: false //prevent the terminal from echoing input
});
let coords: number[] = [0,0]
let direction:number, facing:number
let isPlaced:boolean = false





function getCoords(input:string){

    const coords:number[] = input.replace(/place /g, "").split(',', 2).map(function(coord){
        return parseInt(coord,10)
    })
    return coords
}

function getDirection(input:string){
    const getDirection: string[] = input.replace(/place /g, "").split(",")
    switch(getDirection[2]){
        case "north":  facing = 360
        break;
        case "east":  facing =90
        break;
        case "south":  facing =180
        break;
        case "west":  facing =270
        break;
    }

    return facing
}

function moveCommand(location:number[], facing:number){
    let x:number = location[0]
    let y:number = location[1]
    let newLocation:number[] = coords


    switch(facing){
        case 360: if(newLocation[1]!==5){
            newLocation = [x, y+=1]
        }
        break;
        case 180: if(newLocation[1]!==0){
            newLocation = [x, y-=1]
        }
        break;
        case 270: if(newLocation[0]!==0){
            newLocation = [x-=1, y]
        }
        break;
        case 90: if(newLocation[0]!==5){
        newLocation = [x+=1, y]
        }
        break;
    }

    return newLocation

}

function changeDirection(input:string){
    let newDirection:number = direction
    switch(input){
        case 'left': newDirection -= 90
        if(newDirection<1){
            newDirection=360
        }
        break;
        case 'right': newDirection += 90 
        if(newDirection>360){
            newDirection=90
        }
        break;
    }

    return newDirection
}

rl.prompt();
rl.on('line', (input:string) => {
    
    if(input.includes('place')){
        input="place 1,2,east"
        coords = getCoords(input)
        direction = getDirection(input)
        isPlaced=true
    }

    if(input === 'move' && isPlaced===true){
        let newLocation = moveCommand(coords, direction)
        coords = newLocation
        
    }

    if(input === 'report' && isPlaced===true){
        let directionInWords:string = ""
        switch(direction){
            case 360: directionInWords = "north"
            break;
            case 90:  directionInWords ="east"
            break;
            case 180:  directionInWords ="south"
            break;
            case 270:  directionInWords ="west"
            break;
            
        }

        console.log(`${coords}, ${directionInWords}`)
    }

    if(input === 'left' || input === 'right'){
        let newDirection = changeDirection(input)
        direction = newDirection
    }



    rl.prompt();
})