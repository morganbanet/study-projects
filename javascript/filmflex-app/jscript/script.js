/* =====================================================================
Global
===================================================================== */
const global = {
  currentPage: window.location.pathname,
  search: {
    id: 1,
    type: '',
    term: '',
    page: 1,
    totalPages: 1,
    totalResults: 0,
    seasonNumber: 1,
    enableScroll: true,
    previousContentIds: [],
  },
  api: {
    // Do not share your API Key
    apiKey: 'ea3e673bade4fcfdadac8b33db1102a0',
    apiUrl: 'https://api.themoviedb.org/3',
  },
};

/* =====================================================================
Swiper config
===================================================================== */
function initSwiperPromo() {
  const swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    spaceBetween: 10,
    loop: true,
    freeMode: true,
    autoHeight: true,
    mousewheel: {
      forceToAxis: true,
      releaseOnEdges: true,
    },
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    breakpoints: {
      320: {
        slidesPerView: 2,
      },
      480: {
        slidesPerView: 3,
      },
      768: {
        slidesPerView: 4,
      },
      992: {
        slidesPerView: 5,
      },
      1200: {
        slidesPerView: 6,
      },
    },
  });
}

function initSwiperCastRight() {
  const swiper = new Swiper('.swiper-cast', {
    slidesPerView: 'auto',
    direction: 'vertical',
    spaceBetween: 10,
    freeMode: true,
    autoHeight: true,
    mousewheel: {
      forceToAxis: true,
      releaseOnEdges: true,
    },
  });
}

function initSwiperCastBottom() {
  const swiper = new Swiper('.swiper-bottom-cast', {
    slidesPerView: 1.5,
    spaceBetween: 8,
    grid: {
      rows: 2,
      fill: 'column',
    },
    freeMode: true,
    observer: true,
    passiveListeners: true,
    maxBackfaceHiddenSlides: 10,
    mousewheel: {
      forceToAxis: true,
      releaseOnEdges: true,
    },
    breakpoints: {
      480: {
        slidesPerView: 2,
        spaceBetween: 8,
      },
      650: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      780: {
        slidesPerView: 2.5,
        spaceBetween: 10,
      },
      1180: {
        slidesPerView: 3,
        spaceBetween: 10,
      },
      1200: {
        slidesPerView: 4,
        spaceBetween: 10,
      },
    },
  });

  swiper.on('breakpoint', function () {
    swiper.destroy(false);
    initSwiperCastBottom();
  });
}

function initSwiperSeasons() {
  const swiper = new Swiper('.swiper-seasons', {
    slidesPerView: 'auto',
    spaceBetween: 15,
    freeMode: true,
    mousewheel: {
      forceToAxis: true,
      releaseOnEdges: true,
    },
  });
}

function initSwiperEpisodes() {
  const swiper = new Swiper('.swiper-episodes', {
    slidesPerView: 1.5,
    spaceBetween: 8,
    grid: {
      rows: 3,
      fill: 'column',
    },
    freeMode: true,
    observer: true,
    observeParents: true,
    observeSlideChildren: true,
    passiveListeners: true,
    maxBackfaceHiddenSlides: 10,
    mousewheel: {
      forceToAxis: true,
      releaseOnEdges: true,
    },
    breakpoints: {
      480: {
        slidesPerView: 2,
        spaceBetween: 8,
      },
      606: {
        slidesPerView: 2.5,
        spaceBetween: 8,
      },
      650: {
        slidesPerView: 2.5,
        spaceBetween: 10,
      },
      780: {
        slidesPerView: 3,
        spaceBetween: 10,
      },
      1020: {
        slidesPerView: 3.5,
        spaceBetween: 10,
      },
      1180: {
        slidesPerView: 4,
        spaceBetween: 10,
      },
    },
  });

  swiper.on('breakpoint', function () {
    swiper.destroy(false);
    initSwiperEpisodes();
  });
}

