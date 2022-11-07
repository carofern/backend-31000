export default function getCookies(headers) {
  try {
    let cookies = headers["set-cookie"];
    cookies = cookies.map((cookie) => {
      const cookieContent = cookie.split(";");
      return cookieContent[0];
    });
    const result = cookies.join("; ");

    return result;
  } catch (error) {
    return null;
  }
}
