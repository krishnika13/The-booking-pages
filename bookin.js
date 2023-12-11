let WiFi;
let wifineed;
let poolview;
let gardenview;
let RoomType;
let ExtraBed;
let costPerBed;
let totalCost;
let KidsAboveFive;
let cost;
let singleRoomCost;
let doubleRoomCost;
let tripleRoomCost;
let kidsFiveTotal;
let LoyaltyPointsBtn;
let LoyaltyPoints;
let loyaltyPointsOutput;


let activitySelect;
let adventureDisply;
let guestAdultsInput;
let guestKidsInput;
let guideCostDisplay;
let NumAdults;
let NumKids;
// ref-------------------------------------------------------------------------------------------------------------------
// details
txtName = document.getElementById("name");
txtEmail = document.getElementById("email");
txtBranch = document.getElementById("branch");

//wifi input
chooseWifi = document.getElementById("wifi");
wifiRequirement = document.getElementById("wifineed") // output p id 
TxtWifiCost = document.getElementById("wifiCost");

// view
viewPool = document.getElementById("pool")
viewGarden = document.getElementById("garden");
viewNeed = document.getElementById("selectedView"); // output p id
RoomViewCost = document.getElementById("roomViewCost");
 // Get date input elements
 checkInDateInput = document.getElementById("checkInDate");
 checkOutDateInput = document.getElementById("checkOutDate");

// Get room input elements
singleRoomInput = document.getElementById("singleroom");
doubleRoomInput = document.getElementById("doubleroom");
tripleRoomInput = document.getElementById("tripleroom");

singleRoomCostElement = document.getElementById("singleRoomCost");
doubleRoomCostElement = document.getElementById("doubleRoomCost");
tripleRoomCostElement = document.getElementById("tripleRoomCost");

optSingleRoom = document.getElementById("singleCost");
optDoubleRoom = document.getElementById("doubleCost");
optTripleRoom = document.getElementById("tripleCost");

//extra bed input elements
chooseBed = document.getElementById("extrabed");
optExtraBed = document.getElementById("extraBedCost");

//extra bed
AboveFive = document.getElementById("kidsabovefive");
optAboveFiveKid = document.getElementById("above5Cost");

//total cost
txtTotalCost = document.getElementById("totalCost");

// promo code
txtPromoCode = document.getElementById("promo-code");
optPromoCode = document.getElementById("promoCodeId");
txtTotalCost = document.getElementById("totalCost");

// loyalty points
btnLoyaltypoint = document.getElementById("loyalty-btn");
optLoyaltyPoint = document.getElementById("loyalpoints");

// the form thingie
formContainer = document.getElementById("roomBookingForm"); 

// display overall cost
// Corrected letiable names
overallSummary = document.getElementById("summaryTable");
overallTable = overallSummary.getElementsByTagName("tbody")[0];
// event listeners ----------------------------------------------------------------------------------------
//for wifi
chooseWifi.addEventListener("click", updateRequirement);

// for view
viewPool.addEventListener("click",changeViewPool);
viewGarden.addEventListener("click",changeViewGarden)

//for date inputs
checkInDateInput.addEventListener("input", updateCost);
checkOutDateInput.addEventListener("input", updateCost);

// for room inputs
singleRoomInput.addEventListener("input", updateCost);
doubleRoomInput.addEventListener("input", updateCost);
tripleRoomInput.addEventListener("input", updateCost);

// for extra bed
chooseBed.addEventListener("input",ExtraCostUpdate);

// for above Five kids
AboveFive.addEventListener("input", KidsAboveCost);

// for promo code
txtPromoCode.addEventListener("input", applyPromoCode);

// for loyalty points
btnLoyaltypoint.addEventListener("click", function(event) {
    event.preventDefault(); 
    displayLoyaltyPoint(); 
});

// for total cost
txtTotalCost.addEventListener("input", displayTotalCost); 

// for form
formContainer.addEventListener("input", displayTotalCost);

//for overall cost
txtTotalCost.addEventListener("input", displayOverallCost);


//creating functions ------------------------------------------------------------------------------------------------
//function for wifi
function updateRequirement() {
    if (chooseWifi.checked) {
        wifiRequirement.innerText = "Wi-Fi is required.";
    } else {
        wifiRequirement.innerText = "Wi-Fi is not required.";
    }
}