/* =====================================================================
Landing page content
===================================================================== */
async function displayPromo() {
  const { results } = await fetchAPIData('/movie/upcoming');
  results.forEach((result) =>
    buildCard(result, '.swiper-wrapper', 'movie', true)
  );
}

async function displayGridOne() {
  const { results } = await fetchAPIData('/trending/all/day');
  const slicedResults = results.slice(0, 16);
  slicedResults.forEach((result) => buildCard(result, '.grid-one'));
}

async function displayGridTwo() {
  const { results } = await fetchAPIData('/movie/popular');
  const slicedResults = results.slice(0, 16);
  slicedResults.forEach((result) => buildCard(result, '.grid-two', 'movie'));
}

async function displayGridThree() {
  const { results } = await fetchAPIData('/trending/tv/day');
  const slicedResults = results.slice(0, 16);
  slicedResults.forEach((result) => buildCard(result, '.grid-three', 'tv'));
}

/* =====================================================================
Search/browsing content
===================================================================== */
async function displayContent() {
  const query = window.location.search;
  const urlParams = new URLSearchParams(query);

  global.search.type = urlParams.get('type');
  global.search.term = urlParams.get('search-term');

  const heading = document.querySelector('.type');
  const endpoint = `/trending/${global.search.type}/day`;

  global.search.type === 'movie'
    ? (heading.textContent = 'Movies')
    : (heading.textContent = 'Series');

  window.addEventListener('scroll', () => scrollHandler(endpoint));
  await buildContent(endpoint);
}

async function scrollHandler(endpoint) {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  buffer = scrollTop + clientHeight >= scrollHeight - 712.4;

  if (buffer && global.search.enableScroll !== false) {
    await buildContent(endpoint);
  }
}

async function buildContent(endpoint) {
  const searching = global.search.term === null || '' ? false : true;

  for (let x = 0; x < 2; x++) {
    const data = searching
      ? await fetchSearchData()
      : await fetchAPIData(endpoint);

    ({ results, page, total_results, total_pages } = data);

    for (const result of results) {
      // Check for duplicates before building
      const currentContentId = result.id;

      !global.search.previousContentIds.includes(currentContentId) &&
        buildCard(result, '.grid', global.search.type);

      global.search.previousContentIds.unshift(currentContentId);
      global.search.previousContentIds.splice(20);
    }

    global.search.page = page + 1;
    global.search.totalResults = total_results;

    if (results.length === 0) {
      global.search.enableScroll = false;
    }
  }
}

async function fetchSearchData() {
  const data = await searchAPIData();
  ({ results, page, total_results, total_pages } = data);

  const typeHeading = document.querySelector('.type');
  const queryHeading = document.querySelector('.searching-for');
  const resultHeading = document.querySelector('.total-results');
  const secondaryInput = document.querySelector('.search-field-secondary');

  switch (global.search.type) {
    case 'multi':
      typeHeading.textContent = 'All';
      break;
    case 'movie':
      typeHeading.textContent = 'Movies';
      break;
    case 'tv':
      typeHeading.textContent = 'Series';
      break;
  }

  queryHeading.textContent = `Searching for ${global.search.term}`;
  resultHeading.textContent = `${seperateNumber(total_results)} Results`;
  secondaryInput.value = global.search.term;

  return data;
}

