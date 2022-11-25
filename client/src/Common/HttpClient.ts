
const HttpClient = {
  async Get(
    url: string,
    body: Map<string, string> | null = null
  ) {
    if (body != null) {
      url += "?";
      for (const key in body) {
        url += body.get(key);
      }
    }
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(response.statusText);
    }
  },
  async Post(
    url: string,
    body: object = {}
  ) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });
    if (response.status === 201) {
      return await response.text();
    } else {
      throw new Error(response.statusText);
    }
  },
  async Put(
    url: string,
    body: object = {}
  ) {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(response.statusText);
    }
  },
  async Delete(
    url: string,
    body: object = {}
  ) {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });
    if (response.status === 204) {
      return await response.text();
    } else {
      throw new Error(response.statusText);
    }
  }
}

export default HttpClient;
