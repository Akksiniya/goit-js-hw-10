
export function fetchCountries(countryName) {
    
    const END_POINT = 'https://restcountries.com/v3.1/name';
    const params = 'fields=name,capital,population,flags,languages';
  
    return fetch(`${END_POINT}/${countryName}?${params}`).then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    });
  }