/* =====================================================================
Build content cards
===================================================================== */
async function buildCard(result, targetSection, type, promo = false) {
  const section = document.querySelector(targetSection);
  const mediaType = result.media_type || type;

  const link = document.createElement('a');
  link.href =
    mediaType === 'movie'
      ? `/details.html?type=movie&id=${result.id}`
      : `/details.html?type=tv&id=${result.id}`;

  const swiperSlide = promo ? document.createElement('div') : null;
  swiperSlide?.classList.add('swiper-slide');
  swiperSlide?.classList.add('swiper-slide-promo');
  swiperSlide?.appendChild(link);
  section.appendChild(swiperSlide || link);

  const card = document.createElement('div');
  card.classList.add('card', promo && 'promo');
  link.appendChild(card);

  const poster = document.createElement('img');
  poster.classList.add('card-poster', promo && 'promo');
  result.poster_path
    ? (poster.src = `https://image.tmdb.org/t/p/w500${result.poster_path}`)
    : (poster.src = './media/no-image.png');
  poster.alt = mediaType === 'movie' ? result.title : result.name;
  card.appendChild(poster);

  const body = document.createElement('div');
  body.classList.add('card-body', promo && 'promo');
  card.appendChild(body);

  const titleContainer = document.createElement('div');
  const detailsContainer = document.createElement('div');
  body.appendChild(titleContainer);
  body.appendChild(detailsContainer);

  const title = document.createElement('p');
  title.classList.add('card-title', promo && 'promo');
  title.textContent = mediaType === 'movie' ? result.title : result.name;
  titleContainer.appendChild(title);

  const details = document.createElement('p');
  details.classList.add('card-text', promo && 'promo');
  detailsContainer.appendChild(details);

  const span = document.createElement('span');
  span.classList.add('highlight');
  span.textContent = mediaType === 'movie' ? 'Movie ' : 'TV ';

  const icon = promo ? document.createElement('i') : null;
  icon?.classList.add('fa-solid', 'fa-star');
  details.appendChild(icon || span);

  const release = document.createTextNode(
    mediaType === 'movie' || 'tv'
      ? ` • ${
          mediaType === 'movie'
            ? result.release_date.substring(0, 4)
            : result.first_air_date.substring(0, 4)
        }`
      : ` • Unkown`
  );

  const rating = promo
    ? document.createTextNode(
        ` ${result.vote_average} • ${result.release_date.substring(0, 4)}`
      )
    : null;
  details.appendChild(rating || release);
}

/* =====================================================================
Content details and posters
===================================================================== */
async function displayDetails() {
  const query = window.location.search;
  const urlParams = new URLSearchParams(query);

  global.search.type = urlParams.get('type');
  global.search.id = urlParams.get('id');
  const { type, id } = global.search;

  const details = await fetchAPIData(`/${type}/${id}`);
  const { cast } = await fetchAPIData(`/${type}/${id}/credits`);
  const { results: reviews } = await fetchAPIData(`/${type}/${id}/reviews`);
  const { results: recommendations } = await fetchAPIData(
    `/${type}/${id}/recommendations`
  );
  const { results: similars } = await fetchAPIData(`/${type}/${id}/similar`);

  const slicedRecommendations = recommendations.slice(0, 10);
  const slicedSimilars = similars.slice(0, 10);

  buildPoster(details, type);
  buildOverview(details, type);
  processCast(cast);
  processReviews(reviews);
  type === 'tv' && processSeasons(details);

  if (recommendations.length !== 0 || similars.length !== 0)
    recommendations.length !== 0
      ? processRecommendations(slicedRecommendations)
      : processRecommendations(slicedSimilars);
}

function processSeasons(details) {
  const seasonContainer = document.querySelector('.season-card-container');
  seasonContainer.classList.remove('hidden');

  for (const season of details.seasons) buildSeason(season);
  initSwiperSeasons();
  initSwiperEpisodes();
}

function processCast(cast) {
  for (const member of cast) {
    buildCastRight(member);
    buildCastBottom(member);
  }

  initSwiperCastRight();
  initSwiperCastBottom();
}

function processReviews(reviews) {
  if (reviews.length !== 0) {
    for (const review of reviews) buildReview(review);
  } else {
    const noReviewsAlert = document.querySelector('.no-reviews');
    noReviewsAlert.classList.remove('hidden');
  }
}