//function for view
function changeViewPool(){
    if (viewPool.checked){
        viewNeed.innerText ="pool view";
    }
    else{
        viewNeed.innerText ="no view selected";
    }
}

function changeViewGarden(){
    if (viewGarden.checked){
        viewNeed.innerText ="Garden view";
    }
    else{
        viewNeed.innerText ="no view selected";
    }
}

// function to update room cost according to dates

function updateCost() {
// for dates
const checkInDate = new Date(checkInDateInput.value);
const checkOutDate = new Date(checkOutDateInput.value);

// Function (update cost based on user inputs)
const numberOfDays = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));   // Calculate the number of days

if (isNaN(checkInDate.getTime()) || isNaN(checkOutDate.getTime())) {
    optSingleRoom.innerText = "RS0.00";
    optDoubleRoom.innerText = "RS0.00";
    optTripleRoom.innerText = "RS0.00";
    displayTotalCost();
    return;
}
 // for rooms
 const singlePerDay = 25000;
 const doublePerDay = 35000;
 const triplePerDay = 40000;

 const singleRoomCount = parseInt(singleRoomInput.value) || 0;
 const doubleRoomCount = parseInt(doubleRoomInput.value) || 0;
 const tripleRoomCount = parseInt(tripleRoomInput.value) || 0;

//total cost
const singleRoomCostValue = singleRoomCount * numberOfDays * singlePerDay;
const doubleRoomCostValue = doubleRoomCount * numberOfDays * doublePerDay;
const tripleRoomCostValue = tripleRoomCount * numberOfDays * triplePerDay;

// displayed cost
// Update room cost using innerText
optSingleRoom.innerText = `RS${singleRoomCostValue.toFixed(2)}`;
optDoubleRoom.innerText = `RS${doubleRoomCostValue.toFixed(2)}`;
optTripleRoom.innerText = `RS${tripleRoomCostValue.toFixed(2)}`;

displayTotalCost();

}
    
//function for extra bed
function ExtraCostUpdate(){
    let chooseBed = document.getElementById("extrabed").value;
    let costPerBed = 8000;
    let totalCost = chooseBed * costPerBed;
    document.getElementById("extraBedCost").textContent = "RS" + totalCost.toFixed(2);

    displayTotalCost();
}


// Function for kids above five
function KidsAboveCost() {
    let aboveFiveValue = parseFloat(AboveFive.value);
    let FivekidCost = 5000;

    const checkInDate = new Date(checkInDateInput.value);
    const checkOutDate = new Date(checkOutDateInput.value);
    const numberOfDays = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));

    let kidsFiveTotal = aboveFiveValue * FivekidCost * numberOfDays;

    if (isNaN(checkInDate.getTime()) || isNaN(checkOutDate.getTime())) {
        let kidsFiveTotal = 5000;
        optAboveFiveKid.textContent = "RS" + kidsFiveTotal.toFixed(2);
        displayTotalCost();
        return;
    }
   
    optAboveFiveKid.textContent = "RS" + kidsFiveTotal.toFixed(2);
    displayTotalCost();
}

// total isn't working argggggghh // finally i's workingggggg (current booking total)
function displayTotalCost() {
    const singleRoomCost = parseFloat(optSingleRoom.innerText.replace('RS', '')) || 0;
    const doubleRoomCost = parseFloat(optDoubleRoom.innerText.replace('RS', '')) || 0;
    const tripleRoomCost = parseFloat(optTripleRoom.innerText.replace('RS', '')) || 0;
    const extraBedCost = parseFloat(optExtraBed.innerText.replace('RS', '')) || 0;
    const kidsAboveFiveCost = parseFloat(optAboveFiveKid.innerText.replace('RS', '')) || 0;

    const totalCost = singleRoomCost + doubleRoomCost + tripleRoomCost + extraBedCost + kidsAboveFiveCost;

    txtTotalCost.innerText = `RS${totalCost.toFixed(2)}`;
    applyPromoCode();
}

