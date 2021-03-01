/**    
  * Avoid Falling Bar
  * Led Game waarin er op een bolletje beneden die je met de joystick bestuuurt
    een rij af komt met met 1 open gat die rij probeer je te ontwijken. 
  * @author Axel Claessens
  * @author Cloë Schiffelleers
  * @version 1.0 (11/02/2021)
  */
 let matrix = new Matrix(WIDTH, HEIGHT);
 let r = 7 //De rij van het beginpunt van de joystick 
 let c = 3 //De kolom van het beginpunt van de joystick 
 let rij = -1 //de beginplaats van de 1ste vallende rij
 let g = 3 //in welke kolom het 1ste gat komt in de vallende rij
 let scoreField
 let score = 0 //score begint bij 0
 let hghScoreField
 let highscore = 0 //highscore begint bij 0
 function setup() {
   matrix.init()
   frameRate(2)
 
   
 }
 //functie die hij hele tijd moet lezen
 function draw() {
   //score in javascript zetten
   scoreField = select('#score')
   scoreField.html('score: ' + score)
   highScoreField = select('#highscore')
   highScoreField.html('highscore: ' + highscore)
 
 
   rij++ //de rij laten zakken 
 
   showRow(rij, g) // deze functie controleren
   matrix.setLed(r, g, false) //deze led niet laten branden
 
   movePlayer() //deze functie controleren
   showLedGroen(r, c) //de begin plaats van de joystick tonen
 
   checkBotsing() //deze functie controleren
 
   matrix.show() //de leds tonen
   matrix.clear() //de leds verwijderen
 }
 
 //de kleuren van de bolletjes bij movePlayer()
 function showLedGroen(row, col) {
   matrix.setLed(row, col, true, color('green'))
 }
 //de kleuren van de bolletjes bij showRow(rij, g)
 function showLedRood(row, col) {
   matrix.setLed(row, col, true, color('red'))
 }
 //de kleuren van de bolletjes bij checkBotsing()
 function showLedPaars(row, col) {
   matrix.setLed(row, col, true, color('purple'))
 }
 
 /** 
   *een hele rij @param c laten branden 
   *@param g opnieuw laten uitgaan in rij(rij =-1)
  */
 function showRow(rij, g) {
   
   for (let c = 0; c < WIDTH; c++) {
     showLedRood(rij, c)
   }
 
   matrix.setLed(rij, g, false)
 
 }
 
 //de groen bol met de joystick laten bewgen
 function movePlayer() {
   let x = readJoystickX()
   if (x > 800 && c < 7) { //de joystick gaat naar rechts 
     c = c + 1
 
   }
 
   if (x < 200 && c > 0) { //de joystick gaat naar links 
     c = c - 1
 
   }
 }
 
 //Oef 4 inleiding led game nummer geven en die led tonen die bij die nummer hoort(wordt niet gebruikt).
 function setLedNr(nr) {
   let r = Math.floor(nr / WIDTH)
   let c = nr % WIDTH
   matrix.setLed(r, c, true)
 
 }
 
 /** 
   *Als rij = 7 is controleren of @param g overeenkomt met @param c 
   *Ja, dan verhooght de score met 1     
   *Nee, de leds kleuren allemaal paars en de score wordt 0
   *Een nieuw gat @return g geven en de rij komt terug vanboven te staan
 */
 function checkBotsing() {
   if (rij == 7) { //controleren of de rij onderaan de matrix is
     if (g == c) {  // geen botsing
      
       score = score + 1 //score verhogen
       if(highscore >= score){
       highscore = score
       }
     }
 
     else { // botsing 
       for (let c = 0; c < WIDTH; c++) {
         for (let r = 0; r < HEIGHT; r++) {
           showLedPaars(r, c) //alle leds paars laten worden
           score = 0 //de score wordt nul
         }
       }
     }
     g = Math.floor(Math.random() * (WIDTH - 1)) //random getal kiezen dat het gat moet zijn
     rij = -1 //de rij terug van boven laten beginnen
   }
 }