function processRecommendations(results) {
  if (results.length !== 0) {
    let x = 0;
    for (const result of results) {
      if (x === 0) {
        buildFirstSimilar(result, 'right');
        buildFirstSimilar(result, 'bottom');
        buildSimilarCard(result, 'right', true);
        buildSimilarCard(result, 'bottom', true);
      } else {
        buildSimilarCard(result, 'right');
        buildSimilarCard(result, 'bottom');
      }
      x++;
    }
  }
}

/* =====================================================================
Build and display the similar content
===================================================================== */
function buildSimilarCard(result, target, first = false) {
  const { type } = global.search;

  const heading = document.querySelector(`.similar-${target}-heading`);
  heading.textContent = type === 'movie' ? 'Similar Movies' : 'Similar Series';

  const cardsContainer = document.querySelector(`.cards-container-${target}`);

  const card = document.createElement('div');
  card.classList.add('similar-card');
  first && card.classList.add('first-similar-card');
  cardsContainer.appendChild(card);

  const link = document.createElement('a');
  link.href = `/details.html?type=${type}&id=${result.id}`;
  card.appendChild(link);

  const imageContainer = document.createElement('div');
  imageContainer.classList.add('similar-image-container');
  link.appendChild(imageContainer);

  const image = document.createElement('img');
  image.classList.add('similar-img');
  image.alt = type === 'movie' ? result.title : result.name;

  image.src =
    result.backdrop_path !== null
      ? `https://image.tmdb.org/t/p/original${result.poster_path}`
      : '/media/no-image.png';
  image.onerror = () => (image.src = '/media/no-image.png');
  imageContainer.appendChild(image);

  const contents = document.createElement('div');
  contents.classList.add('similar-body');
  link.appendChild(contents);

  const title = document.createElement('p');
  title.classList.add('similar-title');
  title.textContent = type === 'movie' ? result.title : result.name;
  contents.appendChild(title);

  const infoType = type === 'movie' ? 'Movie' : 'TV';
  let release =
    type === 'movie'
      ? result.release_date.substring(0, 4)
      : result.first_air_date.substring(0, 4);

  release = release === '' ? 'No date' : release;

  const info = document.createElement('p');
  info.classList.add('similar-info');
  info.textContent = `${infoType} • ${release}`;
  contents.appendChild(info);
}

function buildFirstSimilar(result, target) {
  const { type } = global.search;

  const containerRight = document.querySelector('.bottom-right-container');
  const containerBottom = document.querySelector('.similar-outer-container');
  containerRight.classList.remove('hidden');
  containerBottom.classList.remove('hidden');

  const firstSimilar = document.querySelector(`.first-similar-${target}`);

  const link = document.createElement('a');
  link.href = `/details.html?type=${type}&id=${result.id}`;
  firstSimilar.appendChild(link);

  const image = document.createElement('img');
  image.classList.add('first-image');
  image.alt = type === 'movie' ? result.title : result.name;

  image.src =
    result.backdrop_path !== null
      ? `https://image.tmdb.org/t/p/original${result.backdrop_path}`
      : '/media/no-image.png';
  image.onerror = () => (image.src = '/media/no-image.png');
  link.appendChild(image);

  const gradient = document.createElement('div');
  gradient.classList.add('gradient');
  link.appendChild(gradient);

  const contents = document.createElement('div');
  contents.classList.add('first-similar-content');
  link.appendChild(contents);

  const title = document.createElement('p');
  title.classList.add('first-similar-title');
  title.textContent = type === 'movie' ? result.title : result.name;
  contents.appendChild(title);

  const infoType = type === 'movie' ? 'Movie' : 'TV';

  let release =
    type === 'movie'
      ? result.release_date.substring(0, 4)
      : result.first_air_date.substring(0, 4);

  release = release === '' ? 'No date' : release;

  const info = document.createElement('p');
  info.classList.add('first-similar-info');
  info.textContent = `${infoType} • ${release} • `;
  contents.appendChild(info);

  const icon = document.createElement('i');
  icon.className = 'fa-solid fa-star';
  info.appendChild(icon);

  result.vote_average !== 0
    ? (info.innerHTML += ` ${result.vote_average.toFixed(1)}`)
    : (info.innerHTML += ' No Rating');

  return firstSimilar;
}