//promo code
function applyPromoCode() {
    const promoCode = txtPromoCode.value.trim();

    if (promoCode === "Promo123") {
        const totalCost = parseFloat(txtTotalCost.innerText.replace('RS', '')) || 0;
        const discountAmount = totalCost * 0.05;
        const discountedTotal = totalCost - discountAmount;

        // the discount part
        txtTotalCost.innerText = `RS${discountedTotal.toFixed(2)}`;
        optPromoCode.innerText = "5% discount";
    } else {
        const originalTotal = parseFloat(txtTotalCost.innerText.replace('RS', '')) || 0;
        txtTotalCost.innerText = `RS${originalTotal.toFixed(2)}`;
        optPromoCode.innerText = "Invalid promo code";
        
    }
}
// yayyy the promo code workss

// overall cost display thingie (current booking cost)
function displayOverallCost() {

    const singleRoomCost = parseFloat(optSingleRoom.innerText.replace('RS.', '')) || 0;
    const doubleRoomCost = parseFloat(optDoubleRoom.innerText.replace('RS.', '')) || 0;
    const tripleRoomCost = parseFloat(optTripleRoom.innerText.replace('RS.', '')) || 0;
    const extraBedCost = parseFloat(optExtraBed.innerText.replace('RS', '')) || 0;
    const kidsAboveFiveCost = parseFloat(optAboveFiveKid.innerText.replace('RS', '')) || 0;

    const overallCost = singleRoomCost + doubleRoomCost + tripleRoomCost + extraBedCost + kidsAboveFiveCost;
    overallRoomCostElement.innerText = `Overall Cost: RS${overallCost.toFixed(2)}`;
}
   
// loyalty points
function displayLoyaltyPoint() {
    const numSingle = parseInt(singleRoomInput.value) || 0;
    const numDouble = parseInt(doubleRoomInput.value) || 0;
    const numTriple = parseInt(tripleRoomInput.value) || 0;

    const totalRooms = numSingle + numDouble + numTriple;
    let LoyaltyPointsEarned = 0;

    if (totalRooms > 3) {
        LoyaltyPointsEarned = totalRooms > 3 ? 20 * totalRooms : 0;
        optLoyaltyPoint.textContent = `yay! You've earned ${LoyaltyPointsEarned} loyalty points :)`;
    } else {
        optLoyaltyPoint.textContent = "You haven't earned any loyalty points :(";
    }
}

// overall booking cost thingie
    document.getElementById("book-now").addEventListener("click", function (event) {
        event.preventDefault(); 


      // this is Getting values from the current booking
      const singleRoomCost = parseFloat(optSingleRoom.textContent.replace('RS', ''))||0;
      const doubleRoomCost = parseFloat(optDoubleRoom.textContent.replace('RS', ''))||0;
      const tripleRoomCost = parseFloat(optTripleRoom .textContent.replace('RS', ''))||0;
      const extraBedCost = parseFloat(optExtraBed.textContent.replace('RS', ''))||0;
      const above5Cost = parseFloat(optAboveFiveKid.textContent.replace('RS', ''))||0;
      const promoCodeCost = parseFloat(optPromoCode.textContent.replace('RS', ''))||0; 

      const RoomCost = singleRoomCost + doubleRoomCost + tripleRoomCost;
      const totalRoomCost = RoomCost+ extraBedCost + above5Cost - promoCodeCost;
      
      // Update overall booking 
      const summaryTable = document.getElementById("summaryTable").getElementsByTagName('tbody')[0];
      const newRow = summaryTable.insertRow();
      newRow.innerHTML = `
                          <td>${RoomCost.toFixed(2)}</td>
                          <td>${extraBedCost.toFixed(2)}</td>
                          <td>${above5Cost.toFixed(2)}</td>
                          <td>${promoCodeCost.toFixed(2)}</td>
                          <td>${totalRoomCost.toFixed(2)}</td>`;
  
      // Update overall booking cost
      const totalCostElement = txtTotalCost;
      const currentTotalCost = parseFloat(totalCostElement.textContent.replace('RS', ''));
      const newTotalCost = currentTotalCost + totalRoomCost;
      totalCostElement.textContent = `RS${newTotalCost.toFixed(2)}`;
  
      // Reset current booking to blank and cost to $0.00
      optSingleRoom.textContent = "RS0.00";
      optDoubleRoom.textContent = "RS0.00";
      optTripleRoom.textContent = "RS0.00";
      optExtraBed.textContent = "RS0.00";
      optAboveFiveKid.textContent = "RS0.00";
      TxtWifiCost.textContent = "Wifi Not Selected";
      RoomViewCost.textContent = "View Not Selected";
      optPromoCode.textContent = "Promo Code Not entered";
      txtTotalCost.textContent = "RS0.00";

      formContainer.reset();
  
      // overall booking table
      document.getElementById("summary-box").style.display = "block";
      applyPromoCode();
    });

    // do the local storage thingiee

    // no wait do the adventure bookings

  // ---------------------------------------------ADVENTURE BOOKING PAGE JS-------------------------------------------------------------------------------------------------

