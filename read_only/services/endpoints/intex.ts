interface UserResponse {
  results: User[];
  info: ApiInfo;
}

interface User {
  gender: string;
  name: Name;
  location: Location;
  email: string;
  login: Login;
  dob: DateInfo;
  registered: DateInfo;
  phone: string;
  cell: string;
  id: Id;
  picture: Picture;
  nat: string;
}

interface Name {
  title: string;
  first: string;
  last: string;
}

interface Location {
  street: Street;
  city: string;
  state: string;
  country: string;
  postcode: string;
  coordinates: Coordinates;
  timezone: Timezone;
}

interface Street {
  number: number;
  name: string;
}

interface Coordinates {
  latitude: string;
  longitude: string;
}

interface Timezone {
  offset: string;
  description: string;
}

interface Login {
  uuid: string;
  username: string;
  password: string;
  salt: string;
  md5: string;
  sha1: string;
  sha256: string;
}

interface DateInfo {
  date: string; // ISO 8601 date string
  age: number;
}

interface Id {
  name: string;
  value: string;
}

interface Picture {
  large: string;
  medium: string;
  thumbnail: string;
}

interface ApiInfo {
  seed: string;
  results: number;
  page: number;
  version: string;
}

export const getUser = async (): Promise<UserResponse> => {
  const response = await fetch("https://randomuser.me/api/");
  return response.json();
};
