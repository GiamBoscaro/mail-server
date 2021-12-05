class Service {
  static rejectResponse(error, code = 500) {
    return { error, code };
  }

  static successResponse(payload, code = 200, headers = [], cookies = [], type = 'json') {
    return {
      payload, code, headers, cookies, type,
    };
  }

  static redirectResponse(url, code = 302, params = {}, type = 'redirect') {
    return {
      url, code, params, type,
    };
  }

  static successFileResponse(path, code = 200, type = 'file') {
    return { path, code, type };
  }
}

module.exports = Service;
