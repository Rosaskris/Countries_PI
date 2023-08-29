export default function validations(data){
    let errors = {};
    function validateNumbers(inputValue) {
        // Regular expression pattern to match only numbers
        const numbersPattern = /^\d+$/;
        
        // Test the input value against the pattern
        return numbersPattern.test(inputValue);
        }
    function validateLetters(inputValue) {
        // Regular expression pattern to match only letters
        const lettersPattern = /^[A-Za-z\s]+$/;
            
        // Test the input value against the pattern
        return lettersPattern.test(inputValue);
        }

    if (!data.name) {
        errors.name = 'Name required';

    }if (data.name.length<3 ||data.name.length>20 ) {
        errors.name = 'Name has an invalid length';

    }if (!validateLetters(data.name)) {
        errors.name = 'Name must include only letters';

    }if (!data.difficulty) {
        errors.difficulty= 'Must have a difficulty level';

    }if (!validateNumbers(data.difficulty)) {
        errors.difficulty= 'Difficulty must be only numbers';
    }
    if (!(data.difficulty >= 1 && data.difficulty <= 5)) {
        errors.difficulty = 'Difficulty level must be a number from 1 to 5';
    }
    if (!data.duration) {
        errors.duration= 'Must have a duration time';
    }
    if (!validateNumbers(data.duration)) {
        errors.duration='Duration must be only numbers'

    }if (!(data.duration >= 1 && data.duration <= 24)) {
        errors.duration = 'Duration time must be 1 to 24 hours';
    }
    if (!data.season) {
        errors.season= 'Must have a season';
    }
    if (!data.selectedCountries.length) {
        errors.selectedCountries= 'Must select a country';
    }
    return errors;
}


