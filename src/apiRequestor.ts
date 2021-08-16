const axios = require('axios').default;

/**
 * An enum for Grades live- and development versions endpoints
 */
export enum GradesURL {
  Live = 'https://grades.fit.cvut.cz/api/v1',
  Dev = 'https://rozvoj.fit.cvut.cz/evolution-dev/classification-dev/api/v1'
}

/**
 * ApiRequestor handles HTTP requests and their responses
 */
export class ApiRequestor {
  private readonly gradesEndpoint: string = GradesURL.Live;
  private readonly clientId: string;
  private readonly clientSecret: string;
  private authorizationEndpoint: string = 'https://auth.fit.cvut.cz/oauth/token';

  constructor(clientId: string, clientSecret: string, gradesEndpoint: GradesURL) {
    this.gradesEndpoint = gradesEndpoint;
    this.clientId = clientId;
    this.clientSecret = clientSecret;
  }

  /**
   * Creates the complete url for the request by concatenating Grades endpoint with provided action
   * @param action - the ending part of the request's url
   */
  urlForRequest(action: string): string {
    return this.gradesEndpoint + action;
  }

  /**
   * Authenticates the requester, obtains and stores token data
   * @private
   */
  private async authenticate(): Promise<void> {
    const response = await axios.post(this.authorizationEndpoint, null, {
      params: {
        grant_type: 'client_credentials',
        scope: 'cvut:grades:course-restricted'
      },
      headers: {
        'Accept': 'application/json'
      },
      auth: {
        username: this.clientId,
        password: this.clientSecret
      }
    });

    const tokenData = response.data;
    axios.defaults.headers.common = {'Authorization': `Bearer ${tokenData.access_token}`};
  }

  /**
   * Sends a GET request
   * @param url - the complete url for the request
   * @param params - parameters for the request
   * @param headers - headers for the request
   * @param auth - auth field
   * @returns HTTP response.data field
   */
  async get(url: string, params: object | null = null, headers: object | null = axios.defaults.headers.common, auth: object | null = null) {
    try {
      await this.authenticate();

      const response = await axios.get(url, {
        headers: headers,
        params: params,
        auth: auth
      });

      return response.data;
    } catch (e) {
      this.handleError(e, 'GET error');
    }
  }

  /**
   * Sends a PUT request
   * @param url - the complete url for the request
   * @param data - the data to be sent
   * @param params - parameters for the request
   * @param headers - headers for the request
   * @param auth - auth field
   * @returns HTTP response.data field
   */
  async put(url: string, data: any = null, params: object | null = null, headers: object | null = axios.defaults.headers.common, auth: object | null = null) {
    try {
      await this.authenticate();

      const response = await axios.put(url, data, {
        headers: headers,
        params: params,
        auth: auth
      });

      return response.data;
    } catch (e) {
      this.handleError(e, 'PUT error');
    }
  }

  /**
   * Sends a POST request
   * @param url - the complete url for the request
   * @param data - the data to be sent
   * @param params - parameters for the request
   * @param headers - headers for the request
   * @param auth - auth field
   * @returns HTTP response.data field
   */
  async post(url: string, data: any = null, params: object | null = null, headers: object | null = axios.defaults.headers.common, auth: object | null = null) {
    try {
      await this.authenticate();

      const response = await axios.post(url, data, {
        headers: headers,
        params: params,
        auth: auth
      });

      return response.data;
    } catch (e) {
      this.handleError(e, 'POST error');
    }
  }

  /**
   * Sends a DELETE request
   * @param url - the complete url for the request
   * @param params - parameters for the request
   * @param headers - headers for the request
   * @param auth - auth field
   * @returns HTTP response.data field
   */
  async delete(url: string, params: object | null = null, headers: object | null = axios.defaults.headers.common, auth: object | null = null) {
    try {
      await this.authenticate();

      const response = await axios.delete(url, {
        headers: headers,
        params: params,
        auth: auth
      });

      return response.data;
    } catch (e) {
      this.handleError(e, 'DELETE error');
    }
  }

  /**
   * Rethrows caught errors
   * @param e - error caught
   * @param errorType
   * @private
   */
  private handleError(e: any, errorType: string) {
    //console.error(`–– ${errorType} ––\n${e}\n–– ${errorType} END ––`);
    if (e.response) {
      throw new Error('Error ' + e.response.status + ': ' + e.response.statusText);
    } else {
      throw e;
    }
  }
}