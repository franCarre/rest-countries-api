const url = 'https://restcountries.eu/rest/v2/all'
const toggle = document.getElementById('toggle')
const countriesEl = document.getElementById('countries')
const detailsEl = document.getElementById('details')
const searchEl = document.getElementById('search')
const filterBtn = document.getElementById('filter')
const regionFilters = document.querySelectorAll('li')
const backBnt = document.getElementById('back')

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
      <div class="country__body">
        <h2 class="country__name">${country.name}</h2>
        <p><strong>Population:</strong> ${country.population}</p>
        <p class="country__region"><strong>Region:</strong> ${country.region}</p>
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
  const detailsContent = detailsEl.querySelector('.details__body')
  const flagImg = detailsEl.querySelector('img')
  flagImg.src = country.flag
  detailsContent.innerHTML = `
    <div class="details__heading">
      <h3>${country.name}</h3>
    </div>
    <div class="details__content">
      <div>
        <p><strong>Native Name:</strong> ${country.nativeName}</p>
        <p><strong>Population:</strong> ${country.population}</p>
        <p><strong>Region:</strong> ${country.region}</p>
        <p><strong>Sub Region:</strong> ${country.subregion}</p>
        <p><strong>Capital:</strong> ${country.capital}</p>
      </div>
      <div>
        <p><strong>Top Level Domain:</strong> ${country.topLevelDomain[0]}</p>
        <p><strong>Currencies:</strong> ${country.currencies.map(currency => ' ' + currency.code)}</p>
        <p><strong>Languages:</strong> ${country.languages.map(language => ' ' + language.name)}</p>
      </div>
    </div>
  `
}

searchEl.addEventListener('input', e => {
  const { value } = e.target
  const countryName = document.querySelectorAll('.country__name')
  countryName.forEach(name => {
    if (name.innerText.toLowerCase().includes(value.toLowerCase())) {
      name.parentElement.parentElement.style.display = 'block'
    } else {
      name.parentElement.parentElement.style.display = 'none'
    }
  })
})

regionFilters.forEach(filter => {
  filter.addEventListener('click', () => {
    const value = filter.innerText
    const countryRegion = document.querySelectorAll('.country__region')
    countryRegion.forEach(region => {
      if (region.innerText.includes(value) || value === 'All') {
        region.parentElement.parentElement.style.display = 'block'
      } else {
        region.parentElement.parentElement.style.display = 'none'
      }
    })
  })
})

filterBtn.addEventListener('click', () => {
	filterBtn.classList.toggle('open')
})

backBnt.addEventListener('click', () => {
  document.querySelector('.search').style.display = 'flex'
  countriesEl.style.display = 'grid'
  detailsEl.style.display = 'none'
})

toggle.addEventListener('click', () => {
  document.body.classList.toggle('dark')
})