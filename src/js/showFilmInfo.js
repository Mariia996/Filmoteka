import MovieHttpService from './MovieHttpService.js'
import filmInfoTemplate from '../templates/filmInfo.hbs'
import openModal from './openModal.js'
import iframeTemplate from '../templates/iframe.hbs'
import createTrailerLink from './apiYoutubeService.js'
import addToLibrary  from '../js/addToLibrary.js';
const movieHttpService = new MovieHttpService()
let info = '';
function showFilmInfo(e) {
  e.preventDefault();

  const { target } = e;

  if (target.classList.contains('js-open-modal')) {

    const { filmId } = target.dataset;
    const data = movieHttpService.getFilmById(filmId);
    data.then(({ data }) => {
      const filmName = data.original_title;
      const linkYoutube = createTrailerLink(filmName);
      linkYoutube
        .then(result => {
          data.youtubeId = result
          info = data
        })
      const filmInfo = filmInfoTemplate(data);
      openModal(filmInfo);
      addToLibrary(data.id);
    })
      .catch(error =>
        openModal(`<p class="unavialable-page">Accept our appologies. The film info is not avialable now .</p>`)
      );
  }

}
export function showIframe(e) {
  e.preventDefault();
  const { youtubeId } = info;
  const renderIframe = iframeTemplate({ youtubeId });
  openModal(renderIframe);

}

export default showFilmInfo;
