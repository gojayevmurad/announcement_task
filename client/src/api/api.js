import axios from "axios";

const BASE_URL = "http://localhost:5000";

export class AnnouncementApi {
  static async getAnnouncements(
    page = 1,
    limit = 5,
    type = "",
    sort = "",
    order = "asc",
    search = ""
  ) {
    return (
      await axios.get(
        BASE_URL +
          `/announcements?page=${page}&limit=${limit}&type=${type}&sort=${sort}&order=${order}&search=${search}`
      )
    ).data;
  }

  static async adminLogin(data) {
    return await axios.post(BASE_URL + "/admin/login", data);
  }

  static async adminVerify(token, userId) {
    return await axios.get(BASE_URL + "/admin/admin-page", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        userId: userId,
      },
    });
  }

  static async newAnnouncement(data, token) {
    return await axios.post(BASE_URL + "/announcements/upload", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // static async add(note) {
  //   return await axios.post(BASE_URL, note).then((res) => res.data);
  // }
}