/* =====================================================================
Build and display reviews
===================================================================== */
function buildReview(review) {
  const container = document.querySelector('.reviews-container');

  const card = document.createElement('div');
  card.classList.add('review-card');
  container.appendChild(card);

  const topContainer = document.createElement('div');
  topContainer.classList.add('review-container-top');
  card.appendChild(topContainer);

  const { avatar_path, username } = review.author_details;
  const image = document.createElement('img');
  image.classList.add('profile-picture');
  image.alt = username;

  image.src =
    review.author_details.avatar_path === null
      ? '/media/no-image.png'
      : `https://image.tmdb.org/t/p/original/${avatar_path}`;

  image.onerror = () => (image.src = '/media/no-image.png');
  topContainer.appendChild(image);

  const heading = document.createElement('div');
  heading.classList.add('review-profile');
  topContainer.appendChild(heading);

  const author = document.createElement('p');
  author.classList.add('username');
  author.textContent = username;
  heading.appendChild(author);

  const published = document.createElement('p');
  published.classList.add('review-date');
  published.textContent = determineDate(review);
  heading.appendChild(published);

  // Set milliseconds to prevent mismatches
  const reviewDate = new Date(review.created_at);
  const editDate = new Date(review.updated_at);
  reviewDate.setMilliseconds(0);
  editDate.setMilliseconds(0);

  if (reviewDate.getTime() !== editDate.getTime()) {
    const edited = document.createElement('span');
    edited.classList.add('edited');
    edited.textContent = 'Edited';
    published.appendChild(edited);
  }

  const bottomContainer = document.createElement('div');
  bottomContainer.classList.add('review-container-bottom');
  card.appendChild(bottomContainer);

  const body = document.createElement('p');
  body.classList.add('review-body');
  body.innerHTML = review.content;
  bottomContainer.appendChild(body);

  // Full original review used for the modal
  const originalBody = document.createElement('p');
  originalBody.classList.add('review-body', 'hidden');
  originalBody.innerHTML = review.content;
  bottomContainer.appendChild(originalBody);

  // Max characters allowed in review
  const maxChars = 350;

  if (body.textContent.length > maxChars) {
    const truncatedText =
      body.textContent.substring(0, maxChars).trim() + '...';
    body.textContent = truncatedText;

    const expand = document.createElement('button');
    expand.classList.add('review-expand');
    expand.textContent = 'Read more...';
    bottomContainer.appendChild(expand);

    expand.addEventListener('click', (e) => {
      body.classList.add('hidden');
      originalBody.classList.remove('hidden');
      expand.classList.add('hidden');
    });
  }
}

function determineDate(review) {
  const currentDate = new Date();
  const reviewDate = new Date(review.created_at);

  const oneDay = 24 * 60 * 60 * 1000; // Milliseconds in a day
  const years = currentDate.getFullYear() - reviewDate.getFullYear();
  const months = currentDate.getMonth() - reviewDate.getMonth() + 12 * years;
  const days = Math.round((currentDate - reviewDate) / oneDay);

  const milliseconds = currentDate.getTime() - reviewDate.getTime();
  const minutes = Math.floor(milliseconds / (1000 * 60));
  const hours = Math.floor(minutes / 60);

  switch (true) {
    case years >= 2:
      published = `${years} years ago`;
      break;
    case years === 1:
      published = 'a year ago';
      break;
    case months >= 2:
      published = `${months} months ago`;
      break;
    case months === 1:
      published = 'a month ago';
      break;
    case days >= 1:
      published = `${days} days ago`;
      break;
    case days === 1:
      published = 'a day ago';
      break;
    case hours >= 2:
      published = `${hours} hours ago`;
      break;
    case hours === 1:
      published = 'an hour ago';
      break;
    case minutes >= 2:
      published = `${minutes} minutes ago`;
      break;
    case minutes === 1:
      published = 'a minute ago';
      break;
    default:
      published = 'just now';
  }

  return published;
}

