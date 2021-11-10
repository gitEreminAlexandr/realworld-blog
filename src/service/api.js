const url = 'https://conduit-api-realworld.herokuapp.com/api';

const getRequest = async (urlGet) => {
  try {
    const request = await fetch(url + urlGet);
    const body = await request.json();

    return { status: request.status, data: body };
  } catch (error) {
    return error;
  }
};

const postRequest = async (api, dataBody) => {
  try {
    const request = await fetch(url + api, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: dataBody,
    });
    const body = await request.json();

    return { status: request.status, data: body };
  } catch (error) {
    return error;
  }
};

export const getUserThroughToken = async (token) => {
  try {
    const request = await fetch(`${url}/user`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    });
    const body = await request.json();

    return { status: request.status, data: body };
  } catch (error) {
    return error;
  }
};

const postRequestIsToken = async (api, token, dataBody) => {
  try {
    const request = await fetch(url + api, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
      body: dataBody,
    });
    const body = await request.json();

    return { status: request.status, data: body };
  } catch (error) {
    return error;
  }
};

export const deleteArticle = async (slug, token) => {
  try {
    const request = await fetch(`${url}/articles/${slug}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    });
    const body = await request.json();

    return { status: request.status, data: body };
  } catch (error) {
    return error;
  }
};

export const getArticles = async (offset = 0) => {
  const arrArticles = await getRequest(`/articles?limit=5&offset=${offset}`);
  return arrArticles;
};

export const getArticle = async (slugArticle) => {
  const article = await getRequest(`/articles/${slugArticle}`);
  return article;
};

export const userLogin = async (body) => {
  const user = await postRequest(`/users/login`, body);
  return user;
};

export const userRegister = async (body) => {
  const user = await postRequest(`/users`, body);
  return user;
};

export const postNewArticle = async (dataBody, token) => {
  const newArticle = await postRequestIsToken(`/articles`, token, dataBody);
  return newArticle;
};
