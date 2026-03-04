"use strict";

const form = document.querySelector("form");
const inputFields = document.querySelectorAll(".input-field");

const cardNameDisplay =document.getElementById("cardholder-name");
const cardNumber=document.getElementById("card-number");
const cvv = document.getElementById("cvv");
const expMonth=document.getElementById("exp-month");
const expYear=document.getElementById("exp-year");

// input fields variables
const cardNameInput =document.getElementById("cardholder-name-field");
const cardNumberInput = document.getElementById("card-number-field");
const cardCvvInput = document.getElementById("cvv-field");
const cardExpMonth= document.querySelector(".exp-month-field");
const cardExpYear= document.querySelector(".exp-year-field");


  const thanksCard= document.querySelector(".thanks-card");

// Real-time Card Updates
//card Number
cardNumberInput.addEventListener("input",function(e){
    // NOTE slice function , how to limit the input in the field
    // How to reset the value of the card if the text input is empty
    //TODO make the spaces in formatting the card number

    let value = e.target.value.replace(/\D/g, "").slice(0, 16);

    let formattedValue = value.replace(/(\d{4})(?=\d)/g, "$1 ");
    e.target.value= formattedValue;
    cardNumber.textContent = formattedValue || "0000 0000 0000 0000";
});
// card Name
cardNameInput.addEventListener("input",function(e){
cardNameDisplay.textContent= e.target.value || "Card-Holder Name";
});
// card cvv
cardCvvInput.addEventListener("input",function(e){
 if(e.target.value.length>3)
        e.target.value=e.target.value.slice(0,3);
cvv.textContent= e.target.value || "000";
});
// card expiry Month
cardExpMonth.addEventListener("input",function(e){
    if(e.target.value.length>2)
        e.target.value=e.target.value.slice(0,2);

    expMonth.textContent= e.target.value|| "00";
});
// card expiry Year
cardExpYear.addEventListener("input",function(e){
    if(e.target.value.length>2)
        e.target.value=e.target.value.slice(0,2);
    expYear.textContent= e.target.value||"00";
});




const cardDefaultValues= function() {
    cardNameDisplay.textContent ="Card-Holder Name";
cardNumber.textContent="0000 0000 0000 0000";
cvv.textContent = "000"
expMonth.textContent="00";
expYear.textContent="00";
};


const showErrorState=function(field,errorMsg,message="Can't be blank"){
    errorMsg.classList.remove("hidden");
    field.classList.add("error-state");
    errorMsg.textContent= message;
};
const removeErrorState= function(field,errorMsg){
    errorMsg.classList.add("hidden");
    field.classList.remove("error-state");
}

form.addEventListener("submit", function (e) {
  e.preventDefault(); // This stops the page from refreshing
    let isValidForm=true;

  inputFields.forEach((field)=>{

      const parent= field.closest(".field-container");
      const errorMsg=parent.querySelector(".error-message");

      removeErrorState(field,errorMsg);
    //   Validate not empty
    if(field.value.trim()==="")
    {
        showErrorState(field,errorMsg);
       isValidForm=false;
    }

    // Validate Name
    else if(field===cardNameInput)
    {
        const textPattern = /^[A-Za-z]+( [A-Za-z]+)*$/;
        if(!textPattern.test(field.value))
        {
            showErrorState(field,errorMsg,"Ca't contain numbers");
            isValidForm=false;
        }
    }

    // Validate card Number
    else if(field===cardNumberInput)
        {
            const rowValue = field.value.replace(/\s/g,"");
          if(isNaN(rowValue))
          {
            // Must be a number
            showErrorState(field,errorMsg,"Wrong format, numbers only");
                        isValidForm=false;

          }
          else if(rowValue.length !== 16){
            // must be 16 digit
            showErrorState(field,errorMsg,"Must be 16 digit");
                isValidForm=false;

          }
          else {
             removeErrorState(field,errorMsg);
          }
          
        }
    // Validate CVV
        else if(field===cardCvvInput)
        {
            const cvvPattern = /^\d{3,4}$/;
            if(!cvvPattern.test(field.value))
            {
            showErrorState(field,errorMsg,"Must be 3 digits");
                        isValidForm=false;
            }
          else {
             removeErrorState(field,errorMsg);
          }
        }
        else if(field===cardExpMonth || field===cardExpYear ) {
             // Validate Expiry Date
            const now = new Date();
            const currentYear = Number(now.getFullYear().toString().slice(-2));
            const currentMonth = Number(now.getMonth()+1);

            const m= Number(cardExpMonth.value);
            const y = Number(cardExpYear.value);

            if(m<1 || m>12){
                    showErrorState(field,errorMsg,"Not a valid date");
                isValidForm=false;
            }
            // Year not in the past
            else if(y<currentYear || (y===currentYear && m< currentMonth)){
                showErrorState(field,errorMsg ,"Not a valid date");
                isValidForm=false;
            }
        }

        });
    if(isValidForm)
    {
    form.reset();
    cardDefaultValues();
     
    thanksCard.classList.remove("hidden");
    thanksCard.classList.add("animate__animated","animate__bounceIn");
    form.classList.add("hidden");
    }

  });

  const continueBtn = document.querySelector(".continue");

  continueBtn.addEventListener("click",function(){
     thanksCard.classList.add("hidden");
     thanksCard.classList.remove("animate__animated","animate__bounceIn");
    form.classList.remove("hidden");
  })