/* =====================================================================
Build and display seasons/episodes
===================================================================== */
function buildSeason(season) {
  const wrapper = document.querySelector('.swiper-season-wrapper');

  const slide = document.createElement('div');
  slide.classList.add('swiper-slide', 'season-slide');
  wrapper.appendChild(slide);

  const button = document.createElement('button');
  button.classList.add('season-btn');
  button.textContent =
    season.season_number === 0 ? 'Specials' : `Season ${season.season_number}`;
  button.addEventListener('click', (event) => selectSeason(event, season));
  slide.appendChild(button);

  // Default selection
  if (season.season_number === 1) {
    selectSeason('click', season);
    button.id = 'active';
  }
}

// Remove and rebuild episodes to sync with corrosponding season
async function selectSeason(event, season) {
  const { seasonNumber } = global.search;

  const currentEpisodes = document.querySelectorAll(`.season-${seasonNumber}`);
  for (const episode of currentEpisodes) episode.remove();

  global.search.seasonNumber = season.season_number;
  const { type, id, seasonNumber: updatedSeasonNumber } = global.search;

  const seasonButtons = document.querySelectorAll('.season-btn');
  for (const button of seasonButtons)
    button.id = button === event.target ? 'active' : '';

  const { episodes } = await fetchAPIData(
    `/${type}/${id}/season/${updatedSeasonNumber}`
  );

  for (const episode of episodes) buildEpisode(episode, updatedSeasonNumber);
}

function buildEpisode(episode, updatedSeasonNumber) {
  const wrapper = document.querySelector('.swiper-episode-wrapper');

  const slide = document.createElement('div');
  slide.className = `swiper-slide episode-slide season-${updatedSeasonNumber}`;
  wrapper.appendChild(slide);

  const card = document.createElement('div');
  card.classList.add('episode-card');
  slide.appendChild(card);

  const { name, episode_number } = episode;

  const episodeTitle = document.createElement('p');
  episodeTitle.textContent =
    name === `Episode ${episode_number}`
      ? name
      : `Episode ${episode_number}. ${name}`;
  card.appendChild(episodeTitle);
}

/* =====================================================================
Diplay images, title, description
===================================================================== */
function buildPoster(details, type) {
  const baseUrl = 'https://image.tmdb.org/t/p/';

  const poster = document.querySelector('.poster-xl');
  const backdrop = document.querySelector('.backdrop');
  const mobileBackdrop = document.querySelector('.mobile-poster');
  const mobileGradient = document.querySelector('.mobile-gradient');

  if (details.backdrop_path !== null) {
    backdrop.src = `${baseUrl}original/${details.backdrop_path}`;
    backdrop.alt = type === 'movie' ? details.title : details.name;

    mobileBackdrop.src = backdrop.src;
    mobileBackdrop.alt = backdrop.alt;

    // Prevents empty image container showing
    backdrop.classList.remove('hidden');
    mobileBackdrop.classList.remove('hidden');
    mobileGradient.classList.remove('hidden');
  }

  details.poster_path !== null
    ? (poster.src = `${baseUrl}original/${details.poster_path}`)
    : (poster.src = '/media/no-image.png');

  poster.alt = type === 'movie' ? details.title : details.name;
}

async function buildOverview(details, type) {
  const title = document.querySelector('.desc-title-inner');
  title.textContent = type === 'movie' ? details.title : details.name;

  const overview = document.querySelector('.desc-body-inner');
  overview.textContent = details.overview;

  const homepageButton = document.querySelector('.homepage-btn');
  details.homepage === ''
    ? homepageButton.classList.add('disabled')
    : homepageButton.addEventListener('click', () => {
        window.open(details.homepage, '_blank');
      });

  buildSubInfo(details, type);
  buildStatsLeft(details, type);
  buildStatsRight(details);
}

