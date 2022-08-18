const api = {
  hostname: "https://kelvin-wu.site/api/1.0",
  async getProducts(category, paging) {
    const response = await fetch(
      `${this.hostname}/products/${category}?paging=${paging}`
    );
    return await response.json();
  },
  async getAnyProducts(category, keyword, paging) {
    const response = await fetch(
      `${this.hostname}/products/${category}?paging=${paging}&keyword=${keyword}`
    );
    return await response.json();
  },
  async getCampaigns() {
    const response = await fetch(`${this.hostname}/marketing/campaigns`);
    return await response.json();
  },
  async searchProducts(keyword, paging) {
    const response = await fetch(
      `${this.hostname}/products/search?keyword=${keyword}&paging=${paging}`
    );
    return await response.json();
  },
  async getProduct(id) {
    const response = await fetch(`${this.hostname}/products/details?id=${id}`);
    return await response.json();
  },
  async checkout(data, jwtToken) {
    const response = await fetch(`${this.hostname}/order/checkout`, {
      body: JSON.stringify(data),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      }),
      method: "POST",
    });
    return await response.json();
  },
  async signin(data) {
    const response = await fetch(`${this.hostname}/user/signin`, {
      body: JSON.stringify(data),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      method: "POST",
    });
    return await response.json();
  },
  async getProfile(jwtToken) {
    const response = await fetch(`${this.hostname}/user/profile`, {
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      }),
    });
    return await response.json();
  },
  async uploadUserImg(data, jwtToken) {
    const response = await fetch(`${this.hostname}/user/image`, {
      body: data,
      headers: new Headers({
        Authorization: `Bearer ${jwtToken}`,
      }),
      method: "POST",
    });
    return await response.json();
  },
  async createCoupon(data, jwtToken) {
    const response = await fetch(`${this.hostname}/admin/coupon`, {
      body: JSON.stringify(data),
      headers: new Headers({
        Authorization: `Bearer ${jwtToken}`,
        "Content-Type": "application/json",
      }),
      method: "POST",
    });
    return await response.json();
  },
  async getAllCoupon() {
    const response = await fetch(`${this.hostname}/coupons`);
    return await response.json();
  },
  async getUserCoupon(jwtToken) {
    const response = await fetch(`${this.hostname}/user/coupon`, {
      headers: new Headers({
        Authorization: `Bearer ${jwtToken}`,
        "Content-Type": "application/json",
      }),
      method: "GET",
    });
    return await response.json();
  },
  async receiveCoupon(data, jwtToken) {
    const response = await fetch(`${this.hostname}/coupon`, {
      body: JSON.stringify(data),
      headers: new Headers({
        Authorization: `Bearer ${jwtToken}`,
        "Content-Type": "application/json",
      }),
      method: "POST",
    });
    return await response.json();
  },
  async addStreamerProduct(data, jwtToken) {
    const response = await fetch(`${this.hostname}/admin/stream`, {
      body: data,
      headers: new Headers({
        Authorization: `Bearer ${jwtToken}`,
      }),
      method: "POST",
    });
    return await response.json();
  },
  async getOrderNumber(jwtToken) {
    const response = await fetch(`${this.hostname}/orders`, {
      headers: new Headers({
        Authorization: `Bearer ${jwtToken}`,
      }),
      method: "GET",
    });
    return await response.json();
  },
  async getLiveStream() {
    const response = await fetch(`${this.hostname}/stream`);
    return await response.json();
  },
};

export default api;
