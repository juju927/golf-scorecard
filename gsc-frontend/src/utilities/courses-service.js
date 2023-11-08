import { getCoursesAPI } from "./courses-api";

export async function getCoursesService() {
  const data = await getCoursesAPI();
  return data.data;
}