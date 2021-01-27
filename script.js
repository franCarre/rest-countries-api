// Your users should be able to:

// See all countries from the API on the homepage +++
// Search for a country using an input field
// Filter countries by region
// Click on a country to see more detailed information on a separate page
// Click through to the border countries on the detail page
// Toggle the color scheme between light and dark mode (optional) +++

const url = 'https://restcountries.eu/rest/v2/all'
const countriesEl = document.getElementById('countries')
const detailsEl = document.getElementById('details')
const searchEl = document.getElementById('search')

getCountries()


async function getCountries() {
  const response = await fetch(url)
  const countries = await response.json()
  displayCountries(countries)
}

function displayCountries(countries) {
  countries.forEach(country => {
    const countryEl = document.createElement('article')
    countryEl.classList.add('country')
    countryEl.innerHTML = `
            <img class="country__flag" src="${country.flag}">
          <div class="country__data">
            <h2 class="country__name">${country.name}</h2>
            <p><strong>Population:</strong> ${country.population}</p>
            <p><strong>Region:</strong> ${country.region}</p>
            <p><strong>Capital:</strong> ${country.capital}</p>
          </div>
    `
    countryEl.addEventListener('click', () => {
      document.querySelector('.search').style.display = 'none'
      countriesEl.style.display = 'none'
      detailsEl.style.display = 'flex'
      displayCountryDetails(country)
    })
    countriesEl.appendChild(countryEl)
  })
  
}

function displayCountryDetails(country) {
  // detailsEl.innerHTML = `
  //   ${country.name}
  //   ${country.nativeName}
  //   ${country.population}
  // `
}