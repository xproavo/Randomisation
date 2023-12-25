

class Item{
    constructor(_name, _type){ //donne un nome a l'item
        this.name = _name;
    }
}

class Chest{
    constructor(_name = "", _keysNecessary = []){
        this.isOpen = false;
        this.item = [];
        this.keysNecessary = _keysNecessary;
        this.name = _name;
    }
    
    AddItem(item){
        this.item.push(item);
    }
    
    AddCondition(_keysNecessary){
        this.keysNecessary.push(_keysNecessary);
    }
    
    OpenChest(_inventory){
        if(this.CanOpen(_inventory) && this.isOpen === false){
            this.isOpen = true;
            
            // Supprimer les clés nécessaires de l'inventaire du joueur
            this.keysNecessary.forEach(key => {
                const index = _inventory.indexOf(key);
                if (index !== -1) {
                    _inventory.splice(index, 1);
                }
            });
            
            return this.item;
        }
        console.log("Le coffre ne peut pas etre ouvert.")
        this.PrintCondition();
        return null;
    }
    
    CanOpen(_inventory){
        if(this.keysNecessary.length > 0){
            let haveKeys = 0;
            this.keysNecessary.forEach(key => {
                if(_inventory.includes(key)){
                    haveKeys ++;
                }
            });
            return this.keysNecessary.length == haveKeys;
        }
        return true;
    }
    
    HasItems(){
        return this.item.length > 0;
    }
    
    HasItem(_item){
        return this.item.includes(_item);
    }
    
    PrintCondition(){
        if(this.keysNecessary.length === 0){
            console.log("Aucune condition n'est necessaire pour ouvrir ce coffre")
        }else{
            console.log("Vous devez possede : ")
            this.keysNecessary.forEach(key => {
                console.log(" - " + key.name)
            });
        }
    }    
    
    PrintContent(){
        console.log("Contenu du coffre : " + this.items.map(item => item.name).join(', '));
    }
}

class Player{
    constructor(_name = "P1"){
        this.name = _name;
        this.inventory = [];
    }
    
    GetInventory(){
        return this.inventory;
    }
    
    AddToInventory(_items){
        if(Array.isArray(_items)){
            _items.forEach(element => {
                this.inventory.push(element);
            });
            return;
        }
        this.inventory.push(_items);
    }
}

function SetSeed(){
    if (seed.trim() === '') {
        seed = Date.now();
    }
    Math.seedrandom(seed);
}

function GetRandomNumber(max){
    return Math.floor(Math.random() * max);
}

function AssignItemToChest (chests, items){
    
    //Copie des tableau "Item" et "Chest"
    const copyOfItems = [...items];
    const copyOfChest = [...chests];
    
    //Attribution aléatoire des Item dans les Chest
    while (copyOfItems.length > 0){
        const randomItemIndex = GetRandomNumber(copyOfItems.length);
        const randomChestIndex = GetRandomNumber(copyOfChest.length);
        
        //.splice permet de modifier un tableau (ajouter, remplacer ou supprimer une const dans un index choisi)
        //Ici, je supprime un élément du tableau "copyOfItems" à l'index "randomitemIndex"
        //Et cet élément supprimé, je le récupère via [0] mis juste après le .splice
        const randomItem = copyOfItems.splice(randomItemIndex, 1)[0];
        
        copyOfChest[randomChestIndex].AddItem(randomItem);
        copyOfChest.splice(randomChestIndex, 1);
    }
}

function AssignItemToChest2 (){
    let copyChest = [...items];
    copyChest = chests.slice(1);

    
   let last_items = copyChest[copyChest.length -1]; 
   solution.push(last_items);
   
    for (let i = copyChest.length; 0 < i; i--) {

        
        let fisrt_element = last_items.keysNecessary;[0]; 
        
        if (copyChest.length == 1) {
            chests[0].AddItem(fisrt_element);
        }else{   
            let coffre_aleatoire =  copyChest[GetRandomNumber(copyChest.length)];
            
            
            while (copyChest == coffre_aleatoire ) {
                coffre_aleatoire =  copyChest[GetRandomNumber(copyChest.length)];
            }
            
            coffre_aleatoire.AddItem(fisrt_element);
            
            //retirer le coffre de la liste
            let index = copyChest.indexOf(last_items);
            copyChest.splice(index, 1);
            
            last_items = coffre_aleatoire;
        }
    }
}

function AssignChestCondition(){
    
    let copyChest = [...items];
    copyChest = chests.slice(1);
    let copyItem = [...items];
    
    for (let i = copyChest.length; i > 0; i--) {
        
        let indexChest = GetRandomNumber(copyChest.length);
        let indexItem = GetRandomNumber(copyItem.length);
        
        copyChest[indexChest].AddCondition(copyItem[indexItem]);
        
        copyChest.splice(indexChest, 1);
        copyItem.splice(indexItem, 1);
    }
}

function GenerateChest(_nb){
    let  chestList = []
    for (let index = 0; index < _nb; index++) {
        chestList.push(new Chest("Coffre n° " + (index + 1).toString()));
    }
    return chestList;
}

function GenerateItem(_nb){
    keyList = [new Item("cle A"), new Item("cle B"), new Item("cle C"), new Item("cle D"), new Item("cle E"), new Item("cle F"), new Item("cle G"), new Item("cle H"), new Item("cle I")];
    itemList = [];
    for (let index = 0; index < _nb; index++) {
        itemList.push(keyList[GetRandomNumber(keyList.length)]);
    }
    return itemList;
}

function addNewChest(){
    const newChest = new Chest();
    const randomItemIndex = GetRandomNumber(items.length);
    const randomItem = items[randomItemIndex];
    newChest.AddItem(randomItem);
    
    const randomConditionIndex = GetRandomNumber(items.length);
    const randomCondition = items[randomConditionIndex];
    newChest.AddCondition(randomCondition);
    
    chests.push(newChest);
    
    console.log(chests)
}

function play() {
    SetSeed();
    
    player = new Player("oui");
    chests = GenerateChest(10);
    items = GenerateItem(10);
    //AssignItemToChest(chests, items);
    AssignChestCondition(); 
    AssignItemToChest2();
}

let player; 
let chests; 
let items;
let solution = [];
let seed = '';

play();