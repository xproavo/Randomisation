

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
            this.inventory.push(..._items);
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
    
    /*
    (coffre A).
        On commence par le dernier coffre, Coffre J (dernier dans la liste des coffres) : 
        on regarde quelle clé permet d’ouvrir le J puis on range cette clé dans un coffre aléatoire (disons le D), on retire alors le coffre J de la liste
        on regarde ensuite quelle clé permet d’ouvrir le coffre D et on range cette clé dans un nouveau coffre aléatoire (disons F) et on retire le coffre D de la liste
        la liste n’est toujours composée que des coffres dont on a pas encore rangé la clé dans un autre
        on répète cette manipulation jusqu'à ce que la liste de coffre soit vide, une fois qu’elle est vide cela veut dire que tous les coffres contiennent maintenant une clé, sauf le 1er coffre dans lequel on range alors la clé qui permet d’ouvrir le coffre dans lequel on a rangé une clé et retiré de la liste en dernier.

            
    */
    

    for (let i = copyChest.length; i > 0; i--) {

        if (copyChest.length === 1 ) {
            let itemPlace = copyChest[0].keysNecessary;
            itemPlace.forEach(element => {
                chests[0].AddItem(element);
            });
            solution.push(chests[0].name);
            
        } else {
            let indexChest = GetRandomNumber(copyChest.length);
            let itemPlace = copyChest[indexChest].keysNecessary;
            
            let indexChestPlace = GetRandomNumber(copyChest.length);
            while (indexChest === indexChestPlace || copyChest[indexChestPlace].item.length > 0) {
                indexChestPlace = GetRandomNumber(copyChest.length);
            }
            
            itemPlace.forEach(element => {
                copyChest[indexChestPlace].AddItem(element);
            });
            
            solution.push(copyChest[0].name);

            copyChest.splice(indexChest, 1);
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
    chestList = []
    for (let index = 0; index < _nb; index++) {
        chestList.push(new Chest("Coffre n° " + (index + 1).toString()));
    }
    return chestList
}

function GenerateItem(_nb){
    keyList = [new Item("cle 1"), new Item("cle 2"), new Item("cle 3"), new Item("cle 4"), new Item("cle 5"), new Item("cle 6"), new Item("cle 7"), new Item("cle 8"), new Item("cle 9")]
    itemList = []
    for (let index = 0; index < _nb; index++) {
        itemList.push(keyList[GetRandomNumber(keyList.length)])
    }
    return itemList
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
    AssignItemToChest(chests, items);
    AssignChestCondition(); 
    //AssignItemToChest2();
}

let player; 
let chests; 
let items;
let solution;
let seed = '';

play();