function buildSubInfo(details, type) {
  const release =
    type === 'movie' && details.release_date !== ''
      ? details.release_date.substring(0, 4)
      : type === 'tv' && details.first_air_date !== ''
      ? details.first_air_date.substring(0, 4)
      : 'No date';

  const runtime =
    type === 'movie'
      ? `${details.runtime} min`
      : `${details.number_of_seasons} Seasons`;

  const genres =
    details.genres.length !== 0
      ? details.genres.map((genre) => genre.name.toLowerCase()).join('/')
      : 'Unlisted genre';

  const info = document.querySelector('.desc-info-inner');
  info.textContent = `${release} • ${runtime} • ${genres} • `;

  const icon = document.createElement('i');
  icon.className = 'fa-solid fa-star';
  info.appendChild(icon);

  details.vote_average !== 0
    ? (info.innerHTML += ` ${details.vote_average.toFixed(1)}`)
    : (info.innerHTML += ' No Rating');
}

/* =====================================================================
Display content stats
===================================================================== */
async function buildStatsLeft(details, type) {
  const contentType = document.querySelector('.stat-type');
  contentType.textContent =
    type === 'movie' ? 'Movie' : type === 'tv' ? 'Series' : 'Unlisted';

  const status = document.querySelector('.stat-status');
  status.textContent = details.status;

  const country = document.querySelector('.stat-country');
  country.textContent =
    details.production_countries.length === 0
      ? 'Not Listed'
      : details.production_countries[0].iso_3166_1 === 'US'
      ? 'America'
      : details.production_countries[0].name;

  const languageStat = document.querySelector('.stat-language');
  const language = await getLanguage(details.original_language);
  languageStat.textContent = language;
}

function buildStatsRight(details) {
  const budget = document.querySelector('.stat-budget');
  budget.textContent =
    !details.budget || details.budget === 0
      ? 'Unknown'
      : `$${seperateNumber(details.budget)}`;

  const revenue = document.querySelector('.stat-revenue');
  revenue.textContent =
    !details.revenue || details.revenue === 0
      ? 'Unknown'
      : `$${seperateNumber(details.revenue)}`;

  const producers = document.querySelector('.stat-producers');
  producers.textContent =
    details.production_companies.length !== 0
      ? details.production_companies.map((company) => company.name).join(' • ')
      : 'Not Listed';
}

/* =====================================================================
Cast for details page
===================================================================== */
function buildCastRight(member) {
  const wrapper = document.querySelector('.swiper-right-cast-wrapper');

  const slide = document.createElement('div');
  slide.classList.add('swiper-slide', 'swiper-slide-cast');
  wrapper.appendChild(slide);

  const card = document.createElement('div');
  card.classList.add('cast-card');
  slide.appendChild(card);

  const link = document.createElement('a');
  link.classList.add('cast-link');
  link.href = `https://www.themoviedb.org/person/${member.id}`;
  link.target = '_blank';
  card.appendChild(link);

  const image = document.createElement('img');
  image.classList.add('actor-picture');
  image.src =
    member.profile_path !== null
      ? `https://image.tmdb.org/t/p/original/${member.profile_path}`
      : '/media/no-image.png';
  image.alt = member.name;
  link.appendChild(image);

  const ul = document.createElement('ul');
  link.appendChild(ul);

  const actor = createListItem('actor-name', member.name);
  const character = createListItem('character-name', member.character);
  ul.append(actor, character);

  const cast = document.querySelector('.details-right');
  cast.classList.remove('hidden');
}

