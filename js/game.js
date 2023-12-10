class Item{
    constructor(_name, _type){ //donne un nome a l'item
        this.name = _name;
    }
}

class Chest{
    constructor(_keysNecessary = []){
        this.isOpen = false;
        this.item = [];
        this.keysNecessary = _keysNecessary;
    }
    
    AddItem(item){
        this.item.push(item);
    }
    
    AddCondition(_keysNecessary){
        this.keysNecessary.push(_keysNecessary);
    }
    
    OpenChest(_inventory){
        if(this.CanOpen(_inventory)){
            this.isOpen = true;
            return this.item;
        }
        console.log("Le coffre ne peut pas etre ouvert.")
        this.PrintCondition();
        return null;
    }

    CanOpen(_inventory){
        if(this.keysNecessary.length > 0){
            let haveKeys = 0;
            ////// PROBLRMR ICI
            this.keysNecessary.forEach(key => {
                if(_inventory.includes(key)){
                    haveKeys ++;
                }
            });
            ////// -------------------
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
            this.inventory.push(..._items);
            return;
        }
        this.inventory.push(_items);
    }
}

function AssignItemToChest (chests, items){
    
    //Copie des tableau "Item" et "Chest"
    const copyOfItems = [...items];
    const copyOfChest = [...chests];

    //Attribution aléatoire des Item dans les Chest
    while (copyOfItems.length > 0){
        const randomItemIndex = Math.floor(Math.random() * copyOfItems.length);
        const randomChestIndex = Math.floor(Math.random() * copyOfChest.length);

        //.splice permet de modifier un tableau (ajouter, remplacer ou supprimer une const dans un index choisi)
        //Ici, je supprime un élément du tableau "copyOfItems" à l'index "randomitemIndex"
        //Et cet élément supprimé, je le récupère via [0] mis juste après le .splice
        const randomItem = copyOfItems.splice(randomItemIndex, 1)[0];

        copyOfChest[randomChestIndex].AddItem(randomItem);
        copyOfChest.splice(randomChestIndex, 1);
    }
}

function AssignChestCondition(){
    chestModifyNB = Math.floor(Math.random() * chests.length)
    for (let index = 0; index < chestModifyNB; index++) {
        indexChest = Math.floor(Math.random() * chestModifyNB)
        indexItem = Math.floor(Math.random() * items.length)
        
        while(chests[indexChest].HasItem(items[indexItem])){
            indexItem = Math.floor(Math.random() * items.length)
        }
        chests[indexChest].AddCondition(items[indexItem]);
    }
}

function GenerateChest(_nb){
    chestList = []
    for (let index = 0; index < _nb; index++) {
        chestList.push(new Chest())
    }
    return chestList
}

function GenerateItem(_nb){
    keyList = ["Cle 1","Cle 2","Cle 3","Cle 4","Cle 5"]
    itemList = []
    for (let index = 0; index < _nb; index++) {
        itemName = keyList[Math.floor(Math.random() * keyList.length)]
        itemList.push(new Item(itemName))
    }
    return itemList
}

function addNewChest(){
    const newChest = new Chest();
    const randomItemIndex = Math.floor(Math.random() * items.length);
    const randomItem = items[randomItemIndex];
    newChest.AddItem(randomItem);

    const randomConditionIndex = Math.floor(Math.random() * items.length);
    const randomCondition = items[randomConditionIndex];
    newChest.AddCondition(randomCondition);

    chests.push(newChest);

    console.log(chests)
}

function play() {
    player = new Player("oui");
    chests = GenerateChest(10);
    items = GenerateItem(6);
    AssignItemToChest(chests, items);
    AssignChestCondition(); 
}


/////-----------------------------NE SERT A RIEN-------------------------------
date = new Date()
const heure = date.getHours();
const minutes = date.getMinutes();
const secondes = date.getSeconds();
console.log(`Execution de ${heure}:${minutes}:${secondes}`);
/////----------------------------------------------------------------------------


let player; 
let chests; 
let items;

play()