//get reference (adventure page)

// to select adventure
activitySelect = document.getElementById("activity");
adventureDisply = document.getElementById("adven-display");

// duration thingie
SelectDuration = document.getElementById("duration");
optDuration = document.getElementById("durationCost");

// nationality cost and no of people
// for adults
SelectAdults = document.getElementById("guest-adults");//
SelectKids = document.getElementById("guest-kids");//

optDisplatAdults = document.getElementById("adultscost");
optDisplayKids = document.getElementById("kidscost");

// nationality
LocalNationality = document.getElementById("localCitizen");//
ForeignNationality = document.getElementById("foreignCitizen");//

//guide
btnYesGuide = document.getElementById("yes");
btnNoGuide = document.getElementById("no");

optGuideCost = document.getElementById("guidecost");

// current booking
AdventureCurrentCost= document.getElementById("AdventuretotalCost") 

// adventure booking cost btn
AdventureButton = document.getElementById("adventure-book-now");

//event listeners-----------------------
// display adventure 
activitySelect.addEventListener("change",AdventureSelect);

//duration
SelectDuration.addEventListener("change", DisplayHours)

// no of peeps and nation
SelectAdults.addEventListener("input",updateAdventureCost);
SelectKids.addEventListener("input",updateAdventureCost);

LocalNationality.addEventListener("change",updateAdventureCost);
ForeignNationality.addEventListener("change",updateAdventureCost);

//guide
btnYesGuide.addEventListener("change",DisplayGuidecost);
btnNoGuide.addEventListener("change",DisplayGuidecost);

// current cost
AdventureCurrentCost.addEventListener("input", updateTotalAdventureCost);

// adven booking btn
AdventureButton.addEventListener("click",BookAdventure);

//functions--------------------------------
// select and display adventure
function AdventureSelect(){
    const selectedAdventure = activitySelect.selectedOptions[0].value;
    adventureDisply.textContent = `${selectedAdventure}`
}

// for duration
  function DisplayHours(){
    const selectedDuration = SelectDuration.value;
    optDuration.textContent = `${selectedDuration} hours`;
}

// for nationality and no of peopele
function updateAdventureCost(){
    const adults = parseInt(SelectAdults.value)|| 0;
    const kids = parseInt(SelectKids.value)|| 0;

    const isLocal = LocalNationality.checked;
    const isForeign = ForeignNationality.checked;

    let AdventureCostAdults, AdventureCostKids;

        if (isLocal) {
            AdventureCostAdults = 5000;
            AdventureCostKids = 2000;
        } 
        else {
            AdventureCostAdults = 10000;
            AdventureCostKids = 5000;
        }

        optDisplatAdults.textContent = "RS" + (AdventureCostAdults * adults).toFixed(2);
        optDisplayKids.textContent = "RS" + (AdventureCostKids * kids).toFixed(2);
        updateTotalAdventureCost();
    }

// guide cost
function DisplayGuidecost() {
    const isGuideSelected = btnYesGuide.checked;
    const adults = parseInt(SelectAdults.value) || 0;
    const kids = parseInt(SelectKids.value) || 0;

    let guideCost = 0;

    if (isGuideSelected) {
        const guideCostAdults = 1000;
        const guideCostKids = 500;

        guideCost = (guideCostAdults * adults) + (guideCostKids * kids);
    } else{
        guideCost = 0;
    }

    optGuideCost.textContent = "RS" + guideCost.toFixed(2);
    updateTotalAdventureCost();
}

//current booking cost