function buildCastBottom(member) {
  const wrapper = document.querySelector('.swiper-bottom-cast-wrapper');

  const slide = document.createElement('div');
  slide.classList.add('swiper-slide', 'bottom-cast-slide');
  wrapper.appendChild(slide);

  const card = document.createElement('div');
  card.classList.add('bottom-cast-card');
  slide.appendChild(card);

  const link = document.createElement('a');
  link.classList.add('cast-link');
  link.href = `https://www.themoviedb.org/person/${member.id}`;
  link.target = '_blank';
  card.appendChild(link);

  const image = document.createElement('img');
  image.classList.add('actor-picture');
  image.src =
    member.profile_path !== null
      ? `https://image.tmdb.org/t/p/original/${member.profile_path}`
      : '/media/no-image.png';
  image.alt = member.name;
  link.appendChild(image);

  const ul = document.createElement('ul');
  link.appendChild(ul);

  const actor = createListItem('actor-name', member.name);
  const character = createListItem('character-name', member.character);
  ul.append(actor, character);

  const cast = document.querySelector('.bottom-cast-container');
  cast.classList.remove('hidden');
}

function createListItem(className, text) {
  const li = document.createElement('li');
  li.classList.add(className);
  li.textContent = text;
  return li;
}

/* =====================================================================
Fetch content
===================================================================== */
async function fetchAPIData(endpoint) {
  const { apiKey, apiUrl } = global.api;
  const { page } = global.search;

  const response = await fetch(`
    ${apiUrl}${endpoint}?api_key=${apiKey}&page=${page}&language=en-GB
  `);

  const data = await response.json();
  return data;
}

async function searchAPIData() {
  const { apiKey, apiUrl } = global.api;
  const { type, term, page } = global.search;

  const response = await fetch(`
  ${apiUrl}/search/${type}?query=${term}&api_key=${apiKey}&page=${page}&language=en-GB
  `);

  const data = await response.json();
  return data;
}

async function getLanguage(language) {
  const response = await fetch('/json/ISO_639_2.json');
  const data = await response.json();

  const lang = data[language].english[0];
  return lang;
}

/* =====================================================================
Other
===================================================================== */
function makeActiveLink() {
  const dropDown = document.querySelector('.dropdown');
  const dropDownSecondary = document.querySelector('.dropdown-secondary');
  const links = document.querySelectorAll('.nav-link');

  links.forEach((link) => {
    if (link.classList.contains(global.search.type)) {
      // Highlight active tab
      link.id = 'active';

      // Sync dropdowns and active tab
      dropDown.value = global.search.type;
      dropDownSecondary.value = global.search.type;
    }
  });
}

function seperateNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function checkSearchEmpty(event) {
  const input = document.querySelector('.search-field');
  const inputSecondary = document.querySelector('.search-field-secondary');

  if (!input.value && !inputSecondary.value) {
    event.preventDefault();
  } else if (!input.value && inputSecondary.value === global.search.term) {
    event.preventDefault();
  }
}

function acknowledgeNotice() {
  const attribution = document.querySelector('.notice-banner');
  attribution.classList.add('hidden');

  localStorage.setItem('acknowledged', 'true');
}

function checkAcknowledged() {
  const attribution = document.querySelector('.notice-banner');
  const acknowledgeBtn = document.querySelector('.acknowledge');

  const noticeStateString = localStorage.getItem('acknowledged');
  const noticeStateParsed = JSON.parse(noticeStateString);

  noticeStateParsed === true
    ? attribution.classList.add('hidden')
    : acknowledgeBtn.addEventListener('click', acknowledgeNotice);
}

/* =====================================================================
Initialize
===================================================================== */
function init() {
  const searchForm = document.querySelectorAll('.search-form');
  searchForm.forEach((form) => addEventListener('submit', checkSearchEmpty));

  switch (global.currentPage) {
    case '/':
    case '/index.html':
      checkAcknowledged();
      initSwiperPromo();
      displayPromo();
      displayGridOne();
      displayGridTwo();
      displayGridThree();
      break;
    case '/search.html':
      displayContent();
      break;
    case '/details.html':
      displayDetails();
      break;
  }

  makeActiveLink();
}
init();
