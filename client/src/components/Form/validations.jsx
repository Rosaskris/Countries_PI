export default function validations(data){
    let errors = {};

    if (!data.name) {
        errors.name = 'Name required';

    }if (data.name.length<3 ||data.name.length>15 ) {
        errors.name = 'Name has an invalid length';

    }if (!data.difficulty) {
        errors.difficulty= 'Must have a difficulty level';
    } 
    if (!(data.difficulty >= 1 && data.difficulty <= 5)) {
        errors.difficulty = 'Difficulty level must be a number from 1 to 5';
    }
    if (!data.duration) {
        errors.duration= 'Must have a duration time';
    }
    if (!(data.duration >= 1 && data.duration <= 24)) {
        errors.duration = 'Duration time must be 1 to 24 hours';
    }
    if (!data.season) {
        errors.season= 'Must have a season';
    }
    if (!data.selectedCountries) {
        errors.selectedCountries= 'Must select a country';
    }
    return errors;
}