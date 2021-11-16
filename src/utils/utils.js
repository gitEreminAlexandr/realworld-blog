/* eslint-disable no-param-reassign */
/* eslint-disable guard-for-in */
/* eslint-disable no-useless-escape */
/* eslint-disable prefer-template */
function setCookie(name, value, options = {}) {
  options = {
    path: '/',
    ...options,
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = encodeURIComponent(name) + '=' + value;

  for (const optionKey in options) {
    updatedCookie += '; ' + optionKey;
    const optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += '=' + optionValue;
    }
  }

  document.cookie = updatedCookie;
}

function getCookie(name) {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function deleteCookie(name) {
  setCookie(name, '', {
    'max-age': -1,
  });
}

const parsValueInArray = (value, array) => {
  const arr = array.map((item) => item.titleTag);
  return !arr.includes(value);
};

export { setCookie, getCookie, deleteCookie, parsValueInArray };