function updateTotalAdventureCost() {
     const CostForAdults = parseFloat(optDisplatAdults.innerText.replace('RS', '')) || 0;
     const CostForKids = parseFloat( optDisplayKids.innerText.replace('RS', '')) || 0;
     const CostForGuide = parseFloat( optGuideCost.innerText.replace('RS', '')) || 0;

     const TotalAdventureCost  = CostForAdults + CostForKids + CostForGuide;

     AdventureCurrentCost.innerText = `RS${TotalAdventureCost.toFixed(2)}`;

}

// adventure booking cost thingie

function BookAdventure(event){
    event.preventDefault();

    const selectedAdventure = activitySelect.selectedOptions[0].value;
    const adventureDuration = SelectDuration.value;
    const adventureCost = AdventureCurrentCost.innerText;

    alert(`Thank you for booking!\nAdventure: ${selectedAdventure}\nDuration: ${adventureDuration} hours\nCost: ${adventureCost}`);

    location.reload();

    adventureDisply.textContent = "Adventure will be displayed";
    optDisplatAdults.textContent = "RS0.00";
    optDisplayKids.textContent = "RS0.00";
    optGuideCost.textContent = "RS0.00";
    AdventureCurrentCost.textContent = "RS0.00";

    txtTotalCost.textContent = "RS0.00";

    const overallTable = document.getElementById("summaryTable").getElementsByTagName('tbody')[0];
    overallTable.innerHTML = '';
    
}

SelectDuration.addEventListener("change", updateTotalAdventureCostBasedOnDuration);

function updateTotalAdventureCostBasedOnDuration() {

    const selectedDuration = parseInt(SelectDuration.value) || 0;

    const CostForAdults = parseFloat(optDisplatAdults.innerText.replace('RS', '')) || 0;
    const CostForKids = parseFloat(optDisplayKids.innerText.replace('RS', '')) || 0;
    const CostForGuide = parseFloat(optGuideCost.innerText.replace('RS', '')) || 0;

    const totalAdventureCost = CostForAdults + CostForKids + CostForGuide;

    const updatedTotalAdventureCost = totalAdventureCost * selectedDuration;

    AdventureCurrentCost.innerText = `RS${updatedTotalAdventureCost.toFixed(2)}`;
}


//local storage thingie
addToFavoritesBtn = document.getElementById('favourite-button');

addToFavoritesBtn.addEventListener('click', function (event) {
    event.preventDefault();

    const storedDetailsString = localStorage.getItem('favoriteDetails');
    let storedDetails = {};

    if (storedDetailsString) {
        storedDetails = JSON.parse(storedDetailsString);
    }

    storedDetails = {
        roomBooking: {
            name: name.value,
            singleRoomCost: optSingleRoom.textContent,
            doubleRoomCost: optDoubleRoom.textContent,
            tripleRoomCost: optTripleRoom.textContent,
            extraBedCost: optExtraBed.textContent,
            above5Cost: optAboveFiveKid.textContent,
            wifiCost: TxtWifiCost.textContent,
            roomViewCost: RoomViewCost.textContent,
            promoCode: optPromoCode.textContent,
            totalCost: txtTotalCost.textContent
        },
     
    };

    const favoritesDetailsString = JSON.stringify(storedDetails);
    localStorage.setItem('favoriteDetails', favoritesDetailsString);

    alert('Booking details updated in favorites!');

    console.log('Stored Details:', storedDetails);
});

         
addToFavoritesBtn = document.getElementById('adven-favourite-button');

addToFavoritesBtn.addEventListener('click', function (event) {
    event.preventDefault();

    const storedDetailsString = localStorage.getItem('favoriteDetails');
    let storedDetails = {};

    if (storedDetailsString) {
        storedDetails = JSON.parse(storedDetailsString);
    }

    storedDetails = {adventureBooking: {
        selectedAdventure: activitySelect.selectedOptions[0].value,
        adventureDuration: SelectDuration.value,
        costForAdults: optDisplatAdults.textContent, 
        costForKids: optDisplayKids.textContent,      
        costForGuide: optGuideCost.textContent,        
        totalAdventureCost: AdventureCurrentCost.textContent
    }
 
};
const favoritesDetailsString = JSON.stringify(storedDetails);
localStorage.setItem('favoriteDetails', favoritesDetailsString);

alert('Booking details updated in favorites!');

console.log('Stored Details:', storedDetails);
});
























