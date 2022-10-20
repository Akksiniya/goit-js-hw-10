import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import { fetchCountries } from './js/.fetchCountries';

const DEBOUNCE_DELAY = 300;

const refs = {
    input: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
};


refs.input.addEventListener('input', debounce(searchCountry, DEBOUNCE_DELAY));

function searchCountry () {

    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';

    const countryName = refs.input.value.trim();
    
    if (!countryName) {
        return;
    } 

    fetchCountries(countryName)
    .then(countryFound)
    .catch(onError);

};

function countryFound (countries) {
    if (countries.length > 10) {
        onWarning();
    } else 
    if (countries.length === 1) {
       const markup = createMarkupInfo(countries);
       refs.countryInfo.insertAdjacentHTML('beforeend', markup);
    } else 
    {
       const markup = createMarkupList(countries);
       refs.countryList.insertAdjacentHTML('beforeend', markup);
    }

};

function createMarkupInfo (countries) {

    return  countries 
    .map (({ name, capital, population, flags, languages }) => {

        const languagesCountry = Object.values(languages).join(', ');

       return `<div class="country-info__box"> 
    <img src="${flags.svg}" alt="flag of ${name.common}" width="60px"/>
    <p class="country-info__name">${name.common}</p></div>
    <ul class="country-info__list">
    <li><span class="country-info__item"> Capital: </span>${capital}</li>
    <li><span class="country-info__item"> Population: </span>${population}</li>
    <li><span class="country-info__item"> Languages: </span>${languagesCountry}</li>
        </ul>
    `})
    .join('');

};

function createMarkupList (countries) {
    return countries
    .map(({ flags, name }) => {
      return /*HTML*/ `<li class="country-list__item">
      <img src="${flags.svg}" alt="flag" width="50px"/>
      <p class="country-list__name">${name.common}</p>
      </li>`;
    })
    .join('');

};

const onWarning = () => {
    Notify.info('Too many matches found. Please enter a more specific name',
    {timeout: 2000,
    });
};

const onError = () => {
    Notify.failure('Oops, there is no country with that name', {
        timeout: 2000,
    });
};
