export default class apiRealworld {
  static url = 'https://conduit-api-realworld.herokuapp.com/api';

  static getData = async (api, token = null) => {
    try {
      const headers = {
        'Content-Type': 'application/json',
      };
      if (token) headers.Authorization = `Token ${token}`;

      const request = await fetch(`${this.url}${api}`, { headers });
      const body = await request.json();

      return { status: request.status, data: body };
    } catch (error) {
      return error;
    }
  };

  static sendingData = async (api, dataBody = {}, token = null, method = 'POST') => {
    try {
      const headers = {
        'Content-Type': 'application/json',
      };
      if (token) headers.Authorization = `Token ${token}`;

      const request = await fetch(`${this.url}${api}`, {
        method,
        headers,
        body: dataBody,
      });

      const body = await request.json();

      return { status: request.status, data: body };
    } catch (error) {
      return error;
    }
  };

  static userByToken = async (token) => {
    const user = await this.getData('/user', token);
    return user;
  };

  static userRegistration = async (dataBody) => {
    const user = await this.sendingData('/users', dataBody);
    return user;
  };

  static userAuthorization = async (dataBody) => {
    const user = await this.sendingData('/users/login', dataBody);
    return user;
  };

  static getGloballyArticles = async (offset = 0) => {
    const articles = await this.getData(`/articles?limit=5&offset=${offset}`);
    return articles;
  };

  static getMyArticles = async (author) => {
    const articles = await this.getData(`/articles?author=${author}`);
    return articles;
  };

  static getArticle = async (slugArticle) => {
    const article = await this.getData(`/articles/${slugArticle}`);
    return article;
  };

  static newArticle = async (dataBody, token) => {
    const newArticle = await this.sendingData(`/articles`, dataBody, token);
    return newArticle;
  };

  static deleteArticle = async (slug, token) => {
    try {
      const request = await fetch(`${this.url}/articles/${slug}`, {
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
